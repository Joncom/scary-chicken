ig.module('game.entities.again-button')
.requires(
    'impact.entity',
    'plugins.nine-patch',
)
.defines(function(){

    EntityAgainButton = ig.Entity.extend({

        gravityFactor: 0,
        image: new ig.Image('media/button.png'),
        text: 'AGAIN?',
        padding: 4,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.size.x = ig.game.font.widthForString(this.text) + this.padding * 2;
            this.size.y = ig.game.font.height + this.padding * 2;
            this.size.y -= 2; // Furthermore, is visually really only 5 pixels, even though some characters are actually occupy 7 px, so subtract 2

            this.ninepatch = new ig.NinePatch(this.image.path, {width: this.size.x, height: this.size.y, left: 1, right: 1, top: 1, bottom: 1});
        },

        update: function() {
            if(ig.input.released('click')) {
                if(
                    ig.input.mouse.x >= this.pos.x - ig.game.screen.x &&
                    ig.input.mouse.x < this.pos.x - ig.game.screen.x + this.size.x &&
                    ig.input.mouse.y >= this.pos.y - ig.game.screen.y &&
                    ig.input.mouse.y < this.pos.y - ig.game.screen.y + this.size.y
                ) {
                    ig.game.newGame();
                    return;
                }
            }
            for ( var t in ig.input.touches ) {
                var touch = ig.input.touches[t];
                if( this.overlaps( touch.x, touch.y ) ) {
                    if( touch.state === 'up' ) {
                        ig.game.newGame();
                        return;
                    }
                }
            }
        },

        overlaps: function(x, y) {
            var minX = this.pos.x - ig.game.screen.x;
            var maxX = minX + this.size.x;
            var minY = this.pos.y - ig.game.screen.y;
            var maxY = minY + this.size.y;
            return (
                x >= minX &&
                x < maxX &&
                y >= minY &&
                y < maxY
            );
        },

        draw: function() {
            // Keep button in the same place on screen, even if camera moves
            this.pos.x = ig.game.screen.x + ig.system.width / 2 - this.size.x / 2;
            this.pos.y = ig.game.screen.y + ig.system.height / 2 - this.size.y / 2 + 26;

            this.parent();

            this.ninepatch.draw(this.pos.x - ig.game.screen.x, this.pos.y - ig.game.screen.y);

            ig.game.font.draw(
                this.text,
                this.pos.x - ig.game.screen.x + this.padding,
                this.pos.y - ig.game.screen.y + this.padding
            );
        }
    });
});
