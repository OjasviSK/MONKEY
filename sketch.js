var game = "eat";

var ground, done;
var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;

function preload(){
  monkey_running =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(windowWidth,windowHeight);

  monkey=createSprite(windowWidth/7,windowHeight/1.17,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.075;
//  monkey.debug=true;
  monkey.setCollider("circle",0,0,monkey.width/2);
  

  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  
}


function draw() {
  background("white");

  monkey.velocityY=monkey.velocityY+1;
  
  ground=createSprite(windowWidth/2,windowHeight/1.12,windowWidth,20);
  monkey.collide(ground);
  
  fill("red");
  textSize=20;
  text("score = "+score,windowWidth/2,windowHeight/10)
  
  if(game=="eat"){
    
    if(keyDown("space") && monkey.y>windowHeight/1.23){
      monkey.velocityY=-windowHeight/25;
    }

    fruits();
    block();

    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score=score+1;
    }
    
    if(obstacleGroup.isTouching(monkey)){
      game="end";
    }
    
  }
  
  if(game=="end"){
    monkey.velocityY=0;
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    done=createSprite(windowWidth/2,windowHeight/2,200,10);
    done.visible=false;
    text("game over !! click here to play again", windowWidth/2.7, windowHeight/2);
  }
  
  if(game=="end" && mousePressedOver(done)){
    game="eat";
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    score=0;
  }
  
  drawSprites();
}

function fruits(){
  
  if(frameCount%100==0){
     banana=createSprite(windowWidth+10,Math.round(random(windowHeight/3,windowHeight/1.5)),20,20);
     banana.addImage(bananaImage);
     banana.scale=0.075;
     banana.velocityX=-(10+score/10);
     banana.lifetime=windowWidth;
     foodGroup.add(banana);
//     banana.debug=true;
    banana.setCollider("rectangle",0,2,banana.width,banana.height/3)
  }
}

function block(){
  y=Math.round(random(50,220));
  if(frameCount%y==0){
    obstacle=createSprite(windowWidth+10,windowHeight/1.17,20,20);
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.075;
    obstacle.velocityX=-(10+score/10);
    obstacle.lifetime=windowWidth;
    obstacleGroup.add(obstacle);
//    obstacle.debug=true;
    obstacle.setCollider("circle",0,0,obstacle.width/3)
  }
}