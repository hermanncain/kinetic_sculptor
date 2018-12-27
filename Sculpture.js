function Sculpture (
    axis,
    metaUnit,
    selfCircle=new Element('circle','0,0,y'),
    twist=new Element('incr','0,0,0')) {

    THREE.Group.call(this);

    this.axis = axis;
    this.metaUnit = metaUnit;
    this.unit = new Element('e');
    this.selfCircle = selfCircle;
    this.twist = twist;

    this.add(this.twist);

    this.build();

}

Sculpture.prototype = Object.assign(Object.create(THREE.Group.prototype), {

    constructor: Sculpture,

    build: function () {
        this.twist.addLeft(this.axis);
        this.axis.addLeft(this.selfCircle);
        this.selfCircle.addLeft(this.unit);
        this.unit.find('e').add(this.metaUnit);
        this.twist.generate();
    },

    clear: function () {
        this.unit.traverseAncestors(function(object){
            while(object.children.length!=1 && object.type!='Scene') {
                object.remove(object.children[object.children.length-1]);
            }
        });
        this.unit.find('e').remove(this.metaUnit);
    },

    switchUnit: function (unit) {
        this.clear();

    }

    // setUnit: function (obj){
    //     if(obj != null) {

    //     } else {
    //         // material
    //         var map = new THREE.CubeTextureLoader()
    //         .setPath( 'bg/' )
    //         .load( [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ] );
    //         var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: map } );

    //         // geometry
    //         var plate = new THREE.Mesh(new THREE.CylinderGeometry(5,5,1), material);
    //         plate.translateX(20);
    //         var bar = new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,20), material);
    //         bar.rotateZ(Math.PI/2);
    //         bar.translateY(-10);

    //         this.unit.add(plate,bar);
    //     }
    // },

    // instantiate: function () {
    //     this.find('e').add(this.unit);
    //     this.generate('3');
    // },

});