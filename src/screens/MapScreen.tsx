import React, { FC } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppContext } from '../context/AppContext';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import DropDown from '../components/CitiesDropDown';
import DeviceMarker from '../components/DeviceMarker';
import FloatingAddButton from '../components/FloatingAddButton';
import NewDeviceModal from '../components/NewDeviceModal';

const MapScreen: FC<{}> = () => {
  const { loading, mapRef, defaultLocation, devices, showNewDeviceModal } =
    useAppContext();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={defaultLocation}
        ref={mapRef}>
        {devices.map(device => (
          <DeviceMarker key={device._id} device={device} />
        ))}
      </MapView>
      <DropDown />
      {loading && (
        <ActivityIndicator size={'large'} style={styles.activityIndicator} />
      )}
      <FloatingAddButton />
      {showNewDeviceModal && <NewDeviceModal />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  activityIndicator: {
    backgroundColor: '#FFFFFF8F',
    borderRadius: 100,
    padding: 5,
  },
});

export default MapScreen;
