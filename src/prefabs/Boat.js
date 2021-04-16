class Boat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 4;
        this.fireType;
    }

    setFireType(type) {
        this.fireType = type;
    }

    update() {
        
        if((this.fireType == 'U' && keyLEFT.isDown) 
            || (this.fireType == 'W' && keyA.isDown)) {
            this.x -= this.movementSpeed;
        }

        if((this.fireType == 'U' && keyRIGHT.isDown) 
            || (this.fireType == 'W' && keyD.isDown)) {
            this.x += this.movementSpeed;
        }

        this.x = Phaser.Math.Clamp(
            this.x,
            borderUISize + borderPadding,
            game.config.width - borderUISize - borderPadding);
    }

    reset() {
        this.y = game.config.height-borderUISize-borderPadding;
        this.isFiring = false;
    }
}