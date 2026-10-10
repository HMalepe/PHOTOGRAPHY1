import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useGalleryScroll } from "@/hooks/use-gallery-scroll";

/** Text-led page: solid header, big title, content, then a pointer to the enquiry form. */
export function PageLayout({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  const ref = useGalleryScroll({ solidHeader: true });
  return (
    <main ref={ref} className="gallery-site">
      <SiteHeader enquire="home" />
      <section className="page-hero" aria-labelledby="page-title">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="page-title" className="page-title">
          <span>{title}</span>
        </h1>
      </section>
      {children}
      <section className="section cta" aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="cta-title">
          Ready to take it to Valhalla?
        </h2>
        <Button variant="gallery" asChild>
          <Link to="/" hash="contact">
            Start an enquiry <span aria-hidden="true">→</span>
          </Link>
        </Button>
      </section>
      <SiteFooter />
    </main>
  );
}
