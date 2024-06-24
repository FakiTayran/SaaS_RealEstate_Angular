import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEstateComponent } from './components/addEstate/addEstate.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EstateListComponent } from './components/estateList/estateList.component'; // Import EstateListComponent
import { AuthGuard } from './guards/auth.guard';
import { EditEstateComponent } from './components/editEstate/editEstate.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Login rotası
  { path: 'register', component: RegisterComponent }, // Register rotası
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard], // FullComponent için AuthGuard ekleyin
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: DashboardComponent },
      { path: 'addEstate', component: AddEstateComponent },
      { path: 'editEstate', component: EditEstateComponent },
      { path: 'estateList', component: EstateListComponent }, 
    ]
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
