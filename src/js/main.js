import "/src/css/styles.css";
import { testFunc } from "./favorites.js";

testFunc();

const originUrl = "https://newsapi.org/v2/everything?";
const apiKey = "972a777f437d4e30950e5bfc5cea08d9";
const searchNewsButton = document.getElementById("search-news-button");
const addWordButton = document.getElementById("add-word-button");
const avoidWordButton = document.getElementById("avoid-word-button");
const searchWords = document.getElementById("search__words");

const foundNewsContainer = document.getElementById("found-news");
let targetSearchWordsArray = [];

async function searchNewsBySortingFilters() {
  let targetUrl = originUrl;

  const languageSelect = document.getElementById("languages-select");
  const dateInputFrom = document.getElementById("dates-from");
  const dateInputTo = document.getElementById("dates-to");
  const sortingSelect = document.getElementById("sorting-select");
  const newsContainer = document.getElementById("found-news");
  const foundNewsStatusMain = document.getElementById("found-news-status");

  if (targetSearchWordsArray.length === 0) {
    alertEmptyArray();
    return;
  }

  if (targetSearchWordsArray.length > 0) {
    targetUrl += `q=${targetSearchWordsArray.join(" ")}&`;
  }

  if (languageSelect.value.length > 0) {
    targetUrl += `language=${languageSelect.value}&`;
  }

  if (dateInputFrom.value.length > 0) {
    targetUrl += `from=${dateInputFrom.value}&`;
  }

  if (dateInputTo.value.length > 0) {
    targetUrl += `to=${dateInputTo.value}&`;
  }

  if (sortingSelect.value.length > 0) {
    targetUrl += `sortBy=${sortingSelect.value}&`;
  }

  targetUrl += `apiKey=${apiKey}`;
  const response = await fetch(targetUrl);
  const data = await response.json();
  console.log(response);
  console.log(data);
  // console.log(data.articles[0].author);
  
  if (response.ok === true && data.articles.length > 0) {
    foundNewsStatusMain.style.display = 'none'
  }
  if (response.ok === true && data.articles.length === 0) {
    foundNewsStatusMain.style.display = 'flex'
    foundNewsStatusMain.children[0].src = './public/images/svg/nothingFound.svg'
    foundNewsStatusMain.children[1].innerText = 'ПО ЗАДАННЫМ ПАРАМЕТРАМ НИЧЕГО НЕ НАЙДЕНО :('
  }
  
  data.articles.forEach((item) => {
    const publishedDate = item.publishedAt
      .replace("T", " / ")
      .replace("Z", "")
      .slice(0, -3);
    const article = `
    <article class="news__article">
     <h3 class="news__article-title">${item.title}</h3>
     <p class="news__article-description">${item.description}</p>
     <div class="news__article-buttons">
      <a href="${item.url}" class="news__article-url" target="_blank">ПЕРЕЙТИ НА ПЕРВОИСТОЧНИК</a>
      <button type="button" class="news__article-button">В ИЗБРАННОЕ</button>
     </div>
     <div class="news__article-info">
      <span class="news__article-author">Автор: ${item.author} | <span class="news__article-source">Источник: ${item.source.name}</span></span>
      <span class="news__article-publishedDate">Дата и время публикации: ${publishedDate}</span>
     </div>
    </article>
    `;
    newsContainer.insertAdjacentHTML("beforeend", article);
  });
}

function alertEmptyArray() {
  const search = document.getElementById("search");
  const phrase = `
    <div id='alert-window'>
      <p>ТЕСТ ОКНО</p>
      <button type="button" id="delete-alert-window">ОК</button>
    </div>`;
  search.insertAdjacentHTML("afterbegin", phrase);
}

searchNewsButton.addEventListener("click", () => {
  foundNewsContainer.innerHTML = "";
  searchNewsBySortingFilters();
});

addWordButton.addEventListener("click", () => {
  const inputWord = document.getElementById("search__input");
  if (inputWord.value.length === 0) {
    return;
  }

  const addedWordsContainer = document.getElementById("added-words-container");
  const targetWord = `
    <div id="target-word-container">
      <span>+${inputWord.value}</span>
      <button id="delete-target-container-button"></button>
    </div>
    `;

  targetSearchWordsArray.push(`+${inputWord.value}`);
  addedWordsContainer.insertAdjacentHTML("beforeend", targetWord);
  console.log(targetSearchWordsArray);

  inputWord.value = "";
});

avoidWordButton.addEventListener("click", () => {
  const inputWord = document.getElementById("search__input");

  if (inputWord.value.length === 0) {
    return;
  }

  const avoidWordsContainer = document.getElementById("avoid-words-container");
  const targetWord = `
    <div id="target-word-container">
      <span>-${inputWord.value}</span>
      <button id="delete-target-container-button"></button>
    </div>
    `;

  targetSearchWordsArray.push(`-${inputWord.value}`);
  avoidWordsContainer.insertAdjacentHTML("beforeend", targetWord);
  console.log(targetSearchWordsArray);
  inputWord.value = "";
});

searchWords.addEventListener("click", (event) => {
  if (event.target.id === "delete-target-container-button") {
    const deletedIndex = targetSearchWordsArray.indexOf(
      event.target.previousElementSibling.textContent,
    );
    targetSearchWordsArray.splice(deletedIndex, 1);
    console.log(targetSearchWordsArray);
    event.target.parentElement.remove();
  }
});
