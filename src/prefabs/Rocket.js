class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.isFiring = false;
        this.sfxRocket = scene.sound.add('sfx_rocket');
        this.moveSpeed = 2;
    }

    update(){
        if(!this.isFiring){
            if(!game.input.mousePointer.isDown && this.x >= borderUISize + this.width &&  this.x>mouseX){
                this.x -= this.moveSpeed;
            }else if(!game.input.mousePointer.isDown && this.x <= game.config.width - borderUISize-this.width && this.x<mouseX){
                this.x += this.moveSpeed;
            }
        }
        if(game.input.mousePointer.isDown){
            this.isFiring = true;
            this.sfxRocket.play();
        }if(this.isFiring && this.y >= borderUISize*3 + borderPadding){
            this.y -= this.moveSpeed;
        }if(this.y <= borderUISize*3 + borderPadding){
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }

    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize-borderPadding;
    }
}
