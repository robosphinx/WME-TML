// ==UserScript==
// @name         Too Many Layers
// @version      2024.09.09.001
// @description  Allows a longer list of layers in the map layers menu.
// @author       robosphinx_, callumhume
// @match        *://*.waze.com/*editor*
// @exclude      *://*.waze.com/user/editor*
// @require      https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// @grant        none
// @license      GPLv3
// @namespace [Greasyfork!]
// ==/UserScript==
 
/* global W */
/* global WazeWrap */
 
(function main() {
    'use strict';
 
    const SCRIPT_NAME = GM_info.script.name;
    const SCRIPT_VERSION = GM_info.script.version;
 
    function fancyLogMessage(tag, message) {
        console.error("WME-TML: " + tag + ": " + message);
    }
 
    function embiggenTheList() {
        // Heirarchy follows
        // ID layer-switcher-region
        // class layer-switcher
        // class menu
        // class scrollable
        // class list-unstyled togglers
        // class group
        // class collapsible-GROUP_DISPLAY
        fancyLogMessage("INFO", "Looking for display layer group...");
        let displayGroup = document.querySelector('.collapsible-GROUP_DISPLAY'); // Grab element by class name, not ID
        fancyLogMessage("INFO", "Found display layer group: " + displayGroup);
        displayGroup.style.setProperty('max-height', 'fit-content');
    };
 
 
    function init() {
        fancyLogMessage("INFO", SCRIPT_NAME + " " + SCRIPT_VERSION + " started");
        embiggenTheList();
        fancyLogMessage("INFO", SCRIPT_NAME + " initialized!");
    }
 
    function onWmeReady() {
        if (WazeWrap && WazeWrap.Ready) {
            init();
        } else {
            setTimeout(onWmeReady, 100);
        }
    }
 
    function bootstrap() {
        if (typeof W === 'object' && W.userscripts?.state.isReady) {
            onWmeReady();
        } else {
            document.addEventListener('wme-ready', onWmeReady, { once: true });
        }
    }
 
    bootstrap();
})();
