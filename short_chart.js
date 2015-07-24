// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
// Begin function based on http://bl.ocks.org/3886208
// ===== ===== ===== ===== ===== ===== ===== ===== ===== //

function short_chart(fData, id)
{
    var margin = {top: 20, right: 20, bottom: 50, left: 45},
      width = 300 - margin.left - margin.right,
      height = 105 - margin.top - margin.bottom;
  
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
			.range(["#4a036f","#af66d5","#7309aa"]);//
		barColor.domain(["commits","comments","issues"]); //
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
    mouse_down = false;
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
                //set_date_range(temp_data);
                var cf = cf.dimension(function(d)
					{
						return d.fullDate;
					});
                var temp_data = cf.filterRange([global_date_range[0],global_date_range[1]]).top(Infinity);
                //redraw(temp_data, temp_tileID, "stacked","tests");
                //redraw(temp_data, temp_tileID, "grouped","tests");
                if(temp_tileID.indexOf("gh")>-1 || temp_tileID.indexOf("so")>-1){
                            var tabs = document.getElementsByTagName("a");
                            for(var x=0; x<tabs.length; x++) {
                            name = tabs[x].getAttribute("name");
                            if (name == 'tab') {
                              if (tabs[x].className == "active") {
                                  if((tabs[x].id).indexOf(temp_tileID)>-1){
                                    var tabn="";
                                    var tabtile="#legend_";
                                    var rtileid=temp_tileID;
                                    var top="";
                                    var reopt="";
                                    if((tabs[x].id).indexOf("tabs_tests")>-1){
                                      tabn="tests";
                                      tabtile="#toplegend_";
                                      rtileid=temp_tileID+"_quality_commits";
                                      top="top";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_core")>-1){
                                      tabn="centrality";
                                      rtileid=temp_tileID+"_quality_commits";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_close")>-1){
                                      tabn="openclose";
                                      tabtile="#toplegend_";
                                      rtileid=temp_tileID+"_quality_issues";
                                      top="top";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_merge")>-1){
                                      tabn="merge";
                                      rtileid=temp_tileID+"_quality_issues";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_commit")>-1){
                                      tabn="commits";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_issue")>-1){
                                      tabn="issues";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_comment")>-1){
                                      tabn="comments";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_question")>-1){
                                      tabn="questions";
                                      reopt="so";
                                    }
                                    if((tabs[x].id).indexOf("tabs_answer")>-1){
                                      tabn="answers";
                                      reopt="so";
                                    }
                                    if((tabs[x].id).indexOf("tabs_socomment")>-1){
                                      tabn="comments";
                                      reopt="so";
                                    }
                                    if((tabs[x].id).indexOf("tabs_accepted")>-1){
                                      tabn="accepted";
                                      tabtile="#toplegend_";
                                      rtileid=temp_tileID+"_quality_answers";
                                      top="top";
                                      reopt="so";
                                    }
                                    d3.select(tabtile+rtileid).selectAll('svg').remove();
                                    legend(rtileid, "bar", reopt,tabn);
                                    redraw(temp_data, rtileid, "stacked",tabn,top);
                                    redraw(temp_data, rtileid, "grouped",tabn,top);
                                  }
                              } 
                            }
                            }   
                          }
                          else{
                            redraw(temp_data, temp_tileID, "stacked");
                            redraw(temp_data, temp_tileID, "grouped");
                          }

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
    
    svg.append("text")
            .attr("x",110)
            .attr("y",-10)
            .style("text-anchor", "middle")
            .style("text-decoration", 'underline')
            .text("Summary of All Contributions");

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
      .attr("y",function(d)       { 
        if(d.title=="comments" || d.title=="commits" || d.title=="issues"){return y(d.y1);}
        else if(d.title=="answers" || d.title=="questions"){return y(d.y1);}
        else {return 0;}})
      .attr("height", function(d) { 
        if(d.title=="comments" || d.title=="commits" || d.title=="issues"){return y(d.y0) - y(d.y1);} 
        else if(d.title=="answers" || d.title=="questions"){return y(d.y0) - y(d.y1);}
        else {return 0;} })
      .style("fill", function(d)  { 
        if(d.title=="comments" || d.title=="commits" || d.title=="issues"){return barColor(d.title);} 
        else if(d.title=="answers" || d.title=="questions"){return barColor(d.title);}
        else {return null;} })
      .attr("id", function(d, i)
        {
            if(d.title=="comments" || d.title=="commits" || d.title=="issues" || d.title=="answers" || d.title=="questions"){
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
                            
                            //initiatedrag=false;
                            firstDate = (this.id).substr(0,7);
                            inBox = true;
                            d3.selectAll("." + id + "smallBar").style("opacity", 0);
                            d3.select(this).style("opacity", .3);
                            console.log("22draggable: "+initiatedrag+" short mouse down: "+mouse_down+" id: "+ d3.select(this).attr("id"));
                            
                        })
                    .on("mouseup", function()
                      {
                        //initiatedrag=false;
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
									//redraw(temp_data, temp_tileID, "stacked","tests");
                                    //redraw(temp_data, temp_tileID, "grouped","tests");
                                    //d3.select("#" + temp_tileID + "_pass").text("a");
                                    if(temp_tileID.indexOf("gh")>-1 || temp_tileID.indexOf("so")>-1){
                            var tabs = document.getElementsByTagName("a");
                            for(var x=0; x<tabs.length; x++) {
                            name = tabs[x].getAttribute("name");
                            if (name == 'tab') {
                              if (tabs[x].className == "active") {
                                
                                  if((tabs[x].id).indexOf(temp_tileID)>-1){
                                    var tabn="";
                                    var tabtile="#legend_";
                                    var rtileid=temp_tileID;
                                    var top="";
                                    var reopt="";
                                    if((tabs[x].id).indexOf("tabs_tests")>-1){
                                      tabn="tests";
                                      tabtile="#toplegend_";
                                      rtileid=temp_tileID+"_quality_commits";
                                      top="top";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_core")>-1){
                                      tabn="centrality";
                                      rtileid=temp_tileID+"_quality_commits";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_close")>-1){
                                      tabn="openclose";
                                      tabtile="#toplegend_";
                                      rtileid=temp_tileID+"_quality_issues";
                                      top="top";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_merge")>-1){
                                      tabn="merge";
                                      rtileid=temp_tileID+"_quality_issues";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_commit")>-1){
                                      tabn="commits";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_issue")>-1){
                                      tabn="issues";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_comment")>-1){
                                      tabn="comments";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_question")>-1){
                                      tabn="questions";
                                      reopt="so";
                                    }
                                    if((tabs[x].id).indexOf("tabs_answer")>-1){
                                      tabn="answers";
                                      reopt="so";
                                    }
                                    if((tabs[x].id).indexOf("tabs_socomment")>-1){
                                      tabn="comments";
                                      reopt="so";
                                    }
                                    if((tabs[x].id).indexOf("tabs_accepted")>-1){
                                      tabn="accepted";
                                      tabtile="#toplegend_";
                                      rtileid=temp_tileID+"_quality_answers";
                                      top="top";
                                      reopt="so";
                                    }
                                    d3.select(tabtile+rtileid).selectAll('svg').remove();
                                    legend(rtileid, "bar", reopt,tabn);
                                    redraw(temp_data, rtileid, "stacked",tabn,top);
                                    redraw(temp_data, rtileid, "grouped",tabn,top);
                                  }
                              } 
                            }
                            }   
                          }
                          else{
                            redraw(temp_data, temp_tileID, "stacked");
                            redraw(temp_data, temp_tileID, "grouped");
                          }


								});
                          }
                      });

                index++;
            }
            return 'id_' + barID;
          }
          return null;
        });
        global_bar_offset = (width - (x.rangeBand() * month_count)) / month_count;
        
        var short_x = global_highlight.attr("x"), x_now;
        shortSVG.append("rect")
            .attr("height", height + margin.top + margin.bottom)
            .attr("width", width)
            .attr("opacity", 0)
            .on("mousedown", function()
                {
                    var ttid=d3.select(this).attr("id");
                    //d3.event.preventDefault();
                    //console.log("11tileid: "+ttid);
                    if (d3.event.defaultPrevented === false) {
                    initiatedrag=false;
                    mouse_down = true;
                    //global_mousedown=true;
                    x_now = d3.mouse(this)[0];
                    short_x = x_now;
                    global_highlight.attr("x", x_now)
                        .attr("width", 0)
                        .style("opacity", .3);

                        console.log("11draggable: "+global_mousedown+" short mouse down: "+mouse_down+" id: "+ d3.select(this).attr("id"));
                    }
                    
                })
            .on("mouseup", function()
                {
                    initiatedrag=true;
                    mouse_down = false;
                    //global_mousedown=false;
                    console.log("33mouseup: "+global_mousedown+" short mouse down: "+mouse_down+" id: "+ d3.select(this).attr("id"));
                    global_data.forEach(function(d)
                        {
                            var temp_data = d[0];
                            var temp_tileID = d[1];
                            var cf = crossfilter(temp_data);
                            set_date_range(temp_data);
                            var cf = cf.dimension(function(d) { return d.fullDate; });
                            var temp_data = cf.filterRange([global_date_range[0],global_date_range[1]]).top(Infinity);
                            //d3.select("#" + temp_tileID + "_pass").text("a");
                            if(temp_tileID.indexOf("gh")>-1 || temp_tileID.indexOf("so")>-1){
                            var tabs = document.getElementsByTagName("a");
                            for(var x=0; x<tabs.length; x++) {
                            name = tabs[x].getAttribute("name");
                            if (name == 'tab') {
                              if (tabs[x].className == "active") {
                                
                                  if((tabs[x].id).indexOf(temp_tileID)>-1){
                                    var tabn="";
                                    var tabtile="#legend_";
                                    var rtileid=temp_tileID;
                                    var top="";
                                    var reopt="";
                                    if((tabs[x].id).indexOf("tabs_tests")>-1){
                                      tabn="tests";
                                      tabtile="#toplegend_";
                                      rtileid=temp_tileID+"_quality_commits";
                                      top="top";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_core")>-1){
                                      tabn="centrality";
                                      rtileid=temp_tileID+"_quality_commits";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_close")>-1){
                                      tabn="openclose";
                                      tabtile="#toplegend_";
                                      rtileid=temp_tileID+"_quality_issues";
                                      top="top";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_merge")>-1){
                                      tabn="merge";
                                      rtileid=temp_tileID+"_quality_issues";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_commit")>-1){
                                      tabn="commits";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_issue")>-1){
                                      tabn="issues";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_comment")>-1){
                                      tabn="comments";
                                      reopt="gh";
                                    }
                                    if((tabs[x].id).indexOf("tabs_question")>-1){
                                      tabn="questions";
                                      reopt="so";
                                    }
                                    if((tabs[x].id).indexOf("tabs_answer")>-1){
                                      tabn="answers";
                                      reopt="so";
                                    }
                                    if((tabs[x].id).indexOf("tabs_socomment")>-1){
                                      tabn="comments";
                                      reopt="so";
                                    }
                                    if((tabs[x].id).indexOf("tabs_accepted")>-1){
                                      tabn="accepted";
                                      tabtile="#toplegend_";
                                      rtileid=temp_tileID+"_quality_answers";
                                      top="top";
                                      reopt="so";
                                    }
                                    d3.select(tabtile+rtileid).selectAll('svg').remove();
                                    legend(rtileid, "bar", reopt,tabn);
                                    redraw(temp_data, rtileid, "stacked",tabn,top);
                                    redraw(temp_data, rtileid, "grouped",tabn,top);
                                  }
                              } 
                            }
                            }   
                          }
                          else{
                            redraw(temp_data, temp_tileID, "stacked");
                            redraw(temp_data, temp_tileID, "grouped");
                          }
                            
                        });
                })
            .on("mouseout", function()
                {
                    console.log("112mouseout: "+mouse_down+" "+global_mousedown+" "+initiatedrag);
                    if(mouse_down && global_mousedown)// && !initiatedrag
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
                        //global_mousedown=false;
                        console.log("11global_id: "+global_id);
                    }
                })
            .on("mousemove", function()
                {
                    console.log("11mousemove: "+mouse_down+" "+global_mousedown+" "+initiatedrag);
                    if(mouse_down && global_mousedown)// && !initiatedrag
                    {
                        x_now = d3.mouse(this)[0];
                        var short_width = x_now - short_x;
                        if(short_width < 0)
                        {
                            global_highlight.attr("x", x_now).attr("width", Math.abs(short_width));
                        }
                        else global_highlight.attr("width", short_width);
                        console.log("11movelength: "+short_width);
                    }
                });
		
		shortSVG.append("text")
			.attr("y", height + margin.top + 27)
			.attr("x", -margin.left + 5)
      .style("font-style","italic")
      .style("font-weight","bold")
			.text("drag across the above graph to select a date range");

      if(id[0] + id[1] == "so")
    {
      var tmp_q = d3.sum(fData, function(d) { return d.counts[2].value; });
      var tmp_a = d3.sum(fData, function(d) { return d.counts[0].value; });
      var tmp_c = d3.sum(fData, function(d) { return d.counts[1].value; });
      
      d3.select("#" + id + "_questions").text(to_si(tmp_q));
      d3.select("#" + id + "_answers").text(to_si(tmp_a));
      d3.select("#" + id + "_comments").text(to_si(tmp_c));
    }
    else{
    var tmp_i = d3.sum(fData, function(d) { return d.counts[2].value; });
      var tmp_ct = d3.sum(fData, function(d) { return d.counts[0].value; });
      var tmp_c = d3.sum(fData, function(d) { return d.counts[1].value; });
      
      d3.select("#" + id + "_issues").text(to_si(tmp_i));
      d3.select("#" + id + "_commits").text(to_si(tmp_ct));
      d3.select("#" + id + "_comments").text(to_si(tmp_c));
    }
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