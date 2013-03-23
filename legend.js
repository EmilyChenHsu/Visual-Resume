function legend(id, type, community)
{
    var legend_height = 18;
    //var side = 18;
    var rect_width = 25;
    var rect_height = 18;
    var horizontal_offset = 22;
    
    if(type === "bar" && community === "so")
    {   
        var svg = d3.select("#legend_" + id).append("svg")
            .attr("width", global_width + global_margin.left + global_margin.right)
            .attr("height", legend_height)
        .append("g")
            .attr("transform", "translate(" + global_margin.left + "," + -legend_height + ")")
            .attr("id","legend_svg_" + id);;
        
        var barColor = d3.scale.ordinal()
            .range(["#062170","#6d87d6","#133aac"]);
        barColor.domain(["answers","comments","questions"]);
        
        var legend = svg.selectAll(".legend")
            .data(barColor.domain().slice().reverse())
        .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i)
                {
                    return "translate(" + i * 100 + ",0)";
                });
      
        legend.append("rect")
            .attr("x",horizontal_offset)
            .attr("y", legend_height)
            .attr("width", rect_width)
            .attr("height", rect_height)
            .style("fill", barColor);
      
        legend.append("text")
            .attr("x", horizontal_offset - 3)
            .attr("y", rect_height/2 + legend_height)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d)
                {
                  return d;
                });
         
        //
        legend.append("text")
          .attr("x", horizontal_offset + rect_width/2)
          .attr("y", rect_height/2 + legend_height)
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .text("")
          .attr("id", function(d)
            {
                console.log(id);
              if(d == "questions")
              {
                return id + "_questions";
              }
              else if(d == "answers")
              {
                return id + "_answers";
              }
              else
              {
                return id + "_comments";
              }
            })
          .attr("fill","white");
          //
    }
    
    else if(type === "bar" && community === "gh")
    {   
        var svg = d3.select("#legend_" + id).append("svg")
            .attr("width", global_width + global_margin.left + global_margin.right)
            .attr("height", legend_height)
        .append("g")
            .attr("transform", "translate(" + global_margin.left + "," + -legend_height + ")")
            .attr("id","legend_svg_" + id);;
        
        var barColor = d3.scale.ordinal()
            .range(["#4a036f","#af66d5","#7309aa"]);
        barColor.domain(["commits","comments","issues"]);
        
        var legend = svg.selectAll(".legend")
            .data(barColor.domain().slice().reverse())
        .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i)
                {
                    return "translate(" + i * 100 + ",0)";
                });
      
        legend.append("rect")
            .attr("x",horizontal_offset)
            .attr("y", legend_height)
            .attr("width", rect_width)
            .attr("height", rect_height)
            .style("fill", barColor);
      
        legend.append("text")
            .attr("x", horizontal_offset - 3)
            .attr("y", rect_height/2 + legend_height)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d)
                {
                  return d;
                });
            
        //
        legend.append("text")
          .attr("x", horizontal_offset + rect_width/2)
          .attr("y", rect_height/2 + legend_height)
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .text("")
          .attr("id", function(d)
            {
                console.log(d);
              if(d == "issues")
              {
                return id + "_issues";
              }
              else if(d == "commits")
              {
                return id + "_commits";
              }
              else
              {
                return id + "_comments";
              }
            })
          .attr("fill","white");
          //
    }
    
    else if(type === "pie")
    {
        
    }
    
    else { alert("Unknown data type parameter passed to legend()"); }
}