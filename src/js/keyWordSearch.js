const refs = {
  searchForm: document.querySelector('#search-form'),
  cardContainer: document.querySelector('.container'),
};
refs.searchForm.addEventListener('submit', onKeyWordSearch);

class apiService {
  constructor() {
    this.searchQuery = '';
  }
  fetchFilms() {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=d91911ebb88751cf9e5c4b8fdf4412c9&query=${this.searchQuery}`;
    return fetch(url).then(response => response.json());
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
const filmApiService = new apiService();
let totalPages;
function onKeyWordSearch(e) {
  e.preventDefault();
  filmApiService.query = e.currentTarget.elements.query.value;
  if (filmApiService.query === '') {
    return;
  }
  console.log(filmApiService.query);

  filmApiService.fetchFilms().then(data => {
    totalPages = data.total_pages;
    return totalPages;
  });
}
