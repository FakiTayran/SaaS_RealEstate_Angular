import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ChangePasswordComponent>
  ) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  changePassword(): void {
    if (this.changePasswordForm.valid) {
      const oldPassword = this.changePasswordForm.get('oldPassword')?.value;
      const newPassword = this.changePasswordForm.get('newPassword')?.value;
      const confirmNewPassword = this.changePasswordForm.get('confirmNewPassword')?.value;

      if (newPassword !== confirmNewPassword) {
        this.snackBar.open('New passwords do not match', 'Close', { duration: 3000 });
        return;
      }

      const changePasswordDto = {
        oldPassword,
        newPassword
      };

      this.userService.changePassword(changePasswordDto).subscribe(
        () => {
          this.snackBar.open('Password changed successfully', 'Close', { duration: 3000 });
          this.dialogRef.close(true);
        },
        (error) => {
          this.snackBar.open('Error changing password', 'Close', { duration: 3000 });
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
