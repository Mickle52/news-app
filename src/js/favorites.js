export const testFunc = () => {
  const foundNewsContainer = document.getElementById("founded-news");
  const favNewsContainer = document.getElementById("favorites-news");
  const favHeadBtn = document.getElementById("favorites-button");
  const mainContainer = document.getElementById("main__inner");
  const searchTest = document.getElementById("search");
  const favoritesStatus = document.getElementById("favorites__status");
  const foundNewsStatus = document.getElementById("founded-news-status");

  let favArr = [];
  // const testGet = JSON.parse(localStorage.getItem("testHTML"));

  function refreshDeletedIndex() {
    for (let i = 0; i < favNewsContainer.children.length; i++) {
      const deleteBtn = favNewsContainer.children[i].children[2].children[1];
      deleteBtn.innerText = "УДАЛИТЬ";
      deleteBtn.id = `delete-article-${i}`;
      console.log(deleteBtn);
    }
  }

  searchTest.addEventListener("click", (event) => {
    if (event.target.id === "delete-alert-window") {
      event.target.parentElement.remove();
    }
  });

  foundNewsContainer.addEventListener("click", (event) => {
    if (event.target.className === "article-button") {
      const favArticle = event.target.parentElement.parentElement.outerHTML;
      favArr.push(favArticle);
      // const favArticle2 =
      //   event.target.parentElement.parentElement.children[2].children[1];
      // выше нахожу кнопку в избранное
      console.log(favArr);
      localStorage.setItem("testHTML", JSON.stringify(favArr));
      event.target.innerText = "В ИЗБРАННОМ";
      event.target.disabled = true;
      event.target.style.opacity = "0.4";
      // favNewsContainer.insertAdjacentHTML("beforeend", favArticle);
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

      if (favArr.length === 0) {
        favoritesStatus.style.display = "flex";
      }
    } else if (favHeadBtn.innerText === "НАЗАД") {
      favHeadBtn.innerText = "ИЗБРАННОЕ";
      mainContainer.style.display = "block";
      favNewsContainer.style.display = "none";
      favoritesStatus.style.display = "none";

      if (foundNewsContainer.children.length === 0) {
        foundNewsStatus.style.display = "flex";
      }
    }
  });
};
