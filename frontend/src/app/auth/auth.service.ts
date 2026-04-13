import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';
import { environment } from '../../environments/environment';

const firebaseApp = getApps().length === 0
  ? initializeApp(environment.firebase)
  : getApps()[0];

const firebaseAuth = getAuth(firebaseApp);

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);

  readonly currentUser = signal<User | null>(null);

  constructor() {
    onAuthStateChanged(firebaseAuth, (user: User | null) => {
      this.currentUser.set(user);
    });
  }

  async logIn(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(firebaseAuth, provider);
    await this.router.navigate(['/']);
  }

  async logOut(): Promise<void> {
    await signOut(firebaseAuth);
    await this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  async getToken(): Promise<string | null> {
    const user = this.currentUser();
    if (!user) return null;
    return user.getIdToken();
  }
}