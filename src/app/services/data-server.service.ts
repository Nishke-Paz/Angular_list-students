import { Injectable } from "@angular/core";
import { Student } from "../table/table.component";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { studentSelector } from "../state/selectors/student.selector";
import { addStudent } from "../state/actions/students.actions";

@Injectable({
  providedIn: "root"
})
export class DataServerService{

  constructor(
    private _httpClient: HttpClient,
    private store: Store) {

    this._httpClient.get("/api").subscribe((students: any) => {
      for (const item of students){
        this.store.dispatch(addStudent({
          student: {
            name: item.name,
            secondName: item.secondName,
            patronymic: item.patronymic,
            dateOfBirth: item.dateOfBirth,
            averageScore: item.averageScore,
            isNecessary: true,
            id: item.id
          }
        }));
      }
    });
  }
  getData(): Observable<Student[]>{
    return this.store.select(studentSelector);
  }
  sendData(data: Student): void{
    this._httpClient.post("/sendData", data).subscribe();
    this.store.dispatch(addStudent({
      student: data
    }));
  }
}
