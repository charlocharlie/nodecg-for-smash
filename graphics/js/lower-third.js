"use strict";
$( function() {
	nodecg.listenFor( "lowerThirdUpdate", update );
	nodecg.listenFor( "lowerThirdUpdateAnim", updateAnim );

	function update( data ) {
		$( "#lowerthirdtoptext" ).text( data.top );
		$( "#lowerthirdbottomtext" ).text( data.bottom );
	}

	function updateAnim( data ) {
		$( "#lowerthirdcontainer" ).animate( { transform: "translateX(-1650px)" }, { duration: 800, complete: function() {
				update( data );
			} } );
		$( "#lowerthirdcontainer" ).animate( { transform: "translateX(0px)" }, 800 );
	}
} );
