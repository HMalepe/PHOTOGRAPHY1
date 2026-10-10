import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import logo from "@/assets/valhalla-logo.webp";
import { studio } from "@/lib/studio";

const NAV = [
  { to: "/", label: "Weddings" },
  { to: "/films", label: "Films" },
  { to: "/portraits", label: "Portraits" },
  { to: "/about", label: "About" },
  { to: "/how-it-works", label: "How it works" },
] as const;

/** Where "Enquire" leads: the form on this page, or the form on the home page from pages without one. */
type EnquireTarget = "here" | "home";

function EnquireLink({
  target,
  className,
  onClick,
  children,
}: {
  target: EnquireTarget;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  if (target === "home") {
    return (
      <Link to="/" hash="contact" className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href="#contact" className={className} onClick={onClick}>
      {children}
    </a>
  );
}

function MobileMenu({ enquire }: { enquire: EnquireTarget }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger className="menu-trigger">Menu</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content className="menu" data-lenis-prevent aria-describedby={undefined}>
          <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>
          <DialogPrimitive.Close className="reel-close">Close</DialogPrimitive.Close>
          <nav className="menu-nav" aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={close}
              >
                {item.label}
              </Link>
            ))}
            <EnquireLink target={enquire} className="menu-enquire" onClick={close}>
              Enquire
            </EnquireLink>
          </nav>
          <a className="menu-email" href={`mailto:${studio.email}`}>
            {studio.email}
          </a>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function SiteHeader({ enquire = "here" }: { enquire?: EnquireTarget }) {
  return (
    <header className="site-header">
      <Link to="/" className="site-logo" aria-label={`${studio.name}, home`}>
        <img src={logo} width={831} height={684} alt="" />
      </Link>
      <nav className="site-nav" aria-label="Main">
        {NAV.map((item) => (
          <Link key={item.to} to={item.to} activeOptions={{ exact: item.to === "/" }}>
            {item.label}
          </Link>
        ))}
      </nav>
      <EnquireLink target={enquire} className="site-enquire">
        Enquire
      </EnquireLink>
      <MobileMenu enquire={enquire} />
    </header>
  );
}

export function ServicesMarquee() {
  const items = [...studio.services, ...studio.services, ...studio.services];
  return (
    <section className="marquee" aria-label="Services">
      <ul className="sr-only">
        {studio.services.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>
      <div className="marquee-track" aria-hidden="true">
        {items.map((service, index) => (
          <span className="marquee-item" key={`${service}-${index}`}>
            {service}
            <span className="marquee-sep">/</span>
          </span>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
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
  );
}
