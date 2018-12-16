<a name="GoL"></a>

## GoL
Hash-based implementation of Conway's Game of Life

**Kind**: global class  

* [GoL](#GoL)
    * [new GoL(props)](#new_GoL_new)
    * [.step](#GoL+step)
    * [.maxSkip](#GoL+maxSkip)
    * [.fillStyle](#GoL+fillStyle)
    * [.reset()](#GoL+reset)
    * [.start()](#GoL+start)
    * [.stop()](#GoL+stop)

<a name="new_GoL_new"></a>

### new GoL(props)

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

<a name="GoL+step"></a>

### goL.step
Time in seconds between world updates

**Kind**: instance property of [<code>GoL</code>](#GoL)  
**Access**: public  
<a name="GoL+maxSkip"></a>

### goL.maxSkip
Maximum number of frames that can be skipped at a time

**Kind**: instance property of [<code>GoL</code>](#GoL)  
**Access**: public  
<a name="GoL+fillStyle"></a>

### goL.fillStyle
Fill style for cells

**Kind**: instance property of [<code>GoL</code>](#GoL)  
**Access**: public  
<a name="GoL+reset"></a>

### goL.reset()
Clear world and repopulate with cells in random positions

**Kind**: instance method of [<code>GoL</code>](#GoL)  
<a name="GoL+start"></a>

### goL.start()
Start/unpause simulation

**Kind**: instance method of [<code>GoL</code>](#GoL)  
<a name="GoL+stop"></a>

### goL.stop()
Pause simulation

**Kind**: instance method of [<code>GoL</code>](#GoL)  
