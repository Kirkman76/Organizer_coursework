import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { DelDialogComponent } from '../del-dialog/del-dialog.component';
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
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog) {
      this.routeSubscription = route.queryParams
      .subscribe(params => this.listId = params['listId']);
      this.list = new List();
     }
  
  ngOnInit() {
    if (!this.authService.isAuthenticated())
    this.router.navigate(['']);
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

  delConfirmDialog(id: string): void{
    const delDialog = this.dialog.open(DelDialogComponent, {
      data: id
    });

    delDialog.afterClosed().subscribe(result => {
      if (result != null)
      this.listsService.delItem$(id).pipe(
        finalize(() => this.initList())
      )
      .subscribe();
    });
  }
}
