import Glide from '@glidejs/glide';
import filmsCardSliderTpl from '../templates/card-films-slider.hbs';
import createTrailerLink from './trailers.js';
const sliderContainer = document.querySelector('.js-slider-container');
renderTrendy();

const glide = new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  focusAt: 'center',
  perView: 8,
  autoplay: 2000,
  hoverpause: true,
  bound: true,
  peek: '200px',
});

glide.mount();

function renderTrendy() {
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=d91911ebb88751cf9e5c4b8fdf4412c9`;
  return fetch(url)
    .then(response => response.json())
    .then(({ results }) => {
      return results;
    })
    .then(renderSliderFilms)
    .catch(err => {
      sliderContainer.innerHTML = `<img class="catch-error-pagination" src="${errorUrl}" />`;
    });
}

function renderSliderFilms(articles) {
  sliderContainer.innerHTML = filmsCardSliderTpl(articles);
}
