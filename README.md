# p5.CanvaSync
p5.CanvasSync is a library designed to simplify real-time synchronization of p5.js canvases across different windows or tabs. This library allows you to easily send and receive pixel data from one canvas to another, enabling seamless synchronization between multiple clients.

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
### 1. Setting Up the Sender
Use p5CanvasSync to send pixel data from your canvas.
```javascript
let sync;

function setup() {
    createCanvas(400, 400);
    sync = new p5CanvasSync('canvas_channel');
    sync.initSender(this);
}

function draw() {
    background(220);
    ellipse(mouseX, mouseY, 50, 50);
    sync.send();  // Send the canvas pixel data
}
```

### 2. Setting Up the Receiver
Receive pixel data sent from the sender and process it using the gotPixels callback function.

```javascript
let sync;

function setup() {
    createCanvas(400, 400);
    sync = new p5CanvasSync('canvas_channel');
    sync.initReceiver(this);

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

## Example
### simple
 * Sender: https://tetsuakibaba.github.io/p5.CanvaSync/examples/simple/sender.html
 * Receiver:https://tetsuakibaba.github.io/p5.CanvaSync/examples/simple/receiver.html

## Method Descriptions
`constructor(channelName)`
Initializes the library.

`channelName` (string): The name of the `BroadcastChannel`. Specify the name of the channel used for sending and receiving data.

`initSender(canvas)`
Initializes the canvas on the sender side.
* `canvas (p5.Renderer)`: The p5.js canvas object created by createCanvas().

`send()`
Sends the current canvas pixel data. The transmitted data includes the canvas `width`, `height`, and `pixels`.

`initReceiver(canvas)`
Initializes the canvas on the receiver side.
 * `canvas (p5.Renderer)`: The p5.js canvas object created by createCanvas().

`gotPixels(pixelData)`
Callback function to process received pixel data. Users can override this function to implement custom processing.

`pixelData (object):` The received pixel data object. It includes width, height, and pixels.

## License
This library is released under the MIT License.
