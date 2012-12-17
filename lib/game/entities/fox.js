ig.module('game.entities.fox')

.requires('impact.entity')

.defines(function() {

    EntityFox = ig.Entity.extend({

        _wmIgnore: true,

        type: ig.Entity.TYPE.A,

        checkAgainst: ig.Entity.TYPE.B,

        collides: ig.Entity.COLLIDES.PASSIVE,

        size: {
            x: 10,
            y: 8
        },

        offset: {
            x: 8,
            y: 3
        },

        speed: {
            x: 95,
            y: 175
        },

        maxVel: {
            x: 110,
            y: 200
        },

        friction: {
            x: 300,
            y: 0
        },

        zIndex: 1,

        facingLeft: false,

        gravityFactor: 3,

        jumpDuration: 0.125,

        // Eggs eaten.
        eaten: 0,

        animSheet: new ig.AnimationSheet('media/fox-by-desto.png', 24, 11),

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            this.addAnim('run', 0.1, [2, 1, 0]);

            this.addAnim('stopping', 1, [2]);

            this.addAnim('jump', 1, [0]);

            this.addAnim('idle', 1, [1]);

            this.currentAnim = this.anims['idle'];

            this.jumpTimer = new ig.Timer();
        },

        check: function(other) {

            if( other.name === 'chicken' ) {

                // Collided with the chicken.

                this.kill();

            } else {

                // Collided with an egg.

                this.eaten++;

                ig.music.next();

                // Chicken becomes more aggressive.
                ig.game.chicken.setBehaviour( ig.game.chicken.behaviour + 1 );

                other.kill();

            }

        },

        update: function() {

            this.parent();

            if(this.standing) {

                if(ig.input.pressed('up')) {

                    this.jumpTimer.set(this.jumpDuration);

                    this.vel.y = -this.speed.y;

                    this.falling = false;

                }

            } else {

                // we're not standing, jump has been released and we're not falling
                // we reduce the y velocity and mark us as falling
                if(!this.standing && !ig.input.state('up') && !this.falling) {

                    this.vel.y = Math.floor(this.vel.y / 2);

                    this.falling = true;

                }

            }

            if(ig.input.state('left')) {

                this.facingLeft = true;

                this.currentAnim = this.anims['run'];

                this.currentAnim.flip.x = this.facingLeft;

                this.vel.x = -this.speed.x;

            } else if(ig.input.state('right')) {

                this.facingLeft = false;

                this.currentAnim = this.anims['run'];

                this.currentAnim.flip.x = this.facingLeft;

                this.vel.x = this.speed.x;

            } else {

                if(this.vel.x === 0) {

                    this.currentAnim = this.anims['idle'];

                } else {

                    this.currentAnim = this.anims['stopping'];

                }

                this.currentAnim.flip.x = this.facingLeft;

                this.accel.x = 0;

            }

            if(!this.standing) {

                if( !this.falling ) this.currentAnim = this.anims['jump'];

                else this.currentAnim = this.anims['stopping'];

                this.currentAnim.flip.x = this.facingLeft;

            }

        }

    });

});