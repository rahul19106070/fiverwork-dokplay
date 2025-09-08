"use client";
import worldDisImg from "@/public/client/worldDis.png";
import payment1 from "@/public/client/payment1.png";
import payment2 from "@/public/client/payment2.png";
import payment3 from "@/public/client/payment3.png";
import payment4 from "@/public/client/payment4.png";
import payment5 from "@/public/client/payment5.png";
import payment6 from "@/public/client/payment6.png";
import logo from "@/public/client/logo.png";
import Image from "next/image";
import {
  FbIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/public/icons/icons";

import Link from "next/link";
import { useDomain } from "@/providers/useDomain";

export default function Footer() {
  const lang = useDomain();

  // Internationalization mappings
  const textMap = {
    findProduct: {
      pt: "Encontrar Produto",
      fr: "Trouver un Produit",
      es: "Encontrar Producto",
      en: "Find Product",
    },
    getHelp: {
      pt: "Obter Ajuda",
      fr: "Obtenir de l'Aide",
      es: "Obtener Ayuda",
      en: "Get help",
    },
    aboutUs: {
      pt: "Sobre Nós",
      fr: "À Propos",
      es: "Sobre Nosotros",
      en: "About us",
    },
    privacyPolicy: {
      pt: "Política de Privacidade",
      fr: "Politique de Confidentialité",
      es: "Política de Privacidad",
      en: "Privacy Policy",
    },
    refundsReturns: {
      pt: "Reembolsos e Devoluções",
      fr: "Remboursements et Retours",
      es: "Reembolsos y Devoluciones",
      en: "Refunds & Returns",
    },
    termsConditions: {
      pt: "Termos e Condições",
      fr: "Termes et Conditions",
      es: "Términos y Condiciones",
      en: "Terms Conditions",
    },
    onlineComplaintsBook: {
      pt: "Livro de Reclamações Online",
      fr: "Livre de Réclamations en Ligne",
      es: "Libro de Reclamaciones en Línea",
      en: "Online Complaints Book",
    },
    followUs: {
      pt: "Siga-nos",
      fr: "Suivez-nous",
      es: "Síganos",
      en: "Follow us",
    },
    copyright: {
      pt: "Direitos de autor © {company} {year}",
      fr: "Droit d'auteur © {company} {year}",
      es: "Derechos de autor © {company} {year}",
      en: "Copyright © {company} {year}",
    },
    weAccept: {
      pt: "Aceitamos",
      fr: "Nous acceptons",
      es: "Aceptamos",
      en: "We accept",
    },
    worldwideShipping: {
      pt: "Envio Mundial",
      fr: "Livraison Mondiale",
      es: "Envío Mundial",
      en: "Worldwide Shipping",
    },
    visa: {
      pt: "Visa",
      fr: "Visa",
      es: "Visa",
      en: "Visa",
    },
    mastercard: {
      pt: "Mastercard",
      fr: "Mastercard",
      es: "Mastercard",
      en: "Mastercard",
    },
    paypal: {
      pt: "PayPal",
      fr: "PayPal",
      es: "PayPal",
      en: "PayPal",
    },
    americanExpress: {
      pt: "American Express",
      fr: "American Express",
      es: "American Express",
      en: "American Express",
    },
    applePay: {
      pt: "Apple Pay",
      fr: "Apple Pay",
      es: "Apple Pay",
      en: "Apple Pay",
    },
    googlePay: {
      pt: "Google Pay",
      fr: "Google Pay",
      es: "Google Pay",
      en: "Google Pay",
    },
    loading: {
      pt: "Carregando produtos...",
      fr: "Chargement des produits...",
      es: "Cargando productos...",
      en: "Loading products...",
    },
  };

  // Helper function to get localized text
  const getText = (key, params = {}) => {
    let text = textMap[key][lang] || textMap[key].en;
    // Replace parameters in the text
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, value);
    });
    return text;
  };



  return (
    <footer className="bg-red-600 text-white">
      {/* Top Section */}
      <div className="bg-[#061E3E] py-10 text-white">
        <div className="max-w-[1440px] w-full lg:justify-items-end mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          {/* Logo and Address */}
          <div className="text-left mt-[-40px]">
            <Image src={logo} alt="HDO Logo" width={110} height={110} />
            <p className="text-[14px] leading-relaxed">
              Quinta das rosas lote 3 R/C Esq, 6200-551 Covilhã, Portugal
            </p>
            <p className="mt-4 text-[16px] font-medium">
              {getText("followUs")}
            </p>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://facebook.com/hdotrade"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FbIcon />
              </a>
              <a
                href="https://instagram.com/hdotrade"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://linkedin.com/company/hdotrade"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://twitter.com/hdotrade"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
              >
                <XIcon />
              </a>
            </div>
          </div>
          {/* Product Links */}
          <div className="text-left">
            <h4 className="font-semibold mb-2 text-[16px]">
              {getText("findProduct")}
            </h4>
            <ul className="space-y-1 text-[14px]">
              <li className="text-white">Dishwasher spare parts</li>
              <li className="text-white">Vegetable cutter spare parts</li>
              <li className="text-white">Juicer spare parts</li>
              <li className="text-white">Hand mixer spare parts</li>
              <li className="text-white">
                Food processor/ bowl cutters spare parts
              </li>
      
            </ul>
          </div>
          {/* Help Links */}
          <div className="text-left">
            <h4 className="font-semibold mb-2 text-[16px]">
              {getText("getHelp")}
            </h4>
            <ul className="space-y-1 text-[14px]">
              <li>
                <Link
                  href="/about"
                  className="text-white hover:underline hover:text-gray-200"
                >
                  {getText("aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-white hover:underline hover:text-gray-200"
                >
                  {getText("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/refunds-returns"
                  className="text-white hover:underline hover:text-gray-200"
                >
                  {getText("refundsReturns")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="text-white hover:underline hover:text-gray-200"
                >
                  {getText("termsConditions")}
                </Link>
              </li>
              <li>
                <Link
                  href="/online-complaints-book"
                  className="text-white hover:underline hover:text-gray-200"
                >
                  {getText("onlineComplaintsBook")}
                </Link>
              </li>
            </ul>
          </div>
          {/* Shipping Image */}
          <div className="flex justify-center lg:justify-start items-start">
            <Image
              src={worldDisImg}
              alt={getText("worldwideShipping")}
              width={160}
              height={130}
            />
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="bg-[#e91325] py-4 text-sm">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div>
            {getText("copyright", {
              company: "HDOGLOBALTRADE",
              year: new Date().getFullYear(),
            })}
          </div>
          <div>
            <span className="text-start sm:text-center">
              {getText("weAccept")}
            </span>
            <div className="flex items-center py-4 space-x-2">
              <Image
                src={payment1}
                alt={getText("visa")}
                className="h-5"
                width={50}
                height={60}
              />
              <Image
                src={payment2}
                alt={getText("mastercard")}
                className="h-5"
                width={50}
                height={60}
              />
              <Image
                src={payment3}
                alt={getText("paypal")}
                className="h-5"
                width={50}
                height={60}
              />
              <Image
                src={payment4}
                alt={getText("americanExpress")}
                className="h-5"
                width={50}
                height={60}
              />
              <Image
                src={payment5}
                alt={getText("applePay")}
                className="h-5"
                width={50}
                height={60}
              />
              <Image
                src={payment6}
                alt={getText("googlePay")}
                className="h-5"
                width={50}
                height={60}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
