function Sculpture (
    // axis,
    // unit,
    selfCircle=new Element('circle','0,0,y'),
    twist=new Element('incr','0,0,0')) {

    THREE.Group.call(this);

    var Signal = signals.Signal;
	this.signals = {
		sceneBackgroundChanged: new Signal(),
		unitMaterialChanged: new Signal(),
		axisChanged: new Signal(),
		layoutChanged: new Signal(),
		unitChanged: new Signal(),

    };
            
    this.axis = null;
    this.unit = null;
    this.metaUnit = new Element('e');
    this.selfCircle = selfCircle;
    this.twist = twist;

    // unit materials
    this.materialNames = ['standard','toon','reflective','glass','custom'];
    this.materials = {};
    var mats = [];
    mats[0] = new THREE.MeshStandardMaterial({color:0x8c8c8c, emessive: 0x202020, roughness:1, metalness:0.5});
    mats[1] = new THREE.MeshToonMaterial({color:0x8c8c8c, specular:0x000000,reflectivity:0, shininess:1 });
    mats[2] = new THREE.MeshBasicMaterial();
    mats[3] = new THREE.MeshPhongMaterial( { color: 0xffffff, refractionRatio: 0.985 } );
    mats[4] = new THREE.MeshBasicMaterial();
    for (let i=0;i<mats.length;i++) {
        this.materials[this.materialNames[i]]=mats[i];
        mats[i].name = this.materialNames[i];
    }

    // unit meshes
    this.unitNames = ['default','10','N1','N3','N4'];
    this.units = {}
    for (let name of this.unitNames) {
        if (name=='default') {
            this.units[name] = generateDefaultUnit(mats[0]);
            continue;
        }
        let scope = this;
        objLoader.load(name+'.obj',function(object) {
            object.name = 'unit';
            object.children[0].material = mats[0];
            scope.units[name] = object;
        });
    }

    // layout axis
    this.axes = {
        'circle': new Element('circle','20,70,z'),
        'line': new Element('line','1,10,1,0,10,0'),
        'spiral': new Element('spiral','40,40,1,15,5'),
        'heart': new Element('heart','30,2'),
    };

    this.setAxis('circle');
    this.setUnit('default');
    this.unitMaterial = mats[0];
    //this.setMaterial('standard');
    
    this.add(this.twist);

    this.build();

}

Sculpture.prototype = Object.assign(Object.create(THREE.Group.prototype), {

    constructor: Sculpture,

    setMaterial: function (name) {
        this.unit.traverse(function(object){
            if(object.type=='Mesh') {
                object.material = this.materials[name];
            }
        });
    },

    setAxis: function (name, args) {
        this.axis = this.axes[name];
        if (args) {
            this.axis.val = args.join(',');
        }
    },

    setUnit: function (name) {
        //console.log(this.units[name])
        this.unit = this.units[name];
    },

    build: function () {
        this.clear();
        this.twist.addLeft(this.axis);
        this.axis.addLeft(this.selfCircle);
        this.selfCircle.addLeft(this.metaUnit);
        this.metaUnit.find('e').add(this.unit);
        this.twist.generate();
    },

    clear: function () {
        this.metaUnit.traverseAncestors(function(object){
            while(object.children.length!=1 && object.type!='Scene') {
                object.remove(object.children[object.children.length-1]);
                object.quaternion.set(0,0,0,1);
                object.scale.set(1,1,1);
                object.position.set(0,0,0);
            }
        });
        this.unit.quaternion.set(0,0,0,1);
        this.unit.scale.set(1,1,1);
        this.unit.position.set(0,0,0);
        this.metaUnit.remove(this.unit);
    },

    setMaterial: function (name) {
        var scope = this;
        this.unit.traverse(function(object){
            if(object.type=='Mesh') {
                scope.unitMaterial = scope.materials[name];
                object.material = scope.materials[name];
                if (name == 'glass') {
                    if(!scope.materials[name].envMap) {
                        scope.updateMatMap(sceneBackgroundLib['scene1'])
                    }
                    scope.materials[name].envMap.mapping = THREE.CubeRefractionMapping;
                } else if (name == 'reflective') {
                    if(!scope.materials[name].envMap) {
                        scope.updateMatMap(sceneBackgroundLib['scene1'])
                    }
                }
            }
        });
        this.build();
    },

    updateMatMap: function (map) {
        this.materials['reflective'].envMap = map;
        this.materials['glass'].envMap = map;
    }

});