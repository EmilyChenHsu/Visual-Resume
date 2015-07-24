function so_user_general(source)
{
	
	d3.json(source,function(error,data)
	{
		var tileID = "so_" + data.id + "_tile";
		var tileEl = document.getElementById(tileID);
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
				.attr("id","avatar_" + tileID);
			d3.select("#" + tileID)
				.append("div")
				.attr("class","reputation")
				.attr("id","reputation_" + tileID);
			d3.select("#" + tileID)
				.append("div")
				.attr("class","badges")
				.attr("id","badges_" + tileID);
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
				
			d3.select("#" + tileID)
    			.append("hr")
				.attr("class", "separator");
			d3.select("#" + tileID)
    			.append("div")
				.attr("class","shortBarChart")
				.attr("id","short_stacked_" + tileID);
				
			userEl = document.getElementById("username_" + tileID);
			infoEl = document.getElementById("info_" + tileID);
			avEl = document.getElementById("avatar_" + tileID);
			infoEl.innerHTML = member_for(data.creationDate);
			
			avEl.innerHTML = "<img class='avatar' src='http://www.gravatar.com/avatar/" + data.avatar + "'>";
		
		d3.select("#" + tileID)
			.append("div")
			.attr("class","icon")
			.html("<a href='javascript:so_general()'><img class='icon' src='http://cdn.sstatic.net/stackexchange/img/logos/so/so-logo.png'></a>");
			
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
						
		d3.select("#reputation_" + tileID)
			.append("text")
				.text(Comma(data.reputation))
			.append("span")
				.attr("class","smallText")
				.html("</br>reputation");
				
            //so_user_general_grouped_chart(source);
			//so_user_general_stacked_chart(source);
			data_format(source, "so_all", null);
			legend(tileID, "bar");
			//so_user_general_pie_chart(source);
			pie_chart(source, "so_all", null);
		}
	});
}