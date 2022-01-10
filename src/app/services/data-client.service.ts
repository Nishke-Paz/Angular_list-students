import { Injectable } from "@angular/core";
import * as listStudents from "../studets.json";
import { Student } from "../table/table.component";
import { DataServer } from "./dataServer";

@Injectable({
  providedIn: "root"
})
export class DataClientService implements DataServer{
  private _students: Student[] = Object.values(listStudents).slice(0, Object.values(listStudents).length - 1);
  getData(): Student[] {
    return this._students;
  }
  setData(data: Student[]): void{
    this._students = data;
  }
}
