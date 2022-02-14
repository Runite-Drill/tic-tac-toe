// Variables
const game = {}; //Game object

game.initialise = function() {
  this.playerTurn = 'player1';
  this.previousMove = [];
  this.winner = '';
  this.winColor = 'lightgreen';
  this.board = [
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-'],
  ]
  this.boardColor = [ //this could be constructed much better than manually...
    ['rgba(0,0,0,0)','rgba(0,0,0,0)','rgba(0,0,0,0)'],
    ['rgba(0,0,0,0)','rgba(0,0,0,0)','rgba(0,0,0,0)'],
    ['rgba(0,0,0,0)','rgba(0,0,0,0)','rgba(0,0,0,0)'],
  ]
  this.player1 = {
    icon: 'X',
    color: 'gold'
  }
  this.player2 = {
    icon: 'O',
    color: 'pink'
  }
  //The images below do not work in JS Code for some reason, despite the address being correct and accessible.
  //The images work fine in the Repl version: https://Tic-Tac-Toe.runite-drill.repl.co
  this.X = 'https://imgur.com/2GUJmnE.png'; //FOR SOME REASON THIS IMAGE DOESN'T DISPLAY WHEN USING VS CODE
  this.O = 'https://imgur.com/UekdNVb.png'; //FOR SOME REASON THIS IMAGE DOESN'T DISPLAY WHEN USING VS CODE

  //HARD MODE ACTIVATED
  this.isHardMode = document.getElementById("hardModeCheckbox").checked;


  this.render();

  //a few adjustments to the UI for a new game
  document.getElementById('playerTurn').innerHTML = `Player ${this.playerTurn[6]} <span id='playerColor'>(${this[this.playerTurn].icon})</span>, start the game!`;
  document.getElementById('playerColor').style.color = this[this.playerTurn].color;
  document.getElementById('resetButton').innerText = 'reset game';
}
// Interactions
function clickTracker(event) {
  if ((event.target.nodeName === "TD") || (event.target.nodeName === "IMG")) { //table data or image
   
    // console.log(`You clicked on the table id: ${event.target.id}`);
    if (game.winner === '') {
      if (event.target.nodeName === "TD") {
        game.playedOverOpponent=false;
        game.updateGameBoard(event.target);
      } else if (event.target.nodeName === "IMG") {
        game.playedOverOpponent=true;
        game.updateGameBoard(event.target.parentNode);
      }
      game.render();
    }
  } else if (event.target.id === "resetButton") { //reset button
    game.initialise(); //RESTART the GAME
  } else if (event.target.id === "hardModeCheckbox") { //hard mode checkbox
    alert('You need to reset the game for the changes to take effect.');
  }
}

//controller function
game.updateGameBoard = function(el) {
  let idx = extractIds(el.id); //find the matrix indices from the element ID
  let turn=this.playerTurn;
  let isLegitMove=true;

  //Check if the player made a legitimate move
  if (el.data === this[turn].icon) {
    //Clicked ont heir own square
    alert('You cannot overwrite your own square!');
    isLegitMove = false;
  } else if (this.isHardMode && (idx[0] === this.previousMove[0]) && (idx[1] === this.previousMove[1])) {
    //Clicked on the square of the opponent's previous move (hard mode only)
    alert("You cannot overwrite your opponent's previous move!");
    isLegitMove = false;
  } else if (!this.isHardMode && (el.data != '-')) {
    //clicked on an opponent's square (normal mode only)
    alert("You cannot overwrite your opponent's square!");
    isLegitMove = false;
  }

  if (isLegitMove) { 
    //The player has made a legitimate move
    this.board[idx[0]][idx[1]] = this[turn].icon; //update the game board matrix
    this.boardColor[idx[0]][idx[1]] = this[turn].color; //update the game board colour matrix
    this.previousMove = idx;
    this.checkVictoryConditions(); //and check if anyone wins

    //change turns if game is not over
    if (this.winner === '') {
      if (turn === "player1") {
        this.playerTurn = "player2";
      } else {
        this.playerTurn = "player1";
      }
    }
  }
}

game.checkVictoryConditions = function() {
  //check to see if a player has won the game by getting three of their symbol in a line

  //this function needs simplifying/automating! The win conditions should be predefined in an array/object and a loop used to check each condition, instead of this massive if... else... if statement.
  let board = this.board;
  let winningPlayer = '';

  if (!this.playedOverOpponent) {
    if ((board[0][0] === board[0][1]) && (board[0][0] === board[0][2]) && (board[0][0] === this[this.playerTurn].icon)) { //row 1 - horizontal
      winningPlayer = this.playerTurn;
      this.boardColor[0][0] = this.winColor;
      this.boardColor[0][1] = this.winColor;
      this.boardColor[0][2] = this.winColor;
    } else if ((board[1][0] === board[1][1]) && (board[1][0] === board[1][2]) && (board[1][0] === this[this.playerTurn].icon)) { //row 2 - horizontal
      winningPlayer = this.playerTurn;
      this.boardColor[1][0] = this.winColor;
      this.boardColor[1][1] = this.winColor;
      this.boardColor[1][2] = this.winColor;
    } else if ((board[2][0] === board[2][1]) && (board[2][0] === board[2][2]) && (board[2][0] === this[this.playerTurn].icon)) { //row 3 - horizontal
      winningPlayer = this.playerTurn;
      this.boardColor[2][0] = this.winColor;
      this.boardColor[2][1] = this.winColor;
      this.boardColor[2][2] = this.winColor;
    } else if ((board[0][0] === board[1][0]) && (board[0][0] === board[2][0]) && (board[0][0] === this[this.playerTurn].icon)) { //column 1 - vertical
      winningPlayer = this.playerTurn;
      this.boardColor[0][0] = this.winColor;
      this.boardColor[1][0] = this.winColor;
      this.boardColor[2][0] = this.winColor;
    } else if ((board[0][1] === board[1][1]) && (board[0][1] === board[2][1]) && (board[0][1] === this[this.playerTurn].icon)) { //column 2 - vertical
      winningPlayer = this.playerTurn;
      this.boardColor[0][1] = this.winColor;
      this.boardColor[1][1] = this.winColor;
      this.boardColor[2][1] = this.winColor;
    } else if ((board[0][2] === board[1][2]) && (board[0][2] === board[2][2]) && (board[0][2] === this[this.playerTurn].icon)) { //column 3 - vertical
      winningPlayer = this.playerTurn;
      this.boardColor[0][2] = this.winColor;
      this.boardColor[1][2] = this.winColor;
      this.boardColor[2][2] = this.winColor;
    } else if ((board[0][0] === board[1][1]) && (board[0][0] === board[2][2]) && (board[0][0] === this[this.playerTurn].icon)) { //diagonal 1 - \
      winningPlayer = this.playerTurn;
      this.boardColor[0][0] = this.winColor;
      this.boardColor[1][1] = this.winColor;
      this.boardColor[2][2] = this.winColor;
    } else if ((board[0][2] === board[1][1]) && (board[0][2] === board[2][0]) && (board[0][2] === this[this.playerTurn].icon)) { //diagonal 2 - /
      winningPlayer = this.playerTurn;
      this.boardColor[0][2] = this.winColor;
      this.boardColor[1][1] = this.winColor;
      this.boardColor[2][0] = this.winColor;
    } else if (this.checkForTie()) { //TIE
      winningPlayer = 'tie';
    } 
  }
  //set winner
  this.winner = winningPlayer;
}

game.checkForTie = function() {
  let isTieGame = true;
  for (i in this.board) {
    for (j in this.board[i]) {
      if (this.board[i][j] === '-') {
        //If any of the elements of the matrix can still be filled (i.e. is '-') then the game is not tied and can continue
        isTieGame = false;
      }
    }
  }
  return isTieGame;
}

game.render = function() {
  // display gamestate on screen
      
  document.querySelector('table').style.border=`${this[this.playerTurn].color} solid 6px`;

  //Display hard mode
  if (this.isHardMode) {
    document.querySelector('h1').innerHTML = "<span id='h1Text'>EXTREME</span> Tic Tac Toe";
    document.querySelector('p').innerHTML = "Connect <span id='pText'>three in a row</span> to win!<br />You can <span id='hardModeText'>overwrite</span> your opponent's squares, but <span id='hardModeText'>cannot win</span> on a turn where you do so.<br />You <span id='hardModeText'>cannot</span> overwrite your opponent's <span id='hardModeText'>previous move</span>.";

  } else {
    document.querySelector('h1').innerHTML = "Tic Tac Toe";
    document.querySelector('p').innerHTML = "Connect <span id='pText'>three in a row</span> to win!<br /> <br />Try <span id='hardModeText'>hard mode</span> for a more extreme challenge.";

  }

  // display X's and O's onto the board
  for (i in this.board) {
    for (j in this.board[i]) {
      let newId = '_'+i+'.'+j;
      let tableObj = document.getElementById(newId);
      let playerIcon = this.board[i][j];
      tableObj.innerText = playerIcon;
      tableObj.data = playerIcon;
      tableObj.style.border=`${this.boardColor[i][j]} solid 4px`;
      if (playerIcon === 'X' || playerIcon === 'O') {
        tableObj.innerHTML=`<img src=${this[playerIcon]}>`;
      }
    }
  }

  //change the message at the bottom of the board
  let pTurnMes = document.getElementById('playerTurn');
  if (this.winner === '') {
    //game is not over - indicate which player's turn it is
    pTurnMes.innerHTML = `Player ${this.playerTurn[6]} <span id='playerColor'>(${this[this.playerTurn].icon})</span>, go!`;
    //change colour of the X / O in the turn message
    document.getElementById('playerColor').style.color = this[this.playerTurn].color;
  } else if (this.winner != 'tie') { 
    // we have a winner!
    pTurnMes.innerHTML = `Congratulations! <span id='playerColor'>Player ${this.winner[6]} (${this[this.winner].icon})</span> has won the game!`;
    document.getElementById('playerColor').style.color = this[this.winner].color;
    document.getElementById('resetButton').innerText = 'Play again!';
  } else {
    //It's a tie
    pTurnMes.innerHTML = `The game was <span id='playerColor'>tied</span>!`;
    document.getElementById('playerColor').style.color = 'lightyellow';
    document.querySelector('table').style.border=`skyblue solid 6px`;
    document.getElementById('resetButton').innerText = 'Play again!';
  }
}
// Turn the table element ID's into a numerical index that can be used to access the matrix
function extractIds(idString) {
  return [Number(idString[1]),Number(idString[3])];
}

//set up the game and begin!
game.initialise() 



//To be added: EXTREME TIC TAC TOE where you can play over the top of the other player but cannot win on the turn you play over the top of them.
