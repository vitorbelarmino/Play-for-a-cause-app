import axios from "axios";

const baseURL = "https://chat-play-for-a-cause.onrender.com";
export const api = axios.create({
  baseURL,
});
