let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 700,
    backgroundColor: "#E4C89C",
    fps: 60,
    scene: {
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let paddle;
let keys;
const paddle_vel = 300;

function create(){
    let w = 200, h = 30;
    let x = config.width / 2;
    let y = config.height - h / 2 - 5;
    paddle = this.add.rectangle(x, y, w, h, 0xd1a156);
    paddle.inputEnabled = true;
    // Phaser.Input.Keyboard.KeyCodes to add all keys
    keys = this.input.keyboard.addKeys("A,D,RIGHT,LEFT"); 
}

function update(time, delta){
    let speed = paddle_vel * (delta / 1000);
    if(keys.LEFT.isDown || keys.A.isDown){
        paddle.x -= speed;
    }else if(keys.RIGHT.isDown || keys.D.isDown){
        paddle.x += speed;
    }
    if(paddle.x + paddle.width / 2 > config.width){
        paddle.x = config.width - paddle.width / 2;
    }
    if(paddle.x - paddle.width / 2 < 0){
        paddle.x = paddle.width / 2;
    }
}