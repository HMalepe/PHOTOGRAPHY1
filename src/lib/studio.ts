// Client details shared by every gallery route, so contact, proof and social content stays in one place.
export interface Testimonial {
  quote: string;
  author: string;
  context?: string;
}

/**
 * Real client quotes only. The Testimonials block renders once this has entries, so nothing is
 * shown until the client supplies words their clients actually wrote (the Bark reviews are a start).
 */
export const testimonials: Testimonial[] = [];

const bark = "https://www.bark.com/en/za/b/take-it-to-valhalla-films/LnpBm/";

export const studio = {
  name: "Take It To Valhalla Films",
  shortName: "Take It To Valhalla",
  location: "Johannesburg, South Africa",
  email: "takeittovalhallafilms@gmail.com",
  services: [
    "Weddings",
    "Music Videos",
    "Corporate Events",
    "Live Performances",
    "Interviews",
    "Photography",
  ],
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/takeittovalhalla" },
    { label: "Facebook", href: "https://www.facebook.com/takeittovalhalla/" },
    { label: "YouTube", href: "https://www.youtube.com/c/TakeittoValhallafilms" },
    { label: "Bark", href: bark },
  ],
  about:
    "Take It To Valhalla Films is a Johannesburg film production company built on documentary-style filmmaking. We cover weddings, music videos, corporate functions and events, interviews and live performances. Photography, video editing and graphic design sit alongside the filming, so everything can come from one team.",
  rating: { score: "4.5", outOf: 5, count: 3, source: "Bark", href: bark },
  process: [
    {
      title: "Tell us the plan",
      text: "Send the date, the place and what you have in mind. We reply to talk it through.",
    },
    {
      title: "We shape the coverage",
      text: "Together we decide what gets filmed and photographed, and how.",
    },
    {
      title: "We film it as it happens",
      text: "Documentary-style. We stay out of the way and capture how it actually felt.",
    },
    {
      title: "You get the finished film",
      text: "Edited and delivered, with photographs alongside where you've asked for them.",
    },
  ],
} as const;
