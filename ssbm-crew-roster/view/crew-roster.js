'use strict';
var halfWidth = 436;
var leftEdge = 161;
var border = 8;
$(function() {
	nodecg.listenFor('ssbmCrewUpdate', updateRosters);
	nodecg.listenFor('ssbmCrewHide', hideRosters);
    nodecg.listenFor('smashLayoutUpdate', 'smash-game-switcher', updateLayout);

	function updateRosters(data) {
		var rosterSize = 10;
		for (var i = 0; i < rosterSize; i++) {
			$('#rosterleft > div:nth-child(' + (i + 1) + ') > #rosternameleft').text(data.roster1[i]);
			$('#rosterright > div:nth-child(' + (i + 1) + ') > #rosternameright').text(data.roster2[i]);
            $('#rosterleft > div:nth-child(' + (i + 1) + ') > #leftchar').attr('class', 'heads ' + data.chars1[i]);
			$('#rosterright > div:nth-child(' + (i + 1) + ') > #rightchar').attr('class', 'heads ' + data.chars2[i]);
			if(data.kos1[i]) {
				$('#rosterleft > div:nth-child(' + (i + 1) + ')').css({
					'color': '#888',
					'background-color': '#ddd',
					'text-decoration': 'line-through'
				});
			} else {
				$('#rosterleft > div:nth-child(' + (i + 1) + ')').css({
					'color': '#000',
					'background-color': '#eee',
					'text-decoration': 'none'
				}); 
			}
			if(data.kos2[i]) {
				$('#rosterright > div:nth-child(' + (i + 1) + ')').css({
					'color': '#888',
					'background-color': '#ddd',
					'text-decoration': 'line-through'
				}); 
			} else {
				$('#rosterright > div:nth-child(' + (i + 1) + ')').css({
					'color': '#000',
					'background-color': '#eee',
					'text-decoration': 'none'
				}); 
			}
		}

		$('#crewnameleft').text(data.teamNamesStock.team1name);
		$('#crewstockleft').text(data.teamNamesStock.team1stock);
		$('#crewnameright').text(data.teamNamesStock.team2name);
		$('#crewstockright').text(data.teamNamesStock.team2stock);

		showRosters();
	}

	function showRosters() {
		var delay = 50;
		var rosterSize = 10;
		$('#rosterheaderleft').animate({left: '0%'}, 500);
		$('#rosterheaderright').animate({left: '0%'}, 500);
		for (var i = 1; i <= rosterSize; i++) {
			$('#rosterleft > div:nth-child(' + i + ')')
				.delay(delay * i)
				.queue(function(nxt) { 
					$(this).animate({left: '0%'}, 500);
					nxt();
				});
			$('#rosterright > div:nth-child(' + i + ')')
				.delay(delay * i)
				.queue(function(nxt) { 
					$(this).animate({left: '0%'}, 500);
					nxt();
				});
		}
		//$('#rosterleft').animate({left: "0%"}, 500);
		//$('#rosterright').animate({left: "0%"}, 500);
	}

	function hideRosters(data) {
		var delay = 50;
		var rosterSize = 10;
		$('#rosterheaderleft').animate({left: -leftEdge - 275 - 8 + border + "px"}, 500);
		$('#rosterheaderright').animate({left: halfWidth + 8 + "px"}, 500);
		for (var i = 1; i <= rosterSize; i++) {
			$('#rosterleft > div:nth-child(' + i + ')')
				.delay(delay * i)
				.queue(function(nxt) { 
					$(this).animate({left: -leftEdge - 275 - 8 + border + "px"}, 500);
					nxt();
				});
			$('#rosterright > div:nth-child(' + i + ')')
				.delay(delay * i)
				.queue(function(nxt) { 
					$(this).animate({left: halfWidth + 8 + "px"}, 500);
					nxt();
				});
		}
		//$('#rosterleft').animate({left: "-275px"}, 500);
		//$('#rosterright').animate({left: "275px"}, 500);
	}
    function updateLayout(data) {
        if (data.game == '64') { //SMASH 64
            halfWidth = 472;
            border = 8;
            leftEdge = 205;
            $('#rosterheadercontainer').css({left: leftEdge + "px"});
            $('#rosterheaderleft').css({left: -leftEdge - 275 - 8 + border + "px"});
            $('#rosterheaderright').css({left: halfWidth + 8 + "px"});
            $('#rosterleft').css({left: leftEdge + "px"});
            $('#rosterright').css({left: leftEdge + "px"});
            $('#rosterleft .rosterentry').css({left: -leftEdge - 275 - 8 + border + "px"});
            $('#rosterright .rosterentry').css({left: halfWidth + 8 + "px"});
        }
        if (data.game == 'melee') { //MELEE
            halfWidth = 448;
            border = 8;
            leftEdge = 161;
            $('#rosterheadercontainer').css({left: leftEdge + "px"});
            $('#rosterheaderleft').css({left: -leftEdge - 275 - 8 + border + "px"});
            $('#rosterheaderright').css({left: halfWidth + 8 + "px"});
            $('#rosterleft').css({left: leftEdge + "px"});
            $('#rosterright').css({left: leftEdge + "px"});
            $('#rosterleft .rosterentry').css({left: -leftEdge - 275 - 8 + border + "px"});
            $('#rosterright .rosterentry').css({left: halfWidth + 8 + "px"});
        }
        if (data.game == 'pm') { //PROJECT M/BRAWL
            halfWidth = 456;
            border = 0;
            leftEdge = 181;
            $('#rosterheadercontainer').css({left: leftEdge + "px"});
            $('#rosterheaderleft').css({left: -leftEdge - 275 - 8 + border + "px"});
            $('#rosterheaderright').css({left: halfWidth + 8 + "px"});
            $('#rosterleft').css({left: leftEdge + "px"});
            $('#rosterright').css({left: leftEdge + "px"});
            $('#rosterleft .rosterentry').css({left: -leftEdge - 275 - 8 + border + "px"});
            $('#rosterright .rosterentry').css({left: halfWidth + 8 + "px"});
        }
        if (data.game == 'wiiu') { //SMASH FOR WII U
            halfWidth = 640;
            border = 0;
            leftEdge = 365;
            $('#rosterheadercontainer').css({left: leftEdge + "px"});
            $('#rosterheaderleft').css({left: -leftEdge - 275 - 8 + border + "px"});
            $('#rosterheaderright').css({left: halfWidth + 8 + "px"});
            $('#rosterleft').css({left: leftEdge + "px"});
            $('#rosterright').css({left: leftEdge + "px"});
            $('#rosterleft .rosterentry').css({left: -leftEdge - 275 - 8 + border + "px"});
            $('#rosterright .rosterentry').css({left: halfWidth + 8 + "px"});
        }
        
    }
});