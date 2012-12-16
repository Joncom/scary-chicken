ig.module('game.entities.big-cloud')

.requires('impact.entity')

.defines(function() {

    EntityBigCloud = ig.Entity.extend({

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