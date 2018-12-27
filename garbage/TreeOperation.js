var arrayDisE = function (a1,a2){
    if(a1.length != a2.length) return;
    var s=0;
    for(var i=0;i<a1.length;i++)
        s += Math.pow(a1[i]-a2[i],2) 
    s = Math.sqrt(s);
    return s;
}

var arrayRemove = function (arr,e) {
	var idx = arr.indexOf(e)
	if(idx>-1) arr.splice(idx,e.length);
}

var sameBranch = function (arr,e1,e2) {
	var r = true;
	var tempr = e1 + ' ' + e2;
	for (b of arr) {
		for (a of b) {
			if(a.indexOf(tempr)>-1) return true;//the same branch, accepted
			else r = false;
		}
	}
	return r;
}

var parentAndChildren = function (arr,p,c) {
  	var r = true;
	for (b of arr) {
        for (a of b){
            var as = a.split(' ');
            if (as[0] == p) {//parent match
                if (as[2] == c) return true;//left child match
                else if (as.length==5){ //left not match, v2, search right
                    if(as[3]==c) return true;//right child match
                }
            } else r = false;
        }
	}
	return r;  
}

var subjectAndObject = function (arr,s,o) {
  	var r = true;
	var subr = false, obr = false;
	for (b of arr) {
        for (a of b){
            var as = a.split(' ');
			if (as.length == 4) {	//v1,it doesn't matter s or o is subject or object
				//console.log('checking '+s+' '+o+' in '+a)
				if (as[2] == s) {
					subr = true;
					//console.log(s+' is single child from '+a)
				}
				if (as[2] == o) {
					obr = true;
					//console.log(o+' is single child from '+a)
				}
			} else if (as.length == 5) { //v2
				//console.log('checking '+s+' '+o+' in '+a)
				if (as[2] == o) {
					//console.log('denied');
					return false;
				}
				if (as[3] == s) {
					//console.log('denied');
					return false;
				}
                if (as[2] == s) {//s is left child
					subr = true;
					//console.log(s+' is subject from '+a)
				}
				if (as[3] == o) {//o is right child
					obr = true;
					//console.log(o+' is object from '+a)
				}
            }
			r = subr && obr;
			if(r) break;
        }
		if(r) break;
	}
	return r;  		
}

var diffTree = function (arr,e1,e2) {
	var r = true;
	for (a of arr) {
		if(a.indexOf(e1)>-1 && a.indexOf(e2)>-1) return false;//same tree
		else r=true;
	}
	return r;
}

var isCompleteRule = function (r) {
    
    var ifleaves = false;
    var rhss = r.rhs.split(' ');
    arrayRemove(rhss,'[');
    arrayRemove(rhss,']');
    rhss.shift();
    for (chars of rhss){
        if (chars.indexOf('e')==0) ifleaves = true;//leaves
        else return false
    }
    if(ifleaves) return true;

}

var transfer = function (t1,t2) {
	
	t1.getLeaves();//driver
	t2.getLeaves();//object
	var geos = t2.leaves.map(function (i) {return i.children;})
	var n1 = t1.leaves.length;
	var n2 = geos.length;
	
	if (n2>n1) for (var i=0;i<n2-n1;i++) geos.splice(Math.floor(Math.random()*n2),1);
	else if(n2<n1) for (var i=0;i<n1-n2;i++) geos.push(geos[Math.floor(Math.random()*n2)]);
	
	//basic replacement of leaves without optimization
	for (var i=0;i<t1.leaves.length;i++) {
		t1.leaves[i].children = geos[i];
	}
}

var applyRules = function (s,rules) {

	for (r of rules)  s = r.applyTo(s);
	return s;
	
}

var applyRuleArrays = function (s,rulesArray) {
	
	var ss = [];
	for (rs of rulesArray) ss.push(applyRules(s,rs));
	return ss;
}

/* unit test of applyRules and applyRuleArrays
var a = 'a';
var r1 = new Rule('a','a [ b c ]');
var r2 = new Rule('b','b [ e1 e2 ]');
var r3 = new Rule('b','b [ e ]');
var ra = [r1,r2];
var rb = [r1,r3];
var rs = [ra,rb];
console.log(applyRuleArrays(a,rs));
*/

var mix = function (trees,ws) {

    var r = new Element();
    var results = [];
    var ths = [];//trees' hierarchies
    var h = [];//ths^T: combined vector based on hierarchies' depth
	var rulesa = [];//array of rules arrays to be applied
	var rulesg = [];//rules array generated
	var pairDic = [];//trees' min trees' strings
	var stringDic = [];//trees' strings
    var seeds = [];//trees' roots
	
    for (t of trees) {
        tstring = t.toString(false);
		stringDic.push(tstring);
        seeds.push(tstring.split(' ')[0]);
		pairDic.push(t.toStrMin());
		ths.push(t.parseHierarchies());
	}
    //console.log(ths)
	console.log(pairDic)
	
	var deepest = Math.max.apply(null,ths.map(function (i){return i.length}));

	for (var i=0;i<deepest;i++) {
		var hi = [];
		for (t of ths) {
			
			var temp = t[i]?t[i]:[];
			if (temp.length!=0)
				hi.push(temp);
				
		}
		if(hi.length!=0) h.push(hi);
		
	}
    //console.log(h);
    
	for (var i=0;i<h.length-1;i++) {//every depth

		var rdepth = [];
		
		for (var j = 0;j<h[i].length;j++) {//every data of the depth
			
			//next depth
			var k = i+1;
			
			for(var l=0;l<h[k].length;l++) {//every data of next depth
				var rarray = [];
				var lhs = [], rhs = [];
				
				//lhs
				if(h[i][j].length>1){//more than one string: different branch, same tree

					for(s of h[i][j]) {
						
						var chars = s.split(' ');
						arrayRemove(chars,'[');
						arrayRemove(chars,']');
						for (ch of chars)
							if(ch.indexOf('e')!=0) lhs.push(ch);

					}
					
				} else {//one string: brother nodes
					//console.log(h[i][j])
					var chars = h[i][j][0].split(' ');
					arrayRemove(chars,'[');
					arrayRemove(chars,']');
					for (ch of chars) 
						if(ch.indexOf('e')!=0) lhs.push(ch);

				}
				
				//rhs
				for(s of h[k][l]) {
						
					rhs.push(s);

				}
				
				if(lhs.length>0 && rhs.length>0){
					//console.log(lhs);console.log(rhs)
					for (lhse of lhs){

						var lkey;
						var endidx = lhse.indexOf('_');
						if(endidx>-1) lkey = lhse.slice(0,endidx);
						else lkey = lhse;

						for (rhse of rhs){
							var chars = rhse.split(' ');
							
							//lhs is v1 word and #rhs is 2, match lhs with every word of rhs
							if(chars.length==4 && v1.indexOf(lkey)>-1) {
								for (chare of chars) {
									if (chare!='[' && chare!=']'){
										if (sameBranch(pairDic, lhse, rhse)) rarray.push(new Rule(lhse,lhse + ' [ '+chare+' ]'));
										else if (diffTree(stringDic,lhse,rhse)) rarray.push(new Rule(lhse,lhse + ' [ '+chare+' ]'));
									}
								}
							} else if(chars.length==3 && v2.indexOf(lkey)>-1) { //lhs is v2, rhs is 1, skip
								continue;
							} else {
								//remove branch from the same tree but not the same branch
								if (sameBranch(pairDic, lhse, rhse)) rarray.push(/*lhse+'->'+lhse + ' '+rhse*/new Rule(lhse,lhse + ' '+rhse));
								else if (diffTree(stringDic,lhse,rhse)) rarray.push(/*lhse+'->'+lhse + ' '+rhse*/new Rule(lhse,lhse + ' '+rhse));
							}
						}
						
						for (rhse1 of rhs) {
							var chars1 = rhse1.split(' ');
							if(chars1.length==3 && v2.indexOf(lkey)>-1) {
								for (rhse2 of rhs) {
									if(rhse1==rhse2) continue;
									var chars2 = rhse2.split(' ');
									if (chars2.length == 3){
										var rhsec = '[ '+chars1[1]+' '+chars2[1]+' ]';
										var rhset = '[ '+chars2[1]+' '+chars1[1]+' ]';
										if (sameBranch(pairDic, lhse, rhsec)) rarray.push(new Rule(lhse,lhse + ' '+rhsec));
										else if (diffTree(stringDic,lhse,rhsec)) rarray.push(new Rule(lhse,lhse + ' '+rhsec));
										if (sameBranch(pairDic, lhse, rhset)) rarray.push(new Rule(lhse,lhse + ' '+rhset));
										else if (diffTree(stringDic,lhse,rhset)) rarray.push(new Rule(lhse,lhse + ' '+rhset));
									} else if (chars2.length == 4) {
										chars2.shift();
										chars2.pop();
										for (charse2 of chars2) {
											var rhsec = '[ '+chars1[1]+' '+charse2+' ]';
											var rhset = '[ '+charse2+' '+chars1[1]+' ]';
											if (sameBranch(pairDic, lhse, rhsec)) rarray.push(new Rule(lhse,lhse + ' '+rhsec));
											else if (diffTree(stringDic,lhse,rhsec)) rarray.push(new Rule(lhse,lhse + ' '+rhsec));
											if (sameBranch(pairDic, lhse, rhset)) rarray.push(new Rule(lhse,lhse + ' '+rhset));
											else if (diffTree(stringDic,lhse,rhset)) rarray.push(new Rule(lhse,lhse + ' '+rhset));
										}
									}
								}
								
							}
							
						}
					}
					
				}
				if(rarray.length>0) for(ri of rarray) rdepth.push(ri);
			}
			
		}
		
		rulesg.push(rdepth);
		
	}
	
	console.log(rulesg)
	
    var gts = seeds.slice(0);
    
	for (var i=rulesg.length-1;i>0;i=rulesg.length-1) {//every depth (traversed order)
        var i=rulesg.length-1

        var temprs = [];
        var incompleters = [];
        var k = i-1;

        //decompose prev depth
        for(var l=0;l<rulesg[k].length;l++) {//every data of prev depth

            if(isCompleteRule(rulesg[k][l])) temprs.push(rulesg[k][l]);//push complete rules (rhs's [1+]nodes are leaf nodes) into temprs
            else incompleters.push(rulesg[k][l]);//push incomplete rules into incompleters
            
        }
        
        for (r of incompleters) {//every rules of incomplete
            
                var rs = r.rhs.split(' ');
                arrayRemove(rs,'[');
                arrayRemove(rs,']');
                var rs1 = rs.shift();
                                
                var new_rs = [];
                for (chars of rs) {
                    
                    if(chars.indexOf('e')==0)//leave node
                        continue;
                    var rep = [];
                    
                    for( rr of rulesg[i]) {
                        
                        if(rr.lhs == chars) {

                            rep.push(rr.applyTo(chars));
                        }
                    }
                    if(rep.length>0) new_rs.push(rep);
                }

                if(new_rs.length == 1) {//one incomplete
                    //console.log('fixing 1-node incomplete');
                    for(p_new_rs of new_rs[0]) {
                        //console.log('replacement: '+p_new_rs);
                        var rstemp = rs.slice(0);
                        //console.log('checking nodes '+rstemp);
                        for (var j=0;j<rstemp.length;j++) {
                            if(rstemp[j].indexOf('e')==0) {
								//console.log(rstemp[j]+' is complete node');
								continue;
							}
                            //console.log(rstemp[j]+' is incomplete node! fixing...');
                            //console.log(rstemp[j]+' is replaced with '+p_new_rs);
                            rstemp[j] = p_new_rs;
                        }
                        temprs.push(new Rule(r.lhs,rs1+' [ ' + rstemp.join(' ') + ' ]')); 
                    }
                }
                else if(new_rs.length == 2 ) {//two incompletes
                    //console.log('fixing 2-node incomplete');
                    for(p_new_rs of new_rs[0]) {
                        //console.log('replacement: '+p_new_rs);
                        var rstemp = rs.slice(0);
                        //console.log(rstemp[0]+' is replaced with '+p_new_rs);
                        rstemp[0] = p_new_rs;

                        for(p1_new_rs of new_rs[1]) {
                            //console.log('replacement: '+p1_new_rs);
                            //console.log(rstemp[1]+' is replaced with '+p1_new_rs);
                            rstemp[1] = p1_new_rs;
                            temprs.push(new Rule(r.lhs,rs1+' [ ' + rstemp.join(' ') + ' ]'));
                        }
 
                    }
                
                }

            
        }

        if(temprs.length>0) {
            rulesg.pop();//remove cur depth
            rulesg.pop();//remove pre depth
            rulesg.push(temprs);//append new depth
        }
        //console.log(temprs)
        //console.log(incompleters);
        console.log(rulesg)
    }        
    
    for(var i=0;i<rulesg[0].length;i++) {
        //console.log('check if repeating')
        for (s of stringDic) {
            if(rulesg[0][i].rhs == s) {
                //console.log('remove repeating results: '+rulesg[0][i].rhs)
                rulesg[0].splice(i,1);
            }
        } 
    }
    rulesa = rulesg[0];
    
    //string kernel rank/choose
    for (r of rulesa){
        r.w = [];
		
        for (s of stringDic)
			r.w.push(stringKernel(r.rhs,s))
        var sum = r.w.reduce(function (x, y) {
            return x + y;
        });
		
        for (var i=0;i<r.w.length;i++) r.w[i]/=sum;
        r.dis = arrayDisE(r.w,ws);
	
    }
    rulesa.sort(function(a,b){ return a.dis-b.dis});

    //console.log('4 results with nearest euler distance to your weights obtained: ')
    for (r of rulesa.slice(0,1)) {
		console.log(r.w)
        console.log(r.dis+' : '+ r.rhs)
        results.push(new Element().fromString(r.rhs));  
    }
    
    return results;
	//console.log(gts)
    /******** mix of trees
    assume:
    t1 = a[b[e2 e3] e1]
    t2 = f[g[e4 e5]h[e6 e7]]
    t3 = m[n[e8]]

    ts' rules     depth1-2		depth2-3
    t1's rules = [ a->[b e1]
    							b->b[e2 e3]
    			 ]
    			 
    t2's rules = [ f->[g h]
    							[ g->g[e4 e5]
    							h->[e6 e7] ] 
    			 ]
    			 
    t3's rules = [ m->[n]
    							n->[e8] 
    			 ]
    
    root		depth1-2	depth2-3
    --> a --> a[b e1] --> a[b[e2 e3] e1] denied: the same as t1
    			      --> a[b[e4 e5] e1] accepted
    				  --> a[b[e6 e7] e1] accepted
    				  --> a[b[e8] e1] denied: b is a v2 key
    						   
    	  --> a[g h]  --> a[g[e2 e3] h] --> a[g[e2 e3]] h[e2 e3]] accepted
    								    --> a[g[e2 e3]] h[e6 e7]] accepted
    								    --> a[g[e2 e3]] h[e8]] denied: h is a v2 key
    												 
    	              --> a[g[e4 e5]] h] --> a[g[e4 e5]] h[e2 e3]] accepted
    								  --> a[g[e4 e5]] h[e6 e7]] accepted
    								  --> a[g[e4 e5]] h[e8]] denied: h is a v2 key
    								  
    	              --> a[g[e8] h] break: g is a v2 key
    						   
          --> a[n] denied: a is a v2 key
    		   
    --> f --> f[b e1] --> f[b[e2 e3] e1] accepted
    				  --> f[b[e4 e5]] e1] accepted
    				  --> f[b[e6 e7]] e1] accepted
    				  --> f[b[e8] e1] denied: b is a v2 key
    						   
    	  --> f[g h]  --> f[g[e2 e3] h] --> f[g[e2 e3]] h[e2 e3]] accepted
    								    --> f[g[e2 e3]] h[e6 e7]] accepted
    								    --> f[g[e2 e3]] h[e8]] denied: h is a v2 key
    												 
    				  --> f[g[e4 e5]] h] --> f[g[e4 e5]] h[e2 e3]] accepted
    									 --> f[g[e4 e5]] h[e6 e7]] denied: the same as t2
    									 --> f[g[e4 e5]] h[e8]] denied: h is a v2 key
    												 
    				  --> f[g[e8] h] denied: g is a v2 key
    						   
    	  --> f[n] denied: a is a v2 key
    		   
    --> m --> m[b c] break: a is a v1 key
    	  --> m[g h] break: a is a v1 key
    	  --> m[n]    -->m[n[e8]] denied: the same as t3
    		   
    ********/

}

var mixnew = function (trees,ws) {

    var r = new Element();
    var results;
    var ths = [];//trees' hierarchies
    var h = [];//ths^T: combined vector based on hierarchies' depth
	var rulesa = [];//array of rules arrays to be applied
	var rulesg = [];//rules array generated
	var pairDic = [];//trees' min trees' strings
	var stringDic = [];//trees' strings
    var seeds = [];//trees' roots
	
    for (t of trees) {
        tstring = t.toString(false);
		stringDic.push(tstring);
        seeds.push(tstring.split(' ')[0]);
		pairDic.push(t.toStrMin());
		ths.push(t.parseHierarchies());
	}
    //console.log(ths)
	//console.log(pairDic)
	
	var deepest = Math.max.apply(null,ths.map(function (i){return i.length}));

	for (var i=0;i<deepest;i++) {
		var hi = [];
		for (t of ths) {

			var temp = t[i]?t[i]:[];
			if (temp.length!=0) {
                for (tempi of temp) {
                    var temp_array = tempi.split(' ');
                    //console.log(temp_array)
                    for (tempi_array of temp_array)
                        if (tempi_array != '[' && tempi_array != ']')
                            hi.push(tempi_array);
                }
            }
		}
        //console.log(hi)
		if(hi.length!=0) h.push(hi);
		
	}
    console.log(h);
	var rules = [];
    for (var i=0; i<h.length-1;i++) {//every level
        var k=i+1;
        var rules_level = [];
        for (var j=0;j<h[i].length;j++) {//every node of current level
            var lhs = h[i][j].split('_')[0];
            //console.log(lhs)
            if (v1.indexOf(lhs)>-1) {// 1-valence feature, matches 1 node from next level
                for (var l=0;l<h[k].length;l++){//every node of next level
                    //lhs and rhs are from the same branch, accept
                    if(parentAndChildren(pairDic,h[i][j],h[k][l])) rules_level.push(new Rule(h[i][j],h[i][j] + ' [ '+h[k][l]+' ]'));
                    //lhs and rhs are from different branch
                    //then if lhs and rhs are from different tree, accept
                    else if (diffTree(stringDic,h[i][j],h[k][l])) rules_level.push(new Rule(h[i][j],h[i][j] + ' [ '+h[k][l]+' ]'));
                    //after that, lhs and rhs from the same tree but different branch won't be accepted, for they are in-tree blending
                }
            }
            else if (v2.indexOf(lhs)>-1) {  // 2-valence feature, matches 2 nodes from next level
                for (var l=0;l<h[k].length;l++) {//every node of next level
                    for (var m=0;m<h[k].length;m++) {//every node of next level
                        if (m==l) continue; // get rid of repeats
                        else {
							if(!subjectAndObject(pairDic,h[k][l],h[k][m])) continue;
                            //rhs1 and rhs2 are from the same tree
                            if(!diffTree(stringDic,h[k][l],h[k][m])) {
								
                                // same tree and brothers
                                if(sameBranch(pairDic,h[k][l],h[k][m])) {
									//console.log(h[k][l],h[k][m])
                                    //brothers and parent are from the same branch, accept
                                    if(parentAndChildren(pairDic,h[i][j],h[k][l])) {
                                        rules_level.push(new Rule(h[i][j],h[i][j] + ' [ '+h[k][l]+' '+ h[k][m]+' ]'));
                                    } else {
                                    //brothers and parent are not from the same branch
                                        //they are also from different tree, accept
                                        if (diffTree(stringDic,h[i][j],h[k][l])) rules_level.push(new Rule(h[i][j],h[i][j] + ' [ '+h[k][l]+' '+ h[k][m]+' ]'));
                                    }
                                }
                                
                            } else {//rhs1 and rhs2 are from different tree
                                //rhs1 and parent are from different tree
                                if (diffTree(stringDic,h[i][j],h[k][l])){
                                    //rhs2 and parent are from different tree, accept
                                    if(diffTree(stringDic,h[i][j],h[k][m])) rules_level.push(new Rule(h[i][j],h[i][j] + ' [ '+h[k][l]+' '+ h[k][m]+' ]'));
                                    else {  //rhs2 and parent are from the same tree
                                        //rhs2 and parent, same tree, same branch, accept
                                        if(parentAndChildren(pairDic,h[i][j],h[k][m])) {
                                            rules_level.push(new Rule(h[i][j],h[i][j] + ' [ '+h[k][l]+' '+ h[k][m]+' ]'));
                                        }
                                    }
                                    
                                } else {    //rhs1 and parent are from the same tree
                                    //rhs1,parent, same tree, same branch, accept
                                    if (parentAndChildren(pairDic,h[i][j],h[k][l])) {
                                        rules_level.push(new Rule(h[i][j],h[i][j] + ' [ '+h[k][l]+' '+ h[k][m]+' ]'));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        rules.push(rules_level);
    }
    console.log(rules)

    for (var i=rules.length-1;i>0;i=rules.length-1) {//every depth (traversed order)
        var i=rules.length-1

        var temprs = [];
        var incompleters = [];
        var k = i-1;

        //decompose prev depth
        for(var l=0;l<rules[k].length;l++) {//every data of prev depth

            if(isCompleteRule(rules[k][l])) temprs.push(rules[k][l]);//push complete rules (rhs's [1+]nodes are leaf nodes) into temprs
            else incompleters.push(rules[k][l]);//push incomplete rules into incompleters
            
        }
        
        for (r of incompleters) {//every rules of incomplete
            
                var rs = r.rhs.split(' ');
                arrayRemove(rs,'[');
                arrayRemove(rs,']');
                var rs1 = rs.shift();
                                
                var new_rs = [];
                for (chars of rs) {
                    
                    if(chars.indexOf('e')==0)//leave node
                        continue;
                    var rep = [];
                    
                    for( rr of rules[i]) {
                        
                        if(rr.lhs == chars) {

                            rep.push(rr.applyTo(chars));
                        }
                    }
                    if(rep.length>0) new_rs.push(rep);
                }

                if(new_rs.length == 1) {//one incomplete
                    //console.log('fixing 1-node incomplete');
                    for(p_new_rs of new_rs[0]) {
                        //console.log('replacement: '+p_new_rs);
                        var rstemp = rs.slice(0);
                        //console.log('checking nodes '+rstemp);
                        for (var j=0;j<rstemp.length;j++) {
                            if(rstemp[j].indexOf('e')==0) {
								//console.log(rstemp[j]+' is complete node');
								continue;
							}
                            //console.log(rstemp[j]+' is incomplete node! fixing...');
                            //console.log(rstemp[j]+' is replaced with '+p_new_rs);
                            rstemp[j] = p_new_rs;
                        }
                        temprs.push(new Rule(r.lhs,rs1+' [ ' + rstemp.join(' ') + ' ]')); 
                    }
                }
                else if(new_rs.length == 2 ) {//two incompletes
                    //console.log('fixing 2-node incomplete');
                    for(p_new_rs of new_rs[0]) {
                        //console.log('replacement: '+p_new_rs);
                        var rstemp = rs.slice(0);
                        //console.log(rstemp[0]+' is replaced with '+p_new_rs);
                        rstemp[0] = p_new_rs;

                        for(p1_new_rs of new_rs[1]) {
                            //console.log('replacement: '+p1_new_rs);
                            //console.log(rstemp[1]+' is replaced with '+p1_new_rs);
                            rstemp[1] = p1_new_rs;
                            temprs.push(new Rule(r.lhs,rs1+' [ ' + rstemp.join(' ') + ' ]'));
                        }
 
                    }
                
                }

            
        }

        if(temprs.length>0) {
            rules.pop();//remove cur depth
            rules.pop();//remove pre depth
            rules.push(temprs);//append new depth
        }
        //console.log(temprs)
        //console.log(incompleters);
        //console.log(rules)
    }
    
    for(var i=0;i<rules[0].length;i++) {
        //console.log('check if repeating')
        for (s of stringDic) {
            if(rules[0][i].rhs == s) {
                //console.log('remove repeating results: '+rules[0][i].rhs)
                rules[0].splice(i,1);
            }
        } 
    }
    console.log(rules[0]);
	
	var xx = 1;
    for (r of rules[0]){
		console.log('cal '+xx+' of '+rules[0].length)
		xx++;
        r.w = [];
		
        for (s of stringDic)
			r.w.push(stringKernel(r.rhs,s))
        var sum = r.w.reduce(function (x, y) {
            return x + y;
        });
		
        for (var i=0;i<r.w.length;i++) r.w[i]/=sum;
        r.dis = arrayDisE(r.w,ws);
	
    }
    rules[0].sort(function(a,b){ return a.dis-b.dis});

    console.log('4 results with nearest euler distance to your weights obtained: ')
	for (i=0;i<5;i++){

		results = rules[0][i].rhs;
        console.log(results)//result string
        skall = 0;
        sks = [];
        for (s of stringDic) {
            sk = stringKernel(results,s);
            sks.push(sk);
            skall += sk;
		}
		for (j=0;j< stringDic.length;j++) {
			console.log(sks[j]/skall);
		}
		console.log('distance:'+rules[0][i].dis)//proportions
	}
	
    /*for (r of rules[0].slice(0,1)) {
		
		console.log(r.w)
		results = r.rhs;
		console.log(results)
    }*/
    
    return results;
}