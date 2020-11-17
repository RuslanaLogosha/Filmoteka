export default class NewApiService {
  constructor() {
    this.searcgQuery = '';
  }
  fetchTrendingArticles() {
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=d91911ebb88751cf9e5c4b8fdf4412c9`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.results.map(d => d);
      });
  }
  fetchFilmsSearch() {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=d91911ebb88751cf9e5c4b8fdf4412c9&query=${searcgQuery}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.results.map(d => d);
      });
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
