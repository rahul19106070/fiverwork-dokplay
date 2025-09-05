// import { cookies } from "next/headers";
// import { euCountry } from "@/database/eucountry";

export async function getCurrency() {
  // const cookieStore = await cookies(); // ✅ must await
  // const stored = cookieStore.get("selectedCountry")?.value;
  let currency = "euro";

  // if (stored) {
  //   try {
  //     const parsed = JSON.parse(stored);
  //     currency = euCountry.includes(parsed?.name) ? "euro" : "dollar";
  //   } catch (e) {
  //     console.error("Invalid cookie JSON:", stored);
  //   }
  // }

  return currency;
}
