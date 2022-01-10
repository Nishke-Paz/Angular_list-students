import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { DataServerService } from "./services/data-server.service";

@Injectable({
  providedIn: "root"
})
export class DataResolver implements Resolve<unknown> {
  constructor(private dataServerService: DataServerService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> | boolean {
    if (route.queryParams["server"] === "false"){
      return true;
    }
    return this.dataServerService.loadData();
  }
}
