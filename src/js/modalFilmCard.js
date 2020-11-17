import '../sass/components/modalFilmCard.scss';
import modalFilmCard from "../templates/modalFilmCard.hbs";
import openModal from './modalOpen.js';

const cardСolection = document.querySelector('.card__colection');
// import nothingHere from '../images/nothingHere.jpg';

// const baseUrl = 'https://api.themoviedb.org/3';
// const apiKey = 'd91911ebb88751cf9e5c4b8fdf4412c9';

// export default {
//     fetchMovieCardApi(movieId) {
//         const movieCardPrmts = `/movie/${movieId}?api_key=${apiKey}&language=en-US`;
//         return fetch(baseUrl + movieCardPrmts)
//             .then(data => {
//                 return data;
//             })
//             .catch(error => console.log(error));
//     }
// };

const refs = {
  modalCard: document.querySelector('.js-modal'),
};
 function insertCardItems(film) {
    const copyFilm = { ...film};
    const markup = modalFilmCard(copyFilm);

    refs.modalCard.insertAdjacentHTML('beforeend', markup);
}
  
insertCardItems();


cardСolection.addEventListener('click', openModal);