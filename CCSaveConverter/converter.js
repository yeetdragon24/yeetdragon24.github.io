App = 0;
var Game = {};
Game.UpgradesById = {};
for (let i = 0; i < 875; i++) {
	Game.UpgradesById[i] = {name:i};
}
Game.AchievementsById = {};
for (let i = 0; i < 643; i++) {
	Game.AchievementsById[i] = {name:i};
}
Game.Objects = {'Cursor':{},'Grandma':{},'Farm':{},'Mine':{},'Factory':{},'Bank':{},'Temple':{},'Wizard tower':{},'Shipment':{},'Alchemy lab':{},'Portal':{},'Time machine':{},'Antimatter condenser':{},'Prism':{},'Chancemaker':{},'Fractal engine':{},'Javascript console':{},'Idleverse':{},'Cortex baker':{},'You':{}};
function pack3(values){
	//too many save corruptions, darn it to heck
	return values;
}
Game.YouCustomizer = {
	save:function() {return '';}
};
function utf8_to_b64(str) {
	return btoa(str);
}
function choose(arr) {return arr[Math.floor(Math.random()*arr.length)];}

Game.HowMuchPrestige=function(cookies)//how much prestige [cookies] should land you
{
	return Math.pow(cookies/1000000000000,1/3);
}
Game.saveModData = () => { return ''; };
Game.vault = [];
Game.SaveWrinklers = () => { return ''; };
Game.RandomBakeryName=function()
{
	return (Math.random()>0.05?(choose(['Magic','Fantastic','Fancy','Sassy','Snazzy','Pretty','Cute','Pirate','Ninja','Zombie','Robot','Radical','Urban','Cool','Hella','Sweet','Awful','Double','Triple','Turbo','Techno','Disco','Electro','Dancing','Wonder','Mutant','Space','Science','Medieval','Future','Captain','Bearded','Lovely','Tiny','Big','Fire','Water','Frozen','Metal','Plastic','Solid','Liquid','Moldy','Shiny','Happy','Happy Little','Slimy','Tasty','Delicious','Hungry','Greedy','Lethal','Professor','Doctor','Power','Chocolate','Crumbly','Choklit','Righteous','Glorious','Mnemonic','Psychic','Frenetic','Hectic','Crazy','Royal','El','Von'])+' '):'Mc')+choose(['Cookie','Biscuit','Muffin','Scone','Cupcake','Pancake','Chip','Sprocket','Gizmo','Puppet','Mitten','Sock','Teapot','Mystery','Baker','Cook','Grandma','Click','Clicker','Spaceship','Factory','Portal','Machine','Experiment','Monster','Panic','Burglar','Bandit','Booty','Potato','Pizza','Burger','Sausage','Meatball','Spaghetti','Macaroni','Kitten','Puppy','Giraffe','Zebra','Parrot','Dolphin','Duckling','Sloth','Turtle','Goblin','Pixie','Gnome','Computer','Pirate','Ninja','Zombie','Robot']);
}
Game.bakeryName = Game.RandomBakeryName();
Game.isMinigameReady = () => { return false; };
//Game.WriteSave, by Orteil
Game.WriteSave=function(type) {
	Game.toSave=false;
	//type: none is default, 1=return string only, 2=return uncompressed string, 3=return uncompressed, commented string
	Game.lastDate=parseInt(Game.time);
	var str='';
	if (type==3) str+='\nGame version\n';
	str+=Game.version+'|';
	str+='|';//just in case we need some more stuff here
	if (type==3) str+='\n\nRun details';
	str+=//save stats
	(type==3?'\n	run start date : ':'')+parseInt(Game.startDate)+';'+
	(type==3?'\n	legacy start date : ':'')+parseInt(Game.fullDate)+';'+
	(type==3?'\n	date when we last opened the game : ':'')+parseInt(Game.lastDate)+';'+
	(type==3?'\n	bakery name : ':'')+(Game.bakeryName)+';'+
	(type==3?'\n	seed : ':'')+(Game.seed)+';'+
	(type==3?'\n	appearance : ':'')+(Game.YouCustomizer.save())+
	'|';
	if (type==3) str+='\n\nPacked preferences bitfield\n	';
	var str2=//prefs
	(Game.prefs.particles?'1':'0')+
	(Game.prefs.numbers?'1':'0')+
	(Game.prefs.autosave?'1':'0')+
	(Game.prefs.autoupdate?'1':'0')+
	(Game.prefs.milk?'1':'0')+
	(Game.prefs.fancy?'1':'0')+
	(Game.prefs.warn?'1':'0')+
	(Game.prefs.cursors?'1':'0')+
	(Game.prefs.focus?'1':'0')+
	(Game.prefs.format?'1':'0')+
	(Game.prefs.notifs?'1':'0')+
	(Game.prefs.wobbly?'1':'0')+
	(Game.prefs.monospace?'1':'0')+
	(Game.prefs.filters?'1':'0')+
	(Game.prefs.cookiesound?'1':'0')+
	(Game.prefs.crates?'1':'0')+
	(Game.prefs.showBackupWarning?'1':'0')+
	(Game.prefs.extraButtons?'1':'0')+
	(Game.prefs.askLumps?'1':'0')+
	(Game.prefs.customGrandmas?'1':'0')+
	(Game.prefs.timeout?'1':'0')+
	(Game.prefs.cloudSave?'1':'0')+
	(Game.prefs.bgMusic?'1':'0')+
	(Game.prefs.notScary?'1':'0')+
	(Game.prefs.fullscreen?'1':'0')+
	(Game.prefs.screenreader?'1':'0')+
	(Game.prefs.discordPresence?'1':'0')+
	'';
	str2=pack3(str2);
	str+=str2+'|';
	if (type==3) str+='\n\nMisc game data';
	str+=
	(type==3?'\n	cookies : ':'')+parseFloat(Game.cookies).toString()+';'+
	(type==3?'\n	total cookies earned : ':'')+parseFloat(Game.cookiesEarned).toString()+';'+
	(type==3?'\n	cookie clicks : ':'')+parseInt(Math.floor(Game.cookieClicks))+';'+
	(type==3?'\n	golden cookie clicks : ':'')+parseInt(Math.floor(Game.goldenClicks))+';'+
	(type==3?'\n	cookies made by clicking : ':'')+parseFloat(Game.handmadeCookies).toString()+';'+
	(type==3?'\n	golden cookies missed : ':'')+parseInt(Math.floor(Game.missedGoldenClicks))+';'+
	(type==3?'\n	background type : ':'')+parseInt(Math.floor(Game.bgType))+';'+
	(type==3?'\n	milk type : ':'')+parseInt(Math.floor(Game.milkType))+';'+
	(type==3?'\n	cookies from past runs : ':'')+parseFloat(Game.cookiesReset).toString()+';'+
	(type==3?'\n	elder wrath : ':'')+parseInt(Math.floor(Game.elderWrath))+';'+
	(type==3?'\n	pledges : ':'')+parseInt(Math.floor(Game.pledges))+';'+
	(type==3?'\n	pledge time left : ':'')+parseInt(Math.floor(Game.pledgeT))+';'+
	(type==3?'\n	currently researching : ':'')+parseInt(Math.floor(Game.nextResearch))+';'+
	(type==3?'\n	research time left : ':'')+parseInt(Math.floor(Game.researchT))+';'+
	(type==3?'\n	ascensions : ':'')+parseInt(Math.floor(Game.resets))+';'+
	(type==3?'\n	golden cookie clicks (this run) : ':'')+parseInt(Math.floor(Game.goldenClicksLocal))+';'+
	(type==3?'\n	cookies sucked by wrinklers : ':'')+parseFloat(Game.cookiesSucked).toString()+';'+
	(type==3?'\n	wrinkles popped : ':'')+parseInt(Math.floor(Game.wrinklersPopped))+';'+
	(type==3?'\n	santa level : ':'')+parseInt(Math.floor(Game.santaLevel))+';'+
	(type==3?'\n	reindeer clicked : ':'')+parseInt(Math.floor(Game.reindeerClicked))+';'+
	(type==3?'\n	season time left : ':'')+parseInt(Math.floor(Game.seasonT))+';'+
	(type==3?'\n	season switcher uses : ':'')+parseInt(Math.floor(Game.seasonUses))+';'+
	(type==3?'\n	current season : ':'')+(Game.season?Game.season:'')+';';
	var wrinklers=Game.SaveWrinklers();
	str+=
	(type==3?'\n	amount of cookies contained in wrinklers : ':'')+parseFloat(Math.floor(wrinklers.amount))+';'+
	(type==3?'\n	number of wrinklers : ':'')+parseInt(Math.floor(wrinklers.number))+';'+
	(type==3?'\n	prestige level : ':'')+parseFloat(Game.prestige).toString()+';'+
	(type==3?'\n	heavenly chips : ':'')+parseFloat(Game.heavenlyChips).toString()+';'+
	(type==3?'\n	heavenly chips spent : ':'')+parseFloat(Game.heavenlyChipsSpent).toString()+';'+
	(type==3?'\n	heavenly cookies : ':'')+parseFloat(Game.heavenlyCookies).toString()+';'+
	(type==3?'\n	ascension mode : ':'')+parseInt(Math.floor(Game.ascensionMode))+';'+
	(type==3?'\n	permanent upgrades : ':'')+parseInt(Math.floor(Game.permanentUpgrades[0]))+';'+parseInt(Math.floor(Game.permanentUpgrades[1]))+';'+parseInt(Math.floor(Game.permanentUpgrades[2]))+';'+parseInt(Math.floor(Game.permanentUpgrades[3]))+';'+parseInt(Math.floor(Game.permanentUpgrades[4]))+';'+
	(type==3?'\n	dragon level : ':'')+parseInt(Math.floor(Game.dragonLevel))+';'+
	(type==3?'\n	dragon aura : ':'')+parseInt(Math.floor(Game.dragonAura))+';'+
	(type==3?'\n	dragon aura 2 : ':'')+parseInt(Math.floor(Game.dragonAura2))+';'+
	(type==3?'\n	chime type : ':'')+parseInt(Math.floor(Game.chimeType))+';'+
	(type==3?'\n	volume : ':'')+parseInt(Math.floor(Game.volume))+';'+
	(type==3?'\n	number of shiny wrinklers : ':'')+parseInt(Math.floor(wrinklers.shinies))+';'+
	(type==3?'\n	amount of cookies contained in shiny wrinklers : ':'')+parseFloat(Math.floor(wrinklers.amountShinies))+';'+
	(type==3?'\n	current amount of sugar lumps : ':'')+parseFloat(Math.floor(Game.lumps))+';'+
	(type==3?'\n	total amount of sugar lumps made : ':'')+parseFloat(Math.floor(Game.lumpsTotal))+';'+
	(type==3?'\n	time when current sugar lump started : ':'')+parseFloat(Math.floor(Game.lumpT))+';'+
	(type==3?'\n	time when last refilled a minigame with a sugar lump : ':'')+parseFloat(Math.floor(Game.lumpRefill))+';'+
	(type==3?'\n	sugar lump type : ':'')+parseInt(Math.floor(Game.lumpCurrentType))+';'+
	(type==3?'\n	vault : ':'')+Game.vault.join(',')+';'+
	(type==3?'\n	heralds : ':'')+parseInt(Game.heralds)+';'+
	(type==3?'\n	golden cookie fortune : ':'')+parseInt(Game.fortuneGC)+';'+
	(type==3?'\n	CpS fortune : ':'')+parseInt(Game.fortuneCPS)+';'+
	(type==3?'\n	highest raw CpS : ':'')+parseFloat(Game.cookiesPsRawHighest)+';'+
	(type==3?'\n	music volume : ':'')+parseInt(Math.floor(Game.volumeMusic))+';'+
	(type==3?'\n	cookies sent : ':'')+parseInt(Math.floor(Game.cookiesSent))+';'+
	(type==3?'\n	cookies received : ':'')+parseInt(Math.floor(Game.cookiesReceived))+';'+
	
	'|';//cookies and lots of other stuff
	
	if (type==3) str+='\n\nBuildings : amount, bought, cookies produced, level, minigame data';
	for (var i in Game.Objects)//buildings
	{
		var me=Game.Objects[i];
		if (type==3) str+='\n	'+me.name+' : ';
		if (me.vanilla)
		{
			str+=me.amount+','+me.bought+','+parseFloat(Math.floor(me.totalCookies))+','+parseInt(me.level);
			if (Game.isMinigameReady(me)) str+=','+me.minigame.save(); else str+=','+(me.minigameSave||'');
			str+=','+(me.muted?'1':'0');
			str+=','+me.highest;
			str+=';';
		}
	}
	str+='|';
	if (type==3) str+='\n\nPacked upgrades bitfield (unlocked and bought)\n	';
	var toCompress=[];
	for (var i in Game.UpgradesById)//upgrades
	{
		var me=Game.UpgradesById[i];
		if (me.vanilla) toCompress.push(Math.min(me.unlocked,1),Math.min(me.bought,1));
	};
	
	toCompress=pack3(toCompress.join(''));//toCompress=pack(toCompress);//CompressLargeBin(toCompress);
	
	str+=toCompress;
	str+='|';
	if (type==3) str+='\n\nPacked achievements bitfield (won)\n	';
	var toCompress=[];
	for (var i in Game.AchievementsById)//achievements
	{
		var me=Game.AchievementsById[i];
		if (me.vanilla) toCompress.push(Math.min(me.won));
	}
	toCompress=pack3(toCompress.join(''));//toCompress=pack(toCompress);//CompressLargeBin(toCompress);
	str+=toCompress;
	
	str+='|';
	if (type==3) str+='\n\nBuffs : type, maxTime, time, arg1, arg2, arg3';
	for (var i in Game.buffs)
	{
		var me=Game.buffs[i];
		if (me.type)
		{
			if (type==3) str+='\n	'+me.type.name+' : ';
			if (me.type.vanilla)
			{
				str+=me.type.id+','+me.maxTime+','+me.time;
				if (typeof me.arg1!=='undefined') str+=','+parseFloat(me.arg1);
				if (typeof me.arg2!=='undefined') str+=','+parseFloat(me.arg2);
				if (typeof me.arg3!=='undefined') str+=','+parseFloat(me.arg3);
				str+=';';
			}
		}
	}
	
	
	if (type==3) str+='\n\nCustom :\n';
	
	str+='|';
	str+=Game.saveModData();
	
	Game.lastSaveData=str;
	
	if (type==2 || type==3)
	{
		return str;
	}
	else if (type==1)
	{
		str=escape(utf8_to_b64(str)+'!END!');
		return str;
	}
	else
	{
		if (Game.useLocalStorage)
		{
			//so we used to save the game using browser cookies, which was just really neat considering the game's name
			//we're using localstorage now, which is more efficient but not as cool
			//a moment of silence for our fallen puns
			str=utf8_to_b64(str)+'!END!';
			if (str.length<10)
			{
				Game.Notify('Saving failed!','Purchasing an upgrade and saving again might fix this.<br>This really shouldn\'t happen; please notify Orteil on his tumblr.');
			}
			else
			{
				str=escape(str);
				localStorageSet(Game.SaveTo,str);//aaand save
				if (App) App.save(str);
				if (!localStorageGet(Game.SaveTo))
				{
					Game.Notify(loc("Error while saving"),loc("Export your save instead!"));
				}
				else if (document.hasFocus())
				{
					Game.Notify(loc("Game saved"),'','',1,1);
				}
			}
		}
		else//legacy system
		{
			//that's right
			//we're using cookies
			//yeah I went there
			var now=new Date();//we storin dis for 5 years, people
			now.setFullYear(now.getFullYear()+5);//mmh stale cookies
			str=utf8_to_b64(str)+'!END!';
			Game.saveData=escape(str);
			str=Game.SaveTo+'='+escape(str)+'; expires='+now.toUTCString()+';';
			document.cookie=str;//aaand save
			if (App) App.save(str);
			if (document.cookie.indexOf(Game.SaveTo)<0)
			{
				Game.Notify(loc("Error while saving"),loc("Export your save instead!"),'',0,1);
			}
			else if (document.hasFocus())
			{
				Game.Notify(loc("Game saved"),'','',1,1);
			}
		}
	}
}
function transfer(me,o) {
	for (var i in o){me[i]=o[i];}
}

function convert(str) {
	let save = JSON.parse(str);
	Game.lastDate = save.time;
	Game.version = 2.052;

	
	Game.prefs = save.settings;
	Game.volume = 50;
	Game.volumeMusic = 50;
	
	Game.fullDate = save.gameStart;
	Game.startDate = save.runStart;
	Game.seed = save.seed;
	
	Game.cookies = save.cookies;
	Game.cookiesEarned = save.cookiesEarned;
	Game.cookiesReset = save.cookiesReset;
	Game.handmadeCookies = save.cookiesHandmade;
	Game.cookiesPsRawHighest = 0;
	Game.cookiesPs = 0;
	
	Game.reindeerClicked = save.reindeerClicks;
	Game.goldenClicks = save.gcClicksTotal;
	Game.goldenClicksLocal = save.gcClicks;
	Game.missedGoldenClicks = save.gcMissed;
	Game.cookieClicks = save.cookieClicks;
	
	Game.elderWrath = save.elderWrath;
	Game.pledges = save.pledges;
	Game.pledgeT = save.pledgeT;
	Game.wrinklersPopped = save.wrinklersPopped;
	Game.cookiesSucked = save.cookiesSucked;
	Game.researchT = save.researchT;
	Game.nextResearch = false; //save.researchUpgrade;
	
	Game.heavenlyChips = save.heavenlyChips;
	Game.heavenlyChipsSpent = save.heavenlyChipsSpent;
	Game.resets = save.resets;
	
	Game.season = save.season;
	Game.seasonT = save.seasonT;
	Game.seasonUses = save.seasonUses;
	
	Game.fortuneGC = save.fortuneGC;
	Game.fortuneCPS = save.fortuneCPS;
	
	Game.bgType = save.bgType;
	Game.milkType = save.milkType;
	Game.chimeType = save.chimeType;
	
	Game.permanentUpgrades = save.permanentUpgrades;
	
	Game.santaLevel = save.santaLevel;
	Game.dragonLevel = save.dragonLevel;
	Game.dragonAura = save.dragonAura;
	Game.dragonAura2 = save.dragonAura2;
	
	
	Game.prestige=Math.floor(Game.HowMuchPrestige(Game.cookiesReset));
	Game.heavenlyCookies = 0;
	Game.ascensionMode = 0;
	
	Game.lumps = Math.floor((Date.now() - Game.fullDate) / 1000 / 3600 / 24);
	Game.lumpsTotal = Game.lumps;
	Game.lumpRefill = 0;
	Game.lumpCurrentType = 0;
	Game.lumpT = Date.now();
	
	Game.heralds = 0;
	Game.cookiesSent = 0;
	Game.cookiesReceived = 0;
	
	
	let buildings = save.buildings;
	for (let i in Game.Objects) {
		let me = Game.Objects[i];
		transfer(me,buildings[i]);
		me.totalCookies = me.cookiesMade;
		me.highest = me.amountMax;
		me.level = 0;
		me.vanilla = 1;
	}
	
	let upgrades = save.upgrades;
	for (let i in Game.UpgradesById) {
		let me = Game.UpgradesById[i];
		if (!me) continue;
		me.unlocked = ((upgrades[i]>>1)&1)||0;
		me.bought = (upgrades[i]&1)||0;
		me.vanilla = 1;
	}
	
	let cheevos = save.achievs;
	for (let i in Game.AchievementsById) {
		let me = Game.AchievementsById[i];
		me.won = cheevos[i] || 0;
		me.vanilla = 1;
	}
	
	let buffs = save.buffs;
	Game.buffs = [];
	
	return Game.WriteSave(1);
}
