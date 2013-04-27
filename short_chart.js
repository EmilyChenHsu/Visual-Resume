// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
// Begin function based on http://bl.ocks.org/3886208
// ===== ===== ===== ===== ===== ===== ===== ===== ===== //

function short_chart(fData, id)
{
    var margin = {top: 20, right: 20, bottom: 50, left: 45},
      width = 300 - margin.left - margin.right,
      height = 100 - margin.top - margin.bottom;
  
    var x = d3.scale.ordinal()
        .rangeBands([0, width], .1);
  
  var y = d3.scale.linear()
    .rangeRound([height, 0]);
  
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
    .ticks(2);

    var month_count = fData.length;
    
    var mouse_down = false;
    var inBox = false;
    var svg = d3.select("#short_stacked_" + id).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("id","short_stacked_svg_" + id);
      
    var shortSVG = d3.select("#short_stacked_svg_" + id);
	    
    var temp_width = 0;
    var temp_x = 0;
    var temp_opacity = 0;
    if(global_highlight != null && global_highlight.attr("width") > 0)
    {
        temp_width = global_highlight.attr("width");
        temp_x = global_highlight.attr("x");
        temp_opacity = 0.3;
        
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
    
    shortSVG.append("rect")
        .attr("height", height)
        .attr("width", temp_width)
        .attr("x", temp_x)
        .attr("fill", "gray")
        .style("opacity", temp_opacity)
        .attr("id", "highlight");
    
    global_highlight = d3.selectAll("#highlight");  
    
    x.domain(fData.map(function(d,i)
    {
      return parse_date(d.month,'mm/yy');
    }));
    
    y.domain([0, d3.max(fData, function(d)
    {
      return d.total;
    })]);
    
      xAxis.tickValues(fData.map(function(d,i)
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
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

      
    var month = svg.selectAll(".month")
      .data(fData)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d,i)
      {
        return "translate(" + x(d.month) + ",0)" ;
      });
    
    var index = 0;
    var firstDate, secondDate;
    
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
      .attr("id", function(d, i)
        {
            var barID = fData[index].month;
            if(i === 2)
            {
                shortSVG.append("rect")
                    .attr("width", x.rangeBand() + 1)
                    .attr("y", 0)
                    .attr("height", height + margin.top + margin.bottom)
                    .style("fill", "gray")
                    .style("opacity", 0)
                    .attr("transform", function()
                        {
                          return "translate(" + x(barID) + ",0)" ;
                        })
                    .attr("id", barID + "id")
                    .attr("class", id + "smallBar")
                    .on("mousedown", function()
                        {
                            firstDate = (this.id).substr(0,7);
                            inBox = true;
                            d3.selectAll("." + id + "smallBar").style("opacity", 0);
                            d3.select(this).style("opacity", .3);
                        })
                    .on("mouseup", function()
                      {
                        inBox = false;
                          if(!(firstDate == undefined))
                          {
                            
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
                      });

                index++;
            }
            return 'id_' + barID;
        });
      
        global_bar_offset = (width - (x.rangeBand() * month_count)) / month_count;
        
        var short_x = global_highlight.attr("x"), x_now;
        shortSVG.append("rect")
            .attr("height", height + margin.top + margin.bottom)
            .attr("width", width)
            .attr("opacity", 0)
            .on("mousedown", function()
                {
                    mouse_down = true;
                    x_now = d3.mouse(this)[0];
                    short_x = x_now;
                    global_highlight.attr("x", x_now)
                        .attr("width", 0)
                        .style("opacity", .3);
                })
            .on("mouseup", function()
                {
                    mouse_down = false;
                    
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
                })
            .on("mouseout", function()
                {
                    if(mouse_down && global_mousedown)
                    {
                        var temp_coord = d3.mouse(this);
                        if(temp_coord[0] < 0)
                        {
                            global_highlight.attr("x", 0);
                        }
                        else if(temp_coord[0] > 234)
                        {
                            var temp_width = global_highlight.attr("x");
                            temp_width = 235 - temp_width;
                            global_highlight.attr("width", temp_width);
                        }
                        global_ready_mouseup = true;
                        global_id = id;
                    }
                })
            .on("mousemove", function()
                {
                    if(mouse_down && global_mousedown)
                    {
                        x_now = d3.mouse(this)[0];
                        var short_width = x_now - short_x;
                        if(short_width < 0)
                        {
                            global_highlight.attr("x", x_now).attr("width", Math.abs(short_width));
                        }
                        else global_highlight.attr("width", short_width);
                    }
                });
		
		shortSVG.append("text")
			.attr("y", height + margin.top + 20)
			.attr("x", -margin.left + 10)
			.text("drag across the above graph to select a date range");
}

function set_date_range(fData)
{
	if(fData != "")
	{
		var x_start = global_highlight.attr("x");
		var temp_width = global_highlight.attr("width");
		var x_end = +x_start + +temp_width;
		var first_index = 0, second_index = null;
		var last_index = fData.length - 1;
		
		fData.forEach(function(d, i)
			{
				var temp_id = '#id_' + d.month;
				var bar_width = +d3.select(temp_id).attr("width") + global_bar_offset;
				
				if(i === 0) 
				{
					var x_actual = 0;
				}
				else x_actual = i * bar_width;
	
				if(x_start >= x_actual && x_start <= x_actual + bar_width)
				{
					first_index = i;
				}
				else if(x_end >= (x_actual) && x_end <= x_actual + bar_width)
				{
					second_index = i;
				}
			});
		
		var result = crossfilter(fData);
		firstDate = fData[first_index].month;
		
		if(Math.abs(x_start - x_end) < 5 && second_index === null)
		{
			second_index = first_index;
		}
		else if(second_index === null)
		{
			second_index = last_index;
		}
		
		secondDate = fData[second_index].month;
		
		var year = firstDate.substr(0,4);
		var mon = firstDate.substr(5,7) - 1;
		firstDate = new Date(year,mon);
		
		year = secondDate.substr(0,4);
		mon = secondDate.substr(5,7) - 1;
		secondDate = new Date(year,mon);
		
		// Just in case the user selects the date range from right to left
		if(secondDate - firstDate < 0)
		{
		  var temp = firstDate;
		  firstDate = secondDate;
		  secondDate = temp;
		  firstDate.setMonth(firstDate.getMonth() + 2); 
		}
		secondDate.setMonth(secondDate.getMonth() + 1);   
		
		global_date_range = [firstDate, secondDate];
	}
}