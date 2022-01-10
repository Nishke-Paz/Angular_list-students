import { NgModule } from "@angular/core";

import { TableModule } from "./table.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule, TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
