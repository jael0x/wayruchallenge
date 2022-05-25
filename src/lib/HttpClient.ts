import axios, { AxiosError, AxiosInstance } from 'axios';
import { Alert } from 'react-native';

const HttpClient: AxiosInstance = axios.create({
  baseURL: 'https://devices-endpoint.herokuapp.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

HttpClient.interceptors.response.use(undefined, (error: AxiosError) => {
  // Or other custom behavior
  switch (error.response?.status) {
    case 404:
      Alert.alert('We could not find it', `${error.message}`);
      break;
    case 500:
      Alert.alert('Our Bad 😬', `${error.message}`);
      break;
    default:
      Alert.alert('Sorry...', `${error.message}`);
      break;
  }
  return error.response;
});

export default HttpClient;
