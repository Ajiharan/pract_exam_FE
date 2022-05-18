import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() onChangeFunc = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  onChange(event: any) {
    this.onChangeFunc.emit(event);
  }
}
