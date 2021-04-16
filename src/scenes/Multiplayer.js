class Multiplayer extends Phaser.Scene {
    constructor() {
        super("multiplayerScene");
        this.ships = [];
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('background3', 'assets/background3.png');
        this.load.image('background2', 'assets/background2.png');
        this.load.image('background1', 'assets/background1.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('battleship1', 'assets/battleship1.png');
        this.load.image('battleship2', 'assets/battleship2.png');
        this.load.image('plane1', 'assets/plane1.png');
        this.load.image('plane2', 'assets/plane2.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 9});
    }

    create() {

        this.sky = this.add.tileSprite(
            0,0,640,480, 'sky'
        ).setOrigin(0,0);

        this.background3 = this.add.tileSprite(
            0,0,640,480, 'background3'
        ).setOrigin(0,0);

        this.background2 = this.add.tileSprite(
            0,0,640,480, 'background2'
        ).setOrigin(0,0);

        this.background1 = this.add.tileSprite(
            0,0,640,480, 'background1'
        ).setOrigin(0,0);

        this.p1Rocket = new Rocket(
            this,
            game.config.width/2,
            game.config.height - borderUISize - borderPadding,
            'rocket'
        );
        this.p1Boat = new Boat(
            this,
            game.config.width/2,
            game.config.height - borderUISize - borderPadding,
            'battleship1'
        );
        this.p1Rocket.setFireType('W');
        this.p1Boat.setFireType('W');
        this.p1Rocket.linkBoat(this.p1Boat);

        this.p2Rocket = new Rocket(
            this,
            game.config.width/2,
            game.config.height - borderUISize - borderPadding,
            'rocket'
        );
        this.p2Boat = new Boat(
            this,
            game.config.width/2,
            game.config.height - borderUISize - borderPadding,
            'battleship2'
        );
        this.p2Rocket.setFireType('U');
        this.p2Boat.setFireType('U');
        this.p2Rocket.linkBoat(this.p2Boat);

        // add spaceships (x3)
        this.ship1 = new Ship(this, game.config.width + 
            borderUISize*6, borderUISize*4, 'plane1', 
            0, 30).setOrigin(0, 0);
        this.ship2 = new Ship(this, game.config.width + 
            borderUISize*3, borderUISize*5 + borderPadding*2, 
            'plane1', 0, 20).setOrigin(0,0);
        this.ship3 = new Ship(this, game.config.width, 
            borderUISize*6 + borderPadding*4, 'plane1', 0, 
            10).setOrigin(0,0);
        this.ship4 = new Ship(this, game.config.width, 
            borderUISize*4, 'plane2', 0, 
            40).setOrigin(0,0);
        this.ship4.setMoveSpeed(5);

        this.ships = [];
        this.ships.push(this.ship1);
        this.ships.push(this.ship2);
        this.ships.push(this.ship3);
        this.ships.push(this.ship4);
        console.log(this.ships);

        // green UI background
        this.add.rectangle(
            0,
            borderUISize + borderPadding,
            game.config.width,
            borderUISize * 2,
            0x00FF00,
            ).setOrigin(0,0);

        // white borders
	    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);      
        keyUP    = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', 
                { start: 0, end: 8, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(
            (borderUISize + borderPadding) * 2, 
            borderUISize + borderPadding * 2, 
            this.p1Score, scoreConfig
        );

        this.scoreMiddle = this.add.text(
            (borderUISize + borderPadding) * 6,
            borderUISize + borderPadding * 2, 
            this.p2Score, scoreConfig
        );

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 
                'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 
                'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.sky.tilePositionX -= 1.5;
        this.background3.tilePositionX -= 1.25;
        this.background2.tilePositionX -= 1;
        this.background1.tilePositionX -= 0.75;
        
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.p2Rocket.update();
            this.p1Boat.update();
            this.p2Boat.update();
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
            this.ship4.update();
        }

        // check collisions
        for (let ship of this.ships) {
            if(this.checkCollision(this.p1Rocket, ship)) {
                this.p1Rocket.reset();
                this.shipExplode(ship, this.p1Rocket);   
            }
            if(this.checkCollision(this.p2Rocket, ship)) {
                this.p2Rocket.reset();
                this.shipExplode(ship, this.p2Rocket);   
            }
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width / 2 && 
            rocket.x + rocket.width / 2 > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship, scorer) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        if (scorer == this.p1Rocket) {
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
        } else {
            this.p2Score += ship.points;
            this.scoreMiddle.text = this.p2Score;
        }
        
        this.sound.play('sfx_explosion');
    }
}