import React, {
  createContext,
  createRef,
  useContext,
  FC,
  useState,
  useEffect,
  RefObject,
} from 'react';
import { Dimensions } from 'react-native';
import HttpClient from '../lib/HttpClient';
import cities from '../lib/cities.json';
import MapView, { Region } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const defaultLocation: Region = {
  latitude: cities[0].lat,
  longitude: cities[0].long,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02 * (width / height),
};

interface CityOptionInterface {
  url: string;
  name: string;
  lat: number;
  long: number;
}

interface AppContextInterface {
  loading: boolean;
  selectedCity: CityOptionInterface;
  setCity: (city: CityOptionInterface) => void;
  mapRef: RefObject<MapView>;
  defaultLocation: Region;
}

const AppContext = createContext<AppContextInterface>({
  loading: false,
  selectedCity: cities[0] as CityOptionInterface,
  setCity: () => {},
  mapRef: {} as RefObject<MapView>,
  defaultLocation,
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider: FC<{}> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<CityOptionInterface>({
    ...cities[0],
  });

  const mapRef = createRef<MapView>();

  useEffect(() => {
    getDevices(selectedCity.url);
  }, [selectedCity]);

  const getDevices = async (url?: string) => {
    setLoading(true);
    const response = await HttpClient.get(`devices/${url || ''}`);
    console.log(response?.data);
    setLoading(false);
  };

  const setCity = (city: CityOptionInterface) => {
    setSelectedCity(city);
    const cityLocation = {
      ...defaultLocation,
      latitude: city.lat,
      longitude: city.long,
    };
    mapRef?.current?.animateToRegion(cityLocation);
  };

  const value = {
    loading,
    selectedCity,
    setCity,
    mapRef,
    defaultLocation,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
