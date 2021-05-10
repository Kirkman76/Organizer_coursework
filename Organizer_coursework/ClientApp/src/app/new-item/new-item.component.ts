import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { ListsService } from '../lists.service';
import { AddItem } from '../models/add-item.model';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit, OnDestroy {

  listId: string;
  routeSubscription: Subscription;

  newItemFormGroup: FormGroup;
  titleFormControl: FormControl;
  descriptionFormControl: FormControl;
  deadlineFormControl: FormControl;

  constructor(
    private route: ActivatedRoute,
    private listsService: ListsService,
    private authService: AuthService,
    private router: Router) {
      this.routeSubscription = route.queryParams
      .subscribe(params => this.listId = params['listId']);
     }

  ngOnInit() {
    if (!this.authService.isAuthenticated())
    this.router.navigate(['']);
    this.buildForm();
  }

  ngOnDestroy(): void {
    if(this.routeSubscription)
    this.routeSubscription.unsubscribe();
  }

  addItem(): void {
    let newItem: AddItem = {
      title: this.titleFormControl.value,
      description: this.descriptionFormControl.value,
      deadline: this.deadlineFormControl.value
    }

    this.listsService.addItem$(this.listId, newItem).pipe(
      finalize(() => this.router.navigate(['details'], {queryParams: {listId: this.listId}}))
    )
    .subscribe();
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

    this.deadlineFormControl = new FormControl();

    this.newItemFormGroup = new FormGroup({
      titleFormControl: this.titleFormControl,
      descriptionFormControl: this.descriptionFormControl,
      deadlineFormControl: this.deadlineFormControl
    })
  }
}
