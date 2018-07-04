//key-value pattern system

//1

//basic transform

function translate(v,x,y) {
	
	v.left.translateX(x);
	v.left.translateY(y);
	
}

function rotate(v,t) {
	
	v.left.rotateZ(Math.PI/180*t);
	
}

function scale(v,x,y) {
	
	v.left.scale.x *= x;
	v.left.scale.y *= y;
	
}

function mirror(v,t) {
	
	v.left.rotateZ(-Math.PI/180*(180-2*t));
	v.left.scale.x *= -1;
	
}

// array feature

function circle(v,n,r,t) {
	if(!t) t=360/n;
	for (var i = 1; i<n; i++) {
		var temp = v.left.clone();
		temp.rotateZ(Math.PI/180*t*i);
		temp.translateX(r);
		v.add(temp);
	}
	v.left.translateX(r);

}

function arc(v,n,t, r) {
	for (var i = 1; i<n; i++) {
		var temp = v.left.clone();
		temp.rotateZ(Math.PI/180*t*i);
		temp.translateX(r);
		v.add(temp);
	}
	v.left.translateX(r);

}

function linear (v,nx,ny,dx,dy) {
	
	for (var i = 0; i<nx; i++) {
		for ( var j=0;j<ny;j++) {
			if(i==0&&j==0) continue;
			var temp = v.left.clone();
			temp.translateX(dx*i);
			temp.translateY(dy*j);
			v.add(temp);
		}
	}

}

function quadra (v,x,y) {
	
	var tmp1 = v.left.clone();
	tmp1.scale.x = -1;
	console.log(tmp1);
	tmp1.translateX(x).translateY(y);
	var tmp2 = v.left.clone();
	tmp2.scale.y = -1;
	tmp2.translateX(-x).translateY(-y);
	var tmp3 = v.left.clone();
	tmp3.scale.x = -1;
	tmp3.scale.y = -1;
	tmp3.translateX(x);tmp3.translateY(-y);
	
	v.left.translateX(-x).translateY(y);
	v.add(tmp1,tmp2,tmp3);
}

function spiral (v, n, dr, dt) {

	for (var i=1;i<n;i++){
		var temp = v.left.clone();
		temp.rotateZ(Math.PI/180*dt*i);
		temp.translateX(dr*i);
		v.add(temp);	
	}
	
}

function rlock (v,t) {
	
	for (var i =0;i<v.left.children.length;i++){
		
		if(v.left.children[i].nodeType=='right') continue;
		v.left.children[i].rotation.z = 0;
		v.left.children[i].rotateZ(Math.PI/180*t);
		
	}
	
}

function slock(v,s){
	
	for (var i =0;i<v.left.children.length;i++){
		
		if(v.left.children[i].nodeType=='right') continue;
		v.left.children[i].scale.copy(new THREE.Vector3(s,s,s));
		
	}	
}

function incr(v,t) {
	
	for (var i =0;i<v.left.children.length;i++){

		v.left.children[i].rotation.z = Math.PI/180*t*i;

	}
}

function incs(v,s) {
	
	for (var i =0;i<v.left.children.length;i++){

		v.left.children[i].scale.x = Math.pow(s,i);
		v.left.children[i].scale.y = Math.pow(s,i);

	}
}

// 2

function symmetry(v,x,y,t){

	var rad = -Math.PI/180*t;
	
	var nx = Math.sin(rad);
	var ny = Math.cos(rad);
	var nz = 0;
	var m = new THREE.Matrix4();
	m.set( 1-2*nx*nx, -2*nx*ny, -2*nx*nz, 0,
       -2*nx*ny, 1-2*ny*ny, -2*ny*nz, 0,
       -2*nx*nz, -2*ny*nz, 1-2*nz*nz, 0,
       0, 0, 0, 1 );
	   
	var temp = v.left.clone();
	temp.applyMatrix(m);
	v.left.position.x = x;
	v.left.position.y = y;
	
	if(t==90){
		
		temp.position.x = -x;
		temp.position.y = y;
		
	} else {
		
		var k = Math.tan(-rad);
		temp.position.x = (2*k*y+(1-k*k)*x)/(1+k*k);
		temp.position.y = (2*k*x+(k*k-1)*y)/(1+k*k);
	}
	
	v.add(temp);
	
}

function surround(v,n,t,r){
	
	v.right.position.copy(new THREE.Vector3(0,0,0));
	for (var i = 1; i<n; i++) {
		var temp = v.left.clone();
		temp.rotateZ(Math.PI/180*t*i);
		temp.translateX(r);
		v.add(temp);
	}
	v.left.translateX(r);
	
}

function adhere(v){
	
}

//3d

//1
function translate3(v,x,y,z) {
	
	v.left.translateX(x);
	v.left.translateY(y);
	v.left.translateZ(z);
}

function rotate3(v,x,y,z) {
	v.left.rotateX(Math.PI/180*x);
	v.left.rotateY(Math.PI/180*y);
	v.left.rotateZ(Math.PI/180*z);
}

function scale3(v,x,y,z) {
	
	v.left.scale.copy(new THREE.Vector3(x,y,z))
}

function linear3 (v,nx,ny,nz,dx,dy,dz) {

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

function incr3(v,x,y,z) {
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

function incs3(v,sx,sy,sz) {
	
	for (var i =0;i<v.left.children.length;i++){

		v.left.children[i].scale.x = 1+(sx-1)*i;//Math.pow(sx,i);
		v.left.children[i].scale.y = 1+(sy-1)*i;//Math.pow(sy,i);
		v.left.children[i].scale.z = 1+(sz-1)*i;//Math.pow(sz,i);

	}
}

function spiral3(v,n,r1,dr,dt,a) {//v, n, dr, dt) {
	
	for(i=1;i<=n;i++){
		var temp = v.left.clone();
		temp.rotateZ(Math.PI/180*dt*i);
		temp.translateX(parseFloat(r1)+parseFloat(dr)*parseInt(i));
		temp.translateZ(a*i)
		v.add(temp);
	}
    v.left.translateX(r1);
}

function octa(v,x,y,z) {

	var temp1,temp2,temp3;
	temp1 = v.left.clone();
	temp1.scale.x *= -1;
	temp2 = v.left.clone();
	temp2.scale.y *= -1;
	temp3 = temp1.clone();
	temp3.scale.y *= -1;
	
	var temp4,temp5,temp6,temp7;
	temp4 = v.left.clone();
	temp4.scale.z *= -1;
	temp5 = temp4.clone();
	temp5.scale.x *= -1;
	temp6 = temp4.clone();
	temp6.scale.y *= -1;
	temp7 = temp5.clone();
	temp7.scale.y *= -1;
	
	v.left.position.copy(new THREE.Vector3(x,y,z));
	temp1.position.copy(new THREE.Vector3(-x,y,z));
	temp2.position.copy(new THREE.Vector3(x,-y,z));
	temp3.position.copy(new THREE.Vector3(-x,-y,z));
	temp4.position.copy(new THREE.Vector3(x,y,-z));
	temp5.position.copy(new THREE.Vector3(-x,y,-z));
	temp6.position.copy(new THREE.Vector3(x,-y,-z));
	temp7.position.copy(new THREE.Vector3(-x,-y,-z));
	v.add(temp1);
	v.add(temp2)
	v.add(temp3)
	if(!z) return;
	v.add(temp4)
	v.add(temp5)
	v.add(temp6)
	v.add(temp7)
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
			if(positive>0) temp.rotateZ(deg);
			else temp.rotateZ(Math.PI-deg);
		}
		v.add(temp);
	}
	v.left.position.set(spacedPoints[0].x,spacedPoints[0].y,0);
	if(!lock) v.left.rotateZ(new THREE.Vector3().subVectors(v.left.position,ctp).angleTo(dir));
}