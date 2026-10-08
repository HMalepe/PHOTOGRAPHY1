import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useGalleryScroll } from "@/hooks/use-gallery-scroll";
import portrait from "@/assets/photographer.jpg";
import ridgeline from "@/assets/ridgeline.jpg";
import dancer from "@/assets/dancer.jpg";
import birch from "@/assets/birch.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Elena Voss — Lumen Studio" },
    { name: "description", content: "Light and silence. A collection of fine-art photographs by Elena Voss — landscapes, movement, and quiet moments." },
    { property: "og:title", content: "Elena Voss — Lumen Studio" },
    { property: "og:description", content: "An intimate collection of fine-art photography. Light, movement, and silence." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const works = [
  { image: ridgeline, title: "Ridgeline", year: "2023", alt: "Layered mountain ridges emerging through silver morning mist" },
  { image: dancer, title: "Dancer", year: "2022", alt: "A ballet dancer suspended in a leap with flowing fabric in a luminous studio" },
  { image: birch, title: "Birch", year: "2024", alt: "Slender birch trees disappearing into soft forest fog" },
];

function Index() {
  const galleryRef = useGalleryScroll();
  return (
    <main ref={galleryRef} className="gallery-site">
      <section className="gallery-intro" aria-label="Elena Voss, photographer">
        <div className="silver-word" aria-hidden="true">SILVER</div>
        <header className="studio-header">
          <span>LUMEN STUDIO</span>
          <span>FINE ART PHOTOGRAPHY</span>
        </header>
        <div className="intro-content">
          <div className="intro-title">
            <h1>Elena Voss</h1>
            <p>Photographer — light &amp; silence</p>
          </div>
          <div className="portrait-motion">
            <div className="portrait-drift">
              <img src={portrait} width={1024} height={1408} alt="Elena holding a film camera in soft window light" fetchPriority="high" />
            </div>
          </div>
        </div>
        <div className="intro-bottom"><span>A STUDY IN STILLNESS</span><span aria-hidden="true">↓</span><span>SELECTED PHOTOGRAPHS</span></div>
      </section>

      <section className="selected-work" aria-labelledby="work-heading">
        <div className="work-heading"><h2 id="work-heading">Selected Works</h2><span>01 — 03</span></div>
        <div className="work-list">
          {works.map((work, index) => (
            <div className={`work-row ${index === 1 ? "work-row-right" : ""}`} key={work.title} data-scroll-frame data-direction={index === 1 ? "right" : "left"}>
              <figure className="photograph-frame">
                <div className="photograph-window"><img src={work.image} width={1200} height={800} loading="lazy" alt={work.alt} /></div>
                <figcaption><span>{String(index + 1).padStart(2, "0")} — {work.title}</span><span>{work.year}</span></figcaption>
              </figure>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section" aria-labelledby="contact-heading">
        <div className="contact-content" data-scroll-frame>
          <span className="contact-label">A CONVERSATION, A POSSIBILITY</span>
          <h2 id="contact-heading">Let's make light together</h2>
          <p>Portraits, stories &amp; commissions.</p>
          <Button variant="gallery" asChild><a href="mailto:hello@lumen.studio"><span aria-hidden="true">↗</span> hello@lumen.studio</a></Button>
        </div>
        <footer className="studio-footer"><span>LUMEN STUDIO</span><span>LIGHT &amp; SILENCE</span><span>© 2026</span></footer>
      </section>
    </main>
  );
}
