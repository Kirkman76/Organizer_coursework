import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListsService } from '../lists.service';
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

  changeStatus(){

  }

  editItem(){

  }

  deleteItem(){
    
  }

}
