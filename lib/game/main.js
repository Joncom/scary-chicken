ig.module(
    'game.main'
)
.requires(
    'game.entities.fox',
    'game.entities.chicken',
    'game.entities.egg',
    'game.entities.touch-area',
    'game.entities.clock',
    'game.levels.newlevel',
    'impact.game',
    //'impact.debug.debug',
    'impact.font'
)
.defines(function(){

MyGame = ig.Game.extend({
    firstLevel: LevelNewlevel,
    eggTotal: 0,
    font: new ig.Font( 'media/04b03.font.black.png' ),
    eggImage: new ig.Image('media/egg.png'),
    clearColor: '#BCDEDE',
    gravity: 200,
    tryAgainTimer: null,
    mobileAudioEnabled: false,
    tracks: [
        new ig.Sound('media/audio/track1.*'),
        new ig.Sound('media/audio/track2.*'),
        new ig.Sound('media/audio/track3.*'),
        new ig.Sound('media/audio/track4.*'),
        new ig.Sound('media/audio/track5.*'),
        new ig.Sound('media/audio/track6.*'),
    ],
    paused: false,
    status: 'play', // play / win / lose
    youLoseImg: new ig.Image('media/you-lose.png'),
    youWinImg: new ig.Image('media/you-win.png'),

    init: function() {
        window.onresize = this.onresize.bind(this);

        // Pause and unpause the game depending on visibility.
        // This ensures that music doesn't keep playing when iOS
        // Safari gets put into the background, for example.
        // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API#Example
        {
            // Set the name of the hidden property and the change event for visibility
            var hidden, visibilityChange;
            if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
                hidden = "hidden";
                visibilityChange = "visibilitychange";
            } else if (typeof document.msHidden !== "undefined") {
                hidden = "msHidden";
                visibilityChange = "msvisibilitychange";
            } else if (typeof document.webkitHidden !== "undefined") {
                hidden = "webkitHidden";
                visibilityChange = "webkitvisibilitychange";
            }

            var that = this;

            // If the page is hidden, pause the game;
            // if the page is shown, unpause the game
            function handleVisibilityChange() {
                if (document[hidden]) {
                    that.pause();
                } else {
                    that.unpause();
                }
            }

            // Warn if the browser doesn't support addEventListener or the Page Visibility API
            if (typeof document.addEventListener === "undefined" || hidden === undefined) {
                console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
            } else {
                // Handle page visibility change
                document.addEventListener(visibilityChange, handleVisibilityChange, false);
            }
        }

        this.tryAgainTimer = new ig.Timer(1.5);

        // Disable sound.
        // ig.Sound.enabled = false;

        // Bind controls.
        ig.input.initMouse();
        ig.input.bind( ig.KEY.UP_ARROW, 'up' );
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );

        // Setup audio.
        for(var i=1; i<=this.tracks.length; i++) {
            ig.music.add( this.tracks[i-1], 'track'+i );
        }
        ig.music.volume = 0.5;
        ig.music.loop = true;

        this.loadLevel(this.firstLevel);
    },

    onresize: function() {
        ig.system.resize(width(), height(), ig.system.scale);
        cssFitCanvas();
    },

    loadLevel: function(data) {

        this.parent(data);

        this.status = 'play'; // Reset after game-over

        // Add fox.
        var foxStart = this.getEntitiesByType(EntityFoxStart)[0];
        this.player = this.spawnEntity(EntityFox, foxStart.pos.x, foxStart.pos.y);
        foxStart.kill();

        // Get target egg amount.
        var eggs = this.getEntitiesByType(EntityEgg);
        if( eggs ) this.eggTotal = eggs.length;

        // Add chicken.
        var chickenStart = this.getEntitiesByType(EntityChickenStart)[0];
        this.chicken = this.spawnEntity(EntityChicken, chickenStart.pos.x, chickenStart.pos.y);
        chickenStart.kill();

        // Mind entity zIndex values.
        this.sortEntitiesDeferred();

        // Start music.
        ig.music.play('track1');

        // Spawn clock.
        this.clock = this.spawnEntity(EntityClock);

        if(ig.ua.mobile) {
            this.leftTouchArea = this.spawnEntity( EntityTouchArea, 0, 0, { action: 'left' } );
            this.rightTouchArea = this.spawnEntity( EntityTouchArea, 0, 0, { action: 'right' } );
            this.upTouchArea = this.spawnEntity( EntityTouchArea, 0, 0, { action: 'up' } );
        }
    },

    update: function() {
        if(this.paused) { return }

        // set player actions for this frame
        this.player.actions = 0;
        if( this.leftTouchArea && this.leftTouchArea.state() || ig.input.state('left') ) {
            this.player.actions += EntityFox.ACTION.LEFT;
        }
        if( this.rightTouchArea && this.rightTouchArea.state() || ig.input.state('right') ) {
            this.player.actions += EntityFox.ACTION.RIGHT;
        }
        if( this.upTouchArea && this.upTouchArea.state() || ig.input.state('up') ) {
            this.player.actions += EntityFox.ACTION.UP;
        }

        // Update all entities and backgroundMaps
        this.parent();

        // From game-over, allow key press to restart game
        if(this.status === 'win' || this.status === 'lose') {
            var releasedKey = (
                ig.input.released('up') ||
                ig.input.released('left') ||
                ig.input.released('right') ||
                (ig.game.upTouchArea && ig.game.upTouchArea.released()) ||
                (ig.game.leftTouchArea && ig.game.leftTouchArea.released()) ||
                (ig.game.rightTouchArea && ig.game.rightTouchArea.released())
            );
            if( releasedKey && this.tryAgainTimer.delta() >= 0 ) {
                this.loadLevelDeferred( this.firstLevel );
            }
        }

        // Update camera (screen follows player)
        {
            var screenX = ig.game.player.pos.x - ig.system.width / 2 + ig.game.player.size.x / 2;
            var screenY = ig.game.player.pos.y - ig.system.height / 2;
            var rightEdge = ig.game.collisionMap.pxWidth - ig.system.width;
            var bottomEdge = 160 - ig.system.height;

            // Show more ground on mobile, so touch controls don't hide player
            if(ig.ua.mobile) {
                bottomEdge += 32;
            }

            if( screenX < 0 ) screenX = 0;
            else if( screenX > rightEdge ) screenX = rightEdge;
            if( screenY < 0 ) screenY = 0;
            if( screenY > bottomEdge ) screenY = bottomEdge;

            ig.game.screen.x = screenX;
            ig.game.screen.y = screenY;
        }

        if(this.leftTouchArea) {
            this.leftTouchArea.pos.x = this.screen.x;
            this.leftTouchArea.pos.y = this.screen.y;
            this.leftTouchArea.size.x = 40;
            this.leftTouchArea.size.y = ig.system.height;
        }

        if(this.rightTouchArea) {
            this.rightTouchArea.pos.x = this.leftTouchArea.pos.x + this.leftTouchArea.size.x;
            this.rightTouchArea.pos.y = this.screen.y;
            this.rightTouchArea.size.x = this.leftTouchArea.size.x;
            this.rightTouchArea.size.y = ig.system.height;
        }

        if(this.upTouchArea) {
            this.upTouchArea.pos.x = this.rightTouchArea.pos.x + this.rightTouchArea.size.x;
            this.upTouchArea.pos.y = this.screen.y;
            this.upTouchArea.size.x = ig.system.width - this.leftTouchArea.size.x - this.rightTouchArea.size.x;
            this.upTouchArea.size.y = ig.system.height;
        }
    },

    draw: function() {
        this.parent();

        // Draw egg count
        if( this.player ) {
            var x = 8;
            var y = 8;
            var text = this.player.eaten + '/' + this.eggTotal;
            this.font.draw(text, x + this.eggImage.width + 4, y + 2, ig.Font.ALIGN.LEFT);
            this.eggImage.draw( x, y );
        }

        // Game-over?
        if(this.status === 'win' || this.status === 'lose') {

            // Draw 'you win', or 'you lose'
            var image = this.status === 'win' ? this.youWinImg : this.youLoseImg;
            image.draw(
                ig.system.width / 2 - image.width / 2,
                ig.system.height / 2 - image.height / 2
            );

            this.font.draw(
                'TRY AGAIN?',
                ig.system.width / 2,
                ig.system.height - this.font.height - 3,
                ig.Font.ALIGN.CENTER
            );
        }
    },

    pause: function() {
        if(!this.paused) {
            this.paused = true;
            ig.system.clock.pause();
            ig.music.pause();
        }
    },

    unpause: function() {
        if(this.paused) {
            this.paused = false;
            ig.system.clock.unpause();
            ig.music.play();
        }
    }

});

function landscape() {
    return window.innerWidth >= window.innerHeight;
}

function width() {
    return 160;
}

function height() {
    if(landscape()) {
        return 160;
    } else {
        return Math.floor(window.innerHeight / (window.innerWidth / width()));
    }
}

function cssFitCanvas() {
    if(landscape()) {
        ig.system.canvas.style.width = '';
    } else {
        ig.system.canvas.style.width = '100%';
    }
    ig.system.canvas.style.height = '100%';
}

ig.main( '#canvas', MyGame, 60, width(), height(), 2);
cssFitCanvas();

});
