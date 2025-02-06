import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "travelmaker-5f602", appId: "1:997722182721:web:4fa9c0cdc63641731ea2c0", storageBucket: "travelmaker-5f602.firebasestorage.app", apiKey: "AIzaSyDYonji-Vq4ug-YS_0mx1wPnGArkhqHKNM", authDomain: "travelmaker-5f602.firebaseapp.com", messagingSenderId: "997722182721" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
