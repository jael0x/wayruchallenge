import React, { FC, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import cities from '../lib/cities.json';

const CitiesDropDown: FC<{}> = () => {
  const { selectedCity, setCity } = useAppContext();

  const [showOptions, setShowOptions] = useState<boolean>(false);

  const Triangle: FC<{}> = () => {
    return (
      <View
        style={[
          styles.triangle,
          !showOptions && { transform: [{ rotate: '180deg' }] },
        ]}
      />
    );
  };

  return (
    <View style={styles.dropDownContainer}>
      <View style={styles.selectedContainer}>
        <TouchableWithoutFeedback onPress={() => setShowOptions(!showOptions)}>
          <View style={styles.selected}>
            <Text>{selectedCity.name}</Text>
            <Triangle />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {showOptions && (
        <View style={styles.optionsContainer}>
          <ScrollView>
            {cities.map(city => (
              <TouchableWithoutFeedback
                key={city.url}
                onPress={() => {
                  setShowOptions(!showOptions);
                  setCity(city);
                }}>
                <View style={styles.option}>
                  <Text>{city.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    position: 'absolute',
    width: '95%',
    top: 12,
  },
  selectedContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  selected: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#E6EAF0',
    zIndex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
    top: 35,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  option: {
    paddingVertical: 7,
    marginVertical: 2,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#6B6B6B',
  },
});

export default CitiesDropDown;
