import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AppComponent } from './app.component'
import { UsersListComponent } from './users-list/users-list.component'
import {InspectionRegistrationComponent} from './inspection-registration/inspection-registration.component'
import { SchedulerComponent } from './scheduler/scheduler.component';
import { ObservationsComponent } from './observations/observations.component';

const routes: Routes = [

  { path: 'dashboard', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'table', component: TablesComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'upgrade', component: UpgradeComponent },
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  // { path: 'Login',        component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'userslist', component: UsersListComponent },
  {path: 'inspectionReg' , component:RegisterComponent},
  {path: 'Scheduler' , component:SchedulerComponent},
  {path: 'observations' , component:ObservationsComponent},
  { path: 'app', component: AppComponent },
  { path: '**', redirectTo: '' },
  
  { path: '*', redirectTo: '' }


];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }

//{ useHash: true }