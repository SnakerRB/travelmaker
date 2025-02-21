import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, deleteDoc, getDocs, query, where, DocumentData, collectionGroup } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Trip } from '../inerfaces/trip';
import { Note } from '../inerfaces/note';

@Injectable({
  providedIn: 'root'
})

export class TripService {
  firestore: Firestore = inject(Firestore);
  private tripCollection = collection(this.firestore, 'trips');

  constructor() {
  }
  
  getTrips(userId: number): Observable<Trip[]> {
    const tripCollection = collection(this.firestore, 'trips');
    const q = query(tripCollection, where('userId', '==', userId));
    const querySnapshot = getDocs(q);

    return from(querySnapshot.then(snapshot => {
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data
        } as Trip;
      });
    }));
  }

  addTrip(trip: any): Observable<any> {
    return from(addDoc(this.tripCollection, trip));
  }

  deleteTrip(tripId: string): Observable<void> {
    const tripDoc = doc(this.firestore, `trips/${tripId}`);
    return from(deleteDoc(tripDoc));
  }

  addNoteToTrip(tripId: string, note: any, firestore: Firestore): Observable<any> {
    const notesCollection = collection(firestore, `trips/${tripId}/notes`);
    return from(addDoc(notesCollection, note));
  }
  
  getNotesByTripId(tripId: string, firestore: Firestore): Observable<Note[]> {
    const notesCollection = collection(firestore, `trips/${tripId}/notes`);
    const q = query(notesCollection);
    const querySnapshot = getDocs(q);
  
    return from(querySnapshot.then(snapshot => {
      return snapshot.docs.map(doc => {
        const data = doc.data() as Omit<Note, 'id'>;
          
        return {
          id: doc.id,
          ...data
        } as Note; 
        
      });
    }));
  } 
}
