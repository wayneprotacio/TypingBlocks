setTimeout(loading, 2000); //2 seconds mag di-display
function loading(){
  var load = document.getElementById("firstload");
  load.classList.add("hidden");
}

setTimeout(howTo, 2000); //after 2 seconds ay lalabas ito
function howTo(){
  var paano = document.getElementById("guide");
  paano.style.display = "block";
}

function next(){ //kapag pinindot ay (try it button)
  document.getElementById("next").style.display = "none"; //mawawala ang next button
  document.getElementById("guide").style.display = "none"; //mawawala ang guide
  document.getElementById("game-containerOne").style.display = "block" //lalabas ang game-container
  document.getElementById("start").style.display = "inline-block"; //lalabas ang start button
}

var umpisa = document.getElementById("start"); //start of code
var guardian = document.getElementById("howTo"); 
var laro = document.getElementById("game-containerTwo");
var laro2 = document.getElementById("game-containerOne");
var luding = document.getElementById("loading");
var orasan = document.getElementById("timer");

umpisa.addEventListener("click", function(){ //after pindutin ang start button
  guardian.style.display = "block"; //lalabas ang how to type guide
  luding.style.display = "block"; //lalabas ang loading
  laro2.style.display = "none"; //mawawala ang unang game-container
  umpisa.style.display = "none"; //mawawala ang start button
  
  setTimeout(function(){ //after naman ng 7 seconds
    guardian.style.display = "none"; //mawawala ang guide at
    luding.style.display = "none"; //mawawala ang loadingGuide
    laro.style.display = "block"; //lalabas ang game-container two
    orasan.style.display = "block"; //lalabas ang timer
  }, 7000);
}); //end of code


var gameContainer = document.getElementById('game-containerOne'); //game-container one (start of code)
var targetWords = ['&', '#', '!'];

function createInputField(word){
  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.placeholder = word;
  inputField.dataset.targetWord = word;
  inputField.setAttribute('autocomplete', 'off');
  gameContainer.appendChild(inputField);
}
function game(){
  targetWords.forEach(word => {
    createInputField(word);
  });
  focusOnFirstInput();
}
function focusOnFirstInput(){
  const firstInput = gameContainer.querySelector('input');
  if (firstInput) {
    firstInput.focus();
  }
}
function checkInput(inputField){
  const userInput = inputField.value.trim();
  const targetWord = inputField.dataset.targetWord;

  if (userInput === targetWord) {
    inputField.classList.add('correct');
    inputField.setAttribute('readonly', 'readonly');
    setTimeout(() => moveFocusToNextInput(inputField), 100);
    checkGameCompletion();
  } else {
    inputField.classList.remove('correct');
  }
}
function moveFocusToNextInput(currentInput){
  const nextInput = currentInput.nextElementSibling;
  if (nextInput) {
    nextInput.focus();
  }
}
gameContainer.addEventListener('input', function (event) { 
  if (event.target.tagName === 'INPUT') {
    checkInput(event.target);  
  }
});
game(); //end of code

var gamesData = [ //(start of code)
  {
    containerId: 'game-containerTwo',
    targetWords: ['<>', '()', '//', '""'],
    gameFunction: startGame,
    nextContainerId: 'game-container3'
  },
  {
    containerId: 'game-container3',
    targetWords: ['==', '--', '&&', '++', '^^'],
    gameFunction: startGame,
    nextContainerId: 'game-container4'
  },
  {
    containerId: 'game-container4',
    targetWords: ['@@', '..', '$$', '??', '||'],
    gameFunction: startGame,
    nextContainerId: 'game-container5'
  },
  {
    containerId: 'game-container5',
    targetWords: ['!!', '%%', '**', '::', '~~'],
    gameFunction: startGame,
    nextContainerId: 'game-container6'
  },
  {
    containerId: 'game-container6',
    targetWords: ['^^', ';:', '[]', '{}', '??'],
    gameFunction: startGame,
    nextContainerId: 'game-container7'
  },
  {
    containerId: 'game-container7',
    targetWords: ['<<', '>>', ',,', ';;', '||'],
    gameFunction: startGame,
    nextContainerId: 'game-container8'
  },
  {
    containerId: 'game-container8',
    targetWords: ['``', '<>', '><', ')(', '}{'],
    gameFunction: startGame,
    nextContainerId: 'game-container9'
  },
  {
    containerId: 'game-container9',
    targetWords: ['][', '$$', '##', '@@', '%%'],
    gameFunction: startGame,
    nextContainerId: 'game-container10'
  },
  {
    containerId: 'game-container10',
    targetWords: ['+=', '-+', '=-', ')(', '[]'],
    gameFunction: startGame,
    nextContainerId: 'game-container11'
  },
]; //end of code

function playGame(gameData) { //(start of code)
  var gameContainer = document.getElementById(gameData.containerId);

  gameData.targetWords.forEach(word => {
    createInputFieldForGame(word, gameContainer);
  });

  focusOnFirstInputForGame(gameContainer);

  gameData.gameFunction(gameContainer, gameData.nextContainerId);
}
function createInputFieldForGame(word, container){
  var inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.placeholder = word;
  inputField.dataset.targetWord = word;
  inputField.setAttribute('autocomplete', 'off');
  inputField.addEventListener('input', function(event) {
    var userInput = inputField.value.trim();
    var targetWord = inputField.dataset.targetWord;

    if (userInput === targetWord) {
      inputField.classList.add('correct');
      inputField.setAttribute('readonly', 'readonly');
      setTimeout(() => moveFocusToNextInputForGame(inputField), 100);
    } else {
      inputField.classList.remove('correct');
    }
  });
  container.appendChild(inputField);
}
function focusOnFirstInputForGame(container){ // (start of code)
  var firstInput = container.querySelector('input');
  if (firstInput) {
    firstInput.focus();
  }
}
function startGame(container, nextContainerId){
  focusOnFirstInputForGame(container);

  var nextContainer = document.getElementById(nextContainerId);
  if (nextContainer) {
    nextContainer.style.display = 'none';
  }
}
gamesData.forEach(gameData => {
  playGame(gameData);
}); // end of code


function moveFocusToNextInputForGame(currentInput) { // (start of code)
  var nextInput = currentInput.nextElementSibling;
  if (nextInput) {
    nextInput.focus();
  } else {
    const container = currentInput.parentElement;
    const gameData = gamesData.find(data => data.containerId === container.id);

    if (gameData) {
      checkGameCompletionForGame(gameData);
    }
  }
} // end of code

function checkGameCompletionForGame(gameData) { // (start of code)
  var container = document.getElementById(gameData.containerId);
  var allInputs = container.querySelectorAll('input');
  var allCorrect = Array.from(allInputs).every(input => input.classList.contains('correct'));

  if (allCorrect) {
    container.style.display = 'none';

    var nextContainer = document.getElementById(gameData.nextContainerId);
    if (nextContainer) {
      nextContainer.style.display = 'inline-block';
      focusOnFirstInputForGame(nextContainer);
    }

    if (gameData.containerId === 'game-container10') {
      document.getElementById('congratulations').style.display = 'block';
      document.getElementById("nextButton").style.display = 'block';
      document.getElementById("shortP").style.display = 'block';
      document.getElementById("shortW").style.display = 'block';
      clearInterval(countdownInterval);
      timerDisplay.style.display = 'none';
      document.getElementById('game-over').style.display = 'none';
    }
  }
} //end of code

//(start code)
function restartGame() {
  resetGame();
  var gameContainerTwo = document.getElementById('game-containerTwo');
  var gTimer = document.getElementById("timer");

  gameContainerTwo.style.display = 'inline-block';
  gTimer.style.display = "block";
  startCountdown();
}

function resetGame(){ // (start of code)
  var retryButton = document.getElementById('retryButton');
  retryButton.style.display = 'none';
  var gameOverMessage = document.getElementById('game-over');
  gameOverMessage.style.display = 'none';

  var inputFields = document.querySelectorAll('input');
  inputFields.forEach(input => {
    input.value = '';
    input.classList.remove('correct');
    input.removeAttribute('readonly');
  });

  timeLeft = durationInSeconds;
  updateTimer();
} // end of code

const durationInSeconds = 50; // (start of code)
var timeLeft = durationInSeconds;
var countdownInterval;

var timerDisplay = document.getElementById('timer');
var contentDisplay = document.getElementById('game-containerTwo');
var contentDisplay2 = document.getElementById('game-container3');
var contentDisplay3 = document.getElementById('game-container4');
var contentDisplay4 = document.getElementById('game-container5');
var contentDisplay5 = document.getElementById('game-container6');
var contentDisplay6 = document.getElementById('game-container7');
var contentDisplay7 = document.getElementById('game-container8');
var contentDisplay8 = document.getElementById('game-container9');
var contentDisplay9 = document.getElementById('game-container10');
var contentDisplay10 = document.getElementById('game-over');
var contentDisplay11 = document.getElementById('retryButton');

function startCountdown(){
  countdownInterval = setInterval(() => {
    if (timeLeft === 0) {
      clearInterval(countdownInterval);
      timerDisplay.style.display = 'none';
      contentDisplay.style.display = 'none';
      contentDisplay2.style.display = 'none';
      contentDisplay3.style.display = 'none';
      contentDisplay4.style.display = 'none';
      contentDisplay5.style.display = 'none';
      contentDisplay6.style.display = 'none';
      contentDisplay7.style.display = 'none';
      contentDisplay8.style.display = 'none';
      contentDisplay9.style.display = 'none';
      contentDisplay10.style.display = 'block';
      contentDisplay11.style.display = 'inline-block';
    } else{
      timeLeft--;
      updateTimer();
    }
  }, 1000);
} //end of code

function updateTimer(){ // (start of code)
  timerDisplay.textContent = formatTime(timeLeft);
}
function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
function checkTimerStart() {
  if (timerDisplay.style.display === 'block' && !countdownInterval) {
    startCountdown();
  }
}

var timerDisplayObserver = new MutationObserver(checkTimerStart);
timerDisplayObserver.observe(timerDisplay, { attributes: true });

checkTimerStart(); //end of code