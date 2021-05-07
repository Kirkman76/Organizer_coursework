import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListsService } from '../lists.service';
import { List } from '../models/list.model';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists: List[]

  constructor(
    private listsService: ListsService,
    private router: Router) { }

  ngOnInit() {
    this.initLists();
  }

  initLists(): void {
    this.listsService.getLists$()
    .subscribe(result => {this.lists = result},
      error => this.lists = []);
  }

  editList(id: string){
    this.router.navigate(['/details'], {queryParams: {listId: id}});
  }

  deleteList(id: string){
    this.listsService.delList$(id)
    .subscribe(() => this.initLists())
  }
}
