import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() totalPages = 10;

  @Output() changePage = new EventEmitter<number>();

  public pager = {
    pages: Array(this.totalPages).fill(0).map((x, i) => i + 1),
    currentPage: 1
  }

  constructor() { }

  ngOnInit(): void { }

  public setPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.pager.currentPage = page;
      this.changePage.next(page);
    }
  }

}
