var TopBar = function (signals) {
    var container = new UI.Panel().setId('topbar');

    // scene material
    var sceneBackgroundButtons = [];
    var sceneRow = new UI.Row();
    container.add(sceneRow);
    var t1 = new UI.Text('Scene material').setWidth('80px').setMarginLeft('50px');
    t1.dom.style.verticalAlign='baseline';
    sceneRow.add(t1);
    
    var noneMat = new UI.Button().setId('none').onClick(function(){
        updateSceneBackground('none');
    });
    sceneBackgroundButtons.push(noneMat);
    sceneRow.add(noneMat);
    var scene1Mat = new UI.Button().setId('scene1').onClick(function(){
        updateSceneBackground('scene1');
    });
    sceneRow.add(scene1Mat);
    sceneBackgroundButtons.push(scene1Mat);
    var scene2Mat = new UI.Button().setId('scene2').onClick(function(){
        updateSceneBackground('scene2');
    });
    sceneRow.add(scene2Mat);
    sceneBackgroundButtons.push(scene2Mat);

    // unit material
    var unitMatButtons = [];
    var unitMatRow = new UI.Row();
    container.add(unitMatRow);
    var t2 = new UI.Text('Unit material').setWidth('80px').setMarginLeft('150px');
    t2.dom.style.verticalAlign='baseline';
    unitMatRow.add(t2);

    (function () {
        for (let name of unitMatNameList) {
            var bt = new UI.Button().setId(name).onClick(function(){
                updateUnitMaterial(name);
            });
            unitMatRow.add(bt);
            unitMatButtons.push(bt);
        }
    }) ();
    // var defaultMat = new UI.Button('default').onClick(function(){
    //     updateMaterial('default');
    // });
    // defaultMat.dom.classList.add('selected');
    // unitMaterialRow.add(defaultMat);
    // var toonMat = new UI.Button('toon').onClick(function(){
    //     updateMaterial('toon');
    // });
    // unitMaterialRow.add(toonMat);
    // var metalMat = new UI.Button('reflective').onClick(function(){
    //     updateMaterial('reflective');
    // });
    // unitMaterialRow.add(metalMat);
    // var glassMat = new UI.Button('glass').onClick(function(){
    //     updateMaterial('glass');
    // });
    // unitMaterialRow.add(glassMat);
    // var customMat = new UI.Button('custom').onClick(function(){
    //     updateMaterial('custom');
    // });
    // unitMaterialRow.add(customMat);

    //var githubRow = new UI.Row();
    //container.add(githubRow);
    //var t3 = new UI.Text('learn more at').setWidth('150px').setMargin('5px');//.setFontSize('20px').setMargin('5px');
    //t3.dom.style.verticalAlign='middle';
    //githubRow.add(t3);
    container.add(new UI.Button().setId('github').onClick(function(){
		window.open('https://github.com/hermanncain/kinetic_sculptor');
    }));
    
    //buildSwitchButtons(unitMatList,unitMatLib, currentUnitMat,unitMatRow);

    function updateMaterial(name) {
        // if (currentAxis == axis) return;
		// currentAxis = axis;
		// for (let s of axes) {
		// 	let axisDom = document.getElementById(s);
		// 	if (s == currentAxis) {
		// 		axisDom.classList.add('selected');
		// 	} else {
		// 		axisDom.classList.remove('selected');
		// 	}
		// }
		// switchAxis();
    }

    function updateSceneBackground(name) {
        if (scene.background.name == name) {
            return;
        } else {
            currentSceneBackground = sceneBackgroundLib[name];
            scene.background = currentSceneBackground;
            unitMatLib['reflective'].envMap = currentSceneBackground;
            unitMatLib['reflective'].needsUpdate = true;
            unitMatLib['glass'].envMap = currentSceneBackground;
            unitMatLib['glass'].needsUpdate = true;
            updateUI();
        }
    }

    function updateUnitMaterial (name) {
        //console.log(name, currentUnitMat.name)
        if (currentUnitMat.name == name) {
            return;
        } else {
            currentUnitMat = unitMatLib[name];
            console.log(currentUnitMat)
        }
    }
    function updateUI () {
        // scene
        for (let b of sceneBackgroundButtons) {
            if (b.dom.id == currentSceneBackground.name) {
                b.dom.classList.add('selected');
            } else {
                b.dom.classList.remove('selected');
            }
        }
        // unit material
        for (let b of unitMatButtons) {
            //console.log(b.dom.id +',' + scene.background.name)
            if (b.dom.id == currentUnitMat.name) {
                b.dom.classList.add('selected');
            } else {
                b.dom.classList.remove('selected');
            }
        }
    }

    updateUI();

    return container;

}