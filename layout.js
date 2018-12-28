const layoutMap = ['circle', 'line', 'spiral', 'heart', 'rlock', 'slock', 'incr', 'incs'];

// basic transform map
function translate3 (object,value,direction) {
    switch (direction) {
        case 'x':
        object.translateX(value);
        break;
        case 'y':
        object.translateY(value);
        break;
        case 'z':
        object.translateZ(value);
        break;
    }
}
function rotate3 (object,value,direction) {
    switch (direction) {
        case 'x':
        object.rotateX(value);
        break;
        case 'y':
        object.rotateY(value);
        break;
        case 'z':
        object.rotateZ(value);
        break;
    }
}

// axes
function circle(v,n,r,axis) {
    var t=360/n;
    
	for (var i = 1; i<n; i++) {
        var temp = v.left.clone();
        rotate3(temp, Math.PI/180*t*i, axis );
        //temp.rotateZ(Math.PI/180*t*i);
        if (axis=='y' || axis=='z') {
            translate3(temp, r, 'x');
        } else {
            translate3(temp, r, 'z');
        }
		//temp.translateX(r);
		v.add(temp);
    }
    if (axis=='y' || axis=='z') {
        translate3(v.left, r, 'x');
    } else {
        translate3(v.left, r, 'z');
    }
}

function line(v,nx,ny,nz,dx,dy,dz) {

	for (var i = 0; i<nx; i++) {
		for ( var j = 0;j<ny;j++) {
			for (var k = 0;k<nz;k++){
				if(i==0&&j==0&&k==0) continue;
				var temp = v.left.clone();
				temp.translateX(dx*i);
				temp.translateY(dy*j);
				temp.translateZ(dz*k);
                v.add(temp);		
			}
		}
	}

}

function spiral(v,n,r1,dr,dt,a) {//v, n, dr, dt) {
	
	for(i=1;i<=n;i++){
		var temp = v.left.clone();
		temp.rotateZ(Math.PI/180*dt*i);
		temp.translateX(parseFloat(r1)+parseFloat(dr)*parseInt(i));
		temp.translateZ(a*i)
		v.add(temp);
	}
    v.left.translateX(r1);
}

function heart(v,n,s,lock) {
	s = parseFloat(s);
	var heartShape = new THREE.Shape();
	x=0,y=0;
	
	heartShape.moveTo( x - 25*s, y - 25*s );
	heartShape.bezierCurveTo( x - 25*s, y - 25*s, x - 20*s, y, x, y );
	heartShape.bezierCurveTo( x + 30*s, y, x + 30*s, y - 35*s, x + 30*s, y - 35*s );
	heartShape.bezierCurveTo( x + 30*s, y - 55*s, x + 10*s, y - 77*s, x - 25*s, y - 95*s );
	heartShape.bezierCurveTo( x - 60*s, y - 77*s, x - 80*s, y - 55*s, x - 80*s, y - 35*s );
	heartShape.bezierCurveTo( x - 80*s, y - 35*s, x - 80*s, y, x - 50*s, y );
	heartShape.bezierCurveTo( x - 35*s, y, x - 25*s, y - 25*s, x - 25*s, y - 25*s );

	var ctp = new THREE.Vector3(-25*s,-47.5*s,0);
	var dir = new THREE.Vector3(-1,0,0);

	var spacedPoints = heartShape.getSpacedPoints( parseInt(n) );
	for (i=1;i<spacedPoints.length-1;i++) {
		var temp = v.left.clone();
		temp.position.set(spacedPoints[i].x,spacedPoints[i].y,0);
		if(!lock) {
			var deg = new THREE.Vector3().subVectors(temp.position,ctp).angleTo(dir);
			var positive = new THREE.Vector3().crossVectors(dir,new THREE.Vector3().subVectors(temp.position,ctp)).z;
			if(positive>0) temp.rotateZ(deg+Math.PI);
			else temp.rotateZ(Math.PI-deg);
		}
		v.add(temp);
	}
	v.left.position.set(spacedPoints[0].x,spacedPoints[0].y,0);
	if(!lock) v.left.rotateZ(new THREE.Vector3().subVectors(v.left.position,ctp).angleTo(dir));
}

// layouts
function incr(v,x,y,z) {
	for (var i =0;i<v.left.children.length;i++){

		v.left.children[i].rotateX(Math.PI/180*x*i);

	}
	for (var i =0;i<v.left.children.length;i++){

		v.left.children[i].rotateY(Math.PI/180*y*i);

	}
	for (var i =0;i<v.left.children.length;i++){

		v.left.children[i].rotateZ(Math.PI/180*z*i);

	}
	
}

function incs(v,sx,sy,sz) {
	
	for (var i =0;i<v.left.children.length;i++){

		v.left.children[i].scale.x = 1+(sx-1)*i;//Math.pow(sx,i);
		v.left.children[i].scale.y = 1+(sy-1)*i;//Math.pow(sy,i);
		v.left.children[i].scale.z = 1+(sz-1)*i;//Math.pow(sz,i);

	}
}
