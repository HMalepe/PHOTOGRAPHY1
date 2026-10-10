import { createFileRoute } from "@tanstack/react-router";
import { PhotographyGallery } from "@/components/photography-gallery";
import type { GalleryFilm } from "@/components/film-clip";
import { clip, filmsReel } from "@/lib/placeholder-films";
import dancer from "@/assets/dancer.webp";
import portrait from "@/assets/photographer.webp";
import celebration from "@/assets/wedding-celebration.webp";
import couple from "@/assets/wedding-couple.webp";

const films: GalleryFilm[] = [
  {
    sources: clip("studio"),
    poster: portrait,
    title: "In the booth",
    category: "MUSIC VIDEO",
    label: "A rapper with headphones recording in a studio",
  },
  {
    sources: clip("stage"),
    poster: dancer,
    title: "Front row",
    category: "LIVE PERFORMANCE",
    label: "A crowd at a music concert under stage lights",
  },
  {
    sources: clip("celebration"),
    poster: celebration,
    title: "The room responds",
    category: "CORPORATE EVENT",
    label: "Audience raising their hands at a business conference",
  },
  {
    sources: clip("dance"),
    poster: portrait,
    title: "The take",
    category: "MUSIC VIDEO",
    label: "A man singing into a microphone in a recording studio",
  },
  {
    sources: clip("ceremony"),
    poster: couple,
    title: "I do",
    category: "WEDDING FILM",
    label: "Wedding ceremony film clip",
  },
];

export const Route = createFileRoute("/films")({
  head: () => ({
    meta: [
      { title: "Films | Take It To Valhalla Films" },
      {
        name: "description",
        content:
          "Documentary-styled music videos, corporate events, interviews and live performance films from Johannesburg.",
      },
      { property: "og:title", content: "Films | Take It To Valhalla Films" },
      {
        property: "og:description",
        content:
          "Music videos, events and live performances, told documentary-style. Watch Take It To Valhalla Films' reel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FilmsPage,
});

function FilmsPage() {
  return (
    <PhotographyGallery
      title="Films"
      eyebrow="Music Videos, Events & Live"
      cover={dancer}
      coverAlt="A dancer caught mid-movement with flowing fabric"
      statement={
        <>
          Music videos, corporate functions, interviews and live shows. Shot{" "}
          <em>documentary-style,</em> cut to feel the way the room did.
        </>
      }
      films={films}
      filmHeading="Selected Films"
      heroReel={filmsReel}
      showreel={{
        sources: clip("stage"),
        poster: dancer,
        label: "Take It To Valhalla showreel",
      }}
      enquiryProject="Music video"
      contactTitle="Take it to Valhalla"
      contactText="Music videos, corporate events, interviews and live performances. Tell us what you're making."
    />
  );
}
