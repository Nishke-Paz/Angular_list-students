import { Injectable } from "@angular/core";
import { Student } from "../table/table.component";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DataServer } from "./dataServer";

@Injectable({
  providedIn: "root"
})
export class DataServerService implements DataServer{

  private _students: Student[] = [];

  constructor(private _httpClient: HttpClient) {
  }

  loadData(): Observable<unknown>{
    return this._httpClient.get("/api");
  }
  setData(data: Student[]): void{
    this._students = data;
  }
  getData(): Student[]{
    return this._students;
  }
}
