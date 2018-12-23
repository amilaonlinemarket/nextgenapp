import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from 'ngx-loading';

import { AuthenticationService } from './services/authentication.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';
import {RestclientService} from './services/restclient.service';
import {EmailService} from './services/email.service';
import {UtilityService} from './services/utility.service';
import { GarageComponent } from './garage/garage.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { VehicleComponent } from './business/vehicle/vehicle.component';
import { PrintingComponent } from './business/printing/printing.component';
import {HouseComponent } from './business/house/house.component';
import { MigrationComponent } from './personal-plans/migration/migration.component';
import { ElectricityComponent } from './personal-plans/electricity/electricity.component';
import { PricingComponent } from './pricing/pricing.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SportsComponent } from './business/sports/sports.component';
import { CommonInterfaceComponent } from './business/common-interface/common-interface.component';
import { MyhouseComponent } from './business/myhouse/myhouse.component';
import { MyeduComponent } from './business/myedu/myedu.component';
import {BusinessSelectorComponent} from './business/common-interface/business-selector.component';
import { EducationComponent } from './business/education/education.component';
import { TransportComponent } from './business/transport/transport.component';
import { AccomadationComponent } from './business/accomadation/accomadation.component';
import { RentingComponent } from './business/renting/renting.component';
import {ConstructionComponent} from './personal-plans/construction/construction.component'
import {HealthComponent} from './business/health/health.component';
import { PestcontrolComponent } from './business/pestcontrol/pestcontrol.component';
import { CommonComponent } from './business/common/common.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'profile',
    component: ProfileComponent
  },
  {
    path:'contactus',
    component: ContactUsComponent
  },
  {
      path:'business/printing',
      component:PrintingComponent
  },
  {
    path:"business/house",
    component:HouseComponent
  },
//   {
//     path:'edu/classes',
//     component:ClassComponent
// },
{
  path:'business/vehicles',
  component:VehicleComponent
},
{
  path:'business/sports',
  component:SportsComponent
},
{
  path:'personal-plans/migration',
  component:MigrationComponent
},
{
  path:'personal-plans/construction',
  component:ConstructionComponent
},
{
  path:'personal-plans/electricity',
  component:ElectricityComponent
},
{
  path:'join-with-us/pricing',
  component:PricingComponent
},
{
  path:"reset-password",
  component:ResetPasswordComponent
},
{
  path:'business/hub',
  component:CommonInterfaceComponent
},
  {
    path:'',
    component:HomeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    GarageComponent,
    ProfileComponent,
    ContactUsComponent,
    VehicleComponent,
    PrintingComponent,
    // ClassComponent,
    HouseComponent,
    ConstructionComponent,
    MigrationComponent,
    ElectricityComponent,
    PricingComponent,
    ResetPasswordComponent,
    SportsComponent,
    CommonInterfaceComponent,
    BusinessSelectorComponent,
    MyhouseComponent,
    MyeduComponent,
    EducationComponent,
    TransportComponent,
    AccomadationComponent,
    RentingComponent,
    ConstructionComponent,
    HealthComponent,
    PestcontrolComponent,
    CommonComponent
    // NgbdDropdownBasicComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    LoadingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthenticationService,
    UserService,
    RestclientService,
    EmailService,
    UtilityService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
