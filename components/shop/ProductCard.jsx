

"use client";
import Image from "next/image";
import Link from "next/link";
import AddCard from "./AddCard";
import { InStock } from "@/public/icons/icons";
import placeholder from "@/public/client/banner/placeholder.png";
import { useDomain } from "@/providers/useDomain";

export default function ProductCard({
  product,
  relatedProduct = false,
  currency,
}) {
  const lang = useDomain();

  // Language mappings
  const textMap = {

    viewDetails: {
      en: "View Details",
      pt: "Ver Detalhes",
      fr: "Voir les Détails",
      es: "Ver Detalles",
    },
  };

  // Get localized text with English fallback
  const getText = (key) => textMap[key][lang] || textMap[key].en;

  // Get localized product name
  const nameMap = {
    pt: product?.namePt,
    fr: product?.nameFr,
    es: product?.nameEs,
  };
  const productName = nameMap[lang] || product?.name;

  return (
    <div
      className={`bg-white p-3 rounded-[16px] border flex flex-col justify-between ${
        !relatedProduct ? "border-red-500 h-[486px]" : "h-[450px]"
      } relative`}
    >
      {/* Badge */}
      {!relatedProduct && (
        <div className="absolute top-7 z-10 left-3 flex items-center text-green-600 font-semibold">
          {product?.quantity > 0 && (
            <>
              <InStock />
              {/* <span className="ml-1">{getText("inStock")}</span> */}
            </>
          )}
        </div>
      )}
      <div className="flex flex-col h-full">
        {/* Responsive Image Container */}
        <div className="relative w-full aspect-square overflow-hidden rounded-xl ">
          <Image
            src={product?.image || placeholder}
            alt={productName || "Product image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
        {/* Product Info */}
        <div className="flex-grow flex flex-col justify-between pt-4">
          {/* Title */}
          <p className="font-medium text-xl md:text-2xl my-2 line-clamp-2">
            <Link href={`/shop/${product?.id}`} className="hover:text-red-600">
              {productName}
            </Link>
          </p>
          {/* Price */}
          <div className="flex items-center gap-2 mt-2">
            <p className="font-bold text-lg md:text-xl">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: currency === "euro" ? "EUR" : "USD",
              }).format(
                currency === "euro"
                  ? product?.discountPrice?.eur || product?.price?.eur
                  : product?.discountPrice?.usd || product?.price?.usd
              )}
            </p>
            {product?.discountPrice?.usd && (
              <p className="font-medium text-sm md:text-[14px] text-gray-500 line-through">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currency === "euro" ? "EUR" : "USD",
                }).format(
                  currency === "euro"
                    ? product?.price?.eur
                    : product?.price?.usd
                )}
              </p>
            )}
          </div>
          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button className="font-bold text-sm md:text-[16px] text-red-600 border border-red-600 rounded-full py-2 md:py-3 cursor-pointer transition-all duration-300 hover:bg-red-600 hover:text-white">
              <Link href={`/shop/${product?.id}`} className="block w-full">
                {getText("viewDetails")}
              </Link>
            </button>
            <AddCard quantities={product?.quantity} productId={product?.id} />
          </div>
        </div>
      </div>
    </div>
  );
}