import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component'
import { UsersListComponent } from './users-list/users-list.component'
import { InspectionRegistrationComponent } from './inspection-registration/inspection-registration.component'
import { SchedulerComponent } from './scheduler/scheduler.component';
import { ObservationsComponent } from './observations/observations.component';
import { InspectorAssignmentsComponent } from './inspector-assignments/inspector-assignments.component';
import { GrowerRegistrationsComponent } from './grower-registrations/grower-registrations.component'
import { LocationsComponent } from './locations/locations.component';

const routes: Routes = [
  { path: 'country', component: LocationsComponent },
  { path: 'state', component: LocationsComponent },
  { path: 'district', component: LocationsComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'userslist', component: UsersListComponent },
  { path: 'inspectionReg', component: RegisterComponent },
  { path: 'Scheduler', component: SchedulerComponent },
  { path: 'observations', component: ObservationsComponent },
  { path: 'app', component: AppComponent },
  { path: 'assignments', component: InspectorAssignmentsComponent },
  { path: 'registrations', component: GrowerRegistrationsComponent },
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