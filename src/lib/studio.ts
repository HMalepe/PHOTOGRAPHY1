// Client details shared by every gallery route, so contact and social links stay in one place.
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
    { label: "Bark", href: "https://www.bark.com/en/za/b/take-it-to-valhalla-films/LnpBm/" },
  ],
} as const;
