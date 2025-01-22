export function welcomeText() {
  const welcomeDesc = document.getElementById("welcome-description");
  const message = `'Тест печатной машинки и вот я пишу много чё ваще много и многооооооооооооооо'`;
  let vivod = "1";
  let testMessage = message.split("");
  let interval = 100;
  const palka = document.getElementById("inner-stick");

  for (let each of testMessage) {
    interval += Math.floor(Math.random() * 100);

    const testout = setTimeout(func1, interval);

    function func1() {
      welcomeDesc.innerText += each;
    }
  }

  const testint = setInterval(func2, 800);

  async function func2() {
    await waitFor(400);
    palka.style.color = "transparent";
    await waitFor(400);
    palka.style.color = "black";

    if (welcomeDesc.innerText.length === message.length) {
      console.log("123");
	    await waitFor(3000)
      clearInterval(testint);
	    palka.style.color = "transparent";
    }
  }

  function waitFor(msec) {
    return new Promise((resolve) => setTimeout(resolve, msec));
  }
}
