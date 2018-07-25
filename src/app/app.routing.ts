import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/Commons/home/home.component';
import { ProfileComponent } from './components/Commons/profile/profile.component';
import { RegisterComponent } from './components/Admin/register/register.component';
import { UsersListComponent } from './components/Admin/users-list/users-list.component';
import { SchedulerComponent } from './components/TeamLead/scheduler/scheduler.component';
import { ObservationsComponent } from './components/TeamLead/observations/observations.component';
import { InspectorAssignmentsComponent } from './components/ParaSeedInspector/assignments/assignments.component';
import { GrowerRegistrationsComponent } from './components/Grower/registrations/registrations.component'
import { SignupComponent } from './components/Commons/shared/signup/signup.component';
import { LocationsComponent } from './components/Admin/locations/locations.component';

const routes: Routes = [
  { path: 'country', component: LocationsComponent },
  { path: 'state', component: LocationsComponent },
  { path: 'district', component: LocationsComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
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
