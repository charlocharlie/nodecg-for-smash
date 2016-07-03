(function() {
	'use strict';
	window.addEventListener('WebComponentsReady', function(e) {
		//var $panel = $bundle.filter('.smash-game-switcher');
		var $update = $('#game-select');

		$update.click(function () {
			nodecg.sendMessage('smashLayoutUpdate', updateData());
		});

		function updateData() {
			return {
				'game': document.querySelector('#game-select').getSelected()
			};
		}
	});
})();
