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
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            }else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize-this.width){
                this.x += this.moveSpeed;
            }
        }
        if(game.input.mousePointer.isDown){
            this.isFiring = true;
            this.sfxRocket.play();
        }if(this.isFiring && this.y >= borderUISize*3 + borderPadding){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            }else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize-this.width){
                this.x += this.moveSpeed;
            }
            this.y -= (this.moveSpeed+2);
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
