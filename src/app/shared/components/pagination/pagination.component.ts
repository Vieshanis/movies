import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  @Input() totalPages = 1;
  @Input() page = 1;
  @Output() changePage = new EventEmitter<number>();

  public pager = {
    pages: Array(this.totalPages).fill(0).map((x, i) => i + 1),
    currentPage: 1
  };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalPages &&
      changes.totalPages.previousValue !== changes.totalPages.currentValue) {
      this.createPages();
    }

    if (changes.page &&
      changes.page.previousValue &&
      changes.page.previousValue !== changes.page.currentValue &&
      this.pager.currentPage !== changes.page.currentValue) {
      this.pager.currentPage = changes.page.currentValue;
      this.createPages();
    }
  }

  public setPage(page: number): void {
    if (page > 0 && page <= this.totalPages && page !== this.pager.currentPage) {
      this.pager.currentPage = page;
      this.createPages();
      this.changePage.next(page);
    }
  }

  private createPages(): void {
    if (this.pager.currentPage > 3) {
      if (this.pager.currentPage < this.totalPages - 1) {
        this.pager.pages = Array(5).fill(0).map((x, i) => i + this.pager.currentPage - 2);
      }
    } else {
      this.pager.pages = Array(this.totalPages > 5 ? 5 : this.totalPages).fill(0).map((x, i) => i + 1);
    }
  }

}
