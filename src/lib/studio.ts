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

export interface Faq {
  question: string;
  answer: string;
}

const email = "takeittovalhallafilms@gmail.com";

/**
 * Drafted only from what the client's public Bark listing says about them. Prices, turnaround
 * times and travel are deliberately left open: the client should confirm and extend these.
 */
export const faqs: Faq[] = [
  {
    question: "What do you film and photograph?",
    answer:
      "Weddings, music videos, corporate functions and events, interviews and live performances, plus photography. Everything is shot documentary-style.",
  },
  {
    question: "What does documentary-style mean?",
    answer:
      "We stay out of the way and capture things as they happen instead of staging them. You get how it actually felt, not a performance of it.",
  },
  {
    question: "Where are you based?",
    answer:
      "Johannesburg, South Africa. If your project is somewhere else, tell us where and we'll work out whether we can be there.",
  },
  {
    question: "Do you take photographs as well as film?",
    answer:
      "Yes. Photography is part of what we do, and photographs can come alongside the film where you ask for them.",
  },
  {
    question: "Can you edit footage we've already shot?",
    answer:
      "Video editing is one of our services. Message us about what you have and what you want it to become.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Every project is different, so we quote once we've heard about yours. The enquiry form has an optional budget field, which helps us suggest what's possible.",
  },
  {
    question: "How far ahead should I book?",
    answer:
      "As early as you can. Send us your date and venue and we'll tell you whether we're free.",
  },
  {
    question: "How do I get started?",
    answer: `Send the enquiry form on any page, or email ${email}. Tell us what you're planning, the date and the place, and we'll reply to talk it through.`,
  },
];

const bark = "https://www.bark.com/en/za/b/take-it-to-valhalla-films/LnpBm/";

export const studio = {
  name: "Take It To Valhalla Films",
  shortName: "Take It To Valhalla",
  location: "Johannesburg, South Africa",
  email,
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
