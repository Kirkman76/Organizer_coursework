import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { title } from 'process';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ListsService } from '../lists.service';
import { EditItem } from '../models/edit-item.model';
import { List } from '../models/list.model';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent implements OnInit, OnDestroy {

  listId: string;
  list: List;
  routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private listsService: ListsService,
    private router: Router) {
      this.routeSubscription = route.queryParams
      .subscribe(params => this.listId = params['listId']);
      this.list = new List();
     }
  
  ngOnInit() {
    this.initList();
  }

  ngOnDestroy(): void {
    if (this.routeSubscription)
    this.routeSubscription.unsubscribe();
  }

  initList(): void {
    this.listsService.getList$(this.listId)
    .subscribe(list => {this.list = list},
      error => {this.list.records = []})
  }

  changeStatus(params: [boolean, string]){
    this.listsService.getItem$(params[1])
    .subscribe(item => {
      let body: EditItem = {
        title: item.title,
        description: item.description,
        deadline: item.deadline,
        checked: params[0]
      }
      this.listsService.editItem$(params[1], body)
      .subscribe();
    })
  }

  editItem(itemId: string){
    this.router.navigate(['/edit-item'], {queryParams: {listId: this.listId, itemId: itemId}});
  }

  deleteItem(id: string): void {
    this.listsService.delItem$(id).pipe(
      finalize(() => this.initList())
    )
    .subscribe();
  }

}
