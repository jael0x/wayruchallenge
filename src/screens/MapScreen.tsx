import React, { FC } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppContext } from '../context/AppContext';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import DropDown from '../components/CitiesDropDown';

const MapScreen: FC<{}> = () => {
  const { loading, mapRef, defaultLocation } = useAppContext();

  return (
    <View style={styles.container}>
      <MapView
        showsPointsOfInterest={true}
        showsCompass={false}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={defaultLocation}
        ref={mapRef}
      />
      <DropDown />
      {loading && (
        <ActivityIndicator size={'large'} style={styles.activityIndicator} />
      )}
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
