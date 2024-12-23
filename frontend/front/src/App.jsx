import React, { useState } from "react";
import { discoverProductUrls } from "./services/apiService"
import ProductList from "./components/ProductList"

function App() {
  const [domains, setDomains] = useState([]);
  const [urls, setUrls] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const discoveredUrls = await discoverProductUrls(domains);
    setUrls(discoveredUrls);
  };

  return (
    <div className="App">
      <h1>Product URL Crawler</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={domains}
          onChange={(e) => setDomains(e.target.value.split(","))}
          placeholder="Enter domains (comma separated)"
        />
        <button type="submit">Crawl</button>
      </form>

      <ProductList urls={urls} />
    </div>
  );
}

export default App;
