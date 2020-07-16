'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput, Button, FlatList, CheckBox
} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as todoActions from "../redux/actions/todo";
import { MaterialIcons, Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'


class CompletedTodo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      allTodos: [],
      newTodo: ''
    }
    

  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.allTodos!=undefined){
    if (prevState.allTodos != nextProps.allTodos) {
      var arr1=nextProps.allTodos.filter(item=>item.completed==true)
      return {
        allTodos: arr1,
      };
    }
  }
  }


  

  
  

  renderSeparatorView = () => {
    return (
      <View style={{
        height: 3,
        width: "100%",
        backgroundColor: "#CEDCCE",
      }}
      />
    );
  };


  
  render() {
    
    const { allTodos } = this.state
    //console.log(allTodos)
    return (
      <View style={styles.mainContainer}>
        
        <View style={styles.outerlist}>
          <Text style={styles.setFontSizeOne}>Completed Todos</Text>
          {allTodos && allTodos.length > 0 ?

            <FlatList
              data={allTodos}
              renderItem={({ item, index }) => (
                <View style={styles.list}>
                  <Text style={{marginLeft:'20%',width:'5%'}}>{index+1}</Text>
                  
                  <Text >{item.title}</Text>
                  
                </View>
              )}
              keyExtractor={item => item.title}
              ItemSeparatorComponent={this.renderSeparatorView}
            />

            : []}
        </View>
      </View>
    );

  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 500,
    margin: 20,
  },
  input: {
    margin: 10,
    marginLeft: 3,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  outerlist:{
    marginTop:10,
    paddingLeft:5
  },

  list: {
    flexDirection: "row",
    marginTop:10,
    paddingLeft:5
  },
  listCompletedItems:{
    width:240,
    marginLeft:5,
    textDecorationLine:"line-through"
  },
  listItems:{
    width:240,
    marginLeft:5
  },
  setFontSizeOne:{
    marginLeft:50,
    fontSize:25,
    fontWeight:"bold",
    alignItems:"center"

  }

});


CompletedTodo.propTypes = {

};

function mapStateToProps(state) {
  return {
    ...state,
    allTodos: state.todo.alltodos
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...todoActions }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { ref: true }
)(CompletedTodo);






