import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()

export class PaginatorTranslation extends MatPaginatorIntl {
  constructor() {
    super();
  }

  override itemsPerPageLabel = 'Items por página';
  override nextPageLabel = 'Página siguiente';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {

    if (!length) {
      return `0 de 0`;
    }

    const firstItemPage = page * pageSize;
    const lastItemPage = firstItemPage < length
      ? Math.min(firstItemPage + pageSize , length)
      : firstItemPage + pageSize;

    const currentPage = `Página ${page + 1} de ${Math.trunc(length / pageSize)}`;
    const showingRows = `Items ${firstItemPage + 1} al ${lastItemPage} de ${length}`;

    return `${currentPage} - ${showingRows}`;
  }

}
