/**
 * Company facts — fill these in once and they appear across the site.
 * Leave a value as "" to hide it (nothing fake is ever shown).
 */
export const company = {
  name: "Offspring Technologies",
  /** As written on the trade license. */
  legalName: "Offspring Technologies",
  /** e.g. "TRAD/DNCC/012345/2025" — shown in the footer & About page when set. */
  tradeLicenseNo: "",
  /** e.g. "Dhaka North City Corporation" */
  tradeLicenseIssuer: "",
  /** Optional: e.g. "2025". Shown as "Est. 2025" when set. */
  founded: "",
  city: "Dhaka",
  country: "Bangladesh",
  /** International format, digits only (no +), used for WhatsApp links. */
  whatsapp: "8801627276727",
  email: "offspringbd@gmail.com",
  /** For tel: links (no spaces). */
  phone: "+8801627276727",
  /** How the number is shown on the site. */
  phoneDisplay: "+880 1627-276727",
  address: "House 5, Road 11, Sector 13, Uttara, Dhaka 1230, Bangladesh",
  /** Opens the office location in Google Maps (works on phones and desktop). */
  mapUrl: "https://www.google.com/maps/search/?api=1&query=House+5%2C+Road+11%2C+Sector+13%2C+Uttara%2C+Dhaka+1230",
};

/** WhatsApp chat link, optionally with a pre-filled message. */
export function whatsappLink(message?: string) {
  if (!company.whatsapp) return "";
  return `https://wa.me/${company.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}
