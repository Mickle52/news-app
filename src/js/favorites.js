export const testFunc = () => {
  const foundNewsContainer = document.getElementById("founded-news");
  const favNewsContainer = document.getElementById("favorites-news");
  const favHeadBtn = document.getElementById("favorites-button");
  const mainContainer = document.getElementById("main__inner");
  const searchTest = document.getElementById("search");
  const favoritesStatus = document.getElementById("favorites__status");
  const foundNewsStatus = document.getElementById("founded-news-status");
  const favoritesCount = document.getElementById("favorites-count");
  const html = document.getElementsByTagName("HTML");
  let favArr = [];

  if (localStorage.getItem("testHTML") === null) {
    localStorage.setItem("testHTML", "[]");
  }

  function refreshFavoritesCount() {
    const testGet = JSON.parse(localStorage.getItem("testHTML"));
    favArr = structuredClone(testGet);
    favoritesCount.innerText = favArr.length;
  }

  function refreshDeletedIndex() {
    for (let i = 0; i < favNewsContainer.children.length; i++) {
      const deleteBtn = favNewsContainer.children[i].children[2].children[1];
      deleteBtn.innerText = "УДАЛИТЬ";
      deleteBtn.id = `delete-article-${i}`;
    }
  }

  refreshFavoritesCount();

  searchTest.addEventListener("click", (event) => {
    if (event.target.id === "delete-alert-window") {
      event.target.parentElement.remove();
    }
  });

  foundNewsContainer.addEventListener("click", (event) => {
    if (event.target.className === "article-button") {
      const favArticle = event.target.parentElement.parentElement.outerHTML;
      favArr.push(favArticle);

      localStorage.setItem("testHTML", JSON.stringify(favArr));
      event.target.innerText = "В ИЗБРАННОМ";
      event.target.disabled = true;
      event.target.style.opacity = "0.4";
      event.target.style.background = "orange";
      refreshFavoritesCount();
    }
  });

  favNewsContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      let deletedArticle = event.target.parentElement.parentElement;
      let targetID = event.target.id;
      let targetDeleteIndex = targetID.charAt(targetID.length - 1);

      favArr.splice(targetDeleteIndex, 1);
      localStorage.setItem("testHTML", JSON.stringify(favArr));
      deletedArticle.remove();
      refreshDeletedIndex();
      refreshFavoritesCount();

      if (favArr.length === 0) {
        favoritesStatus.style.display = "flex";
      }
    }
  });

  favHeadBtn.addEventListener("click", () => {
    favNewsContainer.innerHTML = "";

    const testGet = JSON.parse(localStorage.getItem("testHTML"));
    favArr = structuredClone(testGet);

    favArr.forEach((item) => {
      favNewsContainer.insertAdjacentHTML("beforeend", item);
    });
    refreshDeletedIndex();

    if (favHeadBtn.innerText === "ИЗБРАННОЕ") {
      favHeadBtn.innerText = "НАЗАД";
      favNewsContainer.style.display = "block";
      mainContainer.style.display = "none";
      foundNewsStatus.style.display = "none";
      favHeadBtn.classList.toggle("back-btn");

      if (favArr.length === 0) {
        favoritesStatus.style.display = "flex";
      }
    } else if (favHeadBtn.innerText === "НАЗАД") {
      favHeadBtn.innerText = "ИЗБРАННОЕ";
      mainContainer.style.display = "block";
      favNewsContainer.style.display = "none";
      favoritesStatus.style.display = "none";
      favHeadBtn.classList.toggle("back-btn");

      if (foundNewsContainer.children.length === 0) {
        foundNewsStatus.style.display = "flex";
      }
    }
  });
};
