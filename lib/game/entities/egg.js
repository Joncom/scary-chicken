ig.module('game.entities.egg')

.requires('impact.entity')

.defines(function() {

    EntityEgg = ig.Entity.extend({

        type: ig.Entity.TYPE.B,

        checkAgainst: ig.Entity.TYPE.NONE,

        collides: ig.Entity.COLLIDES.PASSIVE,

        size: {
            x: 8,
            y: 8
        },

        gravityFactor: 0,

        animSheet: new ig.AnimationSheet('media/egg.png', 8, 8),

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);

        },

        update: function() {

            // Make no call to parent, so as to save
            // resources. There is no need to calculate
            // position since eggs don't move; And no
            // need to calculate collisions, since the
            // fox is doing it already; And no need to
            // update animations since the egg is a
            // single static frame.

        }

    });

});