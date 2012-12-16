ig.module('game.entities.sun')

.requires('impact.entity')

.defines(function() {

    EntitySun = ig.Entity.extend({

        size: {
            x: 32,
            y: 16
        },

        gravityFactor: 0,

        animSheet: new ig.AnimationSheet('media/small-cloud.png', 32, 16),

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);

        }

    });

});