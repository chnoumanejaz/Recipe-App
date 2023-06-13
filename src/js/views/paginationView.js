import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  eventHandlerPagination(handler)
  {
    this._parentElement.addEventListener('click', function(event)
    {
        const btn = event.target.closest('.btn--inline');
        if(!btn) return;
        const gotoBtn = +btn.dataset.page;
        handler(gotoBtn)        
    })
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const noOfPages = Math.ceil(
      this._data.searches.length / this._data.resultsPerPage
    );
    
    // on page 1 and has some more pages
    if (currentPage === 1 && noOfPages > 1) {
      return `
                <button data-page = "${currentPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button> 
            `;
    }

    // on last page
    if (currentPage === noOfPages && noOfPages > 1) {
      return `    
                <button data-page = "${currentPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>        
            `;
    }

    // on other pages
    if (currentPage < noOfPages) {
      return `    
                <button data-page = "${currentPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>        
                <button data-page = "${currentPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button> 
            `;
    }
    // on page 1 and has No more pages
    return '';
  }
}

export default new PaginationView();
