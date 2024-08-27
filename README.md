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
### 1. Setting Up the Sender
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

### 2. Setting Up the Receiver
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

## Example
### simple
 * Sender: https://tetsuakibaba.github.io/p5.CanvaSync/examples/simple/sender.html
 * Receiver:https://tetsuakibaba.github.io/p5.CanvaSync/examples/simple/receiver.html

## API
p5CanvaSync provides the following methods:

`constructor(p5())`

Initializes the library with p5 element.
```javascript
let sync = new p5CanvaSync(this);
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
```javascript
sync.gotPixels = (pixelData) => {
    loadPixels();
    pixels.set(pixelData.pixels);
    updatePixels();
};
```


## License
This library is released under the MIT License.
