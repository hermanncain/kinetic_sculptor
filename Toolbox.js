Toolbox = function ( ) {

	var container = new UI.Panel();
	container.setId('sidebar');
	container.setBorder( '0' );
	container.setPadding( '0' );

	// editor

	// Increment
	var IncrementDiv = new UI.Panel();
	IncrementDiv.add(new UI.Text('Increment').setFontSize('20px').setPadding('5px'));
	container.add(IncrementDiv);
	var IncrementCtrl = new UI.Number(8).setFontSize('20px').setPaddingLeft('20px').onChange(updateIncrement);
	IncrementCtrl.min = 0;
	IncrementCtrl.max = 60;
	IncrementDiv.add(IncrementCtrl);
	var d1 = new UI.HorizontalRule();
	IncrementDiv.add(d1);

	// innerNumber
	var innerNumberDiv = new UI.Panel();
	innerNumberDiv.add(new UI.Text('i_Number').setFontSize('20px').setPadding('5px'));
	container.add(innerNumberDiv);
	var innerNumberCtrl = new UI.Integer(3).setFontSize('20px').setPaddingLeft('20px').onChange(updateInnerNumber);
	innerNumberCtrl.min = 1;
	innerNumberCtrl.max = 8;
	innerNumberDiv.add(innerNumberCtrl);
	var d2 = new UI.HorizontalRule();
	innerNumberDiv.add(d2);

	// number
	var NumberDiv = new UI.Panel();
	NumberDiv.add(new UI.Text('Number').setFontSize('20px').setPadding('5px'));
	container.add(NumberDiv);
	var NumberCtrl = new UI.Integer(30).setFontSize('20px').setPaddingLeft('20px').onChange(updateNumber);
	NumberCtrl.min = 4;
	NumberCtrl.max = 60;
	NumberDiv.add(NumberCtrl);
	var d3 = new UI.HorizontalRule();
	NumberDiv.add(d3);

	// outline parameters

	// circle radius

	var RadiusDiv = new UI.Panel();
	RadiusDiv.add(new UI.Text('Radius').setFontSize('20px').setPadding('5px'));
	var RadiusCtrl = new UI.Number(40).setFontSize('20px').setPaddingLeft('20px').onChange(updateRadius);
	RadiusCtrl.min = 20;
	RadiusCtrl.max = 100;
	RadiusDiv.add(RadiusCtrl);
	var d5 = new UI.HorizontalRule();
	RadiusDiv.add(d5);
	container.add(RadiusDiv);

	// heart scale and rlock

	var scaleDiv = new UI.Panel().setDisplay('none');
	scaleDiv.add(new UI.Text('Scale').setFontSize('20px').setPadding('5px'));
	var scaleCtrl = new UI.Number(2).setFontSize('20px').setPaddingLeft('20px').onChange(updateScale);
	scaleCtrl.min = 0.5;
	scaleCtrl.max = 10;
	scaleDiv.add(scaleCtrl);
	scaleDiv.add(new UI.Text('lock').setFontSize('20px').setPadding('5px'));
	var rlock = new UI.Checkbox(false).onChange(egg);
	scaleDiv.add(rlock);
	var d6 = new UI.HorizontalRule();
	scaleDiv.add(d6);
	container.add(scaleDiv);

	// spiral
	var spiralDiv = new UI.Panel().setDisplay('none');
	spiralDiv.add(new UI.Text('initial radius').setFontSize('20px').setPadding('5px'));
	var spr1 = new UI.Number(40).setFontSize('20px').setPaddingLeft('20px').onChange(updateSp);
	spr1.min = 5;
	spr1.max = 100;
	spiralDiv.add(spr1);
	spiralDiv.add(new UI.Text('radius increment').setFontSize('20px').setPadding('5px'));
	var spdr = new UI.Number(1).setFontSize('20px').setPaddingLeft('20px').onChange(updateSp);
	spdr.min = -10;
	spdr.max = 10;
	spiralDiv.add(spdr);
	spiralDiv.add(new UI.Text('interval angle').setFontSize('20px').setPadding('5px'));
	var spdt = new UI.Number(15).setFontSize('20px').setPaddingLeft('20px').onChange(updateSp);
	spdt.min = 5;
	spdt.max = 90;
	spiralDiv.add(spdt);
	spiralDiv.add(new UI.Text('pitch distance').setFontSize('20px').setPadding('5px'));
	var spa = new UI.Number(5).setFontSize('20px').setPaddingLeft('20px').onChange(updateSp);
	spa.min = 0;
	spa.max = 50;
	spiralDiv.add(spa);
	var d7 = new UI.HorizontalRule();
	spiralDiv.add(d7);
	container.add(spiralDiv);

	// Outline
	var Outline = new UI.Panel();
	Outline.add(new UI.Text('Outline').setFontSize('20px').setPadding('5px'));
	container.add(Outline);
	// outline lib
	var outlineLib = new UI.Panel();
	var lib = ['circle', 'straight line', 'spiral', 'heart'];
	var ops = []
	for (var i=0; i<lib.length;i++){
		var option = document.createElement( 'div' );
		option.innerHTML = lib[i];
		option.value = lib[i];
		ops.push(option);		
	}
	var sl = new UI.Browser().setHeight('50px').setWidth('200px').setMarginLeft('20px');
	sl.setId('Outliner');
	sl.setOptions(ops)
	outlineLib.add(sl);
	container.add(outlineLib);
	
	var chooseOutline = new UI.Button('choose').setMarginLeft('30px').onClick(changeOutline);	
	container.add(chooseOutline);

	// basic params update
	function updateIncrement () {
		var string = sculpture.toString();
		var incstring = string.slice(string.indexOf(',')+1);
		incstring = incstring.slice(incstring.indexOf(','));
		incstring = IncrementCtrl.getValue().toString() + incstring;
		string = string.slice(0,string.indexOf(',')+1) + incstring;
		updateSculpture(string);
	}
	function updateInnerNumber () {
		var string = sculpture.toString();
		var innerNumberstring = string.slice(string.lastIndexOf(','));
		innerNumberstring = innerNumberCtrl.getValue().toString() + innerNumberstring;
		string = string.slice(0,string.lastIndexOf('_')+1) + innerNumberstring;
		updateSculpture(string);
	}
	function updateNumber () {
		var string = sculpture.toString();
		var Numberstring = string.slice(string.indexOf('[')+2);
		var prestring = Numberstring.slice(0,Numberstring.indexOf('_')+1);
		if(string.indexOf('linear')>-1) {
			prestring =  Numberstring.slice(0,Numberstring.indexOf(',')+1);
			Numberstring = Numberstring.slice(Numberstring.indexOf(',')+1);
			Numberstring = Numberstring.slice(Numberstring.indexOf(','));
		} else {
			Numberstring = Numberstring.slice(Numberstring.indexOf(','));
		}
		Numberstring = NumberCtrl.getValue().toString() + Numberstring;
		string = string.slice(0,string.indexOf('[')+2) + prestring + Numberstring;
		updateSculpture(string);
	}

	// outline params update
	function changeOutline() {
		outlineOp = sl.getValue();
		var string = sculpture.toString();
		var outlinestring = string.slice(string.indexOf('[')+2);
		outlinestring = outlinestring.slice(outlinestring.indexOf(' '));
		var prestring = string.slice(0,string.indexOf('[')+2)
		switch (outlineOp) {
			case 'circle':
				string = 'circle_30,40' + outlinestring;
				RadiusDiv.setDisplay('block');
				scaleDiv.setDisplay('none');
				spiralDiv.setDisplay('none');
			break;
			case 'straight line':
				string = 'linear_1,10,1,0,10,0' + outlinestring;
				RadiusDiv.setDisplay('none');
				scaleDiv.setDisplay('none');
				spiralDiv.setDisplay('none');
			break;
			case 'spiral':
				string = 'spiral_40,40,1,15,5' + outlinestring;
				spiralDiv.setDisplay('block');
				RadiusDiv.setDisplay('none');
				scaleDiv.setDisplay('none');
			break;
			case 'heart':
				string = 'heart_30,2' + outlinestring;
				scaleDiv.setDisplay('block');
				RadiusDiv.setDisplay('none');
				spiralDiv.setDisplay('none');
			break;
		}
		string = prestring + string;
		updateSculpture(string);
	}
	function updateRadius () {
		var string = sculpture.toString();
		var Radiusstring = string.slice(string.indexOf('circle')+7);
		Radiusstring = Radiusstring.slice(Radiusstring.indexOf(' '));
		Radiusstring = RadiusCtrl.getValue().toString() + Radiusstring;
		var pre = string.slice(0,string.indexOf('circle')+10);
		pre = pre.slice(0,string.lastIndexOf(','));
		string = pre + Radiusstring;
		updateSculpture(string);
	}
	function updateScale() {
		var string = sculpture.toString();
		var pcs = string.split('heart_');
		var change = pcs[1].slice(0,pcs[1].indexOf(' '));
		var changes = change.split(',');
		changes[1] = scaleCtrl.getValue();
		pcs[1] = pcs[1].slice(pcs[1].indexOf(' '));
		string = pcs.join('heart_'+changes.join(','));
		updateSculpture(string);
	}
	function egg() {
		var string = sculpture.toString();
		var pcs = string.split('heart_');
		if(rlock.getValue()) pcs[1] = pcs[1].replace(' ',',1 ');
		else pcs[1] = pcs[1].replace(',1 ',' ');
		string = pcs.join('heart_');
		updateSculpture(string);
	}

	function updateSp() {
		var string = sculpture.toString();
		var pcs = string.split('spiral_');
		var change = pcs[1].slice(0,pcs[1].indexOf(' '));
		pcs[1] = pcs[1].slice(pcs[1].indexOf(' '));
		changes = change.split(',');
		changes[1] = spr1.getValue();
		changes[2] = spdr.getValue();
		changes[3] = spdt.getValue();
		changes[4] = spa.getValue();
		string = pcs.join('spiral_'+ changes.join(','));
		updateSculpture(string);
	}

	function updateSculpture (string) {
		
		scene.remove(sculpture);
		sculpture = sculpture.fromString(string);
		sculpture.find('e').add(unit.clone());
		sculpture.generate('3');
		scene.add(sculpture);
		d3tree.update(sculpture.toJSON());
		
	};

	return container;

};
