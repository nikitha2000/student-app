import { SET_CLASS_DATA, SET_LOADING, SELECT_CLASS } from "./classActions";
import { ClassData } from "../type/user";

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
    case SELECT_CLASS:
      return {
        ...state,
        selectedClass: action.payload,
        classData: null,
      };
    case SET_CLASS_DATA:
      return {
        ...state,
        classData: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default classReducer;
