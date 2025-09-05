
'use client'
import { useDomain } from "@/providers/useDomain";

export default function RelatedTitle() {
  const lang = useDomain();

  // Internationalization mappings
  const titleMap = {
    pt: "Produtos Relacionados",
    fr: "Produits Liés",
    es: "Productos Relacionados",
    en: "Related Products",
  };

  // Get localized title with fallback to English
  const title = titleMap[lang] || titleMap.en;

  return (
    <h1 className="font-bold text-3xl md:text-5xl text-center pt-9 lg:pt-0">
      {title}
    </h1>
  );
}
