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
        animSheet: new ig.AnimationSheet('media/chicken.png', 14, 12),
        jumpSound: null,
        cluckSound: null,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);
            this.addAnim('walk', 0.25, [0, 1, 0, 2]);
            this.addAnim('fly', 0.25, [3, 4]);

            this.actionTimer = new ig.Timer();

            // Prevents too-frequent sound effects.
            this.soundTimer = new ig.Timer();

            this.jumpSound = new ig.Sound('media/audio/chicken-jump.*');
            this.cluckSound = new ig.Sound('media/audio/chicken-cluck.*');
        },

        setBehaviour: function( tier ) {
            if( tier === 1 ) this.speed = this.maxVel.x = 100;
            else if( tier === 2 ) this.speed = this.maxVel.x = 150;
            else if( tier === 3 ) this.speed = this.maxVel.x = 250;
            else if( tier === 4 ) this.speed = this.maxVel.x = 250;
            this.behaviour = tier;
        },

        jump: function() {
            this.vel.y = -this.speed;
            if( this.soundTimer.delta() >= 0 ) {
                this.jumpSound.play();

                // No more sounds allowed for 3 seconds.
                this.soundTimer.set(3);
            }
        },

        dirToFox: function() {
            if( ig.game.player.pos.x > this.pos.x ) return 'right';
            else return 'left';
        },

        update: function() {
            this.parent();

            // Cluck if chicken gets close to fox.
            if( this.distanceTo( ig.game.player ) < 25 ) {
                if( this.soundTimer.delta() >= 0 ) {
                    this.cluckSound.play();

                    // No more sounds allowed for 3 seconds.
                    this.soundTimer.set(3);
                }
            }

            // If pursuing player.
            if( this.behaviour > 0 ) {

                // If the chicken is quite far away from the player...
                if( this.distanceTo( ig.game.player ) > ig.system.width ) {

                    // Teleport the chicken nearby.
                    if( this.dirToFox() === 'right' ) {

                        this.pos.x = ig.game.screen.x - this.size.x * 2;
                    } else {
                        this.pos.x = ig.game.screen.x + ig.system.width + this.size.x;
                    }
                }

                if( this.dirToFox() === 'right' ) this.accel.x = this.speed;
                else this.accel.x = -this.speed;

                if( this.behaviour === 4 ) {
                    if( this.standing && Math.abs(this.vel.x) >= this.speed / 2 ) {
                        this.jump();
                    }
                }
            }

            // Jump up any steps in the way.
            if( this.standing && this.vel.x === 0 && this.behaviour > 0 ) {
                this.jump();
            }

            // Update appearance.
            if( this.behaviour > 0 ) {
                if( this.standing ) this.currentAnim = this.anims['walk'];
                else this.currentAnim = this.anims['fly'];

                // Set animation speed.
                if( this.vel.x !== 0 ) {
                    var frameTime;

                    if( Math.abs( this.vel.x ) > 50 ) frameTime = 0.1;
                    else frameTime = 0.3;

                    this.currentAnim.frameTime = frameTime;
                }
            }

            // Update faced direction.
            this.currentAnim.flip.x = ( this.vel.x < 0 ? true : false );
        }
    });

});