import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import Swal from "sweetalert2";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "doggy-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    firstName: ["", [(Validators.required, Validators.minLength(3))]],
    lastName: ["", [Validators.required, Validators.minLength(3)]],
    username: ["", [Validators.required, Validators.minLength(5)]],
    profilePic: [""],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.myForm.reset({
      firstName: "",
      lastName: "",
      username: "",
      profilePic: "",
      email: "",
      password: "",
    });
  }

  signUp() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const { firstName, lastName, username, profilePic, email, password } =
      this.myForm.value;

    this.authService
      .register(firstName, lastName, username, profilePic, email, password)
      .subscribe((ok) => {
        if (ok === true) {
          this.router.navigateByUrl("/breeds");
        } else {
          const errorMsg = ok.error;

          Swal.fire("Error", errorMsg, "error");
        }
      });
  }

  inputIsValid(field: string) {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  save() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.signUp();
    this.myForm.reset();
  }
}
