Game.registerMod('Extra Suffering Mod', {
    init:function() {
        this.achievements = [];
        for (let i in Game.Objects) {
            let building = Game.Objects[i];
            let level10cheevo = building.levelAchiev10;
            this.achievements.push(new Game.Achievement(
                `${level10cheevo.dname} 2`,
                `Reach level <b>20</b> ${building.plural}.`,
                [level10cheevo.icon[0], level10cheevo.icon[1] + 1]
            ));
            Game.last.order = level10cheevo.order + 0.001;
            building.levelAchiev20 = Game.last;
        }
        LocalizeUpgradesAndAchievs();
        Game.registerHook('check', this.logic);
    },
    logic:function() {
        for (let i in Game.Objects) {
            let building = Game.Objects[i];
            if (building.level >= 20) Game.Win(building.levelAchiev20.name);
        }
    },
    save:function() {
        let str = '';
        for (let cheevo of this.achievements) {
            str += cheevo.won;
        }
        return str;
    },
    load:function(str) {
        for (let i in this.achievements) {
            this.achievements[i].won = str[i];
        }
    }
});
