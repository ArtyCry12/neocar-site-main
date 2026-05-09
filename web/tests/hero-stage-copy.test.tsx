import { render, screen } from "@testing-library/react";
import { useMotionValue } from "framer-motion";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import HeroStageCopy from "@/components/hero/HeroStageCopy";
import ru from "@/messages/ru";

function Host() {
  const p = useMotionValue(0);
  return <HeroStageCopy progress={p} />;
}

describe("HeroStageCopy", () => {
  it("renders intro stage title", () => {
    render(
      <NextIntlClientProvider locale="ru" messages={ru}>
        <Host />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText(ru.HeroStages.intro.title)).toBeInTheDocument();
  });
});
