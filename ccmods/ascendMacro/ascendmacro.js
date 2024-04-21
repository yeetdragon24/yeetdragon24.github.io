start=Date.now();
end=Date.now();
alreadyAscended = 0;
l('prefsButton').click();
var macro = setInterval(() => {
	l('storeBuyAllButton').click();
	if (Game.buyBulk < 100) l('storeBulk100').click();
	Game.Objects['Cursor'].l.click();
	Game.Objects['Grandma'].l.click();
	Game.Objects['Farm'].l.click();
	Game.Objects['Mine'].l.click();
	Game.Objects['Fractal engine'].l.click();
	if (Game.ascendMeterLevel > 0 && Game.AscendTimer == 0 && !Game.OnAscend && Game.T > 0 && !alreadyAscended) {
		alreadyAscended = 1;
		l('legacyButton').click();
		setTimeout(() => {
			l('promptOption0').click();
			Game.AscendTimer=Game.AscendDuration;
			setTimeout(() => {
				l('ascendButton').click();
				alreadyAscended = 0;
				setTimeout(() => {
					l('promptOption0').click();
					end = Date.now();
					if (end-start>300) console.log(`Ascension: took ${(end-start)/1000}s`);
					start = Date.now();
					Game.WriteSave();
					Game.ExportSave();
					setTimeout(() => {
						l('promptOption0').click();
						Game.ImportSave();
						setTimeout(() => {
							l('textareaPrompt').value=Game.WriteSave(1);
							l('promptOption0').click();
						},34);
					},34);
				},34);
			},34);
		},34);
	}
},5);
