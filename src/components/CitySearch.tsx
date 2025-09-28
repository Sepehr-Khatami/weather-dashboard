import { useState, useEffect } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { searchPlaces } from "../api/weather";
import type { Place } from "../api/weather";

export default function CitySearch({
  onSelect,
}: {
  onSelect?: (p: Place) => void;
}) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setOptions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const places = await searchPlaces(query);
        setOptions(places);
      } catch {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(opt) =>
        typeof opt === "string" ? opt : opt.display_name
      }
      onInputChange={(_, v) => setQuery(v)}
      onChange={(_, v) => v && typeof v !== "string" && onSelect?.(v)}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Search city'
          placeholder='Type city...'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={18} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          fullWidth
        />
      )}
    />
  );
}
