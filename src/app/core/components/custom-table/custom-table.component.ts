import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent implements OnInit {
  @Input() tableTitle = '';
  @Input() headers: any[] = [];
  @Input() data: any[] = [];
  @Input() paginationData: any = null;
  @Input() isShow = false;
  @Output() paginationFunc = new EventEmitter();
  @Output() onNameChangeFunc = new EventEmitter();
  @Output() onEditFormFunc = new EventEmitter();
  @Output() onDeleteFormFunc = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public getTableBodyRows(item: any): string[] {
    if (item?._id) {
      const { _id, ...rest } = item;
      return Object.values(rest);
    }
    return Object.values(item);
  }
  public getPaginatorData(event: any): void {
    this.paginationFunc.emit(event);
    return event;
  }
  public onNameChange(event: any): void {
    this.onNameChangeFunc.emit(event.target.value);
  }
  public deleteItem(id: string): void {
    this.onDeleteFormFunc.emit(id);
  }
  public editItem(product: any): void {
    this.onEditFormFunc.emit(product);
  }
}
