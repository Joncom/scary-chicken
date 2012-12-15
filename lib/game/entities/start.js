ig.module('game.entities.start')

.requires('impact.entity')

.defines(function() {

	EntityStart = ig.Entity.extend({

		name: "Start Position",

		size: {
			x: 8,
			y: 8
		},

		init: function(x, y, settings) {

			this.parent(x, y, settings);

		}

	});

});