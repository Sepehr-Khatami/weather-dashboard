import { Paper, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { WeatherData } from "../api/weather";
type Props = {
  placeName: string;
  data: WeatherData | null;
};

export default function WeatherCard({ placeName, data }: Props) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  if (!data)
    return (
      <Paper
        sx={{
          p: 3,
          mb: 2,
          borderRadius: 3,
          border: 1,
          borderColor: "divider",
          direction: isRtl ? "rtl" : "ltr",
          textAlign: "center",
        }}
      >
        <Typography>{t("weather.noData")}</Typography>
      </Paper>
    );

  return (
    <Paper
      sx={{
        p: 3,
        mb: 2,
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
      }}
    >
      <Typography
        variant='h6'
        gutterBottom
        sx={{ direction: isRtl ? "rtl" : "ltr" }}
      >
        {placeName}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant='h3'>{Math.round(data.temperature)}°C</Typography>
        <Box sx={{ direction: isRtl ? "rtl" : "ltr" }}>
          <Typography>
            {t("weather.wind")}: {data.windspeed} km/h
          </Typography>
          <Typography variant='body2'>
            {t("weather.time")}: {data.time}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
