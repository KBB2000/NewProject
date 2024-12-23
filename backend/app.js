const express = require('express');
const cors = require('cors');
const app = express();
const port = 3004;

app.use(cors());
app.use(express.json());

app.post('/api/crawl/discover', (req, res) => {
  const { domains } = req.body;

  const discoveredUrls = domains.map(domain => ({
    domain,
    productUrls: [`${domain}`, `${domain}/product2`, `${domain}/product3`], 
  }));

  res.json(discoveredUrls);
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
