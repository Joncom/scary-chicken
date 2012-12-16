ig.module('game.entities.egg')

.requires('impact.entity')

.defines(function() {

    EntityEgg = ig.Entity.extend({

        size: {
            x: 8,
            y: 8
        },

        animSheet: new ig.AnimationSheet('media/fox-by-desto.png', 8, 8),

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);

        },

        update: function() {

            this.parent();

        }

    });

});