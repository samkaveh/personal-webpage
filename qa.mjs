import { chromium } from "playwright";

const browser = await chromium.launch({ executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing` });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));

const report = async (name) => {
  const data = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    const hidden = els
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.top < innerHeight && r.bottom > 0 && getComputedStyle(el).opacity === "0";
      })
      .map((el) => el.className || el.tagName);
    return {
      y: Math.round(scrollY),
      h: document.documentElement.scrollHeight,
      hidden,
      h1: document.querySelector("h1")?.textContent?.trim().slice(0, 70),
    };
  });
  console.log(name, JSON.stringify(data));
};

await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await report("home");
await page.screenshot({ path: "/tmp/qa/pw-home.png", fullPage: true });

for (const [label, path] of [
  ["Work", "/projects"],
  ["Talks", "/talks"],
  ["Writing", "/blog"],
  ["About", "/"],
]) {
  await page.locator("header.site-nav .nav-link", { hasText: label }).click();
  await page.waitForURL((url) => url.pathname.replace(/\/$/, "") === (path === "/" ? "" : path));
  await page.waitForTimeout(1000);
  await report(`nav-${label}`);
  await page.screenshot({ path: `/tmp/qa/pw-${label.toLowerCase()}.png` });
}

await page.goto("http://localhost:3000/projects/#higgs", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await report("direct-higgs");
const higgs = await page.locator("#higgs").boundingBox();
console.log("higgs box", higgs);
await page.screenshot({ path: "/tmp/qa/pw-higgs.png" });

await page.goto("http://localhost:3000/#about", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await report("direct-about");
await page.screenshot({ path: "/tmp/qa/pw-about.png" });

await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await page.locator(".mobile-menu").evaluate(() => {});
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(400);
await page.locator(".nav-toggle").click();
await page.locator(".mobile-link", { hasText: "Writing" }).click();
await page.waitForURL((url) => url.pathname.replace(/\/$/, "") === "/blog");
await page.waitForTimeout(1000);
await report("mobile-writing");
await page.screenshot({ path: "/tmp/qa/pw-mobile-writing.png" });
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
await page.screenshot({ path: "/tmp/qa/pw-mobile-home.png", fullPage: true });

console.log("errors", errors);
await browser.close();
