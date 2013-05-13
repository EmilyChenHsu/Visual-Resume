// Ensures data is consistent from start month to end month
// Places properly formated data into global_data array
function data_format(source, type, tag)
{
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin manipulation of all stackoverflow data ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
        if(type === "so_all")
        {
            d3.json(source,function(error,data)
            {
                var tempDate = global_start_date;
                
                var tileID = "so_" + data.id + "_tile";
            
                var graphData = new Array();
                
                if(data.activity != null)
                {
                        _.keys(data.activity).forEach(function(d,i)
                        {      
                            var qc = toInt(data.activity[d].questionCount);
                            var ac = toInt(data.activity[d].answerCount);
                            var cc = toInt(data.activity[d].commentCount);
                      
                            var monthTotal = qc + ac + cc;
                          
                            var y0 = 0;
                      
                            var fullDate = new Date(d.substr(0,4),(+d.substr(5,7) - 1));
                            graphData[i] =
                            {
                            
                              month:d,
                              fullDate: fullDate,
                              total:monthTotal,
                              counts:[
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:ac,
                                  y0:y0,
                                  y1:y0 += ac,
                                  title:"answers"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:cc,
                                  y0:y0,
                                  y1:y0 += cc,
                                  title:"comments"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:qc,
                                  y0:y0,
                                  y1:y0 += qc,
                                  title:"questions"
                                }]
                            };
                    
                        });
                }
                else
                {      
                    var y0 = 0;
              
                    var fullDate = new Date(tempDate.substr(0,4),(+tempDate.substr(5,7) - 1));
                    graphData[0] =
                    {
                    
                      month: tempDate,
                      fullDate: fullDate,
                      total: 0,
                      counts:[
                        {
                                type: type,
                                user_id: data.id,
                                month: tempDate,
                          value:0,
                          y0:y0,
                          y1:y0 += 0,
                          title:"answers"
                        },
                        {
                                type: type,
                                user_id: data.id,
                                month: tempDate,
                          value:0,
                          y0:y0,
                          y1:y0 += 0,
                          title:"comments"
                        },
                        {
                                type: type,
                                user_id: data.id,
                                month: tempDate,
                          value:0,
                          y0:y0,
                          y1:y0 += 0,
                          title:"questions"
                        }]
                    };
                }
                
                // ===== Sort the data by date ===== //
                function byDate(a,b)
                {
                  if(a.month < b.month)
                  {
                    return -1;
                  }
                  if(a.month > b.month)
                  {
                    return 1;
                  }
                  return 0;
                }
                graphData.sort(byDate);
                // ===== ===== ===== ===== === ===== //
                
                // ===== Fill in missing dates ===== //
                //for(var i = 0; i < graphData.length; i++)
                for(var i = 0; i < global_month_count; i++)
                {
                    //var date = graphData[i].month;
              
                    while(xLESSy(tempDate,global_end_date))
                    {
                        if(xINy(graphData,tempDate))
                        {
                          tempDate = addMonth(tempDate);
                        }
                        else
                        {
                            var fullDate = new Date(tempDate.substr(0,4),(+tempDate.substr(5,7) - 1));
                            var tempObject =
                            {
                                month:tempDate,
                                fullDate: fullDate,
                                total:0,
                                overall_month_total:0,
                                counts:[
                                    {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        value:0,
                                        y0:0,
                                        y1:0,
                                        title:"answers"
                                    },
                                    {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        value:0,
                                        y0:0,
                                        y1:0,
                                        title:"comments"
                                    },
                                    {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        value:0,
                                        y0:0,
                                        y1:0,
                                        title:"questions"
                                    }]
                            };
                            graphData.push(tempObject);
                            
                            tempDate = addMonth(tempDate);
                        }
                    }
                }
                // ===== ===== ===== ===== === ===== //
                
                // ===== Sort the data by date again ===== //
                graphData.sort(byDate);
                // ===== ===== ===== ===== === ===== ==== //
                        
                var temp_max = d3.max(graphData, function(d)
                {
                    return d.total;
                });
                if(temp_max > global_stacked_y_max) { global_stacked_y_max = temp_max; }
                
                var to_push_max = [temp_max, tileID];
                global_stacked_y_max_array.push(to_push_max);
                    
                var to_push = [graphData, tileID];
                global_data.push(to_push);
                
                temp_max = d3.max(graphData, function(d,i)
                {
                  return d3.max(graphData[i].counts, function(d)
                    {
                        return d.value;
                    });
                });
              
                if(temp_max > global_grouped_y_max) { global_grouped_y_max = temp_max; }
                
                to_push_max = [temp_max, tileID];
                global_grouped_y_max_array.push(to_push_max);
                
                empty_graph(tileID, "stacked", "so");
                empty_graph(tileID, "grouped", "so");
                short_chart(graphData, tileID);
            })
        }
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End manipulation of all stackoverflow data <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
    //
    //
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin manipulation of tag-specific stackoverflow data ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
        else if(type === "so_tag" && tag != null)
        {
            d3.json(source,function(error,data)
            {
                var tagID = set_strip(tag);
                var tileID = "so_" + data.id + "_" + tagID + "_tile";
                var tempDate = global_start_date;
                    
                var graphData = new Array();
                tag = get_strip(tag);  // ++
                _.keys(data.tags[tag].activity).forEach(function(d,i)
                    {      
                      var qc = toInt(data.tags[tag].activity[d].questionCount);
                      var ac = toInt(data.tags[tag].activity[d].answerCount);
                      var cc = toInt(data.tags[tag].activity[d].commentCount);
                      
                      var monthTotal = qc + ac + cc;
                    
                      var y0 = 0;
                      
                      var fullDate = new Date(d.substr(0,4),(+d.substr(5,7) - 1));
                      graphData[i] =
                      {
                
                        month:d,
                        total:monthTotal,
                        fullDate: fullDate,
                        counts:[
                          {
                                type: type,
                                tag: tag,
                                user_id: data.id,
                                month:d,
                            value:ac,
                            y0:y0,
                            y1:y0 += ac,
                            title:"answers"
                          },
                          {
                                type: type,
                                tag: tag,
                                user_id: data.id,
                                month:d,
                            value:cc,
                            y0:y0,
                            y1:y0 += cc,
                            title:"comments"
                          },
                          {
                                type: type,
                                tag: tag,
                                user_id: data.id,
                                month:d,
                            value:qc,
                            y0:y0,
                            y1:y0 += qc,
                            title:"questions"
                          }]
                      };
                
                    });
                    
                    // ===== Sort the data by date ===== //
                    function byDate(a,b)
                    {
                      if(a.month < b.month)
                      {
                        return -1;
                      }
                      if(a.month > b.month)
                      {
                        return 1;
                      }
                      return 0;
                    }
                    graphData.sort(byDate);
                    // ===== ===== ===== ===== === ===== //
                    
                    // ===== Fill in missing dates ===== //
                    //for(var i = 0; i < graphData.length; i++)
                    for(var i = 0; i < global_month_count; i++)
                    {
                      //var date = graphData[i].month;
                
                      while(xLESSy(tempDate,global_end_date))
                      {
                        if(xINy(graphData,tempDate))
                        {
                          tempDate = addMonth(tempDate);
                        }
                        else
                        {
                          var fullDate = new Date(tempDate.substr(0,4),(+tempDate.substr(5,7) - 1));
                          var tempObject =
                          {
                            month:tempDate,
                            total:0,
                            fullDate: fullDate,
                            counts:[
                              {
                                type: type,
                                tag: tag,
                                user_id: data.id,
                                month:tempDate,
                                value:0,
                                y0:0,
                                y1:0,
                                title:"answers"
                              },
                              {
                                type: type,
                                tag: tag,
                                user_id: data.id,
                                month:tempDate,
                                value:0,
                                y0:0,
                                y1:0,
                                title:"comments"
                              },
                              {
                                type: type,
                                tag: tag,
                                user_id: data.id,
                                month:tempDate,
                                value:0,
                                y0:0,
                                y1:0,
                                title:"questions"
                              }]
                          };
                          graphData.push(tempObject);
                
                          tempDate = addMonth(tempDate);
                        }
                      }
                    }
                    // ===== ===== ===== ===== === ===== //
                    // ===== Sort the data by date again ===== //
                    graphData.sort(byDate);
                    // ===== ===== ===== ===== === ===== ==== //
                    
                    var temp_max = d3.max(graphData, function(d)
                    {
                      return d.total;
                    });
                    if(temp_max > global_stacked_y_max) { global_stacked_y_max = temp_max; }
                    
                    var to_push_max = [temp_max, tileID];
                    global_stacked_y_max_array.push(to_push_max);
                        
                    var to_push = [graphData, tileID];
                    global_data.push(to_push);
                    
                    temp_max = d3.max(graphData, function(d)
                        {
                          return d.total;
                        });
                        if(temp_max > global_stacked_y_max) { global_stacked_y_max = temp_max; }
                        
                        to_push_max = [temp_max, tileID];
                        global_stacked_y_max_array.push(to_push_max);
                            
                        to_push = [graphData, tileID];
                        global_data.push(to_push);
                
                empty_graph(tileID, "stacked", "so");
                empty_graph(tileID, "grouped", "so");
                short_chart(graphData, tileID);
            })
        }
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End manipulation of tag-specific stackoverflow data <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
    //
    //
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin manipulation of GitHub data ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
        else if(type === "gh")
        {
            d3.json(source,function(error,data)
            {
                var tempDate = global_start_date;
                
                var tileID = "gh_" + data.id + "_tile";
            
                var graphData = new Array();
                
                if(data.activity != null)
                {
                        _.keys(data.activity).forEach(function(d,i)
                        {      
                            var ic = toInt(data.activity[d].issueCount);
                            var cic = toInt(data.activity[d].commitCount);
                            var cc = toInt(data.activity[d].commentCount);
                      
                            var monthTotal = ic + cic + cc;
                          
                            var y0 = 0;
                      
                            var fullDate = new Date(d.substr(0,4),(+d.substr(5,7) - 1));
                            graphData[i] =
                            {
                              month:d,
                              fullDate: fullDate,
                              total:monthTotal,
                              counts:[
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:cic,
                                  y0:y0,
                                  y1:y0 += cic,
                                  title:"commits"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:cc,
                                  y0:y0,
                                  y1:y0 += cc,
                                  title:"comments"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:ic,
                                  y0:y0,
                                  y1:y0 += ic,
                                  title:"issues"
                                }]
                            };
                        });
                }
                else
                {
                            var monthTotal = 0;
                          
                            var y0 = 0;
                      
                            var fullDate = new Date(tempDate.substr(0,4),(+tempDate.substr(5,7) - 1));
                            graphData[0] =
                            {
                            
                              month: tempDate,
                              fullDate: fullDate,
                              total: monthTotal,
                              counts:[
                                {
                                        type: type,
                                        user_id: data.id,
                                        month: tempDate,
                                  value: 0,
                                  y0:y0,
                                  y1:y0 += 0,
                                  title:"commits"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month: tempDate,
                                  value: 0,
                                  y0:y0,
                                  y1:y0 += 0,
                                  title:"comments"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month: tempDate,
                                  value: 0,
                                  y0:y0,
                                  y1:y0 += 0,
                                  title:"issues"
                                }]
                            };
                }
                
                // ===== Sort the data by date ===== //
                function byDate(a,b)
                {
                  if(a.month < b.month)
                  {
                    return -1;
                  }
                  if(a.month > b.month)
                  {
                    return 1;
                  }
                  return 0;
                }
                graphData.sort(byDate);
                // ===== ===== ===== ===== === ===== //
                
                // ===== Fill in missing dates ===== //
                for(var i = 0; i < global_month_count; i++)
                //for(var i = 0; i < graphData.length; i++)
                {
                    //var date = graphData[i].month;
              
                    while(xLESSy(tempDate,global_end_date))
                    {
                        if(xINy(graphData,tempDate))
                        {
                          tempDate = addMonth(tempDate);
                        }
                        else
                        {
                            var fullDate = new Date(tempDate.substr(0,4),(+tempDate.substr(5,7) - 1));
                            var tempObject =
                            {
                                month:tempDate,
                                fullDate: fullDate,
                                total:0,
                                overall_month_total:0,
                                counts:[
                                    {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        value:0,
                                        y0:0,
                                        y1:0,
                                        title:"commits"
                                    },
                                    {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        value:0,
                                        y0:0,
                                        y1:0,
                                        title:"comments"
                                    },
                                    {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        value:0,
                                        y0:0,
                                        y1:0,
                                        title:"issues"
                                    }]
                            };
                            graphData.push(tempObject);
                            
                            tempDate = addMonth(tempDate);
                        }
                    }
                }
                // ===== ===== ===== ===== === ===== //
                
                // ===== Sort the data by date again ===== //
                graphData.sort(byDate);
                // ===== ===== ===== ===== === ===== ==== //
                        
                var temp_max = d3.max(graphData, function(d)
                {
                    return d.total;
                });

                if(temp_max > global_stacked_y_max || global_stacked_y_max == undefined) { global_stacked_y_max = temp_max; }
                
                var to_push_max = [temp_max, tileID];
                global_stacked_y_max_array.push(to_push_max);
                    
                var to_push = [graphData, tileID];
                global_data.push(to_push);
                
                temp_max = d3.max(graphData, function(d,i)
                {
                  return d3.max(graphData[i].counts, function(d)
                    {
                        return d.value;
                    });
                });
              
                if(temp_max > global_grouped_y_max || global_grouped_y_max == undefined) { global_grouped_y_max = temp_max; }
                
                to_push_max = [temp_max, tileID];
                global_grouped_y_max_array.push(to_push_max);
                        
                empty_graph(tileID, "stacked", "gh");
                empty_graph(tileID, "grouped", "gh");
                short_chart(graphData, tileID);
                
            })
        }
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End manipulation of GitHub data <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
    //
    //
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin manipulation of GitHub repo data ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
        else if(type === "gh_repo" && tag != null)
        {
            d3.json(source,function(error,data)
            {
                var tempDate = global_start_date;
                
                var tileID = "gh_" + data.id + "_" + tag + "_tile";
            
                var graphData = new Array();
                    
                // Some finangling to get the 'tag' to the correct format as a string
                String(tag);
                var tmp = tag.replace("-","/");
                tag = tmp;
                    
                    
                _.keys(data.repos[tag].activity).forEach(function(d,i)
                {
                    var ic = toInt(data.repos[tag].activity[d].issueCount);
                    var cic = toInt(data.repos[tag].activity[d].commitCount);
                    var cc = toInt(data.repos[tag].activity[d].commentCount);
              
                    var monthTotal = ic + cic + cc;
                  
                    var y0 = 0;
              
                    var fullDate = new Date(d.substr(0,4),(+d.substr(5,7) - 1));
                    graphData[i] =
                    {
                    
                      month:d,
                      fullDate: fullDate,
                      total:monthTotal,
                      counts:[
                        {
                                type: type,
                                user_id: data.id,
                                month:d,
                                repo: tag,
                          value:cic,
                          y0:y0,
                          y1:y0 += cic,
                          title:"commits"
                        },
                        {
                                type: type,
                                user_id: data.id,
                                month:d,
                                repo: tag,
                          value:cc,
                          y0:y0,
                          y1:y0 += cc,
                          title:"comments"
                        },
                        {
                                type: type,
                                user_id: data.id,
                                month:d,
                                repo: tag,
                          value:ic,
                          y0:y0,
                          y1:y0 += ic,
                          title:"issues"
                        }]
                    };
            
                });
                // ===== Sort the data by date ===== //
                function byDate(a,b)
                {
                  if(a.month < b.month)
                  {
                    return -1;
                  }
                  if(a.month > b.month)
                  {
                    return 1;
                  }
                  return 0;
                }
                graphData.sort(byDate);
                // ===== ===== ===== ===== === ===== //
                
                // ===== Fill in missing dates ===== //
                //for(var i = 0; i < graphData.length; i++)
                for(var i = 0; i < global_month_count; i++)
                {
                    //var date = graphData[i].month;
              
                    while(xLESSy(tempDate,global_end_date))
                    {
                        if(xINy(graphData,tempDate))
                        {
                          tempDate = addMonth(tempDate);
                        }
                        else
                        {
                            var fullDate = new Date(tempDate.substr(0,4),(+tempDate.substr(5,7) - 1));
                            var tempObject =
                            {
                                month:tempDate,
                                fullDate: fullDate,
                                total:0,
                                overall_month_total:0,
                                counts:[
                                    {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        repo: tag,
                                        value:0,
                                        y0:0,
                                        y1:0,
                                        title:"commits"
                                    },
                                    {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        repo: tag,
                                        value:0,
                                        y0:0,
                                        y1:0,
                                        title:"comments"
                                    },
                                    {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        repo: tag,
                                        value:0,
                                        y0:0,
                                        y1:0,
                                        title:"issues"
                                    }]
                            };
                            graphData.push(tempObject);
                            
                            tempDate = addMonth(tempDate);
                        }
                    }
                }
                // ===== ===== ===== ===== === ===== //
                
                // ===== Sort the data by date again ===== //
                graphData.sort(byDate);
                // ===== ===== ===== ===== === ===== ==== //
                        
                var temp_max = d3.max(graphData, function(d)
                {
                    return d.total;
                });
                if(temp_max > global_stacked_y_max) { global_stacked_y_max = temp_max; }
                
                var to_push_max = [temp_max, tileID];
                global_stacked_y_max_array.push(to_push_max);
                    
                //var temp_collaborators = data.repos[tag].collaborators;
                //var temp_contributors = data.repos[tag].contributors;
                
                var to_push = [graphData, tileID];
                //var to_push = [graphData, tileID, temp_collaborators, temp_contributors];
                global_data.push(to_push);
                
                temp_max = d3.max(graphData, function(d,i)
                {
                  return d3.max(graphData[i].counts, function(d)
                    {
                        return d.value;
                    });
                });
              
                if(temp_max > global_grouped_y_max) { global_grouped_y_max = temp_max; }
                
                to_push_max = [temp_max, tileID];
                global_grouped_y_max_array.push(to_push_max);
                        
                empty_graph(tileID, "stacked", "gh");
                empty_graph(tileID, "grouped", "gh");
                short_chart(graphData, tileID);
            })
        }
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End manipulation of GitHub repo data <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
    
    else { alert("Unknown data type parameter passed to data_format()"); }
}