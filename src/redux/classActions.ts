import { ThunkAction } from "redux-thunk";
import { Action, Dispatch } from "redux";

import { ClassData } from "../type/user";
import { fetchClassData } from "../api";
import { RootState } from "./store";
import { ActionTypes } from "./actionTypes";

export const selectClass = (className: string) => ({
  type: ActionTypes.SELECT_CLASS,
  payload: className,
});

export const setClassData = (data: ClassData | null) => ({
  type: ActionTypes.SET_CLASS_DATA,
  payload: data,
});

export const setLoading = (loading: boolean) => ({
  type: ActionTypes.SET_LOADING,
  payload: loading,
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
