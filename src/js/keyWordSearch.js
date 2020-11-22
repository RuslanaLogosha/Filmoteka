import filmsCardTpl from '../templates/card-films.hbs';
import { renderPagination } from './pagination';
import ApiService from './apiServis';
import placeholder from './spinner';
import trailer from './trailers.js';
import errorUrl from '../images/catch-error-pagination.jpg';
import * as cardFetch from './cardFetc';

const refs = {
  searchForm: document.querySelector('#search-form'),
  cardContainer: document.querySelector('.js-card'),
  warningField: document.querySelector('.js-warning'),
  searchResField: document.querySelector('.js-search-results'),
};
const filmApiService = new ApiService();
const listElement = document.querySelector('.js-card');

refs.searchForm.addEventListener('submit', onKeyWordSearch);

function onKeyWordSearch(e) {
  filmApiService.pageNum = 1;
  placeholder.spinner.show();
  e.preventDefault();
  filmApiService.query = e.currentTarget.elements.query.value;
  if (filmApiService.query === '') {
    placeholder.spinner.close();
    refs.searchResField.textContent = '';
    refs.warningField.textContent = `Please write something in the box :)`;
    return;
  }

  render(filmApiService.query);
  fetchDataOfSearchFilms(filmApiService.query);
  e.currentTarget.elements.query.value = '';
  refs.warningField.textContent = '';
}

// renders main (first) page after search *on submit*
function render(searchQuery) {
  filmApiService.query = searchQuery;
  filmApiService
    .insertGenresToSearchObj()
    .then(renderFilmsCard)
    .catch(err => {
      console.log('error in function render');
      listElement.innerHTML = `<img class="catch-error-pagination" src="${errorUrl}" />`;
    });
}

// function for insertion of markup
function renderFilmsCard(articles) {
  listElement.innerHTML = filmsCardTpl(articles);
  trailer.createTrailerLink(document.querySelectorAll('.btn-youtube'));
}

// renders movies by appropriate page & search query
function displaySearchListByPage(wrapper, page, searchQuery) {
  wrapper.innerHTML = '';
  fetchSearchFilmsByPage(page, searchQuery)
    .then(renderFilmsCard)
    .catch(err => {
      console.log('error in function displaySearchListByPage');
      listElement.innerHTML = `<img class="catch-error-pagination" src="${errorUrl}" />`;
    });
}

// renders pagination for main (first) fetch
function fetchDataOfSearchFilms(searchQuery) {
  filmApiService.query = searchQuery;

  filmApiService
    .fetchSearchArticlesPages()
    .then(results => {
      renderPagination(
        results.total_pages,
        results.results,
        displaySearchListByPage,
        searchQuery,
      );
      if (results.total_pages === 0) {
        placeholder.spinner.close();
        refs.warningField.textContent = `Sorry, there no results found. Try searching for something else!`;
        refs.searchResField.textContent = '';
        cardFetch.renderOnSearchMistake();
        cardFetch.fetchDataOfPopularFilms();
        return;
      }
      refs.searchResField.textContent = `Yay! We found ${results.total_results} results on request "${searchQuery}"!`;
      refs.searchResField.style.color = '#818181';
    })
    .catch(err => {
      console.log('error in function fetchDataOfSearchFilms');
      listElement.innerHTML = `<img class="catch-error-pagination" src="${errorUrl}" />`;
    });
}

// fetches search queries by appropriate page & search query
function fetchSearchFilmsByPage(page, searchQuery) {
  filmApiService.pageNum = page;
  filmApiService.query = searchQuery;
  return filmApiService.insertGenresToSearchObj();
}
