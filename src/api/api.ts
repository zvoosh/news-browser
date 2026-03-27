import axios from "axios";

const api = axios.create({
  baseURL: "https://content.guardianapis.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;