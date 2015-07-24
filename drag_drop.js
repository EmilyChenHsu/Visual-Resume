function dragstarted(d) {
  //if (d3.event.defaultPrevented === false) {
  var ttid=d3.select(this).attr("id");
  var m=d3.mouse(this);
  global_mousedown=true;
  global_oldi=-1;
  global_newi=-1;
  /*var ndy=0;
  for(var i1 = 0; i1 < 30; i1++)
	{
		if(global_coordinates[i1].id == ttid)
		{
			
			ndy=m[1]-global_coordinates[i1].top;		
			break;
		}
	}*/
	console.log("ttid: "+ttid+" x: "+m[0]+" y: "+m[1]);
  console.log("draggable mousemove: "+mouse_down+" "+global_mousedown+" "+initiatedrag);
  if(m[1]<205){
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed("dragging", true);
  initiatedrag=true;
  mouse_down=false;
  console.log("draggable: "+initiatedrag+" short mouse down: "+mouse_down +" id: "+ d3.select(this).attr("id"));
  }
//}
}

function dragmove(d){
	//var oldcoordinates=global_coordinates;
  global_oldi=-1;
  global_newi=-1;
	if(initiatedrag){
	var ndx=d3.event.x;
	var ndy=d3.event.y;
	var tid=d3.select(this).attr("id");
	console.log("drag tile: "+tid);
	console.log("x: "+ndx+" y: "+ndy);
	d3.select('#' + tid)
            	.style('top', ndy + 'px')
            	.style('left', ndx + 'px');

	
	for(var i1 = 0; i1 < 30; i1++)
	{
		if(global_coordinates[i1].id == tid)
		{
			global_oldi = i1;
					
			break;
		}
	}
	for(var i2 = 0; i2 < 30; i2++)
	{
		if(ndx <= (global_coordinates[i2].left+225) && ndy <= (global_coordinates[i2].top+420)){
			console.log("left: "+global_coordinates[i2].left+" top: "+global_coordinates[i2].top);
			global_newi=i2;
			break;
		}
	}
  //d.wasDragged=true;
	console.log("oldi: "+global_oldi+" newi: "+global_newi);
	}	

}

function dragended(d) {
  if(initiatedrag){
  d3.select(this).classed("dragging", false);
  
  //var oldcoordinates=global_coordinates;
  console.log("endoldi: "+global_oldi +" endnewi: "+global_newi);
  //console.log("oldi id: "+global_oldcoordinates[global_oldi].id+" newi id: "+global_oldcoordinates[global_newi].id);
  	var oldcoordinates=new Array();
  	for(var n1=0;n1<30;n1++){
  		oldcoordinates[n1]={
  			id: global_coordinates[n1].id,
  			occupied: global_coordinates[n1].occupied
  		}
  	}
  if(global_oldi>-1 && global_newi>-1){
				//console.log("i22: "+i3 +" id: "+global_coordinates[i3].id+" oldi: "+global_oldi);
		global_coordinates[global_oldi].id=null;
		global_coordinates[global_oldi].occupied=false;
				//console.log("i2: "+i3 +" id: "+oldcoordinates[global_oldi].id);
	}	
  	
  for(var i3 = 0; i3 < 30; i3++)
	{
		if(global_oldi>-1 && global_newi>-1){
		
			//console.log("i3: "+i3 +" id: "+oldcoordinates[global_newi].id + " "+oldcoordinates[global_newi].occupied);
			if(i3>global_newi && oldcoordinates[global_newi].occupied==true){//
				
        console.log("i11: "+i3 +" id: "+global_coordinates[i3].id+" oldid-1: "+oldcoordinates[i3-1].id);
				global_coordinates[i3].id=oldcoordinates[i3-1].id;
				global_coordinates[i3].occupied=oldcoordinates[i3-1].occupied;
				console.log("i1: "+i3 +" id: "+global_coordinates[i3].id+" oldid: "+oldcoordinates[i3].id);
			}
		
			if(i3==global_newi){
				console.log("i22: "+i3 +" id: "+global_coordinates[i3].id+" oldi: "+global_oldi);
				global_coordinates[i3].id=oldcoordinates[global_oldi].id;
				global_coordinates[i3].occupied=oldcoordinates[global_oldi].occupied;
				console.log("i2: "+i3 +" id: "+oldcoordinates[global_oldi].id);
        oldcoordinates[global_oldi].id=null;
        oldcoordinates[global_oldi].occupied=false;
			}
			
		}
		

	}

  for(var i4 = 0; i4 < 30; i4++)
	{
		if(global_coordinates[i4].occupied == true)
		{
			d3.select('#' + global_coordinates[i4].id)
            	.style('top', global_coordinates[i4].top + 'px')
            	.style('left', global_coordinates[i4].left + 'px');

            	console.log("end id: "+global_coordinates[i4].id);
		}
	}
	
	}
initiatedrag=false;
//d.wasDragged=false;
close_clicked=false;
global_mousedown=false;
if(mouse_down){
mouse_down=false;
global_ready_mouseup = false;
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
                                console.log("tab id: "+tabs[x].id+" temp tile: "+temp_tileID);
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
}
