ig.module('game.entities.fox')

.requires('impact.entity')

.defines(function() {

	EntityFox = ig.Entity.extend({

		size: {
			x: 24,
			y: 11
		},

		speed: 100,

		animSheet: new ig.AnimationSheet('media/fox-by-desto.png', 24, 11),

		init: function(x, y, settings) {

			this.parent(x, y, settings);

			this.addAnim('run', 0.15, [2, 1, 0]);

			this.addAnim('idle', 1, [1]);

			this.currentAnim = this.anims['idle'];
		},

		update: function() {

			this.parent();

			if( ig.input.state('up') ) this.accel.y = -this.speed;

			else if( ig.input.state('down') ) this.accel.y = this.speed;

			else if( ig.input.state('left') ) this.accel.x = -this.speed;

			else if( ig.input.state('right') ) this.accel.x = this.speed;

		}

	});

});