/*
Robert Radzville
Navy Patrol
April 19, 2021
This assignment took ~10 hours to complete

Point breakdown:
5  Implement the speed increase that happens after 30 seconds in the original game
5  Randomize each spaceship's(planes in my case) movement direction at the start of each play
   - For this one, each plane moves either slightly upward or downward on every loop to give
   the player the experience of each plane being a new individual plane instead of the same 3.
   It also makes the ships a little less predictible on the timing since it moves a different
   speed when the y is calculated as well.
10 Implement parallax scrolling
   - There are 4 layers of parallax scrolling with the sky and 3 mountain ranges.
10 Display the time remaining (in seconds) on the screen
20 Create new artwork for all of the in-game assets (rocket, spaceships, explosion)
20 Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points
   - This is the one that looks more like a jet and not a plane, who's hitbox is made smaller by not
   having a large wingspan.
30 Implement a simultaneous two-player mode
   - After selecting either difficulty, you can choose to play multiplayer or singleplayer.
*/



let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Difficulty, PlayerCount, Multiplayer, Singleplayer],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyUP, keyA, keyD, keyW, keyR;