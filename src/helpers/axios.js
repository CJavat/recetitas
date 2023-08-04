import axios from "axios";

const reqAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});

export default reqAxios;
