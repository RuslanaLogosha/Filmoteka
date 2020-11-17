import filmsCardTpl from "../templates/card-films.hbs";

const refs = {
  cardContainet: document.querySelector(".js-card"),
};

fetch(
  `https://api.themoviedb.org/3/trending/all/day?api_key=d91911ebb88751cf9e5c4b8fdf4412c9`
)
  .then((response) => response.json())
  .then((data) => {
    renderFilmsCard(data.results.map((d) => d));
  });

renderFilmsCard(data.results.map((d) => d));
function renderFilmsCard(info) {
  const markup = filmsCardTpl(info);
  refs.cardContainet.insertAdjacentHTML("beforeend", markup);
  console.log(markup);
}
