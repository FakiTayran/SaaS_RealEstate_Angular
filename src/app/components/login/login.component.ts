import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // CommonModule'ü kullanın
import { RegisterComponent } from '../register/register.component'; // RegisterComponent import edin
import { environment } from '../../../environments/environment';

interface LoginDto {
  email: string;
  password: string;
}

interface TokenResult {
  access_token: string;
  expires_in: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule
  ]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) {}

  login() {
    const loginDto: LoginDto = {
      email: this.email,
      password: this.password
    };

    this.http.post<TokenResult>(`${environment.apiUrl}/Account/Login`, loginDto)
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.access_token);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
  }

  openRegisterDialog() {
    this.dialog.open(RegisterComponent);
  }
}
