import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ReactiveFormsModule } from "@angular/forms";
import { BreedsRoutingModule } from "./breeds-routing.module";
import { BreedsDetailsComponent } from "./breeds-details/breeds-details.component";
import { BreedsCreateComponent } from "./breeds-create/breeds-create.component";
import { MainComponent } from "./main/main.component";

@NgModule({
  declarations: [BreedsDetailsComponent, BreedsCreateComponent, MainComponent],
  imports: [
    CommonModule,
    BreedsRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
})
export class BreedsModule {}
