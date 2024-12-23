import React, { useEffect, useState } from "react";

// Fetch product details from the API for a given URL
const fetchProductDetails = async (url) => {
  try {
    const response = await fetch(`/api/products/details?url=${url}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }
    const data = await response.json();
    console.log("Fetched product details:", data); // Log the fetched details for debugging
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

function ProductList({ urls }) {
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllProductDetails = async () => {
      setLoading(true);

      const detailsPromises = [];

      // Iterate through each domain and its product URLs
      urls.forEach((item) => {
        item.productUrls.forEach((url) => {
          console.log("Fetching details for URL:", url); // Log each URL being fetched
          
          const detailsPromise = fetchProductDetails(url).then((details) => {
            if (details) {
              setProductDetails((prevDetails) => ({
                ...prevDetails,
                [url]: details,
              }));
            }
          });
          detailsPromises.push(detailsPromise);
        });
      });

      // Wait for all promises to resolve
      await Promise.all(detailsPromises);
      setLoading(false); // Set loading to false when all details are fetched
    };

    if (urls.length > 0) {
      fetchAllProductDetails();
    }
  }, [urls]);

  return (
    <div>
      <h2>Discovered Product URLs</h2>
      {loading ? (
        <p>Loading product details...</p>
      ) : urls.length === 0 ? (
        <p>No URLs found</p> // If no URLs are passed
      ) : (
        <ul>
          {urls.map((item, index) => (
            <li key={index}>
              <strong>{item.domain}:</strong>
              <ul>
                {item.productUrls.map((url, i) => (
                  <li key={i}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                    {productDetails[url] ? (
                      <div>
                        <h3>{productDetails[url].title}</h3>
                        <p>{productDetails[url].description}</p>
                        <p>Price: ${productDetails[url].price}</p>
                        <img
                          src={productDetails[url].image}
                          alt={productDetails[url].title}
                          width={100}
                        />
                      </div>
                    ) : (
                      <p>Loading product details...</p>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
