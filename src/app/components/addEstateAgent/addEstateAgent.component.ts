import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card'; // MatCardModule import edildi
import { Router } from '@angular/router';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar'; // MatSnackBar import edildi
import { Estate, EstateType, PropertyType } from '../../models/estate.model';
import { EstateService } from '../../services/estate.service';
import { EstateAgentService } from '../../services/estateAgent.service'; // Import EstateAgentService
import { CommonModule } from '@angular/common'; // CommonModule import edildi
import { NgFor, NgIf } from '@angular/common'; // NgFor ve NgIf import edildi
import { EstateAgent } from '../../models/estateAgent.model'; // Import EstateAgent model

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatExpansionModule, // MatExpansionModule import edildi
    MatCardModule, // MatCardModule import edildi
    MatSnackBarModule // MatSnackBarModule import edildi
  ],
  templateUrl: './addEstate.component.html',
})
export class AddEstateComponent implements OnInit {
  estate: Estate = new Estate();

  estateTypes = [
    { value: EstateType.ForSale, viewValue: 'For Sale' },
    { value: EstateType.ForRent, viewValue: 'Monthly Rent' },
    { value: EstateType.DailyRent, viewValue: 'Daily Rent' }
  ];

  propertyTypes = [
    { value: PropertyType.Apartment, viewValue: 'Apartment' },
    { value: PropertyType.Villa, viewValue: 'Villa' },
    { value: PropertyType.Home, viewValue: 'Home' },
    { value: PropertyType.Office, viewValue: 'Office' },
    { value: PropertyType.Building, viewValue: 'Building' },
    { value: PropertyType.TownHouse, viewValue: 'TownHouse' },
    { value: PropertyType.Shop, viewValue: 'Shop' },
    { value: PropertyType.Garage, viewValue: 'Garage' }
  ];

  estateAgents: EstateAgent[] = []; // Tip tanımlaması yapıldı

  constructor(
    private estateService: EstateService,
    private estateAgentService: EstateAgentService, // Inject EstateAgentService
    private router: Router, // Router import edildi
    private snackBar: MatSnackBar // MatSnackBar import edildi
  ) {}

  ngOnInit(): void {
    this.estateAgentService.getEstateAgents().subscribe(data => {
      this.estateAgents = data;
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.estateService.saveEstate(this.estate).subscribe(
        response => {
          form.resetForm();
          this.estate = new Estate();
          this.router.navigate(['/estateList']); // estateList sayfasına yönlendirme
          this.snackBar.open('Estate saved successfully!', 'Close', {
            duration: 3000, // Snackbar 3 saniye boyunca gösterilecek
          });
        },
        error => {
          console.error('Error saving estate:', error);
          this.snackBar.open('Error saving estate. Please try again.', 'Close', {
            duration: 3000, // Snackbar 3 saniye boyunca gösterilecek
          });
        }
      );
    }
  }
}
