class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeedX = game.settings.spaceshipSpeed;
        this.moveSpeedY = Math.random() * 0.5 - 0.25;
        this.resetX = x;
        this.resetY = y;
    }

    setMoveSpeed(speedX, speedY) {
        this.moveSpeedX = speedX;
        this.moveSpeedY = speedY;
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeedX;
        this.y -= this.moveSpeedY;

        // wrap around from left to right
        if(this.x < -this.width) {
            this.reset()
        }
    }

    reset() {
        this.x = this.resetX;
        this.y = this.resetY;
        this.moveSpeedY = Math.random() * 0.5 - 0.25;
    }
}