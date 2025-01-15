import {
  SET_CLASS_DATA,
  SET_LOADING,
  SET_STUDENT_DATA,
  SELECT_CLASS,
  selectClass,
} from "./classActions";
import { ClassData, StudentClassData } from "../type/user";

export interface ClassState {
  selectedClass: string | null;
  classData: ClassData | null;
  studentData: StudentClassData[];
  loading: boolean;
}

const initialState: ClassState = {
  selectedClass: null,
  classData: null,
  studentData: [],
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
    case SET_STUDENT_DATA:
      return {
        ...state,
        studentData: action.payload,
      };
    default:
      return state;
  }
};

export default classReducer;
