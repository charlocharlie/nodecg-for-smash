'use strict';

$(function() {
	nodecg.listenFor('ssbmPlayercam', updateLabel);
    nodecg.listenFor('smashLayoutUpdate', 'smash-game-switcher', updateLayout);
    
	function updateLabel(data) {
		$('#container').animate({top: "56px"}, {duration: 500, complete: function() {
			$('#textLeft').text(data.commentatorLeft);
            $('#textRight').text(data.commentatorRight);
		}});
		$('#container').animate({top: "0%"}, 1000);
	}

	function updateLayout(data) {
        if (data.game == '64') { //SMASH 64
            $('.rectangle').css({
                left: '96px',
                width: '296px',
            });
            $('.mic').css({left: '139px'});
            $('.text').css({width: '135px'});
        }
        if (data.game == 'melee') { //MELEE
            $('.rectangle').css({
                left: '8px',
                width: '384px',
            });
            $('.mic').css({left: '182px'});
            $('.text').css({width: '178px'});
        }
        if (data.game == 'pm') { //PROJECT M/BRAWL
            $('.rectangle').css({
                left: '56px',
                width: '336px',
            });
            $('.mic').css({left: '159px'});
            $('.text').css({width: '155px'});
        }
        if (data.game == 'wiiu') { //SMASH FOR WII U
            $('.rectangle').css({
                left: '8px',
                width: '384px',
            });
            $('.mic').css({left: '182px'});
            $('.text').css({width: '178px'});
        }
        
    }
});