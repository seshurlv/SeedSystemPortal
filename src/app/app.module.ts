import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './components/Commons/shared/navbar/navbar.module';
import { FooterModule } from './components/Commons/shared/footer/footer.module';
import { SidebarModule } from './components/Commons/sidebar/sidebar.module';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import './rxjs-operators';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NguiMapModule } from '@ngui/map';
import { SelectDropDownModule } from 'ngx-select-dropdown';

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

import { UsersService } from '../services/Users/users.services';
import { DataService } from '../services/Shared/data.service';
import { AdminServices } from '../services/Admin/admin.services';
import { LocationServices } from '../services/Locations/locations.services';
import { ProductServices } from '../services/products/products.services';
import { CropServices } from '../services/Crops/crops.services'
import { LoginService } from '../services/Login/login.service'

import { ReversePipe } from '../pipes/reverse.pipe';

import { Globals } from './globals'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    RegisterComponent,
    UsersListComponent,
    SchedulerComponent,
    ObservationsComponent,
    ReversePipe,
    InspectorAssignmentsComponent,
    GrowerRegistrationsComponent,
    SignupComponent,
    LocationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Ng2GoogleChartsModule,
    NgxPaginationModule,
    SelectDropDownModule,
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBSkmVuzbgSritL4vk0LsPbHDeRyPNSU1w' })
  ],
  providers: [LoginService,CropServices,AdminServices, LocationServices, ProductServices, UsersService, Globals, DataService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})

export class AppModule { }
