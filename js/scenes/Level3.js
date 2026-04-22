class Level3 extends BaseLevelScene {
  constructor() {
    super('Level3');
  }

  get_stage_title() {
    return '3km away from HQ';
  }

  get_background_key() {
    return 'grass';
  }

  get_exit_position() {
    return { x: 608, y: 32 };
  }

  get_soldier_spawn() {
    return { x: 72, y: 300, angle: 210 };
  }

  get_object_data() {
    return [
      { x: 294, y: 162, key: 'rpg' },
      { x: 581, y: 186, key: 'water' }
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
      { x: 72, y: 280, key: 'sandbag', angle: 0 },

      { x: 532, y: 23, key: 'crate1' },
      { x: 532, y: 55, key: 'crate1' },
      { x: 178, y: 22, key: 'crate1' },
      { x: 368, y: 89, key: 'crate1' },

      { x: 275, y: 192, key: 'crate2' },
      { x: 311, y: 192, key: 'crate2' },

      { x: 279, y: 247, key: 'rock1' },
      { x: 217, y: 27, key: 'rock3' },

      { x: 491, y: 108, key: 'bush2', angle: 90 },

      { x: 284, y: 65, key: 'tree3' },
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
        x: 60,
        y: 90,
        angle: 0,
        behavior: 'moving_tank',
        patrol_points: [
          { x: 60, y: 90 },
          { x: 60, y: 210 },
          { x: 140, y: 210 },
          { x: 140, y: 90 }
        ]
      },
      {
        x: 483,
        y: 280,
        angle: 90,
        behavior: 'moving_tank',
        patrol_points: [
          { x: 483, y: 280 },
          { x: 403, y: 280 },
          { x: 403, y: 160 },
          { x: 403, y: 280 },
        ]
      },
      {
        x: 581,
        y: 105,
        angle: 90,
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
        text: '"Patrolling tanks! Need to carefully time our movement by studying their paths."'
      },
      {
        speaker: 'Soldier:',
        text: '"One tank is completely blocking the path ahead!"'
      },
      {
        speaker: 'Soldier:',
        text: '"Wait... do I see an RPG lying around? Perhaps I can use that."'
      }
    ];
  }

  on_exit_reached() {
    this.scene.start('Level4');
  }
}