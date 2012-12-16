ig.module('game.entities.sun')

.requires('impact.entity')

.defines(function() {

    EntitySun = ig.Entity.extend({

        _wmIgnore: true,

        size: {
            x: 16,
            y: 16
        },

        gravityFactor: 0,

        animSheet: new ig.AnimationSheet('media/sun.png', 16, 16),

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);

        }

    });

});