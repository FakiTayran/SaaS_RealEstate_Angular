import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Estate, EstateType, PropertyType } from '../../models/estate.model';

@Component({
  selector: 'app-detail-estate',
  templateUrl: './detailEstate.component.html',
  styleUrls: ['./detailEstate.component.css']
})
export class DetailEstateComponent {
  currentSlide: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DetailEstateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { estate: Estate }
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  getEstateTypeLabel(type: EstateType): string {
    return EstateType[type];
  }

  getPropertyTypeLabel(type: PropertyType): string {
    return PropertyType[type];
  }

  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.data.estate.estatePictures.length - 1;
    }
  }

  nextSlide(): void {
    if (this.currentSlide < this.data.estate.estatePictures.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
  }
}
