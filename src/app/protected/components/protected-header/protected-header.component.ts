import { Component } from "@angular/core";
import { faBars } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "doggy-protected-header",
  templateUrl: "./protected-header.component.html",
  styleUrls: ["./protected-header.component.css"],
})
export class ProtectedHeaderComponent {
  faBars = faBars;

  status: boolean = false;

  onClick() {
    this.status = !this.status;
  }

  // eslint-disable-next-line class-methods-use-this
  logout() {
    localStorage.clear();
  }
}
