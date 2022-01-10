import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { FormComponent } from "./form/form.component";
import { TableComponent } from "./table/table.component";
import { DatePipe } from "./pipes/date.pipe";
import { GradePipe } from "./pipes/grade.pipe";
import { NamePipe } from "./pipes/name.pipe";
import { ResetDirective } from "./directives/reset.directive";
import { EditingDirective } from "./directives/editing.directive";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { NotFoundComponent } from "./not-found/not-found.component";
import { PopupComponent } from "./popup/popup.component";


@NgModule({
  declarations: [
    DatePipe,
    EditingDirective,
    FormComponent,
    GradePipe,
    NamePipe,
    NotFoundComponent,
    PopupComponent,
    ResetDirective,
    TableComponent,
  ],
  imports: [
    AppRoutingModule, BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule,
  ],
  providers: [],
  exports: [TableComponent]
})
export class TableModule { }
