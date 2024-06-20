import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';  
import { AuthService } from '../../services/auth.service'; 
import { HttpClientModule } from '@angular/common/http'; // HttpClientModule eklenmesi
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // MatSnackBarModule eklenmesi
import { Router } from '@angular/router'; // Router'ı import edin

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,  // ReactiveFormsModule doğru şekilde import ediliyor
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule, // HttpClientModule burada import edilmesi gerekiyor
    MatSnackBarModule // MatSnackBarModule burada import edilmesi gerekiyor
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerFormVisible = false;
  showPlans = true; // Mevcut planların görünürlüğünü kontrol eder

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private snackBar: MatSnackBar, 
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<RegisterComponent> // MatDialogRef'i inject edin
  ) {
    this.registerForm = this.fb.group({
      companyName: ['', Validators.required],
      taxNumber: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  openSubscriptionPlanPage() {
    this.showPlans = true;
    this.registerFormVisible = false;
  }

  openRegisterForm() {
    this.showPlans = false; 
    this.registerFormVisible = true; 
  }

  close() {
    this.dialogRef.close(); // Dialogu kapat
  }

  register() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      
      this.authService.register(formData).subscribe(
        (response) => {
          console.log('Registration successful', response);
          this.snackBar.open('Registration successful', 'Close', {
            duration: 3000, // 3 saniye boyunca göster
            verticalPosition: 'bottom', // 'top' veya 'bottom' olarak ayarlayabilirsiniz
            horizontalPosition: 'right' // 'start', 'center', 'end', 'left' veya 'right' olarak ayarlayabilirsiniz
          });
          this.close(); // Registration formunu kapat ve login bileşenine yönlendir
        },
        (error) => {
          console.error('Registration failed', error);
          this.snackBar.open('Registration failed', 'Close', {
            duration: 3000, // 3 saniye boyunca göster
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          });
        }
      );
    }
  }
}
