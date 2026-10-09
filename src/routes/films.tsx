import { createFileRoute } from "@tanstack/react-router";
import { PhotographyGallery } from "@/components/photography-gallery";
import type { GalleryFilm } from "@/components/film-clip";
import { mixkit } from "@/lib/placeholder-films";
import dancer from "@/assets/dancer.jpg";
import portrait from "@/assets/photographer.jpg";
import celebration from "@/assets/wedding-celebration.jpg";
import couple from "@/assets/wedding-couple.jpg";

const films: GalleryFilm[] = [
  {
    sources: mixkit(13019, "a-rapper-with-headphones-recording-in-the-studio"),
    poster: portrait,
    title: "In the booth",
    category: "MUSIC VIDEO",
    label: "A rapper with headphones recording in a studio",
  },
  {
    sources: mixkit(17631, "music-concert-crowd"),
    poster: dancer,
    title: "Front row",
    category: "LIVE PERFORMANCE",
    label: "A crowd at a music concert under stage lights",
  },
  {
    sources: mixkit(13192, "audience-raise-hands-at-business-conference"),
    poster: celebration,
    title: "The room responds",
    category: "CORPORATE EVENT",
    label: "Audience raising their hands at a business conference",
  },
  {
    sources: mixkit(13011, "a-man-singing-in-the-recording-studio"),
    poster: portrait,
    title: "The take",
    category: "MUSIC VIDEO",
    label: "A man singing into a microphone in a recording studio",
  },
  {
    sources: mixkit(5217, "wedding-ceremony"),
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
      contactTitle="Take it to Valhalla"
      contactText="Music videos, corporate events, interviews and live performances. Tell us what you're making."
    />
  );
}
