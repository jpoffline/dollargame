<html>
<head>
	<?php
		require_once('../../php/db_site_audit.php');
		$audit = new SiteAudit('../../datastore/sql/');
		$audit->do_login($_SERVER['REQUEST_URI']);
	?>
<link rel="stylesheet" href="src/css/style.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
	
	
	<div class="game-control">
		<div>
			<div class="game-title">Dollar game</div>
			<div class="game-explanation">Goal: make all vertices positive</div>
		</div>
		<button class="btn btn-primary" onclick="setupGame();">Begin game</button>
		<div class="game-state" id = "game-graphinfo"></div>
		<div class="game-state" id = "game-state"></div>
		
		
	</div>

	<div id="game-node-location"></div>

	<script src="src/js/app.js"></script>
	<script src="src/js/components/node/dollar-node.js"></script>
	<script src="src/js/components/icons/icons.js"></script>
	<script src="src/js/drawing/nodes.js"></script>
	<script src="src/js/drawing/connect.js"></script>
	
	
</body>
</html>