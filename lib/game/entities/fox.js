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

			this.addAnim('run', (2 / 60), [0, 1, 2]);

			this.currentAnim = this.anims['run'];
		},

		update: function() {

			this.parent();

		}

	});

});