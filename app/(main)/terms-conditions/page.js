"use client";

import React from "react";
import { useDomain } from "@/providers/useDomain";

export default function TermsPage() {
  const lang = useDomain();

  // Internationalization mappings
  const textMap = {
    title: {
      pt: "Termos e Condições",
      fr: "Termes et Conditions",
      es: "Términos y Condiciones",
      en: "Terms & Conditions",
    },
    introduction: {
      pt: "Estes termos e condições (“Acordo”) estabelecem os termos e condições gerais de uso do site <strong>hdotrade.com</strong> (“Site” ou “Serviço”) e quaisquer de seus produtos e serviços relacionados (coletivamente, “Serviços”). Este Acordo é legalmente vinculativo entre você (“Usuário”, “você” ou “seu”) e <strong>HDO GLOBAL TRADE, UNIPESSOAL LDA</strong>.",
      fr: "Ces termes et conditions (« Accord ») énoncent les termes et conditions généraux de votre utilisation du site Web <strong>hdotrade.com</strong> (« Site Web » ou « Service ») et de tous ses produits et services connexes (collectivement, « Services »). Cet Accord est juridiquement contraignant entre vous (« Utilisateur », « vous » ou « votre ») et <strong>HDO GLOBAL TRADE, UNIPESSOAL LDA</strong>.",
      es: "Estos términos y condiciones (“Acuerdo”) establecen los términos y condiciones generales de su uso del sitio web <strong>hdotrade.com</strong> (“Sitio Web” o “Servicio”) y cualquiera de sus productos y servicios relacionados (colectivamente, “Servicios”). Este Acuerdo es legalmente vinculante entre usted (“Usuario”, “usted” o “su”) y <strong>HDO GLOBAL TRADE, UNIPESSOAL LDA</strong>.",
      en: "These terms and conditions (“Agreement”) set forth the general terms and conditions of your use of the <strong>hdotrade.com</strong> website (“Website” or “Service”) and any of its related products and services (collectively, “Services”). This Agreement is legally binding between you (“User”, “you” or “your”) and <strong>HDO GLOBAL TRADE, UNIPESSOAL LDA</strong>.",
    },
    accountsTitle: {
      pt: "Contas e Membros",
      fr: "Comptes et Adhésion",
      es: "Cuentas y Membresía",
      en: "Accounts and Membership",
    },
    accountsParagraph1: {
      pt: "Você deve ter pelo menos 18 anos de idade para usar o Site e os Serviços. Ao usar o Site e os Serviços e concordar com este Acordo, você garante e representa que tem pelo menos 18 anos.",
      fr: "Vous devez avoir au moins 18 ans pour utiliser le site Web et les services. En utilisant le site Web et les services et en acceptant cet accord, vous garantissez et représentez que vous avez au moins 18 ans.",
      es: "Debe tener al menos 18 años de edad para utilizar el Sitio Web y los Servicios. Al utilizar el Sitio Web y los Servicios y aceptar este Acuerdo, usted garantiza y representa que tiene al menos 18 años.",
      en: "You must be at least 18 years of age to use the Website and Services. By using the Website and Services and agreeing to this Agreement, you warrant and represent that you are at least 18 years old.",
    },
    accountsParagraph2: {
      pt: "Se você criar uma conta, é responsável por manter sua segurança e todas as atividades sob ela. Fornecer informações falsas pode resultar em rescisão.",
      fr: "Si vous créez un compte, vous êtes responsable de maintenir sa sécurité et toutes les activités qui y sont menées. Fournir de fausses informations peut entraîner une résiliation.",
      es: "Si crea una cuenta, es responsable de mantener su seguridad y todas las actividades bajo ella. Proporcionar información falsa puede resultar en terminación.",
      en: "If you create an account, you are responsible for maintaining its security and all activities under it. Providing false information may result in termination.",
    },
    billingTitle: {
      pt: "Faturamento e Pagamentos",
      fr: "Facturation et Paiements",
      es: "Facturación y Pagos",
      en: "Billing and Payments",
    },
    billingParagraph: {
      pt: "Você deve pagar todas as taxas de acordo com os termos de faturamento. Dados sensíveis são trocados por canais protegidos por SSL. Transações de alto risco podem exigir verificação de identidade.",
      fr: "Vous devez payer tous les frais conformément aux conditions de facturation. Les données sensibles sont échangées via des canaux sécurisés SSL. Les transactions à haut risque peuvent nécessiter une vérification d'identité.",
      es: "Debe pagar todas las tarifas de acuerdo con los términos de facturación. Los datos sensibles se intercambian a través de canales protegidos por SSL. Las transacciones de alto riesgo pueden requerir verificación de identidad.",
      en: "You shall pay all fees in accordance with the billing terms. Sensitive data is exchanged over SSL secured channels. High-risk transactions may require identity verification.",
    },
    accuracyTitle: {
      pt: "Precisão das Informações",
      fr: "Exactitude des Informations",
      es: "Precisión de la Información",
      en: "Accuracy of Information",
    },
    accuracyParagraph: {
      pt: "Reservamo-nos o direito de corrigir quaisquer erros e atualizar informações sem aviso prévio. Nenhuma obrigação existe de atualizar o conteúdo.",
      fr: "Nous nous réservons le droit de corriger toute erreur et de mettre à jour les informations sans préavis. Aucune obligation de mettre à jour le contenu n'existe.",
      es: "Nos reservamos el derecho de corregir cualquier error y actualizar la información sin previo aviso. No existe ninguna obligación de actualizar el contenido.",
      en: "We reserve the right to correct any errors and update information without prior notice. No obligation exists to update the content.",
    },
    prohibitedTitle: {
      pt: "Usos Proibidos",
      fr: "Utilisations Interdites",
      es: "Usos Prohibidos",
      en: "Prohibited Uses",
    },
    prohibitedList: [
      {
        pt: "Use o site para fins ilegais.",
        fr: "Utiliser le site Web à des fins illégales.",
        es: "Utilizar el sitio web para fines ilegales.",
        en: "Use the Website for unlawful purposes.",
      },
      {
        pt: "Violar os direitos de propriedade intelectual.",
        fr: "Enfreindre les droits de propriété intellectuelle.",
        es: "Violar los derechos de propiedad intelectual.",
        en: "Infringe upon intellectual property rights.",
      },
      {
        pt: "Carregar vírus ou código malicioso.",
        fr: "Télécharger des virus ou du code malveillant.",
        es: "Cargar virus o código malicioso.",
        en: "Upload viruses or malicious code.",
      },
      {
        pt: "Enviar spam, phishing ou scraping de conteúdo.",
        fr: "Spammer, hameçonner ou récupérer du contenu.",
        es: "Enviar spam, phishing o scraping de contenido.",
        en: "Spam, phish, or scrape content.",
      },
      {
        pt: "Interferir nos recursos de segurança.",
        fr: "Interférer avec les fonctionnalités de sécurité.",
        es: "Interferir con las características de seguridad.",
        en: "Interfere with security features.",
      },
    ],
    intellectualTitle: {
      pt: "Propriedade Intelectual",
      fr: "Propriété Intellectuelle",
      es: "Propiedad Intelectual",
      en: "Intellectual Property",
    },
    intellectualParagraph: {
      pt: "Toda a propriedade intelectual pertence à HDO GLOBAL TRADE ou seus licenciadores. O uso de marcas registradas ou logotipos não é permitido sem autorização.",
      fr: "Toute la propriété intellectuelle appartient à HDO GLOBAL TRADE ou à ses concédants de licence. L'utilisation de marques commerciales ou de logos n'est pas autorisée sans autorisation.",
      es: "Toda la propiedad intelectual pertenece a HDO GLOBAL TRADE o sus licenciantes. No se permite el uso de marcas comerciales o logotipos sin autorización.",
      en: "All intellectual property belongs to HDO GLOBAL TRADE or its licensors. Use of trademarks or logos is not permitted without authorization.",
    },
    liabilityTitle: {
      pt: "Limitação de Responsabilidade",
      fr: "Limitation de Responsabilité",
      es: "Limitación de Responsabilidad",
      en: "Limitation of Liability",
    },
    liabilityParagraph: {
      pt: "Na máxima extensão permitida por lei, a HDO GLOBAL TRADE não será responsável por danos indiretos ou consequenciais. A responsabilidade é limitada ao valor pago por você no mês anterior.",
      fr: "Dans la mesure maximale permise par la loi, HDO GLOBAL TRADE ne sera pas responsable des dommages indirects ou consécutifs. La responsabilité est limitée au montant payé par vous au cours du mois précédent.",
      es: "En la máxima medida permitida por la ley, HDO GLOBAL TRADE no será responsable de daños indirectos o consecuentes. La responsabilidad se limita al monto pagado por usted en el mes anterior.",
      en: "To the fullest extent permitted by law, HDO GLOBAL TRADE shall not be liable for indirect or consequential damages. Liability is limited to the amount paid by you in the prior month.",
    },
    disputeTitle: {
      pt: "Resolução de Disputas",
      fr: "Règlement des Litiges",
      es: "Resolución de Disputas",
      en: "Dispute Resolution",
    },
    disputeParagraph: {
      pt: "Este Acordo é regido pelas leis de Portugal. A jurisdição exclusiva é com os tribunais localizados em Portugal. A Convenção da ONU sobre Contratos para a Venda Internacional de Mercadorias não se aplica.",
      fr: "Le présent accord est régi par les lois du Portugal. La juridiction exclusive est celle des tribunaux situés au Portugal. La Convention des Nations Unies sur les contrats de vente internationale de marchandises ne s'applique pas.",
      es: "Este Acuerdo se rige por las leyes de Portugal. La jurisdicción exclusiva es con los tribunales ubicados en Portugal. La Convención de la ONU sobre Contratos de Compraventa Internacional de Mercaderías no se aplica.",
      en: "This Agreement is governed by the laws of Portugal. Exclusive jurisdiction is with courts located in Portugal. The UN Convention on Contracts for the International Sale of Goods does not apply.",
    },
    lastUpdated: {
      pt: "Este documento foi atualizado pela última vez em 15 de junho de 2021",
      fr: "Ce document a été mis à jour pour la dernière fois le 15 juin 2021",
      es: "Este documento fue actualizado por última vez el 15 de junio de 2021",
      en: "This document was last updated on June 15, 2021",
    },
  };

  // Helper function to get localized text
  const getText = (key) => {
    return textMap[key][lang] || textMap[key].en;
  };

  // Helper function to get localized list items
  const getListItems = () => {
    return textMap.prohibitedList.map((item, index) => (
      <li key={index} className="text-gray-700 leading-relaxed">
        {item[lang] || item.en}
      </li>
    ));
  };

  return (
    <div className="relative md:ml-64 bg-gray-50 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12 overflow-y-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
          {getText("title")}
        </h1>
        <p
          className="mb-4 text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: getText("introduction") }}
        />
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {getText("accountsTitle")}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            {getText("accountsParagraph1")}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {getText("accountsParagraph2")}
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {getText("billingTitle")}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {getText("billingParagraph")}
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {getText("accuracyTitle")}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {getText("accuracyParagraph")}
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {getText("prohibitedTitle")}
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1">
            {getListItems()}
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {getText("intellectualTitle")}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {getText("intellectualParagraph")}
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {getText("liabilityTitle")}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {getText("liabilityParagraph")}
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {getText("disputeTitle")}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {getText("disputeParagraph")}
          </p>
        </section>
        <p className="text-gray-500 text-sm mt-10">{getText("lastUpdated")}</p>
      </div>
    </div>
  );
}
