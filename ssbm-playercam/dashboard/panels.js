'use strict';

var $panel = $bundle.filter('.ssbm-playercam');

var $update = $panel.find('.ssbm-playercam-update');

$update.click(function() {
	nodecg.sendMessage('ssbmPlayercam', updateData()); 
});

function updateData() {
    return {
        'commentatorLeft': $('#comLeft').val(),
		'commentatorRight': $('#comRight').val()
    };
    
}