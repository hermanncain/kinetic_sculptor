/** string processing
 ** @hermanncain
 **/

function combine(arr1,arr2) {
	
	var arr=arr1.concat(arr2);
	arr=arr.filter(function(item,index,self){
		return self.indexOf(item) == index;
	});
	return arr;
}

function intersect(arr1,arr2) {
	
	var arr=[];
	for (a1 of arr1)
		for (a2 of arr2)
			if(a1==a2) arr.push(a1);
	return arr;
}

/*
function getNgram(str,n) {
	
	var arr = [];
	for (var i=0;i<=str.length-n;i++) {
		var s = '';
		for (var j=0;j<n;j++)
			s+=str[i+j];
		arr.push(s);
	}
	return arr;
	
}
*/

function getNgram2(strarr,n) {
	
	var arr = [];
	for (var i=0;i<=strarr.length-n;i++) {
		var s = '';
		for (var j=0;j<n;j++)
			s=s+strarr[i+j]+' ';
		if(s.slice(s.length-1)==' ') s=s.slice(0,s.length-1)
		arr.push(s);
	}
	return arr;
	
}

function getAllSubstr2(str) {
	var arr = [];
	var strarr = str.split(' ');
	for (var i=1;i<=strarr.length;i++) {
		var a = getNgram2(strarr,i);
		arr=arr.concat(a);
	}
	return arr;
}

/*
function sim(s1,s2){
	
	var a1 = getNgram(s1);
	var a2 = getNgram(s2);
	return intersect(a1,a2).length/combine(a1,a2).length;
	
}

function getAllSubstr(str) {
	var arr = [];
	for (var i=1;i<=str.length;i++) {
		var a = getNgram(str,i);
		arr=arr.concat(getNgram(str,i));
	}
	return arr;
}
*/

function stringKernel(s1,s2) {
	
	var k=0;
	
	var sa1 = getAllSubstr2(s1);
	var sa2 = getAllSubstr2(s2);

	var f = intersect(sa1,sa2);
	var b = Math.max.apply( Math, f.map(function ( i ) { return i.split(' ').length}) );
	for (s of f) {
		var n1 = 0;
		var n2 = 0;
		var w = s.length/b;//s.split(' ').length/b;//
		for( s1 of sa1 )
			if( s == s1 && s!='[' && s!= ']') n1++;
		for( s2 of sa2 )
			if( s == s2  && s!='[' && s!= ']') n2++;
		k += n1*n2*w;
	}
	return k;
}