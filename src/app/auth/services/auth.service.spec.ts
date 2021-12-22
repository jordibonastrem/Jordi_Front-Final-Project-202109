import { HttpClient } from "@angular/common/http";

import { of } from "rxjs";
import { AuthService } from "./auth.service";

describe("TEST of AuthService", () => {
  let authService: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["post", "get"]);
    authService = new AuthService(httpClientSpy as any);
    let store: any = {};
    const mockLocalStorage = {
      getItem: (key: string): string => (key in store ? store[key] : null),
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
    spyOn(localStorage, "getItem").and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, "setItem").and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, "removeItem").and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, "clear").and.callFake(mockLocalStorage.clear);
  });

  it("Should create correctly", () => {
    expect(authService).toBeTruthy();
  });

  describe("Given a login method", () => {
    describe("Given a user that exists", () => {
      it("Should return ok(true)", (done: DoneFn) => {
        const mockUserLoginCredentials = {
          username: "jordi123",
          password: "jordi123",
        };
        const mockResultLogin = {
          ok: true,
        };

        httpClientSpy.post.and.returnValue(of(mockResultLogin));
        const { username, password } = mockUserLoginCredentials;

        authService.login(username, password).subscribe((ok) => {
          expect(ok).toEqual(true);

          done();
        });
      });
      it("should set in local storage the token generated", (done: DoneFn) => {
        const mockUserLoginCredentials = {
          username: "jordi123",
          password: "jordi123",
        };
        const mockResultLogin = {
          ok: true,
          user: "encryptedUserToken",
        };
        httpClientSpy.post.and.returnValue(of(mockResultLogin));

        const { username, password } = mockUserLoginCredentials;

        authService.login(username, password).subscribe(() => {
          expect(localStorage.getItem("userToken")).toEqual(
            mockResultLogin.user
          );

          done();
        });
      });
    });
    describe("Given a user that doesn't exist", () => {
      it(`it should return ok(false)`, (done: DoneFn) => {
        const mockUserLoginCredentials = {
          username: "lolito",
          password: "lolito",
        };
        const mockResultLogin = {
          ok: false,
        };
        httpClientSpy.post.and.returnValue(of(mockResultLogin));
        const { username, password } = mockUserLoginCredentials;

        authService.login(username, password).subscribe((ok) => {
          expect(ok).toEqual(false);
          done();
        });
      });
    });
  });

  describe("Given a signUp method", () => {
    describe("Given a user that already exists", () => {
      it("Should return ok(false)", (done: DoneFn) => {
        const mockUserRegisterCredentials = {
          firstName: "Jordi",
          lastName: "Bonastre",
          username: "jordi123",
          profilePic: "test.jpg",
          email: "jordi.bonastre.m@gmail.com",
          password: "jordi123",
        };
        const mockResultRegister = {
          ok: false,
        };

        httpClientSpy.post.and.returnValue(of(mockResultRegister));
        const { firstName, lastName, username, profilePic, email, password } =
          mockUserRegisterCredentials;

        authService
          .register(firstName, lastName, username, profilePic, email, password)
          .subscribe((ok) => {
            expect(ok).toEqual(false);

            done();
          });
      });
    });
    describe("Given a user that doesn't exist", () => {
      it("Should return ok(true)", (done: DoneFn) => {
        const mockUserRegisterCredentials = {
          firstName: "Jordi",
          lastName: "Bonastre",
          username: "newUser",
          profilePic: "test.jpg",
          email: "jordi.bonastre.m@gmail.com",
          password: "newUser",
        };
        const mockResultRegister = {
          ok: true,
        };

        httpClientSpy.post.and.returnValue(of(mockResultRegister));
        const { firstName, lastName, username, profilePic, email, password } =
          mockUserRegisterCredentials;

        authService
          .register(firstName, lastName, username, profilePic, email, password)
          .subscribe((oki) => {
            expect(oki).toEqual(true);
            done();
          });
      });
      it("should set in local storage the token generated", (done: DoneFn) => {
        const mockUserRegisterCredentials = {
          firstName: "Jordi",
          lastName: "Bonastre",
          username: "jordi123",
          profilePic: "test.jpg",
          email: "jordi.bonastre.m@gmail.com",
          password: "jordi123",
        };
        const mockResultRegister = {
          ok: true,
          user: "encryptedUserToken",
        };
        httpClientSpy.post.and.returnValue(of(mockResultRegister));

        const { username, password } = mockUserRegisterCredentials;

        authService.login(username, password).subscribe(() => {
          expect(localStorage.getItem("userToken")).toEqual(
            mockResultRegister.user
          );

          done();
        });
      });
    });
  });

  describe("Given a checkToken method", () => {
    describe("if the token is valid", () => {
      it("Should return ok(true)", (done: DoneFn) => {
        const mockResultCheckToken = {
          ok: true,
          user: "encryptedUserToken",
        };
        httpClientSpy.get.and.returnValue(of(mockResultCheckToken));

        authService.checkToken().subscribe((ok) => {
          expect(ok).toEqual(true);
          done();
        });
      });
    });
    describe("if the token is not valid", () => {
      it("Should return ok(false)", (done: DoneFn) => {
        const mockResultCheckToken = {
          ok: false,
          user: "encryptedUserToken",
        };
        httpClientSpy.get.and.returnValue(of(mockResultCheckToken));

        authService.checkToken().subscribe((ok) => {
          expect(ok).toEqual(false);
          done();
        });
      });
    });
  });
});
