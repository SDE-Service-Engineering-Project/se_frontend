import {NgModule} from "@angular/core";
import {RegisterRoutingModule} from "./config/register.routing";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./register.component";

@NgModule({
  imports: [RegisterRoutingModule, CommonModule, ReactiveFormsModule],
  declarations: [RegisterComponent]
})
export class RegisterModule {

}
