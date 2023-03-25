var player;
var monster;
var spike1, spike2;
var bg
var bgImg
var gameOver;
var coinGroup, coinImg, coin;
var life1, life2, life3;
var playerImg, monsterImg, trap1, trap2;
var invisibleGround;
var end = 1;
var Play = 2;
var gameState = Play;
var restart;
var score = 0;
var victory

function preload() {
playerImg = loadAnimation("player1.png","player2.png","player3.png","player4.png","player5.png","player6.png","player7.png","player8.png");
monsterImg = loadImage("Monster1.png");
trap1 = loadImage("spike1.png");
trap2 = loadImage("spike2.png");
bgImg = loadImage("Background.png");
coinImg = loadImage("Coin.png");
lifeImg = loadImage("life.png");
gameoverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");
coinImg = loadImage("Coin.png");
victoryImg = loadImage("Victory.png")
};

function setup() {
  createCanvas(950,600);
  victory = createSprite(450, 300, 50, 50);
  victory.addImage(victoryImg);
  restart = createSprite(450, 500, 300,200);
  restart.addImage(restartImg);
  restart.visible = false;
  restart.scale = 0.8;
  gameOver = createSprite(450, 300, 50, 50);
  gameOver.addImage(gameoverImg);
  gameOver.scale = 1.8;
  player = createSprite(600, 540, 50, 50);
  player.addAnimation("running",playerImg);
  player.scale = 1.15;
  monster = createSprite(100, 390, 50, 50);
  monster.addImage(monsterImg);
  monster.scale = 0.8;
  spike1 = createSprite(2350, 550, 50, 50);
  spike1.scale = 0.14;
  spike1.addImage(trap1);
  spike1.velocityX = -(13+score/950);
  spike2 = createSprite(3350, 90, 50, 50);
  spike2.scale = 0.8;
  spike2.addImage(trap2);
  spike2.velocityX  = -27;
  life1 = createSprite(100, 70, 50, 50);
  life1.scale = 0.17;
  life1.addImage(lifeImg);
  life2 = createSprite(200, 70, 50, 50);
  life2.scale = 0.17;
  life2.addImage(lifeImg);
  life3 = createSprite(300, 70, 50, 50);
  life3.scale = 0.17;
  life3.addImage(lifeImg);
  invisibleGround = createSprite(420,584, 1000, 1);
  invisibleGround.visible = false;
  bg = createSprite(630, 300, 50, 50);
  bg.addImage(bgImg);
  coinGroup = createGroup();
}

function draw() { 
  victory.visible = false
  restart.depth = 5;
  gameOver.depth = 4;
  monster.depth = 3;
  spike1.depth = 2;
  player.depth = 3;
  bg.depth = 1;
  bg.velocityX = -(13+score/950);
  
  if (gameState === Play) {
    gameOver.visible = false
    restart.visible = false
    life1.visible = true
    life2.visible = true
    life3.visible = true
    spike1.visible = true;
    spike2.visible = true;
    player.visible = true;
    monster.visible = true;
  } else if (gameState === end) {
    spike1.visible = false;
    spike2.visible = false;
    player.visible = false;
    monster.visible = false;
    coinGroup.destroyEach();
    gameOver.visible = true;
    restart.visible = true;
  }
  
  player.collide(invisibleGround);
  if (bg.x < -1700) {
    bg.x = 690;
    }
    if (spike1.x < -860) {
      spike1.x = 950;
      }
      if (spike2.x < -960) {
        spike2.x = 1150;
        }
      if((keyDown("space")&& player.y >= 160)) {
        player.velocityY = -14;
      }
      player.velocityY = player.velocityY + 0.8;
      if (player.isTouching(spike1)||player.isTouching(spike2)) {
        spike1.x = -850;
        player.x = player.x - 150;
        player.y = 540;
      }
      if (player.x < 460) {
        life3.visible = false
      };
      if (player.x < 310) {
        life2.visible = false
      };
      if (player.x < 160) {
        life1.visible = false
      };
      if (life1.visible === false) {
        gameState = end; 
      }
      if (mousePressedOver(restart)) {
       reset();
      }
      if (mousePressedOver(victory)) {
        reset();
       }
      if (coinGroup.isTouching(player)) {
        score = score + 1;
        coinGroup.destroyEach();
      }
      if (score === 20) {
        spike1.visible = false;
    spike2.visible = false;
    player.visible = false;
    monster.visible = false;
    coinGroup.destroyEach();
        victory.visible = true;
        bg.visible = false;
        bg.velocityX = 0;
        spike1.velocityX = 0;
        spike2.velocityX = 0;
        life1.depth = -7;
        life2.depth = -5;
        life3.depth = -3;
        life1.visible = true;
        life2.visible = true;
        life3.visible = true;
        life3.x =  5000;
        life2.x =  5000;
        life1.x =  5000;
        victory.depth = 17;
        background("white");
      } 
      spawnCoins();
  drawSprites();
  if (score === 0) {
  textSize(27);
  fill("white");
  text("press space to jump & avoid obstactles", 350, 370);
  text("Collect 20 coins to win before the monster catches you!", 260, 400);
  }
  textSize(35);
  fill("white");
  text("Coins collected: " + score, 390, 50);
};
function reset() {
  gameState = Play;
  gameOver.visible = false;
  restart.visible = false;
  restart.depth = 0;
  gameOver.depth = 0;
  life1.visible = true;
    life2.visible = true;
    life3.visible = true;
    player.x = 600;
    spike1.x = 2350;
    spike2.x = 3350;
    score = 0;
}

function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 45 === 0) {
     coin = createSprite(2000,100,40,10);
    coin.y = Math.round(random(560,70));
    coin.addImage(coinImg);
    coin.scale = 0.2;
    coin.velocityX = -19;
    
     //assign lifetime to the variable
    if (coin.x === -10) {
     coin.lifetime = 0;
    }
    //adjust the depth
    coin.depth = 6;
    
    //adding cloud to the group
   coinGroup.add(coin);
    }
}