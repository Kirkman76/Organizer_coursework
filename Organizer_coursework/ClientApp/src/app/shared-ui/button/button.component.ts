import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})


export class ButtonComponent{

  @Input() label!: string;
  @Input() type: 'Edit' | 'Delete' = 'Edit';
  @Output() onClick = new EventEmitter();

  click(){
    this.onClick.emit();
  }
}
