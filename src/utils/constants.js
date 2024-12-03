export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_API_KEY,
  },
};

export const IMG_CDN_URL = process.env.REACT_APP_IMG_CDN_URL;
