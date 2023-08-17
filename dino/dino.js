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
    this.load.image("dino_idle_2", "assets/sprites/_raw/player/idle/dino-idle-2.png");
}

function create(){
    // Set up the physics system (Arcade Physics)
    this.physics.world.setBounds(0, 0, config.width, config.height);
    this.anims.create({
        key: 'idleAnimation',
        frames: [
            { key: 'dino_idle_1' },
            { key: 'dino_idle_2' },
        ],
        frameRate: 1,
        repeat: -1,
    });

    this.idle = this.physics.add.sprite(0, 0, 'dino_idle_1');
    this.idle.setOrigin(0, 0);
    this.idle.x = config.width / 2 - this.idle.width / 2;
    this.idle.y = config.height - this.idle.height;
    this.idle.anims.play('idleAnimation');  // Start playing animation
}