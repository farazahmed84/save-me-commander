class BaseLevelScene extends Phaser.Scene {
  constructor(scene_key) {
    super(scene_key);
  }

  create() {
    this.level_started = false;
    this.level_intro_active = false;
    this.show_stage_intro();
  }

  show_stage_intro() {
    const screen_width = this.cameras.main.width;
    const screen_height = this.cameras.main.height;

    this.stage_intro_overlay = this.add.rectangle(
    0,
    0,
    screen_width,
    screen_height,
    0x000000
  ).setOrigin(0, 0);

  this.stage_intro_title = this.add.text(
    screen_width / 2,
    screen_height / 2 - 20,
    this.get_stage_title(),
    {
      fontSize: '28px',
      color: '#ffffff'
    }
  ).setOrigin(0.5);

  this.stage_intro_click_text = this.add.text(
    screen_width / 2,
    screen_height / 2 + 30,
    'Click to continue',
    {
      fontSize: '16px',
      color: '#cccccc'
    }
  ).setOrigin(0.5);

  this.tweens.add({
    targets: this.stage_intro_click_text,
    alpha: 0.25,
    duration: 500,
    yoyo: true,
    repeat: -1
  });

  this.input.once('pointerdown', () => {
    this.stage_intro_overlay.destroy();
    this.stage_intro_title.destroy();
    this.stage_intro_click_text.destroy();

    this.build_level();
    this.show_level_intro_dialogue();
  });
}

build_level() {
  this.add.image(0, 0, this.get_background_key()).setOrigin(0, 0);

  const exit_position = this.get_exit_position();
  this.exit = this.add.image(
    exit_position.x,
    exit_position.y,
    'exit'
  );

  const soldier_spawn = this.get_soldier_spawn();
  this.soldier = this.add.image(
    soldier_spawn.x,
    soldier_spawn.y,
    'soldier'
  ).setAngle(soldier_spawn.angle);
  
  this.panzers = [];

  // Current committed destination for soldier movement.
  // While this exists, new clicks are ignored.
  this.move_target = null;

  // Soldier movement speed in pixels per second.
  this.move_speed = 50;
  this.move_sounds = ['advancing', 'onit', 'copythat'];
  this.level_failed = false;
  this.has_rpg = false;
  this.move_marker = this.add.graphics();
  this.move_marker.setDepth(1.5);
  this.move_marker.setVisible(false);
  this.fail_text = null;
  this.blocked_text = this.add.text(320, 200, '', {
    fontSize: '16px',
    color: '#ffcc00'
  })
  .setOrigin(0.5)
  .setDepth(999)
  .setVisible(false);

  this.background_music = this.sound.get('background_music');

  if (!this.background_music) {
    this.background_music = this.sound.add('background_music', {
      loop: true,
      volume: 0.20
    });

    this.background_music.play();
  }

  this.input.on('pointerdown', (pointer) => {
    if (this.level_failed) {
      return;
    }
    if (this.level_intro_active) {
      return;
    }

    // Prevent mid-movement steering.
    // Player must fully commit to each move.
    if (this.move_target) {
      this.blocked_text.setText('Finish current move first');
      this.blocked_text.setVisible(true);

      this.time.delayedCall(1000, () => {
        if (this.blocked_text) {
          this.blocked_text.setVisible(false);
        }
      });

      this.sound.play('stillmoving');
      return;
    }

    let click_x = pointer.worldX;
    let click_y = pointer.worldY;

    if (this.has_rpg) {
      for (let i = 0; i < this.panzers.length; i++) {
        const panzer = this.panzers[i];
        const bounds = panzer.sprite.getBounds();

        if (bounds.contains(click_x, click_y)) {
          let dx_to_panzer = panzer.sprite.x - this.soldier.x;
          let dy_to_panzer = panzer.sprite.y - this.soldier.y;

          let angle_to_panzer = Math.atan2(dy_to_panzer, dx_to_panzer);

          this.soldier.setRotation(
            angle_to_panzer - Phaser.Math.DegToRad(90)
          )

          panzer.destroyed = true;
          panzer.sprite.setDepth(1);
          this.solid_objects.remove(panzer.sprite);
          panzer.vision.clear();
          panzer.sprite.setTexture('explode');
          this.sound.play('collision_sound');

          this.has_rpg = false;
          this.soldier.setTexture('soldier');

          this.time.delayedCall(300, () => {
            panzer.sprite.setTexture('panzer_broken');

            // Ensure it never blocks movement again
            this.solid_objects.remove(panzer.sprite);
          });

          return;
        }
      }
    }

    let move_line = new Phaser.Geom.Line(
      this.soldier.x,
      this.soldier.y,
      click_x,
      click_y
    );

    let final_x = click_x;
    let final_y = click_y;

    let original_dx = click_x - this.soldier.x;
    let original_dy = click_y - this.soldier.y;
    let nearest_distance = Math.sqrt(
      original_dx * original_dx + original_dy * original_dy
    );

    this.solid_objects.getChildren().forEach((obj) => {
      let bounds = obj.getBounds();

      if (!Phaser.Geom.Intersects.LineToRectangle(move_line, bounds)) {
        return;
      }

      let edges = [
        new Phaser.Geom.Line(bounds.left, bounds.top, bounds.right, bounds.top),
        new Phaser.Geom.Line(bounds.right, bounds.top, bounds.right, bounds.bottom),
        new Phaser.Geom.Line(bounds.right, bounds.bottom, bounds.left, bounds.bottom),
        new Phaser.Geom.Line(bounds.left, bounds.bottom, bounds.left, bounds.top)
      ];

      edges.forEach((edge) => {
        let hit = Phaser.Geom.Intersects.GetLineToLine(move_line, edge);

        if (!hit) {
          return;
        }

        let dx = hit.x - this.soldier.x;
        let dy = hit.y - this.soldier.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < nearest_distance) {
          nearest_distance = dist;

          // Stop slightly before obstacle so soldier does not overlap edge.
          let stop_offset = 2;
          let length = Math.sqrt(dx * dx + dy * dy);

          if (length > 0) {
            final_x = hit.x - (dx / length) * stop_offset;
            final_y = hit.y - (dy / length) * stop_offset;
          } else {
            final_x = hit.x;
            final_y = hit.y;
          }
        }
      });
    });

    this.move_target = {
      x: final_x,
      y: final_y
    };

    // play random movement voice
    if (final_x === click_x && final_y === click_y) {
      const random_sound = Phaser.Utils.Array.GetRandom(this.move_sounds);
      this.sound.play(random_sound);
    }

    // Show feedback if path was blocked
    if (final_x !== click_x || final_y !== click_y) {
      this.blocked_text.setText('Path blocked');
      this.sound.play('cannotmove');
      this.blocked_text.setVisible(true);

      // hide after short delay
      this.time.delayedCall(600, () => {
        if (this.blocked_text) {
          this.blocked_text.setVisible(false);
        }
      });
    }

    // draw rectangle marker
    this.move_marker.clear();
    if (final_x !== click_x || final_y !== click_y) {
      this.move_marker.lineStyle(2, 0xff0000, 1);
    } else {
      this.move_marker.lineStyle(2, 0xffffff, 1);
    }
    this.move_marker.strokeRect(final_x - 6, final_y - 6, 12, 12);
    this.move_marker.setVisible(true);
  });

  this.solid_objects = this.add.group();

  const solid_object_data = this.get_solid_object_data();

  solid_object_data.forEach(obj => {
    const solid_object = this.add.image(obj.x, obj.y, obj.key).setAngle(obj.angle);
    solid_object.setDepth(2);
    this.solid_objects.add(solid_object);
  });

  this.objects = this.add.group();

  const object_data = this.get_object_data
    ? this.get_object_data()
    : [];

  object_data.forEach((obj) => {
    const object = this.add.image(obj.x, obj.y, obj.key);

    if (obj.key === 'water') {
      object.setDepth(0);
    } else {
      object.setDepth(1);
    }
    this.objects.add(object);
  });

  this.soldier.setDepth(2);

  // How far each tank can see forward.
  this.panzer_vision_length = this.get_panzer_vision_length();

  // Half of the cone width at the far edge.
  this.panzer_vision_half_width = this.get_panzer_vision_half_width();

  // Sprite correction offset:
  // tank art faces down at zero,
  // but trig math treats zero as right.
  this.panzer_default_facing_offset = 90;

  const panzer_data = this.get_panzer_data();

  panzer_data.forEach((data) => {
    let panzer_sprite = this.add.image(data.x, data.y, 'panzer');
    panzer_sprite.setAngle(data.angle);
    panzer_sprite.setDepth(3);

    let panzer_vision = this.add.graphics();
    panzer_vision.setDepth(3);
    let panzer_cone = new Phaser.Geom.Triangle();

    this.panzers.push({
      sprite: panzer_sprite,
      vision: panzer_vision,
      cone: panzer_cone,
      behavior: data.behavior,
      alert: false,
      base_angle: data.angle,
      current_sweep: 0,
      sweep_direction: 1,
      max_sweep: 30,
      sweep_speed: 40,
      patrol_points: data.patrol_points || [],
      patrol_index: 1,
      move_speed: 30
    });

    this.solid_objects.add(panzer_sprite);
  });
  }

  show_level_intro_dialogue() {
    const dialogue_lines = this.get_level_intro_dialogue();

    if (!dialogue_lines || dialogue_lines.length === 0) {
      this.level_started = true;
      return;
    }

    this.level_intro_active = true;
    this.level_intro_lines = dialogue_lines;
    this.level_intro_index = 0;

    this.dialogue_panel = this.add.graphics().setDepth(100);
    this.dialogue_panel.fillStyle(0x000000, 0.75);
    this.dialogue_panel.fillRect(0, 220, 640, 140);
    this.dialogue_panel.lineStyle(2, 0xffffff, 0.25);
    this.dialogue_panel.strokeRect(0, 220, 640, 140);

    this.face = this.add.image(70, 345, 'face').setDepth(101);
    this.face.setOrigin(0.5, 1);

    this.name_text = this.add.text(140, 238, '', {
      fontSize: '18px',
      color: '#ffff66',
      fontStyle: 'bold'
    }).setDepth(101);

    this.dialogue_text = this.add.text(140, 268, '', {
      fontSize: '18px',
      color: '#ffffff',
      wordWrap: { width: 460 }
    }).setDepth(101);

    this.dialogue_continue_text = this.add.text(610, 338, 'Click to continue', {
      fontSize: '14px',
      color: '#cccccc'
    }).setOrigin(1, 1).setDepth(101);

    this.tweens.add({
      targets: this.dialogue_continue_text,
      alpha: 0.25,
      duration: 500,
      yoyo: true,
      repeat: -1
    });

    this.show_current_level_intro_line();

    this.level_intro_click_handler = () => {
      if (!this.level_intro_active) {
        return;
      }

      this.level_intro_index++;

      if (this.level_intro_index >= this.level_intro_lines.length) {
        this.close_level_intro_dialogue();
        return;
      }

      this.show_current_level_intro_line();
    };

    this.input.on('pointerdown', this.level_intro_click_handler);
  }

  show_current_level_intro_line() {
    const line = this.level_intro_lines[this.level_intro_index];
    this.name_text.setText(line.speaker);
    this.dialogue_text.setText(line.text);
  }

  close_level_intro_dialogue() {
    this.level_intro_active = false;
    this.level_started = true;

    if (this.level_intro_click_handler) {
      this.input.off('pointerdown', this.level_intro_click_handler);
      this.level_intro_click_handler = null;
    }

    if (this.dialogue_panel) {
      this.dialogue_panel.destroy();
      this.dialogue_panel = null;
    }

    if (this.face) {
      this.face.destroy();
      this.face = null;
    }

    if (this.name_text) {
      this.name_text.destroy();
      this.name_text = null;
    }

    if (this.dialogue_text) {
      this.dialogue_text.destroy();
      this.dialogue_text = null;
    }

    if (this.dialogue_continue_text) {
      this.dialogue_continue_text.destroy();
      this.dialogue_continue_text = null;
    }
  }

  update(time, delta) {
    if (!this.level_started) {
      return;
    }

    if (this.level_failed) {
      return;
    }
    
    this.panzers.forEach((panzer) => {
      if (panzer.destroyed) {
        return;
      }

      let sprite = panzer.sprite;

      if (
        (panzer.behavior === 'moving_tank' ||
          panzer.behavior === 'moving_tank_sweep') &&
        !panzer.alert
      ) {
        let target = panzer.patrol_points[panzer.patrol_index];

        let dx = target.x - sprite.x;
        let dy = target.y - sprite.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 2) {
          panzer.patrol_index++;

          if (panzer.patrol_index >= panzer.patrol_points.length) {
            panzer.patrol_index = 0;
          }

          target = panzer.patrol_points[panzer.patrol_index];
          dx = target.x - sprite.x;
          dy = target.y - sprite.y;
          distance = Math.sqrt(dx * dx + dy * dy);
        }

        let angle = Math.atan2(dy, dx);
        let velocity_x = Math.cos(angle) * panzer.move_speed;
        let velocity_y = Math.sin(angle) * panzer.move_speed;

        sprite.x += velocity_x * (delta / 1000);
        sprite.y += velocity_y * (delta / 1000);

        sprite.setAngle(Phaser.Math.RadToDeg(angle) - 90);
      }

      if (
        (panzer.behavior === 'moving_cone' ||
          panzer.behavior === 'moving_tank_sweep') &&
        !panzer.alert
      ) {
        panzer.current_sweep += panzer.sweep_speed * panzer.sweep_direction * (delta / 1000);

        if (panzer.current_sweep >= panzer.max_sweep) {
          panzer.current_sweep = panzer.max_sweep;
          panzer.sweep_direction = -1;
        }

        if (panzer.current_sweep <= -panzer.max_sweep) {
          panzer.current_sweep = -panzer.max_sweep;
          panzer.sweep_direction = 1;
        }
      }

      let cone = panzer.cone;
      let vision = panzer.vision;

      // Rebuild this tank's vision cone based on its current angle.
      let vision_source_angle = sprite.angle;

      if (panzer.behavior === 'moving_cone') {
        vision_source_angle = panzer.base_angle + panzer.current_sweep;
      }

      if (panzer.behavior === 'moving_tank_sweep') {
        vision_source_angle =
          Phaser.Math.RadToDeg(
            Math.atan2(
              panzer.patrol_points[panzer.patrol_index].y - sprite.y,
              panzer.patrol_points[panzer.patrol_index].x - sprite.x
            )
          ) + panzer.current_sweep - 90;
      }

      let panzer_forward_angle = Phaser.Math.DegToRad(
        vision_source_angle + this.panzer_default_facing_offset
      );

      let panzer_left_edge_angle = panzer_forward_angle - Math.PI / 2;
      let panzer_right_edge_angle = panzer_forward_angle + Math.PI / 2;

      // Point directly in front of the tank at full vision distance.
      let cone_tip_x = sprite.x + Math.cos(panzer_forward_angle) * this.panzer_vision_length;
      let cone_tip_y = sprite.y + Math.sin(panzer_forward_angle) * this.panzer_vision_length;

      let left_x = cone_tip_x + Math.cos(panzer_left_edge_angle) * this.panzer_vision_half_width;
      let left_y = cone_tip_y + Math.sin(panzer_left_edge_angle) * this.panzer_vision_half_width;

      let right_x = cone_tip_x + Math.cos(panzer_right_edge_angle) * this.panzer_vision_half_width;
      let right_y = cone_tip_y + Math.sin(panzer_right_edge_angle) * this.panzer_vision_half_width;

      cone.setTo(
        sprite.x,
        sprite.y,
        left_x,
        left_y,
        right_x,
        right_y
      );

      // Check whether soldier center point is inside this tank's cone triangle.
      let soldier_bounds = this.soldier.getBounds();

      let soldier_inside_cone =
        Phaser.Geom.Triangle.Contains(cone, this.soldier.x, this.soldier.y) ||
        Phaser.Geom.Triangle.Contains(cone, soldier_bounds.left, soldier_bounds.top) ||
        Phaser.Geom.Triangle.Contains(cone, soldier_bounds.right, soldier_bounds.top) ||
        Phaser.Geom.Triangle.Contains(cone, soldier_bounds.left, soldier_bounds.bottom) ||
        Phaser.Geom.Triangle.Contains(cone, soldier_bounds.right, soldier_bounds.bottom);

      // Straight line from this tank to soldier for proper cover detection.
      let sight_line = new Phaser.Geom.Line(
        sprite.x,
        sprite.y,
        this.soldier.x,
        this.soldier.y
      );

      // Exact distance from this tank to soldier.
      let dx_to_soldier = this.soldier.x - sprite.x;
      let dy_to_soldier = this.soldier.y - sprite.y;
      let soldier_distance = Math.sqrt(
        dx_to_soldier * dx_to_soldier +
        dy_to_soldier * dy_to_soldier
      );

      let soldier_hidden_by_cover = false;

      this.solid_objects.getChildren().forEach((obj) => {
        if (obj === sprite) {
          return;
        }

        let bounds = obj.getBounds();

        let edges = [
          new Phaser.Geom.Line(bounds.left, bounds.top, bounds.right, bounds.top),
          new Phaser.Geom.Line(bounds.right, bounds.top, bounds.right, bounds.bottom),
          new Phaser.Geom.Line(bounds.right, bounds.bottom, bounds.left, bounds.bottom),
          new Phaser.Geom.Line(bounds.left, bounds.bottom, bounds.left, bounds.top)
        ];

        edges.forEach((edge) => {
          let hit = Phaser.Geom.Intersects.GetLineToLine(sight_line, edge);

          if (!hit) {
            return;
          }

          let dx_to_hit = hit.x - sprite.x;
          let dy_to_hit = hit.y - sprite.y;
          let hit_distance = Math.sqrt(
            dx_to_hit * dx_to_hit +
            dy_to_hit * dy_to_hit
          );

          // Cover only counts if obstacle is closer than soldier.
          if (hit_distance < soldier_distance) {
            soldier_hidden_by_cover = true;
          }
        });
      });

      vision.clear();

      if ((soldier_inside_cone && !soldier_hidden_by_cover) || panzer.alert) {
        panzer.alert = true;
        vision.fillStyle(0xff0000, 0.3);

        let dx_to_player = this.soldier.x - sprite.x;
        let dy_to_player = this.soldier.y - sprite.y;

        let angle_to_player = Math.atan2(dy_to_player, dx_to_player);
        let sprite_angle = Phaser.Math.RadToDeg(angle_to_player) - 90;

        sprite.setAngle(sprite_angle);
        this.move_target = null;

        this.move_marker.clear();
        this.move_marker.setVisible(false);

        if (!this.level_failed) {
          this.level_failed = true;
          this.sound.play('collision_sound');

          let explode_x = this.soldier.x;
          let explode_y = this.soldier.y;

          this.soldier.destroy();
          this.soldier = this.add.image(explode_x, explode_y, 'explode');

          this.fail_text = this.add.text(320, 180, 'MISSION FAILED', {
            fontSize: '24px',
            color: '#ff0000'
          })
          .setOrigin(0.5)
          .setDepth(999);

          this.time.delayedCall(1500, () => {
            this.scene.restart();
          });
        }
      } else {
        vision.fillStyle(0xffff00, 0.3);
      }

      vision.beginPath();
      vision.moveTo(cone.x1, cone.y1);
      vision.lineTo(cone.x2, cone.y2);
      vision.lineTo(cone.x3, cone.y3);
      vision.closePath();
      vision.fillPath();
    });

    if (!this.has_rpg && this.objects) {
      this.objects.getChildren().forEach((obj) => {
        if (obj.texture.key === 'rpg') {

          const soldier_bounds = this.soldier.getBounds();
          const rpg_bounds = obj.getBounds();

          if (Phaser.Geom.Intersects.RectangleToRectangle(soldier_bounds, rpg_bounds)) {
            obj.destroy();
            this.soldier.setTexture('soldier2');
            this.has_rpg = true;
            this.move_target = null;
            this.move_marker.clear();
            this.move_marker.setVisible(false);
          }

        }
      });
    }

    let delta_seconds = delta / 1000;

    if (this.move_target) {
      let dx = this.move_target.x - this.soldier.x;
      let dy = this.move_target.y - this.soldier.y;

      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 4) {
        this.soldier.x = this.move_target.x;
        this.soldier.y = this.move_target.y;
        this.move_target = null;

        this.move_marker.clear();
        this.move_marker.setVisible(false);
      } else {
        let angle = Math.atan2(dy, dx);

        let velocity_x = Math.cos(angle) * this.move_speed;
        let velocity_y = Math.sin(angle) * this.move_speed;

        this.soldier.x += velocity_x * delta_seconds;
        this.soldier.y += velocity_y * delta_seconds;

        this.soldier.setRotation(angle - Phaser.Math.DegToRad(90));
      }
    }

    if (
      Phaser.Math.Distance.Between(
        this.soldier.x,
        this.soldier.y,
        this.exit.x,
        this.exit.y
      ) < 16
    ) {
      this.on_exit_reached();
      return;
    }

  }
  get_solid_object_data() {
    return [];
  }

  get_panzer_data() {
    return [];
  }

  get_level_intro_dialogue() {
    return [
      {
        speaker: 'Soldier:',
        text: '"Commander, I am in position."'
      }
    ];
  }

  on_exit_reached() {
    this.background_music.stop();
    this.scene.restart();
  }

  get_background_key() {
    return 'grass';
  }

  get_exit_position() {
    return { x: 280, y: 0 };
  }

  get_soldier_spawn() {
    return { x: 320, y: 180, angle:180 };
  }

  get_panzer_vision_length() {
    return 120;
  }

  get_panzer_vision_half_width() {
    return 60;
  }

  get_stage_title() {
    return 'Stage';
  }
}