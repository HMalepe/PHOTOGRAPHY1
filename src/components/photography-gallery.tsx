import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useGalleryScroll } from "@/hooks/use-gallery-scroll";
import { studio } from "@/lib/studio";
import logo from "@/assets/valhalla-logo.webp";
import { FilmClip, type GalleryFilm } from "@/components/film-clip";

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
  films?: GalleryFilm[];
  filmHeading?: string;
  contactTitle: string;
  contactText: string;
}
export function PhotographyGallery({ title, subtitle, backdrop, cover, coverAlt, introLabel, workHeading, works, films = [], filmHeading = "Films", contactTitle, contactText }: PhotographyGalleryProps) {
  const galleryRef = useGalleryScroll();
  return (
    <main ref={galleryRef} className="gallery-site">
      <section className="gallery-intro" aria-label={`${title} photography`}>
        <div className="silver-word" aria-hidden="true">{backdrop}</div>
        <header className="studio-header">
          <Link to="/" aria-label={`${studio.name} — home`}><img className="studio-logo" src={logo} width={831} height={684} alt="" /></Link>
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

      {films.length > 0 && (
        <section className="selected-work film-reel" aria-labelledby="film-heading">
          <div className="work-heading"><h2 id="film-heading">{filmHeading}</h2><span>01 — {String(films.length).padStart(2, "0")}</span></div>
          <div className="work-list">
            {films.map((film, index) => (
              <div className={`work-row ${index % 2 ? "work-row-right" : ""}`} key={film.title} data-scroll-frame data-direction={index % 2 ? "right" : "left"}>
                <figure className="photograph-frame film-frame">
                  <FilmClip film={film} />
                  <figcaption><span>{String(index + 1).padStart(2, "0")} — {film.title}</span><span>{film.category}</span></figcaption>
                </figure>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="contact-section" aria-labelledby="contact-heading">
        <div className="contact-content" data-scroll-frame>
          <img className="contact-logo" src={logo} width={831} height={684} loading="lazy" alt={`${studio.name} logo`} />
          <span className="contact-label">A CONVERSATION, A POSSIBILITY</span>
          <h2 id="contact-heading">{contactTitle}</h2>
          <p>{contactText}</p>
          <Button variant="gallery" asChild><a href={`mailto:${studio.email}`}><span aria-hidden="true">↗</span> {studio.email}</a></Button>
          <ul className="social-links" aria-label={`${studio.name} on social media`}>
            {studio.socials.map((social) => (
              <li key={social.label}><a href={social.href} target="_blank" rel="noopener noreferrer">{social.label}</a></li>
            ))}
          </ul>
        </div>
        <footer className="studio-footer"><span>{studio.shortName}</span><span>{studio.location.toUpperCase()}</span><span>© {new Date().getFullYear()}</span></footer>
      </section>
    </main>
  );
}
