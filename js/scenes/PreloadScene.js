class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    const screen_width = this.cameras.main.width;
    const screen_height = this.cameras.main.height;

    this.cameras.main.setBackgroundColor('#000000');

    const loading_text = this.add.text(
      screen_width / 2,
      screen_height / 2 - 40,
      'Loading battlefield...',
      {
        font: '16px Arial',
        fill: '#ffffff'
      }
    ).setOrigin(0.5);

    const percent_text = this.add.text(
      screen_width / 2,
      screen_height / 2,
      '0%',
      {
        font: '18px Arial',
        fill: '#ffffff'
      }
    ).setOrigin(0.5);

    const credit_text = this.add.text(
      screen_width / 2,
      screen_height - 28,
      'Developed by Faraz The Web Guy | farazthewebguy.com',
      {
        font: '14px Arial',
        fill: '#aaaaaa'
      }
    ).setOrigin(0.5);

    const progress_box = this.add.graphics();
    const progress_bar = this.add.graphics();

    progress_box.fillStyle(0x222222, 0.8);
    progress_box.fillRect(screen_width / 2 - 160, screen_height / 2 + 40, 320, 24);

    this.load.on('progress', (value) => {
      progress_bar.clear();
      progress_bar.fillStyle(0xffffff, 1);
      progress_bar.fillRect(
        screen_width / 2 - 158,
        screen_height / 2 + 42,
        316 * value,
        20
      );

      percent_text.setText(parseInt(value * 100) + '%');
    });

    this.load.on('complete', () => {
      progress_bar.destroy();
      progress_box.destroy();
      loading_text.setText('Click to Start');
      percent_text.setText('');

      this.input.once('pointerdown', () => {
        this.scene.start('IntroScene');
      });
    });

    // Your existing assets
    this.load.image('grass', 'assets/background.jpg');
    this.load.image('endscene', 'assets/endscene.jpg');
    this.load.image('soldier', 'assets/soldier.png');
    this.load.image('soldier2', 'assets/soldier2.png');
    this.load.image('face', 'assets/face.png');
    this.load.image('crate1', 'assets/objects/crate1.png');
    this.load.image('crate2', 'assets/objects/crate2.png');
    this.load.image('crate3', 'assets/objects/crate3.png');
    this.load.image('crate4', 'assets/objects/crate4.png');
    this.load.image('crate5', 'assets/objects/crate5.png');
    this.load.image('crate6', 'assets/objects/crate6.png');
    this.load.image('rock1', 'assets/objects/rock1.png');
    this.load.image('rock2', 'assets/objects/rock2.png');
    this.load.image('rock3', 'assets/objects/rock3.png');
    this.load.image('sandbag', 'assets/objects/sandbag.png');
    this.load.image('panzer', 'assets/enemy/panzer.png');
    this.load.image('panzer_broken', 'assets/enemy/panzer_broken.png');
    this.load.image('bush1', 'assets/objects/bush1.png');
    this.load.image('bush2', 'assets/objects/bush2.png');
    this.load.image('bush3', 'assets/objects/bush3.png');
    this.load.image('tree1', 'assets/objects/tree1.png');
    this.load.image('tree2', 'assets/objects/tree2.png');
    this.load.image('tree3', 'assets/objects/tree3.png');
    this.load.image('tree4', 'assets/objects/tree4.png');
    this.load.image('wood1', 'assets/objects/wood1.png');
    this.load.image('wood2', 'assets/objects/wood2.png');
    this.load.image('wood3', 'assets/objects/wood3.png');
    this.load.image('watchtower', 'assets/objects/watchtower.png');
    this.load.image('water', 'assets/objects/water.png');
    this.load.image('exit', 'assets/objects/exit.png');
    this.load.image('rpg', 'assets/rpg.png');
    this.load.image('explode', 'assets/explode.png');
    this.load.audio('collision_sound', 'assets/sounds/collision.ogg');
    this.load.audio('background_music', 'assets/sounds/background.mp3');
    this.load.audio('war_sound', 'assets/sounds/war.mp3');

    this.load.audio('inposition', 'assets/sounds/inposition.mp3');
    
    this.load.audio('advancing', 'assets/sounds/advancing.mp3');
    this.load.audio('onit', 'assets/sounds/onit.mp3');
    this.load.audio('copythat', 'assets/sounds/copythat.mp3');

    this.load.audio('stillmoving', 'assets/sounds/stillmoving.mp3');
    this.load.audio('cannotmove', 'assets/sounds/cannotmove.mp3');
      }
}