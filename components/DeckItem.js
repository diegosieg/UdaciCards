import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { getDeckItem } from '../utils/api';
import { formatQuestionsLength } from '../utils/helpers';
import { MainButton } from './MainButton';
import { NavigationActions } from 'react-navigation';
import { white, purple, pink, orange, gray } from '../utils/colors';

class DeckItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: { questions: [] },
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item,
  });

  componentDidMount() {
    getDeckItem(this.props.navigation.state.params.item).then(results =>
      this.setState(() => ({ deck: results })),
    );
  }

  render() {
    const { deck } = this.state;

    return (
      <View>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.cardsQtd}>
          {formatQuestionsLength(deck.questions.length)}
        </Text>
        {/* <MainButton onPress>
      </MainButton> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
});

export default DeckItem;
