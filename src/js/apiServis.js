const BASE_URL = `https://api.themoviedb.org/3`;
const KEY = `d91911ebb88751cf9e5c4b8fdf4412c9`;
export default class NewApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }
  fetchTrendingArticles() {
    const url = `${BASE_URL}/trending/all/day?api_key=${KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        return results;
      });
  }
  fetchFilmsSearch() {
    const url = `${BASE_URL}/search/movie?api_key=${KEY}&query=${this.searchQuery}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        return results;
      });
  }
  fetchPopularArticles() {
    const url = `https://${BASE_URL}/movie/popular?api_key=${KEY}&language=en-US&page=${this.page}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        console.log(results);
        return results;
      });
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
