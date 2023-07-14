let config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 700,
    backgroundColor: "#123524",
    fps: 60,
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

let game = new Phaser.Game(config);
let paddle;
let pallet;
let pallet_scale = 0.1;
let pallet_w, pallet_h;
let keys;
const paddle_vel = 500;
let player;
let player_w = 200;
let player_h = 30;
const box_width = 80;
const box_height = 40;
let box_scale_w = 0.85, box_scale_h = 0.5;
const gap = 22;
let grid = [];
let grid_rows = 4;
let grid_cols = config.width / box_width;
let ball;
let circle;
let circle_scale = 0.25;
let circle_radius;
let ball_speed = 300;
let ball_vel = {x: 0, y: 0};
let game_on = false;

function preload(){
    this.load.image("pallet", "assets/pallet.png");
    this.load.image("circle", "assets/circle.png");
    this.load.image("box", "assets/box.png");
}

function create(){
    let player_x = config.width / 2 - player_w / 2;
    let player_y = config.height - player_h - 5;
    pallet = this.add.sprite(0, 0, "pallet");
    circle = this.add.sprite(0, 0, "circle");
    pallet.setOrigin(0, 0);
    //circle.setOrigin(0, 0);
    pallet.setScale(pallet_scale);
    circle.setScale(circle_scale);
    pallet_w = pallet.width * pallet_scale;
    pallet_h = pallet.height * pallet_scale;
    circle_radius = circle.radius * circle_scale;
    pallet.x = config.width / 2 - pallet_w / 2;
    pallet.y = config.height - pallet_h;
    circle.x = player_x + player_w / 2; 
    circle.y = player_y - player_h;    
    //console.log(pallet.x, pallet.y, config.width, config.height);
    keys = this.input.keyboard.addKeys("A,D,RIGHT,LEFT,SPACE"); 
    // new Phaser.Geom.Rectangle(x, y, player_w, player_h);
    //player = this.add.rectangle(player_x, player_y, player_w, player_h, 0x6ed3a2);
    //player.setOrigin(0, 0);
    player = pallet;
    //ball = new Phaser.Geom.Circle(x + player_w / 2, y - player_h / 2, 20);
    //ball = this.add.circle(player_x + player_w / 2, player_y - player_h / 2, 20, 0xFF8C00);
    ball = circle;
    for(let row = 0; row < grid_rows; ++row){
        grid[row] = [];
        for(let col = 0; col < grid_cols; ++col){
            let x = col * box_width + col * gap;
            let y = row * box_height + row * gap;
            // new Phaser.Geom.Rectangle(x, y, box_width, box_height);
            //let box = this.add.rectangle(x, y, box_width, box_height, 0x89CFF0);
            let box = this.add.sprite(x, y, "box");
            box.setScale(box_scale_w, box_scale_h);
            grid[row][col] = box;
            grid[row][col].setOrigin(0, 0);
        }
    }

}


function check_boundaries(obj, player_w){
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

function gridCollision(){
    for (let row = 0; row < grid_rows; row++){
        for(let col = 0; col < grid_cols; col++){
            let sprite = grid[row][col];
            if(sprite.active && Phaser.Geom.Intersects.RectangleToRectangle(sprite.getBounds(), ball.getBounds())){
                ball_vel.y = -ball_vel.y;
                ball.y += ball_vel.y;
                if(ball.y < sprite.y + sprite.height){
                    ball_vel.x = -ball_vel.x;
                }
                sprite.setVisible(false);
                sprite.setActive(false);
            }
        }
    }

}

function moveBall(ball_speed, player_w, player_h){
    if(Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), ball.getBounds())){
        if(game_on){
            ball_vel.y = -ball_speed;
        }else{
            ball.x = player.x + player_w / 2;
            ball.y = player.y - player_h / 2;
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
    gridCollision();
    moveByArrow(player, speed);
    if(this.input.mousePointer.leftButtonDown()){
        player.x = this.input.mousePointer.x - 100;
    }
    check_boundaries(player, pallet_w);
    moveBall(ball_speed * (delta / 1000), pallet_w, pallet_h);
}
