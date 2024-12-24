const originUrl = "https://newsapi.org/v2/everything?q=";
const apiKey = "972a777f437d4e30950e5bfc5cea08d9";
const testButton = document.getElementById("testButton");
const addWordButton = document.getElementById("add-word-button")
const avoidWordButton = document.getElementById("avoid-word-button")

let targetSearchWords = []
console.log(testButton.textContent)

async function test() {
  let targetUrl = originUrl
  
  targetUrl += '+гойда'
  
  targetUrl += `&apiKey=${apiKey}`
  const response = await fetch(targetUrl);
  const data = await response.json();
  console.log(data);
  console.log(response);
}

testButton.addEventListener("click", () => {
  test();
});

addWordButton.addEventListener('click', () => {
  const inputWord = document.getElementById('search__input')
  const addedWordsContainer = document.getElementById('added-words-container')
  const targetWord = `
    <div id="target-word-container">
      <span>+${inputWord.value}</span>
      <button id="delete-target-container-button"></button>
    </div>
    `
  
  targetSearchWords.push(`+${inputWord.value}`)
  addedWordsContainer.insertAdjacentHTML('beforeend', targetWord)
  
  inputWord.value = ''
})

avoidWordButton.addEventListener('click', () => {
  const inputWord = document.getElementById('search__input')
  const avoidWordsContainer = document.getElementById('avoid-words-container')
  const targetWord = `
    <div id="target-word-container">
      <span>-${inputWord.value}</span>
      <button id="delete-target-container-button"></button>
    </div>
    `
  
  targetSearchWords.push(`-${inputWord.value}`)
  avoidWordsContainer.insertAdjacentHTML('beforeend', targetWord)
  
  inputWord.value = ''
})

const ye = document.getElementById('search__words')
ye.addEventListener('click', (event) => {
  if (event.target.id === 'delete-target-container-button') {
    event.target.parentElement.remove()
  }
})

