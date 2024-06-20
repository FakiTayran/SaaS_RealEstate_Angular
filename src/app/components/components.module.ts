import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { AddEstateComponent } from './addEstate/addEstate.component';
import { DemoFlexyModule } from '../demo-flexy-module';
import { FormsModule } from '@angular/forms';
import { EstateListComponent } from './estateList/estateList.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    AddEstateComponent,
    FormsModule,
    EstateListComponent,
    RegisterComponent,
    LoginComponent
  ],
  exports: [
    AddEstateComponent,
    EstateListComponent,
    RegisterComponent,
    LoginComponent
  ]
})
export class ComponentsModule { }
