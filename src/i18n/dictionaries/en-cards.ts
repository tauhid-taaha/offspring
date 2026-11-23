/**
 * Home page card sections and their starter cards.
 *
 * Live cards come from the Supabase table `service_cards` and are managed in the
 * admin area (Cards tab). The `defaults` below are only shown when Supabase isn't
 * configured or can't be reached, so the home page never looks empty.
 * supabase/service-cards.sql seeds the table with these same cards.
 */
export const cardAreaIds = ["software", "supply", "install"] as const;
export type CardAreaId = (typeof cardAreaIds)[number];

/** Icons the admin can pick for a card without a photo. */
export const cardIcons = [
  "code", "school", "chart", "globe", "phone", "cart", "cloud", "server", "chip",
  "box", "bolt", "sun", "gear", "thread", "fan", "flask", "medical", "shield",
  "wrench", "building", "crane", "antenna", "plug", "rocket",
] as const;

export type CardInput = {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
};

const homeCards = {
  sections: {
    software: {
      eyebrow: "Popular solutions",
      title: "Software people in Bangladesh ask us for most.",
      subtitle: "Each one is customised to your institution or business — not a one-size-fits-all template.",
      division: "digital",
      label: "Software & IT",
    },
    supply: {
      eyebrow: "Licensed supplier",
      title: "Machines and equipment we supply across Bangladesh.",
      subtitle: "Genuine, branded products with proper invoices, warranty and VAT documents — delivered to your site.",
      division: "equipment",
      label: "Product supply",
    },
    install: {
      eyebrow: "Installation & consultancy",
      title: "Installed properly, backed by expert advice.",
      subtitle: "From the first site survey to commissioning and training — one team that plans it, installs it and stands behind it.",
      division: "engineering",
      label: "Installation & consultancy",
    },
  },
  defaults: {
    software: [
      {
        icon: "school",
        title: "School & College Management",
        description: "Admission, attendance, exams & results, fees and guardian SMS — in one system.",
        tags: ["Online admission", "Result cards", "Fee collection", "Guardian SMS"],
        link: "/solutions/digital#school-college",
      },
      {
        icon: "chart",
        title: "Business & Factory ERP",
        description: "Inventory, sales, purchase, accounts, HR and payroll — with reports you can trust.",
        tags: ["Inventory", "Accounts", "HR & payroll", "POS"],
        link: "/solutions/digital#erp",
      },
      {
        icon: "globe",
        title: "Websites & Portfolios",
        description: "Fast, mobile-friendly websites for companies, institutions and professionals.",
        tags: ["Company sites", "Personal portfolios", "E-commerce", "Bangla/English"],
        link: "/solutions/digital#websites",
      },
      {
        icon: "phone",
        title: "Mobile Apps",
        description: "Android and iOS apps for customers, students, staff and field teams.",
        tags: ["Android", "iOS", "Admin panel", "Push notifications"],
        link: "/solutions/digital#mobile",
      },
    ],
    supply: [
      {
        icon: "bolt",
        title: "Generators & Power Backup",
        description: "Diesel and gas generators, IPS, online UPS and batteries for factories, offices and hospitals.",
        tags: ["Generators", "IPS & UPS", "Batteries", "Stabilisers"],
        link: "/solutions/equipment#power",
      },
      {
        icon: "sun",
        title: "Solar Systems",
        description: "On-grid and hybrid solar, batteries, street lights and irrigation pumps.",
        tags: ["Solar panels", "Inverters", "Street lights", "Irrigation pumps"],
        link: "/solutions/equipment#solar",
      },
      {
        icon: "gear",
        title: "Garment & Industrial Machinery",
        description: "Sewing, cutting and finishing machines, compressors, pumps and workshop tools.",
        tags: ["RMG machines", "Compressors", "Pumps & motors", "Spare parts"],
        link: "/solutions/equipment#industrial",
      },
      {
        icon: "server",
        title: "IT, Networking & CCTV",
        description: "Computers, printers, networking, servers and CCTV — supplied with warranty.",
        tags: ["Laptops & PCs", "Networking", "CCTV", "Access control"],
        link: "/solutions/equipment#it-security",
      },
    ],
    install: [
      {
        icon: "wrench",
        title: "Machine Installation",
        description: "Positioning, connection, testing and commissioning of machines and equipment.",
        tags: ["Commissioning", "Testing", "Handover", "Staff training"],
        link: "/solutions/engineering",
      },
      {
        icon: "building",
        title: "Electrical & Civil Works",
        description: "Wiring, panels and earthing, plus machine foundations, cable trenches and site fit-out.",
        tags: ["Wiring & panels", "Foundations", "Cable trenches", "Fit-out"],
        link: "/solutions/engineering#civil",
      },
      {
        icon: "sun",
        title: "Solar & Network Setup",
        description: "Rooftop solar, structured cabling, Wi-Fi and CCTV — installed neatly and safely.",
        tags: ["Rooftop solar", "Cabling", "Wi-Fi", "CCTV"],
        link: "/solutions/engineering#solar-install",
      },
      {
        icon: "chart",
        title: "Technical Consultancy",
        description: "Site surveys, load calculation, equipment selection and BOQ — before you spend.",
        tags: ["Site survey", "Load calculation", "Equipment selection", "BOQ"],
        link: "/contact?type=install",
      },
    ],
  } satisfies Record<CardAreaId, CardInput[]>,
};

export default homeCards;
