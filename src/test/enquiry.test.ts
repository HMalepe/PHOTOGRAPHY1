import { describe, expect, it } from "vitest";
import { buildEnquiryMailto, type EnquiryValues } from "@/lib/enquiry";

const base: EnquiryValues = {
  name: "Thandi Nkosi",
  email: "thandi@example.com",
  project: "Wedding",
  date: "2027-06-05",
  venue: "Magaliesburg",
  budget: "",
  message: "We want it documentary-style & relaxed.",
};

const parse = (mailto: string) => {
  const url = new URL(mailto);
  return {
    to: url.pathname,
    subject: url.searchParams.get("subject"),
    body: url.searchParams.get("body") ?? "",
  };
};

describe("buildEnquiryMailto", () => {
  it("addresses the studio and names the project and sender in the subject", () => {
    const { to, subject } = parse(buildEnquiryMailto("hello@example.com", base));
    expect(to).toBe("hello@example.com");
    expect(subject).toBe("Wedding enquiry from Thandi Nkosi");
  });

  it("puts every filled field in the body and keeps special characters intact", () => {
    const { body } = parse(buildEnquiryMailto("hello@example.com", base));
    expect(body).toContain("Name: Thandi Nkosi");
    expect(body).toContain("Email: thandi@example.com");
    expect(body).toContain("Project: Wedding");
    expect(body).toContain("Venue or area: Magaliesburg");
    expect(body).toMatch(/Date: .*2027/);
    expect(body).toContain("We want it documentary-style & relaxed.");
  });

  it("leaves out optional fields that were not filled in", () => {
    const { body } = parse(
      buildEnquiryMailto("hello@example.com", { ...base, date: "", venue: "", message: "" }),
    );
    expect(body).not.toContain("Date:");
    expect(body).not.toContain("Venue or area:");
    expect(body).not.toContain("Budget:");
  });
});
