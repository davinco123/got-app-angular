import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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

  public authLogout() {
    localStorage.removeItem('userData');
    this.router.navigate(['auth']);
  }
}
