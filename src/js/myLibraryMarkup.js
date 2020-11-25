import cardFilmsTpl from '../templates/card-films.hbs';
import createTrailerLink from './trailers.js';
import nothingHereUrl from '../images/nothingHere.jpg';

const myLibraryMarkup = {

  cardsContainer : document.querySelector('.js-card'),
  paginationContainer: document.querySelector('.pagination__container'),
  
  renderCardList(moviesArray) {
    this.cardsContainer.innerHTML = cardFilmsTpl(moviesArray);
    createTrailerLink();
  },

  renderEmtyCardList() { 
    this.cardsContainer.innerHTML = `<img src="${nothingHereUrl}" alt="There is nothing" />`;
    this.paginationContainer.style.display = 'none';
    },

    showPagination() {
        this.paginationContainer.style.display = 'block';
 }

} 

export default myLibraryMarkup;