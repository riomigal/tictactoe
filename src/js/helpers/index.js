/**
 * Used to create shapes
 * @param {*} context
 * @param {*} type
 * @param {*} x
 * @param {*} y
 * @param {*} width
 * @param {*} height
 * @param {*} color

 */
function drawShape(context, type, x, y, width, height, color) {
  context.beginPath();
  context.strokeStyle = color;
  context.globalAlpha = 0.3;
  context.lineWidth = 5;
  if (type === 'SQUARE') {
    context.strokeRect(x, y, width, height);
  }
  if (type === 'CIRCLE') {
    context.arc(x + width / 2, y + height / 2, height / 2 - 3, 0, 2 * Math.PI, false);
    context.stroke();
  }
  if (type === 'X') {
    context.lineWidth = 5;
    context.globalAlpha = 0.3;
    context.moveTo(x, y);
    context.lineTo(x + width, y + height);
    context.moveTo(x + width, y);
    context.lineTo(x, y + height);
    context.stroke();
  }
}

/**
 * Check if rectangle is checked
 * @param {*} rectangle
 */
function rectIsChecked(rectangle, player = false) {
  if (rectangle.getChecked() === true && rectangle.getValue() === player.getSymbol()) return true;
  return false;
}

/**
 * Check winner or draw
 * @param {*} rectangles
 */
function checkGame(rectangles, player) {
  const WON = 'WON';
  const DRAW = 'DRAW';
  // CHECK WIN
  if (rectIsChecked(rectangles[0], player) && rectIsChecked(rectangles[1], player) && rectIsChecked(rectangles[2], player)) return WON;
  if (rectIsChecked(rectangles[3], player) && rectIsChecked(rectangles[4], player) && rectIsChecked(rectangles[5], player)) return WON;
  if (rectIsChecked(rectangles[6], player) && rectIsChecked(rectangles[7], player) && rectIsChecked(rectangles[8], player)) return WON;
  if (rectIsChecked(rectangles[0], player) && rectIsChecked(rectangles[3], player) && rectIsChecked(rectangles[6], player)) return WON;
  if (rectIsChecked(rectangles[1], player) && rectIsChecked(rectangles[4], player) && rectIsChecked(rectangles[7], player)) return WON;
  if (rectIsChecked(rectangles[2], player) && rectIsChecked(rectangles[5], player) && rectIsChecked(rectangles[8], player)) return WON;
  if (rectIsChecked(rectangles[0], player) && rectIsChecked(rectangles[4], player) && rectIsChecked(rectangles[8], player)) return WON;
  if (rectIsChecked(rectangles[2], player) && rectIsChecked(rectangles[4], player) && rectIsChecked(rectangles[6], player)) return WON;

  // CHECK DRAW
  let flag = true;
  rectangles.forEach((item) => {
    if (item.getChecked() === false) {
      flag = false;
      return false;
    }
    return true;
  });
  if (flag === true) return DRAW;
  return false;
}

/**
 * Reverse index to switch player
 * @param {*} index
 */
function reverseIndex(index) {
  if (index === 0) {
    return 1;
  }
  return 0;
}

export { drawShape, checkGame, reverseIndex };
