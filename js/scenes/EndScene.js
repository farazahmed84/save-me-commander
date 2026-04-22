class EndScene extends Phaser.Scene {
  constructor() {
    super('EndScene');
  }

  create() {
    this.sound.stopByKey('background_music');
    this.add.image(0, 0, 'endscene').setOrigin(0, 0);

    this.dialogue_panel = this.add.graphics();
    this.dialogue_panel.fillStyle(0x000000, 0.75);
    this.dialogue_panel.fillRect(0, 220, 640, 140);
    this.dialogue_panel.lineStyle(2, 0xffffff, 0.25);
    this.dialogue_panel.strokeRect(0, 220, 640, 140);

    this.face = this.add.image(70, 345, 'face');
    this.face.setOrigin(0.5, 1);

    this.name_text = this.add.text(140, 238, '', {
      fontSize: '18px',
      color: '#ffff66',
      fontStyle: 'bold'
    });

    this.dialogue_text = this.add.text(140, 268, '', {
      fontSize: '18px',
      color: '#ffffff',
      wordWrap: { width: 460 }
    });

    this.click_text = this.add.text(610, 338, 'Click to continue', {
      fontSize: '14px',
      color: '#cccccc'
    }).setOrigin(1, 1);

    this.click_text.setVisible(false);

    this.tweens.add({
      targets: this.click_text,
      alpha: 0.25,
      duration: 500,
      yoyo: true,
      repeat: -1
    });

    this.dialogue_lines = [
    {
      speaker: 'Soldier:',
      text: '"...That is it... HQ is right ahead."'
    },
    {
      speaker: 'Soldier:',
      text: '"I made it... I actually made it."'
    },
    {
      speaker: 'Soldier:',
      text: '"Commander... I do not know who you are, or where you are... but you got me through all of that."'
    },
    {
      speaker: 'Soldier:',
      text: '"Those tanks... they were not random patrols. They were locking this entire route down."'
    },
    {
      speaker: 'Soldier:',
      text: '"If I had tried to push through on my own... I would not have lasted a minute."'
    },
    {
      speaker: 'Soldier:',
      text: '"The war plans are secure. HQ will take it from here."'
    },
    {
      speaker: 'Soldier:',
      text: '"You did your part, Commander. More than enough."'
    },
    {
      speaker: 'Soldier:',
      text: '"...I think I am going to sit down for a minute."'
    }
  ];

  this.credits_lines = [
    {
      speaker: '',
      text: 'MISSION COMPLETE'
    },
    {
      speaker: '',
      text: 'Save Me, Commander!'
    },
    {
      speaker: '',
      text: 'Developed by Faraz The Web Guy'
    },
    {
      speaker: '',
      text: 'farazthewebguy.com'
    },
    {
      speaker: '',
      text: 'Thanks for playing'
    }
  ];

    this.current_line_index = -1;
    this.dialogue_started = false;
    this.showing_credits = false;

    this.war_sound = this.sound.add('war_sound', {
      loop: true,
      volume: 0.5
    });

    this.war_sound.play();

    this.time.delayedCall(1000, () => {
      this.dialogue_started = true;
      this.click_text.setVisible(true);
      this.show_next_line();
    });

    this.input.on('pointerdown', () => {
      if (!this.dialogue_started) {
        return;
      }

      this.show_next_line();
    });
  }

  show_next_line() {
    this.current_line_index++;

    if (this.current_line_index >= this.dialogue_lines.length) {

      // First time: switch to credits
      if (!this.showing_credits) {

        this.dialogue_text.setStyle({
          align: 'center',
          wordWrap: { width: 640 }
        });

        this.dialogue_text.setPosition(320, 270).setOrigin(0.5, 0);

        this.showing_credits = true;

        this.current_line_index = 0;
        this.dialogue_lines = this.credits_lines;

        this.name_text.setText('');
        this.face.setVisible(false);

        this.war_sound.stop();

        // immediately show first credit line
        let line = this.dialogue_lines[this.current_line_index];
        this.dialogue_text.setText(line.text);

        return;
      }

      // After credits: go back to intro
      this.scene.start('PreloadScene');
      return;
    }

    let line = this.dialogue_lines[this.current_line_index];
    this.name_text.setText(line.speaker);
    this.dialogue_text.setText(line.text);
  }
}