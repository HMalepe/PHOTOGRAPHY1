import * as Accordion from "@radix-ui/react-accordion";
import type { Faq } from "@/lib/studio";

/** One question open at a time; each question is a real heading so the page can be navigated by it. */
export function FaqList({ items }: { items: readonly Faq[] }) {
  return (
    <Accordion.Root type="single" collapsible className="faq-list">
      {items.map((item) => (
        <Accordion.Item key={item.question} value={item.question} className="faq-item">
          <Accordion.Header asChild>
            <h2 className="faq-heading">
              <Accordion.Trigger className="faq-trigger">
                <span>{item.question}</span>
                <span className="faq-icon" aria-hidden="true" />
              </Accordion.Trigger>
            </h2>
          </Accordion.Header>
          <Accordion.Content className="faq-content">
            <p>{item.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
