
/* Each block crossed by enemy and player is 101 * 171 pixels */
const horizontalStep = 101; 
const verticalStep  = 85; // (171/2 - 0.5)

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
    if( this.x < horizontalStep * 5 ){
        this.x += this.velocity * dt;
     } else {this.x = -horizontalStep;}

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
    this.x = horizontalStep * 2 ;
    this.y =  (verticalStep * 4) + 55 ;
    this.sprite = 'images/char-boy.png';    
}

Player.prototype.render =  function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput =  function(input) {
    if(input === 'left') {
        if(this.x > 0){
            this.x -= horizontalStep;
        }        
    }

    if(input === 'right'){
        if( this.x < horizontalStep * 4 ){
            this.x  += horizontalStep;
        }
    }

    if(input === 'up') {
        if(this.y > verticalStep/2 ){
            this.y -= verticalStep ;
        }         
    }  
  
    if(input === 'down') {
        if(this.y < verticalStep * 4  ){
            this.y += verticalStep ;
        }
    }
}

function collisionDetect(player,enemy){
    return player.y === enemy.y &&
            (enemy.x +  horizontalStep/2 > player.x && enemy.x < player.x + horizontalStep/2)  ;
}

Player.prototype.resetGame = function (){
    //When game is replayed - set the player to intial positions
    this.x = horizontalStep * 2 ;
    this.y = (verticalStep * 4) + 55 ;  
}


const modal = document.querySelector('.modal');

Player.prototype.update =  function() {
    //When player gets to water , end game
    if  (this.y === -30)
    {    
         modal.style.display = 'block'; 
         win.cancelAnimationFrame(win.requestAnimationFrame(main));        
    } 
    
    //if bug and player collide , reset player position
    for(let enemy of allEnemies){                
        if (collisionDetect(player,enemy))
        { 
          this.resetGame();                  
        }        
    }   
}

/* Now instantiate your objects.
 * Place all enemy objects in an array called allEnemies
 * Place the player object in a variable called player
 */


const player = new Player();
const allEnemies = [];

/*Enemy starts one block from  the canvas - first block contains the water i.e -101*/
allEnemies[0] = new Enemy(-101,0,650);//velocity = number of pixels bug crosses every second
allEnemies[1] = new Enemy(-202,85,500);
allEnemies[2] = new Enemy(-303,170,750);

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
restartButton.addEventListener('click', startGameAfresh);

function startGameAfresh() {
    player.resetGame(); 
    modal.style.visibility = 'hidden';    
    window.location.reload();  
}


/*
 Class resources used to make project 
 https://goo.gl/FAP7cw
*/