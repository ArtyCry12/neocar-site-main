import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { testimonials } from "@/content/testimonials";
import { pickLocale } from "@/content/types";
import ru from "@/messages/ru";

describe("TestimonialsSection", () => {
  it("renders a testimonial quote", () => {
    render(
      <NextIntlClientProvider locale="ru" messages={ru}>
        <TestimonialsSection />
      </NextIntlClientProvider>,
    );
    const first = pickLocale("ru", testimonials[0]);
    const quotes = screen.getAllByRole("blockquote");
    expect(quotes.some((el) => el.textContent?.includes(first.quote))).toBe(
      true,
    );
  });
});
