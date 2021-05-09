import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ListsService } from '../lists.service';
import { EditItem } from '../models/edit-item.model';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  listId: string;
  itemId: string;
  routeSubscription: Subscription;

  editItemFormGroup: FormGroup;
  titleFormControl: FormControl;
  descriptionFormControl: FormControl;
  deadlineFormControl: FormControl;

  constructor(
    private route: ActivatedRoute,
    private listsService: ListsService,
    private router: Router) {
      this.routeSubscription = route.queryParams
      .subscribe(params => {this.listId = params['listId'],
      this.itemId = params['itemId'];});
     }

  ngOnInit() {
    this.buildForm();
    this.listsService.getItem$(this.itemId)
    .subscribe(res => {
      this.editItemFormGroup.controls
      .titleFormControl.setValue(res.title);

      this.editItemFormGroup.controls
      .descriptionFormControl.setValue(res.description);

      if (res.deadline != null){
        this.editItemFormGroup.controls
        .deadlineFormControl.setValue(res.deadline.toString().substring(0, 10));
      }
    })
  }

  editItem(){
    let editedItem: EditItem = {
      title: this.titleFormControl.value,
      description: this.descriptionFormControl.value,
      deadline: this.deadlineFormControl.value,
      checked: false
    }

    this.listsService.editItem$(this.itemId, editedItem).pipe(
      finalize(() => this.router.navigate(['/details'], {queryParams: {listId: this.listId}}))
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

    this.deadlineFormControl = new FormControl();

    this.editItemFormGroup = new FormGroup({
      titleFormControl: this.titleFormControl,
      descriptionFormControl: this.descriptionFormControl,
      deadlineFormControl: this.deadlineFormControl
    })
  }

}
