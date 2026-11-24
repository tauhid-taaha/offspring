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
    seo: {
      title: "Software Development, Websites & Mobile Apps in Bangladesh",
      description:
        "Custom software, ERP, school management systems, websites and mobile apps from Offspring IT, a Government-licensed software company in Dhaka serving clients worldwide.",
    },
    icon: "code",
    label: "01",
    hero: {
      eyebrow: "Software & IT",
      coverage: "Available worldwide",
      title: "Software that fits the way you work.",
      subtitle:
        "AI-powered applications, ERPs, school & college systems, websites and mobile apps — designed and built in Dhaka for clients in Bangladesh and around the world.",
      highlights: ["Built around your workflow", "Full source code handed over", "Support after launch"],
    },
    offer: {
      eyebrow: "What we offer",
      title: "Software for institutions, businesses and teams.",
      subtitle: "Start from a proven base and tailor it to you, or build something entirely new.",
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
          title: "AI & Custom Software",
          description: "AI assistants, automation and custom web apps for work that off-the-shelf software can't handle.",
          points: ["AI chatbots & assistants", "Document & data automation", "Custom web applications", "Payment & SMS integrations"],
        },
      ],
    },
    banner: {
      title: "Your software. Your data. Your source code.",
      subtitle: "Once the project is paid, everything is yours — source code, admin access, hosting and documentation. No lock-in.",
    },
    stack: {
      eyebrow: "Technology",
      title: "Proven tools, chosen for the long run.",
      groups: [
        { title: "Web & Mobile", items: ["React / Next.js", "Flutter", "WordPress", "Tailwind CSS"] },
        { title: "Backend", items: ["Laravel (PHP)", "Node.js", "Python", "MySQL / PostgreSQL"] },
        { title: "Hosting", items: ["AWS", "DigitalOcean", "cPanel hosting", "Docker"] },
        { title: "AI & Integrations", items: ["OpenAI / LLM APIs", "bKash, Nagad & SSLCommerz", "SMS gateways", "Stripe / PayPal"] },
      ],
    },
    process: {
      eyebrow: "How we deliver",
      title: "You see progress every week.",
      steps: [
        { title: "Discuss", description: "A free call to understand your goals, users and budget." },
        { title: "Design", description: "Screens and a clickable prototype before any code is written." },
        { title: "Build", description: "Weekly updates you can test on a live link." },
        { title: "Launch", description: "Go-live, data migration and training for your team." },
        { title: "Support", description: "A free support period, then optional maintenance." },
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
    seo: {
      title: "Machinery, IT Products & Equipment Supplier in Bangladesh",
      description:
        "Government-licensed supplier of IT products, networking, generators, solar, industrial and heavy machinery across Bangladesh, with itemised BDT quotations and installation.",
    },
    icon: "box",
    label: "02",
    hero: {
      eyebrow: "Machinery & Equipment Supply",
      coverage: "Bangladesh only",
      title: "The right equipment, sourced and delivered.",
      subtitle:
        "As a Government-licensed supplier, we source IT products, networking equipment, power and solar systems, industrial machinery and heavy equipment for factories, construction sites, schools, hospitals and offices across Bangladesh.",
      highlights: ["Itemised quotes in BDT", "Genuine, branded products", "Delivery & installation nationwide"],
    },
    offer: {
      eyebrow: "What we supply",
      title: "Machines and equipment we supply.",
      subtitle:
        "Don't see your item? Send us the model, a specification sheet or even a photo — we'll source it and send a quotation.",
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
          title: "Industrial & Heavy Equipment",
          description: "Heavy machinery for construction and infrastructure, plus workshop and production equipment for factories.",
          points: ["Excavators, loaders & bulldozers", "Cranes & lifting equipment", "Air compressors", "Pumps & motors", "Welding & workshop tools"],
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
      title: "We don't stop at delivery.",
      subtitle: "Our own installation team sets up, tests and commissions what we supply, trains your staff — and is a phone call away afterwards.",
    },
    stack: null,
    process: {
      eyebrow: "How ordering works",
      title: "From requirement to running equipment.",
      steps: [
        { title: "Requirement", description: "Share the item, specification, quantity and site location." },
        { title: "Quotation", description: "An itemised BDT price with brand, model and warranty." },
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
        { title: "Proper paperwork", description: "Quotation, VAT invoice, delivery challan and warranty documents — ready for your accounts and audits." },
        { title: "After-sales support", description: "We help with servicing, spare parts and warranty claims long after delivery." },
      ],
    },
  },

  engineering: {
    id: "engineering",
    seo: {
      title: "Installation, Electrical & Civil Works in Bangladesh",
      description:
        "Machine installation and commissioning, electrical and civil works, solar, networking, CCTV and technical consultancy by Offspring Engineering across Bangladesh.",
    },
    icon: "bolt",
    label: "03",
    hero: {
      eyebrow: "Installation & Engineering",
      coverage: "Bangladesh only",
      title: "Installed properly. Tested. Supported.",
      subtitle:
        "Machine installation, electrical and civil works, solar, networking and AC — plus technical consultancy — for factories, construction projects, schools, hospitals and offices across Bangladesh.",
      highlights: ["Free site survey", "Safe, tidy workmanship", "Maintenance contracts (AMC)"],
    },
    offer: {
      eyebrow: "What we offer",
      title: "Installation, civil works and consultancy.",
      subtitle: "Whether we supplied the equipment or you did, our engineers plan it, install it, test it and keep it running.",
      layout: "grid",
      items: [
        {
          id: "electrical",
          icon: "bolt",
          title: "Machine & Electrical Installation",
          description: "Positioning, wiring and commissioning of machines, plus power setup for buildings and factory floors.",
          points: ["Machine installation & commissioning", "Building & factory wiring", "Generators, IPS, panels & earthing"],
        },
        {
          id: "civil",
          icon: "building",
          title: "Civil Works",
          description: "The construction work around your equipment — so every installation has a solid, safe base.",
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
          title: "Networking, CCTV & ICT Labs",
          description: "Reliable networks and security for offices and campuses, and ready-to-use ICT labs for schools.",
          points: ["Structured cabling & Wi-Fi", "CCTV & access control", "ICT lab & smart classroom setup"],
        },
        {
          id: "ac-ventilation",
          icon: "fan",
          title: "AC & Ventilation",
          description: "Cooling and air-flow systems sized correctly for the space.",
          points: ["AC installation & piping", "Exhaust & ventilation", "Servicing & gas refill"],
        },
        {
          id: "consultancy",
          icon: "chart",
          title: "Technical Consultancy",
          description: "Expert advice before you spend — so you buy the right equipment and plan the site properly.",
          points: ["Site survey & load calculation", "Equipment selection", "BOQ & cost estimate"],
        },
      ],
    },
    banner: {
      title: "Safety first. Quality always. On time.",
      subtitle: "Every job starts with a site survey and ends with testing, a handover checklist and training for your staff.",
    },
    stack: null,
    process: {
      eyebrow: "How a job runs",
      title: "Site visit to handover.",
      steps: [
        { title: "Site survey", description: "Our engineer inspects the site and understands the job." },
        { title: "Quotation", description: "Clear scope, materials list (BOQ) and timeline." },
        { title: "Installation", description: "Carried out by our own team, following safety procedures." },
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
