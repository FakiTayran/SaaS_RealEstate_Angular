import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstateAgentService } from 'src/app/services/estateAgent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-estate-agent',
  templateUrl: './addEstateAgent.component.html',
})
export class AddEstateAgentComponent {
  estateAgent = {
    name: '',
    email: '',
    surname: '',
  };

  constructor(
    private estateAgentService: EstateAgentService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmit() {
    this.estateAgentService.addEstateAgent(this.estateAgent).subscribe(
      response => {
        this.router.navigate(['/agentList']); // Redirect to estate agent list page
        this.snackBar.open(
          'Estate agent added successfully. A password has been sent to the provided email.',
          'Close',
          {
            duration: 3000,
          }
        );
        this.estateAgent = { name: '', email: '', surname: '' };
      },
      error => {
        this.snackBar.open(
          'There was an error adding the estate agent. Please try again.',
          'Close',
          {
            duration: 3000,
          }
        );
      }
    );
  }
}
