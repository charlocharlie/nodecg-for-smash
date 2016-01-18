'use strict';
var topvar = 16; //For animation on a game by game basis in this js file.
var leftMessage = 8;
var leftInfo = 104;
var infoSpacing = 184;

$(function () {
	nodecg.listenFor('ssbmTopUpdate', updatePanels);
	nodecg.listenFor('ssbmTopMessage', showMessage);
    nodecg.listenFor('smashLayoutUpdate', 'smash-game-switcher', updateLayout);

	function updatePanels(data) {
		if (data.anim) {
			updatePanelsAnim(data);
		}
		else {
			updateText(data);
		}
	}

	function updatePanelsAnim(data) {
		$('.panel').animate({top: -40 - 8 + "px"}, {duration: 500, complete: function () { updateText(data); }});
		$('.panel').animate({top: topvar + "px"}, {duration: 1000});
	}

	function updateText(data) {
		$('#panel1').text(data.panel1text);
		$('#panel2').text(data.panel2text);
	}

	function showMessage(data) {
		$('#panel1').animate({left: leftMessage - 240 - 8 + "px"}, {duration: 1000});
		$('#panel2').animate({left: leftMessage + 2 * (leftInfo - leftMessage) + infoSpacing + 480 + 8 + "px"}, {duration: 1000});
		$('#message').animate({left: leftMessage + "px", width: 2 * (leftInfo - leftMessage) + infoSpacing + 480 + "px"}, {duration: 1000});
		setTimeout(function() {
			$('#message-text').text(data);
			$('#message-text').fadeIn(500);
		}, 500);
		setTimeout(hideMessage, 10000);
	}

	function hideMessage(data) {
		$('#message-text').fadeOut(500);
		$('#message').animate({left: leftInfo + 240 + (infoSpacing/2) + "px", width: "0"}, {duration: 1000});
		$('#panel1').animate({left: leftInfo + "px"}, {duration: 1000});
		$('#panel2').animate({left: leftInfo + 240 + infoSpacing + "px"}, {duration: 1000});
	}

	var bgInfo = nodecg.Replicant('bgInfo', 'ssbm-bg-helper');

	bgInfo.on('change', function(oldValue, newValue) {
		if(oldValue) {
			if(oldValue.image && newValue.image) return;
			else if (newValue.image) {
				$('.panel').css('background', 'none');
				$('.panel').css('background-image', 'url("img/top info.png")');
			} else {
				$('.panel').css('background-image', 'none');
				$('.panel').css('background', '#' + newValue.color);
				$('.panel').css('border-radius', newValue.corner + 'px')
			}
		}
	});
    
    function updateLayout(data) {
        if (data.game == '64') { //SMASH 64
            topvar = 16;
            leftMessage = 8;
            leftInfo = 128;
            infoSpacing = 224;
            $('.panel').css({top: topvar + "px"});
            $('#panel1').css({left: leftInfo + "px"});
            $('#panel2').css({left: leftInfo + 240 + infoSpacing + "px"});
            $('#message').css({left: leftInfo + 240 + (infoSpacing/2) + "px", top: topvar + "px"});
        }
        if (data.game == 'melee') { //MELEE
            topvar = 16;
            leftMessage = 8;
            leftInfo = 104;
            infoSpacing = 184;
            $('.panel').css({top: topvar + "px"});
            $('#panel1').css({left: leftInfo + "px"});
            $('#panel2').css({left: leftInfo + 240 + infoSpacing + "px"});
            $('#message').css({left: leftInfo + 240 + (infoSpacing/2) + "px", top: topvar + "px"});
        }
        if (data.game == 'pm') { //PROJECT M/BRAWL
            topvar = 16;
            leftMessage = 0;
            leftInfo = 104;
            infoSpacing = 224;
            $('.panel').css({top: topvar + "px"});
            $('#panel1').css({left: leftInfo + "px"});
            $('#panel2').css({left: leftInfo + 240 + infoSpacing + "px"});
            $('#message').css({left: leftInfo + 240 + (infoSpacing/2) + "px", top: topvar + "px"});
        }
        if (data.game == 'wiiu') { //SMASH FOR WII U
            topvar = 8;
            leftMessage = 0;
            leftInfo = 264;
            infoSpacing = 272;
            $('.panel').css({top: topvar + "px"});
            $('#panel1').css({left: leftInfo + "px"});
            $('#panel2').css({left: leftInfo + 240 + infoSpacing + "px"});
            $('#message').css({left: leftInfo + 240 + (infoSpacing/2) + "px", top: topvar + "px"});
        }
        
    }
})