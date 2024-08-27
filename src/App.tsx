import React from 'react';
import {Provider} from 'react-native-paper';
import Navigator from './core/navigation/Navigator';
import {NetworkProvider} from 'react-native-offline';

const App = () => {
  return (
    <NetworkProvider>
      <Provider>
        <Navigator />
      </Provider>
    </NetworkProvider>
  );
};

export default App;
