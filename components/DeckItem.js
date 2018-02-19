import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { getDeckItem } from '../utils/api';
import { formatQuestionsLength } from '../utils/helpers';
import { MainButton } from './MainButton';
import { NavigationActions } from 'react-navigation';
import {
  white,
  purple,
  pink,
  orange,
  blue,
  gray,
  black,
} from '../utils/colors';

class DeckItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: { questions: [] },
      opacity: new Animated.Value(0),
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item,
  });

  componentDidMount() {
    const { opacity } = this.state;
    getDeckItem(this.props.navigation.state.params.item)
      .then(results => this.setState(() => ({ deck: results })))
      .then(() =>
        Animated.timing(opacity, { toValue: 1, duration: 800 }).start(),
      );
  }

  startQuiz = item => {
    const { navigate } = this.props.navigation;
    return navigate('Quiz', { item });
  };

  handleNavigationBackToItem = content => {
    const newDeck = this.state.deck;
    newDeck.questions.push(content);
    this.setState(() => ({ deck: newDeck }));
  };

  addNewCard = item => {
    const { navigate } = this.props.navigation;

    return navigate('AddNewCard', {
      item,
      navBack: this.handleNavigationBackToItem,
    });
  };

  render() {
    const { deck, opacity } = this.state;

    return (
      <Animated.View style={[styles.container, { opacity }]}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.cardsQtd}>
          {formatQuestionsLength(deck.questions.length)}
        </Text>
        <MainButton
          style={styles.addBtn}
          onPress={() => this.addNewCard(deck.title)}
        >
          Add Card
        </MainButton>
        {deck.questions.length > 0 ? (
          <MainButton
            style={styles.quizBtn}
            onPress={() => this.startQuiz(deck.title)}
          >
            Start Quiz
          </MainButton>
        ) : (
          <Text style={styles.message}>
            There is no cards in this deck yet. To start a quiz, please add one
            or more cards.
          </Text>
        )}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
  },
  cardsQtd: {
    fontSize: 18,
    textAlign: 'center',
    color: gray,
    marginBottom: 20,
  },
  addBtn: {
    backgroundColor: blue,
    marginLeft: 40,
    marginRight: 40,
  },
  quizBtn: {
    backgroundColor: orange,
    marginLeft: 40,
    marginRight: 40,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 40,
    marginLeft: 40,
    marginRight: 40,
  },
});

export default DeckItem;
