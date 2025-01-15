import "/src/css/styles.css";

const originUrl = "https://newsapi.org/v2/everything?";
const apiKey = "972a777f437d4e30950e5bfc5cea08d9";
const searchNewsButton = document.getElementById("search-news-button");
const addWordButton = document.getElementById("add-word-button");
const avoidWordButton = document.getElementById("avoid-word-button");
const searchWords = document.getElementById("search__words");
const searchTest = document.getElementById("search");
let targetSearchWordsArray = [];

async function searchNewsBySortingFilters() {
  let targetUrl = originUrl;

  const languageSelect = document.getElementById("languages-select");
  const dateInputFrom = document.getElementById("dates-from");
  const dateInputTo = document.getElementById("dates-to");
  const sortingSelect = document.getElementById("sorting-select");
  const newsContainer = document.getElementById("found-news");

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
  console.log(data);
  console.log(response);
  console.log(data.articles[0].author);

  data.articles.forEach((item) => {
    const publishedDate = item.publishedAt
      .replace("T", " / ")
      .replace("Z", "")
      .slice(0, -3);
    const article = `
    <article class="news__article">
\t\t\t\t\t<h3 class="news__article-title">${item.title}</h3>
\t\t\t\t\t<p class="news__article-description">${item.description}</p>
\t\t\t\t\t<div class="news__article-buttons">
\t\t\t\t\t\t<a href="${item.url}" class="news__article-url" target="_blank">ПЕРЕЙТИ НА ПЕРВОИСТОЧНИК</a>
\t\t\t\t\t\t<button type="button" class="news__article-button">В ИЗБРАННОЕ</button>
\t\t\t\t\t</div>
\t\t\t\t\t<div class="news__article-info">
\t\t\t\t\t\t<span class="news__article-author">Автор: ${item.author} | <span class="news__article-source">Источник: ${item.source.name}</span></span>
\t\t\t\t\t\t<span class="news__article-publishedDate">Дата и время публикации: ${publishedDate}</span>
\t\t\t\t\t</div>
\t\t\t\t</article>
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

searchTest.addEventListener("click", (event) => {
  if (event.target.id === "delete-alert-window") {
    event.target.parentElement.remove();
  }
});

searchNewsButton.addEventListener("click", () => {
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
