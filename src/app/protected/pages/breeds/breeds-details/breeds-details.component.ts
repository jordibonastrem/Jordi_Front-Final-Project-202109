import { Component, Renderer2 } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FormBuilder } from "@angular/forms";

import { BreedService } from "src/app/protected/services/breed.service";
import { Breed } from "src/app/shared/interfaces/breed.interface";
import Swal from "sweetalert2";

@Component({
  selector: "doggy-breeds-details",
  templateUrl: "./breeds-details.component.html",
  styleUrls: ["./breeds-details.component.css"],
})
export class BreedsDetailsComponent {
  adaptabilityStars = [false, false, false, false, false];

  adaptabilityStarsTotal = 0;

  friendLinessStars = [false, false, false, false, false];

  friendLinessStarsTotal = 0;

  healthNeedsStars = [false, false, false, false, false];

  healthNeedsStarsTotal = 0;

  trainabilityStars = [false, false, false, false, false];

  trainabilityStarsTotal = 0;

  physicalNeedsStars = [false, false, false, false, false];

  physicalNeedsStarsTotal = 0;

  vocalityStars = [false, false, false, false, false];

  vocalityStarsTotal = 0;

  idBreed: any;

  updateMode = false;

  toggleStar = false;

  faStar = faStar;

  // myForm: FormGroup = this.fb.group({
  //   adaptability: [0],

  //   friendliness: [0],

  //   healthNeeds: [0],

  //   physicalNeeds: [0],

  //   trainability: [0],
  //   vocality: [0],
  // });

  constructor(
    private breedService: BreedService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.idBreed = routeParams.get("id");

    this.breedService.getBreedById(this.idBreed).subscribe((breed) => {
      this.breed = breed as Breed;
    });
  }

  breed: Breed = {
    breedName: "",
    description: "",
    breedPhoto: "",
    adaptability: 0,
    friendliness: 0,
    healthNeeds: 0,
    physicalNeeds: 0,
    trainability: 0,
    vocality: 0,
  };

  deleteBreed(): void {
    this.breedService.deleteBreed(this.idBreed).subscribe({
      next: () => {
        Swal.fire("Breed deleted :(", "", "success").then(() => {
          this.router.navigateByUrl(`/breeds`);
        });
      },
      error: () => {
        Swal.fire({
          icon: "error",
          title: `Oops...${this.breed.breedName} couldn't be deleted`,
          text: "Something went wrong!",
        });
      },
    });
  }

  update() {
    this.updateMode = !this.updateMode;
  }

  updateBreed() {
    const updateDetails = {
      adaptability: this.adaptabilityStarsTotal,
      friendliness: this.friendLinessStarsTotal,
      healthNeeds: this.healthNeedsStarsTotal,
      physicalNeeds: this.physicalNeedsStarsTotal,
      trainability: this.trainabilityStarsTotal,
      vocality: this.vocalityStarsTotal,
    };

    this.breedService.updateBreed(updateDetails, this.idBreed).subscribe({
      next: () => {
        Swal.fire(`${this.breed.breedName} was updated!`, "", "success").then(
          () => {
            window.location.reload();
          }
        );
      },
      error: () => {
        Swal.fire({
          icon: "error",
          title: `Oops...${this.breed.breedName} couldn't be updated`,
          text: "Something went wrong!",
        });
      },
    });
  }

  submitUpdate() {
    this.adaptabilityStars.forEach((star) => {
      this.adaptabilityStarsTotal += +star;
    });
    this.friendLinessStars.forEach((star) => {
      this.friendLinessStarsTotal += +star;
    });
    this.healthNeedsStars.forEach((star) => {
      this.healthNeedsStarsTotal += +star;
    });
    this.physicalNeedsStars.forEach((star) => {
      this.physicalNeedsStarsTotal += +star;
    });
    this.vocalityStars.forEach((star) => {
      this.vocalityStarsTotal += +star;
    });
    this.trainabilityStars.forEach((star) => {
      this.trainabilityStarsTotal += +star;
    });

    this.updateBreed();
    this.updateMode = !this.updateMode;
  }

  toggleAdaptStar1() {
    this.adaptabilityStars[0] = !this.adaptabilityStars[0];
  }

  toggleAdaptStar2() {
    this.adaptabilityStars[1] = !this.adaptabilityStars[1];
  }

  toggleAdaptStar3() {
    this.adaptabilityStars[2] = !this.adaptabilityStars[2];
  }

  toggleAdaptStar4() {
    this.adaptabilityStars[3] = !this.adaptabilityStars[3];
  }

  toggleAdaptStar5() {
    this.adaptabilityStars[4] = !this.adaptabilityStars[4];
  }

  // _______friendliness stars
  toggleFriendStar1() {
    this.friendLinessStars[0] = !this.friendLinessStars[0];
  }

  toggleFriendStar2() {
    this.friendLinessStars[1] = !this.friendLinessStars[1];
  }

  toggleFriendStar3() {
    this.friendLinessStars[2] = !this.friendLinessStars[2];
  }

  toggleFriendStar4() {
    this.friendLinessStars[3] = !this.friendLinessStars[3];
  }

  toggleFriendStar5() {
    this.friendLinessStars[4] = !this.friendLinessStars[4];
  }

  // health
  toggleHealthStar1() {
    this.healthNeedsStars[0] = !this.healthNeedsStars[0];
  }

  toggleHealthStar2() {
    this.healthNeedsStars[1] = !this.healthNeedsStars[1];
  }

  toggleHealthStar3() {
    this.healthNeedsStars[2] = !this.healthNeedsStars[2];
  }

  toggleHealthStar4() {
    this.healthNeedsStars[3] = !this.healthNeedsStars[3];
  }

  toggleHealthStar5() {
    this.healthNeedsStars[4] = !this.healthNeedsStars[4];
  }

  togglePhysicStar1() {
    this.physicalNeedsStars[0] = !this.physicalNeedsStars[0];
  }

  togglePhysicStar2() {
    this.physicalNeedsStars[1] = !this.physicalNeedsStars[1];
  }

  togglePhysicStar3() {
    this.physicalNeedsStars[2] = !this.physicalNeedsStars[2];
  }

  togglePhysicStar4() {
    this.physicalNeedsStars[3] = !this.physicalNeedsStars[3];
  }

  togglePhysicStar5() {
    this.physicalNeedsStars[4] = !this.physicalNeedsStars[4];
  }

  // trainablity
  toggleTrainStar1() {
    this.trainabilityStars[0] = !this.trainabilityStars[0];
  }

  toggleTrainStar2() {
    this.trainabilityStars[1] = !this.trainabilityStars[1];
  }

  toggleTrainStar3() {
    this.trainabilityStars[2] = !this.trainabilityStars[2];
  }

  toggleTrainStar4() {
    this.trainabilityStars[3] = !this.trainabilityStars[3];
  }

  toggleTrainStar5() {
    this.trainabilityStars[4] = !this.trainabilityStars[4];
  }

  // vocality
  toggleVocStar1() {
    this.vocalityStars[0] = !this.vocalityStars[0];
  }

  toggleVocStar2() {
    this.vocalityStars[1] = !this.vocalityStars[1];
  }

  toggleVocStar3() {
    this.vocalityStars[2] = !this.vocalityStars[2];
  }

  toggleVocStar4() {
    this.vocalityStars[3] = !this.vocalityStars[13];
  }

  toggleVocStar5() {
    this.vocalityStars[4] = !this.vocalityStars[4];
  }
}
