ig.module('game.entities.camera')
.requires('impact.entity')
.defines(function() {

    EntityCamera = ig.Entity.extend({
        _wmIgnore: true,

        update: function() {
            // Screen follows player.
            var screenX = ig.game.player.pos.x - ig.system.width / 2 + ig.game.player.size.x / 2;
            var screenY = ig.game.player.pos.y - ig.system.height / 2;
            var rightEdge = ig.game.backgroundMaps[0].width * ig.game.backgroundMaps[0].tilesize - ig.system.width;
            var bottomEdge = 160 - ig.system.height;

            // Show more ground on mobile, so touch controls don't hide player
            if(ig.ua.mobile) {
                bottomEdge += 32;
            }

            if( screenX < 0 ) screenX = 0;
            else if( screenX > rightEdge ) screenX = rightEdge;
            if( screenY < 0 ) screenY = 0;
            if( screenY > bottomEdge ) screenY = bottomEdge;
            ig.game.screen.x = screenX;
            ig.game.screen.y = screenY;
        }
    });
});
