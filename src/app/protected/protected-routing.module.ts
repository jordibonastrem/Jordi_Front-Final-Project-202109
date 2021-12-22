import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./pages/main/main.component";
import { MapComponent } from "./pages/map/map.component";
import { QuizComponent } from "./pages/quiz/quiz.component";
import { ScannerComponent } from "./pages/scanner/scanner.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      // { path: "breeds", component: BreedListComponent },
      {
        path: "breeds",
        loadChildren: () =>
          import("./pages/breeds/breeds.module").then((m) => m.BreedsModule),
      },
      { path: "map", component: MapComponent },
      { path: "scanner", component: ScannerComponent },
      { path: "quiz", component: QuizComponent },
      { path: "**", redirectTo: "breeds" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
