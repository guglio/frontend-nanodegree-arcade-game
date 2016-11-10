// Enemies our player must avoid
var Enemy = function(speed,lineN) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var startX = 53;
    this.startY = startX + (lineN - 1) * 83;
    this.startX = -101;
    this.x = this.startX;
    this.y = this.startY;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Load all the players sprites, into an array, for future features
// (like random player or possibility to choose one)
// create the starting coordinates on bottom middle of the canvas.
// I structured the Player class like this:
// Player = function(){
//   player.sprite -> player image url
//   player.startX -> starting x coordinate
//   player.startY -> starting y coordinate
//   player.x -> current x coordinate
//   player.y -> current y coordinate
//   player.moveX -> how much the player move on the x-axis
//   player.moveY -> how much the player move on the y-axis
// }
// I base the movements on the render function inside 'js/engine.js'
//(row 135 ->  ... ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83); ...)

var Player = function(){
  var playerSprites = ["images/char-boy.png", "images/char-cat-girl.png", "images/char-horn-girl.png", "images/char-pink-girl.png", "images/char-princess-girl.png"];
  var canvasWidth = 505,
    canvasHeight = 606,
    playerSpriteWidth = 101,
    playerSpriteHeight = 171;

  this.sprite = playerSprites[0];
  this.startX = canvasWidth / 2 - playerSpriteWidth / 2;
  this.startY = canvasHeight - (playerSpriteHeight + 50); // I tryed to recreate the same coordinate from the demo video, I guess the y using pixelmator, hope this works fine for the submission
  this.x = this.startX;
  this.y = this.startY;
  this.moveX = 101;
  this.moveY = 83;
};

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(X,Y){
  //console.log("update player");
  console.log("x: "+this.x+" y: "+this.y);
};

Player.prototype.handleInput = function(key){
  //console.log(key);
  var x = this.x
    y = this.y;
  switch(key){
    case 'up':
      y -= this.moveY;
      break;
    case 'down':
      y += this.moveY;
      break;
    case 'left':
      x -= this.moveX;
      break;
    case 'right':
      x += this.moveX;
      break;
  }
  if ( x < 0 || x > 404 )
    x = this.x;
  if ( y > 385 )
    y = this.y;
  if ( y < -30 ){
    y = this.startY;
    x = this.startX;
  }

  this.x = x;
  this.y = y;
  player.render();
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
