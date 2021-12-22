import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from "../auth/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class CheckTokenGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.checkToken().pipe(
      tap((validActivate) => {
        if (!validActivate) {
          this.router.navigateByUrl("/auth");
        }
      })
    );
  }

  canLoad(): Observable<boolean> | boolean {
    return this.authService.checkToken().pipe(
      tap((validLoad) => {
        if (!validLoad) {
          this.router.navigateByUrl("/auth");
        }
      })
    );
  }
}
