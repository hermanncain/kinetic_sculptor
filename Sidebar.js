var Sidebar = function ( sk ) {

	var container = new UI.Panel();
	container.setId('sidebar');
	container.setBorder( '0' );
	container.setPadding( '0' );

	// github
	// var githubRow = new UI.Row();
	// container.add(githubRow);
	// githubRow.add(new UI.Text('learn more at').setFontSize('20px').setMargin('10px'));
	// githubRow.add(new UI.Button().setId('github').onClick(function(){
	// 	window.open('https://github.com/hermanncain/kinetic_sculptor');
	// }));
	// container.add(new UI.HorizontalRule());

	// axis shape
	var axes = ['circle','line','spiral','heart'];
	var currentAxis = 'circle';

	var axisPanel = new UI.Panel();
	axisPanel.add(new UI.Text('Axis shape').setFontSize('20px'));
	container.add(axisPanel);
	var axisRow = new UI.Row();
	container.add(axisRow);

	var circleAxis = new UI.Button().setId('circle').onClick(function () {
		updateAxis(this.dom.id);
	});
	circleAxis.dom.classList.add('selected');
	axisRow.add(circleAxis);

	var lineAxis = new UI.Button().setId('line').onClick(function () {
		updateAxis(this.dom.id);
	});
	axisRow.add(lineAxis);

	var spiralAxis = new UI.Button().setId('spiral').onClick(function () {
		updateAxis(this.dom.id);
	});
	axisRow.add(spiralAxis);

	var heartAxis = new UI.Button().setId('heart').onClick(function () {
		updateAxis(this.dom.id);
	});
	axisRow.add(heartAxis);

	container.add(new UI.HorizontalRule());

	// axis parameters
	var axisParaPanel = new UI.Panel();
	axisParaPanel.add(new UI.Text('Axis parameters').setFontSize('20px'));
	container.add(axisParaPanel);

	// circle
	var RadiusDiv = new UI.Panel();
	RadiusDiv.add(new UI.Text('Radius').setWidth('100px'));
	axisParaPanel.add(RadiusDiv);
	var RadiusCtrl = new UI.Number(40).setPaddingLeft('20px').onChange(updateRadius);
	RadiusCtrl.min = 20;
	RadiusCtrl.max = 100;
	RadiusDiv.add(RadiusCtrl);
	RadiusDiv.add(new UI.HorizontalRule());

	// line

	// spiral
	var spiralDiv = new UI.Panel().setDisplay('none');
	spiralDiv.add(new UI.Text('initial radius').setWidth('100px'));
	var spr1 = new UI.Number(40).setPaddingLeft('20px').onChange(updateSp);
	spr1.min = 5;
	spr1.max = 100;
	spiralDiv.add(spr1);
	spiralDiv.add(new UI.Text('radius increment').setWidth('100px'));
	var spdr = new UI.Number(1).setPaddingLeft('20px').onChange(updateSp);
	spdr.min = -10;
	spdr.max = 10;
	spiralDiv.add(spdr);
	spiralDiv.add(new UI.Text('interval angle').setWidth('100px'));
	var spdt = new UI.Number(15).setPaddingLeft('20px').onChange(updateSp);
	spdt.min = 5;
	spdt.max = 90;
	spiralDiv.add(spdt);
	spiralDiv.add(new UI.Text('pitch distance').setWidth('100px'));
	var spa = new UI.Number(5).setPaddingLeft('20px').onChange(updateSp);
	spa.min = 0;
	spa.max = 50;
	spiralDiv.add(spa);
	var d7 = new UI.HorizontalRule();
	spiralDiv.add(d7);
	axisParaPanel.add(spiralDiv);

	// heart
	var scaleDiv = new UI.Panel().setDisplay('none');
	scaleDiv.add(new UI.Text('Scale').setWidth('100px'));
	var scaleCtrl = new UI.Number(2).setPaddingLeft('20px').onChange(updateScale);
	scaleCtrl.min = 0.5;
	scaleCtrl.max = 10;
	scaleDiv.add(scaleCtrl);
	scaleDiv.add(new UI.Text('lock').setWidth('100px'));
	var rlock = new UI.Checkbox(false).onChange(egg);
	scaleDiv.add(rlock);
	var d6 = new UI.HorizontalRule();
	scaleDiv.add(d6);
	axisParaPanel.add(scaleDiv);

	container.add(new UI.HorizontalRule());

	// layout paramters
	var layoutParaPanel = new UI.Panel();
	layoutParaPanel.add(new UI.Text('Layout parameters').setFontSize('20px'));
	container.add(layoutParaPanel);

	// twist angle
	var IncrementDiv = new UI.Panel();
	IncrementDiv.add(new UI.Text('Twist angle').setWidth('100px'));
	container.add(IncrementDiv);
	var IncrementCtrl = new UI.Number(8).onChange(updateIncrement);
	IncrementCtrl.min = 0;
	IncrementCtrl.max = 60;
	IncrementDiv.add(IncrementCtrl);
	IncrementDiv.add(new UI.HorizontalRule());

	// number along axis
	var NumberDiv = new UI.Panel();
	NumberDiv.add(new UI.Text('Axial #').setWidth('100px'));
	container.add(NumberDiv);
	var NumberCtrl = new UI.Integer(30).onChange(updateNumber);
	NumberCtrl.min = 4;
	NumberCtrl.max = 60;
	NumberDiv.add(NumberCtrl);
	NumberDiv.add(new UI.HorizontalRule());

	// number on axis point
	var innerNumberDiv = new UI.Panel();
	innerNumberDiv.add(new UI.Text('Radial #').setWidth('100px'));
	container.add(innerNumberDiv);
	var innerNumberCtrl = new UI.Integer(3).onChange(updateInnerNumber);
	innerNumberCtrl.min = 1;
	innerNumberCtrl.max = 8;
	innerNumberDiv.add(innerNumberCtrl);
	innerNumberDiv.add(new UI.HorizontalRule());

	container.add(new UI.HorizontalRule());

	// unit shape
	
	var units = [0,1,2,3];
	var currentUnit = 0;

	var unitShapeButtons = [];
	var unitShapePanel = new UI.Panel();
	unitShapePanel.add(new UI.Text('Unit shape').setFontSize('20px'));
	container.add(unitShapePanel);

	var unitShapeRow = new UI.Row();
	unitShapePanel.add(unitShapeRow);

	(function () {
        for (let name of sk.unitNames) {
            var bt = new UI.Button().setId(name).onClick(function(){
                updateUnit(name);
            });
            unitShapeRow.add(bt);
            unitShapeButtons.push(bt);
        }
	}) ();
	
	// for (let i=0;i<units.length;i++) {
	// 	var unitButton = new UI.Button().setId('unit-'+i).onClick(function(){
	// 		updateUnit(i);
	// 	});
	// 	unitShapeRow.add(unitButton);
	// 	if (i==0) {
	// 		unitButton.dom.classList.add('selected');
	// 	}
	// }
	

	// unit material

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
	function switchAxis() {
		var string = sculpture.toString();
		var outlinestring = string.slice(string.indexOf('[')+2);
		outlinestring = outlinestring.slice(outlinestring.indexOf(' '));
		var prestring = string.slice(0,string.indexOf('[')+2)
		switch (currentAxis) {
			case 'circle':
				string = 'circle_30,40' + outlinestring;
				RadiusDiv.setDisplay('block');
				scaleDiv.setDisplay('none');
				spiralDiv.setDisplay('none');
			break;
			case 'line':
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
		
	};

	function updateAxis (axis) {
		if (currentAxis == axis) return;
		currentAxis = axis;
		for (let s of axes) {
			let axisDom = document.getElementById(s);
			if (s == currentAxis) {
				axisDom.classList.add('selected');
			} else {
				axisDom.classList.remove('selected');
			}
		}
		switchAxis();
	}

	function updateUnit(name) {
		if (currentUnit == name) return;
		currentUnit = name;
		for (let i of units) {
			let unitDom = document.getElementById('unit-'+i);
			if (i == currentUnit) {
				unitDom.classList.add('selected');
			} else {
				unitDom.classList.remove('selected');
			}
		}
		switchUnit(name);
	}

	function switchUnit(name) {

	}

	function updateAxisUI (axis) {

	}

	function updateUI () {
		updateAxisUI(currentAxis);
	}

	updateUI();

	return container;

};

var findKey = (value, compare = (a, b) => a === b) =>{
	return Object.keys(obj).find(k => compare(obj[k], value))
}

function buildSwitchButtons(nameList, objectMap, currentObject, domContainer) {
	for (let name of nameList) {
		var bt = new UI.Button(name).setId(name).onClick(function(){
			updateSwitchButtons(name, objectMap, currentObject, nameList);
		});
		if (name == currentObject.name) {
			bt.dom.classList.add('selected');
		}
		domContainer.add(bt);
	}
}

function updateSwitchButtons(clickName, objectMap, currentObject, nameList) {
	if (currentObject.name == clickName) return;
	console.log(currentObject.name +' to ' + clickName)
	currentObject = objectMap[clickName];
	console.log(currentObject)
	// update UI
	for (let name of nameList) {
		let btDom = document.getElementById(name);
		if (name == clickName) {
			btDom.classList.add('selected');
		} else {
			btDom.classList.remove('selected');
		}
	}
	
}