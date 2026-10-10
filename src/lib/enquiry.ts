export const PROJECT_TYPES = [
  "Wedding",
  "Music video",
  "Corporate event",
  "Live performance",
  "Interview",
  "Photography",
  "Something else",
] as const;

export interface EnquiryValues {
  name: string;
  email: string;
  project: string;
  date: string;
  venue: string;
  budget: string;
  message: string;
}

const formatDate = (iso: string) => {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
};

/** Builds a mailto link carrying the whole enquiry, so it works without a form backend. */
export function buildEnquiryMailto(to: string, values: EnquiryValues): string {
  const lines = [`Name: ${values.name}`, `Email: ${values.email}`, `Project: ${values.project}`];
  if (values.date) lines.push(`Date: ${formatDate(values.date)}`);
  if (values.venue) lines.push(`Venue or area: ${values.venue}`);
  if (values.budget) lines.push(`Budget: ${values.budget}`);
  if (values.message) lines.push("", values.message);
  const subject = `${values.project} enquiry from ${values.name}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\r\n"))}`;
}
