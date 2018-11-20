import resources from "./i18n.json";
import i18next from "i18next";
import { withI18n, reactI18nextModule } from "react-i18next";

i18next
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18next;