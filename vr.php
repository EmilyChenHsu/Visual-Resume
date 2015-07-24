<!DOCTYPE HTML>
<meta charset="utf-8">
<html>
    <head>
    
        <title>Visual Resume</title>
		
        <link rel='stylesheet' type='text/css' href='vr.css' />
		<link rel='stylesheet' type='text/css' href='resources/tipsy/src/stylesheets/tipsy.css' />
        
        <!--<script src="resources/d3.v3.min.js"></script>-->
		<script src="resources/d3.js"></script>
        <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
		<script type="text/javascript" src="resources/underscore-min.js"></script>
		<script type="text/javascript" src="resources/comma.js"></script>
		<script type="text/javascript" src="short_chart.js"></script>
		<script type="text/javascript" src="pie_chart.js"></script>
		<script type="text/javascript" src="random_tools.js"></script>
		<script type="text/javascript" src="drag_drop.js"></script>
		
		<script type="text/javascript" src="resources/tipsy/src/javascripts/jquery.tipsy.js"></script>
		
		<script src="resources/crossfilter/crossfilter.min.js"></script>
		<script src="tile.js"></script>
		<script src="empty_graph.js"></script>
		<script src="data_format.js"></script>
		<script src="redraw.js"></script>
		<script src="legend.js"></script>
	        
	</head>
								
    <body>
		
		<!--
		<form name='user_search' action='handler.php' method='post'>
			
			<input type='text' name='search_input'>	
			<input type='submit' value='Search!'>

		</form>
		-->
		
		<div class="top">
			
			<table>
				<tr>
					<td colspan='4' class="end" style="border-bottom: solid"><b>Tile Re-arrangement</b></td>
				</tr>
				<tr>
					<td><a href="javascript:rearrange_tiles('user');">By User</a></td>
					<td><a href="javascript:rearrange_tiles('gh_first');">GitHub First</a></td>
					<td><a href="javascript:rearrange_tiles('so_first');">Stack Overflow First</a></td>
					<td class="end"><a href="javascript:rearrange_tiles('gap');">Fill Spaces</a></td>
				</tr>
			</table>
			
		</div>
		<div class="lefttop" id="lefttop">
			<b><label for="sortoptions"> Sort candidates by:</label></b><br/>
			<select name="sortoptions" id="sortoptions" onChange="sortSelection()">
				<option> Select an option</option>
				<option> Activities in GitHub</option>
				<option> Commits in GitHub</option>
				<option> Activities in Stack Overflow</option>
				<option> Answers in Stack Overflow</option>
			</select>
		</div>
		
		<div class="leftBox" id="leftBox">
		<h3>Aaron Patterson</h3>
		<a href="javascript:tile('Data/tgh_data_2.json', 'gh_all', null);">GitHub</a><br>
		<a href="javascript:tile('Data/tso_data_178850.json', 'so_all', null);">Stack Overflow</a><br>
		<h3>Xavier Noria</h3>
		<a href="javascript:tile('Data/tgh_data_3.json', 'gh_all', null);">GitHub</a><br>
		<a href="javascript:tile('Data/tso_data_802132.json', 'so_all', null);">Stack Overflow</a><br>
		<h3>Vijay Dev</h3>
		<a href="javascript:tile('Data/tgh_data_6.json', 'gh_all', null);">GitHub</a><br>
		<a href="javascript:tile('Data/tso_data_27474.json', 'so_all', null);">Stack Overflow</a><br>
		<h3>Piotr Sarnacki</h3>
		<a href="javascript:tile('Data/tgh_data_4.json', 'gh_all', null);">GitHub</a><br>
		<a href="javascript:tile('Data/tso_data_661200.json', 'so_all', null);">Stack Overflow</a><br>
		<h3>Yehuda Katz</h3>
		<a href="javascript:tile('Data/tgh_data_5.json', 'gh_all', null);">GitHub</a><br>
		<a href="javascript:tile('Data/tso_data_122162.json', 'so_all', null);">Stack Overflow</a><br>

		</div>
		<!--
		<?php
		/*
			if(isset($_POST['userID']) && isset($_POST['displayName']))
			{
				echo '<script>tile(\'Data/so_data_' . $_POST['userID'] . '.json\', \'so_all\');</script>';
			}
		*/
		?>
		-->
		
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
			var allghsource=["Data/tgh_data_2.json","Data/tgh_data_3.json","Data/tgh_data_6.json","Data/tgh_data_4.json","Data/tgh_data_5.json"];
			var allsosource=["Data/tso_data_178850.json","Data/tso_data_802132.json","Data/tso_data_27474.json","Data/tso_data_661200.json","Data/tso_data_122162.json"];
			//[0]='Data/tgh_data_2.json';
			//allsosource[0]='Data/tso_data_178850.json';

			var alldata=new Array();
    console.log("ghsource length: "+allghsource.length);
    //setTimeout(function(){
					
	allghsource.forEach(function(d,i){
	//for(var i=0;i<5;i++){	
        //console.log(i+": ");
        d3.json(d,function(error,data){
			var ic = toInt(data.issueCount);
            var cic = toInt(data.commitCount);
            var cc = toInt(data.commentCount);
            var citp=toInt(data.passCommit);
            var citf=toInt(data.failCommit);
            var cihc=toInt(data.highCentral);
            var cimc=toInt(data.medianCentral);
            var cilc=toInt(data.lowCentral);
            var ioi=toInt(data.openIssue);
            var ici=toInt(data.closeIssue);
            var im=toInt(data.mergedPR);
            var inm=toInt(data.nonmergedPR);
                      
            var ghtotal = ic + cic + cc;
            var passp=citp/(citp+citf);
            var mergep=im/(im+inm);
            alldata[i] =
                {
                	ghid:data.id,
                	name:data.name,
                	ghtotal:ghtotal,
                	ghissue:ic,
                	ghcommit:cic,
                	ghcomment:cc,
                	ghpassp:d3.round(passp,2),
                	ghmergep:d3.round(mergep,2),
                	ghfollower:data.followers,
                    soid:"",
                    sototal:0,
                    soquestion:0,
                    soanswer:0,
                    socomment:0,
                    soacceptp:0,
                    soreputation:0
                };
                console.log(i+": "+alldata[i].name);
		});
    });
	//setTimeout(function(){
					
    allsosource.forEach(function(d){
		d3.json(d,function(error,data){
			var qc = toInt(data.questionCount);
            var ac = toInt(data.answerCount);
            var scc = toInt(data.commentCount);
            var acc=toInt(data.acceptedCount);
            var nacc=toInt(data.nonacceptedCount);
            var soname=data.displayName;        
            var sototal = qc + ac + scc;
            var acceptp=acc/(acc+nacc);
            //console.log("alldata length: "+alldata.length);
            alldata.forEach(function(d){
            
            	if(d.name==soname){
            d.soid=data.id+"";
            d.sototal=sototal;
            d.soquestion=qc;
            d.soanswer=ac;
            d.socomment=scc;
            d.soacceptp=d3.round(acceptp,2); 
            d.soreputation=data.reputation;
            console.log(" so: "+soname);
            }
        
            });
		});
    });
	//},global_timeout);

//},global_timeout);


			var global_userid_map = new Array();
			global_userid_map[5] = 1;
			global_userid_map[122162] = 2;
			
			global_userid_map[4] = 3;
			global_userid_map[661200] = 4;
			
			global_userid_map[6] = 5;
			global_userid_map[27474] = 6;
			
			global_userid_map[3] = 7;
			global_userid_map[802132] = 8;
			
			global_userid_map[2] = 9;
			global_userid_map[178850] = 10;
			/*
			global_userid_map[59140] = 11;
			global_userid_map[3381] = 12;
			
			global_userid_map[378646] = 13;
			global_userid_map[214365] = 14;*/
			
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
						top: 100 + (temp_count * 560),
						left: 165 + (temp_column * 370),
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
/*							.on('click', function()
								{
									var temp_num = this.id.split('_');
									var temp_first = temp_num[2];
									var temp_second = +temp_first + 1;
									
									exchange(temp_first,temp_second);
								})*/
							.on('mouseover', function()
								{
									 d3.select(this).style("opacity","0");
								})
							.on('mouseout', function()
								{
									 d3.select(this).style("opacity","0");
								});
					}
					
					//if((i + 1) % 3 !== 0)
					{
						d3.select('body')
							.append('div')
							.attr('class', 'switch')
							.style('top', (global_coordinates[i].top + 510) + 'px')
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
			
			var global_oldi=-1;
			var global_newi=-1;
			var initiatedrag=false;
			var close_clicked=false;
			//var global_oldcoordinates=new Array();
			//var global_temp_ajax = '';
			var global_temp_source = '';
			var global_start_date = '2010-09';
			var global_end_date = '2014-03',
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

			var mouse_down=false;
			var defaultoption="Select an option";
			
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
						console.log("global mouseup: "+global_mousedown);
						
					})
				.on("mousedown", function() { global_mousedown = true; console.log("global mousedown: "+global_mousedown); });
		
			function sortSelection(){
			var soptions=document.getElementById("sortoptions");
			//if(soptions.selectedIndex>0){
			var selectedoption=soptions.options[soptions.selectedIndex].text;
			if(selectedoption!=defaultoption && selectedoption!="Select an option"){
			var parent=document.getElementById("leftBox");
			while(parent.firstChild){
				parent.removeChild(parent.firstChild);
			}
			

			function byDate(a,b)
    {
    	var av=0;
    	var bv=0;
    	if(selectedoption=="Activities in GitHub"){
    		av=a.ghtotal;
    		bv=b.ghtotal;
    	}
        if(selectedoption=="Activities in Stack Overflow"){
            av=a.sototal;
            bv=b.sototal;
        }
        if(selectedoption=="Commits in GitHub"){
            av=a.ghcommit;
            bv=b.ghcommit;
        }
        if(selectedoption=="Answers in Stack Overflow"){
            av=a.soanswer;
            bv=b.soanswer;
        }
    	
                      if(av < bv)
                      {
                        return -1;
                      }
                      if(av > bv)
                      {
                        return 1;
                      }
                      return 0;
    }
    alldata.sort(byDate);


			var changedhtml="";
			console.log("sorted data: "+alldata.length);
			alldata.forEach(function(d){
				//console.log("sorted index: "+d);
				//if(alldata[d].name!=undefined){
				changedhtml=changedhtml+"<h3>"+d.name+"</h3>";
				changedhtml=changedhtml+"<a href=\"javascript:tile('Data/tgh_data_"+d.ghid+".json', 'gh_all', null);\">GitHub</a><br>";
				changedhtml=changedhtml+"<a href=\"javascript:tile('Data/tso_data_"+d.soid+".json', 'so_all', null);\">Stack Overflow</a><br>";
			//}
			});

			parent.innerHTML=changedhtml;
			defaultoption=selectedoption;
			console.log("changed option: "+defaultoption);
			}
			}
		//}

		</script>
		
    </body>
		
</html>