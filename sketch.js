var balloon , database , position;
var background_img , balloon_animation;

function preload(){
background_img = loadImage("bg.png");
balloon_animation = loadAnimation("balloon1.png" , "balloon2.png" , "balloon3.png");

}
function setup() {

  database = firebase.database();
  createCanvas(500,500);

  balloon = createSprite(250, 650, 50, 50);
  balloon.addAnimation("moving" , balloon_animation);

  var balloonPositionRef = database.ref('balloon/position');
  balloonPositionRef.on("value" , function(data){
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
  })
}

function draw() {
  background(background_img);  
  if(position != undefined){

    if(keyDown(LEFT_ARROW)){
      updatePosition(-1 , 0);
      balloon.addAnimation("moving" , balloon_animation);
      balloon.scale = balloon.scale-0.01
     }
    else if(keyDown(RIGHT_ARROW)){
    updatePosition(1 , 0);
    balloon.addAnimation("moving" , balloon_animation);
    balloon.scale = balloon.scale-0.01
    }
    else if(keyDown(UP_ARROW)){
    updatePosition(0 , -1);
    balloon.addAnimation("moving" , balloon_animation);
      balloon.scale = balloon.scale-0.01
    }
    else if(keyDown(DOWN_ARROW)){
    updatePosition(0 , 1);
    balloon.addAnimation("moving" , balloon_animation);
    balloon.scale = balloon.scale-0.01
    }
    }
 
  drawSprites();
}

function updatePosition(x,y){
  database.ref('balloon.position').set({
    'x' : position.x + x,
    'y' : position.y +y
  });
}

