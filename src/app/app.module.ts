import { NgModule } from "@angular/core";
import { TableModule } from "./table.module";

import { AppComponent } from "./app.component";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
