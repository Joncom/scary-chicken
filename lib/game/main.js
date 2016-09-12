ig.module(
    'game.main'
)
.requires(
    'game.entities.fox',
    'game.entities.chicken',
    'game.entities.egg',
    'game.entities.camera',
    'game.entities.game-over',
    'game.entities.clock',
    'game.levels.newlevel',
    'plugins.touch-button',
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

    init: function() {

        // For Mobile Browsers and Ejecta
        if( ig.ua.mobile ) {

            // Disable sound.
            ig.Sound.enabled = false;

            // Bind controls.
            this.buttons = [
                new ig.TouchButton( 'up', 0, 0, ig.system.width, ig.system.height / 2 ),
                new ig.TouchButton( 'right', ig.system.width / 2, ig.system.height / 2, ig.system.width / 2, ig.system.height / 2 ),
                new ig.TouchButton( 'left', 0, ig.system.height / 2, ig.system.width / 2, ig.system.height / 2 )
            ];

        } else {

            // Bind controls.
            ig.input.bind( ig.KEY.UP_ARROW, 'up' );
            ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
            ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
            ig.input.bind( ig.KEY.SPACE, 'space' );

            // Setup audio.
            ig.music.add( 'media/audio/track1.*', 'track1' );
            ig.music.add( 'media/audio/track2.*', 'track2' );
            ig.music.add( 'media/audio/track3.*', 'track3' );
            ig.music.add( 'media/audio/track4.*', 'track4' );
            ig.music.add( 'media/audio/track5.*', 'track5' );
            ig.music.add( 'media/audio/track6.*', 'track6' );
            ig.music.volume = 0.5;
            ig.music.loop = true;
        }

        this.loadLevel(this.firstLevel);
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

        // Add camera.
        this.spawnEntity(EntityCamera);

        if( ! ig.ua.mobile ) {

            // Start music.
            ig.music.play('track1');
        }

        // Spawn clock.
        this.clock = this.spawnEntity(EntityClock);
    },

    update: function() {
        // Update all entities and backgroundMaps
        this.parent();

        // Add your own, additional update code here
    },

    draw: function() {
        // Draw all entities and backgroundMaps
        this.parent();

        // Draw egg count for HUD.
        if( this.player ) {
            var x = 8;
            var y = 8;
            var text = this.player.eaten + '/' + this.eggTotal;
            this.font.draw(text, x + this.eggImage.width + 4, y + 2, ig.Font.ALIGN.LEFT);
            this.eggImage.draw( x, y );
        }
    }

});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 160, 160, 4 );

});
