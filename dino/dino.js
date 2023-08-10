let config = {
    type: Phaser.CANVAS,
    width: 1600,
    height: 500,
    backgroundColor: "#2B4E20",
    physics: {
        default: "arcade",
        arcade: {
            gravity: false
        }
    },
    scene:{
        preload: preload, 
        create: create,
    }
};

let game = new Phaser.Game(config);

function preload(){
    this.load.image("dino_idle_1", "assets/sprites/_raw/player/idle/dino-idle-1.png");
}

function create(){
    // Set up the physics system (Arcade Physics)
    this.physics.world.setBounds(0, 0, config.width, config.height);
    
    // Create a sprite with physics enabled at (x, y) position using the "dino_idle" image
    this.physics.add.sprite(400, 300, "dino_idle_1");
}