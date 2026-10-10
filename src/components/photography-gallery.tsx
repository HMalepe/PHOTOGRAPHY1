import { useRef, type ReactNode } from "react";
import { FadeImage } from "@/components/fade-image";
import { useGalleryScroll } from "@/hooks/use-gallery-scroll";
import { useReady } from "@/hooks/use-ready";
import { studio } from "@/lib/studio";
import { FilmClip, type GalleryFilm } from "@/components/film-clip";
import { Showreel, type ShowreelData } from "@/components/showreel";
import { Testimonials } from "@/components/testimonials";
import { ServicesMarquee, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { EnquiryForm } from "@/components/enquiry-form";

export interface GalleryWork {
  image: string;
  title: string;
  category: string;
  alt: string;
}
interface PhotographyGalleryProps {
  title: string;
  eyebrow: string;
  cover: string;
  coverAlt: string;
  statement: ReactNode;
  workHeading?: string;
  works?: GalleryWork[];
  films?: GalleryFilm[];
  filmHeading?: string;
  showreel?: ShowreelData;
  enquiryProject?: string;
  contactTitle: string;
  contactText: string;
}

export function PhotographyGallery({
  title,
  eyebrow,
  cover,
  coverAlt,
  statement,
  workHeading = "Photographs",
  works = [],
  films = [],
  filmHeading = "Films",
  showreel,
  enquiryProject,
  contactTitle,
  contactText,
}: PhotographyGalleryProps) {
  const galleryRef = useGalleryScroll();
  const heroImage = useRef<HTMLImageElement>(null);
  const ready = useReady(heroImage);

  return (
    <main ref={galleryRef} className="gallery-site">
      <SiteHeader />

      <section className="hero" aria-labelledby="hero-title" data-ready={ready || undefined}>
        <div className="hero-media">
          <img
            ref={heroImage}
            src={cover}
            width={1024}
            height={1408}
            alt={coverAlt}
            fetchPriority="high"
          />
        </div>
        <div className="hero-curtain" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="hero-title" className="hero-title">
            <span>{title}</span>
          </h1>
        </div>
        {showreel && <Showreel reel={showreel} />}
        <div className="hero-meta">
          <span>{studio.location}</span>
          <span>Photography &amp; Film</span>
          <span className="hero-scroll">Scroll</span>
        </div>
      </section>

      <section className="section statement" aria-label="Approach">
        <p className="statement-text" data-scroll-frame>
          {statement}
        </p>
      </section>

      {works.length > 0 && (
        <section className="section" aria-labelledby="work-heading">
          <div className="section-head">
            <h2 id="work-heading" className="section-title">
              {workHeading}
            </h2>
          </div>
          <div className="works">
            {works.map((work, index) => (
              <figure
                className="work-item"
                key={work.title}
                data-scroll-frame
                data-direction={index % 2 ? "right" : "left"}
              >
                <div className="work-media">
                  <FadeImage
                    src={work.image}
                    width={1200}
                    height={800}
                    loading="lazy"
                    alt={work.alt}
                  />
                </div>
                <figcaption>
                  <span className="work-title">{work.title}</span>
                  <span className="work-category">{work.category}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {films.length > 0 && (
        <section className="section" aria-labelledby="film-heading">
          <div className="section-head">
            <h2 id="film-heading" className="section-title">
              {filmHeading}
            </h2>
          </div>
          <div className="films">
            {films.map((film, index) => (
              <figure
                className="film-item"
                key={film.title}
                data-scroll-frame
                data-direction={index % 2 ? "right" : "left"}
              >
                <FilmClip film={film} />
                <figcaption>
                  <span className="work-title">{film.title}</span>
                  <span className="work-category">{film.category}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <Testimonials />

      <ServicesMarquee />

      <section id="contact" className="section contact" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="contact-title" data-scroll-frame>
          {contactTitle}
        </h2>
        <div className="contact-grid">
          <div className="contact-aside">
            <p className="contact-text">{contactText}</p>
            <a className="contact-email" href={`mailto:${studio.email}`}>
              {studio.email}
            </a>
          </div>
          <EnquiryForm defaultProject={enquiryProject} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
