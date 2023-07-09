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
let rect;
let rect_w = 200;
let rect_h = 30;
let rect_container;

function create(){
    let x = config.width / 2 - rect_w / 2;
    let y = config.height - rect_h - 5;
    keys = this.input.keyboard.addKeys("A,D,RIGHT,LEFT"); 
    rect_container = this.add.container(x, y);
    rect = this.add.graphics();
    rect.fillStyle(0x6ed3a2);
    rect.fillRoundedRect(0, 0, rect_w, rect_h, 10);
    rect_container.add(rect);
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
