import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TripService } from '../../../servicios/trip-service.service';
import { Trip } from '../../../inerfaces/trip';

@Component({
  selector: 'app-userpanel',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './userpanel.component.html',
  styleUrl: './userpanel.component.css',
})

export class UserpanelComponent implements OnInit {
  private userId: number = 1;
  trips: Trip[] = [];

  constructor(
    private router: Router,
    private tripService: TripService
  ) {
  }

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips() {
    this.tripService.getTrips(this.userId).subscribe(trips => {
      this.trips = trips;
      this.trips.forEach(trip => {
        if (trip.startDate) {
          trip.startDate = new Date(trip.startDate.seconds * 1000);
        }
        if (trip.endDate) {
          trip.endDate = new Date(trip.endDate.seconds * 1000);
        }      });      if (trips.length === 0) {
        console.log("no hay viajes");       
      }
    });
  }

  goToNewTrip() {
    const newTrip: Trip = {
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      destination: '', 
      userId: this.userId,
    };
    this.tripService.addTrip(newTrip).subscribe(()=>{
      this.getTrips();
    });

  }

  deleteTrip(trip: Trip) {
    this.tripService.deleteTrip(trip.id!).subscribe();
    this.getTrips();
  }

  goToTrip(trip: Trip) {
    this.router.navigate([`/trip/${trip.id}`], { state: { trip: trip } });
  }
}
