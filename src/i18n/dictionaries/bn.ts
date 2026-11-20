import type { PartialDictionary } from "../get-dictionary";

/**
 * Bangla (বাংলা) — DRAFT, not yet live.
 * Any key left out falls back to English automatically.
 * Have a native copywriter review before adding "bn" to enabledLocales in config.ts.
 */
const bn: PartialDictionary = {
  meta: {
    title: "অফস্প্রিং টেকনোলজিস — সংযুক্ত বিশ্বের জন্য সমাধান",
    description:
      "অফস্প্রিং টেকনোলজিস ডিজিটাল সমাধান, যন্ত্রপাতি সরবরাহ এবং ইঞ্জিনিয়ারিং চুক্তি প্রদান করে।",
  },
  nav: {
    solutions: "সমাধান",
    industries: "শিল্পখাত",
    about: "আমাদের সম্পর্কে",
    contact: "যোগাযোগ",
    cta: "প্রকল্প শুরু করুন",
    menu: "মেনু",
    close: "বন্ধ",
    learnMore: "আরও জানুন",
  },
  hero: {
    eyebrow: "ডিজিটাল · যন্ত্রপাতি · ইঞ্জিনিয়ারিং",
    title: "সংযুক্ত বিশ্বের জন্য সমাধান তৈরি করছি।",
    primary: "প্রকল্প শুরু করুন",
    secondary: "সমাধান দেখুন",
  },
  footer: {
    tagline: "সংযুক্ত বিশ্বের জন্য সমাধান তৈরি করছি।",
    language: "ভাষা",
  },
};

export default bn;
