function tile(source, type, tag, second)
{
	var coordinates = new Array();
	var temp_i = 0;
	// Find the first open tile_container
	for(var i = 0; i < 30; i++)
	{
		if(global_coordinates[i].occupied == false)
		{
			coordinates[0] = global_coordinates[i].top;
			coordinates[1] = global_coordinates[i].left;
			temp_i = i;
			break;
		}
	}

	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin draw tile for stackoverflow user all ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	if(type === "so_all")
	{
		d3.json(source,function(error,data)
		{
			var tileID = "so_" + data.id + "_tile";
			var tileEl = document.getElementById(tileID);
			if(tileEl == null)
			{
				global_coordinates[temp_i].occupied = true;
				global_coordinates[temp_i].id = tileID;
				d3.select('body')
					.append("div")
					.attr("class","user_tile")
					.attr("id",tileID)
					.style('top', coordinates[0] + 'px')
					.style('left', coordinates[1] + 'px');
					
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
				.html("<a href='javascript:tile(null, \"so\")'><img class='icon' src='http://cdn.sstatic.net/stackexchange/img/logos/so/so-logo.png'></a>");
				
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
				
				data_format(source, "so_all", null);
				legend(tileID, "bar", "so");
				pie_chart(source, "so_all", null);
			}
		});
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw tile for stackoverflow user all <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	//
	//
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin draw tile for stackoverflow tag-specific ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	else if(type ==="so_tag")
	{
		d3.json(source,function(error,data)
		{
			var tagID = set_tagID(tag);
			tileID = "so_" + data.id + "_" + tagID + "_tile";
			tileEl = document.getElementById(tileID);
			if(tileEl == null)
			{
				global_coordinates[temp_i].occupied = true;
				global_coordinates[temp_i].id = tileID;
				d3.select('body')
					.append("div")
					.attr("class","user_tile")
					.attr("id",tileID)
					.style('top', coordinates[0] + 'px')
					.style('left', coordinates[1] + 'px');
					
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
				
				var temp_tag = set_tagID(tag);
				tagEl.innerHTML = get_tagID(temp_tag);
				
				d3.select("#" + tileID)
					.append("hr")
					.attr("class", "separator");
				d3.select("#" + tileID)
					.append("div")
					.attr("class","shortBarChart")
					.attr("id","short_stacked_" + tileID);
				
				pie_chart(source, "so_tag", tag);
				data_format(source, "so_tag", tag);
				legend(tileID, "bar", "so");
			}
		})
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw tile for stackoverflow tag-specific <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	//
	//
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin draw tile for stackoverflow ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	else if(type === "so")
	{
		var soEl = document.getElementById("so_general_tile");
		if(soEl == null)
		{
			global_coordinates[temp_i].occupied = true;
			global_coordinates[temp_i].id = 'so_general_tile';
			d3.select('body')
				.append("div")
				.attr("class","so_general")
				.attr("id","so_general_tile")
				.style('top', coordinates[0] + 'px')
				.style('left', coordinates[1] + 'px');
				
			d3.select("#so_general_tile")
				.append("text")
				.html("<a href='http://stackoverflow.com/'><img class='so_general' src='http://cdn.sstatic.net/stackexchange/img/logos/so/so-logo.png'></a><hr>Stack Overflow is <b>a programming Q & A site that's free.</b> Free to ask questions, free to answer questions, free to read, free to index, built with plain old HTML, no fake rot13 text on the home page, no scammy google-cloaking tactics, no salespeople, no JavaScript windows dropping down in front of the answer asking for $12.95 to go away. You can register if you want to collect karma and win valuable flair that will appear next to your name, but otherwise, it's just free. And fast. Very, very fast.");
			
			d3.select("#so_general_tile")
				.append("text")
				.html("<hr><center><table class='so_links'><tr><td colspan='2' style='padding-right:20px'><a href='http://stackoverflow.com/about'>our mission</a></td><td colspan='2'><a href='http://stackexchange.com/about/management'>management</a></td><td colspan='2' style='padding-left:20px'><a href='http://stackexchange.com/about/team'>team</a></td></tr><tr><td colspan='3' style='padding-left:25px'><a href='http://stackexchange.com/about/hiring'>we're hiring</a></td><td colspan='3'><a href='http://stackexchange.com/about/contact'>contact us</a></td></tr></table></center>");
				
			d3.select("#so_general_tile")
				.append("span")
				.attr("class","close_button")
				.html("&otimes;")
				.on("click",function()
					{
						$(this).parent().empty().remove();
					});
		}
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw tile for stackoverflow <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	//
	//
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin draw tile for all of user's GitHub activity ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	else if(type === "gh_all")
	{
		d3.json(source,function(error,data)
		{
			var tileID = "gh_" + data.id + "_tile";
			var tileEl = document.getElementById(tileID);
			if(tileEl == null)
			{
				global_coordinates[temp_i].occupied = true;
				global_coordinates[temp_i].id = tileID;
				d3.select('body')
					.append("div")
					.attr("class","user_tile")
					.attr("id",tileID)
					.style('top', coordinates[0] + 'px')
					.style('left', coordinates[1] + 'px');
					
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
					.attr("class","gh_info")
					.attr("id","followers_" + tileID);
				/*
				d3.select("#" + tileID)
					.append("div")
					.attr("class","pieChart")
					.attr("id","pieChart_" + tileID);
				*/
				
				d3.select("#" + tileID)
					.append("div")
					.attr("class","pieChart_up")
					.attr("id","repos_" + tileID)
					.style("display",function()
						{
							if(global_languages === false)
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
					.attr("class","pieChart_up")
					.attr("id","languages_" + tileID)
					.style("display",function()
						{
							if(global_languages === true)
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
				folEl = document.getElementById("followers_" + tileID);
				
				infoEl.innerHTML = member_for(data.creationDate);
				avEl.innerHTML = "<img class='avatar' src='" + data.avatar + "'>";
				folEl.innerHTML = "<bigger>" + data.followers + "</bigger>" + " followers";
			
			d3.select("#" + tileID)
				.append("div")
				.attr("class","icon")
				.html("<a href='javascript:tile(null,\"gh\")'><img class='gh_icon' src='media/gh_logo.png'></a>");
				
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
				.html("<a href=https://github.com/" + data.login + "/>" + data.name + "</a>")
				.style("font-size",function()
					{
						nameLength = data.name.length;
						if(nameLength < 9)
						{
							return (30) + "px";
						}
						else
						{
							return (300 / nameLength) + "px";
						}
					})
				.attr("title",function(d)
				{
					$(this).tipsy({gravity: 's', html: true, hoverable: false});
					return data.login;
				});
				
				pie_chart(source, "gh", null);
				data_format(source, "gh");
				legend(tileID, "bar", "gh");
			}
		});
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw tile for all of user's GitHub activity <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	//
	//
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin draw tile for user's GitHub activity within a repo ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	else if(type === "gh_repo")
	{
		d3.json(source,function(error,data)
		{
			var tileID = "gh_" + data.id + "_" + tag + "_tile";
			var tileEl = document.getElementById(tileID);
			if(tileEl == null)
			{
				global_coordinates[temp_i].occupied = true;
				global_coordinates[temp_i].id = tileID;
				d3.select('body')
					.append("div")
					.attr("class","user_tile")
					.attr("id",tileID)
					.style('top', coordinates[0] + 'px')
					.style('left', coordinates[1] + 'px');
					
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
					.attr("class","gh_info")
					.attr("id","followers_" + tileID);
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
			
				avEl.innerHTML = "<img class='avatar' src='" + data.avatar + "'>";
			
			d3.select("#" + tileID)
				.append("div")
				.attr("class","icon")
				.html("<a href='javascript:tile(null,\"gh\")'><img class='gh_icon' src='media/gh_logo.png'></a>");
				
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
				.html("<a href=https://github.com/" + data.login + "/>" + data.name + "</a>")
				.style("font-size",function()
					{
						nameLength = data.name.length;
						if(nameLength < 9)
						{
							return (30) + "px";
						}
						else
						{
							return (300 / nameLength) + "px";
						}
					})
				.attr("title",function(d)
				{
					$(this).tipsy({gravity: 's', html: true, hoverable: false});
					return data.login;
				});
				
			
			// Some finangling to get the 'tag' to the correct format as a string
            String(tag);
            var tmp = tag.replace("-","/");
			//console.log(tmp);
			//console.log(data);
			var temp_language = data.repos[tmp].language != null ? data.repos[tmp].language : 'info not available';
			d3.select("#followers_" + tileID)
				.append("text")
				//.html(tmp)
				/*
				.style("font-size",function()
					{
						nameLength = tmp.length;
						if(nameLength < 15)
						{
							return (20) + "px";
						}
						else
						{
							return (290 / nameLength) + "px";
						}
					})
				*/
				.html(function(d)
					{
						// If the repo title is too long, we'll need to shorten it
						if(tmp.length > 22)
						{
						  return tmp.substr(0,22) + ".."
						}
						return tmp;
					})
				.attr('title', function(d)
					{
						$(this).tipsy({gravity: 's', html: true, hoverable: false});
						return tmp;	
					});
				
			d3.select("#followers_" + tileID)
				.append("text")
				.html('<br>Language: ' + temp_language + '<br>Forked: ' + data.repos[tmp].isFork);	
			
				pie_chart(source, "gh_repo", tag);
				data_format(source, "gh_repo", tag);
				legend(tileID, "bar", "gh");
			}
		});
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw tile for user's GitHub activity within a repo <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	
	else { alert("Unknown data type parameter passed to tile()"); }
	
	if(second != undefined)
	{
		tile_alt(second[0],second[1],second[2]);
	}
}