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

        god: false,

        // Eggs eaten.
        eaten: 0,

        animSheet: new ig.AnimationSheet('media/fox-by-desto.png', 24, 11),

        jumpSound: new ig.Sound('media/audio/fox-jump.mp3'),

        eatSound: new ig.Sound('media/audio/eat.mp3'),

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

                if( !this.god ){

                    // Draw game over message to screen.
                    ig.game.spawnEntity(EntityGameOver, 0, 0, { status: 'lose' } );

                    // Chicken makes no more noises.
                    ig.game.chicken.soundTimer.set(99999);

                    this.kill();

                }

            } else {

                // Collided with an egg.

                this.eaten++;

                // Game over?
                if( this.eaten === ig.game.eggTotal ) {

                    ig.game.spawnEntity(EntityGameOver, 0, 0, { status: 'win' });

                    ig.game.chicken.kill();

                    ig.game.clock.timer.pause();

                    // High score?
                    if( ! ig.game.highscore ) ig.game.highscore = ig.game.clock.timeString;

                    else {

                        // A high score already exists, overwrite?
                        if( ig.game.highscore > ig.game.clock.timeString ) {

                            // New highscore!
                            ig.game.highscore = ig.game.clock.timeString;

                        }

                    }

                }

                this.eatSound.play();

                // Chicken becomes more aggressive.
                ig.game.chicken.setBehaviour( ig.game.chicken.behaviour + 1 );

                // Set music to match chicken aggressiveness.
                ig.music.play('track' + ( ig.game.chicken.behaviour + 1 ) );

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

                    this.jumpSound.play();

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

                if( !ig.game.clock.started ) ig.game.clock.start();

                this.facingLeft = true;

                this.currentAnim = this.anims['run'];

                this.currentAnim.flip.x = this.facingLeft;

                this.vel.x = -this.speed.x;

            } else if(ig.input.state('right')) {

                if( !ig.game.clock.started ) ig.game.clock.start();

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