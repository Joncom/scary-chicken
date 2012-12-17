ig.module('game.entities.chicken')

.requires('impact.entity')

.defines(function() {

    EntityChicken = ig.Entity.extend({

        _wmIgnore: true,

        type: ig.Entity.TYPE.B,

        checkAgainst: ig.Entity.TYPE.NONE,

        collides: ig.Entity.COLLIDES.PASSIVE,

        name: 'chicken',

        size: {
            x: 8,
            y: 8
        },

        offset: {
            x: 3,
            y: 4
        },

        speed: 150,

        friction: { x: 100, y: 0 },

        behaviour: 0, // 0 eggs taken, passive.

        inAction: false,

        facingLeft: false,

        animSheet: new ig.AnimationSheet('media/chicken.png', 14, 12),

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);

            this.actionTimer = new ig.Timer();

        },

        setBehaviour: function( tier ) {

            if( tier === 1 ) this.speed = this.maxVel.x = 100;

            else if( tier === 2 ) this.speed = this.maxVel.x = 150;

            else if( tier === 3 ) this.speed = this.maxVel.x = 250;

            else if( tier === 4 ) this.speed = this.maxVel.x = 250;

            this.behaviour = tier;

        },

        update: function() {

            this.parent();

            // Jump up any steps in the way.
            if( this.standing && this.vel.x === 0 && this.behaviour > 0 ) this.vel.y = -this.speed;

            // If pursuing player.
            if( this.behaviour > 0 ) {

                if( ig.game.player.pos.x > this.pos.x ) {

                    this.facingLeft = false;

                    this.accel.x = this.speed;

                } else {

                    this.facingLeft = true;

                    this.accel.x = -this.speed;

                }

                if( this.behaviour === 4 ) {

                    if( this.standing && Math.abs(this.vel.x) >= this.speed / 2 ) {

                        this.vel.y = -this.speed;

                    }

                }

            }

            // Update appearance.
            this.currentAnim.flip.x = ( this.facingLeft ? true : false );

        }

    });

});