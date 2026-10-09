import type { ReactNode } from "react";
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
  eyebrow: string;
  cover: string;
  coverAlt: string;
  statement: ReactNode;
  workHeading?: string;
  works?: GalleryWork[];
  films?: GalleryFilm[];
  filmHeading?: string;
  contactTitle: string;
  contactText: string;
}

const pad = (value: number) => String(value).padStart(2, "0");

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
  contactTitle,
  contactText,
}: PhotographyGalleryProps) {
  const galleryRef = useGalleryScroll();
  // Sections are numbered in reading order, so optional ones never leave a gap in the sequence.
  let section = 1;
  const statementNo = section++;
  const worksNo = works.length > 0 ? section++ : 0;
  const filmsNo = films.length > 0 ? section++ : 0;
  const contactNo = section;
  const marquee = [...studio.services, ...studio.services, ...studio.services];

  return (
    <main ref={galleryRef} className="gallery-site">
      <header className="site-header">
        <Link to="/" className="site-logo" aria-label={`${studio.name}, home`}>
          <img src={logo} width={831} height={684} alt="" />
        </Link>
        <nav className="site-nav" aria-label="Categories">
          <Link to="/" activeOptions={{ exact: true }}>
            Weddings
          </Link>
          <Link to="/films">Films</Link>
          <Link to="/portraits">Portraits</Link>
        </nav>
        <a className="site-enquire" href="#contact">
          Enquire
        </a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media">
          <img src={cover} width={1024} height={1408} alt={coverAlt} fetchPriority="high" />
        </div>
        <div className="hero-curtain" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="hero-title" className="hero-title">
            <span>{title}</span>
          </h1>
        </div>
        <div className="hero-meta">
          <span>{studio.location}</span>
          <span>Photography &amp; Film</span>
          <span className="hero-scroll">Scroll</span>
        </div>
      </section>

      <section className="section statement" aria-label="Approach">
        <span className="section-label">({pad(statementNo)}) Approach</span>
        <p className="statement-text" data-scroll-frame>
          {statement}
        </p>
      </section>

      {works.length > 0 && (
        <section className="section" aria-labelledby="work-heading">
          <div className="section-head">
            <span className="section-label">({pad(worksNo)}) Stills</span>
            <h2 id="work-heading" className="section-title">
              {workHeading}
              <sup className="section-count">({works.length})</sup>
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
                  <img src={work.image} width={1200} height={800} loading="lazy" alt={work.alt} />
                </div>
                <figcaption>
                  <span className="work-index">No. {pad(index + 1)}</span>
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
            <span className="section-label">({pad(filmsNo)}) Motion</span>
            <h2 id="film-heading" className="section-title">
              {filmHeading}
              <sup className="section-count">({films.length})</sup>
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
                  <span className="work-index">No. {pad(index + 1)}</span>
                  <span className="work-title">{film.title}</span>
                  <span className="work-category">{film.category}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="marquee" aria-label="Services">
        <ul className="sr-only">
          {studio.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
        <div className="marquee-track" aria-hidden="true">
          {marquee.map((service, index) => (
            <span className="marquee-item" key={`${service}-${index}`}>
              {service}
              <span className="marquee-sep">/</span>
            </span>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact" aria-labelledby="contact-heading">
        <span className="section-label">({pad(contactNo)}) Enquiries</span>
        <h2 id="contact-heading" className="contact-title" data-scroll-frame>
          {contactTitle}
        </h2>
        <div className="contact-grid">
          <p className="contact-text">{contactText}</p>
          <div className="contact-actions">
            <Button variant="gallery" asChild>
              <a href={`mailto:${studio.email}`}>
                Start a project <span aria-hidden="true">→</span>
              </a>
            </Button>
            <a className="contact-email" href={`mailto:${studio.email}`}>
              {studio.email}
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <img
          className="footer-logo"
          src={logo}
          width={831}
          height={684}
          loading="lazy"
          alt={`${studio.name} logo`}
        />
        <ul className="footer-socials" aria-label={`${studio.name} on social media`}>
          {studio.socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noopener noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
        <span>
          © {new Date().getFullYear()} {studio.name}
        </span>
      </footer>
    </main>
  );
}
