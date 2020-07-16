import { Types } from "../constants/todo-types";
const initialState = {
  //alltodos:[],
  showModal:false,
  todoToUpdate:{}
};
export default function companyTypeReducer(state = initialState, action) {
  switch (action.type) {
    case Types.ADD_TODO:
      return { ...state, alltodos: action.payload };
    case Types.DELETE_TODO:
        return { ...state, alltodos: action.payload };
    case Types.SHOW_MODAL:
          return { ...state,showModal: action.payload }; 
    case Types.HIDE_MODAL:
            return { ...state,showModal: action.payload };        
    case Types.TODO_TO_UPDATE:
            return { ...state,todoToUpdate: action.payload };        
    default:
      return state;
  }
}
