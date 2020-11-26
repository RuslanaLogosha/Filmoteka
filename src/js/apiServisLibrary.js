import getCheckedLiblary from './getCheckedLiblary';
import localStorageApi from './localStorageApi';
import placeholder from './spinner';
import myLibraryMarkup from './myLibraryMarkup';
import { renderPagination } from './pagination';

const BASE_URL = `https://api.themoviedb.org/3`;
const KEY = `d91911ebb88751cf9e5c4b8fdf4412c9`;

const apiServisLibrary = {

        //возвращает промис с массивом объектов фильмов <-- принимает массив Айдишников
    async fetchMoviesById(idList) { 
        const key = 'd91911ebb88751cf9e5c4b8fdf4412c9';

        const promises = idList.map(id => {
            const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`;
            return fetch(url)
            .then(r => r.json())
            .then(data => ({
                ...data,
                release_date: data.release_date.split('-')[0],
            }));
        });

        return await Promise.all(promises);
    },

    // pagination

// renders main (first) page = renderMovies

// function for insertion of markup = myLibraryMarkup.renderCardList(moviesArray)

// renders movies by appropriate page
    displayLibList(wrapper, page) {
        wrapper.innerHTML = '';
        this.fetchLibFilmsByPage(page).catch(err => {
            console.log('error in function displayList');
        });
    },
    
// fetches movies by appropriate page
    fetchLibFilmsByPage(page) {
        const key = getCheckedLiblary();
        const idList = localStorageApi.getMovies(key);

        const requiredPageIdList = idList.slice(
            (page - 1) * 20,
            (page - 1) * 20 + 20,
        );

        placeholder.spinner.show();
        return this.fetchMoviesById(requiredPageIdList).then(moviesArray => {
            myLibraryMarkup.renderCardList(moviesArray);
            placeholder.spinner.close();
        });
    },

// renders pagination for main (first) fetch // оставить рендер пагинации
     fetchDataOfLibFilms() {
        const totalLibPages = Math.ceil(
            localStorageApi.getMovies(getCheckedLiblary()).length / 20,
        );

        renderPagination(totalLibPages, null, this.displayLibList.bind(this));
    },

}

export default apiServisLibrary;