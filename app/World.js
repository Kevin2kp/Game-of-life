import seedrandom from 'seedrandom';

export default class World {
  constructor(width, height, liveCells, seed, cellWidth, cellHeight) {

    this.width = width;
    this.height = height;
    this.liveCells = liveCells;
    this.size = width * height;
    this.seed = seed;
    this.inputBuffer = {};
    this._cellWidth = cellWidth;
    this._cellHeight = cellHeight;
  }

  reset() {

    function shuffle(arr) {
      for (let i = 0; i < width * height; i++) {
        let j = Math.floor(rng() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }

    let {liveCells, width, height} = this;
    let rng = seedrandom(this.seed || Date.now());

    let cells = this.cells = {};
    this.buffer = {};

    let positions = new Array(width * height);
    for (let i = 0; i < positions.length; i++) {
      positions[i] = i;
    }
    shuffle(positions);

    while (liveCells-- > 0 && positions.length > 0) {

      let pos = positions.pop();
      let x = pos % width;
      let y = Math.floor(pos / width);
      cells[pos] = {x, y};
    }
  }

  input(x, y) {
    x = Math.floor(x / this._cellWidth);
    y = Math.floor(y / this._cellHeight);
    this.inputBuffer[this._i(x, y)] = {x, y};
  }

  _i(x, y) {
    let w = this.width;
    let h = this.height;
    return (x % w) + w % w + (((y % h) + h) % h) * w;
  }

  get(array, x, y) {
    return array[this._i(x, y)];
  }

  set(array, x, y, value) {
    if (value === 0) {
      return;
    }

    array[this._i(x, y)] = value;
  }

  processCell(cell) {

    let neighborCount = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {

        //Neighbor x & y
        let nx = cell.x + i;
        let ny = cell.y + j;

        if (!(i === 0 && j === 0) && this.get(this.cells, nx, ny)) {
          neighborCount++;
        }
      }
    }

    let cellState = this.get(this.cells, cell.x, cell.y);
    if (cellState && (neighborCount === 2 || neighborCount === 3)) {
      this.set(this.buffer, cell.x, cell.y, cell);
    } else if (!cellState && neighborCount === 3) {
      this.set(this.buffer, cell.x, cell.y, cell);
    }
  }

  _flipBuffer() {
    this.cells = this.buffer;
    this.buffer = {};
  }

  _handleInput() {
    for (let k in this.inputBuffer) {
      this.cells[k] = this.inputBuffer[k];
      delete this.inputBuffer[k];
    }
  }

  advance() {

    this._handleInput();

    let cellsOfInterest = {};
    for (let pos in this.cells) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {

          let cell = this.cells[pos];

          //Neighbor x & y
          let x = cell.x + i;
          let y = cell.y + j;

          cellsOfInterest[this._i(x, y)] = this.get(this.cells, x, y) || {x, y};
        }
      }
    }

    for (let k in cellsOfInterest) {
      let cell = cellsOfInterest[k];
      this.processCell(cell);
    }

    this._flipBuffer();
  }

  draw(ctx, fillStyle) {

    let cellWidth = this._cellWidth;
    let cellHeight = this._cellHeight;

    if (fillStyle) {
      ctx.fillStyle = fillStyle;
    }

    for (let k in this.cells) {
      let cell = this.cells[k];
      ctx.fillRect(cell.x * cellWidth, cell.y * cellHeight, cellWidth,
          cellHeight);
    }
  }
}