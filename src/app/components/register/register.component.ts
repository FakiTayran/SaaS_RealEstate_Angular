import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerFormVisible = false;
  showPlans = true; // Mevcut planların görünürlüğünü kontrol eder

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      realEstateCompany: this.fb.group({
        name: ['', Validators.required],
        taxNumber: ['', Validators.required]
      }),
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  openRegisterForm() {
    this.showPlans = false; // Mevcut planları gizle
    this.registerFormVisible = true; // Register formunu göster
  }

  close() {
    this.showPlans = true; // Mevcut planları göster
    this.registerFormVisible = false; // Register formunu gizle
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.registerForm.get('realEstateCompany')?.get('icon')?.setValue(file);
  }

  register() {
    if (this.registerForm.valid) {
      console.log('Form Submitted', this.registerForm.value);
      // Form submit işlemleri
    }
  }
}
