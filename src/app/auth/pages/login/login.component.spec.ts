/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";

import { By } from "@angular/platform-browser";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { of } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { LoginComponent } from "./login.component";

describe("TEST of component LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerFake: Router;
  let authService: AuthService;

  let localStore: any;

  const routerMock = {
    navigateByUrl: () => {},
    routeReuseStrategy: {
      shouldReuseRoute: () => {},
    },
  };

  class AuthServiceMock {
    login = (username: string, password: string) => of(true);
  }

  beforeEach(async () => {
    localStore = { userToken: "sfsdfsdfsdfsdf" };

    spyOn(window.localStorage, "getItem").and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    spyOn(window.localStorage, "setItem").and.callFake(
      (key, value) => (localStore[key] = `${value}`)
    );
    spyOn(window.localStorage, "clear").and.callFake(() => (localStore = {}));
    await TestBed.configureTestingModule({
      providers: [
        LoginComponent,
        [
          { provide: AuthService, useClass: AuthServiceMock },
          { provide: Router, useValue: routerMock },
        ],
      ],
      declarations: [LoginComponent],
      imports: [CommonModule, ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    routerFake = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should exist", () => {
    expect(component).toBeTruthy();
  });

  describe("VALID form", () => {
    describe("When password and username are more than 3 characters", () => {
      it("Should return valid form", () => {
        const { username } = component.myForm.controls;
        const { password } = component.myForm.controls;
        const usernameValue = "abcde";
        const passwordValue = "abcde";

        username.setValue(usernameValue);
        password.setValue(passwordValue);

        expect(component.myForm.valid).toBeTrue();
      });

      describe("When button login is clicked", () => {
        it("Should call the method save", () => {
          const { username } = component.myForm.controls;
          const { password } = component.myForm.controls;
          const btnLogin = fixture.debugElement.query(
            By.css("button.form__button")
          );
          const usernameValue = "abcde";
          const passwordValue = "abcde";

          spyOn(component, "save");

          username.setValue(usernameValue);
          password.setValue(passwordValue);
          btnLogin.nativeElement.click();

          expect(component.save).toHaveBeenCalled();
        });
      });
    });
  });

  describe("INVALID form", () => {
    describe("Given username and password", () => {
      describe("When they are empty", () => {
        it("Should return invalid form", () => {
          const { username } = component.myForm.controls;
          const { password } = component.myForm.controls;

          username.setValue("");
          password.setValue("");

          expect(component.myForm.invalid).toBeTrue();
        });
      });
      describe("When username is less than 3 characters", () => {
        it("Should return invalid form", () => {
          const { username } = component.myForm.controls;
          const { password } = component.myForm.controls;
          const usernameValue = "a";
          const passwordValue = "abcde";

          username.setValue(usernameValue);
          password.setValue(passwordValue);

          expect(component.myForm.invalid).toBeTrue();
        });
      });
      describe("When password is less than 3 characters", () => {
        it("Should return invalid form", () => {
          const { username } = component.myForm.controls;
          const { password } = component.myForm.controls;
          const usernameValue = "abcde";
          const passwordValue = "a";

          username.setValue(usernameValue);
          password.setValue(passwordValue);

          expect(component.myForm.invalid).toBeTrue();
        });
      });
    });
  });

  describe("Given login button", () => {
    describe("When its pressed", () => {
      it("Should call the save method", () => {
        const { username } = component.myForm.controls;
        const { password } = component.myForm.controls;

        username.setValue("jordi123");
        password.setValue("jordi123");

        spyOn(component, "save");
        const buttonLogin = fixture.debugElement.query(
          By.css("button.form__button")
        );
        buttonLogin.nativeElement.click();
        expect(component.save).toHaveBeenCalled();
      });
      describe("When save method is called and the form is invalid", () => {
        it("Should mark the form as touched", () => {
          const username = "";
          const password = "";
          component.myForm.controls["username"].setValue(username);
          component.myForm.controls["username"].setValue(password);

          component.save();
          expect(component.myForm.status).toBe("INVALID");
          expect(component.myForm.touched).toBe(true);
        });
      });

      describe("When save method is called and the form is valid", () => {
        it("Should call login()", () => {
          const username = "jordi123";
          const password = "jordi123";
          component.myForm.controls["username"].setValue(username);
          component.myForm.controls["password"].setValue(password);

          spyOn(component, "login");

          component.save();
          expect(component.login).toHaveBeenCalled();
        });
        it("Should reset the form", () => {
          const username = "jordi123";
          const password = "jordi123";
          component.myForm.controls["username"].setValue(username);
          component.myForm.controls["password"].setValue(password);

          spyOn(component, "login");

          component.save();

          expect(component.myForm.controls["username"].value).toBe(null);
          expect(component.myForm.controls["password"].value).toEqual(null);
        });
        describe("When login of authservie is called and the response is true", () => {
          it("Should call authService.login with the username and password of the form", async () => {
            component.myForm.controls["username"].setValue("jordi123");
            component.myForm.controls["password"].setValue("jordi123");

            const spylogin = spyOn(authService, "login").and.callThrough();

            component.login();

            await expect(spylogin).toHaveBeenCalled();
            await expect(spylogin).toHaveBeenCalledWith("jordi123", "jordi123");
          });
        });
      });
    });
  });
});
