var Recipe = require("../models/recipeModel.js");

module.exports = {
	
	create :
		function(req, res){
			var newRecipe = new Recipe({
				'recipe': req.body.recipe,
				'prev': req.body.prev,
				'owner': req.body.owner,
				'name': req.body.name
			});
			newRecipe.save();
			res.send(true);
		},
	
	
	read :
		function(req, res){
			var recipe_id = req.body.recipe;
			Recipe.find({'id':req.body.id}, function( err, docs ) {
				if( err ) {
					var response = {
						status: "Error",
						data: err
					};
				} else {
					if( docs == null ) {
						var response = {
							status: "Failure",
							data: "Fuck you, from read"
						};
					} else {
						var response = {
							status: "Success",
							data: docs
						};
					}
				}
			});
			res.send( response );
		},
	
	
	update :
		function(req, res){
			
		},


	destroy :
		function(req, res){
			var recipe_id = req.body.id;
			Recipe.find( {'id': new ObjectId(recipe_id)}, function( err, docs ) {
				if( err ) {
					var response = {
						status: "Error",
						data: err
					};
				} else {
					if( docs == null ) {
						var response = {
							status: "Failure",
							data: false
						};
					} else {
						var response = {
							status: "Success",
							data: true
						};
						docs.remove();
					}
				}
			});
			res.send( response );
		}
}
