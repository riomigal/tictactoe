import Rectangle from './Rectangle';
import Player from './Player';
import { drawShape, checkGame, reverseIndex } from './helpers/index';

// Canvas Board
const canvas = document.getElementById('game-board');
// Symbol Selection
const symbols = ['CIRCLE', 'X'];
let rectangles = [];
// Start BTN
const startBtn = document.getElementById('game-start-btn');

const players = [];

// 1. Read Player Data
players.push(new Player(prompt('Insert name for player 1'), symbols[0]));
players.push(new Player(prompt('Insert name for player 2'), symbols[1]));

// Get Player DOM Elements
const player1Name = document.getElementById('player1-name');
const player2Name = document.getElementById('player2-name');
const player1Won = document.querySelector('#player1-won');
const player2Won = document.querySelector('#player2-won');

// MessageBox
const messageBox = document.getElementById('messageBox');

/* const player1Name = document.getElementById('player-1-name'); */

/**
 * Generate Rectangles Size and push to array
 * @param {*} context
 */
function generateRectangles(context) {
  const rectangleWidth = context.canvas.clientHeight / 3;
  const rectangleHeight = context.canvas.clientWidth / 3;

  if (rectangles.length > 0) {
    context.clearRect(0, 0, 300, 300);
    rectangles = [];
  }
  let y;
  let x;
  for (let i = 1; i < 10; i += 1) {
    if (i <= 3) {
      y = 0;
      x = rectangleWidth * i - rectangleWidth;
    } else if (i <= 6) {
      y = rectangleHeight;
      x = rectangleWidth * (i - 4);
    } else {
      y = rectangleHeight * 2;
      x = rectangleWidth * (i - 7);
    }
    rectangles.push(new Rectangle(rectangleWidth, rectangleHeight, i, y, x));

    drawShape(context, 'SQUARE', x, y, rectangleWidth, rectangleHeight, 'black');
  }

  return rectangles;
}

/**
 * Draw initial board
 * @param {*} context
 */
function draw(context) {
  return generateRectangles(context);
}

/**
 * Start Turn
 * @param {*} players
 * @param {*} rectangles
 */
function turn(target, context, playerIndex) {
  let flag = false;
  rectangles.forEach((item) => {
    if (target.offsetY > item.getPosY() && target.offsetY < item.getPosY() + item.getHeight() && target.offsetX > item.getPosX() && target.offsetX < item.getPosX() + item.getWidth()) {
      if (item.getChecked() === false) {
        item.setChecked(true);
        item.setValue(players[playerIndex].getSymbol());
        drawShape(context, players[playerIndex].getSymbol(), item.getPosX(), item.getPosY(), item.getWidth(), item.getHeight(), 'red');
        const text = checkGame(rectangles, players[playerIndex]);

        if (text === 'WON') {
          messageBox.innerHTML = `${players[playerIndex].getName()} wins!`;
          const looser = reverseIndex(playerIndex);
          players[playerIndex].setWon();
          players[looser].setLost();

          if (playerIndex === 0) {
            player1Won.innerHTML = players[playerIndex].getWon();
          }
          if (playerIndex === 1) {
            player2Won.innerHTML = players[playerIndex].getWon();
          }
          flag = true;
        }
        if (text === 'DRAW') {
          messageBox.innerHTML = `Draw!`;
          flag = true;
        }
      }
    }
    return flag;
  });
  return flag;
}

/**
 * start Game
 */
function init() {
  // Reset Fields
  startBtn.style.display = 'none';
  messageBox.innerHTML = '';

  player1Name.innerHTML = `${players[0].getName()} ${players[0].getSymbol()}`;
  player2Name.innerHTML = `${players[1].getName()} ${players[1].getSymbol()}`;

  // 2. Check if Canvas is supported by the browser
  if (canvas.getContext) {
    // 3. Create new canvas context
    const context = canvas.getContext('2d');

    // 4. Create and draw rectangles
    rectangles = draw(context);

    // 5. Generate Player Index (0 or 1) to generate who starts
    let playerIndex = Number(Math.random().toFixed(0));
    console.log(playerIndex);
    alert(`${players[playerIndex].getName()} starts to play!`);

    // 6. Listen to clicks in canvas
    canvas.addEventListener('click', function startCheck(target) {
      // Run turn and if game is over remove Event Listener in canvas
      const flag = turn(target, context, playerIndex);
      if (flag === true) {
        canvas.removeEventListener('click', startCheck);
        startBtn.style.display = 'block';
      }
      // Reverse Index to switch Player
      playerIndex = reverseIndex(playerIndex);
    });
  } else {
    alert('This browser doesnt support the app.');
  }
}

// Start game
startBtn.addEventListener('click', init);
