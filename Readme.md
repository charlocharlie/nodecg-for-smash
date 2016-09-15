# NodeCG for Smash

## Significant changes in this fork

###Streaming changes

* **Supports all games** (64, Melee, Brawl, PM, Wii U). This bundle no longer only supports one game, but has the capabilities to dynamically change
    assets and layouts quickly and easily during the stream. This includes character stock icons.
* **Overlay redesign.** The overlay no longer uses background images. Instead it uses DIVs and styling based on Google's Material Design standards.
    Bracket display now appears with a Challonge-esque styling and can be shown and hidden for placement on top of a webcam scene. 
* **Costumes.** Stock icons now have the ability to select a specific costume for any character in any game 
    (even Little Mac's 16 costumes). There are 975 costumes available in total over each game.
* **Player info database.** When you click the **UPDATE** button on the dashboard, all the players' info 
    (sponsor, tag, character, costume, country) is added or updated to a game-specific database. Changing the active game changes which database is read from.
* **W/L Token.** Easily tell your viewers whether a player is on winners or losers side of grand finals without modifying the player's tag and creating a new database entry.
* **Dashboard redesign.** Dashboard components now feature a new Material standard indigo color and paper-card
    components. There is also a **CLEAR ALL** button to clear all player fields.
* **Playercam rework** The Playercam graphic now has a mic icon and can be used either as a player label or commentator label. 
    The dashboard component features a _left_ and _right_ field for the graphic.
* **Doubles completely reworked.** There are no longer four boxes on stream for each player. Instead, a team is put into one box together
    separated by an ampersand and can be swapped between teammates or between whole teams. On the dashboard, teams are laid out vertically; 
    P1 with P3 versus P2 with P4. These are **NOT** the in-game player ports.
    Each player can have a stock icon with costume and sponsor icon displayed on the overlay now.
    The team colors feature is completely removed. 
* **New default font.** The stream-side font I chose was Franklin Gothic Cond Demi and Franklin Gothic Cond Medium. These are included in the repository.
* **State outlines.** Added US state outlines to country flag icon list. Easier to identify than state flags.
* **Crew roster update.** Added multi-game support, character icons for each player, and new styling changes. Roster graphic now only displays populated player fields. Empty fields will be hidden.
    
###Development changes
    
* **Toggle teams mode.** The teams toggle is now a nodecg-toggle replicant object whose value is referenced throughout the code. This persists through program shutdown.
* **Smash game switcher.** This panel manages which game is currently active. This paper-menu is directly linked with a replicant and will persist through program shutdown.
* **JavaScript code styling standards.** Most of the code I have touched has been run through JSCS using a Crockford-esque ruleset. 
    The .jscsrc file manages the rules for this project.
* **Animation efficiency updated.** The sluggish jQuery animations have been replaced with a GSAP jQuery animation hijacker. The code is identical but performance is 20x better.
    Most animations using `left` and `top` have been replaced with the much better performing `transform: translate()` funcitons.
* **Dialog windows updated.** I was personally confused by the **UPDATE** and **DONE** buttons on the dialog boxes,
    so I changed it to **UPDATE** and **CANCEL**.
* **bg-helper code completely removed.** It wasn't doing anything.
* **Costume selection GUI.** It was challenging to find a dropdown selection that supported images. I decided on the third party
    FancySelect selector. I'm not sure I like it, but it seems to work (as well as throw a lot of errors).
* **Errors thrown on costume selection.** Essentially, it loops through a character's costume until it throws a 404. 
    I'm not sure of a way around this, so for now, the console fills up with intentional 404's.
* **Updated iron-flex-layout.** It was giving a bunch of warnings for deprecated code, so I updated it so only a couple of
    warnings show up.
* **Must click UPDATE to load database.** Can't seem to find a way around this. Just click **UPDATE** after you load the dashboard and everything should be fine after that.

# Readme

Bundles for use with [NodeCG](http://nodecg.com/) in Super Smash Bros. 64, Melee, Brawl, Wii U, and Project M streams. **Compatible only with OBS Studio with [Browser Source plugin v1.23 or later](https://github.com/kc5nra/obs-browser/releases).** Recommended that you use the dashboard in Chrome because web-components takes a long time to load in other browsers.

## How to use

1. Install [git](https://git-scm.com/). Make sure to select 'Use Git from the Windows Command Prompt' if you're on Windows.
2. Install NodeCG as shown in the instructions on the [NodeCG website.](http://nodecg.com/) If it tells you `bower` is not recognized, type in `npm install -g bower`.
3. From this point on, all commands should be in the regular command line, not Node.js. Exit Node.js by hitting ctrl-C twice if you're in Node.js.
4. Install nodecg-cli as shown [here.](https://github.com/nodecg/nodecg-cli)
5. In the command line in the folder you installed NodeCG, enter `nodecg install mparkms/nodecg-for-smash`
6. Start NodeCG by entering `nodecg start` into command prompt in the folder where NodeCG is installed and go to `localhost:9090` in your browser.
7. Install [OBS Studio Browser Source](https://github.com/kc5nra/obs-browser/releases) if your OBS Studio doesn't already have it pre-installed.
8. If you want to use the Bracket panel's Challonge integration, obtain your [Challonge API Key](https://challonge.com/settings/developer), copy the `nodecg-for-smash.json` file to `nodecg/cfg/` and add your API Key to the `challongeKey` field.
Inside this config file are various variables you can modify so the components fit to your layout better for each game.

[Installation instruction video - if you're confused about any of the above I suggest watching this.](https://youtu.be/MweCH70GGY4)

[Having problems with installation? Check here.](https://github.com/mparkms/nodecg-for-smash/wiki/Troubleshooting-installation) If that doesn't help, post an issue here or tweet at me @kaabistar

## Use with OBS Studio
You will have to create your own scene, and manually set the required URLs for browser import elements. The URLs can be found by going into the graphics page in the dashboard using the top-left menu.

Also, elements can sometimes display scroll bars in OBS MP when rendered. To fix this behaviour enter the following in the CSS box for each element you setup in OBS MP:

    body {
        overflow: hidden;
    }

## Overview of included dashboard panels

### Players & Score

Player tag, sponsor, scores, characters, character costume, countries, and a W/L token for grand finals.
 
Can toggle between 2 player and 4 player mode for doubles. Each player in doubles can each get a character and sponsor icon. Flags are disabled for space reasons. The score and W/L fields are moved to the top above each team. 

Can also swap players. When in doubles mode, click the **SWAP** button on top to swap the player order within a team, and click the **SWAP TEAMS** button on the bottom to swap teams themselves. 

Supports sponsor icons. Upload in the dashboard in the upload page, then click **Manage Sponsor Icons** in the players panel to assign proper names to each icon.

Associated graphic: players.html

### Top Info, Playercam, Lower Third

Text for top info panels, playercam, and lower third. You can also send a message to display in the top info area for a short period of time. Playercam is setup by default as a commentator label, but you can remove the microphone icons and use it as a player label very easily.

Associated graphics: top-info.html, playercam.html, lower-third.html

### Bracket

Top 8 bracket display to show on stream. Can pull the bracket from Challonge and/or the streamer can manually update the bracket. Make sure you've put in your Challonge API key into `nodecg/cfg/nodecg-for-smash.json` if you want to use that feature.

Associated graphics: bracket.html

### Crew Battle Rosters

Crew battle roster showing stocks remaining and who is knocked out. Supports up to 10 players per team.

Associated graphics: crew-roster.html

### Smash Game Switcher

A simple panel to switch various variables that need to change when streaming a different version of Smash. Changes things such as:
* Layout of the graphics on stream (for different game aspect ratios)
* Player name database (each game has an independent database for each game)
* Character Icons

## Images

The `/images` directory contains images you can use on your stream.

## Credits

* [NodeCG](http://nodecg.com/)
* [Node Challonge](https://github.com/Tidwell/node-challonge)
* [Fancy Select](https://github.com/lorenzos/FancySelect)
