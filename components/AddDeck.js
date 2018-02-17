import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { addNewDeckTitle } from '../utils/api';
import { NavigationActions } from 'react-navigation';
import { MainButton } from './MainButton';
import { white, purple, pink, gray } from '../utils/colors';

class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  createNewDeck = () => {
    return addNewDeckTitle(this.state.inputText).then(
      this.navigateToDeckItem(this.state.inputText),
    );
  };

  navigateToDeckItem = name => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'MainView', params: { name } }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    const { inputText } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.mainContent}>
          What is the title of your new deck?
        </Text>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={inputText => this.setState({ inputText })}
            value={inputText}
            placeholder={'An awesome title!'}
          />
          <MainButton onPress={this.createNewDeck}>Create Deck</MainButton>
        </View>
      </KeyboardAvoidingView>
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
  mainContent: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
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
});

export default AddDeck;
