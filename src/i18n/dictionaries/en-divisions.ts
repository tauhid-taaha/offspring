/**
 * Detailed content for the three division pages:
 *   /solutions/digital · /solutions/equipment · /solutions/engineering
 *
 * Coverage: digital = worldwide; equipment + engineering = Bangladesh only.
 * Images are NOT configured here — drop files into public/images/divisions/<id>/
 * (see public/images/README.md). Each `offer.items[].id` doubles as its image filename.
 */
const divisions = {
  digital: {
    id: "digital",
    icon: "code",
    label: "01",
    hero: {
      eyebrow: "Software & IT",
      coverage: "Available worldwide",
      title: "Software built around how you work.",
      subtitle:
        "School & college management systems, ERPs, websites, portfolios and mobile apps — designed and developed in Bangladesh for clients anywhere in the world.",
      highlights: ["Custom-built, not templates", "Source code handed over", "Free support after launch"],
    },
    offer: {
      eyebrow: "What we offer",
      title: "Software for institutions, businesses and people.",
      subtitle: "Start with a ready-made base and customise it, or build something entirely new.",
      layout: "grid",
      items: [
        {
          id: "school-college",
          icon: "school",
          title: "School & College Management",
          description:
            "Run admissions, classes, exams and fees from one dashboard — with apps for teachers, students and guardians.",
          points: [
            "Online admission & student records",
            "Attendance, routines & exams",
            "Result cards & transcripts",
            "Fee collection & guardian SMS",
          ],
        },
        {
          id: "erp",
          icon: "chart",
          title: "ERP for Business & Factories",
          description:
            "Replace spreadsheets with one system for stock, sales, accounts and people — with reports owners can trust.",
          points: [
            "Inventory, purchase & sales",
            "Accounts & VAT-ready reports",
            "HR, attendance & payroll",
            "POS for shops & showrooms",
          ],
        },
        {
          id: "websites",
          icon: "globe",
          title: "Websites & Portfolios",
          description:
            "Fast, mobile-friendly websites that make a company, institution or professional look credible online.",
          points: [
            "Company & institution websites",
            "Personal & professional portfolios",
            "Bangla / English content",
            "Domain, hosting & SEO setup",
          ],
        },
        {
          id: "ecommerce",
          icon: "cart",
          title: "E-commerce & Online Stores",
          description: "Sell online with product catalogues, order management and local or international payments.",
          points: [
            "Product & order management",
            "bKash / Nagad / card payments",
            "Courier & delivery integration",
            "Facebook shop & pixel setup",
          ],
        },
        {
          id: "mobile",
          icon: "phone",
          title: "Mobile Apps",
          description: "Android and iOS apps for customers, students, staff and field teams — with an admin panel to manage it all.",
          points: ["Android & iOS (Flutter)", "Admin dashboard", "Push notifications", "Play Store & App Store publishing"],
        },
        {
          id: "custom",
          icon: "plug",
          title: "Custom Software & Support",
          description: "Anything else your work needs — plus hosting, maintenance and integrations that keep it running.",
          points: ["Custom web applications", "Payment & SMS gateway integration", "Hosting & server management", "Monthly maintenance plans"],
        },
      ],
    },
    banner: {
      title: "Your software. Your data. Your source code.",
      subtitle: "When the project is paid, everything is handed over — code, admin access, hosting and documentation. No lock-in.",
    },
    stack: {
      eyebrow: "Technology",
      title: "Proven tools, chosen for the long run.",
      groups: [
        { title: "Web & Mobile", items: ["React / Next.js", "Flutter", "WordPress", "Tailwind CSS"] },
        { title: "Backend", items: ["Laravel (PHP)", "Node.js", "Python", "MySQL / PostgreSQL"] },
        { title: "Hosting", items: ["AWS", "DigitalOcean", "cPanel hosting", "Docker"] },
        { title: "Integrations", items: ["bKash & Nagad", "SSLCommerz", "SMS gateways", "Stripe / PayPal"] },
      ],
    },
    process: {
      eyebrow: "How we deliver",
      title: "You see progress every week.",
      steps: [
        { title: "Discuss", description: "A free call to understand your needs and budget." },
        { title: "Demo", description: "Screens and a clickable demo before coding starts." },
        { title: "Build", description: "Weekly updates you can test on a live link." },
        { title: "Launch", description: "Go-live, data setup and training for your team." },
        { title: "Support", description: "Free support period, then optional maintenance." },
      ],
    },
    extras: {
      eyebrow: "Ways to work with us",
      title: "Pick what fits your budget.",
      items: [
        { title: "Fixed-price project", description: "Agreed scope, timeline and price, paid in milestones. Best for most institutions and businesses." },
        { title: "Monthly maintenance", description: "Updates, backups, fixes and small changes for a fixed monthly fee." },
        { title: "Dedicated developer", description: "A developer working on your product full-time — popular with international clients and agencies." },
      ],
    },
  },

  equipment: {
    id: "equipment",
    icon: "box",
    label: "02",
    hero: {
      eyebrow: "Machinery & Equipment Supply",
      coverage: "Bangladesh only",
      title: "The right machines, delivered to your site.",
      subtitle:
        "We supply power, industrial, garment, lab, IT and medical equipment to factories, schools, hospitals and offices across Bangladesh — with installation by our own team.",
      highlights: ["Quotation in BDT", "Delivery across Bangladesh", "Installation & after-sales"],
    },
    offer: {
      eyebrow: "What we supply",
      title: "Machines and equipment we supply.",
      subtitle:
        "Don't see your item? Send us the model, specification or a photo — we'll source it and send a quotation.",
      layout: "catalog",
      items: [
        {
          id: "power",
          icon: "bolt",
          title: "Generators & Power",
          description: "Backup and distribution power for factories, offices, hospitals and buildings.",
          points: ["Diesel & gas generators", "IPS & online UPS", "Batteries", "Distribution panels (LT)", "Voltage stabilisers", "Cables & switchgear"],
        },
        {
          id: "solar",
          icon: "sun",
          title: "Solar Systems",
          description: "Cut electricity bills and load-shedding impact with solar power.",
          points: ["Solar panels", "On-grid & hybrid inverters", "Solar batteries", "Solar street lights", "Solar irrigation pumps"],
        },
        {
          id: "garments",
          icon: "thread",
          title: "Garment & Textile Machinery",
          description: "Machines and spare parts for RMG, knitting and textile units.",
          points: ["Lockstitch & overlock machines", "Cutting machines", "Boilers & steam irons", "Fusing & printing machines", "Spare parts"],
        },
        {
          id: "industrial",
          icon: "gear",
          title: "Industrial Machinery",
          description: "Process and workshop machinery for factories and production lines.",
          points: ["Air compressors", "Pumps & motors", "Welding machines", "Packaging & sealing machines", "Lathe & workshop tools"],
        },
        {
          id: "it-security",
          icon: "server",
          title: "IT, Networking & CCTV",
          description: "Hardware for offices, schools and factories — supplied and set up.",
          points: ["Desktops, laptops & printers", "Routers, switches & Wi-Fi", "Servers & racks", "CCTV & IP cameras", "Access control & attendance devices"],
        },
        {
          id: "hvac",
          icon: "fan",
          title: "AC, Ventilation & Fire Safety",
          description: "Cooling, air and safety equipment for buildings and industrial floors.",
          points: ["Split & cassette ACs", "Industrial exhaust fans", "Air coolers", "Fire extinguishers", "Fire alarm systems"],
        },
        {
          id: "lab",
          icon: "flask",
          title: "School Labs & Smart Classrooms",
          description: "Everything an institution needs for science, ICT and digital classrooms.",
          points: ["Physics, chemistry & biology lab items", "ICT lab computers", "Interactive displays & projectors", "Sound systems", "Lab furniture"],
        },
        {
          id: "medical",
          icon: "medical",
          title: "Medical & Clinic Equipment",
          description: "Equipment for clinics, diagnostic centres and hospital wards.",
          points: ["Patient monitors", "Hospital beds", "Oxygen concentrators", "Sterilisers & autoclaves", "Diagnostic equipment"],
        },
      ],
    },
    banner: {
      title: "Buy it, and we'll make it run.",
      subtitle: "Most suppliers stop at delivery. Our installation team sets up, tests and trains — and is a phone call away afterwards.",
    },
    stack: null,
    process: {
      eyebrow: "How ordering works",
      title: "From requirement to running equipment.",
      steps: [
        { title: "Requirement", description: "Tell us the item, specs, quantity and site." },
        { title: "Quotation", description: "Itemised price in BDT, with brand and warranty." },
        { title: "Order", description: "Confirm with a work order or advance payment." },
        { title: "Delivery", description: "Transported safely to your site in Bangladesh." },
        { title: "Installation", description: "Set up, tested and handed over with training." },
      ],
    },
    extras: {
      eyebrow: "With every order",
      title: "What you can expect from us.",
      items: [
        { title: "Genuine products", description: "Branded equipment from established manufacturers and authorised suppliers, with brand warranty where applicable." },
        { title: "Proper paperwork", description: "Quotation, invoice, delivery challan and warranty documents — ready for your accounts and audits." },
        { title: "After-sales support", description: "We help with servicing, spare parts and warranty claims long after delivery." },
      ],
    },
  },

  engineering: {
    id: "engineering",
    icon: "bolt",
    label: "03",
    hero: {
      eyebrow: "Installation & Engineering",
      coverage: "Bangladesh only",
      title: "Installed properly. Tested. Maintained.",
      subtitle:
        "Electrical, civil, solar, networking, CCTV and AC works for factories, schools, hospitals and offices across Bangladesh — done neatly, safely and on schedule.",
      highlights: ["Site survey before quotation", "Safe, tidy workmanship", "Maintenance contracts"],
    },
    offer: {
      eyebrow: "What we offer",
      title: "Installation services.",
      subtitle: "Whether we supplied the equipment or you did, our team can install, test and maintain it.",
      layout: "grid",
      items: [
        {
          id: "electrical",
          icon: "bolt",
          title: "Electrical Installation",
          description: "Wiring and power setup for new buildings, factory floors and renovations.",
          points: ["Building & factory wiring", "Generator & IPS installation", "Distribution panels & earthing"],
        },
        {
          id: "civil",
          icon: "building",
          title: "Civil Works",
          description: "The building work around your machines — so every installation has a solid, safe base.",
          points: ["Machine foundations & plinths", "Cable trenches & ducting", "Partition, flooring & site fit-out"],
        },
        {
          id: "solar-install",
          icon: "sun",
          title: "Solar Installation",
          description: "Rooftop and on-ground solar systems for homes, schools, factories and farms.",
          points: ["Site survey & system sizing", "Rooftop & ground-mount setup", "Net-metering support"],
        },
        {
          id: "network-cctv",
          icon: "antenna",
          title: "Networking & CCTV",
          description: "Reliable internet, Wi-Fi and security coverage across your premises.",
          points: ["Structured cabling", "Office & campus Wi-Fi", "CCTV & access control setup"],
        },
        {
          id: "ac-ventilation",
          icon: "fan",
          title: "AC & Ventilation",
          description: "Cooling and air-flow systems sized correctly for the space.",
          points: ["AC installation & piping", "Exhaust & ventilation", "Servicing & gas refill"],
        },
        {
          id: "lab-setup",
          icon: "school",
          title: "ICT Lab & Smart Classroom Setup",
          description: "Turnkey lab and classroom setup for schools, colleges and madrasas.",
          points: ["Computer lab setup", "Interactive display installation", "Networking & software setup"],
        },
      ],
    },
    banner: {
      title: "Safety first. Quality always. On time.",
      subtitle: "Every job starts with a site visit and ends with testing, a handover checklist and training for your staff.",
    },
    stack: null,
    process: {
      eyebrow: "How a job runs",
      title: "Site visit to handover.",
      steps: [
        { title: "Site visit", description: "We inspect the site and understand the job." },
        { title: "Quotation", description: "Clear scope, materials list and timeline." },
        { title: "Installation", description: "Done by our team with safety precautions." },
        { title: "Testing", description: "Everything checked and verified before handover." },
        { title: "Handover", description: "Training, documents and a support contact." },
      ],
    },
    extras: {
      eyebrow: "Ways to contract",
      title: "Simple, flexible contracts.",
      items: [
        { title: "Supply + installation", description: "We provide the equipment and install it — one quotation, one responsible team." },
        { title: "Installation only", description: "You already have the equipment; we install, test and commission it." },
        { title: "Annual maintenance (AMC)", description: "Regular servicing visits and priority support for a fixed yearly fee." },
      ],
    },
  },
};

export type DivisionId = keyof typeof divisions;
export const divisionIds = Object.keys(divisions) as DivisionId[];
export default divisions;
