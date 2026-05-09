import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import Footer from "@/components/layout/Footer";
import ru from "@/messages/ru";

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: ReactNode;
    className?: string;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("Footer", () => {
  it("renders brand and tagline", () => {
    render(
      <NextIntlClientProvider locale="ru" messages={ru}>
        <Footer />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText("NEOCAR")).toBeInTheDocument();
    expect(screen.getByText(ru.Footer.tagline)).toBeInTheDocument();
  });
});
