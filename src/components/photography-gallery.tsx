import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useGalleryScroll } from "@/hooks/use-gallery-scroll";
import { studio } from "@/lib/studio";
import logo from "@/assets/valhalla-logo.webp";
import { FilmClip, type GalleryFilm } from "@/components/film-clip";
import { Showreel, type ShowreelData } from "@/components/showreel";
import { StudioProof } from "@/components/studio-proof";
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
                  <img src={work.image} width={1200} height={800} loading="lazy" alt={work.alt} />
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

      <StudioProof />

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
