function Sculpture () {
    Element.call(this);
    this.unit = new THREE.Group();
    this.unit.name = 'unit';
    this.string = 'incr_0,8,0 [ circle_30,40 [ r_90,0,0 [ circle_3,0 [ e ] ] ] ]';
    this.fromString(this.string);
    this.setUnit();
    this.instantiate();
}

Sculpture.prototype = Object.assign(Object.create(Element.prototype), {

    constructor: Sculpture,

    setUnit: function (obj){
        if(obj != null) {

        } else {
            // material
            var map = new THREE.CubeTextureLoader()
            .setPath( 'bg/' )
            .load( [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ] );
            var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: map } );

            // geometry
            var plate = new THREE.Mesh(new THREE.CylinderGeometry(5,5,1), material);
            plate.translateX(20);
            var bar = new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,20), material);
            bar.rotateZ(Math.PI/2);
            bar.translateY(-10);

            this.unit.add(plate,bar);
        }
    },

    instantiate: function () {
        this.find('e').add(this.unit);
        this.generate('3');
    },

});