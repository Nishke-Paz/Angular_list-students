import { createReducer, on } from "@ngrx/store";
import { initialStudentState } from "../students.state";
import {
  addStudent, editStudent, removeStudent, sortByDateStudent, sortByGradeStudent,
  sortByNameStudent,
  sortByPatronymicStudent,
  sortBySecondNameStudent,
} from "../actions/students.actions";
import { Student } from "../../table/table.component";


export const studentReducer = createReducer(
  initialStudentState,
  on(addStudent, (state, action) => ({
    ...state,
    students: [...state.students, action.student]
  })),
  on(removeStudent, (state, action) => ({
    ...state,
    students: [...state.students].filter( (item) => {
      return item.id !== action.id;
    })
  })),
  on(editStudent, (state, action) => ({
    ...state,
    students: [...state.students].map( (item) => {
      if (item.id === action.student.id){
        return action.student;
      }
      return item;
    })
  })),
  on(sortByNameStudent, (state, action) => ({
    ...state,
    students: [...state.students].sort( (a: Student, b: Student): number => {
      if ( a.name < b.name ){
        return action.typeSort;
      }
      if (a.name > b.name) {
        return -action.typeSort;
      }
      return 0;
    })
  })),
  on(sortBySecondNameStudent, (state, action) => ({
    ...state,
    students: [...state.students].sort((a: Student, b: Student) => {
      if ( a.secondName < b.secondName ){
        return action.typeSort;
      }
      if (a.secondName > b.secondName) {
        return -action.typeSort;
      }
      return 0;
    })
  })),
  on(sortByPatronymicStudent, (state, action) => ({
    ...state,
    students: [...state.students].sort((a: Student, b: Student) => {
      if ( a.patronymic < b.patronymic ){
        return action.typeSort;
      }
      if (a.patronymic > b.patronymic) {
        return -action.typeSort;
      }
      return 0;
    })
  })),
  on(sortByGradeStudent, (state, action) => ({
    ...state,
    students: [...state.students].sort((a: Student, b: Student) => {
      if ( a.averageScore < b.averageScore ){
        return action.typeSort;
      }
      if (a.averageScore > b.averageScore) {
        return -action.typeSort;
      }
      return 0;
    })
  })),
  on(sortByDateStudent, (state, action) => ({
    ...state,
    students: [...state.students].sort((a: Student, b: Student) => {
      if ( a.dateOfBirth.split(".").reverse().join(".") < b.dateOfBirth.split(".").reverse().join(".") ){
        return action.typeSort;
      }
      if ( a.dateOfBirth.split(".").reverse().join(".") > b.dateOfBirth.split(".").reverse().join(".") ) {
        return -action.typeSort;
      }
      return 0;
    })
  })),
);
