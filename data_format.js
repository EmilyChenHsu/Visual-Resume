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
                            var acc = toInt(data.activity[d].acceptedCount);
                            var nacc = toInt(data.activity[d].nonacceptedCount);
                      
                            var monthTotal = qc + ac + cc;
                          
                            var y0 = 0;
                            var y10=0;
                      
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
                                },
                                {type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:nacc,
                                  y0:y10,
                                  y1:y10 += nacc,
                                  title:"nonaccepted"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:acc,
                                  y0:y10,
                                  y1:y10 += acc,
                                  title:"accepted"
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
                        },
                        {type: type,
                                user_id: data.id,
                                month: tempDate,
                          value:0,
                          y0:y0,
                          y1:y0 += 0,
                          title:"nonaccepted"
                        },
                        {
                                type: type,
                                user_id: data.id,
                                month: tempDate,
                          value:0,
                          y0:y0,
                          y1:y0 += 0,
                          title:"accepted"
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
                                    },
                                    {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        value:0,
                                        y0:0,
                                        y1:0,
                                        title:"nonaccepted"
                                    },
                                    {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        value:0,
                                        y0:0,
                                        y1:0,
                                        title:"accepted"
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
                      var acc = toInt(data.tags[tag].activity[d].acceptedCount);
                      var nacc = toInt(data.tags[tag].activity[d].nonacceptedCount);
                      
                      var monthTotal = qc + ac + cc;
                    
                      var y0 = 0;
                      var y10=0;
                      
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
                          },
                          {
                                type: type,
                                tag: tag,
                                user_id: data.id,
                                month:d,
                            value:nacc,
                            y0:y10,
                            y1:y10 += nacc,
                            title:"nonaccepted"
                          },
                          {
                                type: type,
                                tag: tag,
                                user_id: data.id,
                                month:d,
                            value:acc,
                            y0:y10,
                            y1:y10 += acc,
                            title:"accepted"
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
                              },
                              {
                                type: type,
                                tag: tag,
                                user_id: data.id,
                                month:tempDate,
                                value:0,
                                y0:0,
                                y1:0,
                                title:"nonaccepted"
                              },
                              {
                                type: type,
                                tag: tag,
                                user_id: data.id,
                                month:tempDate,
                                value:0,
                                y0:0,
                                y1:0,
                                title:"accepted"
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
                            var citp=toInt(data.activity[d].passCommit);
                            var citf=toInt(data.activity[d].failCommit);
                            var cihc=toInt(data.activity[d].highCentral);
                            var cimc=toInt(data.activity[d].medianCentral);
                            var cilc=toInt(data.activity[d].lowCentral);
                            var ioi=toInt(data.activity[d].openIssue);
                            var ici=toInt(data.activity[d].closeIssue);
                            var im=toInt(data.activity[d].mergedPR);
                            var inm=toInt(data.activity[d].nonmergedPR);
                      
                            var monthTotal = ic + cic + cc;
                          
                            var y0 = 0;
                            var y11=0;
                            var y12=0;
                            var y13=0;
                            var y14=0;
                      
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
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:citp,
                                  y0:y11,
                                  y1:y11 += citp,
                                  title:"pass"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:citf,
                                  y0:y11,
                                  y1:y11 += citf,
                                  title:"fail"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:cilc,
                                  y0:y12,
                                  y1:y12 += cilc,
                                  title:"low"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:cimc,
                                  y0:y12,
                                  y1:y12 += cimc,
                                  title:"median"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:cihc,
                                  y0:y12,
                                  y1:y12 += cihc,
                                  title:"high"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:ici,
                                  y0:y13,
                                  y1:y13 += ici,
                                  title:"close"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:ioi,
                                  y0:y13,
                                  y1:y13 += ioi,
                                  title:"open"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:inm,
                                  y0:y14,
                                  y1:y14 += inm,
                                  title:"nonmerged"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:im,
                                  y0:y14,
                                  y1:y14 += im,
                                  title:"merged"
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
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:0,
                                  y0:y0,
                                  y1:y0 += 0,
                                  title:"pass"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:0,
                                  y0:y0,
                                  y1:y0 += 0,
                                  title:"fail"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:0,
                                  y0:y0,
                                  y1:y0 += 0,
                                  title:"high"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:0,
                                  y0:y0,
                                  y1:y0 += 0,
                                  title:"median"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:0,
                                  y0:y0,
                                  y1:y0 += 0,
                                  title:"low"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:0,
                                  y0:y0,
                                  y1:y0 += 0,
                                  title:"open"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:0,
                                  y0:y0,
                                  y1:y0 += 0,
                                  title:"close"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:0,
                                  y0:y0,
                                  y1:y0 += 0,
                                  title:"nonmerged"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                  value:0,
                                  y0:y0,
                                  y1:y0 += 0,
                                  title:"merged"
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
                                    },
                                    {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                  value:0,
                                  y0:0,
                                  y1:0,
                                  title:"pass"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                  value:0,
                                  y0:0,
                                  y1:0,
                                  title:"fail"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                  value:0,
                                  y0:0,
                                  y1:0,
                                  title:"high"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                  value:0,
                                  y0:0,
                                  y1:0,
                                  title:"median"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                  value:0,
                                  y0:0,
                                  y1:0,
                                  title:"low"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                  value:0,
                                  y0:0,
                                  y1:0,
                                  title:"open"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                  value:0,
                                  y0:0,
                                  y1:0,
                                  title:"close"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                  value:0,
                                  y0:0,
                                  y1:0,
                                  title:"nonmerged"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                  value:0,
                                  y0:0,
                                  y1:0,
                                  title:"merged"
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

                //var temp_data = graphData;
                //var cf = crossfilter(temp_data);
                //set_date_range(temp_data);
                //var cf = cf.dimension(function(d) { return d.fullDate; });
                //var temp_data = cf.filterRange([global_start_date,global_end_date]).top(Infinity);
                /*
                if(global_date_range!=null){
                  var cf = crossfilter(graphData);
                  set_date_range(graphData);
                  var cf = cf.dimension(function(d) { return d.fullDate; });
                  var graphData = cf.filterRange([global_date_range[0],global_date_range[1]]).top(Infinity);
                }
                redraw(graphData, tileID, "stacked","tests");
                redraw(graphData, tileID, "grouped","tests");
                */
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
                
                var tileID = "gh_" + data.id + "_" + set_strip(tag) + "_tile";
            
                var graphData = new Array();
                  //console.log("dataformat repo before: "+tag);  
                // Some finangling to get the 'tag' to the correct format as a string
                String(tag);
                var tmp = tag.replace("-","/");
                tmp = get_strip(tmp);
                tag = tmp;
                //console.log("dataformat repo: "+tag);
                    
                    
                _.keys(data.repos[tag].activity).forEach(function(d,i)
                {
                    var ic = toInt(data.repos[tag].activity[d].issueCount);
                    var cic = toInt(data.repos[tag].activity[d].commitCount);
                    var cc = toInt(data.repos[tag].activity[d].commentCount);
                    var citp=toInt(data.repos[tag].activity[d].passCommit);
                            var citf=toInt(data.repos[tag].activity[d].failCommit);
                            var cihc=toInt(data.repos[tag].activity[d].highCentral);
                            var cimc=toInt(data.repos[tag].activity[d].medianCentral);
                            var cilc=toInt(data.repos[tag].activity[d].lowCentral);
                            var ioi=toInt(data.repos[tag].activity[d].openIssue);
                            var ici=toInt(data.repos[tag].activity[d].closeIssue);
                            var im=toInt(data.repos[tag].activity[d].mergedPR);
                            var inm=toInt(data.repos[tag].activity[d].nonmergedPR);
              
                    var monthTotal = ic + cic + cc;
                  
                    var y0 = 0;
                    var y11=0;
                            var y12=0;
                            var y13=0;
                            var y14=0;
              
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
                        },
                        {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                        repo: tag,
                                  value:citp,
                                  y0:y11,
                                  y1:y11 += citp,
                                  title:"pass"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                        repo: tag,
                                  value:citf,
                                  y0:y11,
                                  y1:y11 += citf,
                                  title:"fail"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                        repo: tag,
                                  value:cilc,
                                  y0:y12,
                                  y1:y12 += cilc,
                                  title:"low"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                        repo: tag,
                                  value:cimc,
                                  y0:y12,
                                  y1:y12 += cimc,
                                  title:"median"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                        repo: tag,
                                  value:cihc,
                                  y0:y12,
                                  y1:y12 += cihc,
                                  title:"high"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                        repo: tag,
                                  value:ici,
                                  y0:y13,
                                  y1:y13 += ici,
                                  title:"close"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                        repo: tag,
                                  value:ioi,
                                  y0:y13,
                                  y1:y13 += ioi,
                                  title:"open"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                        repo: tag,
                                  value:inm,
                                  y0:y14,
                                  y1:y14 += inm,
                                  title:"nonmerged"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:d,
                                        repo: tag,
                                  value:im,
                                  y0:y14,
                                  y1:y14 += im,
                                  title:"merged"
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
                                    },
                                    {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        repo: tag,
                                  value:0,
                                        y0:0,
                                        y1:0,
                                  title:"pass"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        repo: tag,
                                  value:0,
                                        y0:0,
                                        y1:0,
                                  title:"fail"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        repo: tag,
                                  value:0,
                                        y0:0,
                                        y1:0,
                                  title:"low"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        repo: tag,
                                  value:0,
                                        y0:0,
                                        y1:0,
                                  title:"median"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        repo: tag,
                                  value:0,
                                        y0:0,
                                        y1:0,
                                  title:"high"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        repo: tag,
                                  value:0,
                                        y0:0,
                                        y1:0,
                                  title:"close"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        repo: tag,
                                  value:0,
                                        y0:0,
                                        y1:0,
                                  title:"open"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        repo: tag,
                                  value:0,
                                        y0:0,
                                        y1:0,
                                  title:"nonmerged"
                                },
                                {
                                        type: type,
                                        user_id: data.id,
                                        month:tempDate,
                                        repo: tag,
                                  value:0,
                                        y0:0,
                                        y1:0,
                                  title:"merged"
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
                /*
                if(global_date_range!=null){
                  var cf = crossfilter(graphData);
                  set_date_range(graphData);
                  var cf = cf.dimension(function(d) { return d.fullDate; });
                  var graphData = cf.filterRange([global_date_range[0],global_date_range[1]]).top(Infinity);
                }
                redraw(graphData, tileID, "stacked","tests");
                redraw(graphData, tileID, "grouped","tests");
                */
            })
        }
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End manipulation of GitHub repo data <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
    
    else { alert("Unknown data type parameter passed to data_format()"); }
}