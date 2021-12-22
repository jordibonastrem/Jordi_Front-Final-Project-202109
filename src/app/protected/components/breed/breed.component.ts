import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Breed } from "../../../shared/interfaces/breed.interface";

@Component({
  selector: "doggy-breed",
  templateUrl: "./breed.component.html",
  styleUrls: ["./breed.component.css"],
})
export class BreedComponent {
  @Input() breed!: Breed;

  constructor(public router: Router) {}

  onClick() {
    this.router.navigateByUrl("trdfrtgrthwhtrb");
  }
}
