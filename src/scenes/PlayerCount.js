class PlayerCount extends Phaser.Scene {
    constructor() {
        super("playerCountScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create() {
        // display score
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#03A1FC',
            color: '#02112B',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //Show Menu Text
        this.add.text(game.config.width/2, game.config.height/2 - 
            borderUISize - borderPadding, 'ROCKET PATROL', 
            menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2,
            "Player 1:\n Use A & D to move & W to fire\n" +
            "Player 2:\n Use <- & -> to move & /\\ to fire", menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width / 2, game.config.height / 2 + (borderUISize +
            borderPadding) * 2, 'Press <- for Singleplayer\n or -> for Multiplayer', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // single player
            this.sound.play('sfx_select');
            this.scene.start('singleplayerScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // 2 players
            this.sound.play('sfx_select');
            this.scene.start('multiplayerScene');    
        }
    }
}