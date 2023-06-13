import View from './view';
import previewView from './previewView';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMsg = 'No Bookmarks Yet, Find a Recipe and Add it 🤤';
  _successMsg = '';

  eventHandlerRender(handler)
  {
    window.addEventListener('load', handler)
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  } 
}

export default new BookmarkView();
