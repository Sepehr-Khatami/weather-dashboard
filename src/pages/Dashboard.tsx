import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Paper,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CitySearch from "../components/CitySearch";
import ThemeToggle from "../components/ThemeToggle";
import LanguageSwitch from "../components/LanguageSwitch";
import WeatherCard from "../components/WeatherCard";
import { fetchWeather } from "../api/weather";
import type { Place } from "../api/weather";
import { useTranslation } from "react-i18next";
import type { WeatherData } from "../api/weather";
import axios from "axios";

type Props = {
  name: string;
  onLogout: () => void;
  mode: "light" | "dark";
  setMode: (m: "light" | "dark") => void;
};

export default function Dashboard({ name, onLogout, mode, setMode }: Props) {
  const { t } = useTranslation();
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlaceSelect = async (place: Place) => {
    setSelectedPlace(place);
    setWeather(null);
    setError(null);
    setLoading(true);
    try {
      const w = await fetchWeather(Number(place.lat), Number(place.lon));
      setWeather(w);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Error");
      } else {
        setError("Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 2,
        py: 3,
      }}
    >
      <AppBar
        position='static'
        color='transparent'
        elevation={0}
        sx={{ mb: 4 , maxWidth: 800, width: "100%"}}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography variant='h6'>
            {t("dashboard.welcome", { name })}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mt: { xs: 1, md: 0 } }}>
            <LanguageSwitch />
            <ThemeToggle mode={mode} setMode={setMode} />
            <Button
              startIcon={<LogoutIcon />}
              onClick={onLogout}
              variant='contained'
              sx={{
                bgcolor: "primary.main",
                color: "white",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              {t("dashboard.logout")}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: 800, width: "100%" }}>
        {" "}
        {/* Centered container with max width */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            border: 1,
            borderColor: "divider",
          }}
        >
          {/* Search Bar Full Width */}
          <CitySearch onSelect={handlePlaceSelect} />
          {loading && (
            <Typography sx={{ mt: 2 }}>{t("dashboard.loading")}</Typography>
          )}
          {error && (
            <Typography sx={{ mt: 2, color: "error.main" }}>{error}</Typography>
          )}
        </Paper>
        {/* Weather Display */}
        {selectedPlace ? (
          <WeatherCard placeName={selectedPlace.display_name} data={weather} />
        ) : (
          <Paper
            sx={{ p: 3, borderRadius: 3, border: 1, borderColor: "divider" }}
          >
            <Typography textAlign='center'>
              Search a city to see weather
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
}
