import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { studentSelector } from "./state/selectors/student.selector";
import { map, Observable } from "rxjs";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root"
})
export class ExcellentStudentGuard implements CanActivate {
  constructor(private _store: Store) {
  }
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._store.select(studentSelector).pipe(
      map((data) => {
        for (const item of data){
          if ((item.id === Number(route.queryParams["id"])) && (item.averageScore === 5)){
            alert("Запись защищена");
            return false;
          }
        }
        return true;
      }),
    );
  }
}
