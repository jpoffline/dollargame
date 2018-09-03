var game_dollar;

function generate_n_random_integers(n, range=5){
	var res = [];
	for(var i = 0; i < n; i++){
		res.push(Math.floor(Math.random() * 2*range - range-1) + 1);
	}
	console.log(res);
	return res;
}

function layoutNode(count){
	layouts = {
		'4':[
			{'top':200, 'left':100},
			{'top':350, 'left':400},
			{'top':500, 'left':400},
			{'top':200, 'left':700}
		]
	};
	return layouts[count];
}

function connectComplete(count){
	connections = {
		'4':[
			[0, 1], [0, 2], [0, 3], [1,2], [1,3], [2,3]
		]
	};
	return connections[count];
}


window.setupGame = function () {

	var edges = connectComplete(4);

	var nodeLocations = layoutNode(4);

	var initialValues = generate_n_random_integers(nodeLocations.length);

	game_dollar = new DollarGame(nodeLocations, edges, initialValues);

}