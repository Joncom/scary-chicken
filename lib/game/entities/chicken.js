ig.module('game.entities.chicken')

.requires('impact.entity')

.defines(function() {

    EntityChicken = ig.Entity.extend({

        _wmIgnore: true,

        size: {
            x: 8,
            y: 8
        },

        offset: {
            x: 3,
            y: 4
        }

        animSheet: new ig.AnimationSheet('media/chicken.png', 14, 12),

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);

        }

    });

});