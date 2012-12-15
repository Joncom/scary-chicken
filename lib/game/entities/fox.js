ig.module('game.entities.fox')

.requires('impact.entity')

.defines(function() {

	EntityFox = ig.Entity.extend({

		size: {
			x: 24,
			y: 11
		},

		speed: 500,

		friction: { x: 500, y: 0 },

		facingLeft: false,

		gravityFactor: 1,

		//maxVel: { x: 100, y: 100 },

		animSheet: new ig.AnimationSheet('media/fox-by-desto.png', 24, 11),

		init: function(x, y, settings) {

			this.parent(x, y, settings);

			this.addAnim('run', 0.15, [2, 1, 0]);

			this.addAnim('jump', 1, [0]);

			this.addAnim('idle', 1, [1]);

			this.currentAnim = this.anims['idle'];
		},

		update: function() {

			this.parent();

			// Able to jump?
			if( this.standing ) {

				if( ig.input.pressed('up') ) {

					this.standing = false;

					this.vel.y = -this.speed;

				} else if( ig.input.pressed('down') ) {

					this.standing = false;

					this.vel.y = this.speed;

				}

				//else this.vel.y = 0;
			}

			if( ig.input.state('left') ) {

				this.facingLeft = true;

				this.currentAnim = this.anims['run'];

				this.currentAnim.flip.x = this.facingLeft;

				this.accel.x = -this.speed;

			} else if( ig.input.state('right') ) {

				this.facingLeft = false;

				this.currentAnim = this.anims['run'];

				this.currentAnim.flip.x = this.facingLeft;

				this.accel.x = this.speed;

			} else {

				this.currentAnim = this.anims['idle'];

				this.currentAnim.flip.x = this.facingLeft;

				this.accel.x = 0;

			}

			if( ! this.standing ) {

				this.currentAnim = this.anims['jump'];

				this.currentAnim.flip.x = this.facingLeft;

			}

		}

	});

});