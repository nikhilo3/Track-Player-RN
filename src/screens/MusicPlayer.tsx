import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {playListData} from '../constants';
import SongInfo from '../components/SongInfo';
import SongSlider from '../components/SongSlider';
import MusicCtrl from '../components/MusicCtrl';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const {width} = Dimensions.get('window');

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>();

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackActiveTrackChanged:
        if (event.track) {
          // Check if the track is available
          setTrack(event.track);
        } else if (event.index !== undefined) {
          // If event.track is not directly available, get the track using the index
          const playingTrack = await TrackPlayer.getTrack(event.index);
          setTrack(playingTrack);
        }
        break;
    }
  });

  const renderImage = () => {
    return (
      <View style={styles.imgwrapper}>
        <View style={styles.imgcontainer}>
          {track?.songimage ? (
            <Image
              source={{
                uri: track?.songimage?.toString(),
              }}
              style={styles.img}
            />
          ) : (
            <Image
              source={{
                uri: 'https://t3.ftcdn.net/jpg/03/56/63/18/240_F_356631831_JhdXh0PYwdbtuPT3gxBezL5Bb7x4LSGV.jpg',
              }}
              style={styles.img}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgs}>{renderImage()}</View>

      <SongInfo track={track} />
      <SongSlider />
      <MusicCtrl />
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  imgs:{
    paddingBottom:'20%',
  },
  container: {
    paddingTop:'30%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  img: {
    height: '100%',
    borderRadius: 4,
  },
  imgwrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgcontainer: {
    height: 300,
    width: 300,
  },
});
