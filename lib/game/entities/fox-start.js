ig.module('game.entities.fox-start')

.requires('impact.entity')

.defines(function() {

	EntityFoxStart = ig.Entity.extend({

		size: {
			x: 8,
			y: 8
		},

		init: function(x, y, settings) {

			this.parent(x, y, settings);

		}

	});

});