ig.module('game.entities.egg-spawn')

.requires('impact.entity')

.defines(function() {

    EntityEggSpawn = ig.Entity.extend({

        size: {
            x: 8,
            y: 8
        },

        animSheet: new ig.AnimationSheet('media/egg.png', 8, 8),

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);

        }

    });

});