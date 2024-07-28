import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;
const apiPORT = import.meta.env.VITE_API_PORT;

export const api = axios.create({
  baseURL: `${apiURL}${apiPORT}`
})

