function pie_chart(source, type, tag)
{
  if(tag == undefined) { tag = null; }
  
  // Changed height from 150 to 180 to add title on top
  var width = 150,
  height = 180,
  radius = Math.min(width, height) / 2;
  var legend_height = 0,
      cube_width = 23,
      cube_height = 15,
      horizontal_offset = 28;
  
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
  // Begin draw pie chart for GitHub data ==>
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
  if(type === "gh")
  {
    // Function to format a number as a percent
    var per = d3.format(".0%");
    var per_long = d3.format(".2%");
    
    var languageArray = new Array();
    var otherLangArray = new Array();
  
    var sliceColor = d3.scale.ordinal()
      .range(["#F47A20","#A76E44","#893E07","#FCAB6F"]);
      
    var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(20);
  
    var pie = d3.layout.pie()
      .value(function(d,i)
        {
          return d.total;        
        })
      .startAngle(-Math.PI/2)
      .endAngle(Math.PI/2);
  
    d3.json(source, function(error, data)
    {
      var fullPie = 0;
      var tileID = "gh_" + data.id + "_tile";
      var svg = d3.select("#pieChart_" + tileID).append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        
      svg.append("text")
        .text("Languages")
        .attr("y",-75)
        .style("text-anchor", "middle");
        
      _.keys(data.languages).forEach(function(d,i)
        {
          //var totalContribution = toInt(data.tags[d].answerCount) + toInt(data.tags[d].questionCount) + toInt(data.tags[d].commentCount);
          languageArray[i] = {language:d,total:data.languages[d]};
          otherLangArray[i] = {language:d,total:data.languages[d]};
          //languageArray[i] = {language:d,total:2343};
          //otherLangArray[i] = {language:d,total:2343};
          fullPie += data.languages[d];
          //otherTagArray[i] = {tag:d,total:totalContribution};
        });
      // Sort array of tag objects by their contribution scores from highest to lowest
      otherLangArray.sort(function(a,b)
        {
          return b.total - a.total;
        });
      if(otherLangArray.length > 3)
      {
        otherLangArray = otherLangArray.slice(3);
      }
  
      languageArray.sort(function(a,b)
        {
          return b.total - a.total;
        });
      var otherTotal = 0;
      
      if(languageArray.length > 3)
        { 
          otherTotal = languageArray[3].total;
          for(var i = 4; i < languageArray.length; i++)
          {
            languageArray[3].total += languageArray[i].total;
            otherTotal += languageArray[i].total;
          }
        
          languageArray[3].language = "other";
          var deleteNum = languageArray.length - 3;
          languageArray.splice(4,deleteNum);
        }
  
      var g = svg.selectAll(".arc")
        .data(pie(languageArray))
        .enter().append("g")
          .attr("class", "arc");
      
      g.append("path")
        .attr("d", arc)
        .style("fill", function(d,i)
          {
            return sliceColor(languageArray[i].language);
          })
        .style("opacity", "1")
        .attr("id",function(d)
          {
            return (tileID + "_pie_" + d.data.language);
          })
        .attr("title",function(d)
          {
            $(this).tipsy({gravity: 's', html: true, hoverable: true});
            if(d.data.language != "other")
            {
              var percentage = per_long(d.data.total/fullPie);
              var temp_link = "<a class='dark_background' href='javascript:tile(\"" + source + "\",\"gh_lang\",\"" + set_tagID(d.data.language) + "\");'>"
              var temp_title = "<table><tr><td>" + temp_link + d.data.language + ":</a></td><td>" + temp_link + percentage + "</a></td></tr></table>";
              return temp_title;
            }
            else
            {
              //
              var content = "Other Tags:</br></br><table>";
              var other_count = otherLangArray.length;
              if(other_count > 7)
              {
                for(var i = 0; i < 7; i++)
                {
                  var percentage = per_long(otherLangArray[i].total/fullPie);
                  content += ("<tr><td><a class='dark_background' href='javascript:tile(\"" + source + "\",\"gh_lang\",\"" + set_tagID(otherLangArray[i].language) + "\");'>" + otherLangArray[i].language + ":</a></td><td>" + percentage + "</td></tr>");
                }
                content += "</table>";
              }
              else
              {
                for(var i = 0; i < otherLangArray.length; i++)
                {
                  var percentage = per_long(otherLangArray[i].total/fullPie);
                  content += ("<tr><td><a class='dark_background' href='javascript:tile(\"" + source + "\",\"gh_lang\",\"" + set_tagID(otherLangArray[i].language) + "\");'>" + otherLangArray[i].language + ":</a></td><td>" + percentage + "</td></tr>");
                }
                content += "</table>";
              }
              return content;
              //
            }
          })
        .on("click",function(d)
          {
            if(d.data.language != "other")
            {
              click(d.data.language, "gh_lang");
            }
          })
        .on("mouseover",function(d)
          { 
            d3.select(this).style("opacity",".6");
            
            var tempID = set_tagID(d.data.language);
            var tempTileID = "gh_" + data.id + "_" + tempID + "_tile";
            var tempEl = document.getElementById(tempTileID);
            
            if(tempEl != null)
            {
              tempEl.style.backgroundColor='#aaa';
            }
          })
        .on("mouseout",function(d)
          {
            d3.select(this).style("opacity","1");
            
            var tempID = set_tagID(d.data.language);
            var tempTileID = "gh_" + data.id + "_" + tempID + "_tile";
            var tempEl = document.getElementById(tempTileID);
            
            if(tempEl != null)
            {
              tempEl.style.backgroundColor='#fff';
            }
          });      
        
  // ===== BEGIN pie chart labeling ===== //
        var pie_legend = svg.selectAll(".pie_legend")
          .data(sliceColor.domain().slice())
        .enter().append("g")
          .attr("class", "pie_legend")
          .attr("transform", function(d, i)
            {
              if(i < 2)
              {
                var vert_offset = i * 15 + i * 5 + 5;
                var horiz_offset = -60;
                return "translate(" + horiz_offset + "," + vert_offset + ")";
              }
              else
              {
                var vert_offset = (i - 2) * 15 + (i - 2) * 5 + 5;
                var horiz_offset = 20;
                return "translate(" + horiz_offset + "," + vert_offset + ")";  
              }
            });
    
      pie_legend.append("rect")
        .attr("x",horizontal_offset)
        .attr("y",legend_height)
        .attr("width", cube_width)
        .attr("height", cube_height)
        .style("fill", function(d,i)
          {
            return sliceColor(d);
          })
        .style("opacity", "1");
    
      pie_legend.append("text")
        .attr("x", horizontal_offset - 3)
        .attr("y", cube_height/2 + legend_height)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d)
          {
            return get_tagID(d);
          });
      
      pie_legend.append("text")
        .attr("x", horizontal_offset + cube_width/2)
        .attr("y", cube_height/2 + legend_height)
        .attr("dy", ".35em")
        .attr("fill","white")
        .style("text-anchor", "middle")
        .text(function(d,i)
          {
            var value = languageArray[i].total / fullPie;
            return per(value);
          });
  // ===== END pie chart labeling ===== //
        
    });
  }
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
  // End draw pie chart for GitHub data <==
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
  //
  //
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
  // Begin draw pie chart for all user's stackoverflow data ==>
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
  else if(type === "so_all")
  {
    // Function to format a number as a percent
    var per = d3.format(".0%");
    var per_long = d3.format(".2%");
    
    var tagArray = new Array();
    var otherTagArray = new Array();
  
    var sliceColor = d3.scale.ordinal()
      .range(["#F47A20","#A76E44","#893E07","#FCAB6F"]);
      
    var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(20);
  
    var pie = d3.layout.pie()
      .value(function(d,i)
        {
          return d.total;        
        })
      .startAngle(-Math.PI/2)
      .endAngle(Math.PI/2);
  
    d3.json(source, function(error, data)
    {
      var fullPie = 0;
      var tileID = "so_" + data.id + "_tile";
      var tipID = tileID + "_tip"
      var svg = d3.select("#pieChart_" + tileID).append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        
      svg.append("text")
        .text("Contributions by Tag")
        .attr("y",-75)
        .style("text-anchor", "middle");
        
      _.keys(data.tags).forEach(function(d,i)
        {
          var totalContribution = toInt(data.tags[d].answerCount) + toInt(data.tags[d].questionCount) + toInt(data.tags[d].commentCount);
          tagArray[i] = {tag:d,total:totalContribution};
          fullPie += totalContribution;
          otherTagArray[i] = {tag:d,total:totalContribution};
        });
      // Sort array of tag objects by their contribution scores from highest to lowest
      otherTagArray.sort(function(a,b)
        {
          return b.total - a.total;
        });
      if(otherTagArray.length > 3)
      {
        otherTagArray = otherTagArray.slice(3);
      }
  
      tagArray.sort(function(a,b)
        {
          return b.total - a.total;
        });
      var otherTotal = 0;
      
      if(tagArray.length > 3)
        { 
          otherTotal = tagArray[3].total;
          for(var i = 4; i < tagArray.length; i++)
          {
            tagArray[3].total += tagArray[i].total;
            otherTotal += tagArray[i].total;
          }
        
          tagArray[3].tag = "other";
          var deleteNum = tagArray.length - 3;
          tagArray.splice(4,deleteNum);
        }
  
      var g = svg.selectAll(".arc")
        .data(pie(tagArray))
        .enter().append("g")
          .attr("class", "arc");
      
      g.append("path")
        .attr("d", arc)
        .style("fill", function(d,i)
          {
            return sliceColor(tagArray[i].tag);
          })
        .style("opacity", "1")
        .attr("id",function(d)
          {
            return (tileID + "_pie_" + d.data.tag);
          })
        .attr("title",function(d)
          {
            $(this).tipsy({gravity: 's', html: true, hoverable: true});
            if(d.data.tag != "other")
            {
              var percentage = per_long(d.data.total/fullPie);
              var temp_link = "<a class='dark_background' href='javascript:tile(\"" + source + "\",\"so_tag\",\"" + set_tagID(d.data.tag) + "\");'>"
              var temp_title = "<table><tr><td>" + temp_link + d.data.tag + ":</a></td><td>" + temp_link + percentage + "</a></td></tr></table>";
              return temp_title;
            }
            else
            {
              //
              var content = "Other Tags:</br></br><table>";
              var other_count = otherTagArray.length;
              if(other_count > 7)
              {
                for(var i = 0; i < 7; i++)
                {
                  var percentage = per_long(otherTagArray[i].total/fullPie);
                  content += ("<tr><td><a class='dark_background' href='javascript:tile(\"" + source + "\",\"so_tag\",\"" + set_tagID(otherTagArray[i].tag) + "\");'>" + otherTagArray[i].tag + ":</a></td><td>" + percentage + "</td></tr>");
                }
                content += "</table>";
              }
              else
              {
                for(var i = 0; i < otherTagArray.length; i++)
                {
                  var percentage = per_long(otherTagArray[i].total/fullPie);
                  content += ("<tr><td><a class='dark_background' href='javascript:tile(\"" + source + "\",\"so_tag\",\"" + set_tagID(otherTagArray[i].tag) + "\");'>" + otherTagArray[i].tag + ":</a></td><td>" + percentage + "</td></tr>");
                }
                content += "</table>";
              }
              return content;
              //
            }
          })
        .on("click",function(d)
          {
            if(d.data.tag != "other")
            {
              click(d.data.tag, "so_tag");
            }
          })
        .on("mouseover",function(d)
          { 
            d3.select(this).style("opacity",".6");
            
            var tempID = set_tagID(d.data.tag);
            var tempTileID = "so_" + data.id + "_" + tempID + "_tile";
            var tempEl = document.getElementById(tempTileID);
            
            if(tempEl != null)
            {
              tempEl.style.backgroundColor='#aaa';
            }
            
            var test = document.getElementById(tipID);
            
            if(test == null && d.data.tag == "other")
            {
              var y_coord = $(this).offset().top;
              var x_coord = $(this).offset().left;
            
              x_coord += 50;
              y_coord += 50;
            }
            else if(d.data.tag == "other")
            {
              var temp = '#' + tipID;
              $(temp).show();
            }
          })
        .on("mouseout",function(d)
          {
            d3.select(this).style("opacity","1");
            var temp = '#' + tipID;
            $(temp).hide();
            
            var tempID = set_tagID(d.data.tag);
            var tempTileID = "so_" + data.id + "_" + tempID + "_tile";
            var tempEl = document.getElementById(tempTileID);
            
            if(tempEl != null)
            {
              tempEl.style.backgroundColor='#fff';
            }
          });      
        
  // ===== BEGIN pie chart labeling ===== //
        var pie_legend = svg.selectAll(".pie_legend")
          .data(sliceColor.domain().slice())
        .enter().append("g")
          .attr("class", "pie_legend")
          .attr("transform", function(d, i)
            {
              if(i < 2)
              {
                var vert_offset = i * 15 + i * 5 + 5;
                var horiz_offset = -60;
                return "translate(" + horiz_offset + "," + vert_offset + ")";
              }
              else
              {
                var vert_offset = (i - 2) * 15 + (i - 2) * 5 + 5;
                var horiz_offset = 20;
                return "translate(" + horiz_offset + "," + vert_offset + ")";  
              }
            });
    
      pie_legend.append("rect")
        .attr("x",horizontal_offset)
        .attr("y",legend_height)
        .attr("width", cube_width)
        .attr("height", cube_height)
        .style("fill", function(d,i)
          {
            return sliceColor(d);
          })
        .style("opacity", "1");
    
      pie_legend.append("text")
        .attr("x", horizontal_offset - 3)
        .attr("y", cube_height/2 + legend_height)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d)
          {
            return get_tagID(d);
          });
      
      pie_legend.append("text")
        .attr("x", horizontal_offset + cube_width/2)
        .attr("y", cube_height/2 + legend_height)
        .attr("dy", ".35em")
        .attr("fill","white")
        .style("text-anchor", "middle")
        .text(function(d,i)
          {
            var value = tagArray[i].total / fullPie;
            return per(value);
          });
  // ===== END pie chart labeling ===== //
        
    });
  }
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
  // End draw pie chart for all user's stackoverflow data <==
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
  //
  //
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
  // Begin draw pie chart for user's stackoverflow tag-specific data ==>
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
  else if(type === "so_tag" && tag != null)
  {
    tag = get_tagID(tag); // Just in case the tag had to be "set" in order to be passed as a parameter to the funciton
  
    // Function to format a number as a percent
    var per = d3.format(".0%");
    var per_long = d3.format(".2%");
    
    var tagArray = new Array();
    var otherTagArray = new Array();
  
    var sliceColor = d3.scale.ordinal()
      .range(["#F47A20","#A76E44","#893E07","#FCAB6F"]);
      
    var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(20);
  
    var pie = d3.layout.pie()
      .value(function(d,i)
        {
          return d.total;        
        })
      .startAngle(-Math.PI/2)
      .endAngle(Math.PI/2);
  
    d3.json(source, function(error, data)
    {
      var fullPie = 0;
      var tagID = set_tagID(tag);
      tileID = "so_" + data.id + "_" + tagID + "_tile";
      var tipID = tileID + "_tip"
      var svg = d3.select("#pieChart_" + tileID).append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
          
      svg.append("text")
        .text("Related Tags")
        .attr("y",-75)
        .style("text-anchor", "middle");
        
      _.keys(data.tags[tag].relatedTags).forEach(function(d,i)
        {
          var value = data.tags[tag].relatedTags[d];
          fullPie += value;
          tagArray[i] = {tag:d,total:value};
          
          otherTagArray[i] = {tag:d,total:value};
        });
      // Sort array of tag objects by their contribution scores from highest to lowest
      otherTagArray.sort(function(a,b)
        {
          return b.total - a.total;
        });
      if(otherTagArray.length > 3)
      {
        otherTagArray = otherTagArray.slice(3);
      }
  
      tagArray.sort(function(a,b)
        {
          return b.total - a.total;
        });
      var otherTotal = 0;
        
      if(tagArray.length > 3)
        { 
          otherTotal = tagArray[3].total;
          for(var i = 4; i < tagArray.length; i++)
          {
            tagArray[3].total += tagArray[i].total;
            otherTotal += tagArray[i].total;
          }
        
          tagArray[3].tag = "other";
          var deleteNum = tagArray.length - 3;
          tagArray.splice(4,deleteNum);
        }
  
      var g = svg.selectAll(".arc")
        .data(pie(tagArray))
        .enter().append("g")
          .attr("class", "arc");
      
      g.append("path")
        .attr("d", arc)
        .style("fill", function(d,i)
          {
            return sliceColor(tagArray[i].tag);
          })
        .style("opacity", "1")
        .attr("id",function(d)
          {
            return (tileID + "_pie_" + set_tagID(d.data.tag));
          })
        .on("click",function(d)
          {
            if(d.data.tag != "other")
            {
              click(d.data.tag, "so_tag");
            }
          })
        .on("mouseover",function(d)
          { 
            d3.select(this).style("opacity",".6");
            
            var tempID = set_tagID(d.data.tag);
            var tempTileID = "so_" + data.id + "_" + tempID + "_tile";
            var tempEl = document.getElementById(tempTileID);
            
            if(tempEl != null)
            {
              tempEl.style.backgroundColor='#aaa';
            }
            
            var test = document.getElementById(tipID);
            
            if(test == null && d.data.tag == "other")
            {
              var y_coord = $(this).offset().top;
              var x_coord = $(this).offset().left;
            
              x_coord += 50;
              y_coord += 50;
            
              d3.select("body")
                .append("div")
                  .attr("class","other_tip")
                  .attr("id",tipID)
                  .style("top",function(e)
                    {
                      return y_coord + "px";  
                    })
                  .style("left",function(e)
                    {
                      return x_coord + "px";  
                    })
                  .html(function()
                    {
                      var content = "Other Tags:</br></br><table>";
                      for(var i = 0; i < otherTagArray.length; i++)
                      {
                        var percentage = per_long(otherTagArray[i].total/fullPie);
                        content += ("<tr><td><a class='dark_background' href='javascript:tile(\"" + source + "\",\"so_tag\",\"" + set_tagID(otherTagArray[i].tag) + "\");'>" + otherTagArray[i].tag + ":</a></td><td>" + percentage + "</td></tr>");
                      }
                      content += "</table>";
                      return content;
                    })
                  .on("mouseout",function()
                    {
                      $(this).hide();
                      d3.select(this).style("opacity",".8");
                    })
                  .on("mouseover",function()
                    {
                      $(this).show();
                      d3.select(this).style("opacity","1");
                    });
            }
            else if(d.data.tag == "other")
            {
              var temp = '#' + tipID;
              $(temp).show();
            }
          })
        .on("mouseout",function(d)
          {
            d3.select(this).style("opacity","1");
            var temp = '#' + tipID;
            $(temp).hide();
            
            var tempID = set_tagID(d.data.tag);
            var tempTileID = "so_" + data.id + "_" + tempID + "_tile";
            var tempEl = document.getElementById(tempTileID);
            
            if(tempEl != null)
            {
              tempEl.style.backgroundColor='#fff';
            }
          });      
        
  // ===== BEGIN pie chart labeling ===== //
        var pie_legend = svg.selectAll(".pie_legend")
          .data(sliceColor.domain().slice())
        .enter().append("g")
          .attr("class", "pie_legend")
          .attr("transform", function(d, i)
            {
              if(i < 2)
              {
                var vert_offset = i * 15 + i * 5 + 5;
                var horiz_offset = -60;
                return "translate(" + horiz_offset + "," + vert_offset + ")";
              }
              else
              {
                var vert_offset = (i - 2) * 15 + (i - 2) * 5 + 5;
                var horiz_offset = 20;
                return "translate(" + horiz_offset + "," + vert_offset + ")";  
              }
            });
    
      pie_legend.append("rect")
        .attr("x",horizontal_offset)
        .attr("y",legend_height)
        .attr("width", cube_width)
        .attr("height", cube_height)
        .style("fill", function(d,i)
          {
            return sliceColor(d);
          })
        .style("opacity", "1");
    
      pie_legend.append("text")
        .attr("x", horizontal_offset - 3)
        .attr("y", cube_height/2 + legend_height)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d)
          {
            return d;
          });
      
      pie_legend.append("text")
        .attr("x", horizontal_offset + cube_width/2)
        .attr("y", cube_height/2 + legend_height)
        .attr("dy", ".35em")
        .attr("fill","white")
        .style("text-anchor", "middle")
        .text(function(d,i)
          {
            var value = tagArray[i].total / fullPie;
            return per(value);
          });
  // ===== END pie chart labeling ===== //
        
    });
  }
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
  // End draw pie chart for user's stackoverflow tag-specific data <==
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
  
  else { alert("Unknown data type parameter passed to pie_chart()"); }
  
  function click(tag, type)
  {
    tile(source, type, tag);
  }
}