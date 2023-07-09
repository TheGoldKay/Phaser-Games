let config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 700,
    backgroundColor: "#123524",
    fps: 60,
    scene: {
        create: create,
        update: update,
    },
};

let game = new Phaser.Game(config);
let paddle;
let keys;
const paddle_vel = 500;
let player;
let player_w = 200;
let player_h = 30;
const box_width = 80;
const box_height = 40;
const gap = 22;
let grid = [];
let ball;
let ball_speed = 300;
let ball_vel = {x: 0, y: 0};
let game_on = false;

function create(){
    let player_x = config.width / 2 - player_w / 2;
    let player_y = config.height - player_h - 5;
    keys = this.input.keyboard.addKeys("A,D,RIGHT,LEFT,SPACE"); 
    // new Phaser.Geom.Rectangle(x, y, player_w, player_h);
    player = this.add.rectangle(player_x, player_y, player_w, player_h, 0x6ed3a2);
    player.setOrigin(0, 0);
    //ball = new Phaser.Geom.Circle(x + player_w / 2, y - player_h / 2, 20);
    ball = this.add.circle(player_x + player_w / 2, player_y - player_h / 2, 20, 0xff0000);
    for(let row = 0; row < 4; ++row){
        grid[row] = [];
        for(let col = 0; col < config.width / box_width; ++col){
            let x = col * box_width + col * gap;
            let y = row * box_height + row * gap;
            // new Phaser.Geom.Rectangle(x, y, box_width, box_height);
            grid[row][col] = this.add.rectangle(x, y, box_width, box_height, 0x89CFF0);
            grid[row][col].setOrigin(0, 0);
        }
    }

}


function check_boundaries(obj){
    if(obj.x + player_w > config.width){
        obj.x = config.width - player_w;
    }
    if(obj.x < 0){
        obj.x = 0;
    }
}

function moveByArrow(obj, speed){
    if(keys.LEFT.isDown || keys.A.isDown){
        obj.x -= speed;
    }else if(keys.RIGHT.isDown || keys.D.isDown){
        obj.x += speed;
    }
}

function moveBall(ball_speed){
    let ball_rect = new Phaser.Geom.Rectangle(ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
    if(Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), ball_rect)){
        if(game_on){
            ball_vel.y = -ball_speed;
        }else{
            ball.x = player.x + player.width / 2;
            ball.y = player.y - player.height / 2;
        }
    }
    ball.x += ball_vel.x;
    ball.y += ball_vel.y;
    if(ball.x < 0){
        ball_vel.x = ball_speed;
    }else if(ball.x > config.width){
        ball_vel.x = -ball_speed;
    }
    if(ball.y < 0){
        ball_vel.y = ball_speed;
    }else if(ball.y > config.height){
        ball_vel.y = -ball_speed;
    }
    if(keys.SPACE.isDown){
        ball_vel.y = ball_speed;
        ball_vel.x = ball_speed;
        game_on = true;
    }
}

function update(time, delta){
    let speed = paddle_vel * (delta / 1000);
    moveByArrow(player, speed);
    if(this.input.mousePointer.leftButtonDown()){
        player.x = this.input.mousePointer.x - 100;
    }
    check_boundaries(player);
    moveBall(ball_speed * (delta / 1000));
}
