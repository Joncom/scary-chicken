ig.module('game.entities.fox')

.requires('impact.entity')

.defines(function() {

	EntityFox = ig.Entity.extend({

		size: {
			x: 24,
			y: 11
		},

		animSheet: new ig.AnimationSheet('media/fox-by-desto.png', 24, 11),

		init: function(x, y, settings) {

			this.parent(x, y, settings);

			this.addAnim('run', 0.15, [2, 1, 0]);

			this.addAnim('idle', 1, [1]);

			this.currentAnim = this.anims['idle'];
		},

		update: function() {

			this.parent();

		}

	});

});