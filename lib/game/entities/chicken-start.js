ig.module('game.entities.chicken-start')

.requires('impact.entity')

.defines(function() {

	EntityChickenStart = ig.Entity.extend({

		size: {
			x: 8,
			y: 8
		},

		init: function(x, y, settings) {

			this.parent(x, y, settings);

		}

	});

});