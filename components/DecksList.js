import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { fetchData } from '../utils/api';
import { white, purple, pink } from '../utils/colors';

class DecksList extends Component {
  state = {
    myDecks: {},
  };

  componentDidMount() {
    fetchData().then(results => {
      this.setState(() => ({ myDecks: results }));
    });
  }

  navigateToDeckItem(item) {
    console.log(item);
  }

  render() {
    const { myDecks } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          {Object.keys(myDecks).map(item => {
            return (
              <View style={styles.container} key={myDecks[item].title}>
                <TouchableOpacity
                  onPress={() => this.navigateToDeckItem(myDecks[item].title)}
                >
                  <View>
                    <Text>{myDecks[item].title}</Text>
                    <Text>
                      {`${myDecks[item].questions.length} ${
                        myDecks[item].questions.length === 1 ? 'card' : 'cards'
                      }`}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
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
