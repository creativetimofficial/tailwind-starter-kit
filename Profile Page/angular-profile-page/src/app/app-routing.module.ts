import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from "./pages/profile/profile.component";

const routes: Routes = [
  { path: "", redirectTo: "profile", pathMatch: "full"},
  { path: "profile", component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
