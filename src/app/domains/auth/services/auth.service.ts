import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  public authLogin(email: string, password: string) {
    localStorage.setItem(
      'userData',
      JSON.stringify({ email: email, token: 'isLogin' })
    );
    this.router.navigate(['/books/']);
  }
}
