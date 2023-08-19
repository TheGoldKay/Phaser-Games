let config = {
    type: Phaser.CANVAS,
    width: 1600,
    height: 500,
    backgroundColor: "#333333",
    fps: { target: 60, forceSetTimeOut: true }, // Adjust target frame rate as needed
    physics: {
        default: "arcade",
        arcade: {
            gravity: false
        }
    },
    scene:{
        preload: preload, 
        create: create,
        update: update,
    }
};

let game = new Phaser.Game(config);

const dino_vel = 5;
let running = false;
let sky = [];

function preload(){
    this.load.image("dino_idle_1", "assets/sprites/_raw/player/idle/dino-idle-1.png");
    this.load.image("dino_idle_2", "assets/sprites/_raw/player/idle/dino-idle-2.png");
    this.load.image("dino_run_1", "assets/sprites/_raw/player/run/dino-run-1.png");
    this.load.image("dino_run_2", "assets/sprites/_raw/player/run/dino-run-2.png");
    // loading background images
    this.load.image("cloud", "assets/sprites/_raw/horizon/cloud/cloud.png");
    this.load.image("ground", "assets/sprites/_raw/horizon/ground/ground.png");
    this.load.image("star1", "assets/sprites/_raw/horizon/star/star-1.png");
    this.load.image("star2", "assets/sprites/_raw/horizon/star/star-2.png");
    this.load.image("star3", "assets/sprites/_raw/horizon/star/star-3.png");
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

    this.anims.create({
        key: 'runAnimation',
        frames:[
            {key: 'dino_run_1'},
            {key: 'dino_run_2'},
        ],
        frameRate: 5,
        repeat: -1,
    })
    // create background setting/images
    this.ground = this.add.sprite(0, 0, 'ground');
    this.ground.setOrigin(0, 0);
    this.ground.y = config.height - this.ground.height;
    this.cloud = this.add.sprite(0, 0, 'cloud');
    this.cloud.setOrigin(0, 0);
    this.cloud2 = this.add.sprite(0, 0, 'cloud');
    this.cloud2.setOrigin(0, 0);
    this.cloud3 = this.add.sprite(0, 0, 'cloud');
    this.cloud3.setOrigin(0, 0);
    this.star1 = this.add.sprite(0, 0, "star1");
    this.star2 = this.add.sprite(0, 0, "star2");
    this.star3 = this.add.sprite(0, 0, "star3");
    this.star1.setOrigin(0, 0);
    this.star2.setOrigin(0, 0);
    this.star3.setOrigin(0, 0);
    sky.push(this.cloud);
    sky.push(this.cloud2);
    sky.push(this.cloud3);
    sky.push(this.star1);
    sky.push(this.star2);
    sky.push(this.star3);
    makeSky(); // set random pos for every sky element
    console.log(sky)
    //
    this.idle = this.physics.add.sprite(0, 0, 'dino_idle_1');
    this.run = this.physics.add.sprite(0, 0, 'dino_run_1');
    this.idle.setOrigin(0, 0);
    this.run.setOrigin(0, 0);
    this.run.setVisible(false);
    this.idle.x = config.width / 2 - this.idle.width / 2;
    this.idle.y = config.height - this.idle.height - this.ground.height + 5;
    this.run.x = this.idle.x;
    this.run.y = this.idle.y;
    this.idle.anims.play('idleAnimation');  // Start playing animation
    this.run.setCollideWorldBounds(true);
    this.idle.setCollideWorldBounds(true);
    // Register the right and d keys
    this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

}

function randomPos(){
    const x = Math.floor(Math.random() * config.width) - 50;
    const y = Math.floor(Math.random() * 100) + 5;
    return [x, y];
}

function choice(){
    return sky[Math.floor(Math.random() * sky.length)];
}

function makeSky(){
    for(let sprite of sky){
        const [x, y] = randomPos();
        sprite.x = x;
        sprite.y = y;
    }
}

function background(dt){
    if(running){
        sky.forEach((sprite, index) => {
            sprite.x = sprite.x - dino_vel * dt / 100;
            if(sprite.x <= 0){
                const [_, y] = randomPos();
                sprite.y = y;
                sprite.x = config.width;
            }
        });
    }
}

function update(_, dt) {
    background(dt);
    if (this.dKey.isDown) {
        if (!running) {
            this.idle.anims.stop('idleAnimation', true);
            this.run.setVisible(true);
            this.idle.setVisible(false);
            this.run.anims.play('runAnimation');
            running = true;
        }
        this.run.setVelocityX(dino_vel * dt);
    } else {
        if (running) {
            this.run.anims.stop('runAnimation', true);
            this.idle.anims.play('idleAnimation');
            this.run.setVisible(false);
            this.idle.setVisible(true);
            this.idle.x = this.run.x;
            this.idle.y = this.run.y;
            running = false;
            this.run.setVelocityX(0);
        }
    }
}