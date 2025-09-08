// "use client";

// import { MdKeyboardArrowRight } from "react-icons/md";
// import { RiCheckboxCircleLine } from "react-icons/ri";
// import { FaWhatsapp } from "react-icons/fa";
// import { SiGmail } from "react-icons/si";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import placeholder from "@/public/client/banner/placeholder.png";
// import AddCard from "../shop/AddCard";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";
// import { v4 as uuidv4 } from "uuid";
// import { addToCart } from "@/database/queries";
// import { serverRevalidate } from "@/utils/serverRev";
// import { useCart } from "@/providers/CartContext";
// import { useRouter } from "next/navigation";
// import { useDomain } from "@/providers/useDomain";

// const ProductPage = ({ product, currency }) => {
//   const [isClient, setIsClient] = useState(false);
//   const [count, setCount] = useState(1);

//   const lang = useDomain();

//   // console.log("Product data:.............", product);

//   const nameMap = {
//     pt: product?.namePt,
//     fr: product?.nameFr,
//     es: product?.nameEs,
//   };

//   const descriptionMap = {
//     pt: product?.descriptionPt,
//     fr: product?.descriptionFr,
//     es: product?.descriptionEs,
//   };

//   const stockMap = {
//     pt: "Em estoque",
//     fr: "En stock",
//     es: "En stock",
//   };

//   const quantityMap = {
//     pt: "Quantidade",
//     fr: "Quantité",
//     es: "Cantidad",
//   };
//   const inStock = stockMap[lang] || "In stock";
//   const productName = nameMap[lang] || product?.name;
//   const productDescription = descriptionMap[lang] || product?.description;
//   const quantityText = quantityMap[lang] || "Quantity";


//   const { fetchCart } = useCart();
//   const router = useRouter();

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // 🔹 Handle count increment/decrement
//   const handleCountChange = (action) => {
//     if (action === "increment") {
//       if (count < product?.quantity) {
//         setCount(count + 1);
//       } else {
//         toast.info(`Only ${product?.quantity} items in stock`, {
//           position: "bottom-right",
//         });
//       }
//     } else if (action === "decrement") {
//       if (count > 1) setCount(count - 1);
//     }
//   };

//   // 🔹 Shop Now Handler (add then redirect)
//   const handleShopNow = async () => {
//     try {
//       if (!product?.quantity || product?.quantity <= 0) {
//         toast.error("Sorry! This product is out of stock", {
//           position: "bottom-right",
//         });
//         return;
//       }

//       // Ensure count does not exceed stock
//       const finalCount = count > product.quantity ? product.quantity : count;

//       let trackingId = Cookies.get("trackingId");
//       if (!trackingId) {
//         trackingId = uuidv4();
//         Cookies.set("trackingId", trackingId, { expires: 30, path: "/" });
//       }

//       const countryData = Cookies.get("selectedCountry");
//       const parsedCountry = countryData ? JSON.parse(countryData) : null;

//       const response = await addToCart({
//         trackingId,
//         productId: product?.id,
//         quantity: finalCount,
//         country: parsedCountry?.name || "",
//       });

//       if (response?.success || response?.message) {
//         await serverRevalidate();
//         await fetchCart();
//         router.push("/checkout");
//       }
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       toast.error("Something went wrong.", { position: "bottom-right" });
//     }
//   };

//   return (
//     <div className="max-w-[1280px] mx-auto px-3 pb-[50px]">
//       {/* Breadcrumb */}
//       <div className="my-16 flex items-center gap-1">
//         <p className="text-[16px]">Home</p>
//         <MdKeyboardArrowRight className="text-xl" />
//         <p className="text-[16px] text-gray-600">MANUFACTURER</p>
//         <MdKeyboardArrowRight className="text-xl" />
//         <p className="text-[14px] md:text-[16px] font-bold">{productName}</p>
//       </div>

//       {/* Content */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Image */}
//         <div className="border border-gray-600 p-11 rounded-2xl flex justify-center">
//           <Image
//             src={product?.image || placeholder}
//             width={700}
//             height={700}
//             alt={product?.name}
//             priority
//           />
//         </div>

//         {/* Card */}
//         <div className="border border-red-600 bg-[#FFF6F6] rounded-2xl">
//           <div className="pt-[18px] px-7">
//             <h1 className="font-medium text-4xl">{productName}</h1>

//             {/* Stock Status */}
//             <p className="flex items-center gap-2 mt-4">
//               {product?.quantity > 0 ? (
//                 <>
//                   <RiCheckboxCircleLine className="text-2xl text-green-600" />
//                   <span className="font-bold text-2xl text-green-600">
//                     {inStock}
//                   </span>
//                 </>
//               ) : (
//                 <span className="font-bold text-2xl text-red-600">
//                   Out of stock
//                 </span>
//               )}
//             </p>

//             {/* Price */}
//             <p className="font-bold text-2xl mb-4">
//               {currency === "euro" ? "€" : "$"}
//               {currency === "euro"
//                 ? product?.discountPrice?.eur || product?.price?.eur
//                 : product?.discountPrice?.usd || product?.price?.usd}
//             </p>

//             {/* Quantity */}
//             <p className="font-bold text-[16px] mb-4">{quantityText}</p>
//             <div className="flex items-center justify-center border border-gray-400 rounded-2xl px-2 py-2 w-[135px] space-x-4 mb-4">
//               <button
//                 onClick={() => handleCountChange("decrement")}
//                 className="text-2xl font-bold cursor-pointer text-gray-600"
//               >
//                 −
//               </button>
//               <span className="text-xl text-gray-600">{count}</span>
//               <button
//                 onClick={() => handleCountChange("increment")}
//                 className="text-2xl font-bold cursor-pointer text-gray-600"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="px-7">
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <AddCard
//                 productId={product?.id}
//                 quantity={count}
//                 singleProduct={true}
//               />

//               <button
//                 onClick={handleShopNow}
//                 className="bg-red-600 rounded-full text-white font-bold text-[16px] cursor-pointer"
//               >
//                 Shop now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Product Info */}
//       <div className="mt-20 grid grid-cols-1 lg:grid-cols-2">
//         <div>
//           <div className="flex items-center">
//             <h5 className="bg-red-600 p-4 rounded-l-full font-bold md:text-2xl text-white">
//               Product Details
//             </h5>
//             <h5 className="border border-red-600 p-3.5 rounded-r-full md:text-2xl font-bold">
//               Additional information
//             </h5>
//           </div>

//           <div className="md:w-[570px] mt-10 text-gray-600">
//             {isClient ? (
//               <div dangerouslySetInnerHTML={{ __html: productDescription }} />
//             ) : (
//               <div className="min-h-[200px] bg-gray-100 animate-pulse rounded"></div>
//             )}
//           </div>
//         </div>

//         <div className="pt-7 lg:pt-0">
//           <button className="flex items-center justify-center gap-2 w-full border border-red-600 py-3 font-bold text-[16px] rounded-full cursor-pointer mb-3.5">
//             <FaWhatsapp className="text-green-500 text-[16px]" /> Send message
//             on Whats App
//           </button>
//           <button className="flex items-center justify-center gap-2 w-full border border-red-600 py-3 font-bold text-[16px] rounded-full cursor-pointer">
//             <SiGmail className="text-orange-400 text-[16px]" /> Send message on
//             Email
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;


"use client";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Image from "next/image";
import { useEffect, useState } from "react";
import placeholder from "@/public/client/banner/placeholder.png";
import AddCard from "../shop/AddCard";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { addToCart } from "@/database/queries";
import { serverRevalidate } from "@/utils/serverRev";
import { useCart } from "@/providers/CartContext";
import { useRouter } from "next/navigation";
import { useDomain } from "@/providers/useDomain";

const ProductPage = ({ product, currency }) => {
  const [isClient, setIsClient] = useState(false);
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const lang = useDomain();

  // Internationalization mappings
  const textMap = {
    home: {
      pt: "Início",
      fr: "Accueil",
      es: "Inicio",
      en: "Home",
    },
    manufacturer: {
      pt: "FABRICANTE",
      fr: "FABRICANT",
      es: "FABRICANTE",
      en: "MANUFACTURER",
    },
    productDetails: {
      pt: "Detalhes do Produto",
      fr: "Détails du Produit",
      es: "Detalles del Producto",
      en: "Product Details",
    },
    additionalInfo: {
      pt: "Informações Adicionais",
      fr: "Informations Supplémentaires",
      es: "Información Adicional",
      en: "Additional information",
    },
    shopNow: {
      pt: "Comprar agora",
      fr: "Acheter maintenant",
      es: "Comprar ahora",
      en: "Shop now",
    },
    sendWhatsApp: {
      pt: "Enviar mensagem no WhatsApp",
      fr: "Envoyer un message sur WhatsApp",
      es: "Enviar mensaje por WhatsApp",
      en: "Send message on WhatsApp",
    },
    sendEmail: {
      pt: "Enviar mensagem por E-mail",
      fr: "Envoyer un message par E-mail",
      es: "Enviar mensaje por Correo",
      en: "Send message on Email",
    },
    outOfStock: {
      pt: "Fora de estoque",
      fr: "Rupture de stock",
      es: "Fuera de stock",
      en: "Out of stock",
    },
    onlyInStock: {
      pt: "Apenas {quantity} itens em estoque",
      fr: "Seulement {quantity} articles en stock",
      es: "Solo {quantity} artículos en stock",
      en: "Only {quantity} items in stock",
    },
    outOfStockError: {
      pt: "Desculpe! Este produto está fora de estoque",
      fr: "Désolé! Ce produit est en rupture de stock",
      es: "¡Lo siento! Este producto está agotado",
      en: "Sorry! This product is out of stock",
    },
    somethingWentWrong: {
      pt: "Algo deu errado.",
      fr: "Une erreur s'est produite.",
      es: "Algo salió mal.",
      en: "Something went wrong.",
    },
  };

  const nameMap = {
    pt: product?.namePt,
    fr: product?.nameFr,
    es: product?.nameEs,
    en: product?.name,
  };

  const descriptionMap = {
    pt: product?.descriptionPt,
    fr: product?.descriptionFr,
    es: product?.descriptionEs,
    en: product?.description,
  };

  const stockMap = {
    pt: "Em estoque",
    fr: "En stock",
    es: "En stock",
    en: "In stock",
  };

  const quantityMap = {
    pt: "Quantidade",
    fr: "Quantité",
    es: "Cantidad",
    en: "Quantity",
  };

  // Helper function to get localized text
  const getText = (key) => {
    return textMap[key][lang] || textMap[key].en;
  };

  // Helper function to get localized text with parameters
  const getTextWithParams = (key, params) => {
    let text = textMap[key][lang] || textMap[key].en;
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, value);
    });
    return text;
  };

  const inStock = stockMap[lang] || stockMap.en;
  const productName = nameMap[lang] || nameMap.en;
  const productDescription = descriptionMap[lang] || descriptionMap.en;
  const quantityText = quantityMap[lang] || quantityMap.en;

  const { fetchCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle count increment/decrement
  const handleCountChange = (action) => {
    if (action === "increment") {
      if (count < product?.quantity) {
        setCount(count + 1);
      } else {
        toast.info(
          getTextWithParams("onlyInStock", { quantity: product?.quantity }),
          {
            position: "bottom-right",
          }
        );
      }
    } else if (action === "decrement") {
      if (count > 1) setCount(count - 1);
    }
  };

  // Shop Now Handler (add then redirect)
  const handleShopNow = async () => {
    try {
      if (!product?.quantity || product?.quantity <= 0) {
        toast.error(getText("outOfStockError"), {
          position: "bottom-right",
        });
        return;
      }

      setIsLoading(true);

      // Ensure count does not exceed stock
      const finalCount = count > product.quantity ? product.quantity : count;

      let trackingId = Cookies.get("trackingId");
      if (!trackingId) {
        trackingId = uuidv4();
        Cookies.set("trackingId", trackingId, { expires: 30, path: "/" });
      }

      const countryData = Cookies.get("selectedCountry");
      const parsedCountry = countryData ? JSON.parse(countryData) : null;

      const response = await addToCart({
        trackingId,
        productId: product?.id,
        quantity: finalCount,
        country: parsedCountry?.name || "",
      });

      if (response?.success || response?.message) {
        await serverRevalidate();
        await fetchCart();
        router.push("/checkout");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error(getText("somethingWentWrong"), { position: "bottom-right" });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle WhatsApp contact
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `${productName}`
    );
    window.open(`https://wa.me/351935210099?text=${message}`, "_blank");
  };

  // Handle Email contact
const handleEmailContact = () => {
  const subject = encodeURIComponent(`Inquiry about ${productName}`);
  const body = encodeURIComponent(
    `${productName}`
  );
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=sales@hdotrade.com&su=${subject}&body=${body}`;
  window.open(gmailLink, "_blank");
};


  // Render additional information content
  const renderAdditionalInfo = () => {
    if (!product) return null;

    return (
      <div className="space-y-4">
        {product.weight && (
          <div className="flex">
            <span className="font-bold w-1/3">Weight:</span>
            <span>{product.weight} kg</span>
          </div>
        )}
        {product.dimensions && (
          <div className="flex">
            <span className="font-bold w-1/3">Dimensions:</span>
            <span>{product.dimensions}</span>
          </div>
        )}
        {product.material && (
          <div className="flex">
            <span className="font-bold w-1/3">Material:</span>
            <span>{product.material}</span>
          </div>
        )}
        {product.brand && (
          <div className="flex">
            <span className="font-bold w-1/3">Brand:</span>
            <span>{product.brand}</span>
          </div>
        )}
      </div>
    );
  };

  if (!product) {
    return (
      <div className="max-w-[1280px] mx-auto px-3 pb-[50px] text-center py-20">
        <h2 className="text-2xl font-bold">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-3 pb-[50px]">
      {/* Breadcrumb */}
      <div className="my-16 flex items-center gap-1">
        <p className="text-[16px]">{getText("home")}</p>
        <MdKeyboardArrowRight className="text-xl" />
        <p className="text-[16px] text-gray-600">{getText("manufacturer")}</p>
        <MdKeyboardArrowRight className="text-xl" />
        <p className="text-[14px] md:text-[16px] font-bold">{productName}</p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image */}
        <div className="border border-gray-600 p-11 rounded-2xl flex justify-center">
          <Image
            src={product?.image || placeholder}
            width={700}
            height={700}
            alt={product?.name || "Product image"}
            priority
          />
        </div>

        {/* Card */}
        <div className="border border-red-600 bg-[#FFF6F6] rounded-2xl">
          <div className="pt-[18px] px-7">
            <h1 className="font-medium text-4xl">{productName}</h1>

            {/* Stock Status */}
            <p className="flex items-center gap-2 mt-4">
              {product?.quantity > 0 ? (
                <>
                  <RiCheckboxCircleLine className="text-2xl text-green-600" />
                  <span className="font-bold text-2xl text-green-600">
                    {inStock}
                  </span>
                </>
              ) : (
                <span className="font-bold text-2xl text-red-600">
                  {getText("outOfStock")}
                </span>
              )}
            </p>

            {/* Price */}
            <p className="font-bold text-2xl mb-4">
              {currency === "euro" ? "€" : "$"}
              {currency === "euro"
                ? product?.discountPrice?.eur || product?.price?.eur
                : product?.discountPrice?.usd || product?.price?.usd}
            </p>

            {/* Quantity */}
            <p className="font-bold text-[16px] mb-4">{quantityText}</p>
            <div className="flex items-center justify-center border border-gray-400 rounded-2xl px-2 py-2 w-[135px] space-x-4 mb-4">
              <button
                onClick={() => handleCountChange("decrement")}
                className="text-2xl font-bold cursor-pointer text-gray-600"
                disabled={count <= 1}
              >
                −
              </button>
              <span className="text-xl text-gray-600">{count}</span>
              <button
                onClick={() => handleCountChange("increment")}
                className="text-2xl font-bold cursor-pointer text-gray-600"
                disabled={count >= product?.quantity}
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-7">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <AddCard
                productId={product?.id}
                quantity={count}
                singleProduct={true}
              />
              <button
                onClick={handleShopNow}
                disabled={isLoading || product?.quantity <= 0}
                className="bg-red-600 rounded-full text-white font-bold text-[16px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  getText("shopNow")
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2">
        <div>
          <div className="flex items-center">
            <button
              onClick={() => setActiveTab("details")}
              className={`p-4 rounded-l-full font-bold md:text-2xl ${
                activeTab === "details"
                  ? "bg-red-600 text-white"
                  : "border border-red-600"
              }`}
            >
              {getText("productDetails")}
            </button>
            <button
              onClick={() => setActiveTab("additional")}
              className={`p-3.5 rounded-r-full md:text-2xl font-bold ${
                activeTab === "additional"
                  ? "bg-red-600 text-white"
                  : "border border-red-600"
              }`}
            >
              {getText("additionalInfo")}
            </button>
          </div>

          <div className="md:w-[570px] mt-10 text-gray-600">
            {isClient ? (
              activeTab === "details" ? (
                <div dangerouslySetInnerHTML={{ __html: productDescription }} />
              ) : (
                renderAdditionalInfo()
              )
            ) : (
              <div className="min-h-[200px] bg-gray-100 animate-pulse rounded"></div>
            )}
          </div>
        </div>

        <div className="pt-7 lg:pt-0">
          <button
            onClick={handleWhatsAppContact}
            className="flex items-center justify-center gap-2 w-full border border-red-600 py-3 font-bold text-[16px] rounded-full cursor-pointer mb-3.5 hover:bg-red-50 transition-colors"
          >
            <FaWhatsapp className="text-green-500 text-[16px]" />
            {getText("sendWhatsApp")}
          </button>
          <button
            onClick={handleEmailContact}
            className="flex items-center justify-center gap-2 w-full border border-red-600 py-3 font-bold text-[16px] rounded-full cursor-pointer hover:bg-red-50 transition-colors"
          >
            <SiGmail className="text-orange-400 text-[16px]" />
            {getText("sendEmail")}
          </button>

   
        </div>
      </div>
    </div>
  );
};

export default ProductPage;