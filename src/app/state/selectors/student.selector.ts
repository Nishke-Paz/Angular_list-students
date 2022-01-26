import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StudentsState } from "../students.state";

export const featureSelector = createFeatureSelector<StudentsState>("listStudents");

export const studentSelector = createSelector(
  featureSelector, (state) => state.students,
);
