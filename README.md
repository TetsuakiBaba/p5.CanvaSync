# p5.CanvaSync
p5.CanvaSync is a library designed to simplify real-time synchronization of p5.js canvases across different windows or tabs. This library allows you to easily send and receive pixel data from one canvas to another, enabling seamless synchronization between multiple clients.

https://github.com/user-attachments/assets/d9383eef-162d-4e62-8239-b3e4bf82b4c5


## Features
* Real-time transmission and reception of p5.js canvas pixel data
* Simple API for setting up the sender and receiver sides
* Customizable callback function to handle pixel data

## CDN
```html
<script src="https://cdn.jsdelivr.net/gh/TetsuakiBaba/p5.CanvaSync/p5.CanvaSync.js"></script>
```

## Usage
> [!NOTE]
> <ja>canvasがレスポンシブなアプリケーションを作成する場合は、p5CanvaSyncの代わりにp5GraphicSyncを利用してください。</ja>
> <en>If you want to create a responsive application, use p5GraphicSync instead of p5CanvaSync.</en>

### p5CanvaSync
#### 1. Setting Up the Sender
Use p5CanvaSync to send pixel data from your canvas.
```javascript
let sync;

function setup() {
    createCanvas(400, 400);
    sync = new p5CanvaSync(this);
    sync.initSender();
}

function draw() {
    background(220);
    ellipse(mouseX, mouseY, 50, 50);
    sync.send();  // Send the canvas pixel data
}
```

#### 2. Setting Up the Receiver
Receive pixel data sent from the sender and process it using the gotPixels callback function.

```javascript
let sync;

function setup() {
    createCanvas(400, 400);
    sync = new p5CanvaSync(this);
    sync.initReceiver();

    sync.gotPixels = (pixelData) => {
        loadPixels();
        pixels.set(pixelData.pixels);
        updatePixels();
    };
}

function draw() {
    // Typically, no drawing is done here, but you can add additional operations if needed
}
```
## p5GraphicSync

#### 1. Setting Up the Sender
```javascript
let sync;
let g;
function setup() {
    createCanvas(400, 400);
    g = createGraphics(400, 400);
    sync = new p5GraphicSync(g);
    sync.initSender();
}

function draw() {
    g.background(220);
    g.ellipse(mouseX, mouseY, 50, 50);
    sync.send();  // Send the canvas pixel data
}
```

#### 2. Setting Up the Receiver
Receive pixel data sent from the sender and process it using the gotPixels callback function.

```javascript
let sync;

function setup() {
  pixelDensity(1);
    createCanvas(400, 400);
    let g = createGraphics(400, 400);
    sync = new p5GraphicSync(g);
    sync.initReceiver();

    sync.gotPixels = (data) => {
        if (g.width !== data.width || g.height !== data.height) {
            g.resizeCanvas(data.width, data.height);
        }
        g.loadPixels();
        g.pixels.set(data.pixels);
        g.updatePixels();
        image(g, 0, 0, width, height);
    };
}

function draw() {
    // Typically, no drawing is done here, but you can add additional operations if needed
}
```


## Example
### simple, using p5.CanvaSync
 * Sender: https://tetsuakibaba.github.io/p5.CanvaSync/examples/simple/sender.html
 * Receiver:https://tetsuakibaba.github.io/p5.CanvaSync/examples/simple/receiver.html
 ### responsive, using p5.GraphicSync
  * Sender: https://tetsuakibaba.github.io/p5.CanvaSync/examples/responsive/sender.html
 * Receiver:https://tetsuakibaba.github.io/p5.CanvaSync/examples/responsive/receiver.html

 ### p5 Editor
  * https://editor.p5js.org/tetsuakibaba/sketches/vs_xiufUj
  
## API
p5CanvaSync/p5GraphicSync provides the following methods:

`constructor(p5) - p5CanvaSync`

`constructor(p5Graphics) - p5CanvaSync`

Initializes the library with p5 element.
```javascript
let sync = new p5CanvaSync(this);
// or let sync = new p5GraphicSync(p5Graphics);
```

`initSender()`

Initializes the canvas on the sender side.
```javascript
sync.initSender();
```

`send()`

Sends the current canvas pixel data. The transmitted data includes the canvas `width`, `height`, and `pixels`.
```javascript
sync.send();
```

`initReceiver()`

Initializes the canvas on the receiver side.
```javascript
sync.initReceiver();
```

`gotPixels(pixelData)`

Callback function to process received pixel data. Users can override this function to implement custom processing.
  * `pixelData (object):` The received pixel data object. It includes `width`, `height`, and `pixels`.

`p5CanvaSync` Example:
```javascript
sync.gotPixels = (pixelData) => {
    loadPixels();
    pixels.set(pixelData.pixels);
    updatePixels();
};
```

`p5GraphicSync` Example:
```javascript
sync.gotPixels = (pixelData) => {
    if (g.width !== pixelData.width || g.height !== pixelData.height) {
        g.resizeCanvas(pixelData.width, pixelData.height);
    }
    g.loadPixels();
    g.pixels.set(pixelData.pixels);
    g.updatePixels();
    image(g, 0, 0, width, height);
};
```

## License
This library is released under the MIT License.
