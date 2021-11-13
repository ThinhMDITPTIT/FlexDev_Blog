import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input()
  public page: number;

  @Input()
  public collectionSize: number;

  @Input()
  public pageSize: number;

  @Input()
  public maxSize: number;

  @Input()
  public notChangeIndex: number;

  @Output()
  public currentPageClick: EventEmitter<any>;

  constructor() {
    this.page = 1;
    this.collectionSize = 1;
    this.pageSize = 10;
    this.maxSize = 3;
    this.notChangeIndex = 1;
    this.currentPageClick = new EventEmitter<any>();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!changes.page && !changes.notChangeIndex){
      this.page = 1
    }
  }

  public getCurrentPageIndex() {
    this.currentPageClick.emit(this.page);
  }
}
