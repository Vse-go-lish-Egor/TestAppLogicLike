import React from 'react';
import { MainNavigation } from './src/navigation/MainNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';

function App() {
  console.log('App');
  return (
    <SafeAreaView style={{flex: 1}}>
      <MainNavigation />
    </SafeAreaView>
  );
}

export default App;
