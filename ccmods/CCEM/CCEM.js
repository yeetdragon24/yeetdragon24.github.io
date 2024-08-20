(function() {
	const EM = {};
	
	EM.init = function() {
		EM.prefs = {
			saveToGame: 0,
			fpsFix: 0,
		}
		
		EM.customAchievements = {};
		EM.customUpgrades = {};
		EM.customBuffs = {};
		
		
		EM.updateBuffMenu = function() {
			let choiceList = '';
			let choices = ['Lucky!'];
			for (let buff of Game.buffTypes) {
				if (buff.name != 'building buff' && buff.name != 'building debuff') {
					choices.push(buff.func().name);
				}
			}
			for (let i in Game.goldenCookieBuildingBuffs) choices = choices.concat(Game.goldenCookieBuildingBuffs[i]);
			for (let name of choices) {
				let search = l('buffChoiceInput').value.toLowerCase() || '';
				let display = name.toLowerCase().indexOf(search) > -1;
				let selected = EM.selectedBuff == name;
				choiceList += `<div id="${name}Option" style="${!display ? 'display:none;' : ''}${selected ? 'background-color:#888' : ''}"><a ${Game.clickStr}="EM.selectedBuff=this.innerHTML; EM.updateBuffMenu();l('setNewBuffName').value=EM.selectedBuff;l('setNewBuffName').focus();">${name}</a></div>`;
			}
			l('buffList').innerHTML = choiceList;
			
			l('selectedBuff').textContent = EM.selectedBuff || 'None';
			l('currentSelectedBuffName').textContent = locStrings[EM.selectedBuff] || 'None';
		}
		EM.setCustomBuffName = function() {
			Game.Prompt(`<id CustomBuffName><h3>Set buff name</h3><div class="block" style="width:90%;margin:auto;height:120px;overflow:scroll">Pick buff:<br><input type="text" id="buffChoiceInput" style="width:50%;margin:auto;text-align:center"><div id="buffList"></div></div><div class="block" style="width:90%;margin:auto;">Selected buff:<div id="selectedBuff"></div><div class="line"></div>Current name:<br><div id="currentSelectedBuffName"></div><div class="line"></div>Set new name:<br><input type="text" id="setNewBuffName" style="width:80%;margin:auto;text-align:center"></div>`,
			[['Ok','if (EM.selectedBuff) EM.customBuffs[EM.selectedBuff] = (locStrings[EM.selectedBuff] = l(\'setNewBuffName\').value); EM.updateBuffMenu();'],'Close']);
			EM.selectedBuff = undefined;
			AddEvent(l('buffChoiceInput'), 'keyup', EM.updateBuffMenu);
			EM.updateBuffMenu();
		}
		
		EM.updateUpgradeMenu = function() {
			let choiceList = '';
			let choices = [];
			for (let i in Game.Upgrades) {
				choices.push(i);
			}
			for (let name of choices) {
				let search = l('upgradeChoiceInput').value.toLowerCase() || '';
				let display = name.toLowerCase().indexOf(search) > -1;
				let selected = EM.selectedUpgrade == name;
				if (display) choiceList += `<div id="${name}Option" style="${selected ? 'background-color:#888' : ''}"><a ${Game.clickStr}="EM.selectedUpgrade=this.innerHTML; EM.updateUpgradeMenu();l('setNewUpgradeName').value=EM.selectedUpgrade;l('setNewUpgradeName').focus();">${name}</a></div>`;
			}
			l('upgradeList').innerHTML = choiceList;
			
			l('selectedUpgrade').textContent = EM.selectedUpgrade || 'None';
			l('currentSelectedUpgradeName').textContent = EM.selectedUpgrade ? (locStrings[`[Upgrade name ${Game.Upgrades[EM.selectedUpgrade].id}]${EM.selectedUpgrade}`] || 'None') : 'None';
		}
		EM.setCustomUpgradeName = function() {
			Game.Prompt(`<id CustomUpgradeName><h3>Set upgrade name</h3><div class="block" style="width:90%;margin:auto;height:120px;overflow:scroll">Pick upgrade:<br><input type="text" id="upgradeChoiceInput" style="width:50%;margin:auto;text-align:center"><div id="upgradeList"></div></div><div class="block" style="width:90%;margin:auto;">Selected upgrade:<div id="selectedUpgrade"></div><div class="line"></div>Current name:<br><div id="currentSelectedUpgradeName"></div><div class="line"></div>Set new name:<br><input type="text" id="setNewUpgradeName" style="width:80%;margin:auto;text-align:center"></div>`,
			[['Ok','if (EM.selectedUpgrade) EM.customUpgrades[EM.selectedUpgrade] = (locStrings[\'[Upgrade name \'+Game.Upgrades[EM.selectedUpgrade].id+\']\'+EM.selectedUpgrade] = l(\'setNewUpgradeName\').value); EM.updateUpgradeMenu(); LocalizeUpgradesAndAchievs();'],'Close']);
			EM.selectedUpgrade = undefined;
			AddEvent(l('upgradeChoiceInput'), 'keyup', EM.updateUpgradeMenu);
			EM.updateUpgradeMenu();
		}
		
		EM.updateAchievementMenu = function() {
			let choiceList = '';
			let choices = [];
			for (let i in Game.Achievements) {
				//i can't make it work so it's not going in
				if (i != `Brought to you by the letter <div style="display:inline-block;background:url(img/money.png);width:16px;height:16px;"></div>`) {
					choices.push(i);
				}
			}
			for (let name of choices) {
				let search = l('achievementChoiceInput').value.toLowerCase() || '';
				let display = name.toLowerCase().indexOf(search) > -1;
				let selected = EM.selectedAchievement == name;
				if (display) choiceList += `<div id="${name}Option" style="${selected ? 'background-color:#888' : ''}"><a ${Game.clickStr}="EM.selectedAchievement=this.innerHTML; EM.updateAchievementMenu();l('setNewAchievementName').value=EM.selectedAchievement;l('setNewAchievementName').focus();">${name}</a></div>`;
			}
			l('achievementList').innerHTML = choiceList;
			
			l('selectedAchievement').textContent = EM.selectedAchievement || 'None';
			l('currentSelectedAchievementName').textContent = EM.selectedAchievement ? (locStrings[`[Achievement name ${Game.Achievements[EM.selectedAchievement].id}]${EM.selectedAchievement}`] || 'None') : 'None';
		}
		EM.setCustomAchievementName = function() {
			Game.Prompt(`<id CustomAchievementName><h3>Set achievement name</h3><div class="block" style="width:90%;margin:auto;height:120px;overflow:scroll">Pick achievement:<br><input type="text" id="achievementChoiceInput" style="width:50%;margin:auto;text-align:center"><div id="achievementList"></div></div><div class="block" style="width:90%;margin:auto;">Selected achievement:<div id="selectedAchievement"></div><div class="line"></div>Current name:<br><div id="currentSelectedAchievementName"></div><div class="line"></div>Set new name:<br><input type="text" id="setNewAchievementName" style="width:80%;margin:auto;text-align:center"></div>`,
			[['Ok','if (EM.selectedAchievement) EM.customAchievements[EM.selectedAchievement] = (locStrings[\'[Achievement name \'+Game.Achievements[EM.selectedAchievement].id+\']\'+EM.selectedAchievement] = l(\'setNewAchievementName\').value); EM.updateAchievementMenu(); LocalizeUpgradesAndAchievs();'],'Close']);
			EM.selectedAchievement = undefined;
			AddEvent(l('achievementChoiceInput'), 'keyup', EM.updateAchievementMenu);
			EM.updateAchievementMenu();
		}
		
		EM.updateBuildingMenu = function() {
			let choiceList = '';
			let choices = [];
			for (let i in Game.Objects) {
				//i can't make it work so it's not going in
				choices.push(i);
			}
			for (let name of choices) {
				let search = l('buildingChoiceInput').value.toLowerCase() || '';
				let display = name.toLowerCase().indexOf(search) > -1;
				let selected = EM.selectedBuilding == name;
				if (display) choiceList += `<div id="${name}Option" style="${selected ? 'background-color:#888' : ''}"><a ${Game.clickStr}="EM.selectedBuilding=this.innerHTML; EM.updateBuildingMenu();l('setNewBuildingName').value=EM.selectedBuilding;l('setNewBuildingName').focus();">${name}</a></div>`;
			}
			l('buildingList').innerHTML = choiceList;
			
			l('selectedBuilding').textContent = EM.selectedBuilding || 'None';
			l('currentSelectedBuildingName').textContent = EM.selectedBuilding ? (locStrings[EM.selectedBuilding] || 'None') : 'None';
		}
		EM.setCustomBuildingName = function() {
			Game.Prompt(`<id CustomBuildingName><h3>Set building name</h3><div class="block" style="width:90%;margin:auto;height:120px;overflow:scroll">Pick building:<br><input type="text" id="buildingChoiceInput" style="width:50%;margin:auto;text-align:center"><div id="buildingList"></div></div><div class="block" style="width:90%;margin:auto;">Selected building:<div id="selectedBuilding"></div><div class="line"></div>Current name:<br><div id="currentSelectedBuildingName"></div><div class="line"></div>Set new name:<br><input type="text" id="setNewBuildingName" style="width:80%;margin:auto;text-align:center"></div>`,
			[['Ok','if (EM.selectedBuilding) locStrings[EM.selectedBuilding] = l(\'setNewBuildingName\').value; EM.updateBuildingMenu(); Game.BuildStore();'],'Close']);
			EM.selectedBuilding = undefined;
			AddEvent(l('buildingChoiceInput'), 'keyup', EM.updateBuildingMenu);
			EM.updateBuildingMenu();
		}
		
		eval(`Game.Loop = ${Game.Loop.toString().replace(`setTimeout(`,`if (!EM.prefs.fpsFix) setTimeout(`).replace(`Timer.track('browser stuff');`,`Timer.track('browser stuff');\n\t\tif (EM.prefs.fpsFix) setTimeout(Game.Loop,1000/Game.fps);`)}`);
		
		EM.getMenuString = function() {
			let str = `
					  <div class="listing">
					  ${CCSE.MenuHelper.ActionButton('EM.exportSave();','Export settings')}
					  ${CCSE.MenuHelper.ActionButton('EM.importSave();','Import settings')}<br>
					  ${CCSE.MenuHelper.ToggleButton(EM.prefs,'saveToGame','CCEMPref0', 'Save to game ON', 'Save to game OFF', '(function() {  EM.prefs.saveToGame ^= true; Game.UpdateMenu(); })', false)}<label><span class="warning">Warning: </span>your Cookie Clicker Essentials settings can be quite long, inflating the size of your game's save file.</label>
					  </div><div class="line"></div>
					  <div class="listing">
					  ${CCSE.MenuHelper.ActionButton('EM.setCustomBuffName();', 'Customize buff names')}<br>
					  ${CCSE.MenuHelper.ActionButton('EM.setCustomUpgradeName();', 'Customize upgrade names')}<br>
					  ${CCSE.MenuHelper.ActionButton('EM.setCustomAchievementName();', 'Customize achievement names')}<br>
					  ${true ? '' : CCSE.MenuHelper.ActionButton('EM.setCustomBuildingName();', 'Customize building names')}<br>
					  </div><div class="line"></div>
					  <div class="listing">
					  ${CCSE.MenuHelper.ToggleButton(EM.prefs, 'fpsFix', 'CCEMPref1', 'FPS fix ON', 'FPS fix OFF', '(function(prefName) { EM.prefs.fpsFix ^= true; Game.UpdateMenu(); })', false)}<label>Makes the game run much closer to target FPS with minimal adjustments</label><br>
					  </div><div class="line"></div>
					  <div class="listing">
					  ${CCSE.MenuHelper.ActionButton('LoadScript(\'https://hellopir2.github.io/cc-mods/buffTimer.js\')', 'Load buff tooltip fix')}<label>Makes buff timers correctly reflect the buff time (by Helloperson)</label><br>
					  ${CCSE.MenuHelper.ActionButton('LoadScript(\'https://glander.club/asjs/fchvyhs3\')', 'Load FPSTweaker')}<label>Changes the length of a frame to compensate for any latency during the previous frame (by CursedSliver)</label>
					  </div>`;
			return str;
		}
		Game.customOptionsMenu.push(function() {
			CCSE.AppendCollapsibleOptionsMenu('Cookie Clicker Essentials', EM.getMenuString());
		});
		
		EM.writeSave = function(b64) {
			let str = '[';
			str += JSON.stringify(EM.customBuffs) + ',';
			str += JSON.stringify(EM.customUpgrades) + ',';
			str += JSON.stringify(EM.customAchievements) + ',';
			str += '[';
			str += (function() {
				let list = [];
				for (let i in EM.prefs) list.push(EM.prefs[i]);
				return list.join(',');
			})();
			str += ']';
			str += ']';
			return b64 ? btoa(str) : str;
		}
		EM.loadSave = function(str, b64) {
			let save = JSON.parse(b64 ? atob(str) : str);
			if (!save) return false;
			EM.customBuffs = save[0];
			EM.customUpgrades = save[1];
			EM.customAchievements = save[2];
			for (let i in Object.keys(EM.prefs)) {
				EM.prefs[Object.keys(EM.prefs)[i]] = save[3][i];
			}
			for (let i in EM.customBuffs) {
			locStrings[i] = EM.customBuffs[i];
			}
			for (let i in EM.customUpgrades) {
				locStrings[`[Upgrade name ${Game.Upgrades[i].id}]${i}`] = EM.customUpgrades[i];
			}
			for (let i in EM.customAchievements) {
				locStrings[`[Achievement name ${Game.Achievements[i].id}]${i}`] = EM.customAchievements[i];
			}
		}
		EM.exportSave = function() {
			Game.Prompt('<id CCEMExportSave><h3>Export settings</h3><div class="block">This is your CCEM settings.<br>Copy it and keep it somewhere safe, or be forced to reconfigure everything.</div><div class="block"><textarea id="textareaPrompt" style="width:100%;height:128px;" readonly>'+EM.writeSave(true)+'</textarea></div>',[loc("Done")]);
			l('textareaPrompt').focus();l('textareaPrompt').select();
		}
		EM.importSave = function(def) {
			Game.Prompt('<id CCEMImportSave><h3>Import settings</h3><div class="block">Here you can paste in the CCEM settings code that was giving to you on export.<div id="importError" class="warning" style="font-weight:bold;font-size:11px;"></div></div><div class="block"><textarea id="textareaPrompt" style="width:100%;height:128px;">'+(def||'')+'</textarea></div>',[['Import','if (l(\'textareaPrompt\').value.length==0){return false;}try { EM.loadSave(l(\'textareaPrompt\').value);Game.ClosePrompt();}catch(err){l(\'importError\').innerHTML=\'(Error importing save)\';}'],'Nevermind']);
			l('textareaPrompt').focus();
		}
	}
	EM.save = function() {
		if (!EM.prefs.saveToGame) return setTimeout(function() { delete Game.modSaveData['Cookie Clicker Essentials'] }, 10), '';
		return EM.writeSave();
	}
	EM.load = function(str) {
		EM.loadSave(str);
	}
		
	if (typeof CCSE === 'undefined') {
		Game.LoadMod('https://klattmose.github.io/CookieClicker/CCSE.js', function() {
			//prevent CCEM finshing before CCSE
			setTimeout(function() { Game.registerMod('Cookie Clicker Essentials', EM) }, 500);
		});
	} else {
		Game.registerMod('Cookie Clicker Essentials', EM);
	}
	window.EM = EM;
})();
