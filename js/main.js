var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [PreloadScene,IntroScene,Level1,Level2,Level3,Level4,Level5,EndScene]
};

var game = new Phaser.Game(config);