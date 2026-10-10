import { createFileRoute } from "@tanstack/react-router";
import { FaqList } from "@/components/faq-list";
import { PageLayout } from "@/components/page-layout";
import { faqs } from "@/lib/studio";

const title = "FAQ | Take It To Valhalla Films";
const description =
  "Answers to common questions about Take It To Valhalla Films: what we film, where we work, pricing and how to book.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    // Mirrors the visible questions so search engines can show them.
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <PageLayout eyebrow="Frequently asked questions" title="FAQ" ctaTitle="Still have a question?">
      <section className="section faq" aria-label="Frequently asked questions">
        <FaqList items={faqs} />
      </section>
    </PageLayout>
  );
}
