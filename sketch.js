var astronauta, astronauta_running, tumba;
var impostor_kill, impostor_running, impostor;
var bosqueImg, bosque, groundImg, ground;
var rockImg, rockGroup, rock;
var gameOverImg, restartImg;
var score;

var gameState = "Play";

function preload(){
 astronauta_running = loadAnimation("among_us_1.png, among_us_2.png");
 tumba = loadAnimation("tumba.png");
 impostor_running = loadAnimation("impostor1.png, impostor2.png");
 impostor_kill = loadAnimation("impostor.png");

 bosqueImg = loadImage("bosque.webp");
 groundImg = loadImage("pasto.png");

 rockImg = loadImage("roca.png");
 gameOverImg = loadImage("Game_Over.png");
 restartImg = loadImage("reinicio.png");
}

function setup() {
 createCanvas(600, 200);

 astronauta = createSprite(50,160,20,50);
 astronauta = addAnimation("running", astronauta_running);
 astronauta = addAnimation("collide", tumba);
 astronauta.scale= 0.8;

 impostor = createSprite(40,160,20,50);
 impostor = addAnimation("running", impostor_running);
 impostor = addAnimation("kill", impostor_kill)
 impostor.scale= 0.8;

 tumba = createSprite(60,160,20,50);
 tumba = addAnimation("dead", tumba);

 rockGroup = new Group();

 bosque = createSprite(300,100);
 bosque = addImage("Img", bosqueImg);
 //bosque.velocityX = 1;

 ground = createSprite(200,180,400,20);
 ground = addImage("Img", groundImg);

 gameOver = createSprite(300,100,300,30);
 gameOver = addImage("Img", gameOverImg);
 restart = createSprite(250,100,280,30);
 restart = addImage("Img", restartImg);

 gameOver.scale = 0.5;
 restart.scale = 0.5;

 astronauta.setCollider("rectangle",0,0,trex.width,trex.height);
  astronauta.debug = true
  
  score = 0;
}

function draw() {
  background(255);

  text("Puntuación: "+ score, 500,50);
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    //puntuación
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //hacer que el trex salte al presionar la barra espaciadora
    if(keyDown("space")&& astronauta.y >= 100) {
        astronauta.velocityY = -12;
    }
    
    //agregar gravedad
    astronauta.velocityY = astronauta.velocityY + 0.8
    
    if(rockGroup.isTouching(astronauta)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     //cambiar la animación del trex
      astronauta.changeAnimation("collided", tumba);
    
      if(mousePressedOver(restart)) {
        reset();
      }
     
      ground.velocityX = 0;
      trex.velocityY = 0
      
     
      //establecer lifetime de los objetos del juego para que no sean destruidos nunca
    rockGroup.setLifetimeEach(-1);
    rockGroup.setVelocityXEach(0);
   }
  
 
  //evitar que el trex caiga
  astronauta.collide(ground);
  
  rockGroup();

  drawSprites();
}



function rockGroup(){
 if (frameCount % 60 === 0){
 rock = createSprite(30,160,20,50);
 rock = addImage("rock", rockImg);
 rock.scale= 0.6;
 rock.velocityX = -(6 + score/100);
 rock.lifetime = 300;

 rockGroup.add(rock)
 }
}

function reset(){
    gameState=PLAY;
    rockGroup.destroyEach(); 
    astronauta.changeAnimation("running", astronauta_running);
    score=0;
  
}