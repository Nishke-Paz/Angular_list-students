import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "../not-found/not-found.component";
import { TableComponent } from "../table/table.component";
import { FormComponent } from "../form/form.component";
import { ExcellentStudentGuard } from "../excellent-student.guard";
import { DataResolver } from "../data.resolver";


const routes: Routes = [
  { path: "", component: TableComponent, resolve: { data: DataResolver }, children:[
      { path: "add", component: FormComponent },
      { path: "edit", component: FormComponent, canActivate: [ExcellentStudentGuard] },
    ] },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

