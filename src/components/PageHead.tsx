import { useEffect } from 'react';

interface PageHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export const PageHead = ({ 
  title, 
  description, 
  keywords = "Bulgarian Spiritual Treasury, DAO, blockchain, cultural heritage, governance",
  ogImage = "https://foundation-bst.org/og-image.jpg",
  canonicalUrl 
}: PageHeadProps) => {
  useEffect(() => {
    // Set page title
    document.title = `${title} | Bulgarian Spiritual Treasury`;

    // Set or update meta tags
    const setMetaTag = (property: string, content: string, isName = false) => {
      const attribute = isName ? 'name' : 'property';
      let meta = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Standard meta tags
    setMetaTag('description', description, true);
    setMetaTag('keywords', keywords, true);

    // Open Graph tags
    setMetaTag('og:title', title);
    setMetaTag('og:description', description);
    setMetaTag('og:image', ogImage);
    setMetaTag('og:type', 'website');

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image', true);
    setMetaTag('twitter:title', title, true);
    setMetaTag('twitter:description', description, true);
    setMetaTag('twitter:image', ogImage, true);

    // Canonical URL
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
    }

  }, [title, description, keywords, ogImage, canonicalUrl]);

  return null;
};
