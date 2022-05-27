import React, {
  createContext,
  createRef,
  useContext,
  FC,
  useState,
  useEffect,
  RefObject,
  Dispatch,
  SetStateAction,
} from 'react';
import { Dimensions, Alert } from 'react-native';
import HttpClient from '../lib/HttpClient';
import cities from '../lib/cities.json';
import MapView, { Region } from 'react-native-maps';
import { DEVICES } from '../lib/endpoints.json';

const { width, height } = Dimensions.get('window');
const defaultLocation: Region = {
  latitude: parseFloat(cities[0].lat),
  longitude: parseFloat(cities[0].long),
  latitudeDelta: 0.02,
  longitudeDelta: 0.02 * (width / height),
};

interface CityOptionInterface {
  url: string;
  name: string;
  lat: string;
  long: string;
}

export interface DeviceInterface {
  city: string;
  lat: string;
  long: string;
  ssid: string;
  _id?: string;
}

interface AppContextInterface {
  loading: boolean;
  selectedCity: CityOptionInterface;
  setCity: (city: CityOptionInterface) => void;
  mapRef: RefObject<MapView>;
  defaultLocation: Region;
  devices: Array<DeviceInterface>;
  showNewDeviceModal: boolean;
  setShowNewDeviceModal: Dispatch<SetStateAction<boolean>>;
  addDevice: (device: DeviceInterface) => void;
}

const AppContext = createContext<AppContextInterface>({
  loading: false,
  selectedCity: cities[0] as CityOptionInterface,
  setCity: () => {},
  mapRef: {} as RefObject<MapView>,
  defaultLocation,
  devices: [],
  showNewDeviceModal: false,
  setShowNewDeviceModal: () => {},
  addDevice: () => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider: FC<{}> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [devices, setDevices] = useState<Array<DeviceInterface>>([]);
  const [showNewDeviceModal, setShowNewDeviceModal] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<CityOptionInterface>({
    ...cities[0],
  });

  const mapRef = createRef<MapView>();

  useEffect(() => {
    getDevices(selectedCity.url);
  }, [selectedCity]);

  const getDevices = async (url?: string) => {
    setLoading(true);
    const response = await HttpClient.get(`${DEVICES}/${url || ''}`);
    if (Array.isArray(response?.data)) {
      setDevices(response?.data as Array<DeviceInterface>);
    }
    setLoading(false);
  };

  const addDevice = async (device: DeviceInterface) => {
    setLoading(true);
    const response = await HttpClient.post(DEVICES, device);
    await getDevices(selectedCity.url);
    setShowNewDeviceModal(false);
    setLoading(false);
    if (response.status === 201) {
      Alert.alert('New device created!');
    }
  };

  const setCity = (city: CityOptionInterface) => {
    setSelectedCity(city);
    const cityLocation = {
      ...defaultLocation,
      latitude: parseFloat(city.lat),
      longitude: parseFloat(city.long),
    };
    mapRef?.current?.animateToRegion(cityLocation);
  };

  const value = {
    loading,
    selectedCity,
    setCity,
    mapRef,
    defaultLocation,
    devices,
    showNewDeviceModal,
    setShowNewDeviceModal,
    addDevice,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
