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
import brands from "./en-brands";

const en = {
  meta: {
    title: "Offspring Solutions | IT and Engineering",
    description:
      "Offspring Solutions (Offspring IT & Offspring Engineering) is a Government-licensed company in Dhaka, Bangladesh: software development, websites and mobile apps, IT products, engineering and machinery supply, installation and civil works.",
  },
  /** Titles and descriptions for search results, per page */
  seo: {
    aboutTitle: "About Us — Government-Licensed IT & Engineering Company in Dhaka",
    aboutDescription:
      "Offspring Solutions is a Government-licensed company in Uttara, Dhaka, delivering software development, IT products, machinery supply, installation and civil works across Bangladesh.",
    contactTitle: "Contact & Free Quote",
    contactDescription:
      "Request a free quotation from Offspring Solutions for software, websites, IT products, machinery supply or installation. Call +880 1627-276727, WhatsApp or email offspringbd@gmail.com.",
  },
  nav: {
    solutions: "Solutions",
    about: "About",
    contact: "Contact",
    faq: "FAQ",
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
          { value: "Your Software", label: "Handed over to you" },
        ],
      },
     {
  id: "supply",
  division: "equipment",
  icon: "box",
  tag: "Industrial & Equipment Supply",
  caption: "IT hardware, heavy machinery, industrial, power, laboratory and medical equipment.",
  icons: ["server", "bolt"],
  stats: [
    { value: "Quality Assured", label: "Trusted products" },
    { value: "Nationwide", label: "Supply & delivery" },
  ],
},
      {
  id: "install",
  division: "engineering",
  icon: "wrench",
  tag: "Engineering & Project Execution",
  caption: "Industrial installation, electrical works, civil construction and technical maintenance.",
  icons: ["gear", "building"],
  stats: [
    { value: "End-to-End", label: "Installation & project execution" },
    { value: "AMC", label: "Ongoing maintenance & support" },
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
    eyebrow: "Why work with us",
    title: "What clients can expect.",
    items: [
      {
        title: "One point of contact",
        description: "Software, equipment and installation can be handled under a single contract, so you are not coordinating several vendors.",
      },
      {
        title: "Clear commercial terms",
        description: "Fixed quotations with defined scope, timeline and payment milestones. Any change is quoted in writing before it is made.",
      },
      {
        title: "Full ownership",
        description: "On completion you receive the source code, account access, documentation and warranty papers.",
      },
      {
        title: "Support after handover",
        description: "Every project includes a support period, with annual maintenance contracts available afterwards.",
      },
    ],
  },
  process: {
    eyebrow: "Our process",
    title: "How a project runs.",
    steps: [
      { title: "Consultation", description: "An initial meeting or site visit to understand the requirement." },
      { title: "Proposal", description: "Written scope, itemised quotation and delivery schedule." },
      { title: "Execution", description: "Development, procurement or installation by our own team." },
      { title: "Handover", description: "Testing, commissioning, documentation and user training." },
      { title: "Support", description: "Maintenance, updates and service under the agreed terms." },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions we hear often.",
    subtitle: "Short answers about licensing, delivery, payments and support.",
    helpTitle: "Still have a question?",
    helpText: "Message us on WhatsApp or give us a call. We reply during office hours.",
    items: [
      {
        q: "Are you a registered company?",
        a: "Yes. Offspring Solutions is a Government-licensed company in Bangladesh, operating under a valid trade license. We provide formal quotations, invoices and agreements for every project.",
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
  about: {
    eyebrow: "About us",
    title: "Software, supply and engineering services from Dhaka.",
    intro:
      "Offspring Solutions is a trade-licensed company headquartered in Uttara, Dhaka. We work in three areas: software development for clients in Bangladesh and abroad; supply of IT products, machinery and heavy equipment; and installation, electrical and civil works across Bangladesh.",
    missionTitle: "Mission",
    mission:
      "To deliver software, equipment and engineering services to the agreed specification, schedule and budget, with clear documentation at every stage.",
    visionTitle: "Vision",
    vision:
      "To be a dependable single-source partner for organisations in Bangladesh that need technology, equipment and site works delivered under one contract.",
    valuesTitle: "How we operate",
    values: [
      { title: "Transparency", description: "Itemised quotations, written scope and agreed payment milestones before any work begins." },
      { title: "Compliance", description: "Invoices, VAT documents, delivery challans and warranty records issued for every order." },
      { title: "Quality control", description: "Code review and testing for software; inspection, testing and commissioning for equipment and installations." },
      { title: "Accountability", description: "A named point of contact on every project, and after-sales support under agreed terms." },
    ],
    licenseTitle: "Licensed in Bangladesh",
    licenseText:
      "Offspring Solutions operates under a valid trade license issued in Bangladesh. The license number is printed on our quotations and invoices, and a copy is available on request for vendor registration and tender submissions.",
  },
  divisions,
  brands,
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
    title: "One partner for software, supply and engineering.",
    subtitle:
      "Work with one division or all three. A factory can get its ERP, machinery and on-site installation from a single team — one quotation, one point of contact.",
    deliverablesTitle: "Capabilities",
  },
  contact: {
    eyebrow: "Contact",
    title: "Tell us what you need.",
    subtitle: "Pick a category, add a few details and we'll reply with questions or a free quotation — usually within one working day. Prefer to talk? Call or WhatsApp us.",
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
      email: "offspringbd@gmail.com",
      phoneLabel: "Phone / WhatsApp",
      phone: "+880 1627-276727",
      officeLabel: "Office",
      office: "House 5, Road 11, Sector 13, Uttara, Dhaka 1230",
      hoursLabel: "Hours",
      hours: "Saturday – Thursday, 10:00 – 19:00 (GMT+6)",
      whatsapp: "Chat on WhatsApp",
      whatsappMessage: "Hello Offspring Solutions, I'd like to discuss a project.",
      callCta: "Call now",
      emailCta: "Send an email",
      mapCta: "Open in Google Maps",
      visitNote: "Visits by appointment — call or WhatsApp before you come.",
    },
  },
  /** Floating WhatsApp button and its greeting bubble */
  chat: {
    label: "Chat with us",
    name: "Offspring Solutions",
    status: "Usually replies during office hours",
    greeting: "Hi there 👋 Need a quote or have a question? Send us a message on WhatsApp.",
    start: "Start chat",
    close: "Close",
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
    ctaEyebrow: "Start a project",
    ctaTitle: "Have something in mind? Let's talk.",
    ctaText: "Software, equipment or on-site work — send the details and get a free quotation, usually within one working day.",
    quote: "Get a free quote",
    backToTop: "Back to top",
  },
};

export type Dictionary = typeof en;
export default en;
