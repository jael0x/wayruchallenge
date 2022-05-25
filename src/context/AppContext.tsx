import React, {
  createContext,
  useContext,
  FC,
  useState,
  useEffect,
} from 'react';
// import HttpClient from '../lib/httpClient';

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
    setLoading(false);
  }, []);

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
