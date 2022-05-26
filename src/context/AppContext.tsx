import React, {
  createContext,
  useContext,
  FC,
  useState,
  useEffect,
} from 'react';
import HttpClient from '../lib/HttpClient';
import { DEVICES } from '../lib/endpoints.json';

interface AppContextInterface {
  loading: boolean;
  getDevices: () => void;
}

const AppContext = createContext<AppContextInterface>({
  loading: false,
  getDevices: () => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider: FC<{}> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getDevices();
  }, []);

  const getDevices = async () => {
    setLoading(true);
    const response = await HttpClient.get(DEVICES);
    console.log(response?.data);
    setLoading(false);
  };

  const value = {
    loading,
    getDevices,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
