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
  loadNodes: () => void;
}

const AppContext = createContext<AppContextInterface>({
  loading: false,
  loadNodes: () => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider: FC<{}> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadNodes();
  }, []);

  const loadNodes = async () => {
    setLoading(true);
    const response = await HttpClient.get(DEVICES);
    console.log(response?.data);
    setLoading(false);
  };

  const value = {
    loading,
    loadNodes,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
