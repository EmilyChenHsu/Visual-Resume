<!DOCTYPE HTML>
<meta charset="utf-8">
<html>
    <head>
    
        <title>Visual Resume</title>
		
        <link rel='stylesheet' type='text/css' href='vr.css' />
		<link rel='stylesheet' type='text/css' href='resources/tipsy/src/stylesheets/tipsy.css' />
        
        <script src="resources/d3.v3.min.js"></script>
        <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
		<script type="text/javascript" src="resources/underscore-min.js"></script>
		<script type="text/javascript" src="resources/comma.js"></script>
		<script type="text/javascript" src="short_chart.js"></script>
		<script type="text/javascript" src="pie_chart.js"></script>
		<script type="text/javascript" src="random_tools.js"></script>
		
		<script type="text/javascript" src="resources/tipsy/src/javascripts/jquery.tipsy.js"></script>
		
		<script src="resources/crossfilter/crossfilter.min.js"></script>
		<script src="tile.js"></script>
		<script src="empty_graph.js"></script>
		<script src="data_format.js"></script>
		<script src="redraw.js"></script>
		<script src="legend.js"></script>
	        
	</head>
								
    <body>
		
		<form name='user_search' action='handler.php' method='post'>
			
			<input type='text' name='search_input'>	
			<input type='submit' value='Search!'>

		</form>
		
		<div class="leftBox">
		<h3>GitHub</h3>
		<a href="javascript:tile('Data/gh_data_9582.json', 'gh_all', null);">Jose Valim</a>
		<br>
		<a href="javascript:tile('Data/gh_data_3359.json', 'gh_all', null);">Emilio Tagua</a>
		<br>
		<a href="javascript:tile('Data/gh_data_3387.json', 'gh_all', null);">Xavier Noria</a>
		<br>
		<a href="javascript:tile('Data/gh_data_137.json', 'gh_all', null);">Joshua Peek</a>
		<h3>Stack Overflow</h3>
		<a href="javascript:tile('Data/so_data_1968.json', 'so_all', null);">Konrad Rudolph</a>
		<br>
		<a href="javascript:tile('Data/so_data_588267.json', 'so_all', null);">Jose Valim</a>
		<br>
		<a href="javascript:tile('Data/so_data_50742.json', 'so_all', null);">Chuck</a>
		<!--<br>
		<a href="javascript:tile('Data/test.json', 'so_all', null);">test</a>-->
		</div>
		<?php
		
			if(isset($_POST['userID']) && isset($_POST['displayName']))
			{
				echo '<script>tile(\'Data/so_data_' . $_POST['userID'] . '.json\', \'so_all\');</script>';
			}
		
		?>
		
		<script>
			// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
			// Begin global graph size variables ==>
			// ===== ===== ===== ===== ===== ===== ===== ===== ===== //

				var global_margin = {top: 20, right: 20, bottom: 20, left: 45},
					global_width = 300 - global_margin.left - global_margin.right,
					global_height = 145 - global_margin.top - global_margin.bottom;
					
			// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
			// End global graph size variables <==
			// ===== ===== ===== ===== ===== ===== ===== ===== ===== //


			var global_start_date = '2008-03';
			var global_end_date = '2012-05',
				global_month_count = 50;
			
			var global_ready_mouseup = false;
			var global_mousedown = false;
			var global_id = null;
			var global_data = new Array();
			var global_highlight = null;
			
			var global_date_range = null;  //
			var global_stacked_y_max_array = new Array();
			var global_stacked_y_max = 0;
			
			var global_grouped_y_max_array = new Array();
			var global_grouped_y_max = 0;
			
			var global_bar_offset = 0;
			
			var global_grouped = false;
			
			d3.select('html')
				.on("mouseup", function()
					{
						global_mousedown = false;
						if(global_ready_mouseup)
						{
							global_ready_mouseup = false;
							global_data.forEach(function(d)
								{
									var temp_data = d[0];
									var temp_tileID = d[1];
									var cf = crossfilter(temp_data);
									set_date_range(temp_data);
									var cf = cf.dimension(function(d) { return d.fullDate; });
									var temp_data = cf.filterRange([global_date_range[0],global_date_range[1]]).top(Infinity);
									redraw(temp_data, temp_tileID, "stacked");
									redraw(temp_data, temp_tileID, "grouped");
								});
						}
						
					})
				.on("mousedown", function() { global_mousedown = true; });
				
		</script>
		
    </body>
		
</html>