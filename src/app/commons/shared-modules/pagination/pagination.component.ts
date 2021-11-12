import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  public page: number = 1;

  @Input()
  public collectionSize: number;

  @Input()
  public pageSize: number;

  @Input()
  public maxSize: number;

  @Output()
  public currentPageClick: EventEmitter<any>;

  constructor() {
    this.collectionSize = 1;
    this.pageSize = 10;
    this.maxSize = 3;
    this.currentPageClick = new EventEmitter<any>();
  }

  public getCurrentPageIndex() {
    this.currentPageClick.emit(this.page);
  }
}
