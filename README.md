# 🕹️ Block Game
<p align="center">
<img src="https://user-images.githubusercontent.com/70177919/139168074-ce9e0ad8-e503-4572-b2e2-4673796c3cf1.png" width="100%">
</p>

## Description
  
Our project has as the main goal the development of a web multiplayer game inspired by the famous Tetris, where up to 4 players can play simultaneously.

Tetris is a super popular eletronic game that allows players to rotate falling blocks strategically to <b>clear levels</b> while earning points. The goal of the game is to prevent the blocks from stacking up to the top of the screen for as long as possible. When it happens, the blocks reach the top, it's game over. Besides being fun it's an awesome way to instigate competition between players.

# 📝 Before Running

<b>1º</b> - You will need an internet navigator and the Git Bash installed.

<b>2º</b> - Make sure **node.js** is also installed on the machine.

## 💻 Installing Project Locally

- Clone the repository on Git Bash with the command:

```git clone https://github.com/LuSrodri/PA6-Facens-BlockGame.git ```

- Verify if you have installed node.js in your computer: 

``` node -v ```  

Now the game is ready to run. Enjoy! :)

## 💻 Running Project 

-	Firstly, open Git Bash, if the repository is already cloned and node.js installed follow the next steps:

<b>1º</b> - Enter the project's file ``` cd PA6-Facens-BlockGame ``` then enter in "/server" with ```cd server``` and execute the command ``` node ./main.js ``` at the terminal (<b> I M P O R T A N T</b>: do not close the terminal);

<b>2º</b> - In the project's root folder, open the index.html manually.

<b>3º</b> - Click on PLAY;

<b>4º</b> - Click on JOIN A GAME;

<b>5º</b> - With the game inicialized, use the keys 'A' and 'D' to move the pieces;

<b>6º </b>- Use the key 'S' to drop the piece faster;

<b>7º</b> - Uuse the keys 'Q' and 'E' to rotate the pieces.

​ The game is only over when a piece reach the top, to score is necessary clear levels - burn lines - completing a line with block without gapes.	

​	Using the game's generated link is possible to open another tab and initialize another arena, allowing multiplayer mode.


## 📝 What's missing - TO DO

 - Sync the game between the multplayers, so when the game restart when a new player enters the room;
 - Create a condition to Win the Game, so it doesn't "last for ever";
 - Make the End Game screen appears when a player loses or win;

## 📱 Technologies 

- <b>Front-end</b> 
   - HTML - site's structure
   - CSS - site's style.
- <b>Game</b> 
   - JavaScript - game's logic
   - HTML - game's structure
   - CSS - game's style
- <b>Server</b> 
   - node.js e WebSocket - to allow multiplayer



-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
