export default class MouseListener {
  constructor(world) {
    this.world = world;
    this.x = undefined;
    this.y = undefined;
  }

  handleEvent(e) {

    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left; //x position within the element.
    let y = e.clientY - rect.top;  //y position within the element.

    // noinspection FallThroughInSwitchStatementJS
    switch (e.type) {
      case 'mousedown':
        this.mousedown = Date.now();
      case 'mousemove':

        this.x = Math.floor(x / this.world._cellWidth) *
            this.world._cellWidth;
        this.y = Math.floor(y / this.world._cellHeight) *
            this.world._cellHeight;

        if (this.mousedown) {
          this.world.input(x, y);
        }

        break;

      case 'mouseup':
        this.mousedown = null;
        break;
    }
  }
}