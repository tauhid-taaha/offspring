import { Header, type BrandMenu } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import { company } from "@/config/company";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { GlassSpotlight } from "@/components/motion/GlassSpotlight";
import { HashScroll } from "@/components/HashScroll";
import { StructuredData } from "@/components/StructuredData";

/** Navbar menus: Offspring IT and Offspring Engineering, each with its related pages. */
function brandMenus(locale: Locale, dict: ReturnType<typeof getDictionary>): BrandMenu[] {
  const { brands, divisions } = dict;
  const pillar = (id: string) => dict.pillars.find((p) => p.id === id)!;
  const equipmentIt = divisions.equipment.offer.items.find((i) => i.id === "it-security");
  return [
    {
      label: brands.it.name,
      to: href(locale, brands.it.path),
      children: [
        { id: "digital", title: pillar("digital").title, description: pillar("digital").description, icon: pillar("digital").icon, to: href(locale, "/solutions/digital") },
        ...(equipmentIt
          ? [{ id: "it-products", title: equipmentIt.title, description: equipmentIt.description, icon: equipmentIt.icon, to: href(locale, "/solutions/equipment#it-security") }]
          : []),
      ],
    },
    {
      label: brands.engineering.name,
      to: href(locale, brands.engineering.path),
      children: [
        { id: "equipment", title: pillar("equipment").title, description: pillar("equipment").description, icon: pillar("equipment").icon, to: href(locale, "/solutions/equipment") },
        { id: "engineering", title: pillar("engineering").title, description: pillar("engineering").description, icon: pillar("engineering").icon, to: href(locale, "/solutions/engineering") },
      ],
    },
  ];
}

export function SiteChrome({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const dict = getDictionary(locale);

  return (
    <MotionProvider>
      <ScrollProgress />
      <GlassSpotlight />
      <HashScroll />
      <StructuredData locale={locale} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-canvas"
      >
        {dict.nav.skipToContent}
      </a>
      <Header
        locale={locale}
        nav={dict.nav}
        menus={brandMenus(locale, dict)}
      />
      <main id="main">{children}</main>
      <Footer locale={locale} dict={dict} />
      <WhatsAppWidget
        whatsapp={company.whatsapp}
        message={dict.contact.details.whatsappMessage}
        contactHref={href(locale, "/contact")}
        t={dict.chat}
      />
    </MotionProvider>
  );
}
