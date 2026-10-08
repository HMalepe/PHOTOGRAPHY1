import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useGalleryScroll } from "@/hooks/use-gallery-scroll";

export interface GalleryWork {
  image: string;
  title: string;
  category: string;
  alt: string;
}
interface PhotographyGalleryProps {
  title: string;
  subtitle: string;
  backdrop: string;
  cover: string;
  coverAlt: string;
  introLabel: string;
  workHeading: string;
  works: GalleryWork[];
  contactTitle: string;
  contactText: string;
}
export function PhotographyGallery({ title, subtitle, backdrop, cover, coverAlt, introLabel, workHeading, works, contactTitle, contactText }: PhotographyGalleryProps) {
  const galleryRef = useGalleryScroll();
  return (
    <main ref={galleryRef} className="gallery-site">
      <section className="gallery-intro" aria-label={`${title} photography`}>
        <div className="silver-word" aria-hidden="true">{backdrop}</div>
        <header className="studio-header">
          <span>LUMEN STUDIO</span>
          <nav className="category-nav" aria-label="Photography categories">
            <Button variant="ghost" asChild><Link to="/" activeOptions={{ exact: true }}>Weddings</Link></Button>
            <Button variant="ghost" asChild><Link to="/portraits">Portraits</Link></Button>
          </nav>
        </header>
        <div className="intro-content">
          <div className="intro-title">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="portrait-motion">
            <div className="portrait-drift">
              <img src={cover} width={1024} height={1408} alt={coverAlt} fetchPriority="high" />
            </div>
          </div>
        </div>
        <div className="intro-bottom"><span>{introLabel}</span><span aria-hidden="true">↓</span><span>SELECTED PHOTOGRAPHS</span></div>
      </section>

      <section className="selected-work" aria-labelledby="work-heading">
        <div className="work-heading"><h2 id="work-heading">{workHeading}</h2><span>01 — {String(works.length).padStart(2, "0")}</span></div>
        <div className="work-list">
          {works.map((work, index) => (
            <div className={`work-row ${index === 1 ? "work-row-right" : ""}`} key={work.title} data-scroll-frame data-direction={index === 1 ? "right" : "left"}>
              <figure className="photograph-frame">
                <div className="photograph-window"><img src={work.image} width={1200} height={800} loading="lazy" alt={work.alt} /></div>
                <figcaption><span>{String(index + 1).padStart(2, "0")} — {work.title}</span><span>{work.category}</span></figcaption>
              </figure>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section" aria-labelledby="contact-heading">
        <div className="contact-content" data-scroll-frame>
          <span className="contact-label">A CONVERSATION, A POSSIBILITY</span>
          <h2 id="contact-heading">{contactTitle}</h2>
          <p>{contactText}</p>
          <Button variant="gallery" asChild><a href="mailto:hello@lumen.studio"><span aria-hidden="true">↗</span> hello@lumen.studio</a></Button>
        </div>
        <footer className="studio-footer"><span>LUMEN STUDIO</span><span>LIGHT &amp; SILENCE</span><span>© 2026</span></footer>
      </section>
    </main>
  );
}
