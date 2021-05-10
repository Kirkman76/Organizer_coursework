import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AddUser } from '../models/add-user.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerFormGroup: FormGroup;
  nameFormControl: FormControl;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  register(): void {
    let newUser: AddUser = {
      name: this.nameFormControl.value,
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value
    }

    this.authService.addUser$(newUser).subscribe(
      res => {
        this.router.navigate(['']);
        alert(`Новый пользователь ${newUser.name} добавлен!`)
      },
      err => {
        alert(`Пользователь с таким email уже существует!`)
      }
    )
  }

  buildForm(): void {
    this.nameFormControl = new FormControl('',[
      Validators.minLength(2),
      Validators.maxLength(30)
    ])

    this.emailFormControl = new FormControl('',[
      Validators.required,
      Validators.email
    ])

    this.passwordFormControl = new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30)
    ])

    this.registerFormGroup = new FormGroup({
      nameFormControl: this.nameFormControl,
      emailFormControl: this.emailFormControl,
      passwordFormControl: this.passwordFormControl,
    })
  }

}
