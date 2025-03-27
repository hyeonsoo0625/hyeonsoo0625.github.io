import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const TRANSAPI = axios.create({
    baseURL: import.meta.env.VITE_TRANSLATE_URL,
    headers: {
      "Content-Type": "application/json",
      "Cookie": "_ga=GA1.1.850011775.1741339079; _gcl_au=1.1.376176100.1741339079; connect.sid=s%3AjCJI-eFqx8vYTah_ITaGpWh8SxZL56CP.kjZ5HymeZ3hPYcmC32FX2%2FrQOoT%2B1VZmSU5SIbK83B0; _ga_HSE0FETR74=GS1.1.1742758338.3.1.1742758390.0.0.0",
    },
  });

export const FORMAPI = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const storageAccessKey = "JWT_ACCESS";

//Auth
export const storeAccess = (token: string) => {
  localStorage.setItem(storageAccessKey, token);
};

export const setAccess = (token: string) => {
  API.defaults.headers["Authorization"] = token;
  FORMAPI.defaults.headers["Authorization"] = token;
};

export const resetAccess = () => {
  delete API.defaults.headers["Authorization"];
  delete FORMAPI.defaults.headers["Authorization"];
  localStorage.removeItem(storageAccessKey);
};

export const getAccess = (): string | null => {
  return localStorage.getItem(storageAccessKey);
};

// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const {
//       response: {
//         data: { code },
//       },
//       config,
//     } = error;

//     if (code === "TOKEN4002") {
//       const token = getAccess();

//       if (token) {
//         setAccess(token);
//         config.headers["Authorization"] = token;

//         return API.request(config);
//       } else {
//         resetAccess();
//         location.href = PAGE_URL.SignIn;
//       }
//     }
//     if (code === "TOKEN4001") {
//       resetAccess();
//       location.href = PAGE_URL.SignIn;
//     }
//   }
// );