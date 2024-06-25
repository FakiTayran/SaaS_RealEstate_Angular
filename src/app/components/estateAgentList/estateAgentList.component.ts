import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstateAgentService } from 'src/app/services/estateAgent.service';
import { ConfirmDialogComponent } from '../confirmDialog/confirmDialog.component'; // Adjust the import path as needed

@Component({
  selector: 'app-estate-agent-list',
  templateUrl: './estateAgentList.component.html',
})
export class EstateAgentListComponent implements OnInit {
  estateAgents: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'actions'];

  constructor(
    private estateAgentService: EstateAgentService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadEstateAgents();
  }

  loadEstateAgents() {
    this.estateAgentService.getEstateAgents().subscribe(data => {
      this.estateAgents = data;
    });
  }

  deleteAgent(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete this estate agent?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.estateAgentService.deleteEstateAgent(id).subscribe(() => {
          this.loadEstateAgents();
          this.snackBar.open('Estate agent deleted successfully', 'Close', {
            duration: 3000,
          });
        }, error => {
          console.error('Error deleting agent', error);
          this.snackBar.open('Error deleting estate agent', 'Close', {
            duration: 3000,
          });
        });
      }
    });
  }
}
