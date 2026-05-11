import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import HeroStageCopy from "@/components/hero/HeroStageCopy";
import ru from "@/messages/ru";

describe("HeroStageCopy", () => {
  it("renders intro stage title", () => {
    render(
      <NextIntlClientProvider locale="ru" messages={ru}>
        <HeroStageCopy stageIdx={0} />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText(ru.HeroStages.intro.title)).toBeInTheDocument();
  });
});