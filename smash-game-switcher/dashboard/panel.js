'use strict';
var $panel = $bundle.filter('.smash-game-switcher');
var $update = $panel.find('.smash-game-switcher-update');

$update.click(function() {
	nodecg.sendMessage('smashLayoutUpdate', updateData());
});

function updateData() {
	return {
		'game': $('#game-select').val(),
	};
}