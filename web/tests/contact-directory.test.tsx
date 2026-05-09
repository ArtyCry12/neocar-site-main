import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import ContactDirectory from "@/components/contact/ContactDirectory";
import ru from "@/messages/ru";

describe("ContactDirectory", () => {
  it("renders sales group and Vitalie name", () => {
    render(
      <NextIntlClientProvider locale="ru" messages={ru}>
        <ContactDirectory />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText(ru.Contact.groupSales)).toBeInTheDocument();
    expect(screen.getByText("Котруцэ Виталий")).toBeInTheDocument();
  });
});
