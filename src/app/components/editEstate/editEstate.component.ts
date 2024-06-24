import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstateService } from '../../services/estate.service';
import { Estate, EstateType, PropertyType } from '../../models/estate.model';
import { EstateAgentService } from '../../services/estateAgent.service';
import { EstateAgent } from '../../models/estateAgent.model';

@Component({
  selector: 'app-edit-estate',
  templateUrl: './editEstate.component.html',
  styleUrls: ['./editEstate.component.css']
})
export class EditEstateComponent implements OnInit {
  editForm: FormGroup;
  estateTypes = Object.values(EstateType).filter(value => typeof value === 'number');
  propertyTypes = Object.values(PropertyType).filter(value => typeof value === 'number');
  estateAgents: EstateAgent[] = [];

  constructor(
    private fb: FormBuilder,
    private estateService: EstateService,
    private estateAgentService: EstateAgentService,
    private dialogRef: MatDialogRef<EditEstateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { estate: Estate }
  ) {
    this.editForm = this.fb.group({
      id: [data.estate.id],
      headline: [data.estate.headline, Validators.required],
      description: [data.estate.description, Validators.required],
      estateType: [data.estate.estateType, Validators.required],
      propertyType: [data.estate.propertyType, Validators.required],
      numberOfBedRooms: [data.estate.numberOfBedRooms, Validators.required],
      numberOfBathRooms: [data.estate.numberOfBathRooms, Validators.required],
      squareMeter: [data.estate.squareMeter, Validators.required],
      price: [data.estate.price, Validators.required],
      balcony: [data.estate.balcony],
      garden: [data.estate.garden],
      city: [data.estate.city, Validators.required],
      postCode: [data.estate.postCode, Validators.required],
      estateAgentId: [data.estate.estateAgent.id],
      realEstateCompanyId: [data.estate.realEstateCompanyId],
      landLordName: [data.estate.landLordName],
      landLordPhone: [data.estate.landLordPhone],
      landLordEmail: [data.estate.landLordEmail]
    });
  }

  ngOnInit(): void {
    this.getEstateAgents();
  }

  getEstateAgents(): void {
    this.estateAgentService.getEstateAgents().subscribe(data => {
      this.estateAgents = data;
    });
  }

  save(): void {
    if (this.editForm.valid) {
      const estateData = this.editForm.value;
      this.estateService.editEstate(estateData).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  getEstateTypeLabel(type: any): string {
    return EstateType[type];
  }

  getPropertyTypeLabel(type: any): string {
    return PropertyType[type];
  }
}
