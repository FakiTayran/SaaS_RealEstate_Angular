import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstateService } from '../../services/estate.service';
import { Estate } from '../../models/estate.model';

@Component({
  selector: 'app-add-estate-photo',
  templateUrl: './addEstatePhoto.component.html',
  styleUrls: ['./addEstatePhoto.component.css']
})
export class AddEstatePhotoComponent implements OnInit {
  addPhotoForm: FormGroup;
  files: File[] = [];
  
  constructor(
    private fb: FormBuilder,
    private estateService: EstateService,
    private dialogRef: MatDialogRef<AddEstatePhotoComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { estate: Estate }
  ) {
    this.addPhotoForm = this.fb.group({
      photos: [null]
    });
  }

  ngOnInit(): void {
    console.log(this.data.estate)
  }

  onSelect(event: any): void {
    this.files.push(...event.addedFiles);
  }

  onRemove(file: File): void {
    this.files.splice(this.files.indexOf(file), 1);
  }

  removePhoto(photoId: number, index: number): void {
    this.estateService.deleteEstatePhoto(photoId).subscribe(
      () => {
        this.data.estate.estatePictures.splice(index, 1);
        this.snackBar.open('Photo removed successfully', '', {
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open('There was an error removing the photo', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  save(): void {
    if (this.files.length > 0) {
      const formData = new FormData();
      for (let file of this.files) {
        formData.append('photos', file, file.name);
      }
      this.estateService.addEstatePhotos(this.data.estate.id, formData).subscribe(
        () => {
          this.dialogRef.close(true);
          this.snackBar.open('Photos added successfully', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          this.snackBar.open('There was an error uploading the photos', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
