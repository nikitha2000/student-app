import { ThunkAction } from "redux-thunk";
import { Action, Dispatch } from "redux";
import { RootState } from "./store";
import { fetchClassData, fetchStudentData } from "../api";
import { ClassData, StudentClassData } from "../type/user";

export const SET_CLASS_DATA = "SET_CLASS_DATA";
export const SET_LOADING = "SET_LOADING";
export const SET_STUDENT_DATA = "SET_STUDENT_DATA";
export const SELECT_CLASS = "SELECT_CLASS";

export const selectClass = (className: string) => ({
  type: SELECT_CLASS,
  payload: className,
});

export const setClassData = (data: ClassData | null) => ({
  type: SET_CLASS_DATA,
  payload: data,
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setStudentData = (data: StudentClassData[] | []) => ({
  type: SET_STUDENT_DATA,
  payload: data,
});

export const fetchClassDataAction =
  (
    selectedClass: string
  ): ThunkAction<Promise<void>, RootState, unknown, Action<string>> =>
  async (dispatch: Dispatch) => {
    dispatch(setLoading(true));

    const data = await fetchClassData(selectedClass);

    if (data) {
      dispatch(setClassData(data));
    } else {
      dispatch(setClassData(null));
    }

    dispatch(setLoading(false));
  };

export const fetchStudentDataAction =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Dispatch) => {
    dispatch(setLoading(true));

    const data = await fetchStudentData();

    if (data) {
      dispatch(setStudentData(data));
    } else {
      dispatch(setStudentData([]));
    }

    dispatch(setLoading(false));
  };
