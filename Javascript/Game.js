var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


function preload ()
{
    this.load.image('background','img/sky.jpg');
}

function update ()
{
}

function create()
{
    this.background = this.game.add.sprite(0,0,'background');
}

