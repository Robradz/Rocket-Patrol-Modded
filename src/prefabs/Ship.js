class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed;

        // wrap around from left to right
        if(this.x < -this.width) {
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width + 50;
    }
}