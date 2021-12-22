/* eslint-disable no-return-assign */
import { Component, OnInit, HostListener, Inject } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";
import { Breed } from "src/app/shared/interfaces/breed.interface";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { DOCUMENT } from "@angular/common";

import { BreedService } from "../../../services/breed.service";

@Component({
  selector: "doggy-breed-list",
  templateUrl: "./breed-list.component.html",
  styleUrls: ["./breed-list.component.css"],
})
export class BreedListComponent implements OnInit {
  listArray: string[] = [];

  sum = 20;

  showSpinner = false;

  faArrowUp = faArrowUp;

  showButton = false;

  breeds: Breed[] = [];

  loadedBreeds: Breed[] = [];

  private scrollHeight = 500;

  private start = 0;

  private end = 5;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private breedService: BreedService,
    private authService: AuthService
  ) {}

  @HostListener("window:scroll")
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    const { scrollTop } = this.document.documentElement;
    this.showButton = (yOffSet || scrollTop) > this.scrollHeight;
  }

  get user() {
    return this.authService.user.username;
  }

  ngOnInit(): void {
    this.breedService.getBreeds().subscribe((breeds) => {
      this.breeds = breeds as Breed[];
      this.loadedBreeds = this.breeds.slice(this.start, this.end);
    });
  }

  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

  // eslint-disable-next-line class-methods-use-this
  onScrollDown(): void {
    this.start = this.end;
    this.end *= 2;
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      this.loadedBreeds.push(...this.breeds.slice(this.start, this.end));
    }, 1000);
  }
}
