import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { EditProfileComponent } from 'src/app/components/editProfile/editProfile.component'; 
import { ChangePasswordComponent } from 'src/app/components/changePassword/changePassword.component';
import { CompanySettingsComponent } from 'src/app/components/companySettings/companySettings.component';
import { Router } from '@angular/router';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  companyName: string | null = '';
  companyIcon: string | null = '';
  userName: string | null = '';
  userPP: string | null = '';

  search: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.companyName = localStorage.getItem('company_name');
    const icon = localStorage.getItem('company_icon');
    if (icon) {
      this.companyIcon = icon; // Base64 olarak ikon verisini kullan
    }

    this.userName = localStorage.getItem('user_name');
    const userPP = localStorage.getItem('user_pp');
    if (userPP) {
      this.userPP = userPP; // Base64 olarak kullanıcı profil resmini kullan
    }
  }

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/home",
      icon: "home",
      menu: "Dashboard",
    },
    {
      link: "/addEstate",
      icon: "plus",
      menu: "Add New Estate",
    },
    {
      link: "/estateList",
      icon: "list",
      menu: "Estate List",
    },
    {
      link: "/addAgent",
      icon: "plus",
      menu: "Add Estate Agent",
    },
    {
      link: "/agentList",
      icon: "list",
      menu: "Estate Agent List",
    },
  ];

  openEditProfile(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '400px',
      data: {
        user: {
          name: this.userName,
          email: localStorage.getItem('user_email'),
          surname: localStorage.getItem('user_surname')
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Profile updated successfully', 'Close', { duration: 3000 });
      } else if (result === false) {
        this.snackBar.open('Error updating profile', 'Close', { duration: 3000 });
      }
    });
  }

  openChangePassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Password changed successfully', 'Close', { duration: 3000 });
      } else if (result === false) {
        this.snackBar.open('Error changing password', 'Close', { duration: 3000 });
      }
    });
  }

  openCompanySettings(): void {
    const dialogRef = this.dialog.open(CompanySettingsComponent, {
      width: '400px',
      data: {
        companyName: this.companyName,
        companyIcon: this.companyIcon
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Company settings updated successfully', 'Close', { duration: 3000 });
      } else if (result === false) {
        this.snackBar.open('Error updating company settings', 'Close', { duration: 3000 });
      }
    });
  }

  logout(): void {
    // Logout logic
    localStorage.clear();
    this.router.navigate(['/login']);
    this.snackBar.open('Logged out successfully', 'Close', { duration: 3000 });
  }
}
