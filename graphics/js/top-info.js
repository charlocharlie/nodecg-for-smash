"use strict";
$( function() {
	var topvar = 16; //For animation on a game by game basis in this js file.
	var leftMessage = 8;
	var leftInfo = 104;
	var infoSpacing = 184;
	nodecg.listenFor( "ssbmTopUpdate", updateText );
	nodecg.listenFor( "ssbmTopUpdateAnim", updatePanelsAnim );
	nodecg.listenFor( "ssbmTopMessage", showMessage );
	nodecg.listenFor( "smashLayoutUpdate",  updateLayout );
	var currentGame = nodecg.Replicant( "currentGame", { defaultValue: "melee" } );

	function updatePanelsAnim( data ) {
		$( ".panel" ).animate( { transform: "translateY(-60px)" }, { duration: 500, complete: function() {
				updateText( data );
			} } )
		.animate( { transform: "translateY(0px)" }, { duration: 1000 } );
	}

	function updateText( data ) {
		$( "#panel1" ).text( data.panel1text );
		$( "#panel2" ).text( data.panel2text );
	}

	function showMessage( data ) {
		$( "#panel1" ).animate( { transform: "translateX(" + -( leftInfo + 240 + 8 ) + "px)" }, { duration: 1000 } );
		$( "#panel2" ).animate( { transform: "translateX(" + ( leftInfo + 240 + 8 ) + "px)" }, { duration: 1000 } );
		$( "#message" ).animate( { left: leftMessage + "px", width: 2 * ( leftInfo - leftMessage ) + infoSpacing + 480 +
			"px" }, { duration: 1000 } );
		setTimeout( function() {
			$( "#message-text" ).text( data ).fadeIn( 500 );
		}, 500 );
		setTimeout( hideMessage, 10000 );
	}

	function hideMessage( data ) {
		$( "#message-text" ).fadeOut( 500 );
		$( "#message" ).animate( { left: leftInfo + 240 + ( infoSpacing / 2 ) + "px", width: "0" }, { duration: 1000 } );
		$( "#panel1" ).animate( { transform: "translateY(0px)" }, { duration: 1000 } );
		$( "#panel2" ).animate( { transform: "translateY(0px)" }, { duration: 1000 } );
	}

	currentGame.on( "change", function( newValue, oldValue ) {
		updateLayout( newValue );
	} );

	function updateLayout( game ) {
		if ( game == "64" ) { //SMASH 64
			//Need ['...'] bracket format due to hyphens in variable names
			topvar = nodecg.bundleConfig[ "top-info-topvar-64" ];
			leftMessage = nodecg.bundleConfig[ "top-info-leftMessage-64" ];
			leftInfo = nodecg.bundleConfig[ "top-info-leftInfo-64" ];
			infoSpacing = nodecg.bundleConfig[ "top-info-infoSpacing-64" ];
			$( ".panel" ).css( { top: topvar + "px" } );
			$( "#panel1" ).css( { left: leftInfo + "px" } );
			$( "#panel2" ).css( { left: leftInfo + 240 + infoSpacing + "px" } );
			$( "#message" ).css( { left: leftInfo + 240 + ( infoSpacing / 2 ) + "px", top: topvar + "px" } );
		}
		if ( game == "melee" ) { //MELEE
			topvar = nodecg.bundleConfig[ "top-info-topvar-melee" ];
			leftMessage = nodecg.bundleConfig[ "top-info-leftMessage-melee" ];
			leftInfo = nodecg.bundleConfig[ "top-info-leftInfo-melee" ];
			infoSpacing = nodecg.bundleConfig[ "top-info-infoSpacing-melee" ];
			$( ".panel" ).css( { top: topvar + "px" } );
			$( "#panel1" ).css( { left: leftInfo + "px" } );
			$( "#panel2" ).css( { left: leftInfo + 240 + infoSpacing + "px" } );
			$( "#message" ).css( { left: leftInfo + 240 + ( infoSpacing / 2 ) + "px", top: topvar + "px" } );
		}
		if ( game == "pm" ) { //PROJECT M/BRAWL
			topvar = nodecg.bundleConfig[ "top-info-topvar-pm" ];
			leftMessage = nodecg.bundleConfig[ "top-info-leftMessage-pm" ];
			leftInfo = nodecg.bundleConfig[ "top-info-leftInfo-pm" ];
			infoSpacing = nodecg.bundleConfig[ "top-info-infoSpacing-pm" ];
			$( ".panel" ).css( { top: topvar + "px" } );
			$( "#panel1" ).css( { left: leftInfo + "px" } );
			$( "#panel2" ).css( { left: leftInfo + 240 + infoSpacing + "px" } );
			$( "#message" ).css( { left: leftInfo + 240 + ( infoSpacing / 2 ) + "px", top: topvar + "px" } );
		}
		if ( game == "wiiu" ) { //SMASH FOR WII U
			topvar = nodecg.bundleConfig[ "top-info-topvar-wiiu" ];
			leftMessage = nodecg.bundleConfig[ "top-info-leftMessage-wiiu" ];
			leftInfo = nodecg.bundleConfig[ "top-info-leftInfo-wiiu" ];
			infoSpacing = nodecg.bundleConfig[ "top-info-infoSpacing-wiiu" ];
			$( ".panel" ).css( { top: topvar + "px" } );
			$( "#panel1" ).css( { left: leftInfo + "px" } );
			$( "#panel2" ).css( { left: leftInfo + 240 + infoSpacing + "px" } );
			$( "#message" ).css( { left: leftInfo + 240 + ( infoSpacing / 2 ) + "px", top: topvar + "px" } );
		}

	}

} );
