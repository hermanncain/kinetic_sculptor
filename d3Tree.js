var d3Tree = function (data) {
	
	this.data = data;
  
	this.tree = d3.layout.tree()  
		.size([500,200]);
	
	this.svg = d3.select("body").append("svg")
		.attr('id','svgport')
		.attr("width",300)  
		.attr("height",300) 
		.attr("transform","translate(500,50)")
		.append("g")
		.attr('id','tree')
		.attr("transform","translate(-150,20)");
		
};

d3Tree.prototype = {
	
	draw: function () {
		
		var nodes = this.tree.nodes(this.data);
		var links = this.tree.links(nodes);  
		
		//draw splines
		var line = this.svg.selectAll("link")  
			.data(links)  
			.enter()  
			.append("path")  
			.attr("class","link")  
			.attr("d",d3.svg.diagonal().projection(function(d){return [d.x, d.y]})); 
		
		//draw nodes
		var node = this.svg.selectAll(".node")  
			.data(nodes)  
			.enter()  
			.append("g")  
			.attr("class","node")  
			.attr("transform",function(d){return "translate("+ d.x+","+ d.y+")"});
		
		//draw nodes' circle
		node.append("circle")  
			.attr("r",10);
		
		//draw nodes' text 
		node.append("text")  
			.attr("dx",function(d){return /*d.children?-15:*/15;})  
			.attr("dy",5)  
			.style("text-anchor", function (d) {return /*d.children?"end":*/"start"})  
			.text(function (d) {
				var texts = d.para.split('_');
				if(texts.length == 1)return texts[0];
				else return texts[0]+'('+texts[1]+')';
			});
		node.append('text')
			.attr('dx',function(d){return 15;})  
			.attr("dy",25)  
			.style("text-anchor", function (d) {return "start"})
			.text(function (d) {
				var texts = d.para.split('_');
				if (texts.length==3) return '( '+texts[2]+' )';
			});
	},
	
	resizeTree: function (w,h) {
		
		document.getElementById('tree').setAttribute('width',w);
		document.getElementById('tree').setAttribute('height',h);
		
	},
	
	resizeSvg: function (w,h) {
		
		document.getElementById('svgport').setAttribute('width',w);
		document.getElementById('svgport').setAttribute('height',h);
		
	},
	
	relocateSvg: function (x,y) {

		document.getElementById('svgport').setAttribute('transform','translate(' + x + ',' + y +')');
		
	},
	
	clear: function () {
		
		while(this.svg[0][0].children.length>0) this.svg[0][0].removeChild(this.svg[0][0].children[0]);
		
	},
	
	update: function (data){
		
		this.data = data;
		this.clear();
		this.draw();
		
	}
};