import { createFileRoute } from "@tanstack/react-router";
import { PhotographyGallery } from "@/components/photography-gallery";
import couple from "@/assets/wedding-couple.jpg";
import celebration from "@/assets/wedding-celebration.jpg";
import details from "@/assets/wedding-details.jpg";
import dance from "@/assets/wedding-dance.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Wedding Photography — Lumen Studio" },
    { name: "description", content: "Intimate wedding photography by Elena Voss. The moments, details, and celebrations that tell your love story." },
    { property: "og:title", content: "Wedding Photography — Lumen Studio" },
    { property: "og:description", content: "Love, captured in light. Explore Lumen Studio's wedding photography collection." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: WeddingsPage,
});

function WeddingsPage() {
  return <PhotographyGallery
    title="Weddings"
    subtitle="Elena Voss — love, captured in light"
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
    contactTitle="Let's tell your love story"
    contactText="Wedding photography & intimate celebrations."
  />;
}
