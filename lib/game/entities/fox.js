ig.module('game.entities.fox')
.requires(
    'impact.entity',
    'game.entities.again-button'
)
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
            y: 195
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
        god: false,

        // Eggs eaten.
        eaten: 0,

        animSheet: new ig.AnimationSheet('media/fox-by-desto.png', 24, 11),
        jumpSound: null,
        eatSound: null,
        frozenTimer: null,

        actions: 0,
        lastActions: 0,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            // prevent movement for short time after each respawn
            this.frozenTimer = new ig.Timer(0.5);

            this.addAnim('run', 0.1, [2, 1, 0]);
            this.addAnim('stopping', 1, [2]);
            this.addAnim('jump', 1, [0]);
            this.addAnim('idle', 1, [1]);
            this.currentAnim = this.anims['idle'];

            this.jumpSound = new ig.Sound('media/audio/fox-jump.*');
            this.eatSound = new ig.Sound('media/audio/eat.*');
        },

        check: function(other) {

            if( other.name === 'chicken' ) {

                // Collided with the chicken.
                if( !this.god ){

                    // Set game-over status
                    ig.game.status = 'lose';

                    // Prevent respawning for a short time.
                    ig.game.tryAgainTimer.reset();

                    // Chicken makes no more noises.
                    ig.game.chicken.soundTimer.pause();

                    ig.game.clock.timer.pause();
                    this.kill();

                    if(ig.game.leftTouchArea) { ig.game.leftTouchArea.kill(); }
                    if(ig.game.rightTouchArea) { ig.game.rightTouchArea.kill(); }
                    if(ig.game.upTouchArea) { ig.game.upTouchArea.kill(); }
                }
            } else if(other instanceof EntityEgg) {

                // Collided with an egg.

                // Kill egg entity.
                other.kill();

                this.eaten++;

                // Game over?
                if( this.eaten === ig.game.eggTotal ) {
                    ig.game.status = 'win';
                    ig.game.tryAgainTimer.reset();
                    ig.game.chicken.kill();
                    ig.game.clock.timer.pause();

                    if(ig.game.leftTouchArea) { ig.game.leftTouchArea.kill(); }
                    if(ig.game.rightTouchArea) { ig.game.rightTouchArea.kill(); }
                    if(ig.game.upTouchArea) { ig.game.upTouchArea.kill(); }

                    // High score?
                    if( ! ig.game.highscore ) ig.game.highscore = ig.game.clock.timeString;
                    else {

                        // A high score already exists, overwrite?
                        if( ig.game.highscore > ig.game.clock.timeString ) {

                            // New highscore!
                            ig.game.highscore = ig.game.clock.timeString;
                        }
                    }

                    ig.game.spawnEntity(EntityAgainButton, 0, 0);
                }

                this.eatSound.play();

                // Chicken becomes more aggressive.
                ig.game.chicken.setBehaviour( ig.game.chicken.behaviour + 1 );

                // Set music to match chicken aggressiveness.
                ig.music.play('track' + ( ig.game.chicken.behaviour + 1 ) );
            }
        },

        update: function() {
            this.parent();

            var stateUp = !!( this.actions & EntityFox.ACTION.UP );
            var pressedUp = stateUp && !( this.lastActions & EntityFox.ACTION.UP );
            var stateLeft = !!( this.actions & EntityFox.ACTION.LEFT );
            var pressedLeft = stateLeft && !( this.lastActions & EntityFox.ACTION.LEFT );
            var stateRight = !!( this.actions & EntityFox.ACTION.RIGHT );
            var pressedRight = stateRight && !( this.lastActions & EntityFox.ACTION.RIGHT );

            if( pressedUp && this.standing ) {
                this.vel.y = -this.speed.y;
                this.falling = false;
                this.jumpSound.play();
            } else if ( !stateUp && !this.standing && !this.falling ) {
                this.vel.y = Math.floor(this.vel.y / 2);
                this.falling = true;
            }

            if( stateLeft && this.frozenTimer.delta() >= 0 ) {
                if( !ig.game.clock.started ) ig.game.clock.start();
                this.facingLeft = true;
                this.currentAnim = this.anims['run'];
                this.currentAnim.flip.x = this.facingLeft;
                this.vel.x = -this.speed.x;
            } else if( stateRight && this.frozenTimer.delta() >= 0 ) {
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

    EntityFox.ACTION = {
        UP: 1,
        LEFT: 2,
        RIGHT: 4
    };

});