const crawlerService = require("../services/crawlerService");

exports.discoverProductUrls = async (req, res) => {
  const { domains } = req.body;
  try {
    const allProductUrls = [];
    const promises = domains.map((domain) =>
      crawlerService.crawlWebsite(domain)
    );
    const results = await Promise.all(promises);

    results.forEach((result, index) => {
      allProductUrls.push({ domain: domains[index], productUrls: result });
    });

    res.json(allProductUrls);
  } catch (error) {
    res.status(500).send("Error occurred while crawling websites");
  }
};
