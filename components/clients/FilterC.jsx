

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getCategories,
  getManufacturers,
  getSubcategoriesByCategory,
} from "@/database/queries";
import { useDomain } from "@/providers/useDomain";

export default function FilterCWrapper() {
  const router = useRouter();
  const [manufacturers, setManufacturers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [filters, setFilters] = useState({
    manufacturer: "",
    category: "",
    subcategory: "",
  });
  const lang = useDomain();

  // Internationalization mappings
  const textMap = {
    selectManufacturer: {
      pt: "SELECIONE FABRICANTE",
      fr: "SÉLECTIONNER FABRICANT",
      es: "SELECCIONAR FABRICANTE",
      en: "SELECT MANUFACTURER",
    },
    selectCategory: {
      pt: "SELECIONE CATEGORIA",
      fr: "SÉLECTIONNER CATÉGORIE",
      es: "SELECCIONAR CATEGORÍA",
      en: "SELECT CATEGORY",
    },
    selectSubcategory: {
      pt: "SELECIONE SUBCATEGORIA",
      fr: "SÉLECTIONNER SOUS-CATÉGORIE",
      es: "SELECCIONAR SUBCATEGORÍA",
      en: "SELECT SUBCATEGORY",
    },
    noSubcategory: {
      pt: "SEM SUBCATEGORIA",
      fr: "PAS DE SOUS-CATÉGORIE",
      es: "SIN SUBCATEGORÍA",
      en: "NO SUBCATEGORY",
    },
    search: {
      pt: "Pesquisar",
      fr: "Rechercher",
      es: "Buscar",
      en: "Search",
    },
  };

  // Helper function to get localized text
  const getText = (key) => {
    return textMap[key][lang] || textMap[key].en;
  };

  // Helper function to get localized name
  const getLocalizedName = (obj) => {
    if (!obj) return "";

    const nameMap = {
      pt: obj.namePt,
      fr: obj.nameFr,
      es: obj.nameEs,
      en: obj.name,
    };

    return nameMap[lang] || nameMap.en || obj.name;
  };

  useEffect(() => {
    const fetchData = async () => {
      const manufacturersData = await getManufacturers();
      const categoriesData = await getCategories();
      setManufacturers(manufacturersData);
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategory) {
        const data = await getSubcategoriesByCategory(selectedCategory);
        setSubcategories(data || []);
      } else {
        setSubcategories([]);
      }
    };
    fetchSubcategories();
  }, [selectedCategory]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setSelectedCategory(value);
      setFilters((prev) => ({
        ...prev,
        [name]: value,
        subcategory: "", // Reset subcategory when category changes
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSearch = () => {
    // Build query parameters
    const params = new URLSearchParams();
    if (filters.manufacturer)
      params.append("manufacturer", filters.manufacturer);
    if (filters.category) params.append("category", filters.category);
    if (filters.subcategory) params.append("subcategory", filters.subcategory);
    // Redirect to shop page with filters
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-[1279px] mx-auto flex justify-center items-center py-[50px] bg-[#ffffff]">
      <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 border border-[#00000033] rounded-[15px] lg:rounded-[35px] p-4 bg-white">
        {/* Manufacturer Select */}
        <select
          name="manufacturer"
          value={filters.manufacturer}
          onChange={handleFilterChange}
          className="border border-[#00000033] px-4 lg:px-6 py-2 text-[14px] rounded-[72px] focus:outline-none focus:border-gray-500 w-full lg:flex-1"
        >
          <option value="">{getText("selectManufacturer")}</option>
          {manufacturers.map((manufacturer) => (
            <option key={manufacturer?.id} value={manufacturer.id}>
              {getLocalizedName(manufacturer)}
            </option>
          ))}
        </select>
        {/* Category Select */}
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border border-[#00000033] px-4 lg:px-6 py-2 text-[14px] rounded-[35px] focus:outline-none focus:border-gray-500 w-full lg:flex-1"
        >
          <option value="">{getText("selectCategory")}</option>
          {categories.map((category) => (
            <option key={category?.id} value={category?.id}>
              {getLocalizedName(category)}
            </option>
          ))}
        </select>
        {/* Subcategory Select */}
        <select
          name="subcategory"
          value={filters.subcategory}
          onChange={handleFilterChange}
          className="border border-[#00000033] px-4 lg:px-6 py-2 text-[14px] rounded-[35px] focus:outline-none focus:border-gray-500 w-full lg:flex-1"
          disabled={!subcategories.length}
        >
          <option value="">
            {subcategories.length
              ? getText("selectSubcategory")
              : getText("noSubcategory")}
          </option>
          {subcategories.map((sub) => (
            <option key={sub?.id} value={sub?.id}>
              {getLocalizedName(sub)}
            </option>
          ))}
        </select>
        {/* Search Button */}
        <button
          type="button"
          onClick={handleSearch}
          className="bg-transparent border border-red-500 px-8 py-2 text-base lg:text-md rounded-[35px] hover:bg-red-500 text-red-500 hover:text-white transition-colors w-full lg:w-40"
        >
          {getText("search")}
        </button>
      </div>
    </div>
  );
}