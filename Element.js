function Element ( k,v,m ) {

	THREE.Object3D.call(this);
	
	this.nodeType = null;

	this.key = k!==null?k:'e';
	this.val = v!==null?v:'';
	this.mar = m!==null?m:'';//  *n: shared node and index; @n: relative node and index
	
	this.left = this.children[0]?this.children[0]:null;
	this.right = this.children[1]?this.children[1]:null;
	
	this.leaves = [];
	this.depth = 0;
}

Element.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {

	constructor: Element,

	//inherit .clone() method from Object3D, as a result clones' attributes such as key, left, etc. are null, exactly what we want
	
	addLeft: function (e){
		
		this.children[0] = e;
		e.parent = this;
		e.nodeType = 'left';
		this.left = e;
		//console.log(this.key +' append left: '+e.key);
		
	},
	
	addRight: function (e){
		
		this.children[1] = e;
		e.parent = this;
		e.nodeType = 'right';
		this.right = e;
		//console.log(this.key +' append right: '+e.key);
		
	},
	
	// getLeaves: function (){
		
	// 	var scope = this;
		
	// 	if(this.key.indexOf('e')==0&&this.key.length<4) this.parent.leaves.push(this);
	// 	if(this.left) {
	// 		this.left.getLeaves();
	// 		if(this.left.leaves.length>0) this.left.leaves.map(function(e){scope.leaves.push(e);});
	// 	}
	// 	if(this.right) {
	// 		this.right.getLeaves();
	// 		if(this.right.leaves.length>0) this.right.leaves.map(function(e){scope.leaves.push(e);});
	// 	}
		
	// },
	
	find: function (k) {
		
		var r = null;

		if(this.key==k) {
			//console.log('-----found: '+ this.key); 
			r = this;
		} else {
			if(this.left) {
				//console.log('find left child in '+ this.key);
				r = this.left.find(k);
				if(r) return r;
			}
			if(this.right) {
				//console.log('find right child in '+ this.key);	
				r = this.right.find(k);
				if(r) return r;
			}
		}
		return r;
		
	},
	
	generate: function (type) {//generate child objects according to key and val
		
		var d = /\d+/g;
		
		if ( this.key.indexOf('e')==0&&this.key.length<4 ) { return; }//leaf node, don't need to generate, back to its parent
		else {//non-leaf node, deep diving to leaf node's parent to start generate
			
			if ( this.left == null ) {alert('error: missing subject!'); return;}
			
			//deep diving to leaf node's parent
			this.left.generate(type);
			if(this.right) this.right.generate(type);//
			
		}
		
		var args = this.val.split( ',' ).map( function ( i ) {
			var str2num = Number( i );
			if (isNaN(str2num)) return i;
			else return str2num;
			//return d.exec(i)?Number( i ):i;
		} );
		//console.log(args)
			//if ( v1.indexOf(this.key) >=0 ){// v21: const wordlist of valence == 1

				if( this.val == null ) return;
								
				switch(this.key){
					case 'circle':
						circle(this,args[0],args[1],args[2]);
						break;					
					case 'line':
						line(this,args[0],args[1],args[2],args[3],args[4],args[5]);
						break;
					case 'spiral':
						spiral(this,args[0],args[1],args[2],args[3],args[4]);;
						break;
					case 'incr':
						if(this.left.key == 'incs')
							incr(this.left,args[0],args[1],args[2],args[3]);
						else incr(this,args[0],args[1],args[2],args[3]);
						break;
					case 'incs':
						if(this.left.key == 'incr')
							incs(this.left,args[0],args[1],args[2]);
						else incs(this,args[0],args[1],args[2]);
						break;
					case 'heart':
						heart(this,args[0],args[1],args[2]);
						break;
				}
				
			// } else if ( v2.indexOf(this.key) >=0 ){// v32: const wordlist of valence == 2
			// 	if( this.right == null ) {alert('missing object!'); return;}
								
			// 	switch(this.key) {
			// 		case 'rpos':
			// 			translate3(this,args[0],args[1],args[2]);
			// 			break;
			// 		case 'surround':
			// 			surround(this,args[0],args[1],args[2]);
			// 			break;
			// 	}
				
			//} else {alert('invalid key!');return;}

	},
	
	// calcDepth: function () {
		
	// 	var tdepth = 0;
	// 	var q = [];
	// 	q.push( this );
		
	// 	while( q.length != 0 ) {
			
	// 		var p = q.shift();//remove and return q[0]
			
	// 		if( p.left ) {
	// 			q.push( p.left );
	// 			tdepth = p.depth+1;
	// 			p.left.depth = tdepth;
	// 		}
	// 		if( p.right ) {
	// 			q.push( p.right );
	// 			tdepth = p.depth+1;
	// 			p.right.depth = tdepth;
	// 		}
			
	// 	}
	// 	return tdepth;

	// },
	
	// parseHierarchies: function () {
		
	// 	var dep = this.calcDepth();
	// 	var r = [];
	// 	for (var i=0;i<dep+1;i++) r.push([]);
	// 	r[0].push(this.toStr());
	// 	var q = [];
	// 	q.push( this );
		
	// 	while( q.length != 0 ) {
			
	// 		var ri = [];

	// 		var p = q.shift();
			
	// 		if( p.left ) {
				
	// 			var str = '[ ';
	// 			str+=p.left.toStr();
	// 			q.push( p.left );
	// 			//ri.push(new Element(p.left.key,p.left.val,p.left.mar));
	// 			ri.unshift(p.left.depth);
			
	// 			if( p.right ) {
	// 				str += ' ';
	// 				str += p.right.toStr();
	// 				str += ' ]';
	// 				q.push( p.right );
	// 				//ri.push(new Element(p.right.key,p.right.val,p.right.mar));
	// 			} else {
	// 				str += ' ]';
					
	// 			}
	// 			if(str!='[ ') ri.push(str);
	// 		}
	// 		if(ri.length>0){
	// 			var n = ri.shift();
	// 			for( e of ri ) r[n].push(e);

	// 		}
	// 	}

	// 	return r;
	// },

	toJSON: function () {
		
		var args = ''
		args += this.key;
		args = this.val? args+'_'+this.val:args;
		args = this.mar? args+'_'+this.mar:args;

		var descendants = [];
		if( this.left ) descendants.push(this.left.toJSON());
		if( this.right ) descendants.push(this.right.toJSON());
		
		return {
			
			para:args,
			children: descendants
			
		};
		
	},
	
	// toStr: function (){//node
		
	// 	var r = this.key;
	// 	r = this.val? r+'_'+this.val:r;
	// 	r = this.mar? r+'_'+this.mar:r;
	// 	return r;

	// },
	
	// toStrMin: function () {//to set of min trees
		
	// 	var arr = [];
	// 	var q = [];
	// 	q.push( this );
		
	// 	while( q.length != 0 ) {
			
	// 		var str0 = q[0].toStr();
	// 		var p = q.shift();//remove and return q[0]
			
	// 		if( p.left ) {
				
	// 			var str = ' [ ';
	// 			str+=p.left.toStr();
	// 			q.push( p.left );
			
	// 			if( p.right ) {
	// 				str += ' ';
	// 				str += p.right.toStr();
	// 				str += ' ]';
	// 				q.push( p.right );

	// 			} else {
	// 				str += ' ]';
					
	// 			}
				
	// 			if(str!='[ ') arr.push(str0+str);
	// 		}
			
	// 	}
	// 	return arr;
		
	// },
	
	toString: function (keyonly) {//tree
		
		var r = '';
		
		var temp = '';
		temp += this.key;
		if(!keyonly) {
			temp = this.val? temp+'_'+this.val:temp;
			temp = this.mar? temp+'_'+this.mar:temp;
		}
		if(this.nodeType == 'left') r += ' [';
		if(this.nodeType == 'root') r += temp;
		else r = r + ' ' + temp;

		if(this.left) r+= this.left.toString(keyonly);
		if(this.right) r += this.right.toString(keyonly);
		else if (this.left) r += ' ]';	//single child

		if(this.nodeType == 'right') r += ' ]';
		
		return r;
	},
	
	fromString: function ( string ) {
		
		var words = string.split(' ');

		var args = words[0].split('_');
		var key = args[0]?args[0]:null;
		var val = args[1]?args[1]:null;
		var mar = args[2]?args[2]:null;

		var temproot = new Element(key,val,mar);
		temproot.nodeType = 'root';
		var node_pre = temproot;
		var node_cur = temproot;

		var appendLeft = false;
		
		//start from words[1] ,for words[1] is root node
		
		for (var i = 1; i<words.length; i++){
			
			var s = words[i];

			if (s != '[' && s != ']'){//s is a node, parse key, val, mar
			
				var args = s.split('_');
				var key = args[0]?args[0]:null;
				var val = args[1]?args[1]:null;
				var mar = args[2]?args[2]:null;
				node_cur = new Element(key,val,mar);
				
				if(appendLeft) {//node_cur is left child
						
					node_pre.addLeft(node_cur);
					appendLeft = false;
						
				} else {//node_cur is right child
						
					node_pre.addRight(node_cur);
						
				}

			} else if (s=='[') {

				node_pre = node_cur;
				appendLeft = true;
				
			} else if (s == ']') {
				
				node_pre = node_pre.parent;
				
			}
			
		}
		
		return temproot;
	},
	
});