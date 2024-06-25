import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { EstateService } from '../../services/estate.service';
import { Estate, EstateType, PropertyType } from '../../models/estate.model';
import { EstateAgentService } from '../../services/estateAgent.service'; 
import { EstateAgent } from '../../models/estateAgent.model'; 
import { EditEstateComponent } from '../editEstate/editEstate.component';
import { DetailEstateComponent } from '../detailEstate/detailEstate.component';
import { AddEstatePhotoComponent } from '../addPhoto/addEstatePhoto.component';
import { ConfirmDialogComponent } from '../confirmDialog/confirmDialog.component';

@Component({
  selector: 'app-estate-list',
  templateUrl: './estateList.component.html',
  styleUrls: ['./estateList.component.css']
})
export class EstateListComponent implements OnInit {
  displayedColumns: string[] = ['headline', 'price', 'squareMeter', 'numberOfBedRooms', 'numberOfBathRooms', 'city', 'actions'];
  dataSource = new MatTableDataSource<Estate>();
  filterForm: FormGroup;
  estateAgents: EstateAgent[] = []; 
  estateTypes = Object.values(EstateType).filter(value => typeof value === 'number');
  propertyTypes = Object.values(PropertyType).filter(value => typeof value === 'number');

  constructor(
    private fb: FormBuilder,
    private estateService: EstateService,
    private estateAgentService: EstateAgentService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.filterForm = this.fb.group({
      searchText: [''],
      minPrice: [null],
      maxPrice: [null],
      minSquareMeter: [null],
      maxSquareMeter: [null],
      estateType: [null],
      propertyType: [null],
      numberOfBedRooms: [null],
      numberOfBathRooms: [null],
      garden: [false],
      balcony: [false],
      city: [null],
      postCode: [null],
      estateAgentId: [null]
    });
  }

  ngOnInit(): void {
    this.getEstateAgents();
    this.getEstates();
  }

  getEstateAgents(): void {
    this.estateAgentService.getEstateAgents().subscribe(data => {
      this.estateAgents = data;
    });
  }

  getEstates(filters: any = {}): void {
    Object.keys(this.filterForm.controls).forEach(key => {
      const controlValue = this.filterForm.get(key)?.value;
      if (controlValue !== null && controlValue !== '') {
        filters[key] = controlValue;
      }
    });

    this.estateService.getAllEstates(filters).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  applyFilter() {
    this.getEstates(this.filterForm.value);
  }

  editEstate(estate: Estate) {
    const dialogRef = this.dialog.open(EditEstateComponent, {
      width: '600px',
      data: { estate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEstates();
        this.snackBar.open('Estate updated successfully', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  viewDetails(estate: Estate) {
    this.dialog.open(DetailEstateComponent, {
      height:'auto',
      width: '1200px',
      data: { estate }
    });
  }

  addPhotoEstate(estate: Estate) {
    const dialogRef = this.dialog.open(AddEstatePhotoComponent, {
      width: '600px',
      data: { estate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEstates();
        this.snackBar.open('Photos added successfully', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  deleteEstate(estate: Estate) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete the estate "${estate.headline}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.estateService.deleteEstate(estate.id).subscribe(() => {
          this.getEstates();
          this.snackBar.open('Estate deleted successfully', 'Close', {
            duration: 3000,
          });
        });
      }
    });
  }

  formatPriceLabel(value: number): string {
    return `£${value}`;
  }

  formatSquareMeterLabel(value: number): string {
    return `${value} m²`;
  }
}
