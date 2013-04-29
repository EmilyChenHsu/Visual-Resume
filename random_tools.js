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

function get_tagID(tag)
{
    tag = tag.replace(/1plus1/g,'\+');
    tag = tag.replace(/1sharp1/g,'\#');
    tag = tag.replace(/1dot1/g,'\.');
    return tag;
}

function set_tagID(tag)
{
    tag = tag.replace(/\+/g,'1plus1');
    tag = tag.replace(/\#/g,'1sharp1');
    tag = tag.replace(/\./g,'1dot1');
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

function remove_tile(el, id, temp)
{
    if(temp == true)
    {
        //alert(el);
        $('#' + el).empty().remove();
        //$('#' + id + "_tip").empty().remove();
    }
    else
    {
        $(el).parent().empty().remove();
        $('#' + id + "_tip").empty().remove();
    }
	
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