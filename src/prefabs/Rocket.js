class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 4;
        this.fireType;
        this.isFiring = false;
        this.boat;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    setFireType(type) {
        this.fireType = type;
    }

    linkBoat(boat) {
        this.boat = boat;
    }

    update() {
        if(this.isFiring) {
            this.y -= this.movementSpeed;
            if(this.y < borderUISize*3 + borderPadding) {
                this.reset();
            }
        } else {
            if((this.fireType == 'U' && keyLEFT.isDown) 
                || (this.fireType == 'W' && keyA.isDown)) {
                this.x -= this.movementSpeed;
            }
            if((this.fireType == 'U' && keyRIGHT.isDown) 
                || (this.fireType == 'W' && keyD.isDown)) {
                this.x += this.movementSpeed;
            }

            if((this.fireType == 'U' && Phaser.Input.Keyboard.JustDown(keyUP)) 
                || (this.fireType == 'W' && Phaser.Input.Keyboard.JustDown(keyW))) {
                this.isFiring = true;
                this.sfxRocket.play();  // play sfx
            }
    
            this.x = Phaser.Math.Clamp(
                this.x,
                borderUISize + borderPadding,
                game.config.width - borderUISize - borderPadding);
        }
        
    }

    reset() {
        this.x = this.boat.x;
        this.y = this.boat.y;
        this.isFiring = false;
    }
}