import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListsService } from '../lists.service';
import { AddList } from '../models/add-list.model';
import { finalize } from 'rxjs/operators'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {

  newListFormGroup: FormGroup;
  titleFormControl: FormControl;
  descriptionFormControl: FormControl;

  constructor(
    private listsService: ListsService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated())
    this.router.navigate(['']);
    this.buildForm();
  }

  addList(): void{
    let newList: AddList = {
      title: this.titleFormControl.value,
      owner: "Admin",
      description: this.descriptionFormControl.value
    };

    this.listsService.addList$(newList).pipe(
      finalize(() => this.router.navigate(['/lists']))
    ).subscribe();
  }

  buildForm(): void {
    this.titleFormControl = new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ])

    this.descriptionFormControl = new FormControl('',[
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10000)
    ])

    this.newListFormGroup = new FormGroup({
      titleFormControl: this.titleFormControl,
      descriptionFormControl: this.descriptionFormControl
    })
  }
}
