const puppeteer = require("puppeteer");

const crawlWebsite = async (domain) => {
  let productUrls = [];
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(domain, { waitUntil: "domcontentloaded" });

    // Extract all anchor tags that potentially link to product pages
    productUrls = await page.$$eval("a", (links) => {
      return links
        .map((link) => link.href)
        .filter((href) => href.includes("/product/") || href.includes("/item/") || href.includes("/p/"));
    });
  } catch (error) {
    console.error(`Failed to crawl ${domain}:`, error);
  } finally {
    await browser.close();
  }

  return productUrls;
};

module.exports = { crawlWebsite };
