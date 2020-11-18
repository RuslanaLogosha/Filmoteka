import modalFilmCard from "../templates/modalFilmCard.hbs";

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

// открытие модалки

function openModal(e) {

  const instance = basicLightbox.create(
     document.querySelector('.movie-card')
  );

  instance.show();

  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(e) {
    e.code === 'Escape' && instance.close();

    window.removeEventListener('keydown', closeModalHandler);
  }
}

const cardСolection = document.querySelector('.card__colection');
cardСolection.addEventListener('click', openModal);



const refs = {
  modalCard: document.querySelector('.movie-card'),
};
 function insertCardItems(film) {
    const copyFilm = { ...film};
    const markup = modalFilmCard(copyFilm);

    refs.modalCard.insertAdjacentHTML('beforeend', markup);
}
  
insertCardItems();



