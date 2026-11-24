import { company } from "@/config/company";
import { abs, brand, brandAliases, seoKeywords, siteUrl } from "@/config/site";
import brands from "@/i18n/dictionaries/en-brands";

/**
 * JSON-LD for search engines: who the company is, where it is, how to reach it,
 * and that "Offspring IT" and "Offspring Engineering" belong to it.
 * Rendered once on every public page.
 */
export function StructuredData({ locale }: { locale: string }) {
  const home = abs(`/${locale}`);
  const orgId = `${siteUrl}/#organization`;

  const graph = [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": orgId,
      name: brand,
      legalName: company.legalName,
      alternateName: brandAliases,
      url: home,
      logo: abs("/images/logo/logo-mark.png"),
      image: abs("/images/logo/logo-mark.png"),
      description:
        "Government-licensed company in Dhaka, Bangladesh providing software development, websites, mobile apps, IT products, engineering and machinery supply, installation and civil works.",
      email: company.email,
      telephone: company.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "House 5, Road 11, Sector 13, Uttara",
        addressLocality: "Dhaka",
        postalCode: "1230",
        addressCountry: "BD",
      },
      hasMap: company.mapUrl,
      areaServed: [{ "@type": "Country", name: "Bangladesh" }, { "@type": "Place", name: "Worldwide (software services)" }],
      knowsAbout: seoKeywords.slice(5),
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "10:00",
        closes: "19:00",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: company.phone,
        email: company.email,
        areaServed: "BD",
        availableLanguage: ["English", "Bengali"],
      },
      subOrganization: [brands.it, brands.engineering].map((b) => ({
        "@type": "Organization",
        name: b.name,
        url: abs(`/${locale}${b.path}`),
        description: b.seo.description,
        parentOrganization: { "@id": orgId },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: home,
      name: brand,
      alternateName: brandAliases,
      inLanguage: "en",
      publisher: { "@id": orgId },
    },
  ];

  return (
    <script
      type="application/ld+json"
      // JSON-LD must be raw JSON; the data is static and contains no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }}
    />
  );
}
