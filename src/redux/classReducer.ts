import { ClassData } from "../type/user";
import { ActionTypes } from "./actionTypes";

export interface ClassState {
  selectedClass: string | null;
  classData: ClassData | null;
  loading: boolean;
}

const initialState: ClassState = {
  selectedClass: null,
  classData: null,
  loading: false,
};

const classReducer = (state = initialState, action: any): ClassState => {
  switch (action.type) {
    case ActionTypes.SELECT_CLASS:
      return {
        ...state,
        selectedClass: action.payload,
        classData: null,
      };
    case ActionTypes.SET_CLASS_DATA:
      return {
        ...state,
        classData: action.payload,
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default classReducer;
