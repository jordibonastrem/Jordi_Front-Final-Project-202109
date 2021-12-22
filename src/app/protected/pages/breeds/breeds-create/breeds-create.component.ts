/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from "@angular/core";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { BreedService } from "src/app/protected/services/breed.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { Breed } from "src/app/shared/interfaces/breed.interface";

@Component({
  selector: "doggy-breeds-create",
  templateUrl: "./breeds-create.component.html",
  styleUrls: ["./breeds-create.component.css"],
})
export class BreedsCreateComponent implements OnInit {
  placeholder = "assets/images/punto.jpg";

  faUpload = faUpload;

  fileHolder: string | Blob = "";

  imageSrc!: string;

  myForm: FormGroup = this.fb.group({
    breedName: ["", [Validators.required, Validators.minLength(5)]],
    breedPhoto: null,

    adaptability: [0, [Validators.required, Validators.pattern("^[0-5]*$")]],

    friendliness: [0, [Validators.required, Validators.pattern("^[0-5]*$")]],

    healthNeeds: [
      0,
      [Validators.required, Validators.min(0), Validators.pattern("^[0-5]*$")],
    ],

    physicalNeeds: [
      0,
      [Validators.required, Validators.min(0), Validators.pattern("^[0-5]*$")],
    ],

    trainability: [
      0,
      [Validators.required, Validators.min(0), Validators.pattern("^[0-5]*$")],
    ],
    vocality: [
      0,
      [Validators.required, Validators.min(0), Validators.pattern("^[0-5]*$")],
    ],
    description: ["", [Validators.required, Validators.minLength(15)]],
  });

  constructor(
    private breedService: BreedService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.myForm.reset({
      breedName: "",
      breedPhoto: null,
      adaptability: null,
      friendliness: null,
      healthNeeds: null,
      physicalNeeds: null,
      trainability: null,
      vocality: null,
      description: "",
    });
  }

  inputIsValid(field: string) {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result as string);

      reader.readAsDataURL(file);
    }
  }

  setImage(event: any): void {
    if (event.target.files.length > 0) {
      [this.fileHolder] = event.target.files;
    }
  }

  save() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const newBreed = new FormData();
    newBreed.append("breedName", this.myForm.value.breedName);
    newBreed.append("breedPhoto", this.fileHolder);
    newBreed.append("adaptability", this.myForm.value.adaptability);
    newBreed.append("friendliness", this.myForm.value.friendliness);
    newBreed.append("healthNeeds", this.myForm.value.healthNeeds);
    newBreed.append("physicalNeeds", this.myForm.value.physicalNeeds);
    newBreed.append("trainability", this.myForm.value.trainability);
    newBreed.append("vocality", this.myForm.value.vocality);
    newBreed.append("description", this.myForm.value.description);

    this.myForm.patchValue({
      breedPhoto: this.fileHolder,
    });

    this.breedService.createBreed(newBreed).subscribe({
      next: (breed) => {
        Swal.fire("Breed created!", "", "success").then((result1) => {
          Swal.fire({
            title: "Do you wanna see your new breed?",
            showDenyButton: true,

            confirmButtonText: "Yes",
            denyButtonText: "No",
            customClass: {
              actions: "my-actions",
              cancelButton: "order-1 right-gap",
              confirmButton: "order-2",
              denyButton: "order-3",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              const { id } = breed as Breed;
              this.router.navigateByUrl(`/breeds/details/${id}`);
            } else if (result.isDenied) {
              Swal.fire(":(", "");
            }
          });
        });
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      },
    });
    this.myForm.reset();
  }
}
