import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { buildEnquiryMailto, PROJECT_TYPES } from "@/lib/enquiry";
import { studio } from "@/lib/studio";

export function EnquiryForm({
  defaultProject = "Wedding",
}: {
  defaultProject?: string | undefined;
}) {
  const id = useId();
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const read = (key: string) => String(data.get(key) ?? "").trim();
    window.location.href = buildEnquiryMailto(studio.email, {
      name: read("name"),
      email: read("email"),
      project: read("project"),
      date: read("date"),
      venue: read("venue"),
      budget: read("budget"),
      message: read("message"),
    });
    setSent(true);
  };

  return (
    <form className="enquiry" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor={`${id}-name`}>Your name</label>
        <input id={`${id}-name`} name="name" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor={`${id}-email`}>Email</label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor={`${id}-project`}>What are you planning?</label>
        <select id={`${id}-project`} name="project" defaultValue={defaultProject} required>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor={`${id}-date`}>Date</label>
        <input id={`${id}-date`} name="date" type="date" />
      </div>
      <div className="field">
        <label htmlFor={`${id}-venue`}>Venue or area</label>
        <input id={`${id}-venue`} name="venue" autoComplete="off" />
      </div>
      <div className="field">
        <label htmlFor={`${id}-budget`}>Budget (optional)</label>
        <input id={`${id}-budget`} name="budget" autoComplete="off" />
      </div>
      <div className="field field-wide">
        <label htmlFor={`${id}-message`}>Tell us more</label>
        <textarea id={`${id}-message`} name="message" rows={4} />
      </div>
      <div className="enquiry-actions">
        <Button variant="gallery" type="submit">
          Send enquiry <span aria-hidden="true">→</span>
        </Button>
        <p className="enquiry-note" role="status">
          {sent ? (
            <>
              Your email app should open with this ready to send. If it doesn&apos;t, write to{" "}
              <a href={`mailto:${studio.email}`}>{studio.email}</a>.
            </>
          ) : (
            "This opens your email app with the details filled in."
          )}
        </p>
      </div>
    </form>
  );
}
