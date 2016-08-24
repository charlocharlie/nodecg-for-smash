( function() {
"use strict";
window.addEventListener( "WebComponentsReady", function( e ) {
	var $update = $( ".ssbm-crew-update" );
	var $hide = $( ".ssbm-crew-hide" );
	var currentGame = nodecg.Replicant( "currentGame", { defaultValue: "melee" } );

	currentGame.on( "change", function( newValue, oldValue ) {
		var charLists = document.getElementsByClassName( "characters" );
		for ( var i = 0; i < charLists.length; i++ ) {
			charLists[ i ].setAttribute( "list", newValue + "-characters" );
		}
	} );

	$update.click( function() {
		nodecg.sendMessage( "ssbmCrewUpdate", updateData() );
	} );

	$hide.click( function() {
		nodecg.sendMessage( "ssbmCrewHide", 0 );
	} );

	function updateData() {
		var roster1 = getRoster( 1 );
		var roster2 = getRoster( 2 );
		var teamNamesStock = getTeamNamesStock();
		var kos1 = getKOs( 1 );
		var kos2 = getKOs( 2 );
		var chars1 = getChars( 1 );
		var chars2 = getChars( 2 );

		return {
			"roster1": roster1,
			"roster2": roster2,
			"teamNamesStock": teamNamesStock,
			"kos1": kos1,
			"kos2": kos2,
			"chars1": chars1,
			"chars2": chars2
		};
	}

	function getRoster( team ) {
		var roster = [];
		var members = $( "#roster" + team + " > crew-member" );

		for ( var i = 0; i < 10; i++ ) {
			roster.push( members.get( i ).getTag() );
		}

		return roster;
	}

	function getTeamNamesStock() {
		var $crewScore = $( "crew-score" );
		var team1 = $crewScore.get( 0 );
		var team2 = $crewScore.get( 1 );
		return {
			"team1name": team1.getName(),
			"team1stock": team1.getScore(),
			"team2name": team2.getName(),
			"team2stock": team2.getScore()
		};
	}

	function getKOs( team ) {
		var kos = [];
		var members = $( "#roster" + team + " > crew-member" );

		for ( var i = 0; i < 10; i++ ) {
			kos.push( members.get( i ).getKO() );
		}

		return kos;
	}

	function getChars( team ) {
		var chars = [];
		var members = $( "#roster" + team + " > crew-member" );
		for ( var i = 0; i < 10; i++ ) {
			chars.push( getCharacter( members.get( i ).getCharacter() ) );
		}
		return chars;
	}

	function getCharacter( name ) {
		if ( characters[ name ] ) {
			return characters[ name ];
		}
		return "none";
	}
} );
} )();
