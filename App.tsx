import React, { FC } from 'react';
import { AppContextProvider } from './src/context/AppContext';
import MapScreen from './src/screens/MapScreen';

const App: FC<{}> = () => {
  return (
    <AppContextProvider>
      <MapScreen />
    </AppContextProvider>
  );
};

export default App;
