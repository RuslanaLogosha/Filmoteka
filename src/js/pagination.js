import filmsCardTpl from "../templates/card-films.hbs";

const listItems = [
  "Film 1",
  "Film 2",
  "Film 3",
  "Film 4",
  "Film 5",
  "Film 6",
  "Film 7",
  "Film 8",
  "Film 9",
  "Film 10",
  "Film 11",
  "Film 12",
  "Film 13",
  "Film 14",
  "Film 15",
  "Film 16",
  "Film 17",
  "Film 18",
  "Film 19",
  "Film 20",
  "Film 21",
  "Film 22",
  "Film 23",
  "Film 24",
  "Film 25",
  "Film 26",
  "Film 27",
  "Film 28",
  "Film 29",
  "Film 30",
  "Film 31",
  "Film 32",
  "Film 33",
  "Film 34",
  "Film 35",
  "Film 36",
  "Film 37",
  "Film 38",
  "Film 39",
  "Film 40",
  "Film 41",
  "Film 42",
  "Film 43",
  "Film 44",
  "Film 45",
  "Film 46",
  "Film 47",
  "Film 48",
];

// const listElement = document.getElementById("list");
const listElement = document.querySelector(".js-card");
const paginationElement = document.getElementById("pagination");
const arrowLeft = document.querySelector(".arrow_left");
const arrowRight = document.querySelector(".arrow_right");
let currentPage = 1;
const pagesOnWindow = 5;

// mobile = 4, laptop = 8, desctop = 9; 20?
let rows = 5;
const allPageCount = Math.ceil(listItems.length / rows);

function setupPagination(items, wrapper, rowsPerPage) {
  wrapper.innerHTML = "";

  let pageCount = Math.ceil(items.length / rowsPerPage);
  let maxLeftPage = currentPage - Math.floor(pagesOnWindow / 2);
  let maxRightPage = currentPage + Math.floor(pagesOnWindow / 2);

  if (maxLeftPage < 1) {
    maxLeftPage = 1;
    maxRightPage = pagesOnWindow;
  }

  if (maxRightPage > allPageCount) {
    maxLeftPage = allPageCount - (pagesOnWindow - 1);

    if (maxLeftPage < 1) {
      maxLeftPage = 1;
    }
    maxRightPage = allPageCount;
  }

  for (let i = 1; i <= allPageCount; i++) {
    if (maxLeftPage !== 1 && i == 1) {
      let btn = paginationButton(i, items);
      wrapper.appendChild(btn);
    }

    if (maxRightPage !== allPageCount && i == allPageCount) {
      let btn = paginationButton(i, items);
      wrapper.appendChild(btn);
    }

    if (i >= maxLeftPage && i <= maxRightPage) {
      let btn = paginationButton(i, items);
      wrapper.appendChild(btn);
    }

    if (
      allPageCount >= 6 &&
      i == 1 &&
      currentPage !== 1 &&
      currentPage !== 2 &&
      currentPage !== 3
    ) {
      const threeDotsEl = addThreeDotsBlock();
      wrapper.insertBefore(threeDotsEl, wrapper[wrapper.length - 2]);
    }

    if (
      pageCount >= 7 &&
      i == pageCount - 1 &&
      currentPage !== pageCount &&
      currentPage !== pageCount - 2 &&
      currentPage !== pageCount - 1
    ) {
      const threeDotsEl = addThreeDotsBlock();
      wrapper.insertBefore(threeDotsEl, wrapper[1]);
    }
  }
}

function addThreeDotsBlock() {
  const threeDots = document.createElement("div");
  threeDots.classList.add("threeDots");
  threeDots.innerText = "...";
  return threeDots;
}

function paginationButton(page, items) {
  let button = document.createElement("button");
  button.innerText = page;

  if (currentPage == page) button.classList.add("active");

  button.addEventListener("click", function () {
    currentPage = page;
    // displayList(items, listElement, rows, currentPage);

    let current_btn = document.querySelector(".pagenumbers button.active");
    current_btn.classList.remove("active");

    button.classList.add("active");
    setupPagination(listItems, paginationElement, rows);
  });

  return button;
}

function onArrowLeftClick() {
  if (currentPage > 1) {
    currentPage--;
    setupPagination(listItems, paginationElement, rows);
    // displayList(listItems, listElement, rows, currentPage);
  }
}

function onArrowRightClick() {
  if (currentPage < allPageCount) {
    currentPage++;
    setupPagination(listItems, paginationElement, rows);
    // displayList(listItems, listElement, rows, currentPage);
  }
}

setupPagination(listItems, paginationElement, rows);
arrowLeft.addEventListener("click", onArrowLeftClick);
arrowRight.addEventListener("click", onArrowRightClick);

/*
функция для добавления контента на страницу
параментры:
items = массив с данными для отрисовки
wrapper = родитель, куда полетит рендер
rowsPerPage = количество элементов на странице
page = текущая страница выбранная в pagination
*/

function displayList(items, wrapper, rowsPerPage, page) {
  wrapper.innerHTML = "";
  page--;

  let start = rowsPerPage * page;
  let end = start + rowsPerPage;

  // обрезанный массив элементов текущей страницы
  let paginatedItems = items.slice(start, end);

  for (let i = 0; i < paginatedItems.length; i++) {
    let item = paginatedItems[i];

    let itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerText = item;

    wrapper.appendChild(itemElement);
  }
}
// displayList(listItems, listElement, rows, currentPage);
