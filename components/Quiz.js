import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native';
import { MainButton } from './MainButton';
import { getDeckItem } from '../utils/api';
import { NavigationActions } from 'react-navigation';
import { white, purple, green, red, blue, pink, orange } from '../utils/colors';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: {
        questions: [
          {
            question: '',
            answer: '',
          },
        ],
      },
      toggleAnswer: false,
      cardCurrentNumber: 0,
      counter: 0,
      endOfQuiz: false,
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

  quizNextCard = (cardCurrentNumber, deck) => {
    cardCurrentNumber++;

    if (cardCurrentNumber < deck.questions.length) {
      this.setState(() => ({ cardCurrentNumber: cardCurrentNumber }));
    } else {
      this.setState(() => ({ endOfQuiz: true }));
    }
  };

  invertCardSide = toggleAnswer =>
    this.setState(() => ({ toggleAnswer: !toggleAnswer }));

  backToMainView = item => {
    const { navigate } = this.props.navigation;
    return navigate('MainView');
  };

  restartQuiz = () => {
    this.setState(() => ({
      endOfQuiz: false,
      counter: 0,
      cardCurrentNumber: 0,
    }));
  };

  incrementQuestionCounter = (cardCurrentNumber, deck) => {
    this.setState(() => ({ counter: this.state.counter + 1 }));
    this.quizNextCard(cardCurrentNumber, deck);
  };

  render() {
    const {
      deck,
      toggleAnswer,
      cardCurrentNumber,
      endOfQuiz,
      counter,
      opacity,
    } = this.state;

    return endOfQuiz ? (
      <Animated.View style={[styles.container, { opacity }]}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreContent}>
            You scored {`${counter / deck.questions.length * 100}%`}
          </Text>
        </View>
        <MainButton
          style={styles.goBackBtn}
          onPress={() => this.backToMainView(deck.title)}
        >
          Back to My Decks
        </MainButton>
        <MainButton
          style={styles.restartBtn}
          onPress={() => this.restartQuiz()}
        >
          Restart Quiz
        </MainButton>
      </Animated.View>
    ) : (
      <ScrollView>
        <Animated.View style={[styles.container, { opacity }]}>
          <Text style={styles.header}>Quiz</Text>
          <Text style={styles.displayCounter}>
            {`${cardCurrentNumber + 1} of ${deck.questions.length}`}
          </Text>
          <View style={styles.cardBox}>
            <Text style={styles.cardContent}>
              {toggleAnswer
                ? deck.questions[cardCurrentNumber].answer
                : deck.questions[cardCurrentNumber].question}
            </Text>
          </View>
          <MainButton
            style={styles.toggleBtn}
            onPress={() => this.invertCardSide(toggleAnswer)}
          >
            {!toggleAnswer ? 'Show Answer' : 'Show Question'}
          </MainButton>
          <View style={styles.optionsBox}>
            <Text style={{ textAlign: 'center' }}>Your answer is:</Text>
            <MainButton
              style={styles.correctBtn}
              onPress={() =>
                this.incrementQuestionCounter(cardCurrentNumber, deck)
              }
            >
              Correct
            </MainButton>
            <MainButton
              style={styles.wrongBtn}
              onPress={() => this.quizNextCard(cardCurrentNumber, deck)}
            >
              Wrong
            </MainButton>
          </View>
        </Animated.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: orange,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
  },
  displayCounter: {
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 22,
    textAlign: 'center',
  },
  cardBox: {
    backgroundColor: white,
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#dddae2',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
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
  cardContent: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scoreBox: {
    marginBottom: 10,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  scoreContent: {
    fontSize: 26,
    fontWeight: 'bold',
    color: pink,
    textAlign: 'center',
  },
  optionsBox: {
    marginTop: 40,
    marginBottom: 40,
  },
  goBackBtn: {
    backgroundColor: blue,
    marginLeft: 40,
    marginRight: 40,
  },
  restartBtn: {
    backgroundColor: orange,
    marginLeft: 40,
    marginRight: 40,
  },
  toggleBtn: {
    backgroundColor: purple,
    marginLeft: 40,
    marginRight: 40,
  },
  correctBtn: {
    backgroundColor: green,
    marginLeft: 40,
    marginRight: 40,
  },
  wrongBtn: {
    backgroundColor: red,
    marginLeft: 40,
    marginRight: 40,
  },
});

export default Quiz;
