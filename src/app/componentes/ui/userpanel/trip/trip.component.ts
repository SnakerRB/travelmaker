import { Component, OnInit } from '@angular/core';
import { Trip } from '../../../../inerfaces/trip';
import { Note } from '../../../../inerfaces/note';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { TripService } from '../../../../servicios/trip-service.service';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})

export class TripComponent implements OnInit {
  trip: Trip | null = null;
  notes: Note[] = [];
  newNoteTitle: string = '';
  newNoteDescription: string = '';
  newNoteContent: string = ''; 
  noteForm = new FormGroup({
    newNoteTitle: new FormControl(''),
    newNoteDescription: new FormControl(''),
    newNoteContent: new FormControl(''),
  });

  constructor(private route: ActivatedRoute, private router: Router, private tripService: TripService, private firestore: Firestore) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.trip = navigation.extras.state['trip'];
    }
   }

   ngOnInit(): void {
    if (this.trip) {
      console.log('Trip ID:', this.trip.id);
      console.log('Trip Data:', this.trip);
  
      if (this.trip.id) {
        this.tripService.getNotesByTripId(this.trip.id, this.firestore).subscribe(
          (notes) => {
            this.notes = notes;
            console.log('Notas obtenidas:', this.notes); // 🔍 Verifica si las notas llegan correctamente
          },
          (error) => {
            console.error('Error fetching notes:', error);
          }
        );
      }
    }
  }

  async addNote(): Promise<void> {
    if (this.trip && this.trip.id) {
      try {
        const newNote: Note = {
          id: (this.notes.length > 0 ? Math.max(...this.notes.map(note => parseInt(note.id))) + 1 : 1).toString(),
          title: this.noteForm.value.newNoteTitle?.trim() || 'Sin título',
          description: this.noteForm.value.newNoteDescription?.trim() || 'Sin descripción',
          content: this.noteForm.value.newNoteContent?.trim() || 'Sin contenido'
        };

        await this.tripService.addNoteToTrip(this.trip.id, newNote, this.firestore);
        this.notes.push(newNote);
        console.log('Nueva nota agregada:', newNote); // 🔍 Verifica si la nota se agrega correctamente
        this.noteForm.reset();
      } catch (error) {
        console.error("Error adding note:", error);
      }
    } else {
      console.error("Trip or Trip ID is undefined");
    }
  }

  goBack(): void {
    this.router.navigate(['/userpanel']);
  }
}
