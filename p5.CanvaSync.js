class p5CanvaSync {
    constructor(canvas) {
        this.canvas = canvas;
        this.channelName = 'p5.CanvasSync';
        this.channel = new BroadcastChannel(this.channelName);
    }

    // Sender の初期化
    initSender() {
        this.channel = new BroadcastChannel(this.channelName);
    }

    // 描画を送信
    send() {
        this.canvas.loadPixels();
        const message = {
            width: this.canvas.width,
            height: this.canvas.height,
            pixels: this.canvas.pixels
        };
        //console.log(this.canvas.pixels);
        this.channel.postMessage(message);
    }

    // Receiver の初期化
    initReceiver() {
        this.channel = new BroadcastChannel(this.channelName);
        this.channel.onmessage = (event) => {
            const pixelData = new Uint8ClampedArray(event.data.pixels);
            // gotPixels()というコールバック関数を呼び出す
            this.gotPixels(event.data);
        };
    }

    gotPixels(pixelData) { }
}
