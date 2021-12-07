"use strict";

let $start = document.querySelector('#start');
let $game = document.querySelector('#game');
let $time = document.querySelector('#time');
let $result = document.querySelector('#result');
let score = 0;
let isGameStarted = false;
let $timeHeader = document.querySelector('#time-header');
let $resultHeader = document.querySelector('#result-header');
let $gameTime = document.querySelector('#game-time');
let colors = ['red', 'blue', 'green', 'yellow', 'pink'];


$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function startGame () {
    score = 0;
    setGameTime();
    $gameTime.setAttribute('disabled', 'true');
    isGameStarted = true;
    $game.style.backgroundColor = '#fff';
    $start.classList.add('hide');

    let interval = setInterval(function() {
        let time = parseFloat($time.textContent);
        
        if (time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);

    renderBox ();
}

function setGameScore () {
    $result.textContent = score.toString();
}

function setGameTime () {
    let time = +$gameTime.value;
    $time.textContent = time.toFixed(1); 
    $timeHeader.classList.remove('hide');
    $resultHeader.classList.add('hide');
}

function endGame () {
    isGameStarted = false;
    setGameScore();
    $gameTime.removeAttribute ('disabled');
    $start.classList.remove('hide');
    $game.style.backgroundColor = '#ccc';
    $game.innerHTML = '';
    $timeHeader.classList.add('hide');
    $resultHeader.classList.remove('hide');
}

function handleBoxClick (event) {
    if (!isGameStarted) {
        return;
    }
    if (event.target.dataset.box) {
        score++;
        renderBox ();
    }
}

function renderBox () {
    $game.innerHTML = '';
    
    let box = document.createElement ('div');
    let boxSize = getRandom(30, 100);
    let gameSize = $game.getBoundingClientRect();
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;
    let randomColorIndex = getRandom(0, colors.length);

    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = colors[randomColorIndex];
    box.style.borderRadius = '50px';
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');

    $game.insertAdjacentElement('afterbegin', box);
}

function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
