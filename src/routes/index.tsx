import { createFileRoute } from "@tanstack/react-router";
import { PhotographyGallery } from "@/components/photography-gallery";
import couple from "@/assets/wedding-couple.jpg";
import celebration from "@/assets/wedding-celebration.jpg";
import details from "@/assets/wedding-details.jpg";
import dance from "@/assets/wedding-dance.jpg";
import type { GalleryFilm } from "@/components/film-clip";

// Placeholder clips from Mixkit's free stock library until the client's own wedding films replace them.
const mixkit = (id: number, slug: string) => [
  `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`,
  `https://assets.mixkit.co/videos/preview/mixkit-${slug}-${id}-large.mp4`,
];
const weddingFilms: GalleryFilm[] = [
  { sources: mixkit(5217, "wedding-ceremony"), poster: couple, title: "The ceremony", category: "WEDDING FILM", label: "Wedding ceremony film clip" },
  { sources: mixkit(35895, "wedding-stuff-background-video"), poster: details, title: "The details", category: "WEDDING FILM", label: "Close-up film clip of wedding details" },
  { sources: mixkit(12160, "wedding-couple-sharing-a-romantic-moment-in-a-kitchen"), poster: dance, title: "Quiet moments", category: "WEDDING FILM", label: "Newlyweds sharing a quiet moment at home" },
];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Wedding Photography & Film — Take It To Valhalla Films" },
    { name: "description", content: "Documentary-styled wedding photography and film in Johannesburg. The moments, details, and celebrations that tell your love story." },
    { property: "og:title", content: "Wedding Photography & Film — Take It To Valhalla Films" },
    { property: "og:description", content: "Your day, told like a film. Explore Take It To Valhalla Films' wedding collection." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: WeddingsPage,
});

function WeddingsPage() {
  return <PhotographyGallery
    title="Weddings"
    subtitle="Take It To Valhalla Films — your day, told like a film"
    backdrop="LOVE"
    cover={couple}
    coverAlt="Bride and groom embracing beside a sunlit window"
    introLabel="YOUR DAY, YOUR STORY"
    workHeading="Wedding Stories"
    works={[
      { image: celebration, title: "The celebration", category: "WEDDINGS", alt: "Newlyweds walking through a shower of confetti surrounded by guests" },
      { image: details, title: "The little things", category: "WEDDINGS", alt: "Bride holding a bouquet of white roses against her satin wedding dress" },
      { image: dance, title: "Just the two of you", category: "WEDDINGS", alt: "A bride and groom sharing their first dance in an elegant ballroom" },
    ]}
    films={weddingFilms}
    filmHeading="Wedding Films"
    contactTitle="Let's tell your love story"
    contactText="Wedding photography & videography across Johannesburg."
  />;
}
