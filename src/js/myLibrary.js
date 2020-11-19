import regeneratorRuntime from 'regenerator-runtime';

import nothingHereUrl from '../images/nothingHere.jpg';

import localStorageApi from './localStorageApi';
import cardFilmsTpl from '../templates/card-films.hbs';

const getMovies = async idList => {
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
};

const refs = {
  btn: document.querySelector('[name=storage-btn]'),
  cardLibrary: document.querySelector('.js-card-library'),
  watchedButton: document.querySelector('#js-WatchedButton'),
  queueButton: document.querySelector('#js-QueueButton'),
};

//Заглушка
if (refs.btn.checked) renderMovies('Watched');
localStorageApi.save('Queue', [550, 551, 552, 553, 554, 557, 558, 559]);
refs.queueButton.addEventListener('click', e => {
  renderMovies('Queue');
});
refs.watchedButton.addEventListener('click', e => {
  renderMovies('Watched');
});
//Заглушка

function renderMovies(key) {
  const queueIds = localStorageApi.getMovies(key);

  if (queueIds.length) {
    getMovies(queueIds).then(renderMarkup);
  } else {
    refs.cardLibrary.innerHTML = `<img src="${nothingHereUrl}" alt="There is nothing" />`;
  }
}
function renderMarkup(moviesArray) {
  refs.cardLibrary.innerHTML = cardFilmsTpl(moviesArray);
}
