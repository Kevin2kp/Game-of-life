import Game from './Game';

let game = new Game({
  canvasWidth: 500,
  canvasHeight: 500,
  width: 50,
  height: 50,
  step: 0.1,
  liveCells: 1000,
  maxSkip: 5,
  fillStyle: '#55AA55',
});

document.querySelector('#canvasContainer').appendChild(game.canvas);

game.reset();
game.start();