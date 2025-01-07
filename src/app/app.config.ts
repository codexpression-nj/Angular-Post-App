import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import {provideAuth,getAuth} from '@angular/fire/auth';
import { provideFirebaseApp ,initializeApp} from '@angular/fire/app';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDnVbRrZhhECDn0P8XJW3mXrkIkeX-NKu4",
  authDomain: "practiceset-e8b66.firebaseapp.com",
  projectId: "practiceset-e8b66",
  storageBucket: "practiceset-e8b66.firebasestorage.app",
  messagingSenderId: "791178074598",
  appId: "1:791178074598:web:c2ee9e4cfb216fed6ade27",
  measurementId: "G-RZJ6ERKWHQ"
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(), provideClientHydration(), 
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
     provideAnimationsAsync()
  ]
};
