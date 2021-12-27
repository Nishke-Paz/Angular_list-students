import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FormComponent } from "./form/form.component";

import { TableComponent } from "./table/table.component";
import { DatePipe } from "./pipes/date.pipe";
import { GradePipe } from "./pipes/grade.pipe";
import { NamePipe } from "./pipes/name.pipe";
import { ResetDirective } from "./directives/reset.directive";
import { EditingDirective } from "./directives/editing.directive";

@NgModule({
  declarations: [
    DatePipe,
    EditingDirective,
    FormComponent,
    GradePipe,
    NamePipe,
    ResetDirective,
    TableComponent,
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
  ],
  providers: [],
  exports: [TableComponent]
})
export class TableModule { }
