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
}

const AppContext = createContext<AppContextInterface>({
  loading: true,
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider: FC<{}> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadNodes();
  }, []);

  const loadNodes = async () => {
    const response = await HttpClient.get(DEVICES);
    console.log(response.data);
    setLoading(false);
  };

  const value = {
    loading,
  };

  return (
    <AppContext.Provider value={value}>
      {console.log(loading)}
      {!loading && children}
    </AppContext.Provider>
  );
};
