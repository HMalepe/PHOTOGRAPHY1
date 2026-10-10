import { testimonials } from "@/lib/studio";

/** Real client quotes. Renders nothing until some are added to `testimonials` in src/lib/studio.ts. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="section" aria-labelledby="kind-words-heading">
      <div className="section-head">
        <h2 id="kind-words-heading" className="section-title">
          Kind words
        </h2>
      </div>
      <div className="testimonials">
        {testimonials.map((item) => (
          <figure className="testimonial" key={item.quote}>
            <blockquote>{item.quote}</blockquote>
            <figcaption>
              {item.author}
              {item.context ? `, ${item.context}` : ""}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
