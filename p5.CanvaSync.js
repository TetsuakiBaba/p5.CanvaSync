class p5CanvaSync {
    constructor(_p5) {
        this.p5 = _p5;
        this.channelName = 'p5.CanvasSync';
        this.channel = new BroadcastChannel(this.channelName);
    }

    initSender() {
        this.channel = new BroadcastChannel(this.channelName);
    }

    send() {
        this.p5.loadPixels();
        const message = {
            width: this.p5.width,
            height: this.p5.height,
            pixels: this.p5.pixels
        };
        this.channel.postMessage(message);
    }

    initReceiver() {
        this.channel = new BroadcastChannel(this.channelName);
        this.channel.onmessage = (event) => {
            this.gotPixels(event.data);
        };
    }

    gotPixels(pixelData) { }
}

class p5GraphicSync {
    constructor(_graphics) {
        this.graphics = _graphics;
        this.channelName = 'p5.GraphicSync';
        this.channel = new BroadcastChannel(this.channelName);
    }

    initSender() {
        this.channel = new BroadcastChannel(this.channelName);
    }

    send() {
        this.graphics.loadPixels();
        const message = {
            width: this.graphics.width,
            height: this.graphics.height,
            pixels: this.graphics.pixels
        };
        this.channel.postMessage(message);
    }

    initReceiver() {
        this.channel = new BroadcastChannel(this.channelName);
        this.channel.onmessage = (event) => {
            this.gotPixels(event.data);
        };
    }

    gotPixels(pixelData) { }
}

