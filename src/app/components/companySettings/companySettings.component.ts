import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-settings',
  templateUrl: './companySettings.component.html',
  styleUrls: ['./companySettings.component.css']
})
export class CompanySettingsComponent implements OnInit {
  companySettingsForm: FormGroup;
  file: File | null = null;
  companyIcon: string | null = null;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CompanySettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { companyName: string; companyIcon: string }
  ) {
    this.companySettingsForm = this.fb.group({
      companyName: ['', Validators.required],
      companyIcon: [null]
    });
  }

  ngOnInit(): void {
    this.companyIcon = localStorage.getItem('company_icon');
    const companyName = localStorage.getItem('company_name');

    if (companyName) {
      this.companySettingsForm.get('companyName')?.setValue(companyName);
    }
  }

  onSelect(event: any): void {
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file = event.addedFiles[0];
      this.companyIcon = null; // Yeni dosya seçildiğinde eski ikonu kaldır
    }
  }

  onRemove(): void {
    this.file = null;
    this.companyIcon = localStorage.getItem('company_icon'); // Yeni dosya kaldırıldığında eski ikonu geri getir
  }

  save() {
    if (this.companySettingsForm.valid) {
      const formData = new FormData();
      formData.append('companyName', this.companySettingsForm.get('companyName')?.value);
      formData.append('id', localStorage.getItem('company_id') || ''); // Şirket id'si

      if (this.file) {
        formData.append('companyIcon', this.file);
      }

      this.companyService.updateCompanySettings(formData).subscribe(
        (response: any) => {
          // localStorage güncellenmesi
          console.log(response);
          localStorage.setItem('company_name', response.companyName);
          if (response.icon) {
            localStorage.setItem('company_icon', response.icon);
          }

          this.snackBar.open('Company settings updated successfully', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        },
        (error) => {
          this.snackBar.open('Error updating company settings', 'Close', {
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
