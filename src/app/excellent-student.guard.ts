import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Student } from "./table/table.component";
import { DataClientService } from "./services/data-client.service";

@Injectable({
  providedIn: "root"
})
export class ExcellentStudentGuard implements CanActivate {
  private students: Student[] = [];
  private isExcellent: boolean = false;
  constructor(private dataClientService: DataClientService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.students = this.dataClientService.getData();
    this.isExcellent = false;
    this.students.forEach((item) => {
      if (item.id === Number(route.queryParams["id"])){
        if (item.averageScore === 5){
          this.isExcellent = true;
          alert("Запись защищена");
        }
      }
    });
    return !this.isExcellent;
  }
}
