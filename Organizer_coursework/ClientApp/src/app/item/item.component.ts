import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent{

  @Input() itemId: string;
  @Input() title: string;
  @Input() description: string;
  @Input() deadline: string;
  @Input() checked: boolean;
  @Output() onCheck = new EventEmitter<[boolean, string]>();
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  changeStatus(): void {
    this.onCheck.emit();
  }

  editItem(): void {
    this.onEdit.emit();
  }

  deleteItem(): void {
    this.onDelete.emit();
  }
}
