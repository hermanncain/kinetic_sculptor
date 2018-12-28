var TopBar = function (sk) {
    var container = new UI.Panel().setId('topbar');

    var title = new UI.Text('KSBuilder').setWidth('180px').setFontSize('40px')
    title.setMarginLeft('20px').setMarginTop('5px');
    title.dom.style.verticalAlign='top';
    title.dom.style.fontFamily='Impact';
    container.add(title);

    // scene material
    var sceneBackgroundButtons = [];
    var sceneRow = new UI.Row();
    container.add(sceneRow);
    var t1 = new UI.Text('Scene material').setWidth('80px').setMarginLeft('50px');
    t1.dom.style.verticalAlign='baseline';
    sceneRow.add(t1);
    
    (function (){
        for (let name of sceneBackgroundNameList) {
            var bt = new UI.Button().setId(name).onClick(function(){
                updateSceneBackground(name);
            });
            sceneRow.add(bt);
            sceneBackgroundButtons.push(bt);
        }
    })();

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

    var uploadTexture = new UI.Texture().setDisplay('none').onChange(function(texture){
        sk.materials['custom'].map = uploadTexture.getValue();
        sk.materials['custom'].needsUpdate = true;
    });
    unitMatRow.add(uploadTexture);

    container.add(new UI.Button().setId('github').onClick(function(){
		window.open('https://github.com/hermanncain/kinetic_sculptor');
    }));
    
    function updateSceneBackground(name) {
        if (scene.background.name == name) {
            return;
        } else {
            currentSceneBackground = sceneBackgroundLib[name];
            scene.background = currentSceneBackground;
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
                uploadTexture.setDisplay('');
            } else {
                uploadTexture.setDisplay('none');
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