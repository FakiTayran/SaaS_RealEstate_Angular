import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service'; // Import UserService

@Component({
  selector: 'app-change-password',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private snackBar: MatSnackBar,
    private userService: UserService // Inject UserService
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup): any {
    return group.get('newPassword')?.value === group.get('confirmNewPassword')?.value ? null : { mismatch: true };
  }

  changePassword(): void {
    if (this.changePasswordForm.valid) {
      const formData = this.changePasswordForm.value;
      this.userService.changePassword(formData).subscribe(
        (response: any) => {
          this.dialogRef.close(true);
          this.snackBar.open('Password changed successfully', 'Close', { duration: 3000 });
        },
        (error: any) => {
          this.snackBar.open('Error changing password', 'Close', { duration: 3000 });
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
