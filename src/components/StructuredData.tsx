import { useEffect } from "react";
import { SITE_CONFIG } from "@/config/navigation";

export const StructuredData = () => {
  useEffect(() => {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "alternateName": SITE_CONFIG.shortName,
      "url": SITE_CONFIG.url,
      "description": SITE_CONFIG.description,
      "sameAs": [
        SITE_CONFIG.social.twitter,
        SITE_CONFIG.social.github,
        SITE_CONFIG.social.discord,
        SITE_CONFIG.social.telegram
      ],
      "foundingDate": "2024",
      "founder": {
        "@type": "Organization",
        "name": SITE_CONFIG.name
      }
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
      "description": SITE_CONFIG.description,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE_CONFIG.url}/?s={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    const educationalSchema = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": `${SITE_CONFIG.name} Academy`,
      "description": "Educational platform for Bulgarian spiritual and cultural heritage",
      "url": `${SITE_CONFIG.url}#academy`,
      "parentOrganization": {
        "@type": "Organization",
        "name": SITE_CONFIG.name
      }
    };

    // Inject schemas into head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify([organizationSchema, websiteSchema, educationalSchema]);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
};
