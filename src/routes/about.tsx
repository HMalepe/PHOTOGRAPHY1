import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/page-layout";
import { studio } from "@/lib/studio";

// Each service links to the page that shows that kind of work.
const destination: Record<(typeof studio.services)[number], "/" | "/films" | "/portraits"> = {
  Weddings: "/",
  "Music Videos": "/films",
  "Corporate Events": "/films",
  "Live Performances": "/films",
  Interviews: "/films",
  Photography: "/portraits",
};

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Who we are | Take It To Valhalla Films" },
      {
        name: "description",
        content:
          "A Johannesburg film production company built on documentary-style filmmaking: weddings, music videos, corporate events, interviews and live performances.",
      },
      { property: "og:title", content: "Who we are | Take It To Valhalla Films" },
      {
        property: "og:description",
        content: "Documentary-style filmmaking and photography from Johannesburg.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { rating } = studio;
  return (
    <PageLayout eyebrow={studio.name} title="Who we are">
      <section className="section about" aria-label="About the studio">
        <p className="about-lead">{studio.about}</p>
        <div className="about-grid">
          <ul className="service-list" aria-label="What we do">
            {studio.services.map((service) => (
              <li key={service}>
                <Link to={destination[service]}>
                  <span>{service}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="rating">
            <p className="rating-score">
              {rating.score}
              <small>/ {rating.outOf}</small>
            </p>
            <p className="rating-caption">
              Rated on {rating.source} from {rating.count} reviews.{" "}
              <a href={rating.href} target="_blank" rel="noopener noreferrer">
                Read them
              </a>
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
