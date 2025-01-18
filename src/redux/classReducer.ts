import { ClassData } from "../type/user";
import { ActionTypes } from "./actionTypes";

type Action =
  | { type: ActionTypes.SELECT_CLASS; payload: string }
  | { type: ActionTypes.SET_CLASS_DATA; payload: ClassData | null }
  | { type: ActionTypes.SET_LOADING; payload: boolean };

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

const classReducer = (state = initialState, action: Action): ClassState => {
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
