<a name="Game"></a>

## Game
Hash-based implementation of Conway's Game of Life

**Kind**: global class  

* [Game](#Game)
    * [new Game(props)](#new_Game_new)
    * [.step](#Game+step)
    * [.maxSkip](#Game+maxSkip)
    * [.fillStyle](#Game+fillStyle)
    * [.reset()](#Game+reset)
    * [.start()](#Game+start)
    * [.stop()](#Game+stop)

<a name="new_Game_new"></a>

### new Game(props)

| Param | Description |
| --- | --- |
| props |  |
| props.step | Time in seconds between world updates |
| props.fillStyle | Fill style for cells |
| props.maxSkip | Maximum number of frames that can be skipped at a time |
| props.width | World width |
| props.height | World height |
| props.liveCells | Initial number of live cells |
| props.seed | The seed to be used to populate the world |
| props.canvasWidth | Width of the HTML canvas |
| props.canvasHeight | Height of the HTML canvas |

<a name="Game+step"></a>

### game.step
Time in seconds between world updates

**Kind**: instance property of [<code>Game</code>](#Game)  
**Access**: public  
<a name="Game+maxSkip"></a>

### game.maxSkip
Maximum number of frames that can be skipped at a time

**Kind**: instance property of [<code>Game</code>](#Game)  
**Access**: public  
<a name="Game+fillStyle"></a>

### game.fillStyle
Fill style for cells

**Kind**: instance property of [<code>Game</code>](#Game)  
**Access**: public  
<a name="Game+reset"></a>

### game.reset()
Clear world and repopulate with cells in random positions

**Kind**: instance method of [<code>Game</code>](#Game)  
<a name="Game+start"></a>

### game.start()
Start/unpause simulation

**Kind**: instance method of [<code>Game</code>](#Game)  
<a name="Game+stop"></a>

### game.stop()
Pause simulation

**Kind**: instance method of [<code>Game</code>](#Game)  
