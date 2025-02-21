import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TripService } from '../../../../servicios/trip-service.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-new-trip',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './new-trip.component.html',
  styleUrl: './new-trip.component.css'
})
export class NewTripComponent {
  tripForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private router: Router
  ) {
    this.tripForm = this.fb.group({
      destination: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.tripForm.valid) {
      this.isSubmitting = true;

      const newTrip = {
        destination: this.tripForm.value.destination,
        startDate: new Date(this.tripForm.value.startDate), 
        endDate: new Date(this.tripForm.value.endDate),
        name: this.tripForm.value.name,
        userId: 1 // iNTEGRAR auth
      };

      this.tripService.addTrip(newTrip).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/userpanel']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Error al agregar el viaje:', err);
        }
      });
    }
  }
}
