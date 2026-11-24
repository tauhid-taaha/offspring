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
      title: "Software for businesses, institutions and modern operations.",
      subtitle: "From management systems and business ERPs to AI-powered applications, websites and mobile apps, we develop software around your requirements and workflows.",
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
      { icon: "school", title: "School & College Management", description: "Run admissions, classes, exams and fees from one dashboard.", tags: ["Admissions", "Exams", "Fees", "Guardian SMS"], link: "/solutions/digital#school-college" },
      { icon: "chart", title: "Business & Factory ERP", description: "Stock, sales, accounts and payroll in one system owners can trust.", tags: ["Inventory", "Accounts", "HR & payroll", "POS"], link: "/solutions/digital#erp" },
      { icon: "globe", title: "Websites & Portfolios", description: "Fast websites for companies, institutions and professionals.", tags: ["Company sites", "Portfolios", "Bangla/English", "SEO"], link: "/solutions/digital#websites" },
      { icon: "phone", title: "Mobile Apps", description: "Android and iOS apps for customers, students, staff and field teams.", tags: ["Android", "iOS", "Admin panel", "Notifications"], link: "/solutions/digital#mobile" },
      { icon: "cart", title: "E-commerce & Online Stores", description: "Catalogues, orders and local or international payments.", tags: ["Orders", "bKash / Nagad", "Delivery", "Payments"], link: "/solutions/digital#ecommerce" },
      { icon: "plug", title: "Custom Software & Support", description: "Custom web applications, integrations and ongoing support.", tags: ["Custom apps", "Integrations", "Hosting", "Maintenance"], link: "/solutions/digital#custom" },
      { icon: "rocket", title: "AI Tools & Automation", description: "Practical AI for documents, support and everyday office work.", tags: ["Documents", "Support", "Workflows", "Automation"], link: "/solutions/digital#ai" },
      { icon: "cloud", title: "Hosting & Maintenance", description: "Hosting, backups, updates and a team that keeps it running.", tags: ["Hosting", "Backups", "Updates", "Support"], link: "/solutions/digital#hosting" },
    ],
    supply: [
      { icon: "bolt", title: "Generators & Power", description: "Backup and distribution power for factories, offices and hospitals.", tags: ["Generators", "IPS & UPS", "Batteries", "Panels"], link: "/solutions/equipment#power" },
      { icon: "sun", title: "Solar Systems", description: "Panels, inverters, batteries, street lights and irrigation pumps.", tags: ["Panels", "Inverters", "Batteries", "Pumps"], link: "/solutions/equipment#solar" },
      { icon: "thread", title: "Garment & Textile Machinery", description: "Machines and spare parts for RMG, knitting and textile units.", tags: ["Sewing", "Cutting", "Boilers", "Spare parts"], link: "/solutions/equipment#garments" },
      { icon: "gear", title: "Industrial Machinery", description: "Compressors, pumps, welding and workshop tools for production lines.", tags: ["Compressors", "Pumps", "Welding", "Workshop tools"], link: "/solutions/equipment#industrial" },
      { icon: "server", title: "IT, Networking & CCTV", description: "Computers, networks, servers and CCTV — supplied and set up.", tags: ["Computers", "Networking", "CCTV", "Access control"], link: "/solutions/equipment#it-security" },
      { icon: "fan", title: "AC, Ventilation & Fire Safety", description: "Cooling, air-flow and fire safety equipment for buildings.", tags: ["Split AC", "Exhaust fans", "Extinguishers", "Alarms"], link: "/solutions/equipment#hvac" },
      { icon: "flask", title: "School Labs & Smart Classrooms", description: "Science labs, ICT computers and interactive classroom displays.", tags: ["Science labs", "ICT computers", "Displays", "Furniture"], link: "/solutions/equipment#lab" },
      { icon: "medical", title: "Medical & Clinic Equipment", description: "Equipment for clinics, diagnostic centres and hospital wards.", tags: ["Monitors", "Beds", "Oxygen", "Sterilisers"], link: "/solutions/equipment#medical" },
    ],
    install: [
      { icon: "bolt", title: "Electrical Installation", description: "Wiring and power setup for new buildings, factories and renovations.", tags: ["Wiring", "Generators", "Panels", "Earthing"], link: "/solutions/engineering#electrical" },
      { icon: "building", title: "Civil Works", description: "Machine foundations, cable trenches, partitions and site fit-out.", tags: ["Foundations", "Trenches", "Flooring", "Fit-out"], link: "/solutions/engineering#civil" },
      { icon: "sun", title: "Solar Installation", description: "Rooftop and on-ground solar for homes, schools, factories and farms.", tags: ["Site survey", "Rooftop", "Ground-mount", "Net-metering"], link: "/solutions/engineering#solar-install" },
      { icon: "antenna", title: "Networking & CCTV", description: "Structured cabling, Wi-Fi and security coverage across the site.", tags: ["Cabling", "Wi-Fi", "CCTV", "Access control"], link: "/solutions/engineering#network-cctv" },
      { icon: "fan", title: "AC & Ventilation", description: "Cooling and air-flow systems sized correctly for the space.", tags: ["AC install", "Piping", "Exhaust", "Servicing"], link: "/solutions/engineering#ac-ventilation" },
      { icon: "school", title: "ICT Lab & Smart Classroom", description: "Turnkey computer labs and classroom displays for schools.", tags: ["Computer labs", "Displays", "Networking", "Software"], link: "/solutions/engineering#lab-setup" },
      { icon: "wrench", title: "Machine Installation", description: "Positioning, connection, testing and commissioning of machines.", tags: ["Positioning", "Testing", "Handover", "Training"], link: "/solutions/engineering#machine" },
      { icon: "chart", title: "Technical Consultancy", description: "Site surveys, load calculation, equipment selection and BOQ.", tags: ["Site survey", "Load calculation", "Selection", "BOQ"], link: "/solutions/engineering#consultancy" },
    ],
  } satisfies Record<CardAreaId, CardInput[]>,
};

export default homeCards;
