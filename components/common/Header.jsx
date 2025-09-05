

"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LanguageSwitcher from "./LnagSwither";
import Search from "./Search";
import Image from "next/image";
import { useState } from "react";
import {
  AngelDownIcon,
  CartIcon,
  SearchIcon,
  ThreeDotIcon,
} from "@/public/icons/icons";
import { useCart } from "@/providers/CartContext";
import { useDomain } from "@/providers/useDomain";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart } = useCart();
  const cartLengths = cart?.items?.length || 0;
  const lang = useDomain();

  // Internationalization mappings
  const textMap = {
    home: {
      pt: "Início",
      fr: "Accueil",
      es: "Inicio",
      en: "Home",
    },
    store: {
      pt: "Loja",
      fr: "Boutique",
      es: "Tienda",
      en: "Store",
    },
    aboutUs: {
      pt: "Sobre Nós",
      fr: "À Propos",
      es: "Sobre Nosotros",
      en: "About Us",
    },
    contactUs: {
      pt: "Contato",
      fr: "Contact",
      es: "Contacto",
      en: "Contact Us",
    },
    cart: {
      pt: "Carrinho",
      fr: "Panier",
      es: "Carrito",
      en: "Cart",
    },
    search: {
      pt: "Pesquisar",
      fr: "Rechercher",
      es: "Buscar",
      en: "Search",
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

  const toggleMobileMenu = () => {
    setIsSearchOpen(false);
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleSearchMenu = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen((prev) => !prev);
  };

  // Search functionality
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/shop");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const cartLength = cart?.items.length > 0 ? cart?.items.length : 0;
  const cartTotal = cart?.items?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0;

  // Function to check if a link is active
  const isActiveLink = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // Active link styles
  const activeClass = "text-[#fd3d57] font-semibold";
  const inactiveClass =
    "text-gray-700 hover:text-[#fd3d57] transition-colors duration-300";

  return (
    <div className="bg-white">
      {/* Main Header */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 py-2">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              {/* HDO Logo Circle - Exact match to the gold logo */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md">
                {/* Gold gradient background with metallic effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-600 rounded-full"></div>
                {/* Dark border for definition */}
                <div className="absolute inset-0 border-2 border-yellow-800 rounded-full"></div>
                {/* Inner shadow for 3D embossed effect */}
                <div className="absolute inset-0 rounded-full shadow-inner opacity-30"></div>
                {/* Highlight for metallic shine */}
                <div className="absolute top-1 left-1 right-1 h-8 bg-gradient-to-b from-white/20 to-transparent rounded-full"></div>
                
                                  {/* Logo content */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-1">
                    {/* HDO - Large, bold, dark text */}
                    <div className="text-yellow-900 font-black text-lg leading-none mb-0.5 drop-shadow-sm">
                      HDO
                    </div>
                    {/* Global Trade - Medium size */}
                    <div className="text-yellow-900 font-semibold text-xs leading-tight mb-0.5">
                      Global Trade
                    </div>
                    {/* Tagline - Small, thin */}
                    <div className="text-yellow-800 font-light text-[8px] leading-tight mb-0.5">
                      YOUR SPARE PARTS PARTNER
                    </div>
                    {/* Handshake icon */}
                    <div className="text-yellow-800 text-xs">🤝</div>
                  </div>
              </div>
            </Link>

            {/* Navigation Links - Exact styling match */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link
                href="/"
                className={`text-gray-800 hover:text-[#fd3d57] transition-colors duration-200 text-sm font-medium ${
                  isActiveLink("/") ? "text-[#fd3d57] font-semibold" : ""
                }`}
              >
                {getText("home")}
              </Link>
              <Link
                href="/shop"
                className={`text-gray-800 hover:text-[#fd3d57] transition-colors duration-200 text-sm font-medium ${
                  isActiveLink("/shop") ? "text-[#fd3d57] font-semibold" : ""
                }`}
              >
                {getText("store")}
              </Link>
              <Link
                href="/about"
                className={`text-gray-800 hover:text-[#fd3d57] transition-colors duration-200 text-sm font-medium ${
                  isActiveLink("/about") ? "text-[#fd3d57] font-semibold" : ""
                }`}
              >
                {getText("aboutUs")}
              </Link>
              <Link
                href="/contact"
                className={`text-gray-800 hover:text-[#fd3d57] transition-colors duration-200 text-sm font-medium ${
                  isActiveLink("/contact") ? "text-[#fd3d57] font-semibold" : ""
                }`}
              >
                {getText("contactUs")}
              </Link>
            </nav>

            {/* Search Bar - Exact match to hdotrade.com */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-56 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#fd3d57] focus:border-[#fd3d57] text-sm"
                />
                <button 
                  onClick={handleSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#fd3d57] text-white px-3 py-1 rounded text-sm hover:bg-[#e02d47] transition-colors"
                >
                  {getText("search")}
                </button>
              </div>
            </div>

            {/* Language Selector and Cart - Exact styling */}
            <div className="flex items-center space-x-3">
              <LanguageSwitcher />
              <Link
                href="/add-card"
                className="flex items-center space-x-2 text-gray-800 hover:text-[#fd3d57] transition-colors relative"
              >
                <CartIcon />
                <div className="hidden sm:block">
                  <div className="text-sm font-medium">€ {cartTotal.toFixed(2)}</div>
                </div>
                {cartLength > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#fd3d57] text-white text-xs rounded-full flex items-center justify-center">
                    {cartLength}
                  </div>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden bg-[#fd3d57] w-8 h-8 rounded flex items-center justify-center text-white"
              aria-label="Menu"
            >
              <ThreeDotIcon />
            </button>
          </div>
        </div>
      </header>


      {/* Mobile Menu Dropdown */}
      <div
        className={`
          lg:hidden bg-white text-gray-800 px-6 py-4 space-y-4 absolute left-0 w-full z-50 border-b border-gray-200
          transform transition-all duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? "top-[64px] opacity-100 translate-y-0"
              : "top-0 opacity-0 -translate-y-full pointer-events-none"
          }
        `}
      >
        <Link
          href="/"
          className={`block text-sm font-medium hover:text-[#fd3d57] transition-colors ${
            isActiveLink("/") ? "text-[#fd3d57]" : "text-gray-800"
          }`}
          onClick={toggleMobileMenu}
        >
          {getText("home")}
        </Link>
        <Link
          href="/shop"
          className={`block text-sm font-medium hover:text-[#fd3d57] transition-colors ${
            isActiveLink("/shop") ? "text-[#fd3d57]" : "text-gray-800"
          }`}
          onClick={toggleMobileMenu}
        >
          {getText("store")}
        </Link>
        <Link
          href="/about"
          className={`block text-sm font-medium hover:text-[#fd3d57] transition-colors ${
            isActiveLink("/about") ? "text-[#fd3d57]" : "text-gray-800"
          }`}
          onClick={toggleMobileMenu}
        >
          {getText("aboutUs")}
        </Link>
        <Link
          href="/contact"
          className={`block text-sm font-medium hover:text-[#fd3d57] transition-colors ${
            isActiveLink("/contact") ? "text-[#fd3d57]" : "text-gray-800"
          }`}
          onClick={toggleMobileMenu}
        >
          {getText("contactUs")}
        </Link>
        <div className="pt-2 border-t border-gray-200">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#fd3d57] focus:border-[#fd3d57] text-sm"
            />
            <button 
              onClick={handleSearch}
              className="w-full bg-[#fd3d57] text-white px-3 py-2 rounded text-sm hover:bg-[#e02d47] transition-colors"
            >
              {getText("search")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}