// Initialize Phaser
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

// Preload function (optional)
function preload() {
    // You can load assets here if needed
}

// Create function (mandatory)
function create() {
    // Create your game elements here

    // Example: Create a rectangle to represent the window
    var graphics = this.add.graphics();
    graphics.fillStyle(0x0000FF, 1);
    graphics.fillRect(100, 100, 600, 400);
}

// Update function (optional)
function update() {
    // Update logic goes here
}
