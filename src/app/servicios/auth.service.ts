import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, User, UserCredential, onAuthStateChanged } from '@angular/fire/auth';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private auth: Auth) { 
    onAuthStateChanged(this.auth, (user) => {
      this.loggedIn.next(!!user); // Update the BehaviorSubject based on auth state
    });
  }

  register({ email, password }: any): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      map((userCredential: UserCredential) => userCredential.user),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  login({ email, password }: any): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map((userCredential: UserCredential) => userCredential.user),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  loginWithGoogle(): Observable<User> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      map((userCredential: UserCredential) => userCredential.user),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
