import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MusicPlayer from './screens/MusicPlayer';
import {addTrack, setupPlayer} from '../musicServices';

const App = () => {
  const [isPlayerReady, setIsPaylerReady] = useState(true);

  async function setup() {
    let isSetup = await setupPlayer();

    if (isSetup) {
      await addTrack();
    }
    setIsPaylerReady(isSetup);
  }


  useEffect(()=>{
    setup()
  },[])


  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <MusicPlayer />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
