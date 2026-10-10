import { createFileRoute } from "@tanstack/react-router";
import { PhotographyGallery } from "@/components/photography-gallery";
import couple from "@/assets/wedding-couple.webp";
import celebration from "@/assets/wedding-celebration.webp";
import details from "@/assets/wedding-details.webp";
import dance from "@/assets/wedding-dance.webp";
import type { GalleryFilm } from "@/components/film-clip";
import { mixkit, weddingReel } from "@/lib/placeholder-films";

const weddingFilms: GalleryFilm[] = [
  {
    sources: mixkit(5217, "wedding-ceremony"),
    poster: couple,
    title: "The ceremony",
    category: "WEDDING FILM",
    label: "Wedding ceremony film clip",
  },
  {
    sources: mixkit(35895, "wedding-stuff-background-video"),
    poster: details,
    title: "The details",
    category: "WEDDING FILM",
    label: "Close-up film clip of wedding details",
  },
  {
    sources: mixkit(40627, "bride-and-groom-at-their-wedding-standing-head-on-in-a"),
    poster: dance,
    title: "Hand in hand",
    category: "WEDDING FILM",
    label: "Bride and groom holding hands and talking in a wedding garden",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wedding Photography & Film | Take It To Valhalla Films" },
      {
        name: "description",
        content:
          "Documentary-styled wedding photography and film in Johannesburg. The moments, details, and celebrations that tell your love story.",
      },
      { property: "og:title", content: "Wedding Photography & Film | Take It To Valhalla Films" },
      {
        property: "og:description",
        content:
          "Your day, told like a film. Explore Take It To Valhalla Films' wedding collection.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeddingsPage,
});

function WeddingsPage() {
  return (
    <PhotographyGallery
      title="Weddings"
      eyebrow="Wedding Films & Photography"
      cover={couple}
      coverAlt="Bride and groom embracing beside a sunlit window"
      statement={
        <>
          Your wedding, filmed the way it <em>actually felt.</em> Documentary-style coverage of the
          vows, the speeches, the dance floor and everything in between.
        </>
      }
      workHeading="The Stills"
      works={[
        {
          image: celebration,
          title: "The celebration",
          category: "WEDDINGS",
          alt: "Newlyweds walking through a shower of confetti surrounded by guests",
        },
        {
          image: details,
          title: "The little things",
          category: "WEDDINGS",
          alt: "Bride holding a bouquet of white roses against her satin wedding dress",
        },
        {
          image: dance,
          title: "Just the two of you",
          category: "WEDDINGS",
          alt: "A bride and groom sharing their first dance in an elegant ballroom",
        },
      ]}
      films={weddingFilms}
      filmHeading="Wedding Films"
      heroReel={weddingReel}
      showreel={{
        sources: mixkit(5217, "wedding-ceremony"),
        poster: couple,
        label: "Wedding showreel",
      }}
      enquiryProject="Wedding"
      contactTitle="Tell us about your day"
      contactText="Wedding films and photography in Johannesburg. Send your date and venue and we'll come back to you."
    />
  );
}
