function empty_graph(id, type, community)
{
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin draw empty graph for user's stackoverflow activity ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
    if(community === "so" && (type === "stacked" || type === "grouped"))
    {
        var x = d3.scale.ordinal()
          .rangeBands([0, global_width], .1);
        
        var y = d3.scale.linear()
          .rangeRound([global_height, 0]);
        
        var barColor = d3.scale.ordinal()
            .range(["#062170","#6d87d6","#133aac"]);
          
        var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");
        
        var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .tickFormat(d3.format(".2s"))
          .ticks(4);
    
        var svg = d3.select("#" + type + "_" + id).append("svg")
            .attr("width", global_width + global_margin.left + global_margin.right)
            .attr("height", global_height + global_margin.top + global_margin.bottom)
        .append("g")
            .attr("transform", "translate(" + global_margin.left + "," + global_margin.top + ")")
            .attr("id", type + "_svg_" + id);
          
		var graph = d3.select("#" + type + "_svg_" + id);
		
        barColor.domain(["Answers","Comments","Questions"]);   
        
        var initial = new Array();
        
        var tempObject =
            {
              message:"Select an area on the graph below to get started",
              total:0,
              overall_month_total:0,
              counts:[
                {
                  value:0,
                  y0:0,
                  y1:0,
                  title:"answers"
                },
                {
                  value:0,
                  y0:0,
                  y1:0,
                  title:"comments"
                },
                {
                  value:0,
                  y0:0,
                  y1:0,
                  title:"questions"
                }]
            };
        
        initial.push(tempObject);
        
        x.domain(initial.map(function(d,i)
        {
            //return d.message;
			return "";
        }));
        
        if(type === "stacked") { y.domain([0, global_stacked_y_max]); }
        else { y.domain([0, global_grouped_y_max]); }
        
        // Graph title
        svg.append("text")
            .attr("x",110)
            .attr("y",-11)
            .style("text-anchor", "middle")
            .style("text-decoration", 'underline')
            .text("Contributions by Month");
        if(type === "stacked")
        {
            svg.append("text")
                .attr("x", 105)
                .attr("y", 1)
                .text("stacked")
                .style("text-anchor", "end")
                .style("font-size","9px")
                .style("font-weight","bold");
            svg.append("text")
				.text("|")
				.attr("x", 115)
				.attr('y', 1)
				.style("text-anchor", "middle")
				.style('font-size', '9px');
            svg.append("text")
              .attr("x", 125)
              .attr("y", 1)
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
        }
        else
        {
            svg.append("text")
                .attr("x", 105)
                .attr("y", 1)
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
				.attr('y', 1)
				.style("text-anchor", "middle")
				.style('font-size', '9px');
            svg.append("text")
              .attr("x", 125)
              .attr("y", 1)
              .text("grouped")
              .style("text-anchor", "start")
              .style("font-size","9px")
              .style("font-weight","bold");
              

        }
      
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
            .data(initial)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function(d,i)
            {
              return "translate(" + x(d.month) + ",0)" ;
            });
		
		graph.append("text")
			.text("Select an area on the graph")
			.attr("y", 35)
			.attr("x", 45);
		graph.append("text")
			.text("below to get started")
			.attr("y", 50)
			.attr("x", 45);
    }
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw empty graph for user's stackoverflow activity <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
    //
    //
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin draw empty graph for user's GitHub activity ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
    else if(community === "gh" && (type === "stacked" || type === "grouped"))
    {
        var x = d3.scale.ordinal()
          .rangeBands([0, global_width], .1);
        
        var y = d3.scale.linear()
          .rangeRound([global_height, 0]);
        
        var barColor = d3.scale.ordinal()
            .range(["#062170","#6d87d6","#133aac"]);
          
        var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");
        
        var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .tickFormat(d3.format(".2s"))
          .ticks(4);
    
        var svg = d3.select("#" + type + "_" + id).append("svg")
            .attr("width", global_width + global_margin.left + global_margin.right)
            .attr("height", global_height + global_margin.top + global_margin.bottom)
        .append("g")
            .attr("transform", "translate(" + global_margin.left + "," + global_margin.top + ")")
            .attr("id", type + "_svg_" + id);
			
		var graph = d3.select("#" + type + "_svg_" + id);
          
        barColor.domain(["commits","comments","issues"]);   
        
        var initial = new Array();
        
        var tempObject =
            {
              message:"Select an area on the graph below to get started",
              total:0,
              overall_month_total:0,
              counts:[
                {
                  value:0,
                  y0:0,
                  y1:0,
                  title:"commits"
                },
                {
                  value:0,
                  y0:0,
                  y1:0,
                  title:"comments"
                },
                {
                  value:0,
                  y0:0,
                  y1:0,
                  title:"issues"
                }]
            };
        
        initial.push(tempObject);
        
        x.domain(initial.map(function(d,i)
        {
            //return d.message;
			return "";
        }));
        
        if(type === "stacked") { y.domain([0, global_stacked_y_max]); }
        else { y.domain([0, global_grouped_y_max]); }
        
        // Graph title
        svg.append("text")
            .attr("x",110)
            .attr("y",-11)
            .style("text-anchor", "middle")
            .style("text-decoration", 'underline')
            .text("Contributions by Month");
        if(type === "stacked")
        {
            svg.append("text")
                .attr("x", 105)
                .attr("y", 1)
                .text("stacked")
                .style("text-anchor", "end")
                .style("font-size","9px")
                .style("font-weight","bold");
            svg.append("text")
				.text("|")
				.attr("x", 115)
				.attr('y', 1)
				.style("text-anchor", "middle")
				.style('font-size', '9px');
            svg.append("text")
              .attr("x", 125)
              .attr("y", 1)
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
        }
        else
        {
            svg.append("text")
                .attr("x", 105)
                .attr("y", 1)
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
				.attr('y', 1)
				.style("text-anchor", "middle")
				.style('font-size', '9px');
            svg.append("text")
              .attr("x", 125)
              .attr("y", 1)
              .text("grouped")
              .style("text-anchor", "start")
              .style("font-size","9px")
              .style("font-weight","bold");

        }
      
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
            .data(initial)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function(d,i)
            {
              return "translate(" + x(d.month) + ",0)" ;
            });
			
		graph.append("text")
			.text("Select an area on the graph")
			.attr("y", 35)
			.attr("x", 45);
		graph.append("text")
			.text("below to get started")
			.attr("y", 50)
			.attr("x", 45);
    }
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw empty graph for user's GitHub activity <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //

    else { alert("Unknown data type parameter passed to empty_graph()"); }
}