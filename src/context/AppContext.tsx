import React, {
  createContext,
  useContext,
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import HttpClient from '../lib/HttpClient';
import { DEVICES } from '../lib/endpoints.json';
import cities from '../lib/cities.json';

interface CityOptionInterface {
  url: string;
  name: string;
  lat: number;
  long: number;
}
interface AppContextInterface {
  loading: boolean;
  getDevices: () => void;
  selectedCity: CityOptionInterface;
  setCity: Dispatch<SetStateAction<CityOptionInterface>>;
}

const AppContext = createContext<AppContextInterface>({
  loading: false,
  getDevices: () => {},
  selectedCity: {} as CityOptionInterface,
  setCity: () => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider: FC<{}> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCity, setCity] = useState<CityOptionInterface>({
    ...cities[0],
  });

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
    selectedCity,
    setCity,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
