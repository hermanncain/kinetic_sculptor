var Rule = function (lhs,rhs) {

	this.lhs = lhs;
	this.rhs = rhs;

};

Rule.prototype = {

	applyTo: function (string) {
		
		var s = this.lhs;
		s = s.replace(/\[/g,'\\[');
		s = s.replace(/\]/g,'\\]');
		s = s.replace(/\*/g,'\\*');

		return string.replace(new RegExp(s, 'g'),this.rhs);

	}

};