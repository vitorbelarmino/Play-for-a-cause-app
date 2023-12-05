import axios from "axios";

const baseURL = "http://localhost:4001";
export const api = axios.create({
  baseURL,
});
