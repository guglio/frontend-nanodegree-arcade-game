// function to randomize the speed value everytime enemies start "spawn"
function enemySpeed() {
  min = 100;
  max = 500;
  return Math.random() * (max - min) + min;
};

var Hearts = function(){
  var canvasWidth = 505,
    canvasHeight = 606;
  this.sprite = 'images/mini-Heart.png';
  this.width = 30;
  this.height = 30;
  this.startX = 5;
  this.startY = canvasHeight - (this.height + 25); // I tryed to recreate the same coordinate from the demo video, I guess the y using pixelmator, hope this works fine for the submission
  this.x = this.startX;
  this.y = this.startY;
};

Hearts.prototype.render = function(n){
  for (var i = 0; i < n; i++ )
    ctx.drawImage(Resources.get(this.sprite), this.x + this.width*i, this.y);
};

var Gems = function(){
  var canvasWidth = 505,
    canvasHeight = 606;
  this.sprite = 'images/mini-Gem.png';
  this.width = 30;
  this.height = 30;
  this.startX = canvasWidth - 5 - this.width;
  this.startY = canvasHeight - (this.height + 25); // I tryed to recreate the same coordinate from the demo video, I guess the y using pixelmator, hope this works fine for the submission
  this.x = this.startX;
  this.y = this.startY;
}

Gems.prototype.render = function(n){
  for (var i = 0; i < n; i++ )
    ctx.drawImage(Resources.get(this.sprite), this.x - this.width*i, this.y);
};

// Enemies our player must avoid
var Enemy = function(speed,lineN) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var startX = 53;

    this.width = 101;
    this.height = 171;
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
    var x = this.x + this.speed * dt;
    if ( x > 505 ){
      x = this.startX;
      this.speed = enemySpeed();
    }
    this.x = x;
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
//   player.playerSprites -> array for random player image on new game
//   player.offset -> transparent zone (left and right) of the image
//   player.sprite -> player image url (random)
//   player.startX -> starting x coordinate
//   player.startY -> starting y coordinate
//   player.x -> current x coordinate
//   player.y -> current y coordinate
//   player.moveX -> how much the player move on the x-axis
//   player.moveY -> how much the player move on the y-axis
//   player.startLives -> starting lives of player
//   player.lives -> lives of player
//   player.startGems -> starting gems of player
//   player.gems -> gems of player
// }
// I base the movements on the render function inside 'js/engine.js'
//(row 135 ->  ... ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83); ...)

var Player = function(){
  var playerSprites = ["images/char-boy.png", "images/char-cat-girl.png", "images/char-horn-girl.png", "images/char-pink-girl.png", "images/char-princess-girl.png"];
  var canvasWidth = 505,
    canvasHeight = 606;

  this.playerSprites = playerSprites;
  this.offset = 17;
  this.width = 101;
  this.height = 171;
  this.sprite = this.playerSprites[Math.floor(Math.random()*5)];
  this.startX = canvasWidth / 2 - this.width / 2;
  this.startY = canvasHeight - (this.height + 50); // I tryed to recreate the same coordinate from the demo video, I guess the y using pixelmator, hope this works fine for the submission
  this.x = this.startX;
  this.y = this.startY;
  this.moveX = 101;
  this.moveY = 83;
  this.startLives = 3;
  this.lives = this.startLives;
  this.startGems = 0;
  this.gems = this.startGems;
};

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  hearts.render(this.lives);
  gems.render(this.gems);
};

Player.prototype.update = function(){
  if(this.y <= 219 && this.y >= 53)
    this.collisionCheck(allEnemies);
};

Player.prototype.handleInput = function(key){
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
  if ( y < 53 ){
    y = this.startY;
    x = this.startX;
    this.gems++;
  }

  this.x = x;
  this.y = y;
  player.render();
};

Player.prototype.collisionCheck = function(enemiesList) {
  var lineN = ( this.y - 53 ) / 83
    bug = enemiesList[lineN];

  if( !( ((this.x + this.offset) < bug.x && (this.x + this.width - this.offset) <= bug.x) || ((this.x + this.offset) >= (bug.x + bug.width)) ) ){
    this.x = this.startX;
    this.y = this.startY;
    this.lives--;
  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
  new Enemy(enemySpeed(), 1),
  new Enemy(enemySpeed(), 2),
  new Enemy(enemySpeed(), 3)
];

var player = new Player();
var hearts = new Hearts();
var gems = new Gems();
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
