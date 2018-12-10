var  classes = require('./classes');

exports.getResourceObject = function(category,next){
	if(category =='education'){
		return next(null,new classes());
	}
	return next(new Error('InvalidCategory'));
};