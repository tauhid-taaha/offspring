/**
 * The two brand pages under one domain:
 *   /en/it           → Offspring IT          (software, websites, IT products)
 *   /en/engineering  → Offspring Engineering (machinery & equipment supply, installation, civil works)
 * `seo` fields feed the page title, description and structured data.
 */
const brands = {
  it: {
    id: "it",
    path: "/it",
    icon: "code",
    name: "Offspring IT",
    seo: {
      title: "Offspring IT — Software Development, Websites & IT Products in Bangladesh",
      description:
        "Offspring IT is the software and IT division of Offspring Solutions, a Government-licensed company in Dhaka. Custom software, ERP, school management systems, websites, mobile apps, and IT products, networking and CCTV across Bangladesh.",
    },
    eyebrow: "Offspring IT",
    title: "Software development, websites and IT products.",
    subtitle:
      "Custom software, ERPs, school management systems, websites and mobile apps for clients in Bangladesh and abroad — plus IT hardware, networking and CCTV supplied and installed across Bangladesh.",
    navDescription: "Software, websites, apps and IT products",
    highlights: ["Government-licensed company", "Source code handed over", "Software delivered worldwide"],
    servicesTitle: "What Offspring IT delivers",
    services: [
      { icon: "code", title: "Custom software development", text: "Web applications and internal tools built around your workflow.", href: "/solutions/digital" },
      { icon: "globe", title: "Website design & development", text: "Company, institution and e-commerce websites in Bangla and English.", href: "/solutions/digital#websites" },
      { icon: "phone", title: "Mobile app development", text: "Android and iOS apps with an admin panel to manage them.", href: "/solutions/digital#mobile" },
      { icon: "chart", title: "ERP & school management systems", text: "Inventory, accounts, HR, admissions, exams and fees in one system.", href: "/solutions/digital#erp" },
      { icon: "server", title: "IT products & networking", text: "Computers, servers, routers, switches and Wi-Fi supplied with warranty.", href: "/solutions/equipment#it-security" },
      { icon: "antenna", title: "CCTV & network installation", text: "Structured cabling, CCTV and access control installed by our team.", href: "/solutions/engineering" },
    ],
  },
  engineering: {
    id: "engineering",
    path: "/engineering",
    icon: "gear",
    name: "Offspring Engineering",
    seo: {
      title: "Offspring Engineering — Machinery Supply, Installation & Civil Works in Bangladesh",
      description:
        "Offspring Engineering is the engineering division of Offspring Solutions, a Government-licensed supplier in Dhaka. Industrial and heavy machinery, generators, solar and equipment supply, plus installation, electrical and civil works across Bangladesh.",
    },
    eyebrow: "Offspring Engineering",
    title: "Engineering supply, installation and civil works.",
    subtitle:
      "Industrial and heavy machinery, power and solar systems sourced from established manufacturers — then installed, commissioned and maintained by our own engineers across Bangladesh.",
    navDescription: "Machinery supply, installation & civil works",
    highlights: ["Government-licensed supplier", "Itemised quotations in BDT", "Installation & after-sales support"],
    servicesTitle: "What Offspring Engineering delivers",
    services: [
      { icon: "gear", title: "Industrial & heavy machinery supply", text: "Excavators, loaders, cranes, compressors, pumps and workshop equipment.", href: "/solutions/equipment#industrial" },
      { icon: "bolt", title: "Generators & power systems", text: "Diesel and gas generators, IPS, UPS, panels and switchgear.", href: "/solutions/equipment#power" },
      { icon: "sun", title: "Solar systems", text: "On-grid and hybrid solar, batteries, street lights and irrigation pumps.", href: "/solutions/equipment#solar" },
      { icon: "wrench", title: "Machine installation & commissioning", text: "Positioning, connection, testing and handover with staff training.", href: "/solutions/engineering" },
      { icon: "building", title: "Electrical & civil works", text: "Wiring, earthing, machine foundations, trenches and site fit-out.", href: "/solutions/engineering#civil" },
      { icon: "chart", title: "Technical consultancy", text: "Site surveys, load calculation, equipment selection and BOQ.", href: "/solutions/engineering#consultancy" },
    ],
  },
  common: {
    quoteTitle: "Request a quotation",
    quoteText: "Send your requirement and receive an itemised quotation, usually within one working day.",
    quoteCta: "Get a free quote",
    otherBrand: "Also from Offspring Solutions",
  },
};

export type BrandId = "it" | "engineering";
export const brandIds: BrandId[] = ["it", "engineering"];
export default brands;
