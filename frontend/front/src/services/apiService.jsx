import axios from "axios";

const API_URL = "http://localhost:3004/api/crawl";

export const discoverProductUrls = async (domains) => {
  try {
    const response = await axios.post(`${API_URL}/discover`, { domains });
    return response.data;
  } catch (error) {
    console.error("Error while fetching product URLs:", error);
    return [];
  }
};
