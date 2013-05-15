function redraw(data, id, type, other)
{
	var x = d3.scale.ordinal()
		.rangeBands([0, global_width], .1);
	  
	var y = d3.scale.linear()
		.rangeRound([global_height, 0]);
	
	// Establish different colors for GitHub and Stack Overflow bar charts
	if(id[0] + id[1] == "so")
	{
		var barColor = d3.scale.ordinal()
			.range(["#062170","#6d87d6","#133aac"]);
		barColor.domain(["answers","comments","questions"]);
	}
	else
	{
		var barColor = d3.scale.ordinal()
			.range(["#4a036f","#af66d5","#7309aa"]);
		barColor.domain(["commits","comments","issues"]);
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
		d3.select("#grouped_" + id).selectAll('svg').remove();
		  var month_count = data.length;
		  
		  var svg = d3.select("#grouped_" + id).append("svg")
			.attr("width", global_width + global_margin.left + global_margin.right)
			.attr("height", global_height + global_margin.top + global_margin.bottom)
		  .append("g")
			.attr("transform", "translate(" + global_margin.left + "," + global_margin.top + ")")
			.attr("id","grouped_svg_" + id);   
		  
		  x.domain(data.map(function(d,i)
		  {
			return parse_date(d.month,'mm/yy');
		  }));
	  
		  y.domain([0, global_grouped_y_max]);
			
		  svg.append("text")
            .attr("x",110)
            .attr("y",-14)
            .style("text-anchor", "middle")
            .style("text-decoration", 'underline')
            .text("Contributions by Month");
			
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
			.attr("width", x.rangeBand()/3)
			.attr("x",function(d,i)
			  {
				return i*x.rangeBand()/3;
			  })
			.attr("y",function(d)       { return y(d.value); })
			.attr("height", function(d) { return y(0) - y(d.value); })
			.style("fill", function(d)  { return barColor(d.title); })
			.attr("title",function(d)
			  {
				$(this).tipsy({gravity: 's'});
				var temp_title = d.value + ' ' + d.title;
				if(d.value === 1)
				{
				  temp_title = temp_title.slice(0,-1);
				}
				return temp_title;
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
						tile('Data/tgh_data_' + d.user_id + '.json', 'gh_' + d.title, undefined, temp_other);
					}
					else if(d.type == 'gh_repo')
					{
						tile('Data/tgh_data_' + d.user_id + '.json', 'gh_' + d.title, temp_tag, temp_other);
					}
					else if(d.type == 'so_all')
					{
						tile('Data/tso_data_' + d.user_id + '.json', 'so_' + d.title, undefined, temp_other);
					}
					else if(d.type == 'so_tag')
					{
						tile('Data/tso_data_' + d.user_id + '.json', 'so_' + d.title, temp_tag, temp_other);
					}
					
				});
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
		data.reverse();
		d3.select("#stacked_" + id).selectAll('svg').remove();
		  var month_count = data.length;
		  
		  var svg = d3.select("#stacked_" + id).append("svg")
			.attr("width", global_width + global_margin.left + global_margin.right)
			.attr("height", global_height + global_margin.top + global_margin.bottom)
		  .append("g")
			.attr("transform", "translate(" + global_margin.left + "," + global_margin.top + ")")
			.attr("id","stacked_svg_" + id);
		  
		  x.domain(data.map(function(d,i)
		  {
			return parse_date(d.month,'mm/yy');
		  }));
		  
		  y.domain([0, global_stacked_y_max]);
			
		  svg.append("text")
            .attr("x",110)
            .attr("y",-14)
            .style("text-anchor", "middle")
            .style("text-decoration", 'underline')
            .text("Contributions by Month");
			
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
			.attr("y",function(d)       { return y(d.y1); })
			.attr("height", function(d) { return y(d.y0) - y(d.y1); })
			.style("fill", function(d)  { return barColor(d.title); })
			.attr("title",function(d)
			  {
				$(this).tipsy({gravity: 's'});
				var temp_title = d.value + ' ' + d.title;
				if(d.value === 1)
				{
				  temp_title = temp_title.slice(0,-1);
				}
				return temp_title;
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
						tile('Data/tgh_data_' + d.user_id + '.json', 'gh_' + d.title, undefined, temp_other);
					}
					else if(d.type == 'gh_repo')
					{
						tile('Data/tgh_data_' + d.user_id + '.json', 'gh_' + d.title, temp_tag, temp_other);
					}
					else if(d.type == 'so_all')
					{
						tile('Data/tso_data_' + d.user_id + '.json', 'so_' + d.title, undefined, temp_other);
					}
					else if(d.type == 'so_tag')
					{
						tile('Data/tso_data_' + d.user_id + '.json', 'so_' + d.title, temp_tag, temp_other);
					}
				});
		
		if(id[0] + id[1] == "so")
		{
			var tmp_q = d3.sum(data, function(d) { return d.counts[2].value; });
			var tmp_a = d3.sum(data, function(d) { return d.counts[0].value; });
			var tmp_c = d3.sum(data, function(d) { return d.counts[1].value; });
			
			d3.select("#" + id + "_questions").text(to_si(tmp_q));
			d3.select("#" + id + "_answers").text(to_si(tmp_a));
			d3.select("#" + id + "_comments").text(to_si(tmp_c));
		}
		else if(id[0] + id[1] == "gh")
		{
			var tmp_i = d3.sum(data, function(d) { return d.counts[2].value; });
			var tmp_ct = d3.sum(data, function(d) { return d.counts[0].value; });
			var tmp_c = d3.sum(data, function(d) { return d.counts[1].value; });
			
			d3.select("#" + id + "_issues").text(to_si(tmp_i));
			d3.select("#" + id + "_commits").text(to_si(tmp_ct));
			d3.select("#" + id + "_comments").text(to_si(tmp_c));
		}
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End redraw of stacked bar chart <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	else { alert("Unknown data type parameter passed to redraw()"); }
}