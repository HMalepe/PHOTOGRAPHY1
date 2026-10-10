import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/page-layout";
import { studio } from "@/lib/studio";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works | Take It To Valhalla Films" },
      {
        name: "description",
        content:
          "From first message to finished film: how Take It To Valhalla Films plans, shoots and delivers your project.",
      },
      { property: "og:title", content: "How it works | Take It To Valhalla Films" },
      {
        property: "og:description",
        content: "From first message to finished film, in four steps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <PageLayout eyebrow="From first message to finished film" title="How it works">
      <section className="section process" aria-label="The process">
        <ol className="process-list">
          {studio.process.map((step) => (
            <li className="process-row" key={step.title}>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </PageLayout>
  );
}
