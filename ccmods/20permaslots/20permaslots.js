Game.registerMod('20permaslots',{
	init:function() {
		this.upgrades = [];
		const numerals = [,,,,'V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX'];
		const desc = loc("Placing an upgrade in this slot will make its effects <b>permanent</b> across all playthroughs.");
		for (let i = 6; i <= 20; i++) {
		  new Game.Upgrade(`Permanent upgrade slot ${numerals[i-1]}`,desc,Math.pow(100,i)*i,[4,10]);
		  Game.last.parents=[Game.Upgrades[`Permanent upgrade slot ${numerals[i-2]}`]];
		  Game.last.iconFunction = () => Game.PermanentSlotIcon(i-1).join(' ')==[i-1,10].join(' ')?[4,10]:Game.PermanentSlotIcon(i-1);
		  Game.last.activateFunction = () => Game.AssignPermanentSlot(i-1);
		  Game.last.posX = 293.266*Math.sin(Math.pow(i,0.709)+15856.6)+356.679;
		  Game.last.posY = -163.645*Math.cos(Math.pow(i,0.777)+0.635)+120.224+(-6.755*Math.pow(i,2));
		  Game.last.pool = 'prestige';
		  Game.PrestigeUpgrades.push(Game.last);
		  this.upgrades.push(Game.last);
		  Game.permanentUpgrades.push(-1);
		}
		LocalizeUpgradesAndAchievs();
		Game.BuildAscendTree();
	},
	save:function() {
		let str = '';
		for (let i in this.upgrades) str += this.bought;
		str += '/'; 
		str += Game.permanentUpgrades.slice(6).join(',');
		return str;
	},
	load:function(str) {
		str = str.split('/');
		for (let i = 6; i <= 20; i++) this.upgrades[i].bought = str[0][i];
		Game.permanentUpgrades = Game.permanentUpgrades.slice(0,5).concat(str[1].split[',']);
	}
});
