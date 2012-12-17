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

        wait: function( seconds ) {

            this.waiting = true;

            var chicken = this;

            console.log('Chicken is waiting for ' + seconds + ' seconds.');

            setTimeout( function() { chicken.stopWaiting(); }, seconds * 1000 );

        },

        stopWaiting: function() {

            this.waiting = false;

        },

        update: function() {

            this.parent();

            if( this.inAction ) {

                if( this.actionTimer.delta() >= 0 ) {

                    this.inAction = false;

                    // Stop movement.
                    this.vel.x = 0;

                    this.wait( Math.random() * 3 );

                }

            } else if( !this.waiting ) {

                var duration = 0;

                if( this.behaviour === 0 ) {

                    // 0 eggs taken, passive.

                    duration = Math.floor( Math.random() * 3 );

                    this.doRandomAction( ['walkLeft', 'walkRight', 'changeDirection'], duration );

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

                    if( this.standing ) this.vel.y = -this.speed;

                } else {

                    // All eggs have been collected.

                    this.kill();

                }

            }

            // Update appearance.
            this.currentAnim.flip.x = ( this.facingLeft ? true : false );

        }

    });

});