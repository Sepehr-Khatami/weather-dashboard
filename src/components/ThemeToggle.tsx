
import { IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTranslation } from "react-i18next";

export default function ThemeToggle({
  mode,
  setMode,
}: {
  mode: "light" | "dark";
  setMode: (m: "light" | "dark") => void;
}) {
  const { t } = useTranslation();
  return (
    <Tooltip title={t("ui.toggleTheme")}>
      <IconButton onClick={() => setMode(mode === "light" ? "dark" : "light")}>
        {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
}
