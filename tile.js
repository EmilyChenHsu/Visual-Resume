function tile(source, type, tag)
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
	console.log(global_coordinates);

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
					.attr("class","so_user_tile")
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
				.html("<a href=http://stackoverflow.com/users/" + data.id + "/ target='_blank'>" + data.displayName + "</a>")
				.style('font-size', global_name_font_size);
							
			d3.select("#reputation_" + tileID)
				.append("text")
					.text(Comma(data.reputation))
				.append("span")
					.attr("class","smallText")
					.html(" rep");
				
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
			//String(tag);
			//console.log(tag);
			var tagID = set_strip(tag);
			tileID = "so_" + data.id + "_" + tagID + "_tile";
			tileEl = document.getElementById(tileID);
			if(tileEl == null)
			{
				global_coordinates[temp_i].occupied = true;
				global_coordinates[temp_i].id = tileID;
				d3.select('body')
					.append("div")
					.attr("class","so_user_tile")
					.attr("id",tileID)
					.style('top', coordinates[0] + 'px')
					.style('left', coordinates[1] + 'px');
				
				d3.select("#" + tileID)
					.append("div")
					.attr("class","breadcrumbs")
					.attr("id","breadcrumbs_" + tileID)
					.append('text')
					.html("Stack Overflow >> " + data.displayName + " >> " + tag);	
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
				.html("<a href=http://stackoverflow.com/users/" + data.id + "/ target='_blank'>" + data.displayName + "</a>")
				.style("font-size", global_name_font_size);
				
				avEl.innerHTML = "<img class='avatar' src='http://www.gravatar.com/avatar/" + data.avatar + "'>";
				
				var temp_tag = set_strip(tag);
				
				tag = get_strip(temp_tag);
				console.log(tag);
				var temp_commentNum = data.tags[tag].commentCount != undefined ? data.tags[tag].commentCount : 0;
				var temp_answerNum = data.tags[tag].answerCount != undefined ? data.tags[tag].answerCount : 0;
				var temp_questionNum = data.tags[tag].questionCount != undefined ? data.tags[tag].questionCount : 0;
				
				d3.select("#tag_" + tileID)
					.append("text")
					.html(function(d)
						{
							// If the language title is too long, we'll need to shorten it
							if(tag.length > 22)
							{
							  return '<a href="http://stackoverflow.com/search?q=user:' + data.id + '+[' + set_url(tag) + ']' + '" target="_blank">' + tag.substr(0,22) + '..</a>';
							}
							return '<a href="http://stackoverflow.com/search?q=user:' + data.id + '+[' + set_url(tag) + ']' + '" target="_blank">' + tag + '</a>';
						})
					.attr('title', function(d)
						{
							$(this).tipsy({gravity: 's', html: true, hoverable: false});
							return tag;	
						})
					.style('text-decoration', 'underline');
				d3.select("#tag_" + tileID)
					.append('text')
					.html('<br>Answers: ' + temp_answerNum + '<br>Comments: ' + temp_commentNum + '<br>Questions: ' + temp_questionNum);
				
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
				.html("<a href='http://stackoverflow.com/' target='_blank'><img class='so_general' src='http://cdn.sstatic.net/stackexchange/img/logos/so/so-logo.png'></a><hr>Stack Overflow is <b>a programming Q & A site that's free.</b> Free to ask questions, free to answer questions, free to read, free to index, built with plain old HTML, no fake rot13 text on the home page, no scammy google-cloaking tactics, no salespeople, no JavaScript windows dropping down in front of the answer asking for $12.95 to go away. You can register if you want to collect karma and win valuable flair that will appear next to your name, but otherwise, it's just free. And fast. Very, very fast.");
			
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
					.attr("class","gh_user_tile")
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
					.attr("class","pieChart")
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
				.html("<a href=https://github.com/" + data.login + "/ target='_blank'>" + data.login + "</a>")
				.style("font-size", global_name_font_size)
				.attr("title",function(d)
				{
					$(this).tipsy({gravity: 's', html: true, hoverable: false});
					return data.name;
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
				// Some finangling to get the 'tag' to the correct format as a string
				String(tag);
				var tmp = tag.replace("-","/");
			
				global_coordinates[temp_i].occupied = true;
				global_coordinates[temp_i].id = tileID;
				d3.select('body')
					.append("div")
					.attr("class","gh_repo_user_tile")
					.attr("id",tileID)
					.style('top', coordinates[0] + 'px')
					.style('left', coordinates[1] + 'px');
					
				d3.select("#" + tileID)
					.append("div")
					.attr("class","breadcrumbs")
					.attr("id","breadcrumbs_" + tileID)
					.append('text')
					.html("<img class='gh_icon' src='media/gh_logo.png'> >> <img class='small_avatar' src='" + data.avatar + "'> ");
					
				d3.select("#breadcrumbs_" + tileID)
					.append("text")
					.html(" <a href=https://github.com/" + data.login + "/ target='_blank'>" + data.login + "</a> ")
					.attr("title",function(d)
					{
						$(this).tipsy({gravity: 's', html: true, hoverable: false});
						return data.name;
					});
				
				var tmp_string = data.login + ' >> ' + tmp;
				console.log(tmp_string.length);
				d3.select("#breadcrumbs_" + tileID)
					.append("text")
					.html(function(d)
						{
							// If the repo title is too long, we'll need to shorten it
							if(tmp_string.length > 28)
							{
								var repo_length = tmp.length;
								var temp_diff = tmp_string.length - 28;
								var temp_end = repo_length - temp_diff;
								if(temp_end > 0)
								{
									return '>> <a href="https://github.com/' + tmp + '/commits?author=' + data.login + '" target="_blank">' + tmp.substr(0,temp_end) + "..</a>";
								}
							}
							return '>> <a href="https://github.com/' + tmp + '/commits?author=' + data.login + '" target="_blank">' + tmp + "</a>";
						})
					.attr('title', function(d)
						{
							$(this).tipsy({gravity: 's', html: true, hoverable: false});
							return tmp;	
						});

				d3.select("#" + tileID)
					.append("div")
					.attr("class","gh_info")
					.attr("id","info_" + tileID);
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
				//avEl = document.getElementById("avatar_" + tileID);
					
				//avEl.innerHTML = "<img class='avatar' src='" + data.avatar + "'>";
				
			d3.select("#" + tileID)
				.append("span")
				.attr("class","close_button")
				.html("&otimes;")
				.on("click",function()
					{
						remove_tile(this, tileID);
					});
			
			var temp_language = data.repos[tmp].language != null ? data.repos[tmp].language : 'info not available';
				
			var temp_commentNum = data.repos[tmp].commentCount != undefined ? data.repos[tmp].commentCount : 0;
			var temp_commitNum = data.repos[tmp].commitCount != undefined ? data.repos[tmp].commitCount : 0;
			var temp_issueNum = data.repos[tmp].issueCount != undefined ? data.repos[tmp].issueCount : 0;
			
			d3.select("#info_" + tileID)
				.append("text")
				.html('Language: ' + temp_language + '<br>Forked: ' + data.repos[tmp].isFork + '<br>Commits: ' + temp_commitNum + '<br>Comments: ' + temp_commentNum + '<br>Issues: ' + temp_issueNum);	
			
				pie_chart(source, "gh_repo", tag);
				data_format(source, "gh_repo", tag);
				legend(tileID, "bar", "gh");
			}
		});
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw tile for user's GitHub activity within a repo <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	//
	//
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin draw tile for user's repositories by language ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	else if(type === "gh_languages")
	{
		d3.json(source,function(error,data)
		{
			var tileID = "gh_languages_" + data.id + "_" + set_strip(tag) + "_tile";
			var tileEl = document.getElementById(tileID);
			if(tileEl == null)
			{
				// Some finangling to get the 'tag' to the correct format as a string
				String(tag);
				tag = get_strip(tag);
				var tmp = tag;
				
				global_coordinates[temp_i].occupied = true;
				global_coordinates[temp_i].id = tileID;
				d3.select('body')
					.append("div")
					.attr("class","gh_language_user_tile")
					.attr("id",tileID)
					.style('top', coordinates[0] + 'px')
					.style('left', coordinates[1] + 'px');
					
				d3.select("#" + tileID)
					.append("div")
					.attr("class","breadcrumbs")
					.attr("id","breadcrumbs_" + tileID)
					.append('text')
					.html("<img class='gh_icon' src='media/gh_logo.png'> >> <img class='small_avatar' src='" + data.avatar + "'> ");
					
				d3.select("#breadcrumbs_" + tileID)
					.append("text")
					.html(" <a href=https://github.com/" + data.login + "/ target='_blank'>" + data.login + "</a> ")
					.attr("title",function(d)
					{
						$(this).tipsy({gravity: 's', html: true, hoverable: false});
						return data.name;
					});
				
				var tmp_string = data.login + ' >> ' + tmp;
				console.log(tmp_string.length);
				d3.select("#breadcrumbs_" + tileID)
					.append("text")
					.html(function(d)
						{
							// If the repo title is too long, we'll need to shorten it
							if(tmp_string.length > 28)
							{
								var repo_length = tmp.length;
								var temp_diff = tmp_string.length - 28;
								var temp_end = repo_length - temp_diff;
								if(temp_end > 0)
								{
									return '>> ' + tmp.substr(0,temp_end) + "..";
								}
							}
							return '>> ' + tmp;
						})
					.attr('title', function(d)
						{
							$(this).tipsy({gravity: 's', html: true, hoverable: false});
							return tmp;	
						});
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
					.attr("class","repos_title")
					.attr("id","repo_list_title_" + tileID);
				d3.select("#" + tileID)
					.append("div")
					.attr("class","repos")
					.attr("id","repo_list_" + tileID);
				
			d3.select("#" + tileID)
				.append("span")
				.attr("class","close_button")
				.html("&otimes;")
				.on("click",function()
					{
						remove_tile(this, tileID);
					});
			}
			
			d3.select("#repo_list_title_" + tileID)
				.append("text")
				.html('<p><b>' + tag + '</b> Repositories</p>')
				.style('text-decoration', 'underline');
							
			_.keys(data.repos).forEach(function(d)
				{
					if(data.repos[d].language == tag)
					{
						var tmp_repo = d.split('/');
						var repofull = tmp_repo[0] + '-' + tmp_repo[1];
						d3.select("#repo_list_" + tileID)
							.append("text")
							.html('<a href="javascript:tile(\'' + source + '\',\'gh_repo\',\'' + repofull + '\');">' + d + '</a><br>');
					}
				})
		});
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw tile for user's repositories by language <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	
	else { alert("Unknown data type parameter passed to tile()"); }
}