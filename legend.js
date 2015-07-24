function legend(id, type, community, other)
{
    var legend_height = 18;
    //var side = 18;
    var rect_width = 25;
    var rect_height = 18;
    var horizontal_offset = 22;
    
    if(type === "bar" && community === "so")
    {   
        var tiid="";
        if(other=="allactivity"){
          tiid="#legend_short_";
        }
        else if(other=="accepted"){
          tiid="#toplegend_";
        }
        else{
          tiid="#legend_";
        }
        var svg = d3.select(tiid + id).append("svg")
            .attr("width", global_width + global_margin.left + global_margin.right)
            .attr("height", legend_height)
        .append("g")
            .attr("transform", "translate(" + global_margin.left + "," + -legend_height + ")")
            .attr("id","legend_svg_" + id);;
        var barColor=null;
        if(other=="allactivity"){
        barColor = d3.scale.ordinal()
            .range(["#062170","#6d87d6","#133aac"]);
        barColor.domain(["answers","comments","questions"]);
        }
        if(other=="answers"){
          barColor = d3.scale.ordinal()
            .range(["#062170"]);
        barColor.domain(["answer"]);
        }
        if(other=="comments"){
        barColor = d3.scale.ordinal()
            .range(["#6d87d6"]);
        barColor.domain(["comment"]);
        }
        if(other=="questions"){
        barColor = d3.scale.ordinal()
            .range(["#133aac"]);
        barColor.domain(["question"]);
        }
        if(other=="accepted"){
        barColor = d3.scale.ordinal()
            .range(["#f09","#00f"]);
        barColor.domain(["nonaccepted","accepted"]);
        }
        
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
                  if(d=="answer"){
                    return "answers";
                  }
                  else if(d=="question"){
                    return "questions";
                  }
                  else if(d=="comment"){
                    return "comments";
                  }
                  else{
                  return d;
                  }
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
              if(d == "questions")
              {
                return id + "_questions";
              }
              else if(d == "answers")
              {
                return id + "_answers";
              }
              else if(d=="comments")
              {
                return id + "_comments";
              }
              else if(d=="accepted"){
                return id+"_accepted";
              }
              else if(d=="nonaccepted"){
                return id+"_nonaccepted";
              }
              else if(d=="question"){
                return id+"_question";
              }
              else if(d=="answer"){
                return id+"_answer";
              }
              else if(d=="comment"){
                return id+"_comment";
              }
            })
          .attr("fill","white")
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
                    var btitle=d;
                    if(d=="answer"){
                      btitle="answers";
                    }
                    if(d=="question"){
                      btitle="questions"
                    }
                    if(d=="comment"){
                      btitle="comments";
                    }
                    var id_array=id.split('_');
                    var user_id=id_array[1];
                    var tagn="";
                    if(id_array[2]!="tile"){
                      tagn=get_strip(id_array[2]);
                    }
                    
                            if(global_date_range!=null){
                              var temp_other=new Array();
                            temp_other[0]=global_date_range[0];
                            temp_other[1]=global_date_range[1];
                              if(other!="allactivity"){
                              if(tagn == "")
                              {
                                tile('Data/tso_data_' + user_id + '.json', 'so_activity_detail', undefined, temp_other, id,btitle,"legend");
                              }
                              else
                              {
                                tile('Data/tso_data_' + user_id + '.json', 'so_activity_detail', tagn, temp_other, id,btitle,"legend");
                              }
                            }
                          }
                });
          //
    }
    
    else if(type === "bar" && community === "gh")
    {   
        var svg=null;
        var tiid="";
        if(other=="allactivity"){
          tiid="#legend_short_";
        }
        else if(other=="tests" || other =="openclose"){
          tiid="#toplegend_";
        }
        else{
          tiid="#legend_";
        }
          svg = d3.select(tiid + id).append("svg")
            .attr("width", global_width + global_margin.left + global_margin.right)
            .attr("height", legend_height)
        .append("g")
            .attr("transform", "translate(" + global_margin.left + "," + -legend_height + ")")
            .attr("id","legend_svg_" + id);;
          
        
        var barColor = null;
        if(other=="allactivity"){
        barColor=d3.scale.ordinal()
            .range(["#4a036f","#af66d5","#7309aa"]);
        barColor.domain(["commits","comments","issues"]);
        }
        if(other =="tests"){
      barColor = d3.scale.ordinal()
      .range(["#00f","#f00"]);
    barColor.domain(["pass","fail"]);
    }
    if(other =="centrality"){
      barColor = d3.scale.ordinal()
      .range(["#09f","#36c","#306"]);
    barColor.domain(["low","median","high"]);
    }
    if(other =="openclose"){
      barColor = d3.scale.ordinal()
      .range(["#493212","#a8712a"]);
    barColor.domain(["close","open"]);
    }
    if(other =="merge"){
      barColor = d3.scale.ordinal()
      .range(["#f00","#00f"]);
    barColor.domain(["nonmerged","merged"]);
    }
    if(other=="commits"){
      barColor = d3.scale.ordinal()
      .range(["#4a036f"]);
    barColor.domain(["commit"]);
    }
    if(other=="issues"){
      barColor = d3.scale.ordinal()
      .range(["#7309aa"]);
    barColor.domain(["issue"]);
    }
    if(other=="comments"){
      barColor = d3.scale.ordinal()
      .range(["#af66d5"]);
    barColor.domain(["comment"]);
    }
        
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
                  if(d=="commit"){
                    return "commits";
                  }
                  else if(d=="issue"){
                    return "issues";
                  }
                  else if(d=="comment"){
                    return "comments";
                  }
                  else{
                  return d;
                  }
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
              if(d == "issues")
              {
                return id + "_issues";
              }
              else if(d == "commits")
              {
                return id + "_commits";
              }
              else if(d =="pass"){
                return id+"_pass";
              }
              else if(d =="fail"){
                return id+"_fail";
              }
              else if(d =="high"){
                return id+"_high";
              }
              else if(d =="median"){
                return id+"_median";
              }
              else if(d =="low"){
                return id+"_low";
              }
              else if(d =="open"){
                return id+"_open";
              }
              else if(d =="close"){
                return id+"_close";
              }
              else if(d =="merged"){
                return id+"_merged";
              }
              else if(d =="nonmerged"){
                return id+"_nonmerged";
              }
              else if(d=="comments")
              {
                return id + "_comments";
              }
              else if(d=="commit")
              {
                return id + "_commit";
              }
              else if(d=="issue")
              {
                return id + "_issue";
              }
              else{
                return id+"_comment";
              }
            })
          .attr("fill","white")
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
                    var btitle=d;
                    if(d=="issue"){
                      btitle="issues";
                    }
                    if(d=="commit"){
                      btitle="commits"
                    }
                    if(d=="comment"){
                      btitle="comments";
                    }
                    var id_array=id.split('_');
                    var user_id=id_array[1];
                    var tagn="";
                    if(id_array[2]!="tile"){
                      var tagnn=get_strip(id_array[2]);
                      //console.log("legend tag: "+tagnn);
                      var findex=tagnn.indexOf("-");
                      if(findex>-1){
                        tagn=tagnn.substring(0,findex)+"/"+tagnn.substring((findex+1));
                      }else{
                      tagn=tagnn;
                    }
                    //console.log("lengend tag /: "+tagn);
                    tagn=set_strip(tagn);
                    }
                    
                            if(global_date_range!=null){
                              var temp_other=new Array();
                            temp_other[0]=global_date_range[0];
                            temp_other[1]=global_date_range[1];
                              if(other!="allactivity"){
                              if(tagn == "")
                              {
                                tile('Data/tgh_data_' + user_id + '.json', 'gh_activity_detail', undefined, temp_other, id,btitle,"legend");
                              }
                              else
                              {
                                tile('Data/tgh_data_' + user_id + '.json', 'gh_activity_detail', tagn, temp_other, id,btitle,"legend");
                              }
                            }
                          }
                });
          //
    }
    
    else if(type === "pie")
    {
        
    }
    
    else { alert("Unknown data type parameter passed to legend()"); }
}