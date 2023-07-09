let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 700,
    backgroundColor: "#123524",
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
let mouse_guide = false;
let player;
let player_rect;
let rect_w = 200;
let rect_h = 30;
let rect_container;
//let grid;
const box_width = 80;
const box_height = 40;
const gap = 22;
let grid = [];

function create(){
    let x = config.width / 2 - rect_w / 2;
    let y = config.height - rect_h - 5;
    keys = this.input.keyboard.addKeys("A,D,RIGHT,LEFT"); 
    rect_container = this.add.container(x, y);
    player = this.add.graphics();
    player_rect = new Phaser.Geom.Rectangle(x, y, rect_w, rect_h);
    player.fillStyle(0x6ed3a2);
    player.fillRoundedRect(0, 0, rect_w, rect_h, 8);
    rect_container.add(player);
    //grid = this.add.container(0, 0);
    for(let row = 0; row < 5; ++row){
        grid[row] = [];
        for(let col = 0; col < config.width / box_width; ++col){
            let x = col * box_width + col * gap;
            let y = row * box_height + row * gap;
            //grid[row][col] = this.add.rectangle(x + box_width / 2, y + box_height / 2, box_width, box_height, 0x89CFF0);
            let box = this.add.graphics();
            box.fillStyle(0x89CFF0);
            box.fillRoundedRect(x, y, box_width, box_height, 15);
            grid[row][col] = new Phaser.Geom.Rectangle(x, y, box_width, box_height);
        }
    }
}
  
function check_boundaries(obj){
    if(obj.x + rect_w > config.width){
        obj.x = config.width - rect_w;
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

function update(time, delta){
    let speed = paddle_vel * (delta / 1000);
    moveByArrow(rect_container, speed);
    if(this.input.mousePointer.leftButtonDown()){
        rect_container.x = this.input.mousePointer.x - 100;
    }
    check_boundaries(rect_container);
}
