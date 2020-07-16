/**
 * @format
 */
// import 'react-native-gesture-handler';
import React, { Component } from "react";
import { AppRegistry, Platform} from 'react-native';
import TodoApp from "./src/routing/todoApp";
import { Provider } from "react-redux";
import store from "./src/redux/store.js";

class WIP extends Component {
    render() { 
        return (
            <Provider store={store}>
            <TodoApp />
            </Provider>
           
        );
    }
}

export default WIP;



AppRegistry.registerComponent('demo', () => WIP);

{/* if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('WIP', { rootTag });
} */}