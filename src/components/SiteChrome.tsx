import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatButton } from "@/components/Faq";
import { company } from "@/config/company";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export function SiteChrome({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const dict = getDictionary(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-canvas"
      >
        Skip to content
      </a>
      <Header
        locale={locale}
        nav={dict.nav}
        divisions={dict.pillars.map((p) => ({ id: p.id, title: p.title, description: p.description, icon: p.icon }))}
      />
      <main id="main">{children}</main>
      <Footer locale={locale} dict={dict} />
      <ChatButton
        whatsapp={company.whatsapp}
        contactHref={href(locale, "/contact")}
        label={company.whatsapp ? dict.contact.details.whatsapp : dict.nav.contact}
      />
    </>
  );
}
