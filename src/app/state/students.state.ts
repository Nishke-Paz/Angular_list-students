import {Student} from "../table/table.component";


export interface StudentsState {
  students: Student[];
}

export const initialStudentState: StudentsState = {
  students: []
};
