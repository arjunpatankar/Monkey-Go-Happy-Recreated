var backImage,backgr;
var player, player_running;
var ground, ground_img;
var FoodGroup, bananaImg;
var obstacleGroup, obstacleImg;
var gameOverImg;
var score = 0;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  createCanvas(800,400);

  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  backgr = createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale = 1.5;
  backgr.x = backgr.width/2;
  backgr.velocityX = -4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x = ground.width/2;
  ground.visible = false;
}

function draw() {
  background(0);

  text("Score: "+ score, 100,50);
  textSize(15);
  fill("black");
  stroke("black");

  player.collide(ground);

  if(gameState === PLAY){
    player.changeAnimation("running", player_running);
  
  if(backgr.x < 100){
    backgr.x = backgr.width/2;
  }
  
    if(keyDown("space")){
      player.velocityY = -15;
    }

    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score = score +2;
      player.scale += +0.1;
    }

    player.velocityY = player.velocityY + 0.9;

    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);

    spawnFood();
    spawnObstacle();

    if(obstacleGroup.isTouching(player)){
      gameState = END;
    }
  }else if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;

    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);

    textSize(30);
    fill(255);
    text("Game Over!",300,220);
  }
  drawSprites();
}

function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth +1;
    FoodGroup.add(banana);
  }
}

function spawnObstacle(){
  if(frameCount % 200 === 0){
    var obstacle = createSprite(350,320);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.15;
    obstacle.velocityX = -4;
    
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}