/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { catchError, map, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthResponse } from "../interfaces/authResponse";
import { User } from "../interfaces/user";
import { RenewResponse } from "../interfaces/renewResponse";
import { UserRegisterResponse } from "../interfaces/userRegisterResponse";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl: string = environment.apiUrl;

  private _user!: User;

  get user() {
    return { ...this._user };
  }

  constructor(private http: HttpClient) {}

  register(
    firstName: string,
    lastName: string,
    username: string,
    profilePic: string,
    email: string,
    password: string
  ) {
    const url = `${this.baseUrl}/users/register`;
    const body = { firstName, lastName, username, profilePic, email, password };
    return this.http.post<UserRegisterResponse>(url, body).pipe(
      tap((respRegister) => {
        if (respRegister.ok) {
          localStorage.setItem("userToken", respRegister.user);
          this._user = {
            username: respRegister.username,
          };
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error))
    );
  }

  login(username: string, password: string) {
    const url = `${this.baseUrl}/users/login`;
    const body = { username, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((respLogin) => {
        if (respLogin.ok) {
          localStorage.setItem("userToken", respLogin.user!);
          this._user = {
            username: respLogin.username!,
          };
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error))
    );
  }

  checkToken(): Observable<boolean> {
    const userToken = localStorage.getItem("userToken" || "");
    const url = `${this.baseUrl}/users/renew`;
    return this.http
      .get<RenewResponse>(url, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .pipe(
        map((resp) => {
          localStorage.setItem("userToken", resp.user);
          this._user = {
            username: resp.username!,
          };
          return resp.ok;
        }),
        catchError((err) => of(false))
      );
  }
}
