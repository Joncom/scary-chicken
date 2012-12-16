ig.module('game.entities.small-cloud')

.requires('impact.entity')

.defines(function() {

    EntitySmallCloud = ig.Entity.extend({

        _wmIgnore: true,

        size: {
            x: 16,
            y: 8
        },

        gravityFactor: 0,

        animSheet: new ig.AnimationSheet('media/small-cloud.png', 16, 8),

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);

        }

    });

});