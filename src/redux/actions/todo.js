import { Types } from "../constants/todo-types";
import API from "../api/todo-api";
//import UserService from "../../service/user-service";



export function addUpdateTodo(row) {
    return async function (dispatch, getState) {
     dispatch({ type: Types.ADD_TODO, payload: row});
    }
  }

export function deleteTodo(row) {
    return async function (dispatch, getState) {
     dispatch({ type: Types.DELETE_TODO, payload: row});
    }
  }  


  export function showUpdateModal(row) {
    return async function (dispatch, getState) {
     dispatch({ type: Types.SHOW_MODAL, payload: true});
     dispatch({ type: Types.TODO_TO_UPDATE, payload: row});
    }
  }   


  export function hideUpdateModal(row) {
    console.log('IN HIDE ACTION')
    return async function (dispatch, getState) {
     dispatch({ type: Types.HIDE_MODAL, payload: false});
    }
  }  
