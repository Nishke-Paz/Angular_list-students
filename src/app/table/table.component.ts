import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { DataClientService } from "../services/data-client.service";
import { DataServerService } from "../services/data-server.service";
import { ActivatedRoute } from "@angular/router";
import { DataServer } from "../services/dataServer";
import { HttpClient } from "@angular/common/http";

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
  providers: [ { provide: DataServer,
  useFactory: (activatedRoute: ActivatedRoute, httpClient: HttpClient): DataServer => {
    if (activatedRoute.snapshot.queryParams["server"] === "false"){
      return new DataClientService();
    }
    return new DataServerService(httpClient);
  }, deps: [ActivatedRoute, HttpClient] }]
})
export class TableComponent implements OnInit{
  private _students: Student[] = [];

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
  public resetStudent: boolean = false;

  constructor(private _dataServer: DataServer, private _routes: ActivatedRoute, private _dataClientService: DataClientService) {
  }

  ngOnInit(): void {
    if (this._routes.snapshot.queryParams["server"] === "false"){
      this._students = this._dataServer.getData();
    } else {
      this._routes.data.subscribe((data) => {
        this._dataServer.setData(Object.values(data["data"]));
        this._students = this._dataServer.getData();
      });
    }
  }

  get students(): Student[]{
    return this._students;
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

  changeList(data: Student[]): void{
    this._students = data;
  }

  number(str: string): number{
    return Number(str);
  }

  setStudentService(): void{
    this._dataClientService.setData(this._students);
  }

  isBadStudent(student: Student): boolean{
    return student.averageScore < this._minPositiveGrade;
  }

  deleteStudent(): void{
    if (this._studentForDelete){
      this._studentForDelete.isNecessary = false;
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
    const tempCompareName = this.compareName.bind(this._sortTypeByName);
    this.students.sort(tempCompareName);
    this._sortTypeByName *= -1;
  }

  compareName(a: Student, b: Student): number{
    if ( a.name < b.name ){
      return Number(this);
    }
    if ( a.name > b.name ){
      return -Number(this);
    }
    return 0;
  }

  sortSName(): void{
    const tempCompareSName = this.compareSName.bind(this._sortTypeBySName);
    this.students.sort(tempCompareSName);
    this._sortTypeBySName *= -1;
  }

  compareSName(a: Student, b: Student): number{
    if ( a.secondName < b.secondName ){
      return Number(this);
    }
    if ( a.secondName > b.secondName ){
      return -Number(this);
    }
    return 0;
  }

  sortPatronymic(): void{
    const tempComparePatronymic = this.comparePatronymic.bind(this._sortTypeByPatronymic);
    this.students.sort(tempComparePatronymic);
    this._sortTypeByPatronymic *= -1;
  }

  comparePatronymic(a: Student, b: Student): number{
    if ( a.patronymic < b.patronymic ){
      return Number(this);
    }
    if ( a.patronymic > b.patronymic ){
      return -Number(this);
    }
    return 0;
  }

  sortGrade(): void{
    const tempCompareGrade = this.compareGrade.bind(this._sortTypeByGrade);
    this.students.sort(tempCompareGrade);
    this._sortTypeByGrade *= -1;
  }

  compareGrade(a: Student, b: Student): number{
    if ( a.averageScore < b.averageScore ){
      return Number(this);
    }
    if ( a.averageScore > b.averageScore ){
      return -Number(this);
    }
    return 0;
  }

  sortDate(): void{
    const tempCompareGrade = this.compareDate.bind(this._sortTypeByDate);
    this.students.sort(tempCompareGrade);
    this._sortTypeByDate *= -1;
  }

  compareDate(a: Student, b: Student): number{
    if ( a.dateOfBirth.split(".").reverse().join(".") < b.dateOfBirth.split(".").reverse().join(".") ){
      return Number(this);
    }
    if ( a.dateOfBirth.split(".").reverse().join(".") > b.dateOfBirth.split(".").reverse().join(".") ){
      return -Number(this);
    }
    return 0;
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
