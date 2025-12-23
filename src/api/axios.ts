import axios from "axios";

const API = axios.create({
  baseURL: "https://store-api.softclub.tj/", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
