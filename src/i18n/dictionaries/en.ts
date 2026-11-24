/**
 * English copy — the source of truth for every string on the site.
 * Other locales (e.g. bn.ts) mirror this shape; missing keys fall back to English.
 *
 * Writing rules for this site (keep it credible):
 *  - No invented numbers, clients or awards. Add real ones only once they exist.
 *  - IT services: worldwide. Equipment supply & installation: Bangladesh only.
 *  - Company facts (trade license no., WhatsApp) live in src/config/company.ts.
 */
import divisions from "./en-divisions";

const en = {
  meta: {
    title: "Offspring Technologies — Building solutions for a connected world",
    description:
      "Government-licensed technology company in Bangladesh. Software, websites and apps for clients worldwide —  Machinery supply and installation across Bangladesh.",
  },
  nav: {
    solutions: "Solutions",
    about: "About",
    contact: "Contact",
    cta: "Get a free quote",
    menu: "Menu",
    close: "Close",
    learnMore: "Learn more",
    viewAll: "View all",
    seeDetails: "See details",
    skipToContent: "Skip to content",
  },
  hero: {
    eyebrow: "Software · Equipment · Engineering",
    title: "Your partner in Software, Supply and Engineering.",
    subtitle:
    "We develop AI-powered software, ERP systems, websites and mobile applications. We also supply IT products, networking equipment, industrial machinery and heavy equipment, alongside installation, civil works and engineering services across Bangladesh.",

    primary: "Get a free quote",
    secondary: "Explore solutions",
  },
  /** Hero slider (right side). Photos: public/images/home/slide-<id>-1.jpg and slide-<id>-2.jpg */
  heroSlides: {
    prev: "Previous",
    next: "Next",
    explore: "Explore",
    items: [
      {
        id: "software",
        division: "digital",
        icon: "code",
        tag: "Software & IT",
        caption: "School & college systems, ERPs, websites and apps.",
        icons: ["school", "phone"],
        stats: [
          { value: "Worldwide", label: "Software delivery" },
          { value: "Your code", label: "Handed over to you" },
        ],
      },
      {
        id: "supply",
        division: "equipment",
        icon: "box",
        tag: "Electronics & Equipment Supply",
        caption: "Electronics, IT, power, lab and medical equipment.",
        icons: ["server", "bolt"],
        stats: [
          { value: "BDT quotes", label: "Genuine products" },
          { value: "Bangladesh", label: "Delivered to your site" },
        ],
      },
      {
        id: "install",
        division: "engineering",
        icon: "wrench",
        tag: "Machines & Civil Works",
        caption: "Machine installation, electrical and civil works.",
        icons: ["gear", "building"],
        stats: [
          { value: "On-site", label: "Installation & civil works" },
          { value: "AMC", label: "Maintenance after handover" },
        ],
      },
    ],
  },
  trust: [
    { icon: "shield", title: "Govt. licensed", text: "Registered with a trade license in Bangladesh" },
    { icon: "globe", title: "Software worldwide", text: "Remote delivery to clients in any country" },
    { icon: "pin", title: "Installs across Bangladesh", text: "Equipment supply & on-site installation" },
    { icon: "chat", title: "Bangla & English", text: "Talk to us in the language you prefer" },
  ],
  pillarsIntro: {
    eyebrow: "What we do",
    title: "Three Core Areas of Business",
    subtitle:
      "Software, equipment and installation usually mean three vendors and three excuses. With us it's one contract, one point of contact and one team responsible for the result.",
  },
  pillars: [
    {
      id: "digital",
      icon: "code",
      label: "01",
      title: "Software & IT",
      scope: "Worldwide",
      description:
        "School & college management systems, business ERPs, websites, portfolios and mobile apps — built to fit how you actually work.",
      points: [
        "School & college software",
        "ERP for business & factories",
        "Websites, portfolios & e-commerce",
        "Mobile apps & custom software",
      ],
    },
    {
      id: "equipment",
      icon: "box",
      label: "02",
      title: "Machinery & Equipment Supply",
      scope: "Bangladesh",
      description:
        "Generators, solar, garment and industrial machinery, lab, IT and medical equipment — quoted in BDT and delivered to your site.",
      points: [
        "Generators, IPS & solar",
        "Garment & industrial machinery",
        "School science & ICT labs",
        "IT, CCTV & medical equipment",
      ],
    },
    {
      id: "engineering",
      icon: "bolt",
      label: "03",
      title: "Installation & Engineering",
      scope: "Bangladesh",
      description:
        "On-site installation, commissioning and maintenance — so the equipment you buy actually runs, and keeps running.",
      points: [
        "Electrical & solar installation",
        "Networking & CCTV setup",
        "AC & generator installation",
        "Annual maintenance contracts",
      ],
    },
  ],
  
reach: {
  eyebrow: "OUR OPERATING REACH",
  title: "Serving clients in Bangladesh and beyond.",
  items: [
    {
      id: "software",
      icon: "globe",
      tag: "Worldwide",
      title: "Software & IT Services",
      text: "We develop software for businesses and institutions locally and internationally, with remote project delivery and ongoing support.",
      points: [
        "AI solutions, ERP, websites & mobile apps",
        "Custom software and system integration",
        "Remote development and technical support"
      ],
    },
    {
      id: "supply",
      icon: "shield",
      tag: "Bangladesh",
      title: "Machinery & Equipment Supply",
      text: "We source and supply IT products, industrial machinery and equipment for businesses and institutions across Bangladesh.",
      points: [
        "IT and office equipment",
        "Industrial and heavy machinery",
        "Procurement and nationwide delivery"
      ],
    },
    {
      id: "install",
      icon: "wrench",
      tag: "Bangladesh",
      title: "Installation & Engineering",
      text: "We undertake equipment installation, electrical works, civil construction and related engineering projects.",
      points: [
        "Machinery installation & commissioning",
        "Electrical and civil works",
        "Site preparation and technical support"
      ],
    },
  ],
},

  principles: {
    eyebrow: "Why choose us",
    title: "New company. Serious standards.",
    items: [
      {
        title: "Licensed & accountable",
        description: "A Government-licensed Bangladeshi company with proper quotations, invoices and agreements.",
      },
      {
        title: "Clear pricing",
        description: "Itemised quotes up front. No hidden charges added after the work starts.",
      },
      {
        title: "You own what you pay for",
        description: "Source code, domains and documentation are handed over to you — no lock-in.",
      },
      {
        title: "Support after delivery",
        description: "Free support period on every project, with affordable maintenance plans after.",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    title: "From first call to long-term support.",
    steps: [
      { title: "Talk", description: "A free call or visit to understand what you need." },
      { title: "Quote", description: "A written, itemised quotation and timeline." },
      { title: "Build / Supply", description: "We develop the software or source the equipment." },
      { title: "Deliver", description: "Launch, installation and training for your team." },
      { title: "Support", description: "Fixes, updates and maintenance when you need them." },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions we hear often.",
    items: [
      {
        q: "Are you a registered company?",
        a: "Yes. Offspring Technologies is a Government-licensed company in Bangladesh, operating under a valid trade license. We provide formal quotations, invoices and agreements for every project.",
      },
      {
        q: "Do you work with clients outside Bangladesh?",
        a: "Yes — for software and IT services. We build websites, apps and custom software for clients worldwide and work fully remotely. Equipment supply and installation are available inside Bangladesh only.",
      },
      {
        q: "Do you deliver and install outside Dhaka?",
        a: "Yes. We supply and install equipment across Bangladesh. Transport and travel costs for sites outside Dhaka are shown clearly in the quotation.",
      },
      {
        q: "How long does a school management system take?",
        a: "It depends on the modules you need. A standard setup is usually ready in a few weeks; we'll give you an exact timeline in the quotation after a short discussion.",
      },
      {
        q: "Will I get the source code and admin access?",
        a: "Yes. For custom projects, the source code, hosting access and documentation are handed over to you once the project is paid in full.",
      },
      {
        q: "How do payments work?",
        a: "Projects are usually split into milestones — an advance to start, then payments as work is delivered. Clients in Bangladesh can pay by bank transfer or mobile banking; international clients by bank transfer.",
      },
    ],
  },
  cta: {
    title: "Tell us what you need. We'll send a free quote.",
    subtitle: "Software from anywhere in the world, or equipment anywhere in Bangladesh — we usually reply within one working day.",
    primary: "Get a free quote",
    secondary: "Contact details",
  },
  about: {
    eyebrow: "About Offspring",
    title: "A young Bangladeshi company with big ambitions.",
    intro:
      "Offspring Technologies is a Government-licensed technology and engineering company based in Dhaka. We bring software developers and field technicians under one roof — building digital systems for clients worldwide, and supplying and installing equipment for organisations across Bangladesh.",
    missionTitle: "Mission",
    mission:
      "To give schools, businesses and institutions in Bangladesh — and clients worldwide — technology that genuinely works, at a fair and transparent price.",
    visionTitle: "Vision",
    vision:
      "To become Bangladesh's most trusted partner for software, equipment and installation — one accountable team, from idea to everyday use.",
    valuesTitle: "Our values",
    values: [
      { title: "Honesty", description: "Realistic timelines, clear quotes and no over-promising." },
      { title: "Quality", description: "Clean code, genuine equipment and neat, safe installation." },
      { title: "Ownership", description: "If we built or installed it, we stand behind it." },
      { title: "Growth", description: "We learn fast, improve every project and grow with our clients." },
    ],
    licenseTitle: "Licensed in Bangladesh",
    licenseText:
      "We operate under a valid trade license issued in Bangladesh. License details are available on request and shown on every quotation and invoice.",
  },
  divisions,
  divisionPage: {
    offerCta: "See what we offer",
    quoteCta: "Request a quote",
    viewDetails: "View details",
    allSolutions: "All solutions",
    otherDivisions: "Explore other divisions",
    sourceToSpec: "Need something specific?",
  },
  solutionsPage: {
    eyebrow: "Solutions",
    title: "Software for the world. Equipment and installation for Bangladesh.",
    subtitle:
      "Work with one division or all three. A school, for example, can get its management software, ICT lab equipment and network installation from a single team.",
    deliverablesTitle: "Capabilities",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk about your project.",
    subtitle: "Tell us a little about what you need. We'll get back with questions or a free quotation — usually within one working day.",
    form: {
      name: "Full name",
      email: "Email",
      company: "Organisation (optional)",
      phone: "Phone / WhatsApp",
      location: "Country / District",
      locationPlaceholder: "e.g. Dhaka, Chattogram, or United Kingdom",
      submit: "Send message",
      sending: "Sending…",
      successTitle: "Thank you — message received.",
      successBody: "We'll get back to you within one working day.",
      emailInvalid: "Enter a valid email address, like name@gmail.com.",
      phoneInvalid: "Enter a valid phone number with the country code, like +8801712345678.",
      error: "We couldn't send that just now. Please try again, or reach us on WhatsApp.",
      reset: "Send another",
      required: "Required",
    },
    quote: {
      step1: "What do you need?",
      step2: "Choose what applies",
      step2Hint: "Pick one or more, or add your own.",
      step3: "Tell us the details",
      step4: "Your contact details",
      addOther: "Add other",
      addOtherPlaceholder: "Type and press Enter",
      add: "Add",
      remove: "Remove",
      change: "Change",
      pickItem: "Pick at least one item, or add your own.",
      categories: {
        software: {
          title: "Software & IT",
          text: "Websites, ERPs, school software, apps",
          coverage: "Worldwide",
          extra: [] as string[],
        },
        supply: {
          title: "Product supply",
          text: "IT equipment and machinery",
          coverage: "Bangladesh",
          extra: [] as string[],
        },
        install: {
          title: "Civil works & installation",
          text: "On-site installation and civil works",
          coverage: "Bangladesh",
          extra: ["Maintenance (AMC)"] as string[],
        },
      },
      software: {
        budget: "Budget",
        budgetOptions: ["Under $1,000 / ৳1 lakh", "$1,000 – $5,000 / ৳1–5 lakh", "$5,000 – $15,000 / ৳5–15 lakh", "Above $15,000 / ৳15 lakh+", "Not sure yet"],
        timeline: "When do you need it?",
        timelineOptions: ["As soon as possible", "Within 1 month", "1–3 months", "3+ months", "Flexible"],
        website: "Current website (optional)",
        websitePlaceholder: "https://",
        message: "Describe the project",
        messagePlaceholder: "What should it do, and who will use it?",
      },
      supply: {
        products: "Products",
        productName: "Product",
        productPlaceholder: "Start typing, e.g. Diesel generator",
        model: "Brand / model / spec",
        modelPlaceholder: "Optional",
        qty: "Qty",
        unit: "Unit",
        unitOptions: ["pcs", "set", "unit", "box", "metre", "kg"],
        addProduct: "Add another product",
        needProduct: "Add at least one product with a name and quantity.",
        district: "Delivery district",
        districtPlaceholder: "e.g. Gazipur",
        neededBy: "Needed by (optional)",
        message: "Anything else? (optional)",
        messagePlaceholder: "Installation needed, preferred brands, warranty, VAT/AIT invoice…",
      },
      install: {
        district: "Site district",
        districtPlaceholder: "e.g. Narayanganj",
        siteType: "Type of site",
        siteTypeOptions: ["Factory", "School / College", "Hospital / Clinic", "Office", "Home", "Other"],
        size: "Approx. size (optional)",
        sizePlaceholder: "e.g. 12,000 sq ft, 3 floors",
        visitDate: "Preferred site visit (optional)",
        needSupply: "Should we supply the equipment too?",
        needSupplyOptions: ["Yes", "No, we have it", "Not sure"],
        message: "Describe the work",
        messagePlaceholder: "What needs to be installed or built, current condition of the site, and your deadline.",
      },
    },
    details: {
      title: "Reach us directly",
      emailLabel: "Email",
      email: "hello@offspring.example",
      phoneLabel: "Phone / WhatsApp",
      phone: "+880 1XXX-XXXXXX",
      officeLabel: "Office",
      office: "Dhaka, Bangladesh",
      hoursLabel: "Hours",
      hours: "Sat – Thu, 10:00 – 19:00 (GMT+6)",
      whatsapp: "Chat on WhatsApp",
    },
  },
  notFound: {
    code: "404",
    title: "Page not found",
    back: "Back to home",
  },
  footer: {
    tagline: "Building solutions for a connected world.",
    company: "Company",
    solutions: "Solutions",
    rights: "All rights reserved.",
    language: "Language",
    licensed: "Government-licensed company · Bangladesh",
    licenseNo: "Trade License No.",
    coverage: "Software & IT: worldwide · Equipment & installation: Bangladesh",
  },
};

export type Dictionary = typeof en;
export default en;
