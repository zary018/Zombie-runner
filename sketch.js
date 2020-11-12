var Isaac, invisibleGround, BACKGROUND;
var zombie, zombieGroup, syringe, syringeGroup, firstaid, FirstAidGroup;
var Isaac_running, BACKGROUNDimage, SyringeImage, FirstAidImage, ZombieImage, GAMEOVERIMAGE
var score;

var gameState = "PLAY"

function preload(){
  Isaac_running = loadAnimation("runningman.gif");
  BACKGROUNDimage = loadImage("Background.jpg");
  SyringeImage = loadImage("download (1).png");
  FirstAidImage = loadImage("First aid Kit transparent.png");
  ZombieImage = loadImage("Zombie.png");
  GAMEOVERIMAGE = loadImage("Game Over.jpg");
  GameSound = loadSound("544194__snapper4298__80bpm-bassline-breakloop.wav");
  
}

function setup() {
  createCanvas(700,300)
  Isaac = createSprite(90,220,100,428); 
  Isaac.addAnimation("running", Isaac_running);
  Isaac.scale=0.2;
  
  //Isaac.velocityX=5;

  
  BACKGROUND = createSprite(450,150,900,300);
  BACKGROUND.addImage(BACKGROUNDimage);
  BACKGROUND.scale = 1.45;
  BACKGROUND.velocityX =-4;
  //BACKGROUND.x = BACKGROUND.width /2;
  BACKGROUND.depth = BACKGROUND.depth-5;
  invisibleGround = createSprite(450,290,900,2);
  
  
  GameOver = createSprite(350,150);
  GameOver.addImage(GAMEOVERIMAGE);
  GameOver.scale=1.3;
  GameOver.depth = GameOver.depth+5;
  GameOver.visible=false;
  
  zombieGroup = createGroup();
  syringeGroup = createGroup();
  FirstAidGroup = createGroup();
  score = 0;
}

function draw() {
  if(gameState === "PLAY"){
     Isaac.setCollider("rectangle",9,0,150,340);
  if (BACKGROUND.x < 0){
      BACKGROUND.x = BACKGROUND.width/2;
    }
  Isaac.collide(invisibleGround)
    GameSound.play();
  
 if(keyDown("space")&& Isaac.y >=250){
    Isaac.velocityY=-16;
    } 
  Isaac.velocityY = Isaac.velocityY + 1;
  background.velocityX=-6
  
  invisibleGround.visible=false;
  score = score + Math.round(getFrameRate()/60);
    if(zombieGroup.isTouching(Isaac)){
      gameState = "END";
      
    }
    
      if(syringeGroup.isTouching(Isaac)){
       syringeGroup.destroyEach();
       score=score+20;   
       textSize(25)
       text("+20 Score",290,30);
      
      } 
      if(FirstAidGroup.isTouching(Isaac)){
       FirstAidGroup.destroyEach();
       score=score+100;  
       //textSize(25)
       //text("+100 Score",290,30); 
       
      
      }
  zombies();
  syringe();
  firstaid();
    
    
    }
      else if(gameState === "END"){
        
        BACKGROUND.velocityX=0;
    Isaac.visible=false;
    GameOver.visible=true;
    zombieGroup.destroyEach();
    syringeGroup.destroyEach();
    FirstAidGroup.destroyEach();
    zombieGroup.visible=false;
    syringeGroup.visible=false;
    FirstAidGroup.visible=false;
    score.visible=false;
    score=0;
    
    
    
    
     zombieGroup.setVelocityXEach(0);
     syringeGroup.setVelocityXEach(0);
     FirstAidGroup.setVelocityXEach(0);
        
      }
  
  
  //console.log(frameCount);
  drawSprites();

  textSize(25)
  text("Score:"+score,300,30);
  Isaac.debug = true;
  
}



function zombies(){
  if (frameCount % 70 === 0){
    var zombie = createSprite(450,265,10,40);
    zombie.addImage(ZombieImage);
    zombie.scale=0.3;
    zombie.velocityX=-7;
    zombie.depth = -1;
    
  zombieGroup.add(zombie)
  }
  
  //console.log(frameCount);
  
  
}

function syringe(){
  if (frameCount % 50 === 0){
   var syringe = createSprite(450,265,10,20);
   syringe.y = Math.round(random(265,98)); 
   syringe.addImage(SyringeImage); 
   syringe.scale=0.069;
   syringe.velocityX=-7;
   syringe.depth = syringe.depth-2;
   syringeGroup.add(syringe) 
   syringeGroup.lifetime = 300;
  }  
  
  
  
  
}

function firstaid(){
  if (frameCount % 250 === 0){
   var FirstAid = createSprite(450,265,10,20);
   FirstAid.y = Math.round(random(200,98)); 
   FirstAid.addImage(FirstAidImage ); 
   FirstAid.scale=0.08;
   FirstAid.velocityX=-11;
   FirstAid.depth = FirstAid.depth-1; 
   FirstAidGroup.add(FirstAid) 
   FirstAidGroup.lifetime = 300; 
  }  
  
  
  
  
  
  
  
}












