import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  console.log("🚀 Launching Puppeteer E2E Catalog Inspector...");
  const screenshotDir = path.join(process.cwd(), "scratch", "screenshots_catalog");
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const chromePaths = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ];

  let executablePath = chromePaths.find((p) => fs.existsSync(p));

  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log("🌐 Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });
  await sleep(1500);

  // Capture top showcase & header screenshot
  await page.screenshot({
    path: path.join(screenshotDir, "01_top_showcase.png"),
    fullPage: false,
  });

  // Scroll to catalog section
  console.log("📜 Scrolling to Product Catalog...");
  await page.evaluate(() => {
    const el = document.getElementById("catalog");
    if (el) el.scrollIntoView();
  });
  await sleep(1200);

  await page.screenshot({
    path: path.join(screenshotDir, "02_catalog_grid.png"),
    fullPage: false,
  });

  // Programmatically inspect DOM attributes for all product cards
  const cardsData = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll("#catalog h4"));
    return cards.map((h4) => {
      const title = h4.textContent?.trim() || "";
      let container = h4.parentElement;
      while (container && !container.classList.contains("industrial-card")) {
        container = container.parentElement;
      }
      const imgs = container
        ? Array.from(container.querySelectorAll("img")).map((img) => img.src)
        : [];
      return { title, imgs };
    });
  });

  console.log("\n================ LIVE DOM CATALOG INSPECTION ================");
  cardsData.forEach((c, idx) => {
    console.log(`\n[Card #${idx + 1}] ${c.title}`);
    c.imgs.forEach((imgUrl, i) => {
      console.log(`   - Slide ${i + 1}: ${imgUrl}`);
    });
  });
  console.log("\n============================================================\n");

  await browser.close();
  console.log("✅ E2E Puppeteer Catalog Inspection Complete!");
})();
