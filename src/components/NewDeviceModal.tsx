import React, { FC, useState } from 'react';
import { Modal, Button, View, Text, StyleSheet, TextInput } from 'react-native';
import { DeviceInterface, useAppContext } from '../context/AppContext';

const NewDeviceModal: FC<{}> = () => {
  const { showNewDeviceModal, setShowNewDeviceModal, selectedCity, addDevice } =
    useAppContext();

  const defaultDevice = () => ({
    ssid: '',
    city: selectedCity.name,
    lat: '',
    long: '',
  });

  const [newDevice, setNewDevice] = useState<DeviceInterface>(defaultDevice());

  const setField = (field: keyof DeviceInterface, value: string) =>
    setNewDevice({ ...newDevice, [field]: value } as DeviceInterface);

  const onClose = () => {
    setShowNewDeviceModal(false);
    setNewDevice(defaultDevice());
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={showNewDeviceModal}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Add a new device in {newDevice.city}</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setField('ssid', text)}
            value={newDevice.ssid}
            placeholder="ssid"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setField('lat', text)}
            value={newDevice.lat}
            placeholder="latitude"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setField('long', text)}
            value={newDevice.long}
            placeholder="longitude"
            keyboardType="numeric"
          />
          <View style={styles.buttonRow}>
            <Button title="Cancel" color={'#6B6B6B'} onPress={onClose} />
            <Button
              title="Add Device"
              color={'#5B18D7'}
              onPress={() => addDevice(newDevice)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  modalView: {
    width: '92%',
    height: '95%',
    backgroundColor: '#FFF',
    margin: 20,
    padding: 10,
    paddingTop: 25,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: '#5B18D7',
    backgroundColor: '#F9F9F9',
    borderRadius: 5,
    height: 40,
    margin: 10,
    padding: 7,
  },
  buttonRow: {
    width: '80%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default NewDeviceModal;
