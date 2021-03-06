class Difficulty extends Phaser.Scene {
    constructor() {
        super("menuScene");
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
            align: 'right',
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
        this.add.text(game.config.width / 2, game.config.height / 2, 
            'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playerCountScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playerCountScene');
        }
    }
}