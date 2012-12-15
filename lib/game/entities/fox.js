ig.module('game.entities.fox')

.requires('impact.entity')

.defines(function() {

	EntityFox = ig.Entity.extend({

		size: {
			x: 10,
			y: 8
		},

		offset: {
			x: 8,
			y: 3
		},

		speed: {
			x: 110,
			y: 100
		},

		maxVel: {
			x: 110,
			y: 150
		},

		friction: {
			x: 600,
			y: 0
		},

		facingLeft: false,

		gravityFactor: 3,

		jumpDuration: 0.25,

		//maxVel: { x: 100, y: 100 },

		animSheet: new ig.AnimationSheet('media/fox-by-desto.png', 24, 11),

		init: function(x, y, settings) {

			this.parent(x, y, settings);

			this.addAnim('run', 0.1, [2, 1, 0]);

			this.addAnim('stopping', 1, [2]);

			this.addAnim('jump', 1, [0]);

			this.addAnim('idle', 1, [1]);

			this.currentAnim = this.anims['idle'];

			this.jumpTimer = new ig.Timer();
		},

		update: function() {

			this.parent();

			if( this.standing ) {

				if( ig.input.pressed('up') ) {

					this.standing = false;

					this.jumpTimer.set(this.jumpDuration);

					this.vel.y = -this.speed.y;

				}

			} else {

				// Jump in progress.

				if( ig.input.state('up') ) {

					// Get height while timer allows.
					if( this.jumpTimer.delta() < 0 ) this.vel.y = -this.speed.y;

				}

			}

			if( ig.input.state('left') ) {

				this.facingLeft = true;

				this.currentAnim = this.anims['run'];

				this.currentAnim.flip.x = this.facingLeft;

				this.vel.x = -this.speed.x;

			} else if( ig.input.state('right') ) {

				this.facingLeft = false;

				this.currentAnim = this.anims['run'];

				this.currentAnim.flip.x = this.facingLeft;

				this.vel.x = this.speed.x;

			} else {

				if( this.vel.x === 0 ) {

					this.currentAnim = this.anims['idle'];

				} else {

					this.currentAnim = this.anims['stopping'];

				}

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