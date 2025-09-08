"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useState } from "react";
import countries from "@/database/countries.json";
import { calculateTotalByFields } from "@/utils/healperFunc";
import { europeanCountries } from "@/database/europe";
import { asianCountries } from "@/database/asianCountry";
import { euUkVatCheck, placeOrder } from "@/database/queries";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDomain } from "@/providers/useDomain";

export default function CheckoutPage({
  products,
  subtotal,
  trackingId,
  currency,
}) {
  // Form state
  const savedCountry = Cookies.get("selectedCountry");
  const parsed = JSON.parse(savedCountry);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    state: parsed?.name || "",
    city: "",
    zip: "",
    phone: "",
    sameAddress: false,
    paid: false,
    coupon: "",
    orderComment: "",
    agreeTerms: false,
    trackingId,
  });

  // Language state
  const lang = useDomain();

  // Language mappings
  const textMap = {
    // Form labels
    firstName: {
      en: "First Name",
      pt: "Nome",
      fr: "Prénom",
      es: "Nombre",
    },
    lastName: {
      en: "Last Name",
      pt: "Sobrenome",
      fr: "Nom",
      es: "Apellido",
    },
    emailAddress: {
      en: "Email Address",
      pt: "Endereço de Email",
      fr: "Adresse Email",
      es: "Dirección de Email",
    },
    streetAddress: {
      en: "Street Address",
      pt: "Endereço",
      fr: "Adresse",
      es: "Dirección",
    },
    countryState: {
      en: "Country/State",
      pt: "País/Estado",
      fr: "Pays/État",
      es: "País/Estado",
    },
    city: {
      en: "City",
      pt: "Cidade",
      fr: "Ville",
      es: "Ciudad",
    },
    zipPostal: {
      en: "Zip/Postal Code",
      pt: "CEP/Código Postal",
      fr: "Code Postal",
      es: "Código Postal",
    },
    phoneNumber: {
      en: "Phone number",
      pt: "Número de Telefone",
      fr: "Numéro de Téléphone",
      es: "Número de Teléfono",
    },

    // Section titles
    billingShipping: {
      en: "Billing / Shipping Address",
      pt: "Endereço de Cobrança / Envio",
      fr: "Adresse de Facturation / Livraison",
      es: "Dirección de Facturación / Envío",
    },
    euVat: {
      en: "EU VAT Validation",
      pt: "Validação de VAT da UE",
      fr: "Validation de TVA UE",
      es: "Validación de IVA de la UE",
    },
    orderReview: {
      en: "Order Review",
      pt: "Revisão do Pedido",
      fr: "Révision de la Commande",
      es: "Revisión del Pedido",
    },
    discountCodes: {
      en: "Discount Codes",
      pt: "Códigos de Desconto",
      fr: "Codes de Réduction",
      es: "Códigos de Descuento",
    },
    billingSummary: {
      en: "Billing Summary",
      pt: "Resumo da Fatura",
      fr: "Résumé de la Facturation",
      es: "Resumen de Facturación",
    },

    // Placeholders
    vatPlaceholder: {
      en: "Enter EU VAT Number (e.g. DE123456789)",
      pt: "Insira o Número VAT da UE (ex: PT123456789)",
      fr: "Entrez le numéro de TVA UE (ex: FR123456789)",
      es: "Ingrese el número de IVA de la UE (ej: ES123456789)",
    },
    couponPlaceholder: {
      en: "Enter your coupon code",
      pt: "Insira seu código de cupom",
      fr: "Entrez votre code de réduction",
      es: "Ingrese su código de cupón",
    },
    orderCommentPlaceholder: {
      en: "Order Comment",
      pt: "Comentário do Pedido",
      fr: "Commentaire de Commande",
      es: "Comentario del Pedido",
    },
    selectCountry: {
      en: "-- Select Country/State --",
      pt: "-- Selecione País/Estado --",
      fr: "-- Sélectionner Pays/État --",
      es: "-- Seleccionar País/Estado --",
    },

    // Buttons
    validateVat: {
      en: "Validate VAT",
      pt: "Validar VAT",
      fr: "Valider TVA",
      es: "Validar IVA",
    },
    validating: {
      en: "Validating...",
      pt: "Validando...",
      fr: "Validation...",
      es: "Validando...",
    },
    apply: {
      en: "Apply",
      pt: "Aplicar",
      fr: "Appliquer",
      es: "Aplicar",
    },
    remove: {
      en: "Remove",
      pt: "Remover",
      fr: "Supprimer",
      es: "Eliminar",
    },
    checkout: {
      en: "Checkout",
      pt: "Finalizar Compra",
      fr: "Paiement",
      es: "Proceder al Pago",
    },
    processing: {
      en: "Processing...",
      pt: "Processando...",
      fr: "Traitement...",
      es: "Procesando...",
    },

    // Messages
    vatValid: {
      en: "✓ Valid EU VAT Number - Tax Free",
      pt: "✓ Número VAT da UE Válido - Isento de Impostos",
      fr: "✓ Numéro de TVA UE valide - Exonéré de taxes",
      es: "✓ Número de IVA de la UE válido - Libre de impuestos",
    },
    vatInvalid: {
      en: "✗ Invalid VAT Number - 23% Tax Applies",
      pt: "✗ Número VAT Inválido - Aplica-se 23% de Imposto",
      fr: "✗ Numéro de TVA invalide - 23% de taxe s'applique",
      es: "✗ Número de IVA inválido - Se aplica 23% de impuesto",
    },
    vatError: {
      en: "Error checking VAT number",
      pt: "Erro ao verificar número VAT",
      fr: "Erreur lors de la vérification du numéro de TVA",
      es: "Error al verificar el número de IVA",
    },
    vatShort: {
      en: "Enter VAT number starting with country code (e.g. DE123456789)",
      pt: "Insira número VAT começando com código do país (ex: PT123456789)",
      fr: "Entrez le numéro de TVA commençant par le code pays (ex: FR123456789)",
      es: "Ingrese el número de IVA comenzando con el código del país (ej: ES123456789)",
    },
    couponApplied: {
      en: "Coupon Applied: ",
      pt: "Cupom Aplicado: ",
      fr: "Code Appliqué: ",
      es: "Cupón Aplicado: ",
    },
    discount: {
      en: " discount",
      pt: " desconto",
      fr: " réduction",
      es: " descuento",
    },

    enterCoupon: {
      en: "Please enter a coupon code",
      pt: "Por favor, insira um código de cupom",
      fr: "Veuillez entrer un code de réduction",
      es: "Por favor, ingrese un código de cupón",
    },
    invalidCoupon: {
      en: "Invalid or expired coupon code",
      pt: "Código de cupom inválido ou expirado",
      fr: "Code de réduction invalide ou expiré",
      es: "Código de cupón inválido o expirado",
    },
    sameAddress: {
      en: "My billing and shipping address are the same",
      pt: "Meu endereço de cobrança e envio são os mesmos",
      fr: "Mon adresse de facturation et de livraison sont identiques",
      es: "Mi dirección de facturación y envío son las mismas",
    },
    agreeTerms: {
      en: "Please check to acknowledge our",
      pt: "Por favor, marque para reconhecer nosso",
      fr: "Veuillez cocher pour accepter nos",
      es: "Por favor, marque para aceptar nuestros",
    },
    privacyTerms: {
      en: "Privacy & Terms Policy",
      pt: "Política de Privacidade e Termos",
      fr: "Politique de Confidentialité et Conditions",
      es: "Política de Privacidad y Términos",
    },

    // Validation errors
    firstNameRequired: {
      en: "First name is required",
      pt: "Nome é obrigatório",
      fr: "Le prénom est requis",
      es: "El nombre es obligatorio",
    },
    lastNameRequired: {
      en: "Last name is required",
      pt: "Sobrenome é obrigatório",
      fr: "Le nom est requis",
      es: "El apellido es obligatorio",
    },
    emailRequired: {
      en: "Email is required",
      pt: "Email é obrigatório",
      fr: "L'email est requis",
      es: "El email es obligatorio",
    },
    invalidEmail: {
      en: "Invalid email format",
      pt: "Formato de email inválido",
      fr: "Format d'email invalide",
      es: "Formato de email inválido",
    },
    addressRequired: {
      en: "Address is required",
      pt: "Endereço é obrigatório",
      fr: "L'adresse est requise",
      es: "La dirección es obligatoria",
    },
    cityRequired: {
      en: "City is required",
      pt: "Cidade é obrigatória",
      fr: "La ville est requise",
      es: "La ciudad es obligatoria",
    },
    zipRequired: {
      en: "ZIP code is required",
      pt: "CEP é obrigatório",
      fr: "Le code postal est requis",
      es: "El código postal es obligatorio",
    },
    phoneRequired: {
      en: "Phone is required",
      pt: "Telefone é obrigatório",
      fr: "Le téléphone est requis",
      es: "El teléfono es obligatorio",
    },
    agreeTermsRequired: {
      en: "You must agree to the terms",
      pt: "Você deve concordar com os termos",
      fr: "Vous devez accepter les conditions",
      es: "Debe aceptar los términos",
    },

    // Order summary
    subtotal: {
      en: "Subtotal",
      pt: "Subtotal",
      fr: "Sous-total",
      es: "Subtotal",
    },

    shipping: {
      en: "Shipping",
      pt: "Envio",
      fr: "Livraison",
      es: "Envío",
    },
    tax: {
      en: "Tax",
      pt: "Imposto",
      fr: "Taxe",
      es: "Impuesto",
    },
    grandTotal: {
      en: "Grand Total",
      pt: "Total Geral",
      fr: "Total",
      es: "Total",
    },
    qty: {
      en: "Qty",
      pt: "Qtd",
      fr: "Qté",
      es: "Cant",
    },
  };

  // Get localized text with English fallback
  const getText = (key) => textMap[key][lang] || textMap[key].en;

  // Get localized product name
  const getProductName = (product) => {
    const nameMap = {
      pt: product.namePt,
      fr: product.nameFr,
      es: product.nameEs,
    };
    return nameMap[lang] || product.name;
  };

  // Discount state
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  let shipping = 0;
  if (formData.state === "Spain") {
    shipping = calculateTotalByFields(products, "spain");
  } else if (formData.state === "Portugal") {
    shipping = calculateTotalByFields(products, "portugal");
  } else if (formData.state === "France") {
    shipping = calculateTotalByFields(products, "france");
  } else if (europeanCountries.includes(formData.state)) {
    shipping = calculateTotalByFields(products, "europe");
  } else if (asianCountries.includes(formData.state)) {
    shipping = calculateTotalByFields(products, "asia");
  } else {
    shipping = calculateTotalByFields(products, "world");
  }

  // VAT validation state
  const [vat, setVat] = useState("");
  const [vatResult, setVatResult] = useState(null);
  const [vatLoading, setVatLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Calculate discount amount
  const discountAmount = appliedCoupon ? appliedCoupon.value : 0;

  // Calculate subtotal after discount
  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);

  // Calculate tax and totals
  const taxRate = vatResult?.valid ? 0 : 0.23;
  const taxAmount = subtotalAfterDiscount * taxRate;
  const grandTotal = subtotalAfterDiscount + shipping + taxAmount;

  const handleVatCheck = async () => {
    if (vat.length < 3) {
      alert(getText("vatShort"));
      return;
    }
    setVatLoading(true);
    setVatResult(null);
    const countryCode = vat.slice(0, 2).toUpperCase();
    const vatNumber = vat.slice(2).replace(/\s+/g, "");
    try {
      const res = await euUkVatCheck(countryCode, vatNumber);
      setVatResult(res);
    } catch (error) {
      setVatResult({ valid: false, error: getText("vatError") });
    } finally {
      setVatLoading(false);
    }
  };

  const applyCoupon = () => {
    setCouponError("");
    if (!formData.coupon.trim()) {
      setCouponError(getText("enterCoupon"));
      return;
    }
    // Check if any product has a discount code that matches
    const validCoupon = products
      .flatMap((product) => product.discountCodes || [])
      .find(
        (coupon) =>
          coupon.code.toLowerCase() === formData.coupon.trim().toLowerCase() &&
          coupon.isActive
      );
    if (validCoupon) {
      setAppliedCoupon(validCoupon);
      setCouponError("");
    } else {
      setCouponError(getText("invalidCoupon"));
      setAppliedCoupon(null);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setFormData((prev) => ({ ...prev, coupon: "" }));
    setCouponError("");
  };

  const validateForm = () => {
    const newErrors = {};
    // Required fields validation
    if (!formData.firstName.trim())
      newErrors.firstName = getText("firstNameRequired");
    if (!formData.lastName.trim())
      newErrors.lastName = getText("lastNameRequired");
    if (!formData.email.trim()) {
      newErrors.email = getText("emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = getText("invalidEmail");
    }
    if (!formData.streetAddress.trim())
      newErrors.streetAddress = getText("addressRequired");
    if (!formData.city.trim()) newErrors.city = getText("cityRequired");
    if (!formData.zip.trim()) newErrors.zip = getText("zipRequired");
    if (!formData.phone.trim()) newErrors.phone = getText("phoneRequired");
    if (!formData.agreeTerms)
      newErrors.agreeTerms = getText("agreeTermsRequired");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    // Clear coupon error when typing in coupon field
    if (name === "coupon" && couponError) {
      setCouponError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    setIsSubmitting(true);
    const payload = {
      ...formData,
      vatValid: vatResult?.valid || false,
      vatNumber: vat,
      appliedCoupon: appliedCoupon ? appliedCoupon.code : null,
      cartItems: products.map((product) => ({
        id: product.id,
        name: getProductName(product),
        qty: product.quantity,
        price: product.price?.usd || product.price,
        image: product.image,
      })),
      totals: {
        subtotal,
        discount: discountAmount,
        shipping,
        tax: taxAmount,
        grandTotal,
        currency,
      },
    };
    const res = await placeOrder(payload);
    if (res.success == true) {
      router.push("/checkout/payment");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white min-h-screen py-10 px-4 w-full max-w-[1440px] mx-auto"
    >
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Billing Address */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              {getText("billingShipping")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[20px]">
              <div className="relative">
                <div className="absolute -top-3 left-3 px-2 bg-white">
                  <label className="text-sm font-medium text-gray-500">
                    {getText("firstName")}
                  </label>
                </div>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  type="text"
                  className={`border rounded-lg p-2 w-full ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="relative">
                <div className="absolute -top-3 left-3 px-2 bg-white">
                  <label className="text-sm font-medium text-gray-500">
                    {getText("lastName")}
                  </label>
                </div>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  type="text"
                  className={`border rounded-lg p-2 w-full ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-[20px]">
              <div className="relative">
                <div className="absolute -top-3 left-3 px-2 bg-white">
                  <label className="text-sm font-medium text-gray-500">
                    {getText("emailAddress")}
                  </label>
                </div>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  className={`border rounded-lg p-2 w-full ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="relative">
                <div className="absolute -top-3 left-3 px-2 bg-white">
                  <label className="text-sm font-medium text-gray-500">
                    {getText("streetAddress")}
                  </label>
                </div>
                <input
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  type="text"
                  className={`border rounded-lg p-2 w-full ${
                    errors.streetAddress ? "border-red-500" : ""
                  }`}
                />
                {errors.streetAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.streetAddress}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute -top-3 left-3 px-2 bg-white">
                  <label className="text-sm font-medium text-gray-500">
                    {getText("countryState")}
                  </label>
                </div>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`border rounded-lg p-2 w-full bg-white ${
                    errors.state ? "border-red-500" : ""
                  }`}
                >
                  <option value="">{getText("selectCountry")}</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>
              <div className="relative">
                <div className="absolute -top-3 left-3 px-2 bg-white">
                  <label className="text-sm font-medium text-gray-500">
                    {getText("city")}
                  </label>
                </div>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  type="text"
                  className={`border rounded-lg p-2 w-full ${
                    errors.city ? "border-red-500" : ""
                  }`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
              <div className="relative">
                <div className="absolute -top-3 left-3 px-2 bg-white">
                  <label className="text-sm font-medium text-gray-500">
                    {getText("zipPostal")}
                  </label>
                </div>
                <input
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  type="text"
                  className={`border rounded-lg p-2 w-full ${
                    errors.zip ? "border-red-500" : ""
                  }`}
                />
                {errors.zip && (
                  <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
                )}
              </div>
              <div className="relative">
                <div className="absolute -top-3 left-3 px-2 bg-white">
                  <label className="text-sm font-medium text-gray-500">
                    {getText("phoneNumber")}
                  </label>
                </div>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  className={`border rounded-lg p-2 w-full ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <label className="flex items-center space-x-2">
              <input
                name="sameAddress"
                checked={formData.sameAddress}
                onChange={handleChange}
                type="checkbox"
                className="rounded"
              />
              <span>{getText("sameAddress")}</span>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-4">
            {/* EU VAT Validation */}
            <div className="bg-white rounded-lg w-md shadow p-6">
              <h2 className="text-lg font-semibold mb-4">{getText("euVat")}</h2>
              <div className="flex flex-col space-y-3">
                <input
                  type="text"
                  placeholder={getText("vatPlaceholder")}
                  value={vat}
                  onChange={(e) => setVat(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleVatCheck}
                  disabled={vatLoading}
                  className={`py-2 px-4 rounded-lg text-white ${
                    vatLoading
                      ? "bg-gray-400"
                      : "bg-[#0eadef] hover:bg-[#0091cf]"
                  }`}
                >
                  {vatLoading ? getText("validating") : getText("validateVat")}
                </button>
                {vatResult && (
                  <div
                    className={`p-3 rounded-lg text-center ${
                      vatResult.valid
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {vatResult.valid
                      ? getText("vatValid")
                      : vatResult.error || getText("vatInvalid")}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="space-y-6">
          {/* Order Review */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              {getText("orderReview")}
            </h2>
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center space-x-3">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={getProductName(product)}
                      width={50}
                      height={50}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">
                      {getProductName(product)}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span>
                        {getText("qty")}: {product.quantity}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="font-medium">
                  {currency === "euro"
                    ? `€${product.price?.eur || product.price}`
                    : `$${product.price?.usd || product.price}`}
                </p>
              </div>
            ))}
          </div>
          {/* Discount Codes */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              {getText("discountCodes")}
            </h2>
            {appliedCoupon ? (
              <div className="bg-green-50 p-3 rounded-lg mb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-green-800">
                      {getText("couponApplied")}
                      {appliedCoupon.code}
                    </p>
                    <p className="text-sm text-green-600">
                      -{currency === "euro" ? "€" : "$"}
                      {appliedCoupon.value}
                      {getText("discount")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    {getText("remove")}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <input
                  name="coupon"
                  value={formData.coupon}
                  onChange={handleChange}
                  type="text"
                  placeholder={getText("couponPlaceholder")}
                  className="border rounded-lg p-2 flex-1"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="bg-[#0eadef] text-white px-4 py-2 rounded-lg hover:bg-[#0091cf]"
                >
                  {getText("apply")}
                </button>
              </div>
            )}
            {couponError && (
              <p className="text-red-500 text-sm mt-2">{couponError}</p>
            )}
          </div>
          <div className="bg-white rounded-lg shadow p-6 space-y-2">
            <h2 className="text-lg font-semibold mb-4">
              {getText("billingSummary")}
            </h2>
            {(() => {
              const format = (amount) => {
                const symbol = currency === "euro" ? "€" : "$";
                return `${symbol}${Number(amount).toFixed(2)}`;
              };
              return (
                <>
                  <div className="flex justify-between">
                    <span>{getText("subtotal")}</span>
                    <span>{format(subtotal)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>
                        {getText("discount")} ({appliedCoupon.code})
                      </span>
                      <span>-{format(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>{getText("shipping")}</span>
                    <span>{format(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      {getText("tax")} ({vatResult?.valid ? "0%" : "23%"})
                    </span>
                    <span>{format(taxAmount)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>{getText("grandTotal")}</span>
                    <span>{format(grandTotal)}</span>
                  </div>
                </>
              );
            })()}
            <textarea
              name="orderComment"
              value={formData.orderComment}
              onChange={handleChange}
              placeholder={getText("orderCommentPlaceholder")}
              className="border rounded-lg p-2 w-full mt-4"
            />
            <div>
              <label className="flex items-center space-x-2 mt-2">
                <input
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  type="checkbox"
                  className="rounded"
                />
                <span>
                  {getText("agreeTerms")}{" "}
                  <Link
                    href="/terms-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500"
                  >
                    {getText("privacyTerms")}
                  </Link>
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !formData.agreeTerms}
              className={`w-full py-4 px-6 text-lg font-medium rounded-none transition-colors ${
                isSubmitting || !formData.agreeTerms
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#0eadef] text-white hover:bg-[#00aef9]"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  {getText("processing")}
                </span>
              ) : (
                getText("checkout")
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

// "use client";
// import Cookies from "js-cookie";
// import Image from "next/image";
// import React, { useState } from "react";
// import countries from "@/database/countries.json";
// import { calculateTotalByFields } from "@/utils/healperFunc";
// import { europeanCountries } from "@/database/europe";
// import { asianCountries } from "@/database/asianCountry";
// import { euUkVatCheck, placeOrder } from "@/database/queries";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function CheckoutPage({
//   products,
//   subtotal,
//   trackingId,
//   currency,
// }) {
//   // Form state
//   const savedCountry = Cookies.get("selectedCountry");
//   const parsed = JSON.parse(savedCountry);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     streetAddress: "",
//     state: parsed?.name || "",
//     city: "",
//     zip: "",
//     phone: "",
//     sameAddress: false,
//     paid: false,
//     coupon: "",
//     orderComment: "",
//     agreeTerms: false,
//     trackingId,
//   });

//   // Discount state
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const [couponError, setCouponError] = useState("");

//   let shipping = 0;
//   if (formData.state === "Spain") {
//     shipping = calculateTotalByFields(products, "spain");
//   } else if (formData.state === "Portugal") {
//     shipping = calculateTotalByFields(products, "portugal");
//   } else if (formData.state === "France") {
//     shipping = calculateTotalByFields(products, "france");
//   } else if (europeanCountries.includes(formData.state)) {
//     shipping = calculateTotalByFields(products, "europe");
//   } else if (asianCountries.includes(formData.state)) {
//     shipping = calculateTotalByFields(products, "asia");
//   } else {
//     shipping = calculateTotalByFields(products, "world");
//   }

//   // VAT validation state
//   const [vat, setVat] = useState("");
//   const [vatResult, setVatResult] = useState(null);
//   const [vatLoading, setVatLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

//   // Calculate discount amount
//   const discountAmount = appliedCoupon ? appliedCoupon.value : 0;

//   // Calculate subtotal after discount
//   const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);

//   // Calculate tax and totals
//   const taxRate = vatResult?.valid ? 0 : 0.23;
//   const taxAmount = subtotalAfterDiscount * taxRate;
//   const grandTotal = subtotalAfterDiscount + shipping + taxAmount;

//    console.log("working..........", products);

//   const handleVatCheck = async () => {
//     if (vat.length < 3) {
//       alert("Enter VAT number starting with country code (e.g. DE123456789)");
//       return;
//     }

//     setVatLoading(true);
//     setVatResult(null);

//     const countryCode = vat.slice(0, 2).toUpperCase();
//     const vatNumber = vat.slice(2).replace(/\s+/g, "");

//     try {
//       const res = await euUkVatCheck(countryCode, vatNumber);
//       setVatResult(res);
//     } catch (error) {
//       setVatResult({ valid: false, error: "Error checking VAT number" });
//     } finally {
//       setVatLoading(false);
//     }
//   };

//   const applyCoupon = () => {
//     setCouponError("");

//     if (!formData.coupon.trim()) {
//       setCouponError("Please enter a coupon code");
//       return;
//     }

//     // Check if any product has a discount code that matches

//     const validCoupon = products
//       .flatMap((product) => product.discountCodes || [])
//       .find(
//         (coupon) =>
//           coupon.code.toLowerCase() === formData.coupon.trim().toLowerCase() &&
//           coupon.isActive
//       );

//     if (validCoupon) {
//       setAppliedCoupon(validCoupon);
//       setCouponError("");
//     } else {
//       setCouponError("Invalid or expired coupon code");
//       setAppliedCoupon(null);
//     }
//   };

//   const removeCoupon = () => {
//     setAppliedCoupon(null);
//     setFormData((prev) => ({ ...prev, coupon: "" }));
//     setCouponError("");
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Required fields validation
//     if (!formData.firstName.trim())
//       newErrors.firstName = "First name is required";
//     if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.streetAddress.trim())
//       newErrors.streetAddress = "Address is required";
//     if (!formData.city.trim()) newErrors.city = "City is required";
//     if (!formData.zip.trim()) newErrors.zip = "ZIP code is required";
//     if (!formData.phone.trim()) newErrors.phone = "Phone is required";

//     if (!formData.agreeTerms)
//       newErrors.agreeTerms = "You must agree to the terms";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }

//     // Clear coupon error when typing in coupon field
//     if (name === "coupon" && couponError) {
//       setCouponError("");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const isValid = validateForm();

//     if (!isValid) {
//       return;
//     }

//     setIsSubmitting(true);

//     const payload = {
//       ...formData,
//       vatValid: vatResult?.valid || false,
//       vatNumber: vat,
//       appliedCoupon: appliedCoupon ? appliedCoupon.code : null,
//       cartItems: products.map((product) => ({
//         id: product.id,
//         name: product.name,
//         qty: product.quantity,
//         price: product.price?.usd || product.price,
//         image: product.image,
//       })),
//       totals: {
//         subtotal,
//         discount: discountAmount,
//         shipping,
//         tax: taxAmount,
//         grandTotal,
//         currency,
//       },
//     };

//     const res = await placeOrder(payload);

//     if (res.success == true) {
//       router.push("/checkout/payment");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white min-h-screen py-10 px-4 w-full max-w-[1440px] mx-auto"
//     >
//       <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Billing Address */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-lg font-semibold mb-4">
//               Billing / Shipping Address
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[20px]">
//               <div className="relative">
//                 <div className="absolute -top-3 left-3 px-2 bg-white">
//                   <label className="text-sm font-medium text-gray-500">
//                     First Name
//                   </label>
//                 </div>
//                 <input
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   type="text"
//                   className={`border rounded-lg p-2 w-full ${
//                     errors.firstName ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.firstName && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.firstName}
//                   </p>
//                 )}
//               </div>

//               <div className="relative">
//                 <div className="absolute -top-3 left-3 px-2 bg-white">
//                   <label className="text-sm font-medium text-gray-500">
//                     Last Name
//                   </label>
//                 </div>
//                 <input
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   type="text"
//                   className={`border rounded-lg p-2 w-full ${
//                     errors.lastName ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.lastName && (
//                   <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
//                 )}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-[20px]">
//               <div className="relative">
//                 <div className="absolute -top-3 left-3 px-2 bg-white">
//                   <label className="text-sm font-medium text-gray-500">
//                     Email Address
//                   </label>
//                 </div>
//                 <input
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   type="email"
//                   className={`border rounded-lg p-2 w-full ${
//                     errors.email ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                 )}
//               </div>

//               <div className="relative">
//                 <div className="absolute -top-3 left-3 px-2 bg-white">
//                   <label className="text-sm font-medium text-gray-500">
//                     Street Address
//                   </label>
//                 </div>
//                 <input
//                   name="streetAddress"
//                   value={formData.streetAddress}
//                   onChange={handleChange}
//                   type="text"
//                   className={`border rounded-lg p-2 w-full ${
//                     errors.streetAddress ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.streetAddress && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.streetAddress}
//                   </p>
//                 )}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="relative">
//                 <div className="absolute -top-3 left-3 px-2 bg-white">
//                   <label className="text-sm font-medium text-gray-500">
//                     Country/State
//                   </label>
//                 </div>
//                 <select
//                   name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                   className={`border rounded-lg p-2 w-full bg-white ${
//                     errors.state ? "border-red-500" : ""
//                   }`}
//                 >
//                   <option value="">-- Select Country/State --</option>
//                   {countries.map((country) => (
//                     <option key={country.code} value={country.name}>
//                       {country.name}
//                     </option>
//                   ))}
//                 </select>

//                 {errors.state && (
//                   <p className="text-red-500 text-sm mt-1">{errors.state}</p>
//                 )}
//               </div>

//               <div className="relative">
//                 <div className="absolute -top-3 left-3 px-2 bg-white">
//                   <label className="text-sm font-medium text-gray-500">
//                     City
//                   </label>
//                 </div>
//                 <input
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   type="text"
//                   className={`border rounded-lg p-2 w-full ${
//                     errors.city ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.city && (
//                   <p className="text-red-500 text-sm mt-1">{errors.city}</p>
//                 )}
//               </div>

//               <div className="relative">
//                 <div className="absolute -top-3 left-3 px-2 bg-white">
//                   <label className="text-sm font-medium text-gray-500">
//                     Zip/Postal Code
//                   </label>
//                 </div>
//                 <input
//                   name="zip"
//                   value={formData.zip}
//                   onChange={handleChange}
//                   type="text"
//                   className={`border rounded-lg p-2 w-full ${
//                     errors.zip ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.zip && (
//                   <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
//                 )}
//               </div>

//               <div className="relative">
//                 <div className="absolute -top-3 left-3 px-2 bg-white">
//                   <label className="text-sm font-medium text-gray-500">
//                     Phone number
//                   </label>
//                 </div>
//                 <input
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   type="tel"
//                   className={`border rounded-lg p-2 w-full ${
//                     errors.phone ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.phone && (
//                   <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="mt-4 space-y-2">
//             <label className="flex items-center space-x-2">
//               <input
//                 name="sameAddress"
//                 checked={formData.sameAddress}
//                 onChange={handleChange}
//                 type="checkbox"
//                 className="rounded"
//               />
//               <span>My billing and shipping address are the same</span>
//             </label>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-4">
//             {/* EU VAT Validation */}
//             <div className="bg-white rounded-lg w-md shadow p-6">
//               <h2 className="text-lg font-semibold mb-4">EU VAT Validation</h2>
//               <div className="flex flex-col space-y-3">
//                 <input
//                   type="text"
//                   placeholder="Enter EU VAT Number (e.g. DE123456789)"
//                   value={vat}
//                   onChange={(e) => setVat(e.target.value)}
//                   className="w-full px-4 py-2 border rounded-lg"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleVatCheck}
//                   disabled={vatLoading}
//                   className={`py-2 px-4 rounded-lg text-white ${
//                     vatLoading
//                       ? "bg-gray-400"
//                       : "bg-[#0eadef] hover:bg-[#0091cf]"
//                   }`}
//                 >
//                   {vatLoading ? "Validating..." : "Validate VAT"}
//                 </button>

//                 {vatResult && (
//                   <div
//                     className={`p-3 rounded-lg text-center ${
//                       vatResult.valid
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {vatResult.valid
//                       ? "✓ Valid EU VAT Number - Tax Free"
//                       : vatResult.error ||
//                         "✗ Invalid VAT Number - 23% Tax Applies"}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Order Review */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-lg font-semibold mb-4">Order Review</h2>
//             {products.map((product) => (
//               <div
//                 key={product.id}
//                 className="flex items-center justify-between mb-4"
//               >
//                 <div className="flex items-center space-x-3">
//                   {product.image ? (
//                     <Image
//                       src={product.image}
//                       alt={product.name}
//                       width={50}
//                       height={50}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   ) : (
//                     <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
//                       <svg
//                         className="w-6 h-6 text-gray-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                         />
//                       </svg>
//                     </div>
//                   )}
//                   <div>
//                     <p className="text-sm font-medium">{product.name}</p>
//                     <div className="flex items-center space-x-2 mt-1">
//                       <span>Qty: {product.quantity}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <p className="font-medium">
//                   {currency === "euro"
//                     ? `€${product.price?.eur || product.price}`
//                     : `$${product.price?.usd || product.price}`}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Discount Codes */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-lg font-semibold mb-4">Discount Codes</h2>
//             {appliedCoupon ? (
//               <div className="bg-green-50 p-3 rounded-lg mb-3">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="font-medium text-green-800">
//                       Coupon Applied: {appliedCoupon.code}
//                     </p>
//                     <p className="text-sm text-green-600">
//                       -{currency === "euro" ? "€" : "$"}
//                       {appliedCoupon.value} discount
//                     </p>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={removeCoupon}
//                     className="text-red-500 hover:text-red-700 text-sm"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex space-x-2">
//                 <input
//                   name="coupon"
//                   value={formData.coupon}
//                   onChange={handleChange}
//                   type="text"
//                   placeholder="Enter your coupon code"
//                   className="border rounded-lg p-2 flex-1"
//                 />
//                 <button
//                   type="button"
//                   onClick={applyCoupon}
//                   className="bg-[#0eadef] text-white px-4 py-2 rounded-lg hover:bg-[#0091cf]"
//                 >
//                   Apply
//                 </button>
//               </div>
//             )}
//             {couponError && (
//               <p className="text-red-500 text-sm mt-2">{couponError}</p>
//             )}
//           </div>

//           <div className="bg-white rounded-lg shadow p-6 space-y-2">
//             <h2 className="text-lg font-semibold mb-4">Billing Summary</h2>

//             {(() => {
//               const format = (amount) => {
//                 const symbol = currency === "euro" ? "€" : "$";
//                 return `${symbol}${Number(amount).toFixed(2)}`;
//               };
//               return (
//                 <>
//                   <div className="flex justify-between">
//                     <span>Subtotal</span>
//                     <span>{format(subtotal)}</span>
//                   </div>

//                   {appliedCoupon && (
//                     <div className="flex justify-between text-green-600">
//                       <span>Discount ({appliedCoupon.code})</span>
//                       <span>-{format(discountAmount)}</span>
//                     </div>
//                   )}

//                   <div className="flex justify-between">
//                     <span>Shipping</span>
//                     <span>{format(shipping)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Tax ({vatResult?.valid ? "0%" : "23%"})</span>
//                     <span>{format(taxAmount)}</span>
//                   </div>
//                   <hr className="my-2" />
//                   <div className="flex justify-between font-semibold text-lg">
//                     <span>Grand Total</span>
//                     <span>{format(grandTotal)}</span>
//                   </div>
//                 </>
//               );
//             })()}

//             <textarea
//               name="orderComment"
//               value={formData.orderComment}
//               onChange={handleChange}
//               placeholder="Order Comment"
//               className="border rounded-lg p-2 w-full mt-4"
//             />

//             <div>
//               <label className="flex items-center space-x-2 mt-2">
//                 <input
//                   name="agreeTerms"
//                   checked={formData.agreeTerms}
//                   onChange={handleChange}
//                   type="checkbox"
//                   className="rounded"
//                 />
//                 <span>
//                   Please check to acknowledge our{" "}
//                   <Link
//                     href="/terms-conditions"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-red-500"
//                   >
//                     Privacy & Terms Policy
//                   </Link>
//                 </span>
//               </label>
//               {errors.agreeTerms && (
//                 <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting || !formData.agreeTerms}
//               className={`w-full py-4 px-6 text-lg font-medium rounded-none transition-colors ${
//                 isSubmitting || !formData.agreeTerms
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-[#0eadef] text-white hover:bg-[#00aef9]"
//               }`}
//             >
//               {isSubmitting ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg
//                     className="animate-spin h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Processing...
//                 </span>
//               ) : (
//                 "Checkout"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }
