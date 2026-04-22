class Level1 extends BaseLevelScene {
  constructor() {
    super('Level1');
  }

  get_stage_title() {
    return '5km away from HQ';
  }

  get_background_key() {
    return 'grass';
  }

  get_exit_position() {
    return { x: 320, y: 32 };
  }

  get_soldier_spawn() {
    return { x: 94, y: 320, angle: 180 };
  }

  get_object_data() {
    return [
      { x: 177, y: 245, key: 'water' },
      { x: 327, y: 304, key: 'water' },
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
      { x: 94, y: 300, key: 'sandbag', angle: 0 },
      { x: 448, y: 270, key: 'sandbag', angle: 0 },

      { x: 134, y: 44, key: 'crate1', angle: 0 },
      { x: 224, y: 109, key: 'crate1', angle: 0 },
      { x: 255, y: 85, key: 'crate1', angle: 0 },
      { x: 224, y: 137, key: 'crate1', angle: 0 },
      { x: 256, y: 174, key: 'crate1', angle: 0 },
      { x: 241, y: 249, key: 'crate1', angle: 0 },
      { x: 225, y: 79, key: 'crate1', angle: 0 },
      { x: 26, y: 40, key: 'crate1', angle: 0 },

      { x: 384, y: 175, key: 'bush1', angle: 0 },
      { x: 513, y: 276, key: 'bush1', angle: 0 },  

      { x: 156, y: 70, key: 'bush2', angle: 0 },
      { x: 450, y: 41, key: 'bush2', angle: 90 },

      { x: 295, y: 249, key: 'bush3', angle: 90 },
      { x: 328, y: 248, key: 'bush3', angle: 90 },

      { x: 431, y: 199, key: 'rock1', angle: 0 },
      { x: 601, y: 182, key: 'rock2', angle: 0 },

      { x: 387, y: 269, key: 'rock3', angle: 0 },
      { x: 387, y: 269, key: 'rock3', angle: 0 },
      { x: 82, y: 238, key: 'rock3', angle: 90 },

      { x: 565, y: 69, key: 'tree1', angle: 0 },
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
        x: 316,
        y: 133,
        angle: 90,
        behavior: 'static'
      },
      {
        x: 511,
        y: 184,
        angle: 0,
        behavior: 'static'
      },
      {
        x: 82,
        y: 109,
        angle: 0,
        behavior: 'static'
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
        text: '"Commander, I made it through the first blast zone. The place ahead is full of enemy tanks."'
      },
      {
        speaker: 'Soldier:',
        text: '"I am currently hiding behind a sandbag. I will move on your signal. The exit is at the end."'
      },
      {
        speaker: 'Soldier:',
        text: '"Just get me to headquarters in one piece. I can use the structures to hide from the tanks. My gun is useless against them."'
      }
    ];
  }

  on_exit_reached() {
    this.scene.start('Level2');
  }
}