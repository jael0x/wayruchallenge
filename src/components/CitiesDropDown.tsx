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
import Icon from 'react-native-vector-icons/AntDesign';

const CitiesDropDown: FC<{}> = () => {
  const { selectedCity, setCity } = useAppContext();

  const [showOptions, setShowOptions] = useState<boolean>(false);

  return (
    <View style={styles.dropDownContainer}>
      <View style={styles.selectedContainer}>
        <TouchableWithoutFeedback onPress={() => setShowOptions(!showOptions)}>
          <View style={styles.selected}>
            <Text>{selectedCity.name}</Text>
            <Icon
              name={showOptions ? 'caretup' : 'caretdown'}
              size={13}
              color="#6B6B6B"
            />
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
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
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
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  option: {
    paddingVertical: 7,
    marginVertical: 2,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
  },
});

export default CitiesDropDown;
