class Level4 extends BaseLevelScene {
  constructor() {
    super('Level4');
  }

  get_stage_title() {
    return '2km away from HQ';
  }

  get_background_key() {
    return 'grass';
  }

  get_exit_position() {
    return { x: 32, y: 32 };
  }

  get_soldier_spawn() {
    return { x: 337, y: 333, angle: 180 };
  }

  get_object_data() {
    return [
      { x: 82, y: 100, key: 'water' }
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
      { x: 337, y: 316, key: 'sandbag' },

      { x: 33, y: 174, key: 'rock1' },

      { x: 605, y: 167, key: 'rock2' },

      { x: 33, y: 98, key: 'rock3' },
      { x: 226, y: 33, key: 'rock3' },

      { x: 286, y: 33, key: 'crate6' },
      { x: 325, y: 33, key: 'crate6' },
      { x: 614, y: 97, key: 'crate6' },
      { x: 606, y: 242, key: 'crate6' },

      { x: 31, y: 323, key: 'bush2', angle: 90 },

      { x: 82, y: 97, key: 'bush3' },
      { x: 32, y: 272, key: 'bush3' },
      { x: 614, y: 27, key: 'bush3' },

      { x: 320, y: 180, key: 'tree3' },
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
        x: 153,
        y: 88,
        angle: 0,
        behavior: 'moving_tank_sweep',
        patrol_points: [
          { x: 153, y: 88 },
          { x: 153, y: 270 },
          { x: 500, y: 270 },
          { x: 500, y: 88 }
        ]
      },
      {
        x: 534,
        y: 88,
        angle: 90,
        behavior: 'moving_tank_sweep',
        patrol_points: [
          { x: 534, y: 88 },
          { x: 153, y: 88 },
          { x: 153, y: 270 },
          { x: 500, y: 270 }
        ]
      },
      {
        x: 534,
        y: 296,
        angle: 180,
        behavior: 'moving_tank_sweep',
        patrol_points: [
          { x: 534, y: 296 },
          { x: 534, y: 88 },
          { x: 153, y: 88 },
          { x: 153, y: 270 },
          { x: 500, y: 270 }
        ]
      }
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
        text: '"So close yet so far!"'
      },
      {
        speaker: 'Soldier:',
        text: '"They are no longer just patrolling... they are actively sweeping the area."'
      },
      {
        speaker: 'Soldier:',
        text: '"We will need to read their movement carefully. One mistake and we are done."'
      }
    ];
  }

  on_exit_reached() {
    this.scene.start('Level5');
  }
}