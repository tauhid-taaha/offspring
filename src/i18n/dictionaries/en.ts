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
      "Government-licensed technology company in Bangladesh. School & college software, ERP, websites and apps for clients worldwide — plus machinery supply and installation across Bangladesh.",
  },
  nav: {
    solutions: "Solutions",
    industries: "Industries",
    about: "About",
    contact: "Contact",
    cta: "Get a free quote",
    menu: "Menu",
    close: "Close",
    learnMore: "Learn more",
  },
  hero: {
    eyebrow: "Software · Equipment · Engineering",
    title: "Building solutions for a connected world.",
    subtitle:
      "We build school & college software, ERPs, websites and apps for clients anywhere in the world — and supply and install machines and equipment across Bangladesh.",
    primary: "Get a free quote",
    secondary: "Explore solutions",
  },
  trust: [
    { icon: "shield", title: "Govt. licensed", text: "Registered with a trade license in Bangladesh" },
    { icon: "globe", title: "Software worldwide", text: "Remote delivery to clients in any country" },
    { icon: "pin", title: "Installs across Bangladesh", text: "Equipment supply & on-site installation" },
    { icon: "chat", title: "Bangla & English", text: "Talk to us in the language you prefer" },
  ],
  pillarsIntro: {
    eyebrow: "What we do",
    title: "Three divisions. One accountable team.",
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
    eyebrow: "Where we work",
    title: "Built in Bangladesh. Delivered to the world.",
    world: {
      tag: "Worldwide",
      title: "Software & IT services",
      text: "We work remotely with clients in any country — clear scope, regular demos, and communication on WhatsApp, email or video call.",
      points: ["Websites, apps & custom software", "Pricing in USD or BDT", "Overlapping hours with Asia, Middle East & Europe"],
    },
    local: {
      tag: "Bangladesh only",
      title: "Equipment supply & installation",
      text: "Our supply and installation teams work on-site in Bangladesh — from Dhaka to your factory, school or office.",
      points: ["Quotation in BDT", "Delivery to your site", "Installation, training & after-sales"],
    },
  },
  products: {
    eyebrow: "Popular solutions",
    title: "Software people in Bangladesh ask us for most.",
    subtitle: "Each one is customised to your institution or business — not a one-size-fits-all template.",
    items: [
      {
        icon: "school",
        title: "School & College Management",
        text: "Admission, attendance, exams & results, fees and guardian SMS — in one system.",
        tags: ["Online admission", "Result cards", "Fee collection", "Guardian SMS"],
      },
      {
        icon: "chart",
        title: "Business & Factory ERP",
        text: "Inventory, sales, purchase, accounts, HR and payroll — with reports you can trust.",
        tags: ["Inventory", "Accounts", "HR & payroll", "POS"],
      },
      {
        icon: "globe",
        title: "Websites & Portfolios",
        text: "Fast, mobile-friendly websites for companies, institutions and professionals.",
        tags: ["Company sites", "Personal portfolios", "E-commerce", "Bangla/English"],
      },
      {
        icon: "phone",
        title: "Mobile Apps",
        text: "Android and iOS apps for customers, students, staff and field teams.",
        tags: ["Android", "iOS", "Admin panel", "Push notifications"],
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
  industries: {
    eyebrow: "Who we serve",
    title: "Built for the organisations that run Bangladesh.",
    items: [
      { icon: "school", title: "Schools, Colleges & Madrasas", text: "Management software, ICT labs and smart classrooms." },
      { icon: "book", title: "Coaching Centres", text: "Student records, fees, online exams and SMS." },
      { icon: "thread", title: "Garments & Textile", text: "Machinery, power backup and production ERP." },
      { icon: "gear", title: "Factories & Manufacturing", text: "Industrial machines, installation and inventory systems." },
      { icon: "cart", title: "Retail & E-commerce", text: "Online stores, POS and payment integration." },
      { icon: "medical", title: "Hospitals & Clinics", text: "Medical equipment, CCTV and patient management." },
      { icon: "building", title: "NGOs & Offices", text: "IT setup, networking, websites and internal tools." },
      { icon: "rocket", title: "Startups & Professionals", text: "MVPs, mobile apps and personal portfolios — worldwide." },
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
      interest: "What do you need?",
      interestOptions: [
        "School / College software",
        "ERP / Business software",
        "Website or portfolio",
        "Mobile app",
        "Equipment supply (BD)",
        "Installation work (BD)",
        "Something else",
      ],
      message: "Project details",
      messagePlaceholder: "What do you need, by when, and roughly what budget? For equipment: model/specs, quantity and site location.",
      submit: "Send message",
      sending: "Sending…",
      successTitle: "Thank you — message received.",
      successBody: "This is a preview build: the form isn't connected yet. We'll wire it up in the next phase.",
      reset: "Send another",
      required: "Required",
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
