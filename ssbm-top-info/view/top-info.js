'use strict';

$(function () {
	nodecg.listenFor('ssbmTopUpdate', updatePanels);
	nodecg.listenFor('ssbmTopMessage', showMessage);

	function updatePanels(data) {
		if(data.anim) {
			updatePanelsAnim(data);
		}
		else {
			updateText(data);
		}
	}

	function updatePanelsAnim(data) {
		$('.panel').animate({top: "-125%"}, {duration: 500, complete: function () { updateText(data); }});
		$('.panel').animate({top: "0%"}, {duration: 1000});
	}

	function updateText(data) {
		$('#panel1').text(data.panel1text);
		$('#panel2').text(data.panel2text);
	}

	function showMessage(data) {
		$('#panel1').animate({left: "-240px"}, {duration: 1000});
		$('#panel2').animate({left: "872"}, {duration: 1000});
		$('#message').animate({left: "8px", width: "856px"}, {duration: 1000});
		setTimeout(function() {
			$('#message-text').text(data);
			$('#message-text').fadeIn(500);
		}, 500);
		setTimeout(hideMessage, 10000);
	}

	function hideMessage(data) {
		$('#message-text').fadeOut(500);
		$('#message').animate({left: "436px", width: "0"}, {duration: 1000});
		$('#panel1').animate({left: "104px"}, {duration: 1000});
		$('#panel2').animate({left: "528px"}, {duration: 1000});
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
})