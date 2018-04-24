import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { LbdModule } from './lbd/lbd.module';

import { AppComponent } from './app.component';

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

import { Ng2GoogleChartsModule } from 'ng2-google-charts';


import './rxjs-operators';

import {NgxPaginationModule} from 'ngx-pagination'; 

import { ReactiveFormsModule } from '@angular/forms';
import {AuthService} from '../services/auth-service.service';
import { UsersListComponent } from './users-list/users-list.component';
import { InspectionRegistrationComponent } from './inspection-registration/inspection-registration.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { ObservationsComponent } from './observations/observations.component';
import { ReversePipe } from '../pipes/reverse.pipe';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { InspectorAssignmentsComponent } from './inspector-assignments/inspector-assignments.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    LoginComponent,
    RegisterComponent,
    UsersListComponent,
    InspectionRegistrationComponent,
    SchedulerComponent,
    ObservationsComponent,
    ReversePipe,
    InspectorAssignmentsComponent
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
    LbdModule,
    ReactiveFormsModule,
    Ng2GoogleChartsModule,
    NgxPaginationModule
    
  ],
  providers: [AuthService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
