"use client";

import ReactCountryFlag from "react-country-flag";
import { useState } from "react";

export default function LanguageSwitcher() {
  const [selectedLang, setSelectedLang] = useState("UK");

  const languages = [
    {
      code: "uk",
      countryCode: "GB",
      language: "English (UK)",
      title: "UK",
      link: "https://hdotrade.com/",
    },
    {
      code: "eu",
      countryCode: "EU",
      language: "English (EU)",
      title: "EU",
      link: "https://hdotrade.eu/",
    },
    {
      code: "pt",
      countryCode: "PT",
      language: "Português",
      title: "PT",
      link: "https://hdotrade.pt/",
    },
    {
      code: "es",
      countryCode: "ES",
      language: "Español",
      title: "ES",
      link: "https://hdotrade.es/",
    },
    {
      code: "fr",
      countryCode: "FR",
      language: "Français",
      title: "FR",
      link: "https://hdotrade.fr/",
    },
  ];

  const currentLanguage = languages.find(lang => lang.title === selectedLang) || languages[0];

  return (
    <div className="flex items-center gap-3">
      {languages.map((langItem) => (
        <a
          href={langItem.link}
          key={langItem.code}
          className={`flex flex-col items-center group cursor-pointer transition-all ${selectedLang === langItem.title ? 'text-blue-900 font-bold' : 'text-gray-700'}`}
          onClick={() => setSelectedLang(langItem.title)}
          title={langItem.language}
        >
          <ReactCountryFlag
            countryCode={langItem.countryCode}
            svg
            style={{
              width: "2em",
              height: "1em",
            }}
          />
          <span className="text-xs mt-1">{langItem.title}</span>
        </a>
      ))}
    </div>
  );
}