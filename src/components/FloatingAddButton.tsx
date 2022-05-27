import React, { FC } from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const FloatingAddButton: FC<{}> = () => {
  return (
    <TouchableHighlight
      style={styles.floatingButton}
      underlayColor={'#9D74E7'}
      onPress={() => console.log('Add')}>
      <Icon name="plus" size={30} color="#FFFFFF" />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#5B18D7',
    borderRadius: 100,
    width: 60,
    height: 60,
    bottom: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});

export default FloatingAddButton;
