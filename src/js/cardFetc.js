import filmsCardTpl from '../templates/card-films.hbs';
import NewApiService from './apiServis';

const refs = {
  cardContainet: document.querySelector('.js-card-home'),
};
const newApiService = new NewApiService();

render();

function render() {
  newApiService.fetchTrendingArticles().then(renderFilmsCard);
}

function renderFilmsCard(articles) {
  refs.cardContainet.insertAdjacentHTML('beforeend', filmsCardTpl(articles));
  // console.log(filmsCardTpl(articles));
}
