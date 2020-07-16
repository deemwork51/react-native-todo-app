import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput, Button, FlatList, CheckBox, TouchableOpacity, Modal
} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as todoActions from "../redux/actions/todo";
import { MaterialIcons } from '@expo/vector-icons'


class AllTodo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      allTodos: [],
      newTodo: '',
      showModal: false,
      todoToUpdate: {}
    }
    this.submitTodo = this.submitTodo.bind(this);
    this.addTodo = this.addTodo.bind(this)
    this.hideModal = this.hideModal.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    this.setState({ allTodos: nextProps.allTodos });
  }
  addTodo(e) {
    this.setState({ newTodo: e })

  }

  toggleModal(visible) {
    this.setState({ showModal: visible });
  }

  handleStatusChange = (todo) => {
    var todo = this.state.allTodos.map(item => {
      if (todo.id == item.id) {
        if (todo.completed == true) {
          item.completed = false
        }
        else {
          item.completed = true
        }
      }
      return item
    })
    this.setState({ allTodos: todo })
    this.props.deleteTodo(todo)
  }

  async submitTodo() {
    var obj = {}
    obj['id'] = this.state.allTodos.length <= 0 ? 1 : this.state.allTodos.length + 1
    obj['title'] = this.state.newTodo
    obj['completed'] = false
    obj['status'] = 'Active'
    var allTodos = this.state.allTodos
    allTodos.push(obj)
    await this.props.addUpdateTodo(allTodos)
    this.setState({ newTodo: '' })
  }

  async updateTodo() {
    var todoToUpdate = this.state.todoToUpdate
    var todo = this.state.allTodos.map(item => {
      if (item.id == todoToUpdate.id) {
        item.title = todoToUpdate.title
      }
      return item
    })
    await this.props.addUpdateTodo(todo)
    this.hideModal()
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


  itemDelete = (todo) => {
    var todo = this.state.allTodos.filter(item => item.id != todo.id)
    this.props.deleteTodo(todo)

  }
  hideModal() {
    debugger;
    console.log(this.state.allTodos)
    this.setState({ showModal: false })
  }

  handleUpdateTodo = (text) => {
    var todo = this.state.todoToUpdate
    todo['title'] = text
    this.setState({ todoToUpdate: todo })
  }
  showUpdateModal(todo) {
    this.setState({ showModal: true })
    this.setState({ todoToUpdate: todo })
  }
  render() {
    const { allTodos } = this.state
    return (
      <View style={styles.mainContainer}>
        <TextInput style={styles.input}
          value={this.state.newTodo}
          onfocus="this.placeholder=''"
          onChangeText={this.addTodo} />
        <Button
          title="Add New Todo"
          color="#841584"
          onPress={this.submitTodo}
        />
        <View style={styles.outerlist}>
          {allTodos && allTodos.length > 0 ?

            <FlatList
              data={allTodos}
              renderItem={({ item, index }) => (
                <View style={styles.list}>
                  <Text style={{ width: '8%' }}>{item.id}</Text>
                  <CheckBox style={{ marginTop: '-1%' }}
                    value={item.completed}
                    onChange={() => this.handleStatusChange(item)}
                  />
                  <Text style={item.completed == true ? styles.listCompletedItems : styles.listItems}>{item.title}</Text>
                  <TouchableOpacity
                    onPress={() => this.showUpdateModal(item)}><MaterialIcons name="edit" size={25} color='grey' /></TouchableOpacity>
                  <TouchableOpacity />
                  {item.status == 'Active' ? <TouchableOpacity
                    onPress={() => this.itemDelete(item)}
                  ><MaterialIcons name="delete" size={25} color='red' /></TouchableOpacity> : ""}
                </View>
              )}
              keyExtractor={item => item.title}
              ItemSeparatorComponent={this.renderSeparatorView}
            />

            : []}

        </View>
        <Modal
          animationType="slide"
          visible={this.state.showModal}
          onDismiss={this.hideModal}
        >
          <View>
            <TextInput id="2" style={styles.input}
              value={this.state.todoToUpdate.title}
              onChangeText={this.handleUpdateTodo}
            />

            <View style={{ flexDirection: "row" }}>
              <View style={{ marginLeft: '5%', marginRight: '10%' }}>
                <Button
                  title="Update Todo"
                  color="#841584"
                  onPress={this.updateTodo}
                />
              </View>
            </View>
          </View>
        </Modal>
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
  outerlist: {
    marginTop: 10,
    paddingLeft: 5
  },

  list: {
    flexDirection: "row",
    marginTop: 10,
    paddingLeft: 5
  },
  listCompletedItems: {
    width: 190,
    marginLeft: 5,
    textDecorationLine: "line-through"
  },
  listItems: {
    width: 190,
    marginLeft: 5
  }

});


AllTodo.propTypes = {

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
)(AllTodo);






