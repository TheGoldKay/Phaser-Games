let config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 700,
    backgroundColor: "#123524",
    fps: {
        target: 60,
        min: 30
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

let game = new Phaser.Game(config);
let paddle;
const paddle_scale = 0.1;
let paddle_w, paddle_h;
const paddle_speed = 300;
let keys;
let player_w = 200;
let player_h = 30;
const brick_scale_w = 0.85, brick_scale_h = 0.5;
let brick_w, brick_h;
const gap = 22;
let grid = [];
let grid_rows = 4;
let grid_cols = 12;//config.width / bricks_width;
let ball;
let circle;
const circle_scale = 0.25;
let circle_radius;
const ball_speed = 300;
let ball_vel = {x: 0, y: 0};
let game_on = false;
let bricks;

function preload(){
    this.load.image("paddle", "assets/paddle.png");
    this.load.image("ball", "assets/circle.png");
    this.load.image("brick", "assets/brick.png");
}

function create(){
    paddle = this.physics.add.sprite(0, 0, "paddle");
    paddle.setCollideWorldBounds(true);
    paddle.setBounce(1);
    ball = this.physics.add.sprite(0, 0, "ball");
    ball.setCollideWorldBounds(true);
    ball.setBounce(1);
    //ball.setCircle(ball.width * circle_scale);
    paddle.setOrigin(0, 0);
    paddle.setScale(paddle_scale);
    ball.setScale(circle_scale);
    paddle_w = paddle.width * paddle_scale;
    paddle_h = paddle.height * paddle_scale;
    circle_radius = ball.radius * circle_scale;
    ball.setSize(circle_radius, circle_radius);
    paddle.x = config.width / 2 - paddle_w / 2;
    paddle.y = config.height - paddle_h;
    ball.x = paddle.x + paddle_w / 2; 
    ball.y = paddle.y - paddle_h / 2;    
    keys = this.input.keyboard.addKeys("A,D,RIGHT,LEFT,SPACE"); 
    bricks = this.physics.add.group();
    for(let row = 0; row < grid_rows; ++row){
        grid[row] = [];
        for(let col = 0; col < grid_cols; ++col){
            let brick = this.physics.add.sprite(0, 0, "brick");
            brick.setOrigin(0, 0);
            brick.setBounce(1);
            brick.setScale(brick_scale_w, brick_scale_h);
            brick_w = brick.width * brick_scale_w;
            brick_h = brick.height * brick_scale_h;
            brick.x = col * brick_w + col * gap;
            brick.y = row * brick_h + row * gap;
            //grid[row][col] = brick;
            //brick.setBounce(1);
            brick.setSize(brick_w, brick_h);
            //brick.setOffset(0,0);
            brick.setImmovable(true);
            bricks.add(brick);
        }
    }
    //paddle.setImmovable(true);
    //ball.setMass(1);
    //paddle.setMass(10);
    //paddle.setBounce(1);
    //ball.setBounce(1);

    this.physics.add.collider(paddle, ball, paddleBallCollision, null, this);
    this.physics.add.collider(ball, bricks, ballBricksCollision, null, this);
}

function paddleBallCollision(paddle, ball){
    if(game_on){
        ball.setVelocityY(-ball.body.velocity.y);
    }else{
        ball.x = paddle.x + paddle_w / 2; 
        ball.y = paddle.y - paddle_h / 2;    
    }
}


function ballBricksCollision(ball, brick) {
    ball.setVelocityY(-ball_speed);
    brick.destroy();
}


function update(){
    if(keys.LEFT.isDown || keys.A.isDown){
        paddle.setVelocityX(-paddle_speed);
    }
    if(keys.RIGHT.isDown || keys.D.isDown){
        paddle.setVelocityX(paddle_speed);
    }
    if(keys.RIGHT.isUp && keys.D.isUp && keys.LEFT.isUp && keys.A.isUp){
        paddle.setVelocityX(0);
    }
    if(paddle.body.touching.left || paddle.body.touching.right){
        paddle.setVelocityX(0);
    }
    if(ball.body.touching.left || ball.body.touching.right){
        ball.setVelocityX(-ball.body.velocity.x);
    }
    if(ball.body.touching.up || ball.body.touching.down){
        ball.setVelocityY(-ball.body.velocity.y);
    }
    if(keys.SPACE.isDown){
        ball.setVelocity(ball_speed, -ball_speed);
        game_on = true;
    }
}
