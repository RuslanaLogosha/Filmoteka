import filmsCardTpl from '../templates/card-films.hbs';
import regeneratorRuntime from 'regenerator-runtime';
import fetchFilmsSearch from './pagination';

const refs = {
  searchForm: document.querySelector('#search-form'),
  cardContainer: document.querySelector('.js-card'),
};
refs.searchForm.addEventListener('submit', onKeyWordSearch);

class ApiService {
  constructor() {
    this.searchQuery = '';
  }
  async fetchFilms() {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=d91911ebb88751cf9e5c4b8fdf4412c9&query=${this.searchQuery}`;
    const films = await fetch(url);
    const response = await films.json();
    return response;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
const filmApiService = new ApiService();

function onKeyWordSearch(e) {
  e.preventDefault();
  filmApiService.query = e.currentTarget.elements.query.value;
  if (filmApiService.query === '') {
    return;
  }
  console.log(filmApiService.query);

  totalPagesCount();
  onKeyWordRender();
  fetchFilmsSearch(filmApiService.query);
}

async function totalPagesCount() {
  const totalPages = await filmApiService.fetchFilms().then(data => {
    const numberOfPages = data.total_pages;
    console.log(numberOfPages);
    return totalPages;
  });
}
async function onKeyWordRender() {
  refs.cardContainer.innerHTML = '';
  const renderMovies = await filmApiService
    .fetchFilms()
    .then(({ results }) => {
      return results;
    })
    .then(appendMarkup);
}

function appendMarkup(cards) {
  refs.cardContainer.insertAdjacentHTML('beforeend', filmsCardTpl(cards));
}
