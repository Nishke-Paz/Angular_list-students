import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { sendStudent } from "../actions/students.actions";
import { map } from "rxjs";
import { DataServerService } from "../../services/data-server.service";


@Injectable()
export class StudentsEffect {
  constructor(
    private store: Store,
    private actions$: Actions,
    private dataServerService: DataServerService) {
  }

  @Effect()
  sendStudent$ = this.actions$.pipe(
    ofType(sendStudent),
    map((data: any) => {
      this.dataServerService.sendData(data.student);
    }),
  );

}
