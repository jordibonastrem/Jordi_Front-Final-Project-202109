import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CheckTokenGuard } from "./guards/check-token.guard";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "",
    loadChildren: () =>
      import("./protected/protected.module").then((m) => m.ProtectedModule),
    canActivate: [CheckTokenGuard],
    canLoad: [CheckTokenGuard],
  },
  {
    path: "**",
    redirectTo: "auth",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
