function so_user_tag_info(source,tag)
{
	d3.json(source,function(error,data)
	{
		var tagID = set_strip(tag);
		tileID = "so_" + data.id + "_" + tagID + "_tile";
		tileEl = document.getElementById(tileID);
		if(tileEl == null)
		{
    		d3.select("body")
				.append("div")
				.attr("class","so_user_general_small")
				.attr("id",tileID);
				
			d3.select("#" + tileID)
				.append("div")
				.attr("class","username")
				.attr("id","username_" + tileID);
			d3.select("#" + tileID)
				.append("div")
				.attr("class","info")
				.attr("id","info_" + tileID);
			d3.select("#" + tileID)
				.append("div")
				.attr("class","avatar")
				.attr("id","avatar_" + tileID)
				.attr("title","test");
            d3.select("#" + tileID)
    			.append("div")
				.attr("class","tag")
				.attr("id","tag_" + tileID);
			d3.select("#" + tileID)
				.append("div")
				.attr("class","pieChart")
				.attr("id","pieChart_" + tileID);
				
			d3.select("#" + tileID)
				.append("div")
				.attr("class","barChart")
				.attr("id","stacked_" + tileID)
				.style("display",function()
					{
						if(global_grouped === false)
						{
							return "block";
						}
						else
						{
							return "none";
						}
					});
            d3.select("#" + tileID)
    			.append("div")
				.attr("class","barChart")
				.attr("id","grouped_" + tileID)
                .style("display","none")
				.style("display",function()
					{
						if(global_grouped === true)
						{
							return "block";
						}
						else
						{
							return "none";
						}
					});
			d3.select("#" + tileID)
    			.append("div")
				.attr("class", "legend_div")
				.attr("id", "legend_" + tileID);
			//$("#avatar_" + tileID).tipsy();
			//$("#avatar_" + tileID).tipsy({gravity: 'n', hoverStay:true, html:true});
	
			userEl = document.getElementById("username_" + tileID);
			tagEl = document.getElementById("tag_" + tileID);
			avEl = document.getElementById("avatar_" + tileID);
			
			d3.select("#"+tileID)
				.append("text")
				.html("<div class='icon'><a href='javascript:tile(null, \"so\")'><img class='icon' src='http://cdn.sstatic.net/stackexchange/img/logos/so/so-logo.png'></a></div>");
			
			d3.select("#" + tileID)
			.append("span")
			.attr("class","close_button")
			.html("&otimes;")
			.on("click",function()
				{
					remove_tile(this, tileID);
				});
			
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
			
			avEl.innerHTML = "<img class='avatar' src='http://www.gravatar.com/avatar/" + data.avatar + "'>";
			
			var temp_tag = set_strip(tag);
			tagEl.innerHTML = get_strip(temp_tag);
			
			d3.select("#" + tileID)
    			.append("hr")
				.attr("class", "separator");
			d3.select("#" + tileID)
    			.append("div")
				.attr("class","shortBarChart")
				.attr("id","short_stacked_" + tileID);
			
			//so_user_tag_pie_chart(source,tag);
			pie_chart(source, "so_tag", tag);
            //so_user_tag_grouped_chart(source,tag);
			//so_user_tag_stacked_chart(source,tag);
			data_format(source, "so_tag", tag);
			legend(tileID, "bar");
		}
	})
}