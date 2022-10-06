import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  public onSubmit(): void {
    this.authService.authLogin(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
    );
  }
}
