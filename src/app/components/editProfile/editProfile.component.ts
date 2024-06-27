import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './editProfile.component.html',
  styleUrls: ['./editProfile.component.css']
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  file: File | null = null;
  userPP: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: { name: string; email: string; surname: string } }
  ) {
    this.editProfileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      surname: ['', Validators.required],
      profilePicture: [null]
    });
  }

  ngOnInit(): void {
    this.userPP = localStorage.getItem('user_pp');
    const name = localStorage.getItem('name');
    const surname = localStorage.getItem('surname');
    const email = localStorage.getItem('user_name');

    if (name) {
      this.editProfileForm.get('name')?.setValue(name);
    }

    if (surname) {
      this.editProfileForm.get('surname')?.setValue(surname);
    }

    if (email) {
      this.editProfileForm.get('email')?.setValue(email);
    }
  }

  onSelect(event: any): void {
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file = event.addedFiles[0];
      this.userPP = null; // Yeni dosya seçildiğinde eski profil resmini kaldır
    }
  }

  onRemove(): void {
    this.file = null;
    this.userPP = localStorage.getItem('user_pp'); // Yeni dosya kaldırıldığında eski profil resmini geri getir
  }

  save() {
    if (this.editProfileForm.valid) {
      const formData = new FormData();
      formData.append('name', this.editProfileForm.get('name')?.value);
      formData.append('email', this.editProfileForm.get('email')?.value);
      formData.append('surname', this.editProfileForm.get('surname')?.value);
      if (this.file) {
        formData.append('profilePicture', this.file);
      }

      this.userService.updateProfile(formData).subscribe(
        (response: any) => {
          // localStorage güncellenmesi
          localStorage.setItem('name', response.name);
          localStorage.setItem('surname', response.surname);
          localStorage.setItem('user_name', response.email);
          if (response.userPP) {
            localStorage.setItem('user_pp', response.userPP);
          }

          this.snackBar.open('Profile updated successfully', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        },
        (error) => {
          this.snackBar.open('Error updating profile', 'Close', {
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
