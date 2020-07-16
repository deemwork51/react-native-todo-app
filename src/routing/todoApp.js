import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import AllTodoScreen from "../all-todo/all-todo"
import ActiveScreen from "../active-todo/active-todo"
import CompletedScreen from "../completed /completed"
import { MaterialIcons, Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

const AllTodoStack = createStackNavigator(
  {
    AllTodo: { screen: AllTodoScreen },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const ActiveStack = createStackNavigator(
  {
    Active: { screen: ActiveScreen },
  },
  {
    defaultNavigationOptions: {
      headerShown: false
    },
  }
);
const CompletedStack = createStackNavigator(
  {
    Completed: { screen: CompletedScreen },
  },
  {
    defaultNavigationOptions: {
      headerShown: false
    },
  }
);


const App = createBottomTabNavigator(
  {
    All: { screen: AllTodoStack },
    Active: { screen: ActiveStack },
    Completed: { screen: CompletedStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent
        let iconName;
        if (routeName === 'All') {
          return <FontAwesome name="list" size={20} color={tintColor} />
        } else if (routeName === 'Active') {
          return <FontAwesome name="unlock-alt" size={20} color={tintColor} />;
        }
        else if (routeName === 'Completed') {
          return <MaterialIcons name="done" size={20} color={tintColor} />;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      showLabel: true,
      inactiveTintColor: "grey",
      activeTintColor: "blue",
      style: {
        backgroundColor: "white"
      }

    },
  }
);

const TodoApp = createAppContainer(App);

export default TodoApp;