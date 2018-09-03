
class DollarNode {

	constructor(id, value, edges) {
		this._id = id;
		this._value = value;
		this._edges = edges;
		this._count_edges = edges.length;
		console.log("creating node: " + this._id + " nedges: " + this._count_edges + " value: " + this._value);
		this.render_value();
	}

	print_value()
	{
		console.log("node: " + this._id + " // value: " + this._value);
	}

	is_positive()
	{
		return parseInt(this._value) >= 0;
	}

	receive() {
		this._value += 1;
		this.render_value();
	}

	reduce(){
		this._value -=1;
		this.render_value();
	}

	give() {
		this._value -= this._count_edges;
		this.render_value();
		return this._edges;
	}

	take(){
		this._value += this._count_edges;
		this.render_value();
		return this._edges;
	}

	render_value(){
		this.print_value();
		console.log(document.getElementById("node-value-"+this._id).innerHTML);
		document.getElementById("node-value-"+this._id).innerHTML = this._value;
		if(this.is_positive())
		{
			document.getElementById("node-container-" + this._id).classList.remove('val-negative');
			document.getElementById("node-container-" + this._id).classList.add('val-positive');
		}else
		{
			document.getElementById("node-container-" + this._id).classList.remove('val-positive');
			document.getElementById("node-container-" + this._id).classList.add('val-negative');
		}
		
	}

}


class DollarGame {

	constructor(nodeLocations, e, initialValues) {
		
		this.count_moves = 0;
		this.setupGame(e, initialValues, nodeLocations);
		this.graphGenus = nodeLocations.length - e.length + 1;
		this.updateGameStatus();
		
		var totalValue = initialValues.reduce((a, b) => a + b, 0);

		document.getElementById("game-graphinfo").innerHTML = 'Is winnable? '  + this.is_winnable(this.graphGenus, totalValue) + 
		' (graph genus: ' + this.graphGenus + 
		', total budget: ' + totalValue + ')' ;
	}

	is_winnable(genus, totalValue)
	{
		return totalValue >= genus ? to_icon('check-circle') : to_icon('times-circle') ;
	}

	setupGame(e, initialValues, nodeLocations){

		document.getElementById('game-node-location').innerHTML = draw_nodes(nodeLocations);

		function getAllIndexes(arr, val) {
			var indexes = [];
			for(var e = 0; e < arr.length; e++){
				if(arr[e][0] == val)
				{
					indexes.push(arr[e][1]);
				}
				if(arr[e][1] == val)
				{
					indexes.push(arr[e][0]);
				}
			}
			return indexes;
		}

		var initialConfig = [];
		for(var i = 0; i < initialValues.length; i++){
			var idx = getAllIndexes(e, i);
			initialConfig.push([initialValues[i], idx]);
		}

		var n = initialConfig;
		this.edges = [];
		for (var i = 0; i < initialConfig.length; i++) {

			this.edges.push(
				new DollarNode(
					i,
					initialConfig[i][0],
					initialConfig[i][1]
				)
			);
		}

		

		e.forEach(function (edge) {
			connectDivs('node-container-' + edge[0], 'node-container-' + edge[1]);
		});
	}

	instruct_give(idx) {
		this.count_moves+=1;
		var to_give_idx = this.edges[idx].give();
		for (var e = 0; e < to_give_idx.length; e ++) {
			this.instruct_receive(to_give_idx[e]);
		}
		this.updateGameStatus();
		
	}

	instruct_receive(idx) {
		this.edges[idx].receive();
		this.updateGameStatus();
	}

	instruct_take(idx){
		this.count_moves+=1;
		var to_takefrom_idx = this.edges[idx].take();
		for(var e = 0; e < to_takefrom_idx.length; e++){
			this.edges[to_takefrom_idx[e]].reduce();
		}
		this.updateGameStatus();
		
	}

	print_nodes(){
		this.edges.forEach(function(e){e.print_value();})
	}

	updateGameStatus(){
		var passed = true;
		for(var e = 0; e < this.edges.length; e++)
		{
			if(!this.edges[e].is_positive())
			{
				passed = false;
				break
			}
		}

		
		document.getElementById("game-state").innerHTML = "Moves: " + this.count_moves 
			+ " Have you won? " + ( passed ? 
		    to_icon('check-circle-o') + " yes" :
			to_icon('ban') +" no");


	}

	

}

clickNodeGive = function(id)
{
	game_dollar.instruct_give(id);
}

clickNodeTake = function(id)
{
	game_dollar.instruct_take(id);
}

