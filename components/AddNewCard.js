import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Animated,
} from 'react-native';
import { MainButton } from './MainButton';
import { NavigationActions } from 'react-navigation';
import { addNewCardToDeck } from '../utils/api';
import {
  white,
  purple,
  pink,
  orange,
  blue,
  gray,
  black,
} from '../utils/colors';

class AddNewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      title: '',
      opacity: new Animated.Value(0),
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
  });

  componentDidMount() {
    const { opacity } = this.state;

    this.setState(() => ({ title: this.props.navigation.state.params.item }));
    Animated.timing(opacity, { toValue: 1, duration: 800 }).start();
  }

  addNewCard = title => {
    //console.log(title);
    const content = {
      question: this.state.question,
      answer: this.state.answer,
    };
    return addNewCardToDeck(title, content).then(() =>
      this.returnToDeckItem(this.state.title, content),
    );
  };

  returnToDeckItem = (item, content) => {
    const { navigate, dispatch } = this.props.navigation;
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MainView' })],
    });
    dispatch(resetAction);
    navigate('DeckItem', { item });
  };

  render() {
    const { opacity } = this.state;

    return (
      <Animated.View style={[styles.container, { opacity }]}>
        <Text style={styles.mainContent}>Question</Text>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={question => this.setState({ question })}
            value={this.state.question}
            placeholder={'Create a new question'}
          />
        </View>
        <Text style={styles.mainContent}>Answer</Text>
        <View style={{ marginBottom: 40 }}>
          <TextInput
            style={styles.input}
            onChangeText={answer => this.setState({ answer })}
            value={this.state.answer}
            placeholder={'Type the answer'}
          />
        </View>
        <MainButton
          style={styles.addBtn}
          onPress={() =>
            this.addNewCard(this.props.navigation.state.params.item)
          }
        >
          Add New Card
        </MainButton>
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
  mainContent: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: Platform.OS === 'ios' ? gray : white,
    borderRadius: Platform.OS === 'ios' ? 3 : 0,
    borderWidth: Platform.OS === 'ios' ? 1 : 0,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
  },
  addBtn: {
    backgroundColor: blue,
    marginLeft: 40,
    marginRight: 40,
  },
});

export default AddNewCard;
