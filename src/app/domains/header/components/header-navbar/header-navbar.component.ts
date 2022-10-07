import { Component } from '@angular/core';
import { AuthService } from 'src/app/domains/auth/services/auth.service';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss'],
})
export class HeaderNavbarComponent {
  constructor(private authSerivce: AuthService) {}

  public logout() {
    this.authSerivce.authLogout();
  }
}
