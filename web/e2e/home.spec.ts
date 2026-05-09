import { expect, test } from "@playwright/test";

for (const locale of ["ru", "ro", "en"] as const) {
  test(`home /${locale} loads hero`, async ({ page }) => {
    test.setTimeout(60_000);
    const res = await page.goto(`/${locale}`);
    expect(res?.status()).toBe(200);
    await expect(page.getByTestId("home-hero")).toBeVisible({ timeout: 45_000 });
  });
}
