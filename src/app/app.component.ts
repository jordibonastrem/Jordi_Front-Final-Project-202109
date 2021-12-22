import { Component } from "@angular/core";

import { faCoffee } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "doggy-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "doggy";

  faCoffee = faCoffee;
}
