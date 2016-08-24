"use strict";

$( function() {
	nodecg.listenFor( "ssbmCrewUpdate", updateRosters );
	nodecg.listenFor( "ssbmCrewHide", hideRosters );
	var currentGame = nodecg.Replicant( "currentGame", { defaultValue: "melee" } );

	var halfWidth = 436;
	var leftEdge = 161;
	var border = 8;

	function updateRosters( data ) {
		var rosterSize = 10;
		for ( var i = 0; i < rosterSize; i++ ) {
			if ( $.trim( data.roster1[ i ] ) != "" ) {
				$( "#rosterleft > div:nth-child(" + ( i + 1 ) + ")" ).show()
					.children( "#rosternameleft" ).text( data.roster1[ i ] );
			} else {
				$( "#rosterleft > div:nth-child(" + ( i + 1 ) + ")" ).hide()
					.children( "#rosternameleft" ).text( data.roster1[ i ] );
			}
			if ( $.trim( data.roster2[ i ] ) != "" ) {
				$( "#rosterright > div:nth-child(" + ( i + 1 ) + ")" ).show()
					.children( "#rosternameright" ).text( data.roster2[ i ] );
			} else {
				$( "#rosterright > div:nth-child(" + ( i + 1 ) + ")" ).hide()
					.children( "#rosternameright" ).text( data.roster2[ i ] );
			}
			if ( data.kos1[ i ] ) {
				$( "#rosterleft > div:nth-child(" + ( i + 1 ) + ")" ).css( {
					"background-color": "#ddd"
				} ).children( "#rosternameleft" ).css( {
					"color": "#888",
					"text-decoration": "line-through"
				} ).siblings( "#leftchar" ).css( {
					"filter": "grayscale(75%)",
					"opacity": "0.6"
				} );
			} else {
				$( "#rosterleft > div:nth-child(" + ( i + 1 ) + ")" ).css( {
					"background-color": "#eee"
				} ).children( "#rosternameleft" ).css( {
					"color": "#000",
					"text-decoration": "none"
				} ).siblings( "#leftchar" ).css( {
					"filter": "grayscale(0%)",
					"opacity": "1"
				} );;
			}
			if ( data.kos2[ i ] ) {
				$( "#rosterright > div:nth-child(" + ( i + 1 ) + ")" ).css( {
					"background-color": "#ddd"
				} ).children( "#rosternameright" ).css( {
					"color": "#888",
					"text-decoration": "line-through"
				} ).siblings( "#rightchar" ).css( {
					"filter": "grayscale(75%)",
					"opacity": "0.6"
				} );;
			} else {
				$( "#rosterright > div:nth-child(" + ( i + 1 ) + ")" ).css( {
					"background-color": "#eee"
				} ).children( "#rosternameright" ).css( {
					"color": "#000",
					"text-decoration": "none"
				} ).siblings( "#rightchar" ).css( {
					"filter": "grayscale(0%)",
					"opacity": "1"
				} );;
			}
			handleCharacter( $( "#rosterleft > div:nth-child(" + ( i + 1 ) + ") > #leftchar" ), data.chars1[ i ] );
			handleCharacter( $( "#rosterright > div:nth-child(" + ( i + 1 ) + ") > #rightchar" ), data.chars2[ i ] );
		}

		$( "#crewnameleft" ).text( data.teamNamesStock.team1name );
		$( "#crewstockleft" ).text( data.teamNamesStock.team1stock );
		$( "#crewnameright" ).text( data.teamNamesStock.team2name );
		$( "#crewstockright" ).text( data.teamNamesStock.team2stock );

		showRosters();
	}

	function handleCharacter( $component, charData ) {
		if ( charData != "none" ) {
			$component.show().attr( "src", "../../panel/" + window.nodecg.bundleName +
				"/img/char_icons/" + currentGame.value + "-" + charData + "-1.png" );
		} else {
			$component.hide();
		}
	}

	function showRosters() {
		var delay = 50;
		var rosterSize = 10;
		$( "#rosterheaderleft" ).animate( { left: "0%" }, 500 );
		$( "#rosterheaderright" ).animate( { left: "0%" }, 500 );
		for ( var i = 1; i <= rosterSize; i++ ) {
			$( "#rosterleft > div:nth-child(" + i + ")" )
				.delay( delay * i )
				.queue( function( nxt ) {
					$( this ).animate( { left: "0%" }, 500 );
					nxt();
				} );
			$( "#rosterright > div:nth-child(" + i + ")" )
				.delay( delay * i )
				.queue( function( nxt ) {
					$( this ).animate( { left: "0%" }, 500 );
					nxt();
				} );
		}
		//$('#rosterleft').animate({left: "0%"}, 500);
		//$('#rosterright').animate({left: "0%"}, 500);
	}

	function hideRosters( data ) {
		var delay = 50;
		var rosterSize = 10;
		$( "#rosterheaderleft" ).animate( { left: -leftEdge - 275 - 8 + border + "px" }, 500 );
		$( "#rosterheaderright" ).animate( { left: halfWidth + 8 + "px" }, 500 );
		for ( var i = 1; i <= rosterSize; i++ ) {
			$( "#rosterleft > div:nth-child(" + i + ")" )
				.delay( delay * i )
				.queue( function( nxt ) {
					$( this ).animate( { left: -leftEdge - 275 - 8 + border + "px" }, 500 );
					nxt();
				} );
			$( "#rosterright > div:nth-child(" + i + ")" )
				.delay( delay * i )
				.queue( function( nxt ) {
					$( this ).animate( { left: halfWidth + 8 + "px" }, 500 );
					nxt();
				} );
		}
		//$('#rosterleft').animate({left: "-275px"}, 500);
		//$('#rosterright').animate({left: "275px"}, 500);
	}
	currentGame.on( "change", function( newValue, oldValue ) {
		updateLayout( newValue );
	} );

	function updateLayout( game ) {
		if ( game == "64" ) { //SMASH 64
			halfWidth = nodecg.bundleConfig[ "crew-roster-halfWidth-64" ];
			border = nodecg.bundleConfig[ "crew-roster-border-64" ];
			leftEdge = nodecg.bundleConfig[ "crew-roster-leftEdge-64" ];
			$( "#rosterheadercontainer" ).css( { left: leftEdge + "px" } );
			$( "#rosterheaderleft" ).css( { left: -leftEdge - 275 - 8 + border + "px" } );
			$( "#rosterheaderright" ).css( { left: halfWidth + 8 + "px" } );
			$( "#rosterleft" ).css( { left: leftEdge + "px" } );
			$( "#rosterright" ).css( { left: leftEdge + "px" } );
			$( "#rosterleft .rosterentry" ).css( { left: -leftEdge - 275 - 8 + border + "px" } );
			$( "#rosterright .rosterentry" ).css( { left: halfWidth + 8 + "px" } );
			$( ".head" ).css( {
				"image-rendering": "pixelated"
			} );
		}
		if ( game == "melee" ) { //MELEE
			halfWidth = nodecg.bundleConfig[ "crew-roster-halfWidth-melee" ];
			border = nodecg.bundleConfig[ "crew-roster-border-melee" ];
			leftEdge = nodecg.bundleConfig[ "crew-roster-leftEdge-melee" ];
			$( "#rosterheadercontainer" ).css( { left: leftEdge + "px" } );
			$( "#rosterheaderleft" ).css( { left: -leftEdge - 275 - 8 + border + "px" } );
			$( "#rosterheaderright" ).css( { left: halfWidth + 8 + "px" } );
			$( "#rosterleft" ).css( { left: leftEdge + "px" } );
			$( "#rosterright" ).css( { left: leftEdge + "px" } );
			$( "#rosterleft .rosterentry" ).css( { left: -leftEdge - 275 - 8 + border + "px" } );
			$( "#rosterright .rosterentry" ).css( { left: halfWidth + 8 + "px" } );
			$( ".head" ).css( {
				"image-rendering": "auto"
			} );
		}
		if ( game == "pm" ) { //PROJECT M/BRAWL
			halfWidth = nodecg.bundleConfig[ "crew-roster-halfWidth-pm" ];
			border = nodecg.bundleConfig[ "crew-roster-border-pm" ];
			leftEdge = nodecg.bundleConfig[ "crew-roster-leftEdge-pm" ];
			$( "#rosterheadercontainer" ).css( { left: leftEdge + "px" } );
			$( "#rosterheaderleft" ).css( { left: -leftEdge - 275 - 8 + border + "px" } );
			$( "#rosterheaderright" ).css( { left: halfWidth + 8 + "px" } );
			$( "#rosterleft" ).css( { left: leftEdge + "px" } );
			$( "#rosterright" ).css( { left: leftEdge + "px" } );
			$( "#rosterleft .rosterentry" ).css( { left: -leftEdge - 275 - 8 + border + "px" } );
			$( "#rosterright .rosterentry" ).css( { left: halfWidth + 8 + "px" } );
			$( ".head" ).css( {
				"image-rendering": "auto"
			} );
		}
		if ( game == "wiiu" ) { //SMASH FOR WII U
			halfWidth = nodecg.bundleConfig[ "crew-roster-halfWidth-wiiu" ];
			border = nodecg.bundleConfig[ "crew-roster-border-wiiu" ];
			leftEdge = nodecg.bundleConfig[ "crew-roster-leftEdge-wiiu" ];
			$( "#rosterheadercontainer" ).css( { left: leftEdge + "px" } );
			$( "#rosterheaderleft" ).css( { left: -leftEdge - 275 - 8 + border + "px" } );
			$( "#rosterheaderright" ).css( { left: halfWidth + 8 + "px" } );
			$( "#rosterleft" ).css( { left: leftEdge + "px" } );
			$( "#rosterright" ).css( { left: leftEdge + "px" } );
			$( "#rosterleft .rosterentry" ).css( { left: -leftEdge - 275 - 8 + border + "px" } );
			$( "#rosterright .rosterentry" ).css( { left: halfWidth + 8 + "px" } );
			$( ".head" ).css( {
				"image-rendering": "auto"
			} );
		}

	}
} );
