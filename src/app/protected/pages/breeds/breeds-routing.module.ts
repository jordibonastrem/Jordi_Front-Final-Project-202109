import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BreedListComponent } from "./breed-list/breed-list.component";
import { BreedsCreateComponent } from "./breeds-create/breeds-create.component";
import { BreedsDetailsComponent } from "./breeds-details/breeds-details.component";
import { MainComponent } from "./main/main.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      { path: "list", component: BreedListComponent },
      { path: "details/:id", component: BreedsDetailsComponent },
      { path: "create", component: BreedsCreateComponent },
      { path: "**", redirectTo: "list" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BreedsRoutingModule {}
