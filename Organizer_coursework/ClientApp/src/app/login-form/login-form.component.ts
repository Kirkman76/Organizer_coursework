import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginUser } from '../models/login-user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginFormGroup: FormGroup;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  tryLogin(): void {
    let loginUser: LoginUser = {
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value
    }

    this.authService.getToken$(loginUser)
    .subscribe(res => {
      this.router.navigate(['lists']);
    },
    error => {
      alert("Неверный логин или пароль!");
    });
  }

  logout(): void {
    this.authService.logout();
  }

  isLogged(): boolean {
    return this.authService.isAuthenticated();
  }

  buildForm(): void {
    this.emailFormControl = new FormControl('',[
      Validators.required,
      Validators.email
    ])

    this.passwordFormControl = new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])

    this.loginFormGroup = new FormGroup({
      emailFormControl: this.emailFormControl,
      passwordFormControl: this.passwordFormControl
    })
  }
}
