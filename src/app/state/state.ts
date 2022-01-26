import { initialStudentState, StudentsState } from "./students.state";
import { ActionReducerMap } from "@ngrx/store";
import { studentReducer } from "./reducers/student.reducer";

export interface State {
  listStudents: StudentsState;
}

export const reducers: ActionReducerMap<State> = {
  listStudents: studentReducer
};

export const initialState = {
  listStudents: initialStudentState
};
