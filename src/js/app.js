import Rectangle from './Rectangle';
import Player from './Player';
import { drawShape, checkGame } from './helpers/index';

// Canvas Board
const canvas = document.getElementById('game-board');
// Symbol Selection
const symbols = ['CIRCLE', 'X'];

/**
 * Generate Rectangles Size and push to array
 * @param {*} context
 */
function generateRectangles(context) {
  const rectangleWidth = context.canvas.clientHeight / 3;
  const rectangleHeight = context.canvas.clientWidth / 3;

  const rectangles = [];
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

    drawShape(context, 'SQUARE', x, y, rectangleWidth, rectangleHeight, '');
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
function turn(context, players, rectangles, playerIndex) {
  let pIndex = playerIndex;
  canvas.addEventListener('click', (target) => {
    rectangles.forEach((item) => {
      if (target.offsetY > item.getPosY() && target.offsetY < item.getPosY() + item.getHeight() && target.offsetX > item.getPosX() && target.offsetX < item.getPosX() + item.getWidth()) {
        if (item.getChecked() === false) {
          item.setChecked(true);
          item.setValue(players[pIndex].getSymbol());
          drawShape(context, players[pIndex].getSymbol(), item.getPosX(), item.getPosY(), item.getWidth(), item.getHeight(), 'red');
          const text = checkGame(rectangles, players[pIndex]);
          if (text === 'WON') alert(`${players[pIndex].getName()} wins!`);
          if (text === 'DRAW') alert(`Its a draw!`);
        }
      }
    });

    if (players.indexOf(players[pIndex]) === 0) {
      pIndex = 1;
    } else {
      pIndex = 0;
    }
    return turn(context, players, rectangles, pIndex);
  });
}

/**
 * start Game
 */
function init() {
  const players = [];
  // Read Player Data
  players.push(new Player('Saverio', symbols[0]));
  players.push(new Player('Saverio2', symbols[1]));

  if (canvas.getContext) {
    const context = canvas.getContext('2d');
    // Create and draw rectangles
    const rectangles = draw(context);

    // Generate Player Index (0 or 1) to generate who starts
    const playerIndex = Math.random().toFixed(0);
    turn(context, players, rectangles, playerIndex);
  } else {
    alert('This browser doesnt support the app.');
  }
}

// Start game
init();
