class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('ship', './assets/spaceship.png');
        this.load.image('starfield', './assets/galaxy.png');
        this.load.image('planet', './assets/planets.png');
        this.load.image('gameover', './assets/gameover.png');
        this.load.image('border', './assets/border.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 55, frameHeight: 43, startFrame: 0, endFrame: 5});
    }
    create(){
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.planet = this.add.tileSprite(0, 0, 640, 480, 'planet').setOrigin(0, 0);
        this.border = this.add.tileSprite(0, 0, 640, 480, 'border').setOrigin(0, 0);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height -borderPadding -borderUISize ,'rocket').setOrigin(1, 0.75);
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize* 4, 'ship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5+ borderPadding*2, 'ship', 0, 20). setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'ship', 0, 10).setOrigin(0, 0);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.p1Score = 0;
        this.letime = 60000;   

        let scoreConfig = {
            fontFamily: 'monospace',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize+borderPadding, borderUISize+borderPadding*2, this.p1Score, scoreConfig);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 5, first: 0}),
            frameRate: 30
        });

        this.gameOver = false;
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(30000, () => {
            this.ship01.moveSpeed = 2.25;
            this.ship02.moveSpeed = 2.25;
            this.ship03.moveSpeed = 2.25;
        })
        this.clock = this.time.delayedCall(60000, () => {
            this.end= this.add.tileSprite(155, 200, 330, 121, 'gameover').setOrigin(0, 0);
            this.gameOver = true;
        }, null, this);
   }
    update(){
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        this.starfield.tilePositionX -=0.5;
        this.planet.tilePositionX -=1.5;
        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship){
        if(rocket.x <ship.x + ship.width &&
           rocket.x + rocket.width > ship.x &&
           rocket.y <ship.y + ship.height &&
           rocket.height + rocket.y > ship.y){
               return true;
        }else{
            return false;
        }
    }

    shipExplode(ship){
        ship.alpha =0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', ()=> {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
}

