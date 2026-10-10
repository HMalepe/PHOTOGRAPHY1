import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FaqList } from "@/components/faq-list";
import { faqs } from "@/lib/studio";

describe("FaqList", () => {
  it("shows every question as a heading with its answer hidden until opened", () => {
    render(<FaqList items={faqs} />);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(faqs.length);
    expect(screen.queryByText(faqs[0]!.answer)).not.toBeInTheDocument();
  });

  it("opens one answer at a time", () => {
    render(<FaqList items={faqs} />);
    fireEvent.click(screen.getByRole("button", { name: faqs[0]!.question }));
    expect(screen.getByText(faqs[0]!.answer)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: faqs[1]!.question }));
    expect(screen.getByText(faqs[1]!.answer)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: faqs[0]!.question })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
