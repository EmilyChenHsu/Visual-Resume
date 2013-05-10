<!DOCTYPE HTML>
<meta charset="utf-8">
<html>
    <head>
    
        <title>Visual Resume Demo</title>
		
        <link rel='stylesheet' type='text/css' href='vr.css' />
		<link rel='stylesheet' type='text/css' href='resources/tipsy/src/stylesheets/tipsy.css' />
        
        <script src="resources/d3.v3.min.js"></script>
		<!--<script src="resources/d3.js"></script>-->
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
		
		<div class="leftBox">
		<h3>GitHub</h3>

		<a href="javascript:tile('Data/gh_data_9582.json', 'gh_all', null);">Jose Valim</a>
		<br>
		<a href="javascript:tile('Data/gh_data_137.json', 'gh_all', null);">Joshua Peek</a>


		<h3>Stack Overflow</h3>

		<a href="javascript:tile('Data/tso_data_1968.json', 'so_all', null);">Konrad Rudolph</a>
		<br>
		<a href="javascript:tile('Data/tso_data_50742.json', 'so_all', null);">Chuck</a>

		</div>
		
		<script>
			// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
			// Begin global graph size variables ==>
			// ===== ===== ===== ===== ===== ===== ===== ===== ===== //

				var global_margin = {top: 23, right: 20, bottom: 20, left: 45},
					global_width = 300 - global_margin.left - global_margin.right,
					global_height = 145 - global_margin.top - global_margin.bottom;
					
			// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
			// End global graph size variables <==
			// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
			
			// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
			// Begin global styling variables ==>
			// ===== ===== ===== ===== ===== ===== ===== ===== ===== //

				var global_name_font_size = '16px';
				// Not really styling, but whatever..
				var global_timeout = 100;
					
			// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
			// End global graph size variables <==
			// ===== ===== ===== ===== ===== ===== ===== ===== ===== //

			var global_coordinates = new Array();
				var temp_count = 0;
				var temp_column = 0;
				for(var i = 0; i < 30; i++)
				{
					if(i % 3 === 0 && i !== 0)
					{
						temp_column = 0;
						temp_count++;
					}
					global_coordinates[i] =
					{
						top: 120 + (temp_count * 560),
						left: 150 + (temp_column * 370),
						occupied: false,
						num: i,
						id: null
					}
					
					if((i + 1) % 3 !== 0)
					{
						d3.select('body')
							.append('div')
							.attr('class', 'switch')
							.style('top', (global_coordinates[i].top + 250) + 'px')
							.style('left', (global_coordinates[i].left + 310) + 'px')
						.append('img')
							.attr('src', 'media/left_right.png')
							.attr('id', 'left_right_' + i)
							.on('click', function()
								{
									var temp_num = this.id.split('_');
									var temp_first = temp_num[2];
									var temp_second = +temp_first + 1;
									
									exchange(temp_first,temp_second);
								})
							.on('mouseover', function()
								{
									 d3.select(this).style("opacity",".4");	
								})
							.on('mouseout', function()
								{
									 d3.select(this).style("opacity","1");	
								});
					}
					
					//if((i + 1) % 3 !== 0)
					{
						d3.select('body')
							.append('div')
							.attr('class', 'switch')
							.style('top', (global_coordinates[i].top + 490) + 'px')
							.style('left', (global_coordinates[i].left + 135) + 'px')
						.append('img')
							.attr('src', 'media/up_down.png')
							.attr('id', 'up_down_' + i)
							.on('click', function()
								{
									var temp_num = this.id.split('_');
									var temp_first = temp_num[2];
									var temp_second = +temp_first + 3;
									
									exchange(temp_first,temp_second);
								})
							.on('mouseover', function()
								{
									 d3.select(this).style("opacity",".4");	
								})
							.on('mouseout', function()
								{
									 d3.select(this).style("opacity","1");	
								});
					}
					
					temp_column++;
				}
			
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
			var global_languages = false;
			
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