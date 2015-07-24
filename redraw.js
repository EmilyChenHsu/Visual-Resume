function redraw(data, id, type, other,top,first)
{
	var x = d3.scale.ordinal()
		.rangeBands([0, global_width], .1);
	
	//var x1 = d3.scale.ordinal();

	var y = d3.scale.linear()
		.rangeRound([global_height, 0]);
	
	var barColor=null;
	var maxh=0;
	var maxgh=0;
	var temp_tag = null;
	var userid=null;
	// Establish different colors for GitHub and Stack Overflow bar charts
	if(id[0] + id[1] == "so")
	{
		if(other=="answers"){
          barColor = d3.scale.ordinal()
            .range(["#062170"]);
        barColor.domain(["answers"]);
        var tmp_23 = d3.max(data, function(d) { return d.counts[0].value; });
			
			maxh=tmp_23;
			maxgh=tmp_23;
        }
        if(other=="comments"){
        barColor = d3.scale.ordinal()
            .range(["#6d87d6"]);
        barColor.domain(["comments"]);
        var tmp_23 = d3.max(data, function(d) { return d.counts[1].value; });
			
			maxh=tmp_23;
			maxgh=tmp_23;
        }
        if(other=="questions"){
        barColor = d3.scale.ordinal()
            .range(["#133aac"]);
        barColor.domain(["questions"]);
        var tmp_23 = d3.max(data, function(d) { return d.counts[2].value; });
			
			maxh=tmp_23;
			maxgh=tmp_23;
        }
        if(other=="accepted"){
        barColor = d3.scale.ordinal()
            .range(["#f09","#00f"]);
        barColor.domain(["nonaccepted","accepted"]);
       		var tmp_max = d3.max(data, function(d) { return d.counts[3].value+d.counts[4].value; });
			var tmp_passm = d3.max(data, function(d) { return d.counts[3].value; });
			var tmp_failm = d3.max(data, function(d) { return d.counts[4].value; });
			maxh=tmp_max;
			maxgh=Math.max(tmp_passm,tmp_failm);
        }
	}
	else
	{
		if(other =="tests"){
			barColor = d3.scale.ordinal()
			.range(["#00f","#f00"]);
		barColor.domain(["pass","fail"]);
			var tmp_max = d3.max(data, function(d) { return d.counts[3].value+d.counts[4].value; });
			var tmp_passm = d3.max(data, function(d) { return d.counts[3].value; });
			var tmp_failm = d3.max(data, function(d) { return d.counts[4].value; });
			maxh=tmp_max;
			maxgh=Math.max(tmp_passm,tmp_failm);
			
		}
		if(other =="centrality"){
			barColor = d3.scale.ordinal()
			.range(["#09f","#36c","#306"]);
		barColor.domain(["low","median","high"]);
		var tmp_max1 = d3.max(data, function(d) { return d.counts[5].value+d.counts[6].value+d.counts[7].value; });
			var tmp_1 = d3.max(data, function(d) { return d.counts[5].value; });
			var tmp_2 = d3.max(data, function(d) { return d.counts[6].value; });
			var tmp_3 = d3.max(data, function(d) { return d.counts[7].value; });
			maxh=tmp_max1;
			maxgh=Math.max(tmp_1,tmp_2,tmp_3);
		}
		if(other =="openclose"){
			barColor = d3.scale.ordinal()
			.range(["#493212","#a8712a"]);
		barColor.domain(["close","open"]);
		var tmp_max11 = d3.max(data, function(d) { return d.counts[8].value+d.counts[9].value; });
			var tmp_11 = d3.max(data, function(d) { return d.counts[8].value; });
			var tmp_21 = d3.max(data, function(d) { return d.counts[9].value; });
			
			maxh=tmp_max11;
			maxgh=Math.max(tmp_11,tmp_21);
		}
		if(other =="merge"){
			barColor = d3.scale.ordinal()
			.range(["#f00","#00f"]);
		barColor.domain(["nonmerged","merged"]);
		var tmp_max12 = d3.max(data, function(d) { return d.counts[10].value+d.counts[11].value; });
			var tmp_12 = d3.max(data, function(d) { return d.counts[10].value; });
			var tmp_22 = d3.max(data, function(d) { return d.counts[11].value; });
			
			maxh=tmp_max12;
			maxgh=Math.max(tmp_12,tmp_22);
		}
		if(other=="comments"){
			barColor = d3.scale.ordinal()
			.range(["#af66d5"]);
		barColor.domain(["comments"]);
		var tmp_23 = d3.max(data, function(d) { return d.counts[1].value; });
			
			maxh=tmp_23;
			maxgh=tmp_23;
		}
		if(other=="commits"){
			barColor = d3.scale.ordinal()
			.range(["#4a036f"]);
		barColor.domain(["commits"]);
		var tmp_23 = d3.max(data, function(d) { return d.counts[0].value; });
			
			maxh=tmp_23;
			maxgh=tmp_23;
		}
		if(other=="issues"){
			barColor = d3.scale.ordinal()
			.range(["#7309aa"]);
		barColor.domain(["issues"]);
		var tmp_23 = d3.max(data, function(d) { return d.counts[2].value; });
			
			maxh=tmp_23;
			maxgh=tmp_23;
		}
		
	}
	
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");
	  
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.tickFormat(d3.format(".2s"))
		.ticks(4);
	
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin redraw of grouped bar chart ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	if(type === "grouped")
	{
		var tiid="";
		if(top=="top"){
			tiid="#topgrouped_";
		}
		else{
			tiid="#grouped_";
		}
		d3.select(tiid + id).selectAll('svg').remove();
		  var month_count = data.length;
		  
		  var svg = d3.select(tiid + id).append("svg")
			.attr("width", global_width + global_margin.left + global_margin.right)
			.attr("height", global_height + global_margin.top + global_margin.bottom)
		  .append("g")
			.attr("transform", "translate(" + global_margin.left + "," + global_margin.top + ")")
			.attr("id","grouped_svg_" + id);   
		  
		  x.domain(data.map(function(d,i)
		  {
			return parse_date(d.month,'mm/yy');
		  }));

		  //x1.domain(barColor).rangeRoundBands([0, x.rangeBand()]);

	  	 y.domain([0, maxgh]);//global_grouped_y_max
			
		  svg.append("text")
            .attr("x",110)
            .attr("y",-14)
            .style("text-anchor", "middle")
            .style("text-decoration", 'underline')
            .text(function(){
            	if(other=="tests"){
					return "Summary of Commits Pass Test Cases";
				}
				if(other=="centrality"){
					return "Summary of Commits Close to the Core";
				}
				if(other=="openclose"){
					return "Summary of Opened or Closed Issues";
				}
				if(other=="merge"){
					return "Summary of Merged/Non-Merged Pull Requests";
				}
				if(other=="comments"){
					return "Summary of Comments";
				}
				if(other=="commits"){
					return "Summary of Commits";
				}
				if(other=="issues"){
					return "Summary of Issues";
				}
				if(other=="answers"){
					return "Summary of Answers";
				}
				if(other=="questions"){
					return "Summary of Questions";
				}
				if(other=="accepted"){
					return "Summary of Accepted Answers";
				}
				//if(id[0] + id[1] == "so") {return "Contributions by Month";}
				return "Contributions by Month";
            });//"Contributions by Month"
		

            

		  svg.append("text")
                .attr("x", 105)
                .attr("y", -3)
                .text("stacked")
                .style("text-anchor", "end")
                .style("font-size","9px")
				.on("mouseout",function()
                {
                  d3.select("body").style("cursor","default");
                  d3.select(this).style("font-weight","normal");  
                })
              .on("mouseover",function()
                {
                  d3.select("body").style("cursor","pointer");
                  d3.select(this).style("font-weight","bold");  
                })
                .on("click",function()
                {
                    show_stacked();
                });
            svg.append("text")
				.text("|")
				.attr("x", 115)
				.attr('y', -3)
				.style("text-anchor", "middle")
				.style('font-size', '9px');
            svg.append("text")
              .attr("x", 125)
              .attr("y", -3)
              .text("grouped")
              .style("text-anchor", "start")
              .style("font-size","9px")
              .style("font-weight","bold"); 
		  
			xAxis.tickValues(data.map(function(d,i)
			  {
				var factor = Math.ceil(month_count / 6);
				if(i%factor == 0)
				{
				  return parse_date(d.month, 'mm/yy');
				}
			  })
				.filter(function(d)
				  {
					return !!d;  
				  }));
		
		  svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + global_height + ")")
			.call(xAxis);
		
		  svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
		  .append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", -43)
			.attr('x', -20)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Contributions");
	  
			
		  var month = svg.selectAll(".month")
			.data(data)
			.enter().append("g")
			.attr("class", "g")
			.attr("transform", function(d,i)
			{
			  return "translate(" + x(d.month) + ",0)" ;
			});
		
		  month.selectAll("rect")
		  .data(function(d)
			{
			  return d.counts;
			})
		  .enter().append("rect")
			.attr("width", function(){
				if(other=="tests" || other=="openclose" || other=="merge" || other=="accepted"){
					return x.rangeBand()/2;
				}else if(other=="centrality"){
					return x.rangeBand()/3;
				}else{
					return x.rangeBand();
				}
			})//x.rangeBand()/3
			.attr("x",function(d,i)
			  {
				userid=d.user_id;
				if(d.tag != undefined)
					{
						temp_tag = d.tag;
					}
					else if(d.repo != undefined)
					{
						temp_tag = set_strip(d.repo);
				}
				if(other=="tests"){
					if(d.title=="pass" || d.title=="fail"){
						return (i-3)*x.rangeBand()/2;
					}
				}
				if(other=="centrality"){
					if(d.title=="high" || d.title=="median" || d.title=="low"){
						return (i-5)*x.rangeBand()/3;
					}
				}
				if(other=="openclose"){
					if(d.title=="open" || d.title=="close"){
						return (i-8)*x.rangeBand()/2;
					}
				}
				if(other=="merge"){
					if(d.title=="merged" || d.title=="nonmerged"){
						return (i-10)*x.rangeBand()/2;
					}
				}
				if(other=="comments"){
					if(d.title=="comments"){
						return (i-1)*x.rangeBand()/1;
					}
				}
				if(other=="commits"){
					if(d.title=="commits"){
						return i*x.rangeBand()/1;
					}
				}
				if(other=="issues"){
					if(d.title=="issues"){
						return (i-2)*x.rangeBand()/1;
					}
				}
				if(other=="answers"){
					if(d.title=="answers"){
						return i*x.rangeBand()/1;
					}
				}
				if(other=="questions"){
					if(d.title=="questions"){
						return (i-2)*x.rangeBand()/1;
					}
				}
				if(other=="accepted"){
					if(d.title=="accepted" || d.title=="nonaccepted"){
						return (i-3)*x.rangeBand()/2;
					}
				}
				//if(id[0] + id[1] == "so") {return i*x.rangeBand()/3;}

				return 0;
			  })
			.attr("y",function(d)       { 
				if(other=="tests"){
					if(d.title=="pass" || d.title=="fail"){
						return y(d.value);
					}
				}
				if(other=="centrality"){
					if(d.title=="high" || d.title=="median" || d.title=="low"){
						return y(d.value);
					}
				}
				if(other=="openclose"){
					if(d.title=="open" || d.title=="close"){
						return y(d.value);
					}
				}
				if(other=="merge"){
					if(d.title=="merged" || d.title=="nonmerged"){
						return y(d.value);
					}
				}
				if(other=="comments"){
					if(d.title=="comments"){
						return y(d.value);
					}
				}
				if(other=="commits"){
					if(d.title=="commits"){
						return y(d.value);
					}
				}
				if(other=="issues"){
					if(d.title=="issues"){
						return y(d.value);
					}
				}
				if(other=="answers"){
					if(d.title=="answers"){
						return y(d.value);
					}
				}
				if(other=="questions"){
					if(d.title=="questions"){
						return y(d.value);
					}
				}
				if(other=="accepted"){
					if(d.title=="accepted" || d.title=="nonaccepted"){
						return y(d.value);
					}
				}
				//if(id[0] + id[1] == "so") {return y(d.value);}
				return 0; })
			.attr("height", function(d) { 
				if(other=="tests"){
					if(d.title=="pass" || d.title=="fail"){
						return y(0) - y(d.value);
					}
				}
				
				if(other=="centrality"){
					if(d.title=="high" || d.title=="median" || d.title=="low"){
						return y(0) - y(d.value);
					}
				}
				if(other=="openclose"){
					if(d.title=="open" || d.title=="close"){
						return y(0) - y(d.value);
					}
				}
				if(other=="merge"){
					if(d.title=="merged" || d.title=="nonmerged"){
						return y(0) - y(d.value);
					}
				}
				if(other=="comments"){
					if(d.title=="comments"){
						return y(0) - y(d.value);
					}
				}
				if(other=="commits"){
					if(d.title=="commits"){
						return y(0) - y(d.value);
					}
				}
				if(other=="issues"){
					if(d.title=="issues"){
						return y(0) - y(d.value);
					}
				}
				if(other=="answers"){
					if(d.title=="answers"){
						return y(0) - y(d.value);
					}
				}
				if(other=="questions"){
					if(d.title=="questions"){
						return y(0) - y(d.value);
					}
				}
				if(other=="accepted"){
					if(d.title=="accepted" || d.title=="nonaccepted"){
						return y(0) - y(d.value);
					}
				}
				//if(id[0] + id[1] == "so")  {return y(0) - y(d.value);}
				return 0; })
			.style("fill", function(d)  { 
				if(other=="tests"){
					if(d.title=="pass" || d.title=="fail"){
						return barColor(d.title);
					}
				}
				if(other=="centrality"){
					if(d.title=="high" || d.title=="median" || d.title=="low"){
						return barColor(d.title);
					}
				}
				if(other=="openclose"){
					if(d.title=="open" || d.title=="close"){
						return barColor(d.title);
					}
				}
				if(other=="merge"){
					if(d.title=="merged" || d.title=="nonmerged"){
						return barColor(d.title);
					}
				}
				if(other=="comments"){
					if(d.title=="comments"){
						return barColor(d.title);
					}
				}
				if(other=="commits"){
					if(d.title=="commits"){
						return barColor(d.title);
					}
				}
				if(other=="issues"){
					if(d.title=="issues"){
						return barColor(d.title);
					}
				}
				if(other=="answers"){
					if(d.title=="answers"){
						return barColor(d.title);
					}
				}
				if(other=="questions"){
					if(d.title=="questions"){
						return barColor(d.title);
					}
				}
				if(other=="accepted"){
					if(d.title=="accepted" || d.title=="nonaccepted"){
						return barColor(d.title);
					}
				}
				//if(id[0] + id[1] == "so")  {return barColor(d.title);}
				return null; })
			.attr("title",function(d)
			  {
				$(this).tipsy({gravity: 's'});
				var temp_title = d.value + ' ' + d.title;
				
				if(other=="tests"){
					if(d.title=="pass" || d.title=="fail"){
						return temp_title;
					}
				}
				if(other=="centrality"){
					if(d.title=="high" || d.title=="median" || d.title=="low"){
						return temp_title;
					}
				}
				if(other=="openclose"){
					if(d.title=="open" || d.title=="close"){
						return temp_title;
					}
				}
				if(other=="merge"){
					if(d.title=="merged" || d.title=="nonmerged"){
						return temp_title;
					}
				}
				if(other=="comments"){
					if(d.title=="comments"){
						return temp_title;
					}
				}
				if(other=="commits"){
					if(d.title=="commits"){
						return temp_title;
					}
				}
				if(other=="issues"){
					if(d.title=="issues"){
						return temp_title;
					}
				}
				if(other=="answers"){
					if(d.title=="answers"){
						return temp_title;
					}
				}
				if(other=="questions"){
					if(d.title=="questions"){
						return temp_title;
					}
				}
				if(other=="accepted"){
					if(d.title=="accepted" || d.title=="nonaccepted"){
						return temp_title;
					}
				}
				if((d.value === 1) && (other=="questions" || other=="answers" || other=="comments" || other=="issues" || other=="commits"))
				{
				  temp_title = temp_title.slice(0,-1);
				}
				//if(id[0] + id[1] == "so")  {return temp_title;}
				return "";
			  })
			.on("click", function(d)
				{
					var temp_other = new Array();
					temp_other[0] = d.title.slice(0,-1);
					temp_other[1] = d.month;
					var temp_tag = null;
					if(d.tag != undefined)
					{
						temp_tag = d.tag;
					}
					else if(d.repo != undefined)
					{
						temp_tag = set_strip(d.repo);
					}

					if(d.type == 'gh')
					{
						
						tile('Data/tgh_data_' + d.user_id + '.json', 'gh_activity_detail', undefined, temp_other, id,d.title);
						
					}
					else if(d.type == 'gh_repo')
					{
						
						tile('Data/tgh_data_' + d.user_id + '.json', 'gh_activity_detail', temp_tag, temp_other, id,d.title);
						
					}
					else if(d.type == 'so_all')
					{
						
						tile('Data/tso_data_' + d.user_id + '.json', 'so_activity_detail', undefined, temp_other, id,d.title);
						
					}
					else if(d.type == 'so_tag')
					{
						
						tile('Data/tso_data_' + d.user_id + '.json', 'so_activity_detail', temp_tag, temp_other, id,d.title);
					}
					
				});

			if(other=="commits" || other=="issues" || other=="answers"){
            	svg.append("text")
                .attr("x", 45)
                .attr("y", -14)
                .text(other+" quality")
                .style("text-anchor", "end")
                .style("font-size","12px")
                .style("fill","purple")
				.on("mouseout",function()
                {
                  d3.select("body").style("cursor","default");
                  d3.select(this).style("font-weight","normal");  
                })
              .on("mouseover",function()
                {
                  d3.select("body").style("cursor","pointer");
                  d3.select(this).style("font-weight","bold");  
                })
                .on("click",function(d)
                {
                    var temp_other = new Array();
					
					//var tmpt = temp_tag.replace("/","-");

					if(other == 'commits')
					{
						console.log("redraw commit: " + id);
						if(temp_tag==null){
							tile('Data/tgh_data_' + userid + '.json', 'gh_quality_commits', undefined, temp_other, id);
						}
						else{
							tile('Data/tgh_data_' + userid + '.json', 'gh_quality_commits', temp_tag, temp_other, id);
						}
					}
					else if(other == 'issues')
					{
						console.log("redraw issue: " + id);
						if(temp_tag==null){
							tile('Data/tgh_data_' + userid + '.json', 'gh_quality_issues', undefined, temp_other, id);
						}
						else{
							tile('Data/tgh_data_' + userid + '.json', 'gh_quality_issues', temp_tag, temp_other, id);
						}
					}
					else if(other == 'answers')
					{
						if(temp_tag==null){
							tile('Data/tso_data_' + userid + '.json', 'so_quality_answers', undefined, temp_other, id);
						}
						else{
						tile('Data/tso_data_' + userid + '.json', 'so_quality_answers', temp_tag, temp_other, id);
						}
					}
					
                });
            }
	}
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End redraw of grouped bar chart <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
    //
    //
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin redraw of stacked bar chart ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	else if(type === "stacked")
	{
		if((top=="top" && first=="first") || other=="commits" || other=="issues" || other=="comments" || other=="answers" || other=="questions"){//global_date_range!=null){
		data.reverse();
		}
		var tiid="";
		if(top=="top"){
			tiid="#topstacked_";
		}
		else{
			tiid="#stacked_";
		}
		d3.select(tiid + id).selectAll('svg').remove();
		  var month_count = data.length;
		  
		  var svg = d3.select(tiid + id).append("svg")
			.attr("width", global_width + global_margin.left + global_margin.right)
			.attr("height", global_height + global_margin.top + global_margin.bottom)
		  .append("g")
			.attr("transform", "translate(" + global_margin.left + "," + global_margin.top + ")")
			.attr("id","stacked_svg_" + id);
		  
		  x.domain(data.map(function(d,i)
		  {
			return parse_date(d.month,'mm/yy');
		  }));
		  y.domain([0, maxh]);//global_stacked_y_max
			
		  svg.append("text")
            .attr("x",110)
            .attr("y",-14)
            .style("text-anchor", "middle")
            .style("text-decoration", 'underline')
            .text(function(){
            	if(other=="tests"){
					return "Summary of Commits Pass Test Cases";
				}
				if(other=="centrality"){
					return "Summary of Commits Close to the Core";
				}
				if(other=="openclose"){
					return "Summary of Opened or Closed Issues";
				}
				if(other=="merge"){
					return "Summary of Merged/Non-Merged Pull Requests";
				}
				if(other=="comments"){
					return "Summary of Comments";
				}
				if(other=="commits"){
					return "Summary of Commits";
				}
				if(other=="issues"){
					return "Summary of Issues";
				}
				if(other=="answers"){
					return "Summary of Answers";
				}
				if(other=="questions"){
					return "Summary of Questions";
				}
				if(other=="accepted"){
					return "Summary of Accepted Answers";
				}
				//if(id[0] + id[1] == "so") {return "Contributions by Month";}
				return "Contributions by Month";
            });//"Contributions by Month"
			
		  svg.append("text")
                .attr("x", 105)
                .attr("y", -3)
                .text("stacked")
                .style("text-anchor", "end")
                .style("font-size","9px")
                .style("font-weight","bold");
            svg.append("text")
				.text("|")
				.attr("x", 115)
				.attr('y', -3)
				.style("text-anchor", "middle")
				.style('font-size', '9px');
            svg.append("text")
              .attr("x", 125)
              .attr("y", -3)
              .text("grouped")
              .style("text-anchor", "start")
              .style("font-size","9px")
              .on("mouseout",function()
                {
                  d3.select("body").style("cursor","default");
                  d3.select(this).style("font-weight","normal");  
                })
              .on("mouseover",function()
                {
                  d3.select("body").style("cursor","pointer");
                  d3.select(this).style("font-weight","bold");  
                })
                .on("click",function()
                {
                    show_grouped();
                }); 
		  
			xAxis.tickValues(data.map(function(d,i)
			  {
				var factor = Math.ceil(month_count / 6);
				if(i%factor == 0)
				{
				  return parse_date(d.month, 'mm/yy');
				}
			  })
				.filter(function(d)
				  {
					return !!d;  
				  }));
		
		  svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + global_height + ")")
			.call(xAxis);
		
		  svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
		  .append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", -43)
			.attr('x', -20)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Contributions");
	  
			
		  var month = svg.selectAll(".month")
			.data(data)
			.enter().append("g")
			.attr("class", "g")
			.attr("transform", function(d,i)
			{
			  return "translate(" + x(d.month) + ",0)" ;
			});
		
		  month.selectAll("rect")
		  .data(function(d)
			{
			  return d.counts;
			})
		  .enter().append("rect")
			.attr("width", x.rangeBand())
			.attr("y",function(d)       { 
				userid=d.user_id;
				if(d.tag != undefined)
					{
						temp_tag = d.tag;
					}
					else if(d.repo != undefined)
					{
						temp_tag = set_strip(d.repo);
				}
				if(other=="tests"){
					if(d.title=="pass" || d.title=="fail"){
						return y(d.y1);
					}
				}
				if(other=="centrality"){
					if(d.title=="high" || d.title=="median" || d.title=="low"){
						return y(d.y1);
					}
				}
				if(other=="openclose"){
					if(d.title=="open" || d.title=="close"){
						return y(d.y1);
					}
				}
				if(other=="merge"){
					if(d.title=="merged" || d.title=="nonmerged"){
						return y(d.y1);
					}
				}
				if(other=="comments"){
					if(d.title=="comments"){
						return y(d.value);
					}
				}
				if(other=="commits"){
					if(d.title=="commits"){
						return y(d.value);
					}
				}
				if(other=="issues"){
					if(d.title=="issues"){
						return y(d.value);
					}
				}
				if(other=="answers"){
					if(d.title=="answers"){
						return y(d.value);
					}
				}
				if(other=="questions"){
					if(d.title=="questions"){
						return y(d.value);
					}
				}
				if(other=="accepted"){
					if(d.title=="accepted" || d.title=="nonaccepted"){
						return y(d.y1);
					}
				}
				//if(id[0] + id[1] == "so")  {return y(d.y1);}
				return 0; })
			.attr("height", function(d) { 
				if(other=="tests"){
					if(d.title=="pass" || d.title=="fail"){
						return y(d.y0) - y(d.y1);
					}
				}
				if(other=="centrality"){
					if(d.title=="high" || d.title=="median" || d.title=="low"){
						return y(d.y0) - y(d.y1);
					}
				}
				if(other=="openclose"){
					if(d.title=="open" || d.title=="close"){
						return y(d.y0) - y(d.y1);
					}
				}
				if(other=="merge"){
					if(d.title=="merged" || d.title=="nonmerged"){
						return y(d.y0) - y(d.y1);
					}
				}
				if(other=="comments"){
					if(d.title=="comments"){
						return y(d.y0) - y(d.y1);
					}
				}
				if(other=="commits"){
					if(d.title=="commits"){
						return y(d.y0) - y(d.y1);
					}
				}
				if(other=="issues"){
					if(d.title=="issues"){
						return y(d.y0) - y(d.y1);
					}
				}
				if(other=="answers"){
					if(d.title=="answers"){
						return y(d.y0) - y(d.y1);
					}
				}
				if(other=="questions"){
					if(d.title=="questions"){
						return y(d.y0) - y(d.y1);
					}
				}
				if(other=="accepted"){
					if(d.title=="accepted" || d.title=="nonaccepted"){
						return y(d.y0) - y(d.y1);
					}
				}
				//if(id[0] + id[1] == "so")  {return y(d.y0) - y(d.y1);}
				return 0; })
			.style("fill", function(d)  { 
				if(other=="tests"){
					if(d.title=="pass" || d.title=="fail"){
						return barColor(d.title);
					}
				}
				if(other=="centrality"){
					if(d.title=="high" || d.title=="median" || d.title=="low"){
						return barColor(d.title);
					}
				}
				if(other=="openclose"){
					if(d.title=="open" || d.title=="close"){
						return barColor(d.title);
					}
				}
				if(other=="merge"){
					if(d.title=="merged" || d.title=="nonmerged"){
						return barColor(d.title);
					}
				}
				if(other=="comments"){
					if(d.title=="comments"){
						return barColor(d.title);
					}
				}
				if(other=="commits"){
					if(d.title=="commits"){
						return barColor(d.title);
					}
				}
				if(other=="issues"){
					if(d.title=="issues"){
						return barColor(d.title);
					}
				}
				if(other=="answers"){
					if(d.title=="answers"){
						return barColor(d.title);
					}
				}
				if(other=="questions"){
					if(d.title=="questions"){
						return barColor(d.title);
					}
				}
				if(other=="accepted"){
					if(d.title=="accepted" || d.title=="nonaccepted"){
						return barColor(d.title);
					}
				}
				//if(id[0] + id[1] == "so")  {return barColor(d.title);}
				return null; })
			.attr("title",function(d)
			  {
				$(this).tipsy({gravity: 's'});
				var temp_title = d.value + ' ' + d.title;
				
				if(other=="tests"){
					if(d.title=="pass" || d.title=="fail"){
						return temp_title;
					}
				}
				if(other=="centrality"){
					if(d.title=="high" || d.title=="median" || d.title=="low"){
						return temp_title;
					}
				}
				if(other=="openclose"){
					if(d.title=="open" || d.title=="close"){
						return temp_title;
					}
				}
				if(other=="merge"){
					if(d.title=="merged" || d.title=="nonmerged"){
						return temp_title;
					}
				}
				if(other=="comments"){
					if(d.title=="comments"){
						return temp_title;
					}
				}
				if(other=="commits"){
					if(d.title=="commits"){
						return temp_title;
					}
				}
				if(other=="issues"){
					if(d.title=="issues"){
						return temp_title;
					}
				}
				if(other=="answers"){
					if(d.title=="answers"){
						return temp_title;
					}
				}
				if(other=="questions"){
					if(d.title=="questions"){
						return temp_title;
					}
				}
				if(other=="accepted"){
					if(d.title=="accepted" || d.title=="nonaccepted"){
						return temp_title;
					}
				}
				if((d.value === 1) && (other=="questions" || other=="answers" || other=="comments" || other=="issues" || other=="commits"))
				{
				  temp_title = temp_title.slice(0,-1);
				}
				//if(id[0] + id[1] == "so")  {return temp_title;}
				return "";
			  })
			.on("click", function(d)
				{
					var temp_other = new Array();
					temp_other[0] = d.title.slice(0,-1);
					temp_other[1] = d.month;
					var temp_tag = null;
					if(d.tag != undefined)
					{
						temp_tag = d.tag;
					}
					else if(d.repo != undefined)
					{
						temp_tag = set_strip(d.repo);
					}
					if(d.type == 'gh')
					{
						
						tile('Data/tgh_data_' + d.user_id + '.json', 'gh_activity_detail', undefined, temp_other, id,d.title);
						
					}
					else if(d.type == 'gh_repo')
					{
						
						tile('Data/tgh_data_' + d.user_id + '.json', 'gh_activity_detail', temp_tag, temp_other, id,d.title);
						
					}
					else if(d.type == 'so_all')
					{
						
						tile('Data/tso_data_' + d.user_id + '.json', 'so_activity_detail', undefined, temp_other, id,d.title);
						
					}
					else if(d.type == 'so_tag')
					{
						
						tile('Data/tso_data_' + d.user_id + '.json', 'so_activity_detail', temp_tag, temp_other, id,d.title);
					}
				});

			if(other=="commits" || other=="issues" || other=="answers"){
            	svg.append("text")
                .attr("x", 45)
                .attr("y", -14)
                .text(other+" quality")
                .style("text-anchor", "end")
                .style("font-size","12px")
                .style("fill","purple")
				.on("mouseout",function()
                {
                  d3.select("body").style("cursor","default");
                  d3.select(this).style("font-weight","normal");  
                })
              .on("mouseover",function()
                {
                  d3.select("body").style("cursor","pointer");
                  d3.select(this).style("font-weight","bold");  
                })
                .on("click",function(d)
                {
                    var temp_other = new Array();
					
					

					if(other == 'commits')
					{
						console.log("redraw commit: " + id);
						if(temp_tag==null){
							tile('Data/tgh_data_' + userid + '.json', 'gh_quality_commits', undefined, temp_other, id);
						}
						else{
							tile('Data/tgh_data_' + userid + '.json', 'gh_quality_commits', temp_tag, temp_other, id);
						}
					}
					else if(other == 'issues')
					{
						console.log("redraw issue: " + id);
						if(temp_tag==null){
							tile('Data/tgh_data_' + userid + '.json', 'gh_quality_issues', undefined, temp_other, id);
						}
						else{
							tile('Data/tgh_data_' + userid + '.json', 'gh_quality_issues', temp_tag, temp_other, id);
						}
					}
					else if(other == 'answers')
					{
						if(temp_tag==null){
							tile('Data/tso_data_' + userid + '.json', 'so_quality_answers', undefined, temp_other, id);
						}
						else{
						tile('Data/tso_data_' + userid + '.json', 'so_quality_answers', temp_tag, temp_other, id);
						}
					}
					
                });
            }



		
		if(id[0] + id[1] == "so")
		{
			if(other=="answers"){
				var tmp_a = d3.sum(data, function(d) { return d.counts[0].value; });
				d3.select("#" + id + "_answer").text(to_si(tmp_a));
			}
			if(other=="questions"){
				var tmp_q = d3.sum(data, function(d) { return d.counts[2].value; });
				d3.select("#" + id + "_question").text(to_si(tmp_q));
			}
			if(other=="comments"){
			var tmp_c = d3.sum(data, function(d) { return d.counts[1].value; });
			d3.select("#" + id + "_comment").text(to_si(tmp_c));
			}
			if(other=="accepted"){
				var tmp_fail = d3.sum(data, function(d) { return d.counts[3].value; });
			var tmp_pass = d3.sum(data, function(d) { return d.counts[4].value; });
			d3.select("#" + id + "_nonaccepted").text(to_si(tmp_fail));
			d3.select("#" + id + "_accepted").text(to_si(tmp_pass));
			}
		}
		else if(id[0] + id[1] == "gh")
		{
		if(other=="comments"){
			
			var tmp_cc = d3.sum(data, function(d) { return d.counts[1].value; });
			d3.select("#" + id + "_comment").text(to_si(tmp_cc));
		}
		if(other=="commits"){
			
			var tmp_cc = d3.sum(data, function(d) { return d.counts[0].value; });
			d3.select("#" + id + "_commit").text(to_si(tmp_cc));
		}
		if(other=="issues"){
			
			var tmp_cc = d3.sum(data, function(d) { return d.counts[2].value; });
			d3.select("#" + id + "_issue").text(to_si(tmp_cc));
		}
		if(other =="tests"){
			var tmp_pass = d3.sum(data, function(d) { return d.counts[3].value; });
			var tmp_fail = d3.sum(data, function(d) { return d.counts[4].value; });
			d3.select("#" + id + "_pass").text(to_si(tmp_pass));
			d3.select("#" + id + "_fail").text(to_si(tmp_fail));
		}
		if(other =="centrality"){
			var tmp_high = d3.sum(data, function(d) { return d.counts[7].value; });
			var tmp_median = d3.sum(data, function(d) { return d.counts[6].value; });
			var tmp_low = d3.sum(data, function(d) { return d.counts[5].value; });
			d3.select("#" + id + "_high").text(to_si(tmp_high));
			d3.select("#" + id + "_median").text(to_si(tmp_median));
			d3.select("#" + id + "_low").text(to_si(tmp_low));
		}
		if(other =="openclose"){
			var tmp_open = d3.sum(data, function(d) { return d.counts[9].value; });
			var tmp_close = d3.sum(data, function(d) { return d.counts[8].value; });
			d3.select("#" + id + "_open").text(to_si(tmp_open));
			d3.select("#" + id + "_close").text(to_si(tmp_close));
		}
		if(other =="merge"){
			var tmp_nonmerged = d3.sum(data, function(d) { return d.counts[10].value; });
			var tmp_merged = d3.sum(data, function(d) { return d.counts[11].value; });
			d3.select("#" + id + "_nonmerged").text(to_si(tmp_nonmerged));
			d3.select("#" + id + "_merged").text(to_si(tmp_merged));
		}
		}
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End redraw of stacked bar chart <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	else { alert("Unknown data type parameter passed to redraw()"); }
}