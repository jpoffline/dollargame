
function draw_node(props)
{
	loc='top: '+props['top']+'px; left: '+props['left']+'px;';
	return '<div id="'+props['id']+
		'" style="'+loc+
		'" class="'+props['class']+
		'">'+props['body']+'</div>';
}

function draw_node_actions(id){
	return '<table class="node_actions"><tr>'+
	'<td onClick="clickNodeGive('+id+');" class="node_action give">'+to_icon('plus-circle')+' Give</td>'+
	'<td onClick="clickNodeTake('+id+');"class="node_action take">'+to_icon('minus-circle')+' Take</td>'+
	'</tr></table>';
}

function draw_nodes(divs){
	html = '';
	count = 0;
	divs.forEach(function(div){
		html += draw_node(
			{
				'top'   : div['top'],
				'left'  : div['left'],
				'body'  : '<div id="'+'node-value-'+count+'"class="node_value">'+div['value']+'</div>'+
						   '<div class="tbl_container">'+
						   draw_node_actions(count)+
						   '</div>',
				'id'    : 'node-container-'+count,
				'class' : 'node'
			}
		);
		count = count + 1;
	
	});
	return html;
}

