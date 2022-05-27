import React, { FC } from 'react';
import { DeviceInterface } from '../context/AppContext';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

const deviceIcon = require('../resources/images/icon.png');

const DeviceMarker: FC<{
  device: DeviceInterface;
}> = ({ device }) => {
  return (
    <Marker
      key={device._id}
      coordinate={{
        latitude: device.lat,
        longitude: device.long,
      }}>
      <Image
        fadeDuration={0}
        style={styles.iconImage}
        source={deviceIcon}
        resizeMode="contain"
      />
      <Callout tooltip>
        <View style={styles.bubbleCallout}>
          <Text style={styles.bubbleText}>{device.ssid}</Text>
          <Text style={[styles.bubbleText, styles.idText]}>{device._id}</Text>
        </View>
        <View style={styles.pinch} />
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  iconImage: {
    zIndex: 1,
    flex: 1,
    width: 28,
    height: 28,
  },
  bubbleCallout: {
    backgroundColor: '#FFFFFF',
    width: 170,
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  pinch: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#FFFFFF',
    borderWidth: 10,
    alignSelf: 'center',
    marginBottom: -5,
  },
  bubbleText: {
    color: '#000000',
    textAlign: 'center',
  },
  idText: {
    fontSize: 10,
  },
});

export default DeviceMarker;
