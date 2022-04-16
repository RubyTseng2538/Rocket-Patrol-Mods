class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        this.load.image('starfield', './assets/galaxy.png');
        this.load.image('title', './assets/title.png');
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/space_crash.m4a');
        this.load.audio('sfx_explosion2', './assets/space_crash2.m4a');
        this.load.audio('sfx_explosion3', './assets/space_crash3.m4a');
        this.load.audio('sfx_explosion4', './assets/space_crash4.m4a');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('sfx_background', './assets/callisto.m4a');
    }
    create(){
        let menuConfig = {
            fontFamily: 'monospace',
            fontSize: '28px',
            color: '#00FFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.title = this.add.tileSprite(155, 100, 330, 209, 'title').setOrigin(0, 0);
        this.add.text(game.config.width/2, game.config.height/2 +155, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize+borderPadding +155, 'Press ← to start', menuConfig).setOrigin(0.5);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
    }

    update(){
        this.starfield.tilePositionX -=0.5;
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }
}

