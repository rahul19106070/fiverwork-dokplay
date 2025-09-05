"use client";

import ReactCountryFlag from "react-country-flag";
import { useState } from "react";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors text-sm font-medium"
      >
        <ReactCountryFlag
          countryCode={currentLanguage.countryCode}
          svg
          style={{
            width: "1em",
            height: "1em",
          }}
          title={currentLanguage.language}
        />
        <span>{currentLanguage.title}</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[120px]">
          {languages.map((langItem) => (
            <a
              href={langItem.link}
              key={langItem.code}
              className={`flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                selectedLang === langItem.title ? 'bg-gray-50 text-blue-900' : 'text-gray-700'
              }`}
              onClick={() => {
                setSelectedLang(langItem.title);
                setIsOpen(false);
              }}
            >
              <ReactCountryFlag
                countryCode={langItem.countryCode}
                svg
                style={{
                  width: "1em",
                  height: "1em",
                }}
                title={langItem.language}
              />
              <span>{langItem.title}</span>
            </a>
          ))}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}