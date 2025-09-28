
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function LanguageSwitch() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";

  const setLang = (l: string) => {
    i18n.changeLanguage(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
    // IMPORTANT: do NOT change document.dir even for 'fa'
    document.documentElement.dir = "ltr";
  };

  return (
    <Tooltip title={t("ui.language")}>
      <ToggleButtonGroup
        value={lang}
        exclusive
        onChange={(_, v) => v && setLang(v)}
      >
        <ToggleButton value='en'>EN</ToggleButton>
        <ToggleButton value='fa'>FA</ToggleButton>
      </ToggleButtonGroup>
    </Tooltip>
  );
}
