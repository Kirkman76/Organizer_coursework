import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent{

  @Input() title: string;
  @Input() description: string;
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  editList(): void {
    this.onEdit.emit();
  }

  deleteList(): void {
    this.onDelete.emit();
  }
}
