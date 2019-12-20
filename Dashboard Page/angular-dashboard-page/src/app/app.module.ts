import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificationDropdownComponent } from './components/notification-dropdown/notification-dropdown.component';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BarChartComponent,
    LineChartComponent,
    NavbarComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
