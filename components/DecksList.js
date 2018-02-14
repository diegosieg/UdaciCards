import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { white, purple, pink } from '../utils/colors';

class DecksList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Decks List</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DecksList;
