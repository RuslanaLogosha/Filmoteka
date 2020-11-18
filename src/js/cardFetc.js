import filmsCardTpl from "../templates/card-films.hbs";
import NewApiService from "./apiServis";

const refs = {
  cardContainer: document.querySelector(".js-card"),
};
const newApiService = new NewApiService();

render();

function render() {
  newApiService.fetchPopularArticles().then(renderFilmsCard);
}

function renderFilmsCard(articles) {
  refs.cardContainer.insertAdjacentHTML("beforeend", filmsCardTpl(articles));
  // console.log(filmsCardTpl(articles));
}
