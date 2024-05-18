setTimeout(loading, 5000); //2 seconds mag di-display
function loading(){
  var luading = document.getElementById("loadin");
  luading.classList.add("hidden");
}

setTimeout(gim, 5000); //5 seconds lalabas ang game-container1
function gim(){
  var laro = document.getElementById("game-container1");
  laro.style.display = "block";
}

setTimeout(uras, 5000); //1 second ito lalabas
function uras(){
  var owras = document.getElementById("timer");
  owras.style.display = "block";
}

var gamesData = [ //(start of code)
  {
    containerId: 'game-container1',
    targetWords: ['Hippopotomonstrosesquippedaliophobia'],
    gameFunction: startGame,
    nextContainerId: 'game-container2'
  },
  {
    containerId: 'game-container2',
    targetWords: ['Pneumonoultramicroscopicsilicovolcanoconiosis'],
    gameFunction: startGame,
    nextContainerId: 'game-container3'
  },
  {
    containerId: 'game-container3',
    targetWords: ['Aequeosalinocalcalinoceraceoaluminosocupreovitriolic'],
    gameFunction: startGame,
    nextContainerId: 'game-container5'
  }
]; //end of code

function playGame(gameData){ //(start of code)
  var gameContainer = document.getElementById(gameData.containerId);

  gameData.targetWords.forEach(word => {
    createInputFieldForGame(word, gameContainer);
  });

  focusOnFirstInputForGame(gameContainer);

  gameData.gameFunction(gameContainer, gameData.nextContainerId);
}
function createParagraphForGame(word, container){
  var paragraph = document.createElement('p');
  paragraph.textContent = word;
  container.appendChild(paragraph);
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
function focusOnFirstInputForGame(container){
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
});
function moveFocusToNextInputForGame(currentInput){
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
}
function checkGameCompletionForGame(gameData){
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

    if (gameData.containerId === 'game-container3') {
      document.getElementById('congratulations').style.display = 'block';
      document.getElementById("shortP").style.display = 'block';
      clearInterval(countdownInterval);
      timerDisplay.style.display = 'none';
      document.getElementById('game-over').style.display = 'none';
    }
  }
}  //end of code

function restartGame(){ //(start of code)
  resetGame();

  var gameContainerTwo = document.getElementById('game-container1');
  var gTimer = document.getElementById("timer");

  gameContainerTwo.style.display = 'inline-block';
  gTimer.style.display = "block";

  startCountdown();
}
function resetGame(){
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

const durationInSeconds = 60; //(start of code)
var timeLeft = durationInSeconds;
var countdownInterval;

var timerDisplay = document.getElementById('timer');
var contentDisplay = document.getElementById('game-container1');
var contentDisplay2 = document.getElementById('game-container2');
var contentDisplay3 = document.getElementById('game-container3');
var contentDisplay10 = document.getElementById('game-over');
var contentDisplay11 = document.getElementById('retryButton');

function startCountdown() {
  countdownInterval = setInterval(() => {
    if (timeLeft === 0) {
      clearInterval(countdownInterval);
      timerDisplay.style.display = 'none';
      contentDisplay.style.display = 'none';
      contentDisplay2.style.display = 'none';
      contentDisplay3.style.display = 'none';
      contentDisplay10.style.display = 'block';
      contentDisplay11.style.display = 'inline-block';
    } else {
      timeLeft--;
      updateTimer(); 
    }
  }, 1000);
} //end of code

function updateTimer(){ //(start of code)
  timerDisplay.textContent = formatTime(timeLeft);
}
function formatTime(seconds){
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
function checkTimerStart(){
  if (timerDisplay.style.display === 'block' && !countdownInterval) {
    startCountdown(); 
  }
}

var timerDisplayObserver = new MutationObserver(checkTimerStart);
timerDisplayObserver.observe(timerDisplay, { attributes: true });

checkTimerStart(); //end of code