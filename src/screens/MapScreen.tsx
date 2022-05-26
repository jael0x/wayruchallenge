import React, { FC } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useAppContext } from '../context/AppContext';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import cities from '../lib/cities.json';

const { width, height } = Dimensions.get('window');
const defaultLocation: Region = {
  latitude: cities[0].lat,
  longitude: cities[0].long,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02 * (width / height),
};

const MapScreen: FC<{}> = () => {
  const { loading } = useAppContext();

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
