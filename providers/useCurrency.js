import { euCountry } from "@/database/eucountry";
import Cookies from "js-cookie";

export default function useCurrency() {
  const stored = Cookies.get("selectedCountry");

  let countryName = null;
  try {
    if (stored) {
      const parsed = JSON.parse(stored);
      countryName = parsed?.name;
    }
  } catch (err) {
    console.error("Failed to parse selectedCountry cookie:", err);
  }

  const isEuroCountry = euCountry.includes(countryName);

  return isEuroCountry ? "euro" : "dollar";
}
// "use client";

// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { euCountry } from "@/database/eucountry";

// export default function useCurrency() {
//   const [currency, setCurrency] = useState("dollar"); // default to dollar

//   useEffect(() => {
//     const stored = Cookies.get("selectedCountry");
//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         const isEuroCountry = euCountry.includes(parsed?.name);
//         setCurrency(isEuroCountry ? "euro" : "dollar");
//       } catch (err) {
//         console.error("Failed to parse selectedCountry cookie:", err);
//       }
//     }
//   }, []);

//   return currency;
// }
