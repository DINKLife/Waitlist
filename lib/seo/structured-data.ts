/**
 * Structured data (JSON-LD) for SEO
 */

import { siteConfig } from "@/config/site";

/**
 * Generate organization structured data
 */
export function getOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.shortName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    founder: {
      "@type": "Person",
      name: siteConfig.author,
    },
    audience: {
      "@type": "Audience",
      audienceType: "DINK Couples (Dual Income No Kids)",
    },
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.instagram,
      siteConfig.links.linkedin,
      siteConfig.links.facebook,
      siteConfig.links.discord,
      siteConfig.links.youtube,
    ],
    potentialAction: {
      "@type": "JoinAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}?ref=waitlist`,
      },
      name: "Join DINKLife Waitlist",
    },
  };
}

/**
 * Generate FAQ structured data
 */
export function getFAQStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is DINKLife?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DINKLife is a platform designed exclusively for DINK (Dual Income No Kids) couples. It provides tools, resources, and a community tailored for couples living the DINK lifestyle.",
        },
      },
      {
        "@type": "Question",
        name: "What do I get by joining the waitlist?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "When you join the waitlist, you'll receive: Early access to the DINKLife community as a founding member, Behind-the-scenes updates, and Founder-only pricing with lifetime discounted access.",
        },
      },
      {
        "@type": "Question",
        name: "Is joining the waitlist free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Joining the waitlist is completely free, and there's no obligation to purchase anything.",
        },
      },
      {
        "@type": "Question",
        name: "What is a DINK couple?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DINK stands for Dual Income No Kids. DINK couples are partners who both work and have chosen not to have children, allowing them to focus on their careers, relationships, and personal growth.",
        },
      },
    ],
  };
}

