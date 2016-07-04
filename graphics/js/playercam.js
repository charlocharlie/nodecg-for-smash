'use strict';

$(function() {
	nodecg.listenFor('ssbmPlayercam', updateLabel);
	nodecg.listenFor('smashLayoutUpdate', updateLayout);

	function updateLabel(data) {
		$('#container').animate({top: "56px"}, {duration: 500, complete: function() {
			$('#textLeft').text(data.playercamLeft);
			$('#textRight').text(data.playercamRight);
		}});
		$('#container').animate({top: "0%"}, 1000);
	}

	function updateLayout(data) {
		if (data.game == '64') { //SMASH 64
			$('.rectangle').css({
				left: nodecg.bundleConfig['playercam-rectangle-rectangle-left-64'],
				width: nodecg.bundleConfig['playercam-rectangle-rectangle-width-64']
			});
			$('.mic').css({left: nodecg.bundleConfig['playercam-rectangle-mic-left-64']});
			$('.text').css({width: nodecg.bundleConfig['playercam-rectangle-text-width-64']});
		}
		if (data.game == 'melee') { //MELEE
			$('.rectangle').css({
				left: nodecg.bundleConfig['playercam-rectangle-rectangle-left-melee'],
				width: nodecg.bundleConfig['playercam-rectangle-rectangle-width-melee']
			});
			$('.mic').css({left: nodecg.bundleConfig['playercam-rectangle-mic-left-melee']});
			$('.text').css({width: nodecg.bundleConfig['playercam-rectangle-text-width-melee']});
		}
		if (data.game == 'pm') { //PROJECT M/BRAWL
			$('.rectangle').css({
				left: nodecg.bundleConfig['playercam-rectangle-rectangle-left-pm'],
				width: nodecg.bundleConfig['playercam-rectangle-rectangle-width-pm']
			});
			$('.mic').css({left: nodecg.bundleConfig['playercam-rectangle-mic-left-pm']});
			$('.text').css({width: nodecg.bundleConfig['playercam-rectangle-text-width-pm']});
		}
		if (data.game == 'wiiu') { //SMASH FOR WII U
			$('.rectangle').css({
				left: nodecg.bundleConfig['playercam-rectangle-rectangle-left-wiiu'],
				width: nodecg.bundleConfig['playercam-rectangle-rectangle-width-wiiu']
			});
			$('.mic').css({left: nodecg.bundleConfig['playercam-rectangle-mic-left-wiiu']});
			$('.text').css({width: nodecg.bundleConfig['playercam-rectangle-text-width-wiiu']});
		}

	}
});
