import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBarModule
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../services/auth.service';

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
    MatCardModule,
    MatSnackBarModule // Add MatSnackBarModule
  ]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem("company_name", response.companyName);
        localStorage.setItem("company_id", response.companyId);
        localStorage.setItem("company_icon", response.companyIcon);
        localStorage.setItem("user_name", response.userName);
        localStorage.setItem("user_pp", response.userPP);
        localStorage.setItem("name", response.name);
        localStorage.setItem("surname", response.surname);
        this.router.navigate(['/home']); // Yönlendirme işlemi
        this.snackBar.open('Login successful', 'Close', { duration: 3000 }); // Show success message
      },
      (error) => {
        console.error('Login failed', error);
        this.snackBar.open('Login failed', 'Close', { duration: 3000 }); // Show error message
      }
    );
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(() => {
      // RegisterComponent kapandıktan sonra login formunu tekrar görünür yapabilirsiniz
    });
  }
}
