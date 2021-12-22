import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "doggy-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(3)]],
    password: ["", [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.myForm.reset({ username: "", pasword: "" });
  }

  login() {
    const { username, password } = this.myForm.value;

    this.authService.login(username, password).subscribe((ok) => {
      if (ok === true) {
        this.router.navigateByUrl("/breeds");
      } else {
        const errorMsg = ok.error;

        Swal.fire("Error", errorMsg, "error");
      }
    });

    this.router.navigateByUrl("/breeds");
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
    this.login();
    this.myForm.reset();
  }
}
