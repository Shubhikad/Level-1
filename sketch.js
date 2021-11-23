var bg, car, pic, text, textObj, room, pic3Img ;
var boyImg,boy;
var start, startImg;
var boySleeping;
var conCone, conConeImg;
var banana, bananaImg;
var puddle, puddleImg;
var score = 0;
var coin, coinImg, coinGrp;
var honk, honkImg;
var gameState = 0;
var gameOver1, gameOver1Img
var gameOverI,gameOverIImg
var stars, star1,star2,star3,star0;


//groups
var trafGrp 
var puddleGrp 
var coneGrp
function preload(){
  boyImg = loadAnimation( "1.gif", "2.gif", "3.gif", "4.gif","5.gif" )
  boyImg2 = loadAnimation("1.gif")
  text = loadImage("text.png")
  room = loadImage("key room.jpg")
   pic3Img = loadImage("road (2).jpg")
   startImg = loadImage("start.png")
   conConeImg = loadImage("cone.png")
   bananaImg = loadImage("Banana peel.png")
   puddleImg = loadImage("puddle.png")
   trafLigImg = loadImage("traffic light.png")
   coinImg = loadImage("coin.png")
   honkImg = loadImage("honk.png")
   gameOver1Img = loadImage("police.png")
   gameOverIImg = loadImage("gameOver.png")
   star0 = loadImage("0 stars.png")
   star1 = loadImage("1 star.png")
   star2 = loadImage("2 stars.png")
   star3 = loadImage("3 stars.png")

}
function setup(){
  createCanvas(2000,1101)
  pic1 = createSprite(265,350,20,20)
  pic1.x = pic1.width/2
  //pic1.scale = 0
  pic1.addImage(pic3Img)
   

  origBag = createSprite(1000,584, 20,20)
  origBag.addImage(room)
  origBag.scale = 0.8

  textObj = createSprite(500,200,20,20)
  textObj.addImage(text)

  
  honk = createSprite(200,200,20,20)
  honk.addImage(honkImg)
  honk.scale = 0.7
  honk.visible = false
   

   boy = createSprite(400,850,20,20)
    boy.addAnimation("running",boyImg)
   boy.scale = 6
    boy.visible = false
    boy.debug = true 
    boy.setCollider("circle",0,0,50)

    start = createSprite(1700,850, 100,100)
  // start.addImage(startImg)
  start.visible = false
  gameOver1 = createSprite(1300,600,20,20) 
  gameOver1.visible = false 
  gameOver1.scale = 0.5
  gameOver1.addImage(gameOver1Img)
  gameOverI = createSprite(1050,200,20,20)
  gameOverI.addImage(gameOverIImg)
  gameOverI.visible = false
  gameOverI.scale = 2

  stars = createSprite(1000,400,20,20)
  stars.visible = false
trafGrp = new Group(); 
puddleGrp = new Group(); 
coneGrp = new Group();
coinGrp = new Group();


}



function draw(){
  background(0)
  if(pic1.x < 300){
    pic1.x = pic1.width/3
  }
  
  console.log(score)
      

  if(mousePressedOver(start)){
    origBag.visible = false
    start.visible = false
    textObj.visible = false
    
    gameState = 1
    levelOne();
  }
  


  if(gameState === 1){
    levelOne();
  }

  if(gameState === 2){
    gameOver();
  }
  
  drawSprites()

}

function levelOne(){
  background(0)
  //console.log("hello")
  pic1.addImage(pic3Img)
  //pic1.scale = 2
  pic1.velocityX = -20 - score
  boy.visible = true
  if(boy.isTouching(coinGrp)){
    score = score+1
    coinGrp.destroyEach(coin)
  }

  if(boy.isTouching(coneGrp)||boy.isTouching(puddleGrp)){
    
    gameState = 2
  }
  honk.visible = true

  if(mousePressedOver(honk)){
    coneGrp.destroyEach(conCone)
    puddleGrp.destroyEach(puddle)
  }

  spawnCone()
  spawnCoin()
  spawnPuddle()
  spawnTraf()
  

    


    
    
    

}

function spawnCone(){
  if(frameCount%320 === 0){
  conCone = createSprite(2000,850,20,20)
  conCone.velocityX = -20 - score
  conCone.scale = 0.3
  conCone.addImage(conConeImg)
  coneGrp.add(conCone)
  coneGrp.setLifetimeEach(-1);
  boy.depth = conCone.depth+3 
}
}

/*function spawnBanana(){
  if(frameCount%230 === 0){
  banana = createSprite(550,320,20,20)
  banana.velocityX = -2
  banana.addImage(bananaImg)
  banana.scale = 0.2

}
}*/

function spawnPuddle(){
  if(frameCount%730 === 0){
  puddle = createSprite(2020,850,20,20)
  puddle.velocityX = -20 - score
  puddle.addImage(puddleImg)
  puddleGrp.add(puddle);
  puddleGrp.setLifetimeEach(-1);
  boy.depth = puddle.depth+3 
}
}

function spawnTraf(){
if(frameCount%700 === 0){
  trafLig = createSprite(2000,300,50,50)
  trafLig.addImage(trafLigImg)
  trafLig.velocityX = -20 - score
  boy.depth = trafLig.depth+3 
  trafGrp.add(trafLig)
  trafGrp.setLifetimeEach(-1);
  //trafLig.scale = 0.2
  
}
}

function spawnCoin(){
  if(frameCount%100 === 0){
    coin = createSprite(2000, 850, 50, 50)
    coin.addImage(coinImg)
    coin.velocityX =  -20 - score
    coinGrp.setLifetimeEach(-1);
    coinGrp.add(coin)
    //trafLig.scale = 0.2
    boy.depth = coin.depth+3
    coin.debug = true 
    coin.setCollider("circle",0,0,100)
  }
  }
function gameOver(){
  coneGrp.destroyEach(conCone)
  puddleGrp.destroyEach(puddle)
  //trafGrp.destroyEach(trafLig)
  coinGrp.destroyEach(coin)
  gameOver1.visible = true
  gameOver1.depth = boy.depth+1
  pic1.velocityX = 0
  //boy.changeAnimation(boyImg2)
  gameOverI.visible = true
  honk.visible = false
  if(score >= 0 && score <= 6 ){
    stars.visible = true
    stars.addImage(star0)
    stars.scale = 0.3
  }
  if(score >= 7 && score <= 20 ){
    stars.visible = true
    stars.addImage(star1)
    stars.scale = 0.3
  }
  if(score >= 21 && score <= 50 ){
    stars.visible = true
    stars.addImage(star2)
    stars.scale = 0.3
  }
  if(score > 50 ){
    stars.visible = true
    stars.addImage(star3)
    stars.scale = 0.3
  }
}




