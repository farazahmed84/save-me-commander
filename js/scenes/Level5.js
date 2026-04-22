class Level5 extends BaseLevelScene {
  constructor() {
    super('Level5');
  }

  get_stage_title() {
    return '1km away from HQ';
  }

  get_background_key() {
    return 'grass';
  }

  get_exit_position() {
    return { x: 608, y: 32 };
  }

  get_soldier_spawn() {
    return { x: 52, y: 323, angle: 180 };
  }

  get_object_data() {
    return [
      { x: 119, y: 67, key: 'water' },
      { x: 168, y: 67, key: 'water' },
      { x: 290, y: 278, key: 'water' },
      { x: 339, y: 278, key: 'water' },
      { x: 545, y: 106, key: 'water' },
      { x: 594, y: 106, key: 'water' },
      { x: 402, y: 135, key: 'rpg' }
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
      { x: 49, y: 298, key: 'sandbag' },
      { x: 134, y: 297, key: 'sandbag' },

      { x: 201, y: 295, key: 'crate1' },
      { x: 316, y: 230, key: 'crate1' },
      { x: 412, y: 183, key: 'crate1' },

      { x: 446, y: 185, key: 'crate2' },

      { x: 119, y: 87, key: 'bush3' },

      { x: 156, y: 89, key: 'bush1' },

      { x: 594, y: 329, key: 'bush2' },

      { x: 55, y: 180, key: 'tree3' },

      { x: 312, y: 74, key: 'tree1' },

      { x: 490, y: 185, key: 'rock1' },

      { x: 239, y: 139, key: 'rock3' },

      { x: 355, y: 152, key: 'wood1' },

      { x: 308, y: 153, key: 'wood2' },

      { x: 380, y: 223, key: 'wood3' },
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
        x: 571,
        y: 153,
        angle: 0,
        behavior: 'moving_cone'
      },
      {
        x: 462,
        y: 66,
        angle: 0,
        behavior: 'moving_cone'
      },
      {
        x: 177,
        y: 180,
        angle: 0,
        behavior: 'moving_tank',
        patrol_points: [
          { x: 177, y: 180 },
          { x: 177, y: 225 },
        ]
      },
      {
        x: 499,
        y: 276,
        angle: 90,
        behavior: 'moving_tank_sweep',
        patrol_points: [
          { x: 499, y: 276 },
          { x: 400, y: 276 },
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
        text: '"HQ is close... but this last stretch is locked down tight."'
      },
      {
        speaker: 'Soldier:',
        text: '"They have patrols, rotating search, and a hard guard near the exit."'
      },
      {
        speaker: 'Soldier:',
        text: '"There is an RPG ahead. We may only get one clean chance, commander."'
      }
    ];
  }

  on_exit_reached() {
    this.scene.start('EndScene');
  }
}