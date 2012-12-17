ig.module(
	'game.main'
)
.requires(
	'game.entities.fox',
	'game.entities.chicken',
	'game.entities.egg',
	'game.entities.camera',
	'game.entities.sun',
	'game.entities.small-cloud',
	'game.entities.big-cloud',
	'game.levels.test',
	'impact.game',
	'impact.debug.debug',
	'impact.font'
)
.defines(function(){

MyGame = ig.Game.extend({

	// How many eggs to spawn?
	eggTotal: 5,

	// Load a font
	font: new ig.Font( 'media/04b03.font.black.png' ),

	// Load egg for HUD.
	eggImage: new ig.Image('media/egg.png'),

	clearColor: '#BCDEDE',

	gravity: 200,

	init: function() {

		ig.input.bind( ig.KEY.UP_ARROW, 'up' );

		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );

		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );

		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );

		this.loadLevel(LevelTest);

		ig.music.add( 'media/audio/track1.mp3' );
		ig.music.add( 'media/audio/track2.mp3' );
		ig.music.add( 'media/audio/track3.mp3' );
		ig.music.add( 'media/audio/track4.mp3' );
		ig.music.add( 'media/audio/track5.mp3' );
		ig.music.add( 'media/audio/track6.mp3' );

		ig.music.volume = 0.5;
		//ig.music.play();

	},

	loadLevel: function(data) {

		this.parent(data);

		// Add fox.

		var start = this.getEntitiesByType(EntityStart)[0];

		this.player = this.spawnEntity(EntityFox, start.pos.x, start.pos.y);

		start.kill();

		// Add randomly placed eggs.

		// Function to shuffle an array.
		//+ Jonas Raoni Soares Silva
		//@ http://jsfromhell.com/array/shuffle [v1.0]
		var shuffle = function(o){

		    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);

		    return o;

		};

		var eggSpawns = this.getEntitiesByType(EntityEggSpawn);

		if( eggSpawns ) {

			eggSpawns = shuffle( eggSpawns );

			var spawned = 0;

			for( var i = 0; i < eggSpawns.length; i++ ) {

				var egg = eggSpawns[i];

				if( spawned < this.eggTotal ) {

					this.spawnEntity(EntityEgg, egg.pos.x, egg.pos.y);

					spawned++;

				}

				egg.kill();

			}

		}

		// Add chicken.
		this.spawnEntity(EntityChicken, 24, 24);

		// Add the sun.
		this.spawnEntity(EntitySun, 128, 16);

		// Add clouds.

		this.spawnEntity(EntityBigCloud, 64, 32);

		this.spawnEntity(EntitySmallCloud, 24, 24);

		this.spawnEntity(EntitySmallCloud, 96, 16);

		// Mind entity zIndex values.
		this.sortEntitiesDeferred();

		// Add camera.
		this.spawnEntity(EntityCamera);

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

		/*
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;

		this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
		*/
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 160, 160, 2 );

});
