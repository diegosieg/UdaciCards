import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { white, purple, pink } from './utils/colors';
import DecksList from './components/DecksList';
import AddDeck from './components/AddDeck';
import DeckItem from './components/DeckItem';
import AddNewCard from './components/AddNewCard';
import Quiz from './components/Quiz';

const Tabs = TabNavigator(
  {
    DecksList: {
      screen: DecksList,
      navigationOptions: {
        tabBarLabel: 'My Decks',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-browsers-outline" size={30} color={tintColor} />
        ),
      },
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-create-outline" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? pink : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : pink,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 5,
        shadowOpacity: 1,
      },
    },
  },
);

const MainNavigator = StackNavigator({
  MainView: {
    screen: Tabs,
  },
  DeckItem: {
    screen: DeckItem,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: pink,
      },
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: pink,
      },
    },
  },
  AddNewCard: {
    screen: AddNewCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: pink,
      },
    },
  },
});

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppStatusBar backgroundColor={purple} barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});
