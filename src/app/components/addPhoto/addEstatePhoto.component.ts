import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstateService } from '../../services/estate.service';
import { Estate } from '../../models/estate.model';

@Component({
  selector: 'app-add-estate-photo',
  templateUrl: './addEstatePhoto.component.html',
  styleUrls: ['./addEstatePhoto.component.css']
})
export class AddEstatePhotoComponent implements OnInit {
  addPhotoForm: FormGroup;
  selectedFiles: FileList | null = null;

  constructor(
    private fb: FormBuilder,
    private estateService: EstateService,
    private dialogRef: MatDialogRef<AddEstatePhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { estate: Estate }
  ) {
    this.addPhotoForm = this.fb.group({
      photos: [null]
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    this.selectedFiles = event.target.files;
  }

  save(): void {
    if (this.selectedFiles) {
      this.estateService.addEstatePhotos(this.data.estate.id, this.selectedFiles).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
