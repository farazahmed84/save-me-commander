class IntroScene extends Phaser.Scene {
  constructor() {
    super('IntroScene');
  }

  create() {
    this.add.image(0, 0, 'grass').setOrigin(0, 0);

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
        text: '"...Ugh... what the hell was that?"'
      },
      {
        speaker: 'Soldier:',
        text: '"Bravo unit? Richard? Davey? Anyone?"'
      },
      {
        speaker: 'Soldier:',
        text: '"Great. Just great. One minute we are escorting the war plans, next minute I wake up kissing dirt."'
      },
      {
        speaker: 'Soldier:',
        text: '"The convoy is gone... tracks in the mud, shell casings everywhere."'
      },
      {
        speaker: 'Soldier:',
        text: '"And the road to headquarters is crawling with enemy tanks."'
      },
      {
        speaker: 'Soldier:',
        text: '"Commander, if you are hearing this, I need guidance. My long-range set is fried, only this short-band link still works, and I have no idea where my unit is."'
      },
      {
        speaker: 'Soldier:',
        text: '"Those war plans still need to reach HQ. If they do not get there, our defenses will be overrun by sunrise."'
      },
      {
        speaker: 'Soldier:',
        text: '"So... no pressure, Commander. Just get one very lost soldier through an army of murder-machines."'
      }
    ];

    this.current_line_index = -1;
    this.dialogue_started = false;

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
      this.war_sound.stop();
      this.scene.start('Level1');
      return;
    }

    let line = this.dialogue_lines[this.current_line_index];
    this.name_text.setText(line.speaker);
    this.dialogue_text.setText(line.text);
  }
}