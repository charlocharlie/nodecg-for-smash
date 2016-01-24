'use strict';
var topvar = 8; //For animation on a game by game basis in this js file.
$(function () {
	nodecg.listenFor('ssbmPlayerUpdate', updatePlayers);
    nodecg.listenFor('smashLayoutUpdate', 'smash-game-switcher', updateLayout);
    

	function updatePlayers(data) {
		var p1new = false;
		var p2new = false;
		if($('#p1tag').text() !== data.p1Tag) {
			$('#player1').animate({top: "60px"}, 500);
			p1new = true;
		}
		if($('#p2tag').text() !== data.p2Tag) {
			$('#player2').animate({top: "60px"}, 500);
			p2new = true;
		}

		if (p1new || p2new)
			setTimeout(function() { setText(data); }, 500);
		else setText(data);
		
		if(p1new)
			$('#player1').animate({top: topvar + "px"}, 1000);
		if (p2new)
			$('#player2').animate({top: topvar + "px"}, 1000);
	}

	function setText(data) {
		$('#p1tag').text(data.p1Tag);
		$('#p1score').text(data.p1Score);
		$('#p2tag').text(data.p2Tag);
		$('#p2score').text(data.p2Score);

		if(data.p1Char) {
			$('#p1char').attr('class', 'head heads ' + data.p1Char);
		}
		if(data.p2Char) {
			$('#p2char').attr('class', 'head heads ' + data.p2Char);
		}
		if(data.p1Flag) {
			$('#p1flag').attr('class', 'flag flag-' + data.p1Flag.toLowerCase());
		}
		if(data.p2Flag) {
			$('#p2flag').attr('class', 'flag flag-' + data.p2Flag.toLowerCase());
		}
		
	}

	var bgInfo = nodecg.Replicant('bgInfo', 'ssbm-bg-helper');

	bgInfo.on('change', function(oldValue, newValue) {
		if(oldValue) {
			if(oldValue.image && newValue.image) return;
			else if (newValue.image) {
				$('.player').css('background', 'none');
				$('.player').css('background-image', 'url("img/players.png")');
			} else {
				$('.player').css('background-image', 'none');
				$('.player').css('background', '#' + newValue.color);
				$('.player').css('border-radius', newValue.corner + 'px')
			}
		}
	});
    
    function updateLayout(data) {
        if (data.game == '64') { //SMASH 64
            $('.player').css({
                width: '328px',
                height: '32px',
                top: '12px',
                'font-size': '20px'
            });
            topvar = 12;
            $('#player1').css({'left':'16px'});
            $('#player2').css({'left':'616px'});
            $('.tag').css({'flex-basis':'288px'});
            $('.scoreBox').css({
                width: '28px',
                height: '28px'
            });
            $('.score').css({
                width: '28px',
                'line-height': '28px',
                'font-size': '24px'
            });
            $('.playercontainer').css({
                'width': '328px',
                'height': '32px'
            });
        }
        if (data.game == 'melee') { //MELEE
            $('.player').css({
                width: '328px',
                height: '32px',
                top: '8px',
                'font-size': '20px'
            });
            topvar = 8;
            $('#player1').css({'left':'16px'});
            $('#player2').css({'left':'528px'});
            $('.tag').css({'flex-basis':'288px'});
            $('.scoreBox').css({
                width: '28px',
                height: '28px'
                });
            $('.score').css({
                width: '28px',
                'line-height': '28px',
                'font-size': '24px'
            });
            $('.playercontainer').css({
                'width': '328px',
                'height': '32px'
            });
        }
        if (data.game == 'pm') { //PROJECT M/BRAWL
            $('.player').css({
                width: '328px',
                height: '32px',
                top: '16px',
                'font-size': '20px'
            });
            topvar = 16;
            $('#player1').css({'left':'16px'});
            $('#player2').css({'left':'568px'});
            $('.tag').css({'flex-basis':'288px'});
            $('.scoreBox').css({
                width: '28px',
                height: '28px'
                });
            $('.score').css({
                width: '28px',
                'line-height': '28px',
                'font-size': '24px'
            });
            $('.playercontainer').css({
                'width': '328px',
                'height': '32px'
            });
        }
        if (data.game == 'wiiu') { //SMASH FOR WII U
            $('.player').css({
                width: '232px',
                height: '24px',
                top: '32px',
                'font-size': '15px'
            });
            topvar = 32;
            $('#player1').css({'left':'256px'});
            $('#player2').css({'left':'736px'});
            $('.tag').css({'flex-basis':'232px'});
            $('.scoreBox').css({
                width: '20px',
                height: '20px'       
            });
            $('.score').css({
                width: '20px',
                'line-height': '20px',
                'font-size': '16px'
            });
            $('.playercontainer').css({
                'width':'232px',
                'height': '24px'
            });
        }
        
    }
});