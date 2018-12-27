var TopBar = function (sk) {
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
    var t2 = new UI.Text('Unit material').setWidth('80px').setMarginLeft('100px');
    t2.dom.style.verticalAlign='baseline';
    unitMatRow.add(t2);

    (function () {
        for (let name of sk.materialNames) {
            var bt = new UI.Button().setId(name).onClick(function(){
                updateUnitMaterial(name);
            });
            unitMatRow.add(bt);
            unitMatButtons.push(bt);
        }
    }) ();

    container.add(new UI.Button().setId('github').onClick(function(){
		window.open('https://github.com/hermanncain/kinetic_sculptor');
    }));
    
    //buildSwitchButtons(unitMatList,unitMatLib, currentUnitMat,unitMatRow);

    function updateSceneBackground(name) {
        if (scene.background.name == name) {
            return;
        } else {
            currentSceneBackground = sceneBackgroundLib[name];
            scene.background = currentSceneBackground;
            console.log(scene.background.name)
            if (scene.background.name != 'none'){
                sk.updateMatMap(scene.background);
            }
            updateUI();
        }
    }

    function updateUnitMaterial (name) {
        
        if (sk.unitMaterial.name == name) {
            return;
        } else {
            sk.setMaterial( name );
            if (name == 'custom') {

            }
            updateUI();
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
            if (b.dom.id == sk.unitMaterial.name) {
                b.dom.classList.add('selected');
            } else {
                b.dom.classList.remove('selected');
            }
        }
    }

    updateUI();

    return container;

}