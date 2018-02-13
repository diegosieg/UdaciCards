import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { white } from './utils/colors';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Test...</Text>
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
