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

        speed: 30,

        behaviour: 0, // 0 eggs taken, passive.

        inAction: false,

        facingLeft: false,

        animSheet: new ig.AnimationSheet('media/chicken.png', 14, 12),

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);

            this.actionTimer = new ig.Timer();

        },

        doRandomAction: function( actions, duration ) {

            this.actionTimer.set(duration);

            var randomIndex = Math.floor( Math.random() * actions.length );

            var action = actions[randomIndex];

            if( action === 'walkLeft' ) {

                console.log("Chicken is now walking left.");

                this.vel.x = -this.speed;

                this.facingLeft = true;

            } else if ( action === 'walkRight' ) {

                console.log("Chicken is now walking right.");

                this.vel.x = this.speed;

                this.facingLeft = false;

            } else if ( action === 'changeDirection' ) {

                console.log("Chicken is now changing directions.");

            }

            this.inAction = true;

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

                if( this.behaviour === 0 ) {

                    // 0 eggs taken, passive.

                    var duration = Math.floor( Math.random() * 3 );

                    this.doRandomAction( ['walkLeft', 'walkRight', 'changeDirection'], duration );

                }

            }

            // Update appearance.
            this.currentAnim.flip.x = ( this.facingLeft ? true : false );

        }

    });

});