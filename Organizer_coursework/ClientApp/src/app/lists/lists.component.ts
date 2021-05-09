import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListsService } from '../lists.service';
import { List } from '../models/list.model';
import { MatDialog } from '@angular/material/dialog';
import { DelDialogComponent } from '../del-dialog/del-dialog.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists: List[];
  openDialog: boolean = false;

  constructor(
    private listsService: ListsService,
    private router: Router,
    private dialog: MatDialog) { }

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

  delConfirmDialog(id: string): void{
    const delDialog = this.dialog.open(DelDialogComponent, {
      data: id
    });

    delDialog.afterClosed().subscribe(result => {
      if (result != null)
      this.listsService.delList$(result)
    .subscribe(() => this.initLists())
    });
  }
}
