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

        update: function() {

            this.parent();

            // Jump up any steps in the way.
            if( this.standing && this.vel.x === 0 && this.behaviour > 0 ) this.vel.y = -this.speed;

            if( this.behaviour === 0 ) {

                // 0 eggs taken, passive.

            } else if( this.behaviour === 1 ) {

                // 1 eggs taken, slow pursuit.

                this.speed = this.maxVel.x = 100;

                if( ig.game.player.pos.x > this.pos.x ) {

                    this.facingLeft = false;

                    this.accel.x = this.speed;

                } else {

                    this.facingLeft = true;

                    this.accel.x = -this.speed;

                }

            } else if( this.behaviour === 2 ) {

                // 2 eggs taken, quick pursuit.

                this.speed = this.maxVel.x = 150;

                if( ig.game.player.pos.x > this.pos.x ) {

                    this.facingLeft = false;

                    this.accel.x = this.speed;

                } else {

                    this.facingLeft = true;

                    this.accel.x = -this.speed;

                }

            } else if( this.behaviour === 3 ) {

                // 3 eggs taken, jumping pursuit.

                this.speed = this.maxVel.x = 250;

                if( ig.game.player.pos.x > this.pos.x ) {

                    this.facingLeft = false;

                    this.accel.x = this.speed;

                } else {

                    this.facingLeft = true;

                    this.accel.x = -this.speed;

                }

            } else if( this.behaviour === 4 ) {

                // 4 eggs taken, flying pursuit.

                this.speed = this.maxVel.x = 250;

                if( ig.game.player.pos.x > this.pos.x ) {

                    this.facingLeft = false;

                    this.accel.x = this.speed;

                } else {

                    this.facingLeft = true;

                    this.accel.x = -this.speed;

                }

                if( this.standing && Math.abs(this.vel.x) >= this.speed / 2 ) {

                    this.vel.y = -this.speed;

                }

            }

            // Update appearance.
            this.currentAnim.flip.x = ( this.facingLeft ? true : false );

        }

    });

});