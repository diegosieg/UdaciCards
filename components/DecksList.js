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
import { formatQuestionsLength } from '../utils/helpers';
import { DeckItem } from './DeckItem';
import { white, purple, pink, gray, lightGray } from '../utils/colors';

class DecksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myDecks: {},
    };
  }

  componentDidMount() {
    fetchData().then(results => {
      this.setState(() => ({ myDecks: results }));
    });
  }

  navigateToDeckItem(item) {
    console.log(item);
    const { navigate } = this.props.navigation;
    return navigate('DeckItem', { item });
  }

  render() {
    const { myDecks } = this.state;

    return (
      // <View >
      <ScrollView style={styles.container}>
        {Object.keys(myDecks).map(item => {
          return (
            <View style={styles.deckBox} key={myDecks[item].title}>
              <TouchableOpacity
                onPress={() => this.navigateToDeckItem(myDecks[item].title)}
              >
                <View>
                  <Text style={styles.title}>{myDecks[item].title}</Text>
                  <Text style={styles.cardsQtd}>
                    {formatQuestionsLength(myDecks[item].questions.length)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGray,
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  deckBox: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#dddae2',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.7,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: pink,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
  },
  cardsQtd: {
    fontSize: 18,
    textAlign: 'center',
    color: gray,
  },
});

export default DecksList;
