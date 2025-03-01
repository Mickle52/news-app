export function welcomeText() {
  const welcomeDesc = document.getElementById("welcome-description");
  const message = `'Доброго времени суток,  меня зовут Миша и я начинающий frontend-разработчик, а это один из моих pet-проектов. С его помощью вы можете найти новости по ключевым словам из множества различных источников за последний месяц, отсортировать по языку, дате публикации и ещё нескольким фильтрам. Также вы можете добавить новости в избранное(они сохранятся в локальном хранилище).'`;
  let vivod = "1";
  let testMessage = message.split("");
  let interval = 100;
  const palka = document.getElementById("welcome-inner-stick");

  for (let each of testMessage) {
    interval += Math.floor(Math.random() * 100);

    const testout = setTimeout(func1, interval);

    function func1() {
      welcomeDesc.innerText += each;
    }
  }

  const testint = setInterval(func2, 800);

  async function func2() {
    await waitFor(350);
    palka.style.background = "transparent";
    await waitFor(350);
    palka.style.background = "black";

    if (welcomeDesc.innerText.length === message.length) {
      await waitFor(3000);
      clearInterval(testint);
      palka.style.background = "transparent";
    }
  }

  function waitFor(msec) {
    return new Promise((resolve) => setTimeout(resolve, msec));
  }
}
