ig.module('game.entities.fox')

.requires('impact.entity')

.defines(function() {

	EntityFox = ig.Entity.extend({

		size: {
			x: 24,
			y: 11
		},

		speed: 500,

		//maxVel: { x: 100, y: 100 },

		animSheet: new ig.AnimationSheet('media/fox-by-desto.png', 24, 11),

		init: function(x, y, settings) {

			this.parent(x, y, settings);

			this.addAnim('run', 0.15, [2, 1, 0]);

			this.addAnim('idle', 1, [1]);

			this.currentAnim = this.anims['idle'];
		},

		update: function() {

			this.parent();

			if( ig.input.state('up') ) this.vel.y = -this.speed;

			else if( ig.input.state('down') ) this.vel.y = this.speed;

			else this.vel.y = 0;

			if( ig.input.state('left') ) {

				this.currentAnim = this.anims['run'];

				this.vel.x = -this.speed;

			} else if( ig.input.state('right') ) {

				this.currentAnim = this.anims['run'];

				this.vel.x = this.speed;

			} else {

				this.currentAnim = this.anims['idle'];

				this.vel.x = 0;

			}

		}

	});

});