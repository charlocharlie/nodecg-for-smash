( function() {
"use strict";
window.addEventListener( "WebComponentsReady", function() {
	var $update = $( "#ssbm-players-update" );
	var $clear = $( "#ssbm-clear-fields" );
	var $swap = $( "#ssbm-players-swap" );
	var $swapT1 = $( "#ssbm-team1Swap" );
	var $swapT2 = $( "#ssbm-team2Swap" );
	var costumeRep = nodecg.Replicant( "costumeRep", { defaultValue: [] } );
	var tagInputRep = nodecg.Replicant( "tagInputRep", { defaultValue: [] } );
	var twoPlayerValue = nodecg.Replicant( "twoPlayerValue", { defaultValue: true } );
	var teamNamesReplicant = nodecg.Replicant( "teamNames", { defaultValue: [] } );

	//Need these to be preloaded
	var playerList64 = nodecg.Replicant( "playerList64", { defaultValue: [] } );
	var playerListMelee = nodecg.Replicant( "playerListMelee", { defaultValue: [] } );
	var playerListPM = nodecg.Replicant( "playerListPM", { defaultValue: [] } );
	var playerListWiiU = nodecg.Replicant( "playerListWiiU", { defaultValue: [] } );
	var playerList = nodecg.Replicant( "playerListMelee", { defaultValue: [] } );
	var currentGame = nodecg.Replicant( "currentGame", { defaultValue: "melee" } );
	costumeRep.value = [ "", "", "", "" ];

	currentGame.on( "change", function( newValue, oldValue ) {
		for ( var i = 1; i <= 4; i++ ) {
			document.querySelector( "#ssbm-p" + i + "Char" ).setAttribute( "list", newValue +
				"-characters" );
		}
		switch ( newValue ) {
			case "64":
				playerList = nodecg.Replicant( "playerList64", { defaultValue: [] } );
				break;
			case "melee":
				playerList = nodecg.Replicant( "playerListMelee", { defaultValue: [] } );
				break;
			case "pm":
				playerList = nodecg.Replicant( "playerListPM", { defaultValue: [] } );
				break;
			case "wiiu":
				playerList = nodecg.Replicant( "playerListWiiU", { defaultValue: [] } );
				break;
		}
		if ( oldValue != undefined ) {
			updatePlayerList();
		}
	} );

	costumeRep.on( "change", function( newValue, oldValue ) {
		if ( oldValue == undefined ) {
			return;
		}
		for ( var i = 0; i < 4; i++ ) {
			if ( newValue[ i ] != oldValue[ i ] ) {
				updateCostumes( i + 1, costumeRep.value[ i ] );
			}
		}
	} );

	function updateCostumes( num, char ) {
		removeOptions( document.getElementById( "char-costume-p" + num ) );
		var fancy = document.getElementById( "char-costume-p" + num ).get( "fancySelect" );
		fancy.detach();
		var charCode = getCharacter( char );
		if ( charCode != "none" ) {
			for ( var i = 1; i <= 16; i++ ) {
				if ( UrlExists( "img/char_icons/" + currentGame.value + "-" + charCode + "-" + i + ".png" ) ) {
					$( "#char-costume-p" + num ).append( "<option value=\"" + i +
						"\" data-image=\"img/char_icons/" + currentGame.value + "-" + charCode +
						"-" + i + ".png\"></option>" );
					//<option value="1" data-image="img/Icon files/64-fox-1.png"></option>
				} else {
					break;
				}
			}
		} else {
			$( "#char-costume-p" + num ).append( "<option value=\"\"></option>" );
		}
		document.querySelector( "#char-costume-p" + num ).fancySelect( {
			showText: false,
			showImages: true,
			className: "fancy-select",
			autoHide: true
		} );
		if ( currentGame.value == "64" ) {
			$( ".fancy-select .image" ).css( "image-rendering", "pixelated" );
		} else {
			$( ".fancy-select .image" ).css( "image-rendering", "auto" );
		}
	}

	/**
	 * @return {boolean}
	 */
	function UrlExists( url ) {
		var http = new XMLHttpRequest();
		http.open( "HEAD", url, false );
		http.send();
		return http.status != 404;
	}

	function removeOptions( selectBox ) {
		var i;
		for ( i = selectBox.options.length - 1 ; i >= 0 ; i-- ) {
			selectBox.remove( i );
		}
	}

	function tagUpdateFields( num ) {
		var inputTag = $.trim( document.querySelector( "#player" + num ).getTag() );
		var result;
		try {
			result = $.grep( playerList.value, function( e ) {
				return e.tag == inputTag;
			} );
		}
		catch ( e ) {
			return;
		}
		if ( result.length == 0 ) {
			return;
		} else if ( result.length >= 1 ) { //Fill fields with stored data
			document.querySelector( "#player" + num ).setCharacter( result[ 0 ].char );
			updateCostumes( num, result[ 0 ].char );
			document.querySelector( "#player" + num ).setFlag( result[ 0 ].flag );
			document.querySelector( "#player" + num ).setSponsor( result[ 0 ].sponsor );
			document.querySelector( "#player" + num ).setCostume( result[ 0 ].costume );
		}
	}

	teamNamesReplicant.on( "change", function( newValue, oldValue ) {
		document.querySelector( "#player1" ).setTeams( newValue );
		document.querySelector( "#player2" ).setTeams( newValue );
		document.querySelector( "#player3" ).setTeams( newValue );
		document.querySelector( "#player4" ).setTeams( newValue );
	} );

	$update.click( function() {
		//Console.log(updateData());
		nodecg.sendMessage( "ssbmPlayerUpdate", updateData() );
	} );

	$swap.click( function() {
		// Console.log(swapPlayers());
		if ( twoPlayerValue.value ) {
			nodecg.sendMessage( "ssbmPlayerUpdate", swapPlayers( 1, 2 ) );
		} else {
			swapPlayers( 1, 2 );
			swapPlayers( 3, 4 );
			var t1 = document.querySelector( "#team" + 1 );
			var t2 = document.querySelector( "#team" + 2 );
			var tmp = {
				"score": t1.getScore(),
				"grands": t1.getGrands()
			};
			t1.setScore( t2.getScore() );
			t1.setGrands( t2.getGrands() );

			t2.setScore( tmp.score );
			t2.setGrands( tmp.grands );
			nodecg.sendMessage( "ssbmPlayerUpdate", updateData() );
		}
	} );

	$swapT1.click( function() {
		nodecg.sendMessage( "ssbmPlayerUpdate", swapPlayers( 1, 3 ) );
	} );

	$swapT2.click( function() {
		nodecg.sendMessage( "ssbmPlayerUpdate", swapPlayers( 2, 4 ) );
	} );

	twoPlayerValue.on( "change", function( newValue, oldValue ) {
		toggleTwoFour();
	} );

	$clear.click( function() {
		for ( var i = 0; i < 4; i++ ) {
			clearFields( i + 1 );
		}
		document.querySelector( "#team1" ).setScore( 0 );
		document.querySelector( "#team2" ).setScore( 0 );
		document.querySelector( "#team1" ).setGrands( "none" );
		document.querySelector( "#team2" ).setGrands( "none" );
	} );

	tagInputRep.on( "change", function( newValue, oldValue ) {
		if ( oldValue == undefined ) {
			return;
		}
		for ( var i = 0; i < 4; i++ ) {
			if ( newValue[ i ] != oldValue[ i ] ) {
				tagUpdateFields( i + 1 );
			}
		}
	} );

	function pushIfNotExist( val ) {
		if ( typeof ( val ) == "undefined" || val == "" || val.tag == "" ) {
			return;
		}
		var result = $.grep( playerList.value, function( e ) {
			return e.tag == val.tag;
		} );
		if ( result.length == 0 ) {
			playerList.value.push( val );
			//Console.log(playerList.value);
		} else if ( result.length >= 1 ) {
			for ( var i = playerList.value.length - 1; i >= 0; i-- ) {
				if ( playerList.value[ i ].tag == val.tag ) {
					playerList.value.splice( i, 1 );
				}
			}
			playerList.value.push( val );
			//Console.log(playerList.value);
		}
	}

	function updatePlayerList() {
		var $players = $( "#players" );
		$players.empty();
		var arrayLength = playerList.value.length;
		for ( var i = 0; i < arrayLength; i++ ) {
			$players.append( "<option>" + playerList.value[ i ].tag + "</option>" );
		}
	}

	function updateData() {
		pushIfNotExist( getPlayerData( 1 ) );
		pushIfNotExist( getPlayerData( 2 ) );
		pushIfNotExist( getPlayerData( 3 ) );
		pushIfNotExist( getPlayerData( 4 ) );
		playerList.value.sort();
		updatePlayerList();
		if ( twoPlayerValue.value ) {
			return {
				"p1Tag": document.querySelector( "#player1" ).getTag(),
				"p1Score": document.querySelector( "#player1" ).getScore(),
				"p1Char": getCharacter( document.querySelector( "#player1" ).getCharacter() ),
				"p1Flag": getCountryCode( document.querySelector( "#player1" ).getFlag() ),
				"p1Sponsor": document.querySelector( "#player1" ).getSponsor(),
				"p1Grands": document.querySelector( "#player1" ).getGrands(),
				"p1Costume": document.querySelector( "#player1" ).getCostume(),
				"p2Tag": document.querySelector( "#player2" ).getTag(),
				"p2Score": document.querySelector( "#player2" ).getScore(),
				"p2Char": getCharacter( document.querySelector( "#player2" ).getCharacter() ),
				"p2Flag": getCountryCode( document.querySelector( "#player2" ).getFlag() ),
				"p2Sponsor": document.querySelector( "#player2" ).getSponsor(),
				"p2Grands": document.querySelector( "#player2" ).getGrands(),
				"p2Costume": document.querySelector( "#player2" ).getCostume()
			};
		} else {
			return {
				"team1Score": document.querySelector( "#team1" ).getScore(),
				"team1Grands": document.querySelector( "#team1" ).getGrands(),
				"team2Score": document.querySelector( "#team2" ).getScore(),
				"team2Grands": document.querySelector( "#team2" ).getGrands(),
				"p1Tag": document.querySelector( "#player1" ).getTag(),
				"p1Char": getCharacter( document.querySelector( "#player1" ).getCharacter() ),
				"p1Flag": getCountryCode( document.querySelector( "#player1" ).getFlag() ),
				"p1Sponsor": document.querySelector( "#player1" ).getSponsor(),
				"p1Costume": document.querySelector( "#player1" ).getCostume(),
				"p2Tag": document.querySelector( "#player2" ).getTag(),
				"p2Char": getCharacter( document.querySelector( "#player2" ).getCharacter() ),
				"p2Flag": getCountryCode( document.querySelector( "#player2" ).getFlag() ),
				"p2Sponsor": document.querySelector( "#player2" ).getSponsor(),
				"p2Costume": document.querySelector( "#player2" ).getCostume(),
				"p3Tag": document.querySelector( "#player3" ).getTag(),
				"p3Char": getCharacter( document.querySelector( "#player3" ).getCharacter() ),
				"p3Flag": getCountryCode( document.querySelector( "#player3" ).getFlag() ),
				"p3Sponsor": document.querySelector( "#player3" ).getSponsor(),
				"p3Costume": document.querySelector( "#player3" ).getCostume(),
				"p4Tag": document.querySelector( "#player4" ).getTag(),
				"p4Char": getCharacter( document.querySelector( "#player4" ).getCharacter() ),
				"p4Flag": getCountryCode( document.querySelector( "#player4" ).getFlag() ),
				"p4Sponsor": document.querySelector( "#player4" ).getSponsor(),
				"p4Costume": document.querySelector( "#player4" ).getCostume()
			};
		}
	}

	function getCountryCode( name ) {
		if ( countryCodes[ name ] ) {
			return countryCodes[ name ];
		}
		return "XX";
	}

	function getCharacter( name ) {
		if ( characters[ name ] ) {
			return characters[ name ];
		}
		return "none";
	}

	function clearFields( num ) {
		var player = document.querySelector( "#player" + num );
		player.setScore( 0 );
		player.setTag( "" );
		player.setSponsor( "none" );
		player.setCharacter( "" );
		player.setFlag( "" );
		updateCostumes( num, "none" );
		player.setGrands( "none" );
	}

	function swapPlayers( p1, p2 ) {
		var swap1 = document.querySelector( "#player" + p1 );
		var swap2 = document.querySelector( "#player" + p2 );
		var tmp = { // Temporarily store the values for player 1
			"tag": swap1.getTag(),
			"score": swap1.getScore(),
			"char": swap1.getCharacter(),
			"flag": swap1.getFlag(),
			"sponsor": swap1.getSponsor(),
			"grands": swap1.getGrands(),
			"costume": swap1.getCostume()
		};
		var costume2 = swap2.getCostume();

		swap1.setTag( swap2.getTag() );
		swap1.setScore( swap2.getScore() );
		swap1.setCharacter( swap2.getCharacter() );
		swap1.setFlag( swap2.getFlag() );
		swap1.setSponsor( swap2.getSponsor() );
		swap1.setGrands( swap2.getGrands() );

		swap2.setTag( tmp.tag );
		swap2.setScore( tmp.score );
		swap2.setCharacter( tmp.char );
		swap2.setFlag( tmp.flag );
		swap2.setSponsor( tmp.sponsor );
		swap2.setGrands( tmp.grands );

		var char1 = swap1.getCharacter();
		var char2 = swap2.getCharacter();
		updateCostumes( p1, char1 );
		updateCostumes( p2, char2 );

		swap1.setCostume( costume2 );
		swap2.setCostume( tmp.costume );

		return updateData();
	}

	function toggleTwoFour() {
		if ( !twoPlayerValue.value ) {
			$( "#p3p4" ).show();
			$( ".teams" ).show();
			$( ".grands-select-2p" ).attr( "disabled", true );
			$( ".player-score" ).attr( "disabled", true );
			document.querySelector( "#ssbm-players-swap" ).innerHTML = "Swap teams";
		} else {
			$( "#p3p4" ).hide();
			$( ".teams" ).hide();
			$( ".grands-select-2p" ).attr( "disabled", false );
			$( ".player-score" ).attr( "disabled", false );
			document.querySelector( "#ssbm-players-swap" ).innerHTML = "Swap players";
		}
	}

	function getPlayerData( num ) {
		return {
			tag: $.trim( document.querySelector( "#player" + num ).getTag() ),
			char: document.querySelector( "#player" + num ).getCharacter(),
			flag: document.querySelector( "#player" + num ).getFlag(),
			sponsor: document.querySelector( "#player" + num ).getSponsor(),
			costume: document.querySelector( "#player" + num ).getCostume()
		};
	}
} );
} )();
