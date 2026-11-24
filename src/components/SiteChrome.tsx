import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import { company } from "@/config/company";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { GlassSpotlight } from "@/components/motion/GlassSpotlight";
import { HashScroll } from "@/components/HashScroll";

export function SiteChrome({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const dict = getDictionary(locale);

  return (
    <MotionProvider>
      <ScrollProgress />
      <GlassSpotlight />
      <HashScroll />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-canvas"
      >
        {dict.nav.skipToContent}
      </a>
      <Header
        locale={locale}
        nav={dict.nav}
        divisions={dict.pillars.map((p) => ({ id: p.id, title: p.title, description: p.description, icon: p.icon }))}
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
