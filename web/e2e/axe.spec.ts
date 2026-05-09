import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("axe home", () => {
  test.setTimeout(120_000);

  test("home /ru has no serious or critical axe violations", async ({
    page,
  }) => {
    await page.goto("/ru", { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("home-hero")).toBeVisible({
      timeout: 90_000,
    });
    const results = await new AxeBuilder({ page }).analyze();
    const severe = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(severe).toEqual([]);
  });
});
