import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from "./pages/landing/landing.component";

const routes: Routes = [
  { path: "", redirectTo: "landing", pathMatch: "full"},
  { path: "landing", component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
