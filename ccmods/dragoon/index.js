Game.registerMod('dragoon',{
  init:function() {
    loc=function(text){
      text=text.split(' ');
      if (!text) return 'dragoon';
      var str='';
      for (let i in text) str+='dragoon'+(i==text.length-1?'':' ');
      return str;
    };
    LocalizeUpgradesAndAchievs()
    for (let i in Game.Loader.assets) {
        Game.Loader.Replace(i,'https://static-00.iconduck.com/assets.00/upside-down-face-emoji-2048x2048-dnrvqcfw.png')
    }
    for (let i in document.styleSheets[1].cssRules) {
        let rule=document.styleSheets[1].cssRules[i];
        if (rule.style) rule.style.backgroundImage='url("https://static-00.iconduck.com/assets.00/upside-down-face-emoji-2048x2048-dnrvqcfw.png")'
    }
    updateIcons = function() {
      for (let i of document.getElementsByClassName('icon')) {
        i.style.backgroundImage='url("https://static-00.iconduck.com/assets.00/upside-down-face-emoji-2048x2048-dnrvqcfw.png")';
        i.style.backgroundSize='48px 48px';
      }
      for (let i of document.getElementsByClassName('usesIcon')) {
        i.style.backgroundImage='url("https://static-00.iconduck.com/assets.00/upside-down-face-emoji-2048x2048-dnrvqcfw.png")';i.style.backgroundSize='48px 48px';
      }
      for (let i of document.getElementsByClassName('crate')) {
        i.style.backgroundImage='url("https://static-00.iconduck.com/assets.00/upside-down-face-emoji-2048x2048-dnrvqcfw.png")';i.style.backgroundSize='48px 48px';
      }
    }
    Game.registerHook('draw',updateIcons);
    for (let i in Game.Achievements) Game.Achievements[i].ddesc=loc(Game.Achievements[i].ddesc);
    for (let i in Game.Upgrades) Game.Upgrades[i].ddesc=loc(Game.Upgrades[i].ddesc);
    for (let i in Game.Objects) {
      Game.Objects[i].dname=loc(Game.Objects[i].name);
      Game.Objects[i].displayName=loc(Game.Objects[i].displayName);
      Game.Objects[i].desc=loc(Game.Objects[i].desc);
      Game.Objects[i].actionName=loc(Game.Objects[i].actionName);
    }
    Game.BuildStore();
    Beautify=function(val,floats) {
    	var negative=(val<0);
    	var decimal='';
    	var fixed=val.toFixed(floats);
    	if (floats>0 && Math.abs(val)<1000 && Math.floor(fixed)!=fixed) decimal='.'+(fixed.toString()).split('.')[1];
    	val=Math.floor(Math.abs(val));
    	if (floats>0 && fixed==val+1) val++;
    	//var format=!EN?2:Game.prefs.format?2:1;
    	var format=Game.prefs.format?2:1;
    	var formatter=numberFormatters[format];
    	var output=(val.toString().indexOf('e+')!=-1 && format==2)?val.toPrecision(3).toString():formatter(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
    	//var output=formatter(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
    	if (output=='0') negative=false;
    	var end=output+decimal;
      return (negative?'-':'')+'dra'+end+'oon';
    }
  },
  save:function() {
    return 'dragoon';
  },
  load:function(str) {
    Game.Notify('Dragoon','Dragoon');
  }
});
