import engine from 'okinawa.js/src/engine';
import Item from 'okinawa.js/src/item';
import * as MATH from 'okinawa.js/src/math/math';
import Meteor from './meteor';

export default class Shot extends Item {
  constructor(creator, position, angle) {
    super();

    this.spriteName = 'shot';

    // The object which originated the shot (player, npc, etc)
    this.creator = creator;

    this.size.x = engine.sprites.sprites[this.spriteName][3];
    this.size.y = engine.sprites.sprites[this.spriteName][4];

    this.position = position;

    this.speedMagnitude = 5;

    this.setRotation(angle);

    let direction = MATH.angleToDirectionVector(angle);
    direction = direction.normalize();

    this.speed.x = direction.x * this.speedMagnitude;
    this.speed.y = direction.y * this.speedMagnitude;

    this.maxRadius = this.getRadius();
    this.collisionRadius = 12;
  }

  step(dt) {
    super.step(dt);

    // Not necessary if there are no animations, but here it is
    // engine.sprites.step(dt, this);
  }

  draw(ctx) {
    super.draw(ctx);
  }

  collide(what) {
    // Cannot collide with other shots
    if (what instanceof Shot) {
      return false;
    }

    // Cannot collide with its own creator
    if (what == this.creator) {
      return false;
    }

    // Win!
    if (what instanceof Meteor) {
      engine.game.points.add(50);
    }

    // Should be done only if we are going to return true in this function
    super.collide();

    // true == should be removed
    return true;
  }
}
