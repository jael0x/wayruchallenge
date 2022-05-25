import React, { FC } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { useAppContext } from '../context/AppContext';

const MapScreen: FC<{}> = () => {
  const { loading, loadNodes } = useAppContext();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          colors={['#000000', '#989348']}
          onRefresh={() => loadNodes()}
        />
      }>
      <View>
        <Text>New App</Text>
      </View>
    </ScrollView>
  );
};

export default MapScreen;
