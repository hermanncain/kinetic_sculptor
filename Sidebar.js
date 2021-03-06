var Sidebar = function ( sk ) {

	var container = new UI.Panel();
	container.setId('sidebar');
	container.setBorder( '0' );
	container.setPadding( '0' );

	// layout paramters
	var layoutParaPanel = new UI.Panel();
	layoutParaPanel.add(new UI.Text('Layout parameters').setFontSize('20px'));
	container.add(layoutParaPanel);

	// twist angle
	var IncrementDiv = new UI.Panel();
	IncrementDiv.add(new UI.Text('Twist angle').setWidth('100px'));
	container.add(IncrementDiv);
	var IncrementCtrl = new UI.Number().setRange(-360,360).setUnit('°').onChange(updateIncrement);
	IncrementDiv.add(IncrementCtrl);

	// number along axis
	var NumberDiv = new UI.Panel();
	NumberDiv.add(new UI.Text('Axial #').setWidth('100px'));
	container.add(NumberDiv);
	var NumberCtrl = new UI.Integer().setRange(1,60).onChange(updateNumber);
	NumberDiv.add(NumberCtrl);

	// number on axis point
	var innerNumberDiv = new UI.Panel();
	innerNumberDiv.add(new UI.Text('Radial #').setWidth('100px'));
	container.add(innerNumberDiv);
	var innerNumberCtrl = new UI.Integer().setRange(1,8).onChange(updateInnerNumber);
	innerNumberDiv.add(innerNumberCtrl);

	container.add(new UI.HorizontalRule());

	// axis shape

	var axisPanel = new UI.Panel();
	axisPanel.add(new UI.Text('Axis shape').setFontSize('20px'));
	container.add(axisPanel);

	// axis
    var axisButtons = [];
    var axisRow = new UI.Row();
    axisPanel.add(axisRow);
    
    (function (){
        for (let name in sk.axes) {
            var bt = new UI.Button().setId(name).onClick(function(){
                updateAxis(name);
            });
            axisRow.add(bt);
            axisButtons.push(bt);
        }
    })();

	container.add(new UI.HorizontalRule());

	// axis parameters
	var axisParaPanel = new UI.Panel();
	axisParaPanel.add(new UI.Text('Axis parameters').setFontSize('20px'));
	container.add(axisParaPanel);

	// circle
	var RadiusDiv = new UI.Panel();
	RadiusDiv.add(new UI.Text('Radius').setWidth('40%'));
	axisParaPanel.add(RadiusDiv);
	var RadiusCtrl = new UI.Number().setRange(0,200).onChange(updateRadius);
	RadiusDiv.add(RadiusCtrl);

	// line
	var yNumberDiv = new UI.Panel();
	yNumberDiv.add(new UI.Text('#').setWidth('40%'));
	axisParaPanel.add(yNumberDiv);
	var yNumberCtrl = new UI.Number().setRange(1,50).onChange(updateYNumber);
	yNumberDiv.add(yNumberCtrl);


	// spiral
	var spiralDiv = new UI.Panel().setDisplay('none');
	spiralDiv.add(new UI.Text('r').setWidth('40%'));
	var spr1 = new UI.Number().setRange(5,100).onChange(updateSp);
	spiralDiv.add(spr1);
	spiralDiv.add(new UI.Text('Δr').setWidth('40%'));
	var spdr = new UI.Number().setRange(-10,10).onChange(updateSp);
	spiralDiv.add(spdr);
	spiralDiv.add(new UI.Text('Δθ').setWidth('40%'));
	var spdt = new UI.Number().setRange(5,90).onChange(updateSp);
	spiralDiv.add(spdt);
	spiralDiv.add(new UI.Text('Pitch').setWidth('40%'));
	var spa = new UI.Number().setRange(-50,50).onChange(updateSp);
	spiralDiv.add(spa);
	axisParaPanel.add(spiralDiv);

	// heart
	var scaleDiv = new UI.Panel().setDisplay('none');
	scaleDiv.add(new UI.Text('Scale').setWidth('40%'));
	var scaleCtrl = new UI.Number().setRange(0.5,10).onChange(updateHeart);
	scaleDiv.add(scaleCtrl);
	scaleDiv.add(new UI.Text('Angle lock').setWidth('50%'));
	var rlock = new UI.Checkbox(false).onChange(updateHeart);
	scaleDiv.add(rlock);

	axisParaPanel.add(scaleDiv);

	container.add(new UI.HorizontalRule());

	// unit
	var unitButtons = [];
	var unitPanel = new UI.Panel();
	unitPanel.add(new UI.Text('Switch Unit').setFontSize('20px'));
	container.add(unitPanel);

	var unitRow = new UI.Row();
	unitPanel.add(unitRow);

	(function () {
        for (let name of sk.unitNames) {
            var bt = new UI.Button(name=='upload'?'':name.slice(0,3)).setId(name).onClick(function(){
                updateUnit(name);
            });
            unitRow.add(bt);
            unitButtons.push(bt);
        }
	}) ();

	// upload unit
	var uploadRow = new UI.Row();
	unitPanel.add(uploadRow);
	var uploadUnit = document.createElement( 'input' );
	uploadUnit.style.width = '100%';
	uploadUnit.style.display = 'none';
	uploadUnit.id = 'uploadUnit';
	uploadUnit.multiple = false;
	uploadUnit.type = 'file';
	uploadUnit.accept = '.obj';
	uploadUnit.addEventListener( 'change', function ( event ) {
		if(uploadUnit.files.length>0)
			loadFile(uploadUnit.files[0] );
	} );
	uploadRow.dom.appendChild( uploadUnit );

	// Update objects
	// update layouts
	function updateIncrement () {
		sk.setTwist(IncrementCtrl.getValue());
		sk.build();
	}
	function updateNumber () {
		sk.setNumber(NumberCtrl.getValue());
		sk.build();
	}
	function updateInnerNumber () {
		sk.setCircle(innerNumberCtrl.getValue());
		sk.build();
	}

	// update axis
	function updateAxis (name) {
		if (sk.axis.key == name) return;
		sk.setAxis(name);
		sk.build();
		updateUI();
	}

	// update axis parameters
	function updateRadius () {
		sk.setRadius(RadiusCtrl.getValue());
		sk.build();
	}
	function updateYNumber(){
		sk.setYNumber(yNumberCtrl.getValue());
		sk.build();
	}
	function updateSp() {
		sk.setSpiral(spr1.getValue(),spdr.getValue(), spdt.getValue(),spa.getValue());
		sk.build();
	}
	function updateHeart() {
		sk.setHeart(scaleCtrl.getValue(),Number(rlock.getValue()));
		sk.build();
	}

	// update unit
	function updateUnit(name) {
		if (name == '10' || name == 'N4') {
			innerNumberCtrl.setValue(1);
		} else {
			innerNumberCtrl.setValue(3);
		}
		updateInnerNumber();
		if (sk.unit.unitName == name) {
			if (sk.units['upload']==undefined) {
				updateUnitUI();
			} else {
				return;
			}
		}
		if (name!='upload') {
			uploadUnit.style.display = 'none';
			sk.setUnit(name);
			sk.build();
			updateUnitUI();
		} else {
			uploadUnit.style.display = '';
			if(sk.units[name]!==undefined) {
				sk.setUnit(name);
				sk.build();
				updateUnitUI();
			} else {
				for (let b of unitButtons) {
					if (b.dom.id == 'upload') {
						b.dom.classList.add('selected');
					} else {
						b.dom.classList.remove('selected');
					}
				}
			}
		}
	}

	// upload .obj file
	function loadFile(file) {
		var reader = new FileReader();
		reader.addEventListener('load', function (event) {
			var contents = event.target.result;
			var object = objLoader.parse(contents);
			object.traverse(function(obj){
				if(obj.type=='Mesh')
					obj.material = sk.unit.material;
			});
			object.name = 'unit';
			object.unitName = 'upload';
			sk.units['upload'] = object;
			sk.setUnit('upload');
			sk.build();
			updateUnitUI();
		});
		reader.readAsText(file);
	}

	// Update UIs
	function updateLayoutUI() {
		var num;
		var args = sk.axis.val.split(',');
        switch (sk.axis.key) {
            case 'circle':
            case 'spiral':
            case 'heart':
				num = args[0];
            break;
            case 'line':
				num = args[1];
            break;
        }
		NumberCtrl.setValue(num);
		IncrementCtrl.setValue(sk.twist.val.split(',')[1]);
		innerNumberCtrl.setValue(sk.selfCircle.val.split(',')[0]);
	}

	function updateAxisUI () {
        for (let b of axisButtons) {
            if (b.dom.id == sk.axis.key) {
                b.dom.classList.add('selected');
            } else {
                b.dom.classList.remove('selected');
            }
        }
	}

	function updateParamsUI () {
		switch(sk.axis.key) {
			case 'circle':
				RadiusCtrl.setValue(sk.axis.val.split(',')[1]);
				RadiusDiv.setDisplay('');
				yNumberDiv.setDisplay('none');
				scaleDiv.setDisplay('none');
				spiralDiv.setDisplay('none');
			break;
			case 'line':
				yNumberCtrl.setValue(sk.axis.val.split(',')[4]);
				yNumberDiv.setDisplay('');
				RadiusDiv.setDisplay('none');
				scaleDiv.setDisplay('none');
				spiralDiv.setDisplay('none');
			break;
			case 'spiral':
				let args = sk.axis.val.split(',');
				spr1.setValue(args[1]);
				spdr.setValue(args[2]);
				spdt.setValue(args[3]);
				spa.setValue(args[4]);
				RadiusDiv.setDisplay('none');
				yNumberDiv.setDisplay('none');
				scaleDiv.setDisplay('none');
				spiralDiv.setDisplay('');
			break;
			case 'heart':
				scaleCtrl.setValue(sk.axis.val.split(',')[1]);
				rlock.getValue(sk.axis.val.split(',')[2]);
				RadiusDiv.setDisplay('none');
				yNumberDiv.setDisplay('none');
				scaleDiv.setDisplay('');
				spiralDiv.setDisplay('none');
			break;
		}
	}

	function updateUnitUI () {
        for (let b of unitButtons) {
            if (b.dom.id == sk.unit.unitName) {
                b.dom.classList.add('selected');
            } else {
                b.dom.classList.remove('selected');
            }
        }
	}

	function updateUI () {
		updateLayoutUI();
		updateAxisUI();
		updateParamsUI();
		updateUnitUI();
	}

	updateUI();

	return container;

};