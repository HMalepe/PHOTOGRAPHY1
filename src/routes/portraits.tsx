import { createFileRoute } from "@tanstack/react-router";
import { PhotographyGallery } from "@/components/photography-gallery";
import portrait from "@/assets/photographer.jpg";
import dancer from "@/assets/dancer.jpg";

export const Route = createFileRoute("/portraits")({
  head: () => ({ meta: [
    { title: "Portrait Photography — Take It To Valhalla Films" },
    { name: "description", content: "Expressive, documentary-styled portrait photography in Johannesburg by Take It To Valhalla Films." },
    { property: "og:title", content: "Portrait Photography — Take It To Valhalla Films" },
    { property: "og:description", content: "Faces, movement, and quiet moments. Discover Take It To Valhalla Films' portrait collection." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PortraitsPage,
});

function PortraitsPage() {
  return <PhotographyGallery
    title="Portraits"
    subtitle="Take It To Valhalla Films — a little light, a little soul"
    backdrop="SOUL"
    cover={portrait}
    coverAlt="A woman holding a film camera in soft natural window light"
    introLabel="SIMPLY, BEAUTIFULLY YOU"
    workHeading="Portrait Studies"
    works={[
      { image: portrait, title: "In natural light", category: "PORTRAITS", alt: "An intimate portrait of a woman with a camera beside a studio window" },
      { image: dancer, title: "A sense of movement", category: "PORTRAITS", alt: "Expressive full-body portrait of a dancer in motion with flowing fabric" },
    ]}
    contactTitle="Let's capture who you are"
    contactText="Individual portraits & creative sessions."
  />;
}
