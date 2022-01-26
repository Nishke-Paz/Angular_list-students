import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { DataServerService } from "../services/data-server.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import {
  removeStudent,
  sortByDateStudent,
  sortByGradeStudent,
  sortByNameStudent,
  sortByPatronymicStudent,
  sortBySecondNameStudent,
} from "../state/actions/students.actions";

export interface Student {
  name: string;
  secondName: string;
  patronymic: string;
  dateOfBirth: string;
  averageScore: number;
  isNecessary: boolean;
  id: number;
}

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit{

  public _students$?: Observable<Student[]>;

  private _searchName: string = "";
  private _minPositiveGrade: number = 3;
  private _minGradeForFilter: number = 0;
  private _maxGradeForFilter: number = 5;
  private _minDateForFilter: string = "0-0-0";
  private _maxDateForFilter: string = "3000-0-0";
  private _studentForDelete: Student | null = null;
  private _sortTypeByName: number = -1;
  private _sortTypeBySName: number = -1;
  private _sortTypeByGrade: number = -1;
  private _sortTypeByPatronymic: number = -1;
  private _sortTypeByDate: number = -1;
  public highlightBadStudents: boolean = true;
  public hidePopUp: boolean = true;

  constructor(private _routes: ActivatedRoute,
              private _dataServerService: DataServerService,
              private _store: Store) {
  }

  ngOnInit(): void {
    this._students$ = this._dataServerService.getData();
  }

  set searchName(name: string){
    this._searchName = name;
  }

  set studentForDelete(data: Student | null){
    this._studentForDelete = data;
  }

  set minGradeForFilter(num: number){
    this._minGradeForFilter = num;
  }

  set maxGradeForFilter(num: number){
    this._maxGradeForFilter = num;
  }

  set minDateForFilter(date: string){
    this._minDateForFilter = date;
  }

  set maxDateForFilter(date: string){
    this._maxDateForFilter = date;
  }

  number(str: string): number{
    return Number(str);
  }

  isBadStudent(student: Student): boolean{
    return student.averageScore < this._minPositiveGrade;
  }

  deleteStudent(): void{
    if (this._studentForDelete !== null){
      this._store.dispatch(removeStudent({
        id: this._studentForDelete.id
      }));
    }
    this.hidePopUp = true;
  }

  resetFilters(): void{
    this._searchName = "";
    this.minGradeForFilter = 0;
    this._maxGradeForFilter = 5;
    this._minDateForFilter = "0-0-0";
    this._maxDateForFilter = "3000-0-0";
  }

  sortName(): void{
    this._store.dispatch(sortByNameStudent({
      typeSort: this._sortTypeByName
    }));
    this._sortTypeByName *= -1;
  }

  sortSName(): void{
    this._store.dispatch(sortBySecondNameStudent({
      typeSort: this._sortTypeBySName
    }));
    this._sortTypeBySName *= -1;
  }

  sortPatronymic(): void{
    this._store.dispatch(sortByPatronymicStudent({
      typeSort: this._sortTypeByPatronymic
    }));
    this._sortTypeByPatronymic *= -1;
  }

  sortGrade(): void{
    this._store.dispatch(sortByGradeStudent({
      typeSort: this._sortTypeByGrade
    }));
    this._sortTypeByGrade *= -1;
  }

  sortDate(): void{
    this._store.dispatch(sortByDateStudent({
      typeSort: this._sortTypeByDate
    }));
    this._sortTypeByDate *= -1;
  }

  dateIsInRange(date: string): boolean{
    if ( date.split(".").reverse().join("-") > this._maxDateForFilter ){
      return false;
    }
    if ( date.split(".").reverse().join("-") < this._minDateForFilter ){
      return false;
    }
    return true;
  }

  gradeIsInRange(grade: number): boolean{
    if ((grade >= this._minGradeForFilter) && (grade <= this._maxGradeForFilter)){
      return true;
    }
    return false;
  }

  comparisonOfNames(student: Student): boolean{
    const tempName = this._searchName.replace(/\s+/g, " ").trim().split(" ");
    for (const partName of tempName){
      if ((partName.toLowerCase() === student.name.toLowerCase()) ||
        (partName.toLowerCase() === student.secondName.toLowerCase()) ||
        (partName.toLowerCase() === student.patronymic.toLowerCase())){
          continue;
        }
      return false;
    }
    return true;
  }
}
