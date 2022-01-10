import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { Student } from "../table/table.component";
import { DataServer } from "../services/dataServer";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent{

  students: Student[] = [];
  studentForEditing: Student | null = null;

  editing: boolean = false;
  addition = false;

  showErrorEnterName = false;
  showErrorEnterSecondName = false;
  showErrorEnterPatronymic = false;
  showErrorScore = false;
  showErrorDate = false;
  showErrorMaxDate = false;
  showErrorNameMatches = false;
  showSuccessfulAddition = false;

  title: string = "";

  constructor(private _changeDetectorRef: ChangeDetectorRef, private _dataServer: DataServer, activeRoute: ActivatedRoute){
    this.students = this._dataServer.getData();
    if (activeRoute.snapshot.url[0].path === "edit"){
      this.title = "Редактировать";
      this.students.forEach((item) => {
        if (item.id === Number(activeRoute.snapshot.queryParams["id"])){
          this.studentForEditing = item;
          this.formModel.controls["person"].setValue({ name: this.studentForEditing.name,
            secondName:this.studentForEditing.secondName,
            patronymic: this.studentForEditing.patronymic });
          this.formModel.controls["dateOfBirth"].setValue(this.studentForEditing.dateOfBirth.split(".").reverse().join("-"));
          this.formModel.controls["averageScore"].setValue(this.studentForEditing.averageScore);
          this.editing = true;
        }
      });
    } else {
      this.title = "Добавить";
      this.addition = true;
    }
  }

  formModel = new FormGroup({
    person: new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(/^[а-яА-ЯёЁ]+$/)]),
      secondName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(/^[а-яА-ЯёЁ]+$/)]),
      patronymic: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(/^[а-яА-ЯёЁ]+$/)])
    }, [this._nameValidator()]),
    averageScore : new FormControl(null, [Validators.required, Validators.min(0), Validators.max(5)]),
    dateOfBirth: new FormControl(null, [Validators.required, this._dateValidator()])
  });

  private _nameIsComplete(str: string): boolean{
    const formPerson: FormGroup = <FormGroup> this.formModel.controls["person"];
    const inputName = formPerson.controls[str];
    if (inputName.errors && (inputName.errors["required"] || inputName.errors["minlength"] || inputName.errors["pattern"])){
      return false;
    }
    return true;
  }

  private _dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const date = new Date();
      const maxDateOfBirth = date.toJSON().slice(0, 10).split("-");
      maxDateOfBirth[0] = String(Number(maxDateOfBirth[0]) - 10);
      if (maxDateOfBirth.join("-") < control.value){
        return { maxDate: true };
      }
      return null;
    };
  }

  private _nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if ((control.value.name !== null) && ((control.value.name === control.value.secondName) ||
      (control.value.name === control.value.patronymic))){
        return { nameMatches: true };
      }
      return null;
    };
  }

  resetForm(): void{
    this.formModel.controls["person"].setValue({ name: "", secondName: "", patronymic: "" });
    this.formModel.controls["dateOfBirth"].setValue("");
    this.formModel.controls["averageScore"].setValue("");
  }

  _onSubmit(): void {
    if (this.formModel.valid){
      const formValue: FormGroup = <FormGroup> this.formModel.controls["person"];
      if (this.editing && this.studentForEditing){
        this.studentForEditing.name = formValue.controls["name"].value;
        this.studentForEditing.secondName = formValue.controls["secondName"].value;
        this.studentForEditing.patronymic = formValue.controls["patronymic"].value;
        this.studentForEditing.averageScore = this.formModel.controls["averageScore"].value;
        this.studentForEditing.dateOfBirth = this.formModel.controls["dateOfBirth"].value.split("-").reverse().join(".");
      } else {
        this.students?.push({
          name: formValue.controls["name"].value,
          secondName: formValue.controls["secondName"].value,
          patronymic: formValue.controls["patronymic"].value,
          id: this.students[this.students.length - 1].id + 1,
          averageScore: this.formModel.controls["averageScore"].value,
          dateOfBirth: this.formModel.controls["dateOfBirth"].value.split("-").reverse().join("."),
          isNecessary: true
        });
        this.resetForm();
      }
      this._dataServer.setData(this.students);
      this.showSuccessfulAddition = true;
      setTimeout(() => {
        this.showSuccessfulAddition = false;
        this._changeDetectorRef.markForCheck();
      }, 1500);
    } else {
      this._nameIsComplete("secondName") ? this.showErrorEnterSecondName = false : this.showErrorEnterSecondName = true;
      this._nameIsComplete("name") ? this.showErrorEnterName = false : this.showErrorEnterName = true;
      this._nameIsComplete("patronymic") ? this.showErrorEnterPatronymic = false : this.showErrorEnterPatronymic = true;
      if (this.formModel.controls["averageScore"].errors && (this.formModel.controls["averageScore"].errors["required"] ||
          this.formModel.controls["averageScore"].errors["max"] ||
          this.formModel.controls["averageScore"].errors["min"])){
        this.showErrorScore = true;
      } else {
        this.showErrorScore = false;
      }
      (this.formModel.controls["dateOfBirth"].errors) ?
      (this.formModel.controls["dateOfBirth"].errors["required"]) ?
      this.showErrorDate = true : this.showErrorDate = false : this.showErrorDate = false;

      this.formModel.controls["dateOfBirth"].errors ?
      this.formModel.controls["dateOfBirth"].errors["maxDate"] ?
       this.showErrorMaxDate = true : this.showErrorMaxDate = false : this.showErrorMaxDate = false;

      this.formModel.controls["person"].errors ?
      this.formModel.controls["person"].errors["nameMatches"] ?
      this.showErrorNameMatches = true : this.showErrorNameMatches = false : this.showErrorNameMatches = false;

    }
  }
}
