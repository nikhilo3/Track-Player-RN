import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import { musicService } from '../../musicServices.js';

const MusicCtrl = () => {
  const playBackState = usePlaybackState();
  const state = playBackState?.state;


  console.log("playback",state);
  console.log("State",State);
  
  

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const togglePlay = async () => {
    const currentTrack = TrackPlayer.getActiveTrack();

    if (currentTrack !== null) {
      console.log('seccess');
      if (state === State.Paused || state === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icon name="skip-previous" size={40} style={styles.icon} />
      </Pressable>
      <Pressable onPress={() => togglePlay()}>
        <Icon style={styles.icon} 
        name={state === State.Playing ? 'pause':'play-arrow'}
         size={75} />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  );
};

export default MusicCtrl;

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});
