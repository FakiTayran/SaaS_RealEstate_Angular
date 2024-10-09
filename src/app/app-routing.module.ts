import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEstateComponent } from './components/addEstate/addEstate.component';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EstateListComponent } from './components/estateList/estateList.component';
import { AuthGuard } from './guards/auth.guard';
import { EditEstateComponent } from './components/editEstate/editEstate.component';
import { AddEstateAgentComponent } from './components/addEstateAgent/addEstateAgent.component';
import { EstateAgentListComponent } from './components/estateAgentList/estateAgentList.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Giriş rotası
  { path: 'register', component: RegisterComponent }, // Kayıt rotası
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard], // FullComponent için AuthGuard
    children: [
      { path: '', redirectTo: 'estateList', pathMatch: 'full' }, // Ana sayfa yönlendirmesi
      { path: 'home', redirectTo: 'estateList', pathMatch: 'full' }, // Home yönlendirmesi
      { path: 'addEstate', component: AddEstateComponent },
      { path: 'editEstate', component: EditEstateComponent },
      { path: 'estateList', component: EstateListComponent },
      { path: 'addAgent', component: AddEstateAgentComponent },
      { path: 'agentList', component: EstateAgentListComponent },
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' } // Bilinmeyen yollar için login sayfasına yönlendirme
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
