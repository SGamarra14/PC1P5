/*var juego = new Phaser.Game(300,500, Phaser.CANVAS, 'bloque_juego');
var fondoJuego;

var persona;
var teclaDerecha;
var teclaIzquierda;
var teclaArriba;
var teclaAbajo;
var nuevo;

var estadoPrincipal = {
    preload: function () {
        juego.load.image('fondo', 'img/fondo.png');
        juego.load.spritesheet('animacion', 'img/dude.png', 32, 48);
    },
    create: function() {
        fondoJuego = juego.add.tileSprite(0, 0, 300, 500, 'fondo');

        nuevo = juego.add.sprite(32, 48, 'animacion');
        nuevo.animations.add('movi', [0,1,2,3,4,5], 10, true);

        teclaDerecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        teclaIzquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        teclaArriba = juego.input.keyboard.addKey(Phaser.Keyboard.UP);
        teclaAbajo = juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    },
    update: function() {
        fondoJuego.tilePosition.x-=1;

        if(teclaDerecha.isDown){
            nuevo.x++;
            nuevo.animations.play('movi');
        }

        if(teclaIzquierda.isDown){
            nuevo.x--;
            nuevo.animations.play('movi');
        }
    }
    
};

juego.state.add('principal', estadoPrincipal);
juego.state.start('principal');*/

class Example extends Phaser.Scene
{
    player;
    platform;
    cursors;
    ground;

    preload ()
    {
        this.load.image('fondo', 'https://i.ibb.co/4SMbvGv/fondo.png');
        this.load.image('ground', 'https://i.ibb.co/8x22dTS/suelo.png');
        this.load.image('plataforma', 'https://i.ibb.co/bWTHZc6/plataforma.png');
        this.load.spritesheet('dude', 'https://i.ibb.co/6sqQqk5/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create ()
    {
        //this.add.image(150, 250, 'fondo');
        this.background = this.add.tileSprite(150, 250, 300, 500, 'fondo');

        this.ground = this.physics.add.staticImage(150, 452, 'ground').refreshBody();

        this.platform = this.physics.add.image(150, 340, 'plataforma');

        this.platform.setImmovable(true);
        this.platform.body.allowGravity = false;

        this.player = this.physics.add.sprite(150, 380, 'dude');

        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, this.platform);
        this.physics.add.collider(this.player, this.ground);
    }

    update ()
    {
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-180);

            this.player.anims.play('left', true);

            this.background.tilePositionX -= 0.25; 
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(180);

            this.player.anims.play('right', true);

            this.background.tilePositionX += 0.25;
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');

            this.background.tilePositionX = 0;
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-250);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 300,
    height: 500,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);