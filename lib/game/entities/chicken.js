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

        behaviour: 0, // 0 eggs taken, passive.

        inAction: false,

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

            } else if ( action === 'walkRight' ) {

                console.log("Chicken is now walking right.");

            } else if ( action === 'changeDirection' ) {

                console.log("Chicken is now changing directions.");

            }

            this.inAction = true;

        },

        update: function() {

            if( this.inAction ) {

                if( this.actionTimer.delta() >= 0 ) this.inAction = false;

            } else {

                if( this.behaviour === 0 ) {

                    // 0 eggs taken, passive.

                    var duration = Math.floor( Math.random() * 3 );

                    this.doRandomAction( ['walkLeft', 'walkRight', 'changeDirection'], duration );

                }

            }

        }

    });

});