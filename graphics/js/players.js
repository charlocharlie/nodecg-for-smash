"use strict";
$( function() {
	var topvar = 8; //For animation on a game by game basis in this js file.
	var twoPlayer = nodecg.Replicant( "twoPlayerValue" );
	var teamNamesReplicant = nodecg.Replicant( "teamNames", { defaultValue: [] } );
	var currentGame = nodecg.Replicant( "currentGame", { defaultValue: "melee" } );
	var teamNames;
	nodecg.listenFor( "ssbmPlayerUpdate", updatePlayers );
	updateLayout( currentGame.value );

	teamNamesReplicant.on( "change", function( newValue, oldValue ) {
		teamNames = newValue;
	} );

	function updatePlayers( data, toggle ) {
		var p1new = false;
		var p2new = false;

		if ( !twoPlayer.value ) {
			data.p1Tag += " & " + data.p3Tag;
			data.p2Tag += " & " + data.p4Tag;
		}
		if ( $( "#p1tag" ).text() !== data.p1Tag || toggle ) {
			$( "#player1" ).animate( { transform: "translateY(50px)" }, 500 );
			p1new = true;
		}
		if ( $( "#p2tag" ).text() !== data.p2Tag || toggle ) {
			$( "#player2" ).animate( { transform: "translateY(50px)" }, 500 );
			p2new = true;
		}

		if ( p1new || p2new ) {
			setTimeout( function() {
				setText( data );
			}, 500 );
		} else {
			setText( data );
		}

		if ( p1new ) {
			$( "#player1" ).animate( { transform: "translateY(0px)" }, 1000 );
		}
		if ( p2new ) {
			$( "#player2" ).animate( { transform: "translateY(0px)" }, 1000 );
		}
	}

	function setText( data ) {
		if ( twoPlayer.value ) {
			$( "#p1tag" ).text( data.p1Tag ).css( "text-align", "left" );
			$( "#p2tag" ).text( data.p2Tag ).css( "text-align", "right" );

			$( "#p1score" ).text( data.p1Score );
			$( "#p2score" ).text( data.p2Score );

			handleCharacter( data.p1Char, data.p1Costume, 3 );
			handleCharacter( data.p2Char, data.p2Costume, 2 );
			$( "#p1char" ).hide();
			$( "#p4char" ).hide();

			if ( data.p1Flag ) {
				$( "#p1flag" ).attr( "class", "flag flag-" + data.p1Flag.toLowerCase() ).show();
			}
			if ( data.p2Flag ) {
				$( "#p2flag" ).attr( "class", "flag flag-" + data.p2Flag.toLowerCase() ).show();
			}
			handleGrands( data.p1Grands, 1 );
			handleGrands( data.p2Grands, 2 );
			handleSponsor( data.p1Sponsor, 3 );
			handleSponsor( data.p2Sponsor, 2 );
			$( "#p1sponsor" ).hide();
			$( "#p2sponsor" ).css('left', '');
			$( "#p3sponsor" ).css('left', '');
			$( "#p4sponsor" ).hide();
		} else {
			$( "#p1tag" ).text( data.p1Tag ).css( "text-align", "center" );
			$( "#p2tag" ).text( data.p2Tag ).css( "text-align", "center" );
			$( "#p1score" ).text( data.team1Score );
			$( "#p2score" ).text( data.team2Score );

			handleCharacter( data.p1Char, data.p1Costume, 1 );
			handleCharacter( data.p2Char, data.p2Costume, 2 );
			handleCharacter( data.p3Char, data.p3Costume, 3 );
			handleCharacter( data.p4Char, data.p4Costume, 4 );
			$( "#p1flag" ).hide();
			$( "#p2flag" ).hide();

			handleGrands( data.team1Grands, 1 );
			handleGrands( data.team2Grands, 2 );

			handleSponsor( data.p1Sponsor, 1 );
			handleSponsor( data.p2Sponsor, 2 );
			handleSponsor( data.p3Sponsor, 3 );
			handleSponsor( data.p4Sponsor, 4 );
			$( "#p2sponsor" ).css('left', '30%');
			$( "#p3sponsor" ).css('left', '70%');
		}

	}

	function handleCharacter( charData, costumeData, slotNum ) {
		if ( charData != "none" ) {
			$( "#p" + slotNum + "char" ).show().attr( "src", "../../panel/" + window.nodecg.bundleName + "/img/char_icons/" + currentGame.value + "-" + charData + "-" + costumeData + ".png" );
		} else {
			$( "#p" + slotNum + "char" ).hide();
		}
	}

	function handleSponsor( sponsorData, slotNum ) {
		var $slot = $( "#p" + slotNum + "sponsor" );
		if ( sponsorData ) {
			if ( sponsorData == "none" ) {
				$slot.attr( "src", "" ).hide();
			} else {
				teamNamesReplicant.value.forEach( function( e ) {
					if ( e.name == sponsorData ) {
						$slot.show().attr( "src", e.url );
						return;
					}
				} );
			}
		}
	}

	function handleGrands( grandsData, slotNum ) {
		if ( grandsData ) {
			if ( grandsData == "none" ) {
				$( "#p" + slotNum + "grands" ).hide();
			} else {
				$( "#p" + slotNum + "grands" ).show();
				if ( grandsData == "winners" ) {
					$( "#p" + slotNum + "grands" ).text( "W" );
				} else if ( grandsData == "losers" ) {
					$( "#p" + slotNum + "grands" ).text( "L" );
				}
			}
		}
	}

	currentGame.on( "change", function( newValue, oldValue ) {
		updateLayout( newValue );
	} );

	function updateLayout( game ) {
		if ( game == "64" ) { //SMASH 64
			$( ".player" ).css( {
				width: nodecg.bundleConfig[ "players-player-width-64" ],
				height: nodecg.bundleConfig[ "players-player-height-64" ],
				top: nodecg.bundleConfig[ "players-topvar-64" ],
				"font-size": nodecg.bundleConfig[ "players-player-font-size-64" ]
			} );
			topvar = nodecg.bundleConfig[ "players-topvar-64" ];
			$( "#player1" ).css( { "left":nodecg.bundleConfig[ "players-player1-left-64" ] } );
			$( "#player2" ).css( { "left":nodecg.bundleConfig[ "players-player2-left-64" ] } );
			$( ".tag" ).css( { "flex-basis":nodecg.bundleConfig[ "players-tag-width-64" ] } );
			$( ".scoreBox" ).css( {
				width: nodecg.bundleConfig[ "players-scoreBox-size-64" ],
				height: nodecg.bundleConfig[ "players-scoreBox-size-64" ]
			} );
			$( ".score" ).css( {
				width: nodecg.bundleConfig[ "players-scoreBox-size-64" ],
				"line-height": nodecg.bundleConfig[ "players-scoreBox-size-64" ],
				"font-size": nodecg.bundleConfig[ "players-score-font-size-64" ]
			} );
			$( ".playercontainer" ).css( {
				"width": nodecg.bundleConfig[ "players-player-width-64" ],
				"height": nodecg.bundleConfig[ "players-player-height-64" ]
			} );
			$( ".head" ).css( {
				"height":  nodecg.bundleConfig[ "players-character-height-64" ],
				"image-rendering": "pixelated"
			} );
			$( ".flag" ).css( { "zoom": 1.0 } );
		}
		if ( game == "melee" ) { //MELEE
			$( ".player" ).css( {
				width: nodecg.bundleConfig[ "players-player-width-melee" ],
				height: nodecg.bundleConfig[ "players-player-height-melee" ],
				top: nodecg.bundleConfig[ "players-topvar-melee" ],
				"font-size": nodecg.bundleConfig[ "players-player-font-size-melee" ]
			} );
			topvar = nodecg.bundleConfig[ "players-topvar-melee" ];
			$( "#player1" ).css( { "left":nodecg.bundleConfig[ "players-player1-left-melee" ] } );
			$( "#player2" ).css( { "left":nodecg.bundleConfig[ "players-player2-left-melee" ] } );
			$( ".tag" ).css( { "flex-basis":nodecg.bundleConfig[ "players-tag-width-melee" ] } );
			$( ".scoreBox" ).css( {
				width: nodecg.bundleConfig[ "players-scoreBox-size-melee" ],
				height: nodecg.bundleConfig[ "players-scoreBox-size-melee" ]
			} );
			$( ".score" ).css( {
				width: nodecg.bundleConfig[ "players-scoreBox-size-melee" ],
				"line-height": nodecg.bundleConfig[ "players-scoreBox-size-melee" ],
				"font-size": nodecg.bundleConfig[ "players-score-font-size-melee" ]
			} );
			$( ".playercontainer" ).css( {
				"width": nodecg.bundleConfig[ "players-player-width-melee" ],
				"height": nodecg.bundleConfig[ "players-player-height-melee" ]
			} );
			$( ".head" ).css( {
				"height":  nodecg.bundleConfig[ "players-character-height-melee" ],
				"image-rendering": "auto"
			} );
			$( ".flag" ).css( { "zoom": 1.0 } );
		}
		if ( game == "pm" ) { //PROJECT M/BRAWL
			$( ".player" ).css( {
				width: nodecg.bundleConfig[ "players-player-width-pm" ],
				height: nodecg.bundleConfig[ "players-player-height-pm" ],
				top: nodecg.bundleConfig[ "players-topvar-pm" ],
				"font-size": nodecg.bundleConfig[ "players-player-font-size-pm" ]
			} );
			topvar = nodecg.bundleConfig[ "players-topvar-pm" ];
			$( "#player1" ).css( { "left":nodecg.bundleConfig[ "players-player1-left-pm" ] } );
			$( "#player2" ).css( { "left":nodecg.bundleConfig[ "players-player2-left-pm" ] } );
			$( ".tag" ).css( { "flex-basis":nodecg.bundleConfig[ "players-tag-width-pm" ] } );
			$( ".scoreBox" ).css( {
				width: nodecg.bundleConfig[ "players-scoreBox-size-pm" ],
				height: nodecg.bundleConfig[ "players-scoreBox-size-pm" ]
			} );
			$( ".score" ).css( {
				width: nodecg.bundleConfig[ "players-scoreBox-size-pm" ],
				"line-height": nodecg.bundleConfig[ "players-scoreBox-size-pm" ],
				"font-size": nodecg.bundleConfig[ "players-score-font-size-pm" ]
			} );
			$( ".playercontainer" ).css( {
				"width": nodecg.bundleConfig[ "players-player-width-pm" ],
				"height": nodecg.bundleConfig[ "players-player-height-pm" ]
			} );
			$( ".head" ).css( {
				"height":  nodecg.bundleConfig[ "players-character-height-pm" ],
				"image-rendering": "auto"
			} );
			$( ".flag" ).css( { "zoom": 1.0 } );
		}
		if ( game == "wiiu" ) { //SMASH FOR WII U
			$( ".player" ).css( {
				width: nodecg.bundleConfig[ "players-player-width-wiiu" ],
				height: nodecg.bundleConfig[ "players-player-height-wiiu" ],
				top: nodecg.bundleConfig[ "players-topvar-wiiu" ],
				"font-size": nodecg.bundleConfig[ "players-player-font-size-wiiu" ]
			} );
			topvar = nodecg.bundleConfig[ "players-topvar-wiiu" ];
			$( "#player1" ).css( { "left":nodecg.bundleConfig[ "players-player1-left-wiiu" ] } );
			$( "#player2" ).css( { "left":nodecg.bundleConfig[ "players-player2-left-wiiu" ] } );
			$( ".tag" ).css( { "flex-basis":nodecg.bundleConfig[ "players-tag-width-wiiu" ] } );
			$( ".scoreBox" ).css( {
				width: nodecg.bundleConfig[ "players-scoreBox-size-wiiu" ],
				height: nodecg.bundleConfig[ "players-scoreBox-size-wiiu" ]
			} );
			$( ".score" ).css( {
				width: nodecg.bundleConfig[ "players-scoreBox-size-wiiu" ],
				"line-height": nodecg.bundleConfig[ "players-scoreBox-size-wiiu" ],
				"font-size": nodecg.bundleConfig[ "players-score-font-size-wiiu" ]
			} );
			$( ".playercontainer" ).css( {
				"width": nodecg.bundleConfig[ "players-player-width-wiiu" ],
				"height": nodecg.bundleConfig[ "players-player-height-wiiu" ]
			} );
			$( ".head" ).css( {
				"height":  nodecg.bundleConfig[ "players-character-height-wiiu" ],
				"image-rendering": "auto"
			} );
			$( ".flag" ).css( { "zoom": 18 / 22 } );
		}

	}
} );
