import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { GoogleMapsModule } from "@angular/google-maps";
import { ProtectedRoutingModule } from "./protected-routing.module";
import { BreedListComponent } from "./pages/breeds/breed-list/breed-list.component";
import { MapComponent } from "./pages/map/map.component";
import { ScannerComponent } from "./pages/scanner/scanner.component";
import { QuizComponent } from "./pages/quiz/quiz.component";
import { BreedComponent } from "./components/breed/breed.component";
import { MainComponent } from "./pages/main/main.component";
import { FiltersBarComponent } from "./components/filters-bar/filters-bar.component";
import { ProtectedHeaderComponent } from "./components/protected-header/protected-header.component";
import { ProtectedFooterComponent } from "./components/protected-footer/protected-footer.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";

@NgModule({
  declarations: [
    BreedListComponent,
    MapComponent,
    ScannerComponent,
    QuizComponent,
    BreedComponent,
    MainComponent,
    FiltersBarComponent,
    ProtectedHeaderComponent,
    ProtectedFooterComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    GoogleMapsModule,
  ],

  exports: [ProtectedHeaderComponent, ProtectedFooterComponent],
})
export class ProtectedModule {}
