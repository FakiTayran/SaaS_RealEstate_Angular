import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Estate } from '../../models/estate.model';

@Component({
  selector: 'app-detail-estate',
  templateUrl: './detailEstate.component.html',
  styleUrls: ['./detailEstate.component.css']
})
export class DetailEstateComponent implements OnInit {
  estate: Estate;
  currentImageIndex: number = 0;

  constructor(
    private dialogRef: MatDialogRef<DetailEstateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { estate: Estate }
  ) {
    this.estate = data.estate;
  }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }

  nextImage(): void {
    if (this.currentImageIndex < this.estate.estatePictures.length - 1) {
      this.currentImageIndex++;
    }
  }

  previousImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  getImageUrl(): string {
    return this.estate.estatePictures[this.currentImageIndex].img;
  }
}
