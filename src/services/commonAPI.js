import axios from "axios";
import { serverURL } from "./serverURL";

export const commonAPI = async (method, url, data = null, headers = {}) => {
  try {
    const config = {
      method,
      url: serverURL + url,
      headers: {
        ...headers
      }
    };

    if (method !== "DELETE" && data !== null) {
      config.data = data;
      
      if (!(data instanceof FormData)) {
        config.headers["Content-Type"] = "application/json";
      }
    }

    console.log(" FINAL AXIOS CONFIG:", config);

    const result = await axios(config);

    console.log("✅ API SUCCESS:", result.status);
    return {
      status: result.status,
      data: result.data,
    };
  } catch (err) {
    console.log("AXIOS ERROR FULL:", err);
    console.log("AXIOS RESPONSE:", err.response);

    return {
      status: err.response?.status || 500,
      data: err.response?.data || "Server error",
    };
  }
};
