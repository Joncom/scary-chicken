ig.module(
    'game.main'
)
.requires(
    'game.entities.fox',
    'game.entities.chicken',
    'game.entities.egg',
    'game.entities.game-over',
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

    // How many eggs needed to collect?
    eggTotal: 0,

    // Load a font
    font: new ig.Font( 'media/04b03.font.black.png' ),

    // Load egg for HUD.
    eggImage: new ig.Image('media/egg.png'),

    clearColor: '#BCDEDE',

    gravity: 200,

    tryAgainTimer: null,

    init: function() {
        window.onresize = this.onresize.bind(this);

        this.tryAgainTimer = new ig.Timer(1.5);

        // Disable sound.
        // ig.Sound.enabled = false;

        // Bind controls.
        ig.input.initMouse();
        ig.input.bind( ig.KEY.UP_ARROW, 'up' );
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );

        // Setup audio.
        ig.music.add( 'media/audio/track1.*', 'track1' );
        ig.music.add( 'media/audio/track2.*', 'track2' );
        ig.music.add( 'media/audio/track3.*', 'track3' );
        ig.music.add( 'media/audio/track4.*', 'track4' );
        ig.music.add( 'media/audio/track5.*', 'track5' );
        ig.music.add( 'media/audio/track6.*', 'track6' );
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

        this.leftTouchArea = this.spawnEntity( EntityTouchArea, 0, 0, { action: 'left' } );
        this.rightTouchArea = this.spawnEntity( EntityTouchArea, 0, 0, { action: 'right' } );
        this.upTouchArea = this.spawnEntity( EntityTouchArea, 0, 0, { action: 'up' } );
    },

    update: function() {

        // set player actions for this frame
        this.player.actions = 0;
        if( this.leftTouchArea.state() || ig.input.state('left') ) {
            this.player.actions += EntityFox.ACTION.LEFT;
        }
        if( this.rightTouchArea.state() || ig.input.state('right') ) {
            this.player.actions += EntityFox.ACTION.RIGHT;
        }
        if( this.upTouchArea.state() || ig.input.state('up') ) {
            this.player.actions += EntityFox.ACTION.UP;
        }

        // Update all entities and backgroundMaps
        this.parent();

        // Update camera (screen follows player)
        {
            var screenX = ig.game.player.pos.x - ig.system.width / 2 + ig.game.player.size.x / 2;
            var screenY = ig.game.player.pos.y - ig.system.height / 2;
            var rightEdge = ig.game.backgroundMaps[0].width * ig.game.backgroundMaps[0].tilesize - ig.system.width;
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

        this.leftTouchArea.pos.x = this.screen.x;
        this.leftTouchArea.pos.y = this.screen.y;
        this.leftTouchArea.size.x = 40;
        this.leftTouchArea.size.y = ig.system.height;

        this.rightTouchArea.pos.x = this.leftTouchArea.pos.x + this.leftTouchArea.size.x;
        this.rightTouchArea.pos.y = this.screen.y;
        this.rightTouchArea.size.x = this.leftTouchArea.size.x;
        this.rightTouchArea.size.y = ig.system.height;

        this.upTouchArea.pos.x = this.rightTouchArea.pos.x + this.rightTouchArea.size.x;
        this.upTouchArea.pos.y = this.screen.y;
        this.upTouchArea.size.x = ig.system.width - this.leftTouchArea.size.x - this.rightTouchArea.size.x;
        this.upTouchArea.size.y = ig.system.height;
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
