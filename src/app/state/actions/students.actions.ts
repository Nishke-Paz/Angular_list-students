import {createAction, props} from "@ngrx/store";
import {Student} from "../../table/table.component";


export const addStudent = createAction(
  "[ListStudent] addStudent",
  props<{ student: Student }>(),
);

export const sendStudent = createAction(
  "[ListStudent] sendStudent",
  props<{ student: Student }>(),
);

export const removeStudent = createAction(
  "[ListStudent] removeStudentAction",
  props<{ id: number }>(),
);

export const editStudent = createAction(
  "[ListStudent] editStudent",
  props<{ student: Student }>(),
);

export const sortByNameStudent = createAction(
  "[ListStudent] sortByNameStudent",
  props<{ typeSort: number }>(),
);

export const sortBySecondNameStudent = createAction(
  "[ListStudent] sortBySecondNameStudent",
  props<{ typeSort: number }>(),
);

export const sortByPatronymicStudent = createAction(
  "[ListStudent] sortByPatronymicStudent",
  props<{ typeSort: number }>(),
);

export const sortByGradeStudent = createAction(
  "[ListStudent] sortByGradeStudent",
  props<{ typeSort: number }>(),
);

export const sortByDateStudent = createAction(
  "[ListStudent] sortByDateStudent",
  props<{ typeSort: number }>(),
);

