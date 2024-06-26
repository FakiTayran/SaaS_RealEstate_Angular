import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEstateComponent } from './components/addEstate/addEstate.component';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EstateListComponent } from './components/estateList/estateList.component'; // Import EstateListComponent
import { AuthGuard } from './guards/auth.guard';
import { EditEstateComponent } from './components/editEstate/editEstate.component';
import { AddEstateAgentComponent } from './components/addEstateAgent/addEstateAgent.component';
import { EstateAgentListComponent } from './components/estateAgentList/estateAgentList.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Login rotası
  { path: 'register', component: RegisterComponent }, // Register rotası
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard], // FullComponent için AuthGuard ekleyin
    children: [
      { path: '', redirectTo: '/estateList', pathMatch: 'full' },
      { path: 'home', redirectTo: '/estateList', pathMatch: 'full' },
      { path: 'addEstate', component: AddEstateComponent },
      { path: 'editEstate', component: EditEstateComponent },
      { path: 'estateList', component: EstateListComponent }, 
      { path: 'addAgent', component: AddEstateAgentComponent }, 
      { path: 'agentList', component: EstateAgentListComponent }, 

    ]
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
