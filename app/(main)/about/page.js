

'use client'
import Image from "next/image";
import about1 from "@/public/client/about.png";
import mapImg from "@/public/client/map2.png";
import teamImg from "@/public/client/team.jpg";
import OurBrand from "@/components/clients/OurBrand";
import { useDomain } from "@/providers/useDomain";

export default function About() {
  const lang = useDomain();

  // Internationalization mappings
  const textMap = {
    whoWeAre: {
      pt: "Quem Somos",
      fr: "Qui Nous Sommes",
      es: "Quiénes Somos",
      en: "Who We Are",
    },
    paragraph1: {
      pt: "Com o conhecimento que adquirimos ao longo dos anos, nossa empresa projeta, fabrica e comercializa peças sob nossa própria marca HDO TRADE.",
      fr: "Avec les connaissances que nous avons acquises au fil des ans, notre entreprise conçoit, fabrique et commercialise des pièces de rechange sous notre propre marque HDO TRADE.",
      es: "Con los conocimientos que hemos adquirido a lo largo de los años, nuestra empresa diseña, fabrica y comercializa repuestos bajo nuestra propia marca HDO TRADE.",
      en: "With the knowledge we have acquired over the years, our company designs, manufactures and markets spare parts under our own brand HDO TRADE.",
    },
    paragraph2: {
      pt: "Isso é feito para ajudar nossos clientes, pois em muitos casos vemos que nossos clientes tiveram dificuldade em encontrar as peças de reposição de que precisam para sua máquina.",
      fr: "Ceci est fait pour aider nos clients, car dans de nombreux cas, nous voyons que nos clients ont eu des difficultés à trouver les pièces de rechange dont ils ont besoin pour leur machine.",
      es: "Esto se hace para ayudar a nuestros clientes, ya que en muchos casos vemos que nuestros clientes tuvieron dificultades para encontrar los repuestos que necesitan para su máquina.",
      en: "This is done to help our customers, as in many cases we see that our customers had difficulty finding the spare parts they need for their machine.",
    },
    paragraph3: {
      pt: "Fabricamos nossas peças de reposição em todo o mundo e nossa equipe técnica trabalha arduamente diariamente para fornecer ao nosso cliente a melhor qualidade ao melhor preço.",
      fr: "Nous fabriquons nos pièces de rechange dans le monde entier et notre équipe technique travaille dur quotidiennement pour fournir à nos clients la meilleure qualité au meilleur prix.",
      es: "Fabricamos nuestros repuestos en todo el mundo y nuestro equipo técnico trabaja arduamente a diario para proporcionar a nuestros clientes la mejor calidad al mejor precio.",
      en: "We manufacture our spare parts all over the world and our technical team works hard daily to provide to our customer the best quality at the best price.",
    },
    paragraph4: {
      pt: "Todas as peças de reposição que são vendidas sob nossa marca, HDO TRADE, foram testadas por nossa equipe técnica e por nossos clientes constantemente por muitos anos e também passaram pelo controle de qualidade.",
      fr: "Toutes les pièces de rechange vendues sous notre marque, HDO TRADE, ont été testées par notre équipe technique et par nos clients constamment pendant de nombreuses années et ont également passé le contrôle qualité.",
      es: "Todos los repuestos que se venden bajo nuestra marca, HDO TRADE, han sido probados por nuestro equipo técnico y por nuestros clientes constantemente durante muchos años y también han pasado el control de calidad.",
      en: "All the spare parts that are sold under our brand, HDO TRADE, have been tested by our technical team and by our constantly customers for many years and also passed quality control.",
    },
    paragraph5: {
      pt: "Em muitos casos, as peças que vendem sob nossa marca própria HDO TRADE são fabricadas na mesma fábrica que as peças originais e a única diferença entre as peças é a marca e o saco (se houver).",
      fr: "Dans de nombreux cas, les pièces vendues sous notre propre marque HDO TRADE sont fabriquées dans la même usine que les pièces d'origine et la seule différence entre les pièces est la marque et le sac (le cas échéant).",
      es: "En muchos casos, las piezas que se venden bajo nuestra propia marca HDO TRADE son fabricadas en la misma fábrica que las piezas originales y la única diferencia entre las piezas es la marca y la bolsa (si la hay).",
      en: "In many cases the parts that sell under our home brand HDO TRADE are manufactured in the same factory as the original parts and the only difference between the parts is the brand and the bag (if any).",
    },
    paragraph6: {
      pt: "Portanto, se você tiver dificuldade em encontrar as peças de que precisa, não hesite em entrar em contato conosco sobre seu requisito para saber se as peças de reposição sob nossa marca HDO TRADE estão disponíveis.",
      fr: "Par conséquent, si vous avez des difficultés à trouver les pièces dont vous avez besoin, n'hésitez pas à nous contacter concernant votre exigence pour savoir si les pièces de rechange sous notre marque HDO TRADE sont disponibles.",
      es: "Por lo tanto, si tiene dificultades para encontrar las piezas que necesita, no dude en contactarnos sobre su requisito para saber si las piezas de repuesto bajo nuestra marca HDO TRADE están disponibles.",
      en: "Therefore, if you face difficulty finding the parts you need, do not hesitate to contact us about your requirement to know if replacement parts under our brand HDO TRADE are available.",
    },
    brandName: {
      pt: "HDO GLOBAL TRADE",
      fr: "HDO GLOBAL TRADE",
      es: "HDO GLOBAL TRADE",
      en: "HDO GLOBAL TRADE",
    },
    slogan: {
      pt: "QUALIDADE IGUAL AO MELHOR PREÇO",
      fr: "QUALITÉ ÉGALE AU MEILLEUR PRIX",
      es: "CALIDAD IGUAL AL MEJOR PRECIO",
      en: "EQUAL QUALITY AT THE BEST PRICE",
    },
    whatWeDo: {
      pt: "O Que Fazemos",
      fr: "Ce Que Nous Faisons",
      es: "Lo Que Hacemos",
      en: "What We Do",
    },
    whatWeDoParagraph1: {
      pt: "Com o objetivo de sempre agradar o cliente, faremos o melhor esforço para enviar o pedido em todo o mundo, em no máximo 24 horas a partir da confirmação do pedido e pagamento (desde que o produto esteja disponível em estoque).",
      fr: "Dans le but de toujours satisfaire le client, nous ferons de notre mieux pour expédier la commande dans le monde entier, dans un délai maximum de 24 heures à partir de la confirmation de la commande et du paiement (tant que le produit est disponible en stock).",
      es: "Con el objetivo de complacer siempre al cliente, haremos el mayor esfuerzo para enviar el pedido en todo el mundo, en un máximo de 24 horas desde la confirmación del pedido y el pago (siempre que el producto esté disponible en stock).",
      en: "With the goal of always pleasing the customer, we will make the best effort to ship the order around the world, in a maximum time of 24 hours from the moment of the order confirmation and payment (as long as the product is available in stock).",
    },
    whatWeDoParagraph2: {
      pt: "Trabalhamos com as melhores empresas de courier na Europa para garantir que o produto chegue até você com segurança e no menor tempo possível.",
      fr: "Nous travaillons avec les meilleures entreprises de courrier en Europe pour garantir que le produit vous parvienne en toute sécurité et dans les plus brefs délais.",
      es: "Trabajamos con las mejores empresas de mensajería en Europa para garantizar que el producto le llegue de manera segura y en el menor tiempo posible.",
      en: "We work with the best couriers companies in Europe to ensure that the product reaches you safely and in the shortest time that possible.",
    },
    whatWeDoParagraph3: {
      pt: "Nosso departamento de importação e compras está à sua disposição a qualquer momento e fará todo o esforço para ajudá-lo a encontrar o produto de que precisa, mesmo que esteja procurando um produto que não existe em nosso site.",
      fr: "Notre département d'importation et d'achat est à votre disposition à tout moment et fera tous les efforts pour vous aider à trouver le produit dont vous avez besoin, même si vous cherchez un produit qui n'existe pas sur notre site.",
      es: "Nuestro departamento de importación y compras está a su disposición en cualquier momento y hará todo el esfuerzo posible para ayudarle a encontrar el producto que necesita, incluso si está buscando un producto que no existe en nuestro sitio.",
      en: "Our import and purchasing department are at your disposal anytime and will do all the effort to help you to find the product you need, even if you are looking for a product that does not exist on our site, just",
    },
    whatWeDoParagraph4: {
      pt: "Nosso atendimento ao cliente está sempre à sua disposição para qualquer dúvida e nosso serviço WhatsApp está disponível 24/7 para todos os nossos clientes para suporte técnico e para pedidos urgentes.",
      fr: "Notre service client est toujours à votre disposition pour toute question et notre service WhatsApp est disponible 24h/24 et 7j/7 pour tous nos clients pour le support technique et les commandes urgentes.",
      es: "Nuestro servicio de atención al cliente está siempre a su disposición para cualquier pregunta y nuestro servicio WhatsApp está disponible 24/7 para todos nuestros clientes para soporte técnico y para pedidos urgentes.",
      en: "Our customer service is always at your disposal for any question and you can Our WhatsApp service is available 24/7 for all our customers for technical support and for urgent orders.",
    },
    ourPopularBrand: {
      pt: "Nossa marca popular",
      fr: "Notre marque populaire",
      es: "Nuestra marca popular",
      en: "Our popular brand",
    },
  };

  // Helper function to get localized text
  const getText = (key) => {
    return textMap[key][lang] || textMap[key].en;
  };

  return (
    <>
      <div className="w-full mx-auto bg-[#f7f7f7]  overflow-hidden">
        {/* Who We Are Section */}
        <div className="w-full py-[50px] bg-[#ffffff]">
          <section className="w-full max-w-[1280px] mx-auto bg-[#ffffff] px-4 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
              {/* Text Content */}
              <div className="space-y-5">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                  {getText("whoWeAre")}
                </h2>
                <p className="text-base sm:text-lg leading-[150%] text-gray-700">
                  {getText("paragraph1")}
                </p>
                <p className="text-base sm:text-lg leading-[150%] text-gray-700">
                  {getText("paragraph2")}
                </p>
                <p className="text-base sm:text-lg leading-[150%] text-gray-700">
                  {getText("paragraph3")}
                </p>
                <p className="text-base sm:text-lg leading-[150%] text-gray-700">
                  {getText("paragraph4")}
                </p>
                <p className="text-base sm:text-lg leading-[150%] text-gray-700">
                  {getText("paragraph5")}
                </p>
                <p className="text-base sm:text-lg leading-[150%] text-gray-700">
                  {getText("paragraph6")}
                </p>
                <p className="text-base sm:text-lg font-semibold text-gray-800">
                  {getText("brandName")} <br />
                </p>
                <p className="text-base sm:text-lg leading-[150%] text-gray-700">
                  {getText("slogan")}
                </p>
              </div>
              {/* Image */}
              <div className="w-full md:max-w-[628px] mx-auto">
                <Image
                  src={about1}
                  alt="HDO Global Trade"
                  className="w-full h-auto md:h-[610px] rounded-lg shadow-md object-cover"
                  width={628}
                  height={610}
                  unoptimized
                />
              </div>
            </div>
          </section>
        </div>
        <div className="w-full py-[50px] bg-[#ffffff] ">
          <section className="w-full max-w-[1280px] mx-auto bg-[#ffffff] px-4 overflow-hidden">
            <div className="mx-auto">
              <Image
                src={teamImg}
                alt="Team"
                width={1280}
                height={600}
                className=" lg:w-[1280px] h-auto rounded-md shadow object-cover"
                priority
                unoptimized
              />
            </div>
          </section>
        </div>
        <div className="w-full py-[50px] bg-[#f4f3ef]">
          <section className="w-full  max-w-[1280px] mx-auto bg-[#f4f3ef] px-4 overflow-hidden">
            <div className="mb-8">
              <Image
                src={mapImg}
                alt="World Map"
                className="w-full h-auto lg:h-[859px] rounded-md shadow object-cover"
                width={800}
                height={600}
                unoptimized
              />
            </div>
            <h2 className="text-[48px] sm:text-3xl font-bold mb-6">
              {getText("whatWeDo")}
            </h2>
            <div className="space-y-4 text-base sm:text-lg leading-[150%] text-gray-700">
              <p>{getText("whatWeDoParagraph1")}</p>
              <br />
              <p>{getText("whatWeDoParagraph2")}</p>
              <p>{getText("whatWeDoParagraph3")}</p>
              <p>{getText("whatWeDoParagraph4")}</p>
            </div>
          </section>
        </div>
        <div className="w-full py-[50px] bg-[#e91325]">
          <section className="w-full  max-w-[1280px] mx-auto bg-[#e91325] px-4 overflow-hidden">
            <OurBrand title={getText("ourPopularBrand")} color="#FFFFFF" />
          </section>
        </div>
      </div>
    </>
  );
}