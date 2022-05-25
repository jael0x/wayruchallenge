import axios, { AxiosInstance } from 'axios';

const HttpClient: AxiosInstance = axios.create({
  baseURL: 'https://devices-endpoint.herokuapp.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

HttpClient.interceptors.response.use(undefined, error => {
  console.log(error);
});

export default HttpClient;
