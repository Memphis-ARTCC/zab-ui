import axios from "axios";

console.log(import.meta.env);

export const zabApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "https://api.memphisartcc.com",
  withCredentials: true,
});

export const vatusaApi = axios.create({
  baseURL: process.env.VATUSA_API_URL ?? "https://api.vatusa.net/v2",
});

export const vatusaApiAuth = axios.create({
  baseURL: process.env.VATUSA_API_URL ?? "https://api.vatusa.net/v2",
  withCredentials: true,
});
