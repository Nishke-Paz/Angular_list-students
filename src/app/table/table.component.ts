import { Component, ChangeDetectionStrategy } from "@angular/core";
import * as listStudents from "../studets.json";

export interface Student {
  name: string;
  secondName: string;
  patronymic: string;
  dateOfBirth: string;
  averageScore: number;
  isNecessary: boolean;
}

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  private _students: [...object: Student[]] = Object.values(listStudents).slice(0, Object.values(listStudents).length - 1);
  private _searchName: string = "";
  private _minPositiveGrade: number = 3;
  private _minGradeForFiltr: number = 0;
  private _maxGradeForFiltr: number = 5;
  private _minDateForFiltr: string = "0-0-0";
  private _maxDateForFiltr: string = "3000-0-0";
  private _studentForDelete: Student | null = null;
  private _sortTypeByName: number = -1;
  private _sortTypeBySName: number = -1;
  private _sortTypeByGrade: number = -1;
  private _sortTypeByPatronymic: number = -1;
  private _sortTypeByDate: number = -1;
  public highlightBadStudents: boolean = true;
  public hidePopUp: boolean = true;
  public resetStudent: boolean = false;

  public studentForChange: Student = {
    name: "",
    secondName:  "",
    patronymic:  "",
    averageScore: 0,
    dateOfBirth: "",
    isNecessary: true
  };

  numberStudent = 0;

  get students(): [...object: Student[]]{
    return this._students;
  }

  set searchName(name: string){
    this._searchName = name;
  }

  set studentForDelete(data: Student | null){
    this._studentForDelete = data;
  }

  set minGradeForFiltr(num: number){
    this._minGradeForFiltr = num;
  }

  set maxGradeForFiltr(num: number){
    this._maxGradeForFiltr = num;
  }

  set minDateForFiltr(date: string){
    this._minDateForFiltr = date;
  }

  set maxDateForFiltr(date: string){
    this._maxDateForFiltr = date;
  }

  changeList(data: Student[]): void{
    this._students = data;
  }

  number(str: string): number{
    return Number(str);
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
    console.log(this);
    this._searchName = "";
    this.minGradeForFiltr = 0;
    this._maxGradeForFiltr = 5;
    this._minDateForFiltr = "0-0-0";
    this._maxDateForFiltr = "3000-0-0";
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
    if ( date.split(".").reverse().join("-") > this._maxDateForFiltr ){
      return false;
    }
    if ( date.split(".").reverse().join("-") < this._minDateForFiltr ){
      return false;
    }
    return true;
  }

  gradeIsInRange(grade: number): boolean{
    if ((grade >= this._minGradeForFiltr) && (grade <= this._maxGradeForFiltr)){
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
