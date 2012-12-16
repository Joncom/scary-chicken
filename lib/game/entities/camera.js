ig.module('game.entities.camera')

.requires('impact.entity')

.defines(function() {

	EntityCamera = ig.Entity.extend({

		_wmIgnore: true,

		update: function() {

			// Center screen to player.

            ig.game.screen.x = ig.game.player.pos.x - ig.system.width / 2 + ig.game.player.size.x / 2;

            ig.game.screen.y = ig.game.player.pos.y - ig.system.height / 2;

		}

	});

});