import { useEffect, useState } from "react";

export function useDomain() {
  const [lang, setLang] = useState("en"); // default language

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;

      if (hostname.includes(".pt")) {
        setLang("pt");
      } else if (hostname.includes(".es")) {
        setLang("es");
      } else if (hostname.includes(".fr")) {
        setLang("fr");
      } else {
        setLang("en"); // default for .eu and others
      }
    }
  }, []);

  return lang;
}
