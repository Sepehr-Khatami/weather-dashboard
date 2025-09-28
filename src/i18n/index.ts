import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import fa from "./locales/fa.json";

const saved = (localStorage.getItem("lang") as "en" | "fa") || "en";

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, fa: { translation: fa } },
  lng: saved,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// Always keep LTR (explicit user request)
document.documentElement.lang = saved;
document.documentElement.dir = "ltr";

export default i18n;
