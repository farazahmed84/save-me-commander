class Level2 extends BaseLevelScene {
  constructor() {
    super('Level2');
  }

  get_stage_title() {
    return '4km away from HQ';
  }

  get_background_key() {
    return 'grass';
  }

  get_exit_position() {
    return { x: 32, y: 32 };
  }

  get_soldier_spawn() {
    return { x: 318, y: 326, angle: 180 };
  }

  get_object_data() {
    return [
      { x: 71, y: 297, key: 'water' },
      { x: 215, y: 83, key: 'water' }
    ]
    /*return [
      { x: 300, y: 180, key: 'rpg' }
    ];*/
  }

  get_panzer_vision_length() {
    return 120;
  }

  get_panzer_vision_half_width() {
    return 60;
  }

  get_solid_object_data() {
    return [
      { x: 334, y: 29, key: 'crate5' },
      { x: 334, y: 49, key: 'crate5' },
      { x: 334, y: 69, key: 'crate5' },

      { x: 319, y: 295, key: 'crate6' },
      { x: 29, y: 234, key: 'crate6' },
      { x: 570, y: 193, key: 'crate6' },

      { x: 384, y: 275, key: 'bush1' },
      { x: 147, y: 57, key: 'bush2' },
      { x: 514, y: 193, key: 'bush2' },

      { x: 103, y: 221, key: 'rock1' },

      { x: 466, y: 220, key: 'rock2' },

      { x: 146, y: 123, key: 'rock3' },
      { x: 414, y: 234, key: 'rock3' },

      { x: 532, y: 314, key: 'sandbag' },

      { x: 208, y: 217, key: 'tree1' },
      { x: 434, y: 96, key: 'tree2' },
    ];
    /*return [
      { x: 200, y: 120, key: 'crate1' },
      { x: 100, y: 220, key: 'rock1' },
      { x: 400, y: 200, key: 'sandbag' },
      { x: 400, y: 300, key: 'bush1' }
    ];*/
  }

  get_panzer_data() {
    return [
      {
        x: 320,
        y: 207,
        angle: 0,
        behavior: 'moving_cone'
      },
      {
        x: 60,
        y: 100,
        angle: 270,
        behavior: 'moving_cone'
      },
      {
        x: 551,
        y: 96,
        angle: 0,
        behavior: 'moving_cone'
      },
    ]
    /*return [
      {
        x: 400,
        y: 100,
        angle: 0,
        behavior: 'static'
      },
      {
        x: 520,
        y: 140,
        angle: 180,
        behavior: 'static'
      },
      {
        x: 150,
        y: 80,
        angle: 90,
        behavior: 'moving_cone'
      },
      {
        x: 80,
        y: 300,
        angle: 90,
        behavior: 'moving_tank',
        patrol_points: [
          { x: 80, y: 300 },
          { x: 200, y: 300 },
          { x: 200, y: 220 },
          { x: 80, y: 220 }
        ]
      },
      {
        x: 500,
        y: 280,
        angle: 180,
        behavior: 'moving_tank_sweep',
        patrol_points: [
          { x: 500, y: 280 },
          { x: 380, y: 280 },
          { x: 380, y: 180 },
          { x: 500, y: 180 }
        ]
      }
    ];*/
  }

  get_level_intro_dialogue() {
    return [
      {
        speaker: 'Soldier:',
        text: '"Commander, there is an enemy tank right ahead of me!"'
      },
      {
        speaker: 'Soldier:',
        text: '"I am hiding behind a crate. I will need to time my movement carefully."'
      },
      {
        speaker: 'Soldier:',
        text: '"These enemy tanks are actively looking for me!"'
      }
    ];
  }

  on_exit_reached() {
    this.scene.start('Level3');
  }
}