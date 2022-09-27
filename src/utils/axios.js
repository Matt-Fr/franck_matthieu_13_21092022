import axios from "axios";

const customFetch = axios.create({ baseURL: "http://localhost:3001/api/v1" });

export default customFetch;
