// import cat1 from "@/public/client/cat1.png";
// import cat2 from "@/public/client/cat2.png";
// import cat3 from "@/public/client/cat3.png";
// import cat4 from "@/public/client/cat4.png";
// import cat5 from "@/public/client/cat5.png";
// import cat6 from "@/public/client/cat6.png";
// import Image from "next/image";

// export default function FeaturedCategories() {
//   const categories = [
//     {
//       name: "Dishwasher Spare Parts",
//       color: "bg-pink-100",
//       img: cat1,
//     },
//     {
//       name: "Vegetable cutter spare parts",
//       color: "bg-purple-100",
//       img: cat2,
//     },
//     {
//       name: "Juicer spare parts",
//       color: "bg-pink-200",
//       img: cat3,
//     },
//     {
//       name: "Hand mixer spare parts",
//       color: "bg-blue-100",
//       img: cat4,
//     },
//     {
//       name: "Food processor/ bowl cutters spare parts",
//       color: "bg-green-100",
//       img: cat5,
//     },
//     {
//       name: "Cooking application spare parts",
//       color: "bg-orange-100",
//       img: cat6,
//     },
//   ];

//   return (
//     <section className="max-w-[1276px] w-full mx-auto py-12 px-4">
//       <h2 className="text-center font-bold text-[#1A1D21] text-[28px] sm:text-[32px] md:text-[48px] mb-8">
//         Featured Categories
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 justify-items-center">
//         {categories.map((cat, index) => (
//           <div
//             key={index}
//             className="flex flex-col items-center text-center w-full"
//           >
//             <div
//               className={`w-40 h-40 sm:w-32 sm:h-32 lg:w-[184px] lg:h-[184px] rounded-full ${cat.color} flex items-center justify-center overflow-hidden`}
//             >
//               <Image
//                 src={cat.img}
//                 alt={cat.name}
//                 className="object-contain"
//                 width={130}
//                 height={130}
//               />
//             </div>
//             <p className="mt-2 text-sm md:text-base">{cat.name}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

'use client'
import cat1 from "@/public/client/cat1.png";
import cat2 from "@/public/client/cat2.png";
import cat3 from "@/public/client/cat3.png";
import cat4 from "@/public/client/cat4.png";
import cat5 from "@/public/client/cat5.png";
import cat6 from "@/public/client/cat6.png";
import Image from "next/image";
import { useDomain } from "@/providers/useDomain";

export default function FeaturedCategories() {
  const lang = useDomain();

  const categories = [
    {
      nameEn: "Dishwasher Spare Parts",
      namePt: "Peças sobressalentes para máquina de lavar louça",
      nameFr: "Pièces détachées pour lave-vaisselle",
      nameEs: "Repuestos de lavavajillas",
      color: "bg-pink-100",
      img: cat1,
    },
    {
      nameEn: "Vegetable cutter spare parts",
      namePt: "Peças sobressalentes para cortador de vegetais",
      nameFr: "Pièces détachées pour coupe-légumes",
      nameEs: "Repuestos para cortador de verduras",
      color: "bg-purple-100",
      img: cat2,
    },
    {
      nameEn: "Juicer spare parts",
      namePt: "Peças sobressalentes para espremedor",
      nameFr: "Pièces détachées pour extracteur de jus",
      nameEs: "Repuestos para exprimidor",
      color: "bg-pink-200",
      img: cat3,
    },
    {
      nameEn: "Hand mixer spare parts",
      namePt: "Peças sobressalentes para batedor manual",
      nameFr: "Pièces détachées pour batteur à main",
      nameEs: "Repuestos para batidora de mano",
      color: "bg-blue-100",
      img: cat4,
    },
    {
      nameEn: "Food processor/bowl cutters spare parts",
      namePt:
        "Peças sobressalentes para processador de alimentos/cortador de tigela",
      nameFr: "Pièces détachées pour robot culinaire/coupe-bol",
      nameEs: "Repuestos para procesador de alimentos/cortador de cuenco",
      color: "bg-green-100",
      img: cat5,
    },
    {
      nameEn: "Cooking application spare parts",
      namePt: "Peças sobressalentes para aplicação de cozinha",
      nameFr: "Pièces détachées pour application de cuisson",
      nameEs: "Repuestos para aplicaciones de cocina",
      color: "bg-orange-100",
      img: cat6,
    },
  ];

  const titleMap = {
    pt: "Categorias em Destaque",
    fr: "Catégories Vedettes",
    es: "Categorías Destacadas",
  };

  const sectionTitle = titleMap[lang] || "Featured Categories";

  return (
    <section className="max-w-[1276px] w-full mx-auto py-12 px-4">
      <h2 className="text-center font-bold text-[#1A1D21] text-[28px] sm:text-[32px] md:text-[48px] mb-8">
        {sectionTitle}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 justify-items-center">
        {categories.map((cat, index) => {
          const nameMap = {
            pt: cat.namePt,
            fr: cat.nameFr,
            es: cat.nameEs,
          };
          const categoryName = nameMap[lang] || cat.nameEn;

          return (
            <div
              key={index}
              className="flex flex-col items-center text-center w-full"
            >
              <div
                className={`w-40 h-40 sm:w-32 sm:h-32 lg:w-[184px] lg:h-[184px] rounded-full ${cat.color} flex items-center justify-center overflow-hidden`}
              >
                <Image
                  src={cat.img}
                  alt={categoryName}
                  className="object-contain"
                  width={130}
                  height={130}
                />
              </div>
              <p className="mt-2 text-sm md:text-base">{categoryName}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}