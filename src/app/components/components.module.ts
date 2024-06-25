import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { DemoFlexyModule } from '../demo-flexy-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Add this line
import { NgxDropzoneModule } from 'ngx-dropzone';


import { EditEstateComponent } from './editEstate/editEstate.component';
import { EstateListComponent } from './estateList/estateList.component';
import { DetailEstateComponent } from './detailEstate/detailEstate.component';
import { SafePipe } from './safe.pipe';
import { AddEstatePhotoComponent } from './addPhoto/addEstatePhoto.component';
import { ConfirmDialogComponent } from './confirmDialog/confirmDialog.component';

// Import standalone components
import { AddEstateComponent } from './addEstate/addEstate.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    EditEstateComponent,
    EstateListComponent,
    DetailEstateComponent,
    AddEstatePhotoComponent,
    SafePipe,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSliderModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    AddEstateComponent,
    RegisterComponent,
    LoginComponent,
    NgxDropzoneModule,
  ],
  providers: [CurrencyPipe],
  exports: [
    EditEstateComponent,
    EstateListComponent,
    DetailEstateComponent,
    AddEstatePhotoComponent,
    ConfirmDialogComponent,
  ]
})
export class ComponentsModule { }
