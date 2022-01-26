import { NgModule } from "@angular/core";

import { TableModule } from "./table.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./state/state";
import { EffectsModule } from '@ngrx/effects';
import { StudentsEffect } from './state/effects/student.effects';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    TableModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([StudentsEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
