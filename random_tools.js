// Originally written by Caleb Larsen
// Free to be used and/or modified for any legal purpose--please give credit to the author (Caleb Larsen)

function toInt(x)
{
    var result = +x;
    if(isNaN(result))
    {
        return 0;
    }
    else
    {
        return result;
    }
}

function xINy(x,y)
{
    for(var i = 0; i < x.length; i++)
    {
        if(y == x[i].month)
        {
            return true;
        }
    }
    return false;
}

function xLESSy(x,y)
{
    var x_year = x.substr(0,4);
    var x_month = x.substr(5,2);
    
    var y_year = y.substr(0,4);
    var y_month = y.substr(5,2);
    
    if(x_year < y_year || (x_month < y_month && x_year <= y_year))
    {
        return true;
    }
    
    return false;
}

/*
 * Currently finds the difference (in months) between two dates (x,y). The difference will be negative if x precedes y.
 * Works for any two dates in the format yyyy[./,-]mm*
 * Example: 2008-09-19 16:48:26
 */
function date_diff(x,y)
{
    var x_year = x.substr(0,4);
    var x_month = x.substr(5,2);
    
    var y_year = y.substr(0,4);
    var y_month = y.substr(5,2);
    
    var year_diff = (+x_year - +y_year) * 12;
    var month_diff = +x_month - +y_month;
    
    return (year_diff + month_diff);
}

function addMonth(date)
{
    var year = date.substr(0,4);
    year = +year;
    
    var month = date.substr(5,2);
    month = +month;
    
    if(month == 12)
    {
        year++;
        month = '01';
    }
    else
    {
        month++;
        if(month < 10)
        {
            month = String(month);
            month = '0' + month;
        }
    }
    
    return (String(year) + '-' + String(month));
}

/*
 * Adds the number of months passed (months) from the date passed (date) and returns the resulting date in yyyy-mm format
 * If (months) is negative, that number of months will be subtracted from the date (date).
 */
function date_add(date, months)
{
    var year = date.substr(0,4);
    year = +year;
    
    var month = date.substr(5,2);
    month = +month;
    
    month += months;
    if(month < 1)
    {
        while(month < 1)
        {
            month += 12;
            year--;
        }
    }
    
    if(month > 12)
    {
        while(month > 12)
        {
            month -= 12;
            year++;
        }
    }

    if(month < 10)
    {
        month = String(month);
        month = '0' + month;
    }
    
    return (String(year) + '-' + String(month));
}

function date_range(date1,date2)
{
    result = new Array();
    
    if(date_diff(date1,date2) < 0) // date1 precedes date2
    {
        result[0] = date1;
        var tempDate = date_add(date1,1);
        while(date_diff(tempDate,date2) < 1)
        {
            result.push(tempDate);
            tempDate = date_add(tempDate,1);
        }
        return result;
    }
    else if(date_diff(date1,date2) > 0) // date2 precedes date1
    {
        result[0] = date2;
        var tempDate = date_add(date2,1);
        while(date_diff(tempDate,date1) < 1)
        {
            result.push(tempDate);
            tempDate = date_add(tempDate,1);
        }
        return result;
    }
    else // The dates are the same (unless the input format is incorrect...may add testing later)
    {
        return date1;
    }
}

function parse_date(date, format)
{
    if(format === 'mmm')
    {
        if(date[5] + date[6] == "01")
            return "Jan";
        else if(date[5] + date[6] == "02")
            return "Feb";
        else if(date[5] + date[6] == "03")
            return "Mar";
        else if(date[5] + date[6] == "04")
            return "Apr";
        else if(date[5] + date[6] == "05")
            return "May";
        else if(date[5] + date[6] == "06")
            return "Jun";
        else if(date[5] + date[6] == "07")
            return "Jul";
        else if(date[5] + date[6] == "08")
            return "Aug";
        else if(date[5] + date[6] == "09")
            return "Sep";
        else if(date[5] + date[6] == "10")
            return "Oct";
        else if(date[5] + date[6] == "11")
            return "Nov";
        else if(date[5] + date[6] == "12")
            return "Dec";
    }
    
    else if(format === 'mmm-yyyy')
    {
        if(date[5] + date[6] == "01")
            return "Jan " + date[0] + date[1] + date[2] + date[3];
        else if(date[5] + date[6] == "02")
            return "Feb " + date[0] + date[1] + date[2] + date[3];
        else if(date[5] + date[6] == "03")
            return "Mar " + date[0] + date[1] + date[2] + date[3];
        else if(date[5] + date[6] == "04")
            return "Apr " + date[0] + date[1] + date[2] + date[3];
        else if(date[5] + date[6] == "05")
            return "May " + date[0] + date[1] + date[2] + date[3];
        else if(date[5] + date[6] == "06")
            return "Jun " + date[0] + date[1] + date[2] + date[3];
        else if(date[5] + date[6] == "07")
            return "Jul " + date[0] + date[1] + date[2] + date[3];
        else if(date[5] + date[6] == "08")
            return "Aug " + date[0] + date[1] + date[2] + date[3];
        else if(date[5] + date[6] == "09")
            return "Sep " + date[0] + date[1] + date[2] + date[3];
        else if(date[5] + date[6] == "10")
            return "Oct " + date[0] + date[1] + date[2] + date[3];
        else if(date[5] + date[6] == "11")
            return "Nov " + date[0] + date[1] + date[2] + date[3];
        else if(date[5] + date[6] == "12")
            return "Dec " + date[0] + date[1] + date[2] + date[3];
    }
    
    else if(format === 'mm/yy')
    {
        var mon = date.substring(5,7);
        var yr = date.substring(2,4);
        var result = new String(mon + '/' + yr);
        return result;
    }
    
    else
    {
        alert('Invalid input in parse_date(date, format).');
        return 'invalid';
    }
}

function member_for(thenDate)
{
    var now = new Date();
    
    var thenDay = thenDate.substr(8,2);
    var thenMonth = +(thenDate.substr(5,2))-1;
    var thenYear = thenDate.substr(0,4);
    
    var then = new Date(thenYear,thenMonth,thenDay);
    
    var one_day = 1000*60*60*24;
    one_year = 365.25;
    one_month = one_year / 12;
    var days = (now.getTime() - then.getTime())/one_day;
      
    if(days <= 1)
    {
        return 'member for 1 day';
    }
    else if(days < one_month)
    {
        return 'member for ' + Math.round(days) + ' days';
    }
    else if(days >= one_month)
    {
        var months = Math.round(days / one_month);
        var years = months / 12;
      
        if(months == 1)
        {
          return 'member for 1 month';
        }
        else if(months < 12)
        {
          return 'member for ' + months + ' months';
        }
        else
        {
            years = Math.floor(years);
            months = months - 12*years;
            if(years == 1)
            {
                if(months == 1)
                {
                    return 'member for 1 year, 1 month';
                }
                else if(months == 0)
                {
                    return 'member for 1 year';
                }
                else
                {
                    return 'member for 1 year, ' + months + ' months';
                }
            }
            if(months == 1)
            {
                return 'member for ' + years + ' years, 1 month'; 
            }
            else if(months == 0)
            {
                return 'member for ' + years + ' years';
            }
            else
            {
                return 'member for ' + years + ' years, ' + months + ' months';
            }
        }
    }
    else
    {
      return 'member for ' + Math.round(days) + ' days';
    }
}

function get_strip(tag)
{
    tag = tag.replace(/1plus1/g,'\+');
    tag = tag.replace(/1sharp1/g,'\#');
    tag = tag.replace(/1dot1/g,'\.');
    tag = tag.replace(/1slash1/g,'\/');
    return tag;
}

function set_strip(tag)
{
    tag = tag.replace(/\+/g,'1plus1');
    tag = tag.replace(/\#/g,'1sharp1');
    tag = tag.replace(/\./g,'1dot1');
    tag = tag.replace(/ /g,'');
    tag = tag.replace(/\//g,'1slash1');
    return tag;
}

function set_url(tag)
{
    tag = tag.replace(/\+/g,'%2B');
    tag = tag.replace(/\#/g,'%23');
    return tag;
}
function unset_url(tag)
{
    tag = tag.replace(/\%2B/g,'+');
    tag = tag.replace(/\%23/g,'#');
    return tag;
}

function show_stacked()
{
    d3.select("body").style("cursor","default");
    global_data.forEach(function(d)
      {
        var temp_tileID = d[1];
        $("#grouped_" + temp_tileID).fadeOut('slow',function()
        {
            $("#stacked_" + temp_tileID).fadeIn('slow');
        });
    });
    global_grouped = false;
}

function show_grouped()
{
    d3.select("body").style("cursor","default");
    global_data.forEach(function(d)
      {
        var temp_tileID = d[1];
        $("#stacked_" + temp_tileID).fadeOut('slow',function()
        {
            $("#grouped_" + temp_tileID).fadeIn('slow');
        });
    });
    global_grouped = true;
}

function show_repos()
{
    d3.select("body").style("cursor","default");
    global_data.forEach(function(d)
      {
        var temp_tileID = d[1];
        $("#languages_" + temp_tileID).fadeOut('slow',function()
        {
            $("#repos_" + temp_tileID).fadeIn('slow');
        });
    });
    global_languages = false;
}

function show_languages()
{
    d3.select("body").style("cursor","default");
    global_data.forEach(function(d)
      {
        var temp_tileID = d[1];
        $("#repos_" + temp_tileID).fadeOut('slow',function()
        {
            $("#languages_" + temp_tileID).fadeIn('slow');
        });
    });
    global_languages = true;
}

function remove_tile(el, id)
{
    var index = null;
    
    //console.log(global_coordinates);
    global_coordinates.forEach(function(d,i)
        {
            if(d.id == id)
            {
                global_coordinates[i].id = null;
                global_coordinates[i].occupied = false;
            }
        });
    //console.log(global_coordinates);
    $(el).parent().empty().remove();
    //$('#' + id + "_tip").empty().remove();
	
	// Remove data from global_data
	
	global_data.forEach(function(d, i)
		{
			if(d[1] === id)
			{
				index = i;
			}
		});
	
	if(index != null)
	{
		global_data.splice(index,1);
	}
	
	// Remove data from global_grouped_y_max_array
	var index = null;
	
	global_grouped_y_max_array.forEach(function(d, i)
		{
			if(d[1] === id)
			{
				index = i;
			}
		});
	
	if(index != null)
	{
		global_grouped_y_max_array.splice(index,1);
		
		var old_ggym = global_grouped_y_max;
		global_grouped_y_max = d3.max(global_grouped_y_max_array, function(d)
		{
			return d[0];
		});
        
        if(global_grouped_y_max == undefined){ global_grouped_y_max = 0; }
		
		if(global_grouped_y_max !== old_ggym)
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
	}
	
	// Remove data from global_stacked_y_max_array
	index = null;
	
	global_stacked_y_max_array.forEach(function(d, i)
		{
			if(d[1] === id)
			{
				index = i;
			}
		});
	
	if(index != null)
	{
		global_stacked_y_max_array.splice(index,1);
		
		var old_ggym = global_stacked_y_max;
		global_stacked_y_max = d3.max(global_stacked_y_max_array, function(d)
		{
			return d[0];
		});
		
        if(global_stacked_y_max == undefined){ global_stacked_y_max = 0; }
        
		if(global_stacked_y_max !== old_ggym)
		{
			global_data.forEach(function(d)
			{
				var temp_data = d[0];
				var temp_tileID = d[1];
				var cf = crossfilter(temp_data);
				set_date_range(temp_data);
				var cf = cf.dimension(function(d) { return d.fullDate; });
				var temp_data = cf.filterRange([global_date_range[0],global_date_range[1]]).top(Infinity);
				redraw(temp_data, temp_tileID, "grouped");
				redraw(temp_data, temp_tileID, "stacked");
			});
		}
	}
}

function to_unicode(input)
{
    // Doesn't do anything yet
    for(var i = 0; i < input.length; i++)
    {
        console.log(input.charCodeAt(i));
    }
}

function to_si(input)
{
    var si = d3.format(".2s");
    if(input > 999)
    {
        return si(input);
    }
    else
    {
        return input;
    }
}

/*
 * Dynamic text sizing
d3.select("#username_" + tileID)
				.append("text")
				.html("<a href=http://stackoverflow.com/users/" + data.id + "/>" + data.displayName + "</a>")
				.style("font-size",function()
					{
						nameLength = data.displayName.length;
						if(nameLength < 9)
						{
							return (30) + "px";
						}
						else
						{
							return (240 / nameLength) + "px";
						}
					});
*/

function shift_tiles(start_tile_id)
{
    console.log("Function: shift_tiles()");
	console.log("Argument 1: " + start_tile_id);

    if(start_tile_id != undefined)
    {
        var temp_size = global_coordinates.length;
        
        var start_index = 0;
        global_coordinates.forEach(function(d, i)
            {
                if(d.id == start_tile_id)
                {
                    start_index = i;
                }
            });
        
        for(var index = temp_size - 1; index > start_index; index--)
        {
            if(global_coordinates[index].id != null && index == temp_size - 1)
            {
                index = start_index;
                break;
            }
            else if(global_coordinates[index].id != null)
            {
                exchange(index, index + 1);
            }
        }
    }
    else
    {
        console.log('yes');
    }
}
function rearrange_tiles(order1, order2)
{
    console.log("Function: rearrange_tiles()");
	console.log("Argument 1: " + order1);
	console.log("Argument 2: " + order2);

    if(order1 === 'user')
    {
        var num_swapped = 0;
        var temp_size = global_coordinates.length;
        global_coordinates.forEach(function(d, i)
            {
                if(d.id != null)
                {
                    var id_array = d.id.split('_');
                    var num1 = global_userid_map[id_array[1]];
                    var temp_first = d.id;
                    for(var index = i; index < temp_size; index++)
                    {
                        if(global_coordinates[index].id != null)
                        {
                            id_array = global_coordinates[index].id.split('_');
                            var num2 = global_userid_map[id_array[1]];
                            if(num1 > num2)
                            {
                                swap(temp_first, global_coordinates[index].id);
                                num_swapped++;
                                break;
                            }
                        }
                    }
                }
            });
        if(num_swapped > 0)
        {
            rearrange_tiles('user');
        }
        rearrange_tiles('gap');
    }

    else if(order1 === 'gh_first')
    {
        var temp_size = global_coordinates.length;
        global_coordinates.forEach(function(d, i)
            {
                if(d.id != null)
                {
                    var community = d.id.substr(0,2);
                    if(community === 'so')
                    {
                        var temp_first = d.id;
                        for(var index = i; index < temp_size; index++)
                        {
                            if(global_coordinates[index].id != null && global_coordinates[index].id.substr(0,2) === 'gh')
                            {
                                swap(temp_first, global_coordinates[index].id);
                                break;
                            }
                        }
                    }
                }
            });
        rearrange_tiles('gap');
    }
    else if(order1 === 'so_first')
    {
        var temp_size = global_coordinates.length;
        global_coordinates.forEach(function(d, i)
            {
                if(d.id != null)
                {
                    var community = d.id.substr(0,2);
                    if(community === 'gh')
                    {
                        var temp_first = d.id;
                        for(var index = i; index < temp_size; index++)
                        {
                            if(global_coordinates[index].id != null && global_coordinates[index].id.substr(0,2) === 'so')
                            {
                                swap(temp_first, global_coordinates[index].id);
                                break;
                            }
                        }
                    }
                }
            });
        rearrange_tiles('gap');
    }
    else if(order1 === 'gap')
    {
        var temp_size = global_coordinates.length;
        global_coordinates.forEach(function(d, i)
            {
                if(d.id == null)
                {
                    var temp_first = i;
                    for(var index = i; index < temp_size; index++)
                    {
                        if(global_coordinates[index].id != null)
                        {
                            exchange(temp_first, index);
                            break;
                        }
                    }
                }
            });
    }
}
// Based on INDEX
function exchange(first, second)
{
    console.log("Function: exchange()");
	console.log("Argument 1: " + first);
	console.log("Argument 2: " + second);

    var first_id = global_coordinates[first].id;
    var second_id = global_coordinates[second].id;
    
    if(first_id != null)
    {
        d3.select('#' + first_id)
            .style('top', global_coordinates[second].top + 'px')
            .style('left', global_coordinates[second].left + 'px');
        
        global_coordinates[second].id = first_id;
        global_coordinates[second].occupied = true;
    }
    else
    {
        d3.select('#' + first_id)
            .style('top', global_coordinates[second].top + 'px')
            .style('left', global_coordinates[second].left + 'px');
        
        global_coordinates[second].id = null;
        global_coordinates[second].occupied = false;
    }
    
    if(second_id != null)
    {
        d3.select('#' + second_id)
            .style('top', global_coordinates[first].top + 'px')
            .style('left', global_coordinates[first].left + 'px');
            
        global_coordinates[first].id = second_id;
        global_coordinates[first].occupied = true;
    }
    else
    {
        d3.select('#' + second_id)
            .style('top', global_coordinates[first].top + 'px')
            .style('left', global_coordinates[first].left + 'px');
        
        global_coordinates[first].id = null;
        global_coordinates[first].occupied = false;
    }
}
// Based on ID
function swap(first_id, second_id)
{
    console.log("Function: swap()");
	console.log("Argument 1: " + first_id);
	console.log("Argument 2: " + second_id);

    var first = 0, second = 0;
    global_coordinates.forEach(function(d,i)
        {
            //console.log(d);
            if(d.id == first_id)
            {
                first = i;
            }
            if(d.id == second_id)
            {
                second = i;
            }
        });
    
    if(first_id != null)
    {
        d3.select('#' + first_id)
            .style('top', global_coordinates[second].top + 'px')
            .style('left', global_coordinates[second].left + 'px');
        
        global_coordinates[second].id = first_id;
        global_coordinates[second].occupied = true;
    }
    else
    {
        d3.select('#' + first_id)
            .style('top', global_coordinates[second].top + 'px')
            .style('left', global_coordinates[second].left + 'px');
        
        global_coordinates[second].id = null;
        global_coordinates[second].occupied = false;
    }
    
    if(second_id != null)
    {
        d3.select('#' + second_id)
            .style('top', global_coordinates[first].top + 'px')
            .style('left', global_coordinates[first].left + 'px');
            
        global_coordinates[first].id = second_id;
        global_coordinates[first].occupied = true;
    }
    else
    {
        d3.select('#' + second_id)
            .style('top', global_coordinates[first].top + 'px')
            .style('left', global_coordinates[first].left + 'px');
        
        global_coordinates[first].id = null;
        global_coordinates[first].occupied = false;
    }
}

/*
 * function obtained from http://www.tizag.com/ajaxTutorial/ajax-mysql-database.php
 */
function get_so(type, month, user, id, tag)
{
    console.log("Function: get_so()");
	console.log("Argument 1: " + type);
	console.log("Argument 2: " + month);
	console.log("Argument 3: " + user);
	console.log("Argument 4: " + id);
	console.log("Argument 5: " + tag);
    
	var ajaxRequest;  // The variable that makes Ajax possible!
	
	try
    {
		// Opera 8.0+, Firefox, Safari
		ajaxRequest = new XMLHttpRequest();
	}
    catch (e)
    {
		// Internet Explorer Browsers
		try
        {
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		}
        catch (e)
        {
			try
            {
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}
            catch (e)
            {
				// Something went wrong
				alert("AJAX error!");
				return false;
			}
		}
	}
	// Create a function that will receive data sent from the server
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){
            console.log(id);
			document.getElementById(id).innerHTML = ajaxRequest.responseText;
            //return ajaxRequest.responseText;
		}
	}
	var month2 = date_add(month,1);
	if(tag == undefined || tag == null || tag == "")
	{
		var queryString = "?month1=" + month + "&month2=" + month2 +"&user=" + user + "&type=" + type;
	}
	else
	{
		tag = set_url(tag);
		var queryString = "?month1=" + month + "&month2=" + month2 +"&user=" + user + "&type=" + type + "&tag=" + tag;
	}
    document.getElementById(id).innerHTML = "Loading. This could take a few minutes if you're looking at a super user..";
	ajaxRequest.open("GET", "so_posts.php" + queryString, true);
	ajaxRequest.send(null); 
}