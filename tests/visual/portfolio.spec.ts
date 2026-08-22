import { expect, test } from "@playwright/test";

const pages = [
  { name: "home", path: "/" },
  { name: "case-study", path: "/work/feathershark-fireops" },
  { name: "not-found", path: "/definitely-not-here" },
];

for (const pageInfo of pages) {
  test(`${pageInfo.name} has no horizontal overflow`, async ({ page }) => {
    await page.goto(pageInfo.path);
    await page.waitForLoadState("networkidle");

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      const viewportWidth = doc.clientWidth;
      const elementOffenders = Array.from(document.querySelectorAll("body *"))
        .map((element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          const visible =
            rect.width > 0 &&
            rect.height > 0 &&
            style.visibility !== "hidden" &&
            style.display !== "none" &&
            !element.closest("[aria-hidden='true']");

          return {
            tag: element.tagName.toLowerCase(),
            text: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 80),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            visible,
          };
        })
        .filter(
          (item) => item.visible && (item.left < -1 || item.right > viewportWidth + 1),
        );
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const textOffenders = [];
      let node = walker.nextNode();

      while (node) {
        const text = (node.textContent ?? "").trim().replace(/\s+/g, " ");
        const parent = node.parentElement;
        if (text && parent && !parent.closest("[aria-hidden='true']")) {
          const style = getComputedStyle(parent);
          const range = document.createRange();
          range.selectNodeContents(node);
          const rect = range.getBoundingClientRect();
          const visible =
            rect.width > 0 &&
            rect.height > 0 &&
            style.visibility !== "hidden" &&
            style.display !== "none";

          if (visible && (rect.left < -1 || rect.right > viewportWidth + 1)) {
            textOffenders.push({
              tag: parent.tagName.toLowerCase(),
              text: text.slice(0, 80),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
            });
          }
        }
        node = walker.nextNode();
      }

      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: viewportWidth,
        overflowing:
          doc.scrollWidth > viewportWidth + 1 ||
          elementOffenders.length > 0 ||
          textOffenders.length > 0,
        offenders: [...elementOffenders, ...textOffenders],
      };
    });

    expect(overflow, JSON.stringify(overflow)).toEqual(
      expect.objectContaining({ overflowing: false }),
    );
  });
}

test("major display type stays below billboard scale", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const homeSize = await page.locator("h1").evaluate((element) => {
    return Number.parseFloat(getComputedStyle(element).fontSize);
  });
  const homeLimit = testInfo.project.name === "chromium-mobile" ? 48 : 86;
  expect(homeSize).toBeLessThanOrEqual(homeLimit);

  await page.goto("/work/feathershark-fireops");
  await page.waitForLoadState("networkidle");

  const caseSize = await page.locator("h1").evaluate((element) => {
    return Number.parseFloat(getComputedStyle(element).fontSize);
  });
  const caseLimit = testInfo.project.name === "chromium-mobile" ? 42 : 64;
  expect(caseSize).toBeLessThanOrEqual(caseLimit);
});

const visualBaselines = [
  { name: "home", path: "/" },
  { name: "case-study", path: "/work/feathershark-fireops" },
  { name: "not-found", path: "/definitely-not-here" },
];

for (const pageInfo of visualBaselines) {
  test(`${pageInfo.name} editorial visual baseline`, async ({ page }, testInfo) => {
    await page.goto(pageInfo.path);
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot(`${pageInfo.name}-${testInfo.project.name}.png`, {
      fullPage: true,
    });
  });
}

test("home light palette visual baseline", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await expect(page).toHaveScreenshot(`home-light-${testInfo.project.name}.png`, {
    fullPage: true,
  });
});

test("work and contact sections have local visual baselines", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("#work")).toHaveScreenshot(`work-section-${testInfo.project.name}.png`);
  await expect(page.locator("#contact")).toHaveScreenshot(`contact-section-${testInfo.project.name}.png`);
});

test("work rows expose an active hover state", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "desktop hover interaction");

  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const row = page.locator("#work ul li a").first();
  await row.scrollIntoViewIfNeeded();

  const restBackground = await row.evaluate((element) => getComputedStyle(element).backgroundColor);

  await row.hover();
  await page.waitForTimeout(450);

  const hoverState = await row.evaluate((element) => ({
    hovered: element.matches(":hover"),
    background: getComputedStyle(element).backgroundColor,
  }));

  expect(hoverState.hovered).toBe(true);
  expect(restBackground).toBe("rgba(0, 0, 0, 0)");
  expect(hoverState.background).not.toBe(restBackground);
  await expect(row).toHaveScreenshot(`work-card-hover-${testInfo.project.name}.png`);
});

test("work card route navigation starts detail pages at the top", async ({ page }) => {
  await page.goto("/#work");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("#work")).toBeInViewport();

  const rootScrollBehavior = await page.locator("html").evaluate((element) => {
    return getComputedStyle(element).scrollBehavior;
  });
  expect(rootScrollBehavior).toBe("auto");

  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(200);
  await page.locator("#work ul li a").first().click();
  await page.waitForURL("**/work/repokernel");

  const scrollSamples: number[] = [];
  for (let index = 0; index < 4; index += 1) {
    scrollSamples.push(await page.evaluate(() => Math.round(window.scrollY)));
    await page.waitForTimeout(50);
  }

  expect(scrollSamples).toEqual(scrollSamples.map(() => 0));
});

test("contact form keeps client validation", async ({ page }) => {
  await page.goto("/#contact");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(500);
  const form = page.locator("#contact form");
  await form.scrollIntoViewIfNeeded();
  await form.getByRole("button", { name: "Send message" }).click();

  await expect(form.getByText("Name is required")).toBeVisible();
  await expect(form.getByText("Enter a valid email")).toBeVisible();
  await expect(form.getByText("At least 10 characters")).toBeVisible();
});

test("mobile menu opens and closes from a nav link", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-mobile", "mobile-only interaction");

  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.locator("#mobile-nav")).toHaveAttribute("aria-hidden", "false");

  await page.locator("#mobile-nav").getByRole("link", { name: "Work", exact: true }).click();
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
});
