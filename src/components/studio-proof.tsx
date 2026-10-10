import { studio, testimonials } from "@/lib/studio";

/** About, rating, process and (once supplied) real client testimonials. */
export function StudioProof() {
  const { rating } = studio;
  return (
    <>
      <section className="section section-flush" aria-labelledby="about-heading">
        <div className="section-head">
          <h2 id="about-heading" className="section-title">
            Who we are
          </h2>
        </div>
        <div className="proof-grid">
          <p className="proof-text">{studio.about}</p>
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

      <section className="section" aria-labelledby="process-heading">
        <div className="section-head">
          <h2 id="process-heading" className="section-title">
            How it works
          </h2>
        </div>
        <ol className="steps">
          {studio.process.map((step) => (
            <li className="step" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {testimonials.length > 0 && (
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
      )}
    </>
  );
}
