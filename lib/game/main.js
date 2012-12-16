ig.module(
	'game.main'
)
.requires(
	'game.entities.fox',
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

	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),

	clearColor: '#BCDEDE',

	gravity: 200,

	init: function() {

		ig.input.bind( ig.KEY.UP_ARROW, 'up' );

		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );

		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );

		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );

		this.loadLevel(LevelTest);

	},

	loadLevel: function(data) {

		this.parent(data);

		// Add fox.

		var start = this.getEntitiesByType(EntityStart)[0];

		this.player = this.spawnEntity(EntityFox, start.pos.x, start.pos.y);

		start.kill();

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
