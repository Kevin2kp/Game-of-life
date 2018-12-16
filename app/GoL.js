import MouseListener from './MouseListener';
import World from './World';

/**
 * Hash-based implementation of Conway's Game of Life
 * @class
 */
export default class GoL {

  /**
   * @param props
   * @param props.step Time in seconds between world updates
   * @param props.fillStyle Fill style for cells
   * @param props.maxSkip Maximum number of frames that can be skipped at a time
   * @param props.width World width
   * @param props.height World height
   * @param props.liveCells Initial number of live cells
   * @param props.seed The seed to be used to populate the world
   * @param props.canvasWidth Width of the HTML canvas
   * @param props.canvasHeight Height of the HTML canvas
   */
  constructor(props) {

    /**
     * Time in seconds between world updates
     * @public
     */
    this.step = props.step;

    /**
     * Maximum number of frames that can be skipped at a time
     * @public
     */
    this.maxSkip = props.maxSkip;

    /**
     * Fill style for cells
     * @public
     */
    this.fillStyle = props.fillStyle;

    let cw = this._cellWidth = props.canvasWidth / props.width;
    let ch = this._cellHeight = props.canvasHeight / props.height;

    this.world = new World(props.width, props.height,
        props.liveCells, props.seed, cw, ch);

    /**
     * @type {HTMLCanvasElement | HTMLCanvasElement}
     * @public
     */
    let canvas = this.canvas = document.createElement('canvas');
    canvas.width = props.canvasWidth;
    canvas.height = props.canvasHeight;
    let ctx = this.ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    this._drawBackground();

    let mouseListener = this.mouseListener = new MouseListener(this.world);
    mouseListener._cellWidth = cw;
    mouseListener._cellHeight = ch;
    canvas.addEventListener('mouseup', mouseListener);
    canvas.addEventListener('mousemove', mouseListener);
    canvas.addEventListener('mousedown', mouseListener);
  }

  /**
   * Clear world and repopulate with cells in random positions
   */
  reset() {
    this.world.reset();
  }

  /**
   * Start/unpause simulation
   */
  start() {
    this.previous = Date.now();
    this.running = true;
    this.accumulator = 0;
    this._update();
  }

  /**
   * Pause simulation
   */
  stop() {
    this.running = false;
  }


  _update() {

    let maxSkip = this.maxSkip;
    let previous = this.previous;
    let accumulator = this.accumulator;

    let now = Date.now();
    let skippedFrames = 0;
    let dt = (now - previous) / 1000;
    accumulator += dt;

    while (accumulator >= this.step && skippedFrames++ < maxSkip) {

      this.world.advance();
      this.advanced = true;
      accumulator -= this.step;
    }

    this._render();

    this.previous = now;
    this.accumulator = accumulator;

    if (this.running) {
      requestAnimationFrame(this._update.bind(this));
    }
  }

  _drawBackground() {

    let bg = document.createElement('canvas');
    bg.width = this.canvas.width;
    bg.height = this.canvas.height;

    let ctx = bg.getContext('2d');
    let cw = this._cellWidth;
    let ch = this._cellHeight;

    ctx.strokeStyle = '#AAA';
    for (let x = 0; x <= this.world.width; x++) {
      ctx.beginPath();
      ctx.moveTo(x * cw, 0);
      ctx.lineTo(x * cw, bg.height);
      ctx.stroke();
    }

    for (let y = 0; y <= this.world.width; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * ch);
      ctx.lineTo(bg.width, y * ch);
      ctx.stroke();
    }

    this.canvas.style.background = `url(${bg.toDataURL()})`;
  }

  _render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.world.draw(this.ctx, this.fillStyle);
    this.ctx.fillRect(this.mouseListener.x, this.mouseListener.y,
        this._cellWidth,
        this._cellHeight);
  }
}