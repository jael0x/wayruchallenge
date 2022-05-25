import React, { FC } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { AppContextProvider } from './src/context/AppContext';

const App: FC<{}> = () => {
  return (
    <AppContextProvider>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <Text>New App</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AppContextProvider>
  );
};

export default App;
