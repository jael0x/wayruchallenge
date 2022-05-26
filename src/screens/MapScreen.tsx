import React, { FC } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useAppContext } from '../context/AppContext';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import DropDown from '../components/CitiesDropDown';

const { width, height } = Dimensions.get('window');

const MapScreen: FC<{}> = () => {
  const { loading, selectedCity } = useAppContext();

  const defaultLocation: Region = {
    latitude: selectedCity.lat,
    longitude: selectedCity.long,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02 * (width / height),
  };

  return (
    <View style={styles.container}>
      <MapView
        showsPointsOfInterest={true}
        showsCompass={false}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={defaultLocation}
        onRegionChangeComplete={region => {
          console.log(region);
        }}
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
