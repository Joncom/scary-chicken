ig.module('game.entities.camera')

.requires('impact.entity')

.defines(function() {

	EntityCamera = ig.Entity.extend({

		_wmIgnore: true,

		update: function() {

			// Center screen to player.

            ig.screen.x = ig.player.pos.x - ig.system.width / 2 + ig.player.size.x / 2;

            ig.screen.y = ig.player.pos.y - ig.system.height / 2;

		}

	});

});