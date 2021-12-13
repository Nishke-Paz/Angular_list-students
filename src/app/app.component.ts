import { Component } from "@angular/core";
import * as listStudents from "./studets.json";

interface Student {
  name: string;
  secondName: string;
  patronymic: string;
  dateOfBirth: string;
  averageScore: number;
  isNecessary: boolean;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
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

  get students(): [...object: Student[]]{
    return this._students;
  }

  get studentForDelete(): Student | null{
    return this._studentForDelete;
  }

  set studentForDelete(data: Student | null){
    this._studentForDelete = data;
  }

  setSearchName(name: string): void{
    this._searchName = name;
  }

  isBadStudent(student: Student): boolean{
    if (Number(student.averageScore) < this._minPositiveGrade){
      return true;
    }
    return false;
  }

  deleteStudent(): void{
    if (this._studentForDelete){
      this._studentForDelete.isNecessary = false;
    }
    this.hidePopUp = true;
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

  setDatesForFiltr(minDate: string, maxDate: string): void{
    if (minDate){
      this._minDateForFiltr = minDate;
    }
    if (maxDate){
      this._maxDateForFiltr = maxDate;
    }
  }

  dateIsInRange(date: string): boolean{
    if ( date.split(".").reverse().join("-") > this._maxDateForFiltr ){
      return false;
    }
    if ( date.split(".").reverse().join("-") < this._minDateForFiltr ){
      return false;
    }
    // const tempDate = date.split(".").reverse().map(Number);
    // const tempMinDate = this._minDateForFiltr.split("-").map(Number);
    // const tempMaxDate = this._maxDateForFiltr.split("-").map(Number);
    // if ((tempDate[0] > tempMinDate[0]) && (tempDate[0] < tempMaxDate[0])){
    //   return true;
    // } if (tempDate[0] === tempMinDate[0]){
    //   if (tempDate[1] > tempMinDate[1]){
    //     return true;
    //   } if ((tempDate[1] === tempMinDate[1]) && (tempDate[2] >= tempMinDate[2])){
    //     return true;
    //   }
    // } else if (tempDate[0] === tempMaxDate[0]){
    //   if (tempDate[1] < tempMaxDate[1]){
    //     return true;
    //   } if ((tempDate[1] === tempMaxDate[1]) && (tempDate[2] <= tempMaxDate[2])){
    //     return true;
    //   }
    // }
    return true;
  }

  setGradesForFiltr(min: string, max: string): void{
    this._maxGradeForFiltr = Number(max);
    this._minGradeForFiltr = Number(min);
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
