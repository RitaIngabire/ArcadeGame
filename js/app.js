"use strict";

/* Each block crossed by enemy and player is 101 * 171 pixels */
var HORIZONTAL_STEP = 101; 
var VERTICAL_STEP  = 85; // (171/2 - 0.5)
var isGameWorking = true;

/* Enemies our player must avoid*/
var Enemy = function(x,y,velocity) {    
    /* The image for our enemies, this uses
    a helper we've provided to easily load images
    */
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y+55;//we want the enemy in the middle of the block 101/2
    this.velocity = velocity;
};

/* Update the enemy's position, required method for game
 * Parameter: dt, a time delta between ticks
 */

Enemy.prototype.update = function(dt) {

    /* You should multiply any movement by the dt parameter
       which will ensure the game runs at the same velocity for
       all computers. Remember dt = (now - lastTime) / 1000.0;
    */

    /* if the bug reaches the end of the canvas, start afresh */
    if( this.x < HORIZONTAL_STEP * 5 ){
        this.x += this.velocity * dt;
     } else {
         this.x = -HORIZONTAL_STEP;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Now write your own player class
 *This class requires an update(), render() and
 * a handleInput() method.
 */

var Player = function(){
    /* Set Initial Player Position */
    this.x = HORIZONTAL_STEP * 2 ;
    this.y =  (VERTICAL_STEP * 4) + 55 ;
    this.sprite = 'images/char-boy.png';    
}

Player.prototype.render =  function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput =  function(input) {
    if(input === 'left') {
        if(this.x > 0){
            this.x -= HORIZONTAL_STEP;
        }        
    }

    if(input === 'right'){
        if( this.x < HORIZONTAL_STEP * 4 ){
            this.x  += HORIZONTAL_STEP;
        }
    }

    if(input === 'up') {
        if(this.y > VERTICAL_STEP/2 ){
            this.y -= VERTICAL_STEP ;
        }         
    }  
  
    if(input === 'down') {
        if(this.y < VERTICAL_STEP * 4  ){
            this.y += VERTICAL_STEP ;
        }
    }
}

function collisionDetect(player,enemy){
    return player.y === enemy.y &&
            (enemy.x +  HORIZONTAL_STEP/2 > player.x && enemy.x < player.x + HORIZONTAL_STEP/2)  ;
}

Player.prototype.resetGame = function (){
    //When game is replayed - set the player to intial positions
    this.x = HORIZONTAL_STEP * 2 ;
    this.y = (VERTICAL_STEP * 4) + 55 ; 
}


const modal = document.querySelector('.modal');

Player.prototype.update =  function() {
    //When player gets to water , end game
    if  (this.y === -30)
    {    
         isGameWorking = false;
         modal.style.display = 'block';                              
    } 
    
    //if bug and player collide , reset player position
    for(let enemy of allEnemies){                
        if (collisionDetect(player,enemy))
        { 
          player.resetGame();                  
        }        
    }   
}

/* Now instantiate your objects.
 * Place all enemy objects in an array called allEnemies
 * Place the player object in a variable called player
 */


const player = new Player();
/*Enemy starts one block from  the canvas - first block contains the water i.e -101*/
const allEnemies = [
    new Enemy(-101,0,650),
    new Enemy(-202,85,500),
    new Enemy(-303,170,750)
];

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

/* This function resets the game should the player choose to play again.*/
const restartButton = document.querySelector('.button');
restartButton.addEventListener('click',startGameAfresh);

function startGameAfresh() {
    modal.style.visibility = 'hidden';
    player.resetGame();  
    isGameWorking = true;      
}

/*
 Class resources used to make project 
 https://goo.gl/FAP7cw
*/