// other is an array
// other[0] is the type of SO contribution
// other[1] is the month of the SO contribution
function tile(source, type, tag, other)
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
					.attr("class","below_avatar")
					.attr("id","below_avatar_" + tileID);
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
							
			d3.select("#below_avatar_" + tileID)
				.append("span")
					.attr("class","smallText")
					.html(function()
						{
							return data.website != null ? ("<a href='" + data.website + "' target='_blank'>website</a><br>") : "";
						})
				.append("text")
					.html('<bigger>' + Comma(data.reputation) + '</bigger>')
				.append("span")
					.attr("class","smallText")
					.html(" rep");
				
				// This is a sad, sad way to ensure things don't fire early..
				setTimeout(function()
				{
					legend(tileID, "bar", "so");
					setTimeout(function()
					{
						data_format(source, "so_all", null);
						setTimeout(function()
						{
							pie_chart(source, "so_all", null);
						}, global_timeout);
					}, global_timeout);
				}, global_timeout);
				//data_format(source, "so_all", null);
				//legend(tileID, "bar", "so");
				//pie_chart(source, "so_all", null);
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
			// Some finangling to get the 'tag' to the correct format as a string
			String(tag);
			var tmp = get_strip(tag);
			//String(tag);
			var tagID = set_strip(tag);
			tileID = "so_" + data.id + "_" + tagID + "_tile";
			tileEl = document.getElementById(tileID);
			if(tileEl == null)
			{
				global_coordinates[temp_i].occupied = true;
				global_coordinates[temp_i].id = tileID;
				d3.select('body')
					.append("div")
					.attr("class","so_tag_user_tile")
					.attr("id",tileID)
					.style('top', coordinates[0] + 'px')
					.style('left', coordinates[1] + 'px');
				
				d3.select("#" + tileID)
					.append("div")
					.attr("class","breadcrumbs")
					.attr("id","breadcrumbs_" + tileID)
					.append('text')
					.html("<img class='so_icon' src='http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png'>>> <img class='small_avatar' src='http://www.gravatar.com/avatar/" + data.avatar + "'> ");
					
				d3.select("#breadcrumbs_" + tileID)
					.append("text")
					.html(" <a href=http://stackoverflow.com/users/" + data.id + "/ target='_blank'>" + data.displayName + "</a> ")
					.attr("title",function(d)
					{
						$(this).tipsy({gravity: 's', html: true, hoverable: false});
						return data.name;
					});
				
				var tmp_string = data.displayName + ' >> ' + get_strip(tmp);
				d3.select("#breadcrumbs_" + tileID)
					.append("text")
					.html(function(d)
						{
							// If the repo title is too long, we'll need to shorten it
							if(tmp_string.length > 28)
							{
								var tag_length = tmp.length;
								var temp_diff = tmp_string.length - 28;
								var temp_end = tag_length - temp_diff;
								if(temp_end > 0)
								{
									return ' >> <a href="http://stackoverflow.com/search?q=user:' + data.id + '+[' + set_url(tag) + ']' + '" target="_blank">' + tag.substr(0,temp_end) + '..</a>';
								}
							}
							return ' >> <a href="http://stackoverflow.com/search?q=user:' + data.id + '+[' + set_url(tag) + ']' + '" target="_blank">' + tag + '</a>';
						})
					.attr('title', function(d)
						{
							$(this).tipsy({gravity: 's', html: true, hoverable: false});
							return tmp;	
						});

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
				
				var temp_tag = set_strip(tag);
				
				tag = get_strip(temp_tag);
				var temp_commentNum = data.tags[tag].commentCount != undefined ? data.tags[tag].commentCount : 0;
				var temp_answerNum = data.tags[tag].answerCount != undefined ? data.tags[tag].answerCount : 0;
				var temp_questionNum = data.tags[tag].questionCount != undefined ? data.tags[tag].questionCount : 0;
				
				d3.select("#tag_" + tileID)
					.append('text')
					.html('Answers: ' + temp_answerNum + '<br>Comments: ' + temp_commentNum + '<br>Questions: ' + temp_questionNum);
				
				d3.select("#" + tileID)
					.append("hr")
					.attr("class", "separator");
				d3.select("#" + tileID)
					.append("div")
					.attr("class","shortBarChart")
					.attr("id","short_stacked_" + tileID);
				
				// This is a sad, sad way to ensure things don't fire early..
				setTimeout(function()
				{
					legend(tileID, "bar", "so");
					setTimeout(function()
					{
						data_format(source, "so_tag", tag);
						setTimeout(function()
						{
							pie_chart(source, "so_tag", tag);
						}, global_timeout);
					}, global_timeout);
				}, global_timeout);
				//pie_chart(source, "so_tag", tag);
				//data_format(source, "so_tag", tag);
				//legend(tileID, "bar", "so");
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
					.attr("class","below_avatar")
					.attr("id","followers_" + tileID)
					.append("text")
					.html(function()
						{
							return data.website != null ? ("<a href='" + data.website + "' target='_blank'>website</a><br>") : "";
						})
					.append('text')
					.html("<bigger>" + data.followers + "</bigger>" + " followers");
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
			
			d3.select("#" + tileID)
				.append("div")
				.attr("class","icon")
				.html("<a href='https://github.com/explore' target='_blank'><img class='gh_icon' src='media/gh_logo.png'></a>");
				
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
				
				// This is a sad, sad way to ensure things don't fire early..
				setTimeout(function()
				{
					legend(tileID, "bar", "gh");
					setTimeout(function()
					{
						data_format(source, "gh");
						setTimeout(function()
						{
							pie_chart(source, "gh", null);
						}, global_timeout);
					}, global_timeout);
				}, global_timeout);
				//pie_chart(source, "gh", null);
				//data_format(source, "gh");
				//legend(tileID, "bar", "gh");
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
				var tmp = get_strip(tag);
				tmp = tmp.replace("-","/");
			
				console.log(tmp);
			
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
					.attr("class","below_avatar")
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
			
			var temp_language = data.repos[tmp].language != null ? data.repos[tmp].language : 'unavailable';
				
			var temp_commentNum = data.repos[tmp].commentCount != undefined ? data.repos[tmp].commentCount : 0;
			var temp_commitNum = data.repos[tmp].commitCount != undefined ? data.repos[tmp].commitCount : 0;
			var temp_issueNum = data.repos[tmp].issueCount != undefined ? data.repos[tmp].issueCount : 0;
			
			d3.select("#info_" + tileID)
				.append("text")
				.html('Language: ');
			d3.select("#info_" + tileID)
				.append("text")
				.html(function()
					{
						// If the language name is too long, we'll need to shorten it
						if(temp_language.length > 14)
						{
							return temp_language.substr(0,13) + "..";
						}
						return temp_language;
					})
				.attr('title', function(d)
						{
							$(this).tipsy({gravity: 's', html: true, hoverable: false});
							return temp_language;	
						});
				
			d3.select("#info_" + tileID)
				.append("text")
				.html('<br>Forked: ' + data.repos[tmp].isFork + '<br>Commits: ' + temp_commitNum + '<br>Comments: ' + temp_commentNum + '<br>Issues: ' + temp_issueNum);	
			
				// This is a sad, sad way to ensure things don't fire early..
				setTimeout(function()
				{
					legend(tileID, "bar", "gh");
					setTimeout(function()
					{
						data_format(source, "gh_repo", tag);
						setTimeout(function()
						{
							pie_chart(source, "gh_repo", tag);
						}, global_timeout);
					}, global_timeout);
				}, global_timeout);
				//pie_chart(source, "gh_repo", tag);
				//data_format(source, "gh_repo", tag);
				//legend(tileID, "bar", "gh");
			}
		});
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw tile for user's GitHub activity within a repo <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	//
	//
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin draw tile for user's "other" tags ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	else if(type === "so_otherTags")
	{
		d3.json(source,function(error,data)
		{
			var tileID = "so_otherTags_" + data.id + "_" + "_tile";
			var tileEl = document.getElementById(tileID);
			if(tileEl == null)
			{
				// Some finangling to get the 'tag' to the correct format as a string
				//String(tag);
				//tag = get_strip(tag);
				//var tmp = tag;
				
				global_coordinates[temp_i].occupied = true;
				global_coordinates[temp_i].id = tileID;
				d3.select('body')
					.append("div")
					.attr("class","gh_otherTags_user_tile")
					.attr("id",tileID)
					.style('top', coordinates[0] + 'px')
					.style('left', coordinates[1] + 'px');
					
				d3.select("#" + tileID)
					.append("div")
					.attr("class","breadcrumbs")
					.attr("id","breadcrumbs_" + tileID)
					.append('text')
					.html("<img class='so_icon' src='http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png'>>> <img class='small_avatar' src='http://www.gravatar.com/avatar/" + data.avatar + "'> ");
					
				d3.select("#breadcrumbs_" + tileID)
					.append("text")
					.html(" <a href=http://stackoverflow.com/users/" + data.id + "/ target='_blank'>" + data.displayName + "</a> ")
					.attr("title",function(d)
					{
						$(this).tipsy({gravity: 's', html: true, hoverable: false});
						return data.name;
					});
				var tmp = tag == undefined ? ' >> questions' : tag + ' >> questions';
				var tmp_string = data.displayName + tmp;
				d3.select("#breadcrumbs_" + tileID)
					.append("text")
					.html(function(d)
						{
							// If the repo title is too long, we'll need to shorten it
							if(tmp_string.length > 28)
							{
								var tag_length = tmp.length;
								var temp_diff = tmp_string.length - 28;
								var temp_end = tag_length - temp_diff;
								if(temp_end > 0)
								{
									//return ' >> <a href="http://stackoverflow.com/users/' + data.id + '?tab=questions" target="_blank">' + tmp.substr(0,temp_end) + '..</a>';
									return tmp;
								}
							}
							return tmp;
							//return ' >> <a href="http://stackoverflow.com/users/' + data.id + '?tab=questions" target="_blank">' + tmp + '</a>';
						})
					.attr('title', function(d)
						{
							//$(this).tipsy({gravity: 's', html: true, hoverable: false});
							return tmp;	
						});
					
				d3.select("#" + tileID)
					.append("div")
					.attr("class","below_avatar")
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
			
			d3.select("#repo_list_title_" + tileID)
				.append("text")
				.html('<p><b>Other</b> Tags</p>')
				.style('text-decoration', 'underline');
							
			other.forEach(function(d)
				{
					console.log(d);
					d3.select("#repo_list_" + tileID)
						.append("text")
						.html('<a href="javascript:tile(\'' + source + '\',\'so_tag\',\'' + d.tag + '\');">' + d.tag + '</a><br>');
				})
			}
		});
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw tile for user's "other" tags <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	//
	//
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin draw tile for user's "other" languages ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	else if(type === "gh_otherLanguages")
	{
		d3.json(source,function(error,data)
		{
			var tileID = "gh_otherLanguages_" + data.id + "_" + "_tile";
			var tileEl = document.getElementById(tileID);
			if(tileEl == null)
			{
				// Some finangling to get the 'tag' to the correct format as a string
				//String(tag);
				//tag = get_strip(tag);
				//var tmp = tag;
				
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
				
				var tmp = "other repos";
				var tmp_string = data.login + ' >> ' + tmp;
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
					.attr("class","below_avatar")
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
			
			d3.select("#repo_list_title_" + tileID)
				.append("text")
				.html('<p><b>Other</b> Repositories</p>')
				.style('text-decoration', 'underline');
					
					
			var otherlangs = new Array();
			
			other.forEach(function(d)
				{
					console.log(d);
					otherlangs.push(d.language);
				});
			
			_.keys(data.repos).forEach(function(d)
				{
					var repo = d;
					String(repo);
					console.log(d);
					
					var temp_total = d.total;
					if($.inArray(data.repos[repo].language, otherlangs) != -1)
					{
						console.log($.inArray(data.repos[repo].language, otherlangs));
						if(temp_total > 0)
						{
							var repofull = repo.replace("/","-");
							d3.select("#repo_list_" + tileID)
								.append("text")
								.html('<a href="javascript:tile(\'' + source + '\',\'gh_repo\',\'' + repofull + '\');">' + data.repos[repo].owner + '/' + repo + '</a><br>');
						}
						else
						{
							console.log(data);
							d3.select("#repo_list_" + tileID)
								.append("text")
								.style('color', '#bbb')
								.html(repo + '<br>');
						}
					}
				})
			}
		});
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw tile for user's "other" languages <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	//
	//
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin draw tile for user's "other" repositories ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	else if(type === "gh_otherRepos")
	{
		d3.json(source,function(error,data)
		{
			var tileID = "gh_otherRepos_" + data.id + "_" + "_tile";
			var tileEl = document.getElementById(tileID);
			if(tileEl == null)
			{
				// Some finangling to get the 'tag' to the correct format as a string
				//String(tag);
				//tag = get_strip(tag);
				//var tmp = tag;
				
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
				
				var tmp = "other repos";
				var tmp_string = data.login + ' >> ' + tmp;
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
					.attr("class","below_avatar")
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
			
			d3.select("#repo_list_title_" + tileID)
				.append("text")
				.html('<p><b>Other</b> Repositories</p>')
				.style('text-decoration', 'underline');
							
			other.forEach(function(d)
				{
					console.log(d);
					
					var temp_total = d.total;
					if(temp_total > 0)
					{
						var repofull = d.owner + '-' + d.repo;
						d3.select("#repo_list_" + tileID)
							.append("text")
							.html('<a href="javascript:tile(\'' + source + '\',\'gh_repo\',\'' + repofull + '\');">' + d.owner + '/' + d.repo + '</a><br>');
					}
					else
					{
						d3.select("#repo_list_" + tileID)
							.append("text")
							.style('color', '#bbb')
							.html(d.owner + '/' + d.repo + '<br>');
					}
					
				})
			}
		});
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw tile for user's "other" repositories <==
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
					.attr("class","below_avatar")
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
			
				d3.select("#repo_list_title_" + tileID)
					.append("text")
					.html('<p><b>' + tag + '</b> Repositories</p>')
					.style('text-decoration', 'underline');
								
				_.keys(data.repos).forEach(function(d)
					{
						if(tag == 'unknown' && data.repos[d].language == undefined)
						{	
							var temp_total = data.repos[d].commitCount + data.repos[d].issueCount + data.repos[d].commentCount;
							if(temp_total > 0)
							{
								var tmp_repo = d.split('/');
								var repofull = tmp_repo[0] + '-' + tmp_repo[1];
								d3.select("#repo_list_" + tileID)
									.append("text")
									.html('<a href="javascript:tile(\'' + source + '\',\'gh_repo\',\'' + repofull + '\');">' + d + '</a><br>');
							}
							else
							{
								d3.select("#repo_list_" + tileID)
									.append("text")
									.style('color', '#bbb')
									.html(d + '<br>');
							}
						}
						else if(data.repos[d].language == tag)
						{
							var temp_total = data.repos[d].commitCount + data.repos[d].issueCount + data.repos[d].commentCount;
							if(temp_total > 0)
							{
								var tmp_repo = d.split('/');
								var repofull = tmp_repo[0] + '-' + tmp_repo[1];
								d3.select("#repo_list_" + tileID)
									.append("text")
									.html('<a href="javascript:tile(\'' + source + '\',\'gh_repo\',\'' + repofull + '\');">' + d + '</a><br>');
							}
							else
							{
								d3.select("#repo_list_" + tileID)
									.append("text")
									.style('color', '#bbb')
									.html(d + '<br>');
							}
						}
					})
			}
		});
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw tile for user's repositories by language <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	//
	//
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin draw tile for user's GH comments ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	else if(type === "gh_comments")
	{
		d3.json(source,function(error,data)
		{
			var tileID = "";
			if(tag == undefined)
			{
				var tileID = "gh_comments_" + other[1] + "_" + data.id + "_tile";
			}
			else
			{
				var tileID = "gh_comments_" + other[1] + "_" + data.id + "_" + set_strip(tag) + "_tile";
			}
			//var tileID = "so_questions_" + other[1] + "_" + data.id + "_tile";
			
			var tileEl = document.getElementById(tileID);
			if(tileEl == null)
			{
				
				global_coordinates[temp_i].occupied = true;
				global_coordinates[temp_i].id = tileID;
				d3.select('body')
					.append("div")
					.attr("class","gh_comments_user_tile")
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
				
				if(tag != undefined) { tag = get_strip(tag) };
				
				var tmp = tag == undefined ? 'comments' : tag + ' >> comments';
				var tmp_string = data.login + ' >> ' + tmp;
				d3.select("#breadcrumbs_" + tileID)
					.append("text")
					.html(function(d)
						{
							return '>> ' + tmp;
						});
					
				d3.select("#" + tileID)
					.append("div")
					.attr("class","below_avatar")
					.attr("id","followers_" + tileID);
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
					
				d3.select("#repo_list_title_" + tileID)
					.append("text")
					.html('<p>Comments for ' + other[1] + '</p>')
					.style('text-decoration', 'underline');
					
				
				if(tag == undefined)
				{
					_.keys(data.comments).forEach(function(d,i)
                    {
						if(data.comments[d].date == other[1])
						{
							d3.select('#repo_list_' + tileID)
								.append('text')
								.html(function()
									{
										if(data.comments[d].parent_url != '')
										{
											return '<p><a href="' + data.comments[d].parent_url + '#issuecomment-' + data.comments[d].id + '" target="_blank"><b>View Comment</b></p></a><p>' + data.comments[d].body + '</p><hr>';
										}
										/*
										else if(data.comments[d].url != undefined)
										{
											return '<p><a href="' + data.comments[d].url + '" target="_blank">' + data.comments[d].body + '</a></p><hr>';
										}
										else
										{
											return '<p>' + data.comments[d].body + '</p><hr>';
										}
										*/
										else
										{
											return '';
										}
									});
						}
					});
				}
				else
				{
					_.keys(data.comments).forEach(function(d,i)
                    {
						if(data.comments[d].date == other[1])
						{
							d3.select('#repo_list_' + tileID)
								.append('text')
								.html(function()
									{
										if(data.comments[d].parent_url != '')
										{
											var url_array = data.comments[d].parent_url.split('/');
											var this_repo = url_array[3] + '/' + url_array[4];
											if(tag == this_repo)
											{
												return '<p><a href="' + data.comments[d].parent_url + '#issuecomment-' + data.comments[d].id + '" target="_blank"><b>View Comment</b></p></a><p>' + data.comments[d].body + '</p><hr>';
											}
											else
											{
												return '';
											}
										}
										/*
										else if(data.comments[d].url != undefined)
										{
											return '<p><a href="' + data.comments[d].url + '" target="_blank">' + data.comments[d].body + '</a></p><hr>';
										}
										else
										{
											return '<p>' + data.comments[d].body + '</p><hr>';
										}
										*/
										else
										{
											return '';
										}
									});
						}
					});
				}
			}

		});
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw tile for user's GH comments <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	//
	//
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin draw tile for user's GH issues ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	else if(type === "gh_issues")
	{
		d3.json(source,function(error,data)
		{
			var tileID = "";
			if(tag == undefined)
			{
				var tileID = "gh_issues_" + other[1] + "_" + data.id + "_tile";
			}
			else
			{
				var tileID = "gh_issues_" + other[1] + "_" + data.id + "_" + set_strip(tag) + "_tile";
			}
			
			var tileEl = document.getElementById(tileID);
			if(tileEl == null)
			{
				
				global_coordinates[temp_i].occupied = true;
				global_coordinates[temp_i].id = tileID;
				d3.select('body')
					.append("div")
					.attr("class","gh_issues_user_tile")
					.attr("id",tileID)
					.style('top', coordinates[0] + 'px')
					.style('left', coordinates[1] + 'px');
					
				if(tag != undefined) { tag = get_strip(tag) };
					
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
				
				var tmp = tag == undefined ? 'issues' : tag + ' >> issues';
				var tmp_string = data.login + ' >> ' + tmp;
				d3.select("#breadcrumbs_" + tileID)
					.append("text")
					.html(function(d)
						{
							return '>> ' + tmp;
						});
					
				d3.select("#" + tileID)
					.append("div")
					.attr("class","below_avatar")
					.attr("id","followers_" + tileID);
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
					
				d3.select("#repo_list_title_" + tileID)
					.append("text")
					.html('<p>Issues for ' + other[1] + '</p>')
					.style('text-decoration', 'underline');
					
				if(tag == undefined)
				{
					_.keys(data.issues).forEach(function(d,i)
                    {
						if(data.issues[d].date == other[1])
						{
							d3.select('#repo_list_' + tileID)
								.append('text')
								.html(function()
									{
										if(data.issues[d].url != undefined)
										{
											return '<p><a href="' + data.issues[d].url + '" target="_blank"><b>View Issue</b></p></a><p>' + data.issues[d].title + '</p><hr>';
										}
										else
										{
											return '<p>' + data.issues[d].title + '</p><hr>';
										}
									});
						}
					});
				}
				else
				{
					tag = get_strip(tag);
					_.keys(data.issues).forEach(function(d,i)
                    {
						if(data.issues[d].date == other[1])
						{
							d3.select('#repo_list_' + tileID)
								.append('text')
								.html(function()
									{
										var url_array = data.issues[d].url.split('/');
										var this_repo = url_array[3] + '/' + url_array[4];
										if(tag == this_repo)
										{
											if(data.issues[d].url != undefined)
											{
												return '<p><a href="' + data.issues[d].url + '" target="_blank"><b>View Issue</b></p></a><p>' + data.issues[d].title + '</p><hr>';
											}
											else
											{
												return '<p>' + data.issues[d].title + '</p><hr>';
											}
										}
										else
										{
											return '';
										}
									});
						}
					});
				}
			}

		});
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw tile for user's GH issues <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	//
	//
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin draw tile for user's GH commits ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	else if(type === "gh_commits")
	{
		d3.json(source,function(error,data)
		{
			var tileID = "";
			if(tag == undefined)
			{
				var tileID = "gh_commits_" + other[1] + "_" + data.id + "_tile";
			}
			else
			{
				var tileID = "gh_commits_" + other[1] + "_" + data.id + "_" + set_strip(tag) + "_tile";
			}
			//var tileID = "so_questions_" + other[1] + "_" + data.id + "_tile";
			
			var tileEl = document.getElementById(tileID);
			if(tileEl == null)
			{
				
				global_coordinates[temp_i].occupied = true;
				global_coordinates[temp_i].id = tileID;
				d3.select('body')
					.append("div")
					.attr("class","gh_commits_user_tile")
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
				
				if(tag != undefined) { tag = get_strip(tag) };
				
				var tmp = tag == undefined ? 'commits' : tag + ' >> commits';
				var tmp_string = data.login + ' >> ' + tmp;
				d3.select("#breadcrumbs_" + tileID)
					.append("text")
					.html(function(d)
						{
							return '>> ' + tmp;
						});
					
				d3.select("#" + tileID)
					.append("div")
					.attr("class","below_avatar")
					.attr("id","followers_" + tileID);
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
					
				d3.select("#repo_list_title_" + tileID)
					.append("text")
					.html('<p>Commits for ' + other[1] + '</p>')
					.style('text-decoration', 'underline');
					
				if(tag == undefined)
				{
					_.keys(data.commits).forEach(function(d,i)
                    {
						if(data.commits[d].date == other[1])
						{
							d3.select('#repo_list_' + tileID)
								.append('text')
								.html(function()
									{
										if(data.commits[d].url != undefined)
										{
											var url_array = data.commits[d].url.split('/');
											var api_string = url_array[2].split('.');
											
											var url = url_array[0] + '/' + url_array[1] + '/' + api_string[1] + '.' + api_string[2] + '/' + url_array[4] + '/' + url_array[5] + '/' + url_array[6].slice(0,-1) + '/' + url_array[7];
											return '<p><a href="' + url + '" target="_blank"><b>View Commit</b></p></a><p>' + data.commits[d].message + '</p><hr>';
										}
										else
										{
											var url = 'https://github.com/' + data.commits[d].repo + '/commit/' + data.commits[d].hash;
											return '<p><a href="' + url + '" target="_blank"><b>View Commit</b></p></a><p>' + data.commits[d].message + '</p><hr>';
											//return '<p><b>Commit URL Missing</b></p><p>' + data.commits[d].message + '</p><hr>';
										}
									});
						}
						/*
						var temp_repo = d;
						_.keys(data.repos[temp_repo].commits).forEach(function(d,i)
						{
							if(data.repos[temp_repo].commits[d].date == other[1])
							{
								d3.select('#repo_list_' + tileID)
									.append('text')
									.html(function()
										{
											if(data.repos[temp_repo].commits[d].url != undefined)
											{
												var url_array = data.repos[temp_repo].commits[d].url.split('/');
												var api_string = url_array[2].split('.');
												
												var url = url_array[0] + '/' + url_array[1] + '/' + api_string[1] + '.' + api_string[2] + '/' + url_array[4] + '/' + url_array[5] + '/' + url_array[6].slice(0,-1) + '/' + url_array[7];
												return '<p><a href="' + url + '" target="_blank"><b>View Commit</b></p></a><p>' + data.repos[temp_repo].commits[d].message + '</p><hr>';
											}
											else
											{
												var url = 'https://github.com/' + temp_repo + '/commit/' + data.repos[temp_repo].commits[d].hash;
												return '<p><a href="' + url + '" target="_blank"><b>View Commit</b></p></a><p>' + data.repos[temp_repo].commits[d].message + '</p><hr>';
											}
										});
							}
						});
						*/
					});
				}
				else
				{
					tag = get_strip(tag);
					
					_.keys(data.commits).forEach(function(d,i)
                    {
						console.log(tag);
						if(data.commits[d].date == other[1] && data.commits[d].repo == tag)
						{
							d3.select('#repo_list_' + tileID)
								.append('text')
								.html(function()
									{
										if(data.commits[d].url != undefined)
										{
											var url_array = data.commits[d].url.split('/');
											var api_string = url_array[2].split('.');
											
											console.log(url_array);
											
											var url = url_array[0] + '/' + url_array[1] + '/' + api_string[1] + '.' + api_string[2] + '/' + url_array[4] + '/' + url_array[5] + '/' + url_array[6].slice(0,-1) + '/' + url_array[7];
											return '<p><a href="' + url + '" target="_blank"><b>View Commit</b></p></a><p>' + data.commits[d].message + '</p><hr>';
										}
										else
										{
											var url = 'https://github.com/' + tag + '/commit/' + data.commits[d].hash;
											return '<p><a href="' + url + '" target="_blank"><b>View Commit</b></p></a><p>' + data.commits[d].message + '</p><hr>';
										}
									});
						}
					});
					
					/*
					_.keys(data.repos).forEach(function(d,i)
                    {
						if(d == tag)
						{
							var temp_repo = d;
							_.keys(data.repos[temp_repo].commits).forEach(function(d,i)
							{
								if(data.repos[temp_repo].commits[d].date == other[1])
								{
									d3.select('#repo_list_' + tileID)
										.append('text')
										.html(function()
											{
												if(data.repos[temp_repo].commits[d].url != undefined)
												{
													var url_array = data.repos[temp_repo].commits[d].url.split('/');
													var api_string = url_array[2].split('.');
													
													var url = url_array[0] + '/' + url_array[1] + '/' + api_string[1] + '.' + api_string[2] + '/' + url_array[4] + '/' + url_array[5] + '/' + url_array[6].slice(0,-1) + '/' + url_array[7];
													return '<p><a href="' + url + '" target="_blank"><b>View Commit</b></p></a><p>' + data.repos[temp_repo].commits[d].message + '</p><hr>';
												}
												else
												{
													var url = 'https://github.com/' + temp_repo + '/commit/' + data.repos[temp_repo].commits[d].hash;
													return '<p><a href="' + url + '" target="_blank"><b>View Commit</b></p></a><p>' + data.repos[temp_repo].commits[d].message + '</p><hr>';
												}
											});
								}
							});
						}
					});
					*/
				}
			}

		});
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw tile for user's GH commits <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	//
	//
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin draw tile for user's SO questions ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	else if(type === "so_questions")
	{
		d3.json(source,function(error,data)
		{
			var tileID = "";
			if(tag == undefined)
			{
				var tileID = "so_questions_" + other[1] + "_" + data.id + "_tile";
			}
			else
			{
				var tileID = "so_questions_" + other[1] + "_" + data.id + "_" + set_strip(tag) + "_tile";
			}
			//var tileID = "so_questions_" + other[1] + "_" + data.id + "_tile";
			var tileEl = document.getElementById(tileID);
			if(tileEl == null)
			{
				
				global_coordinates[temp_i].occupied = true;
				global_coordinates[temp_i].id = tileID;
				d3.select('body')
					.append("div")
					.attr("class","so_questions_user_tile")
					.attr("id",tileID)
					.style('top', coordinates[0] + 'px')
					.style('left', coordinates[1] + 'px');
					
				d3.select("#" + tileID)
					.append("div")
					.attr("class","breadcrumbs")
					.attr("id","breadcrumbs_" + tileID)
					.append('text')
					.html("<img class='so_icon' src='http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png'>>> <img class='small_avatar' src='http://www.gravatar.com/avatar/" + data.avatar + "'> ");
					
				d3.select("#breadcrumbs_" + tileID)
					.append("text")
					.html(" <a href=http://stackoverflow.com/users/" + data.id + "/ target='_blank'>" + data.displayName + "</a> ")
					.attr("title",function(d)
					{
						$(this).tipsy({gravity: 's', html: true, hoverable: false});
						return data.name;
					});
				var tmp = tag == undefined ? ' >> questions' : tag + ' >> questions';
				var tmp_string = data.displayName + tmp;
				d3.select("#breadcrumbs_" + tileID)
					.append("text")
					.html(function(d)
						{
							// If the repo title is too long, we'll need to shorten it
							if(tmp_string.length > 28)
							{
								var tag_length = tmp.length;
								var temp_diff = tmp_string.length - 28;
								var temp_end = tag_length - temp_diff;
								if(temp_end > 0)
								{
									//return ' >> <a href="http://stackoverflow.com/users/' + data.id + '?tab=questions" target="_blank">' + tmp.substr(0,temp_end) + '..</a>';
									return tmp;
								}
							}
							return tmp;
							//return ' >> <a href="http://stackoverflow.com/users/' + data.id + '?tab=questions" target="_blank">' + tmp + '</a>';
						})
					.attr('title', function(d)
						{
							//$(this).tipsy({gravity: 's', html: true, hoverable: false});
							return tmp;	
						});		
			
				d3.select("#" + tileID)
					.append("div")
					.attr("class","below_avatar")
					.attr("id","followers_" + tileID);
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
					
				d3.select("#repo_list_title_" + tileID)
					.append("text")
					.html('<p>Questions for ' + other[1] + '</p>')
					.style('text-decoration', 'underline');
					
				get_so(other[0], other[1], data.id, "repo_list_" + tileID, tag);
			}

		});
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw tile for user's SO questions <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	//
	//
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin draw tile for user's SO answers ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	//else if(type === "so_answers" && tag == undefined)
	else if(type === "so_answers")
	{
		d3.json(source,function(error,data)
		{
			var tileID = "";
			if(tag == undefined)
			{
				var tileID = "so_answers_" + other[1] + "_" + data.id + "_tile";
			}
			else
			{
				var tileID = "so_answers_" + other[1] + "_" + data.id + "_" + set_strip(tag) + "_tile";
			}
			//var tileID = "so_answers_" + other[1] + "_" + data.id + "_tile";
			var tileEl = document.getElementById(tileID);
			if(tileEl == null)
			{
				
				global_coordinates[temp_i].occupied = true;
				global_coordinates[temp_i].id = tileID;
				d3.select('body')
					.append("div")
					.attr("class","so_answers_user_tile")
					.attr("id",tileID)
					.style('top', coordinates[0] + 'px')
					.style('left', coordinates[1] + 'px');
					
				d3.select("#" + tileID)
					.append("div")
					.attr("class","breadcrumbs")
					.attr("id","breadcrumbs_" + tileID)
					.append('text')
					.html("<img class='so_icon' src='http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png'>>> <img class='small_avatar' src='http://www.gravatar.com/avatar/" + data.avatar + "'> ");
					
				d3.select("#breadcrumbs_" + tileID)
					.append("text")
					.html(" <a href=http://stackoverflow.com/users/" + data.id + "/ target='_blank'>" + data.displayName + "</a> ")
					.attr("title",function(d)
					{
						$(this).tipsy({gravity: 's', html: true, hoverable: false});
						return data.name;
					});
				var tmp = tag == undefined ? ' >> answers' : tag + ' >> answers';
				var tmp_string = data.displayName + tmp;
				d3.select("#breadcrumbs_" + tileID)
					.append("text")
					.html(function(d)
						{
							// If the repo title is too long, we'll need to shorten it
							if(tmp_string.length > 28)
							{
								var tag_length = tmp.length;
								var temp_diff = tmp_string.length - 28;
								var temp_end = tag_length - temp_diff;
								if(temp_end > 0)
								{
									//return ' >> <a href="http://stackoverflow.com/users/' + data.id + '?tab=answers" target="_blank">' + tmp.substr(0,temp_end) + '..</a>';
									return tmp;
								}
							}
							return tmp;
							//return ' >> <a href="http://stackoverflow.com/users/' + data.id + '?tab=answers" target="_blank">' + tmp + '</a>';
						})
					.attr('title', function(d)
						{
							$(this).tipsy({gravity: 's', html: true, hoverable: false});
							return tmp;	
						});
					
				d3.select("#" + tileID)
					.append("div")
					.attr("class","below_avatar")
					.attr("id","followers_" + tileID);
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
					
				d3.select("#repo_list_title_" + tileID)
					.append("text")
					.html('<p>Answers for ' + other[1] + '</p>')
					.style('text-decoration', 'underline');
					
				get_so(other[0], other[1], data.id, "repo_list_" + tileID, tag);
			}

		});
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw tile for user's SO answers <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	//
	//
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// Begin draw tile for user's SO comments ==>
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	//else if(type === "so_comments" && tag == undefined)
	else if(type === "so_comments")
	{
		d3.json(source,function(error,data)
		{
			var tileID = "";
			if(tag == undefined)
			{
				var tileID = "so_comments_" + other[1] + "_" + data.id + "_tile";
			}
			else
			{
				var tileID = "so_comments_" + other[1] + "_" + data.id + "_" + set_strip(tag) + "_tile";
			}
			//var tileID = "so_comments_" + other[1] + "_" + data.id + "_tile";
			var tileEl = document.getElementById(tileID);
			if(tileEl == null)
			{
				
				global_coordinates[temp_i].occupied = true;
				global_coordinates[temp_i].id = tileID;
				d3.select('body')
					.append("div")
					.attr("class","so_comments_user_tile")
					.attr("id",tileID)
					.style('top', coordinates[0] + 'px')
					.style('left', coordinates[1] + 'px');
					
				d3.select("#" + tileID)
					.append("div")
					.attr("class","breadcrumbs")
					.attr("id","breadcrumbs_" + tileID)
					.append('text')
					.html("<img class='so_icon' src='http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png'>>> <img class='small_avatar' src='http://www.gravatar.com/avatar/" + data.avatar + "'> ");
					
				d3.select("#breadcrumbs_" + tileID)
					.append("text")
					.html(" <a href=http://stackoverflow.com/users/" + data.id + "/ target='_blank'>" + data.displayName + "</a> ")
					.attr("title",function(d)
					{
						$(this).tipsy({gravity: 's', html: true, hoverable: false});
						return data.name;
					});
				var tmp = tag == undefined ? ' >> comments' : tag + ' >> comments';
				var tmp_string = data.displayName + tmp;
				d3.select("#breadcrumbs_" + tileID)
					.append("text")
					.html(function(d)
						{
							// If the repo title is too long, we'll need to shorten it
							if(tmp_string.length > 28)
							{
								var tag_length = tmp.length;
								var temp_diff = tmp_string.length - 28;
								var temp_end = tag_length - temp_diff;
								if(temp_end > 0)
								{
									//return ' >> <a href="http://stackoverflow.com/users/' + data.id + '?tab=comments" target="_blank">' + tmp.substr(0,temp_end) + '..</a>';
									return tmp;
								}
							}
							//return ' >> <a href="http://stackoverflow.com/users/' + data.id + '?tab=comments" target="_blank">' + tmp + '</a>';
							return tmp;
						})
					.attr('title', function(d)
						{
							$(this).tipsy({gravity: 's', html: true, hoverable: false});
							return tmp;
						});
				
				d3.select("#" + tileID)
					.append("div")
					.attr("class","below_avatar")
					.attr("id","followers_" + tileID);
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
					
				d3.select("#repo_list_title_" + tileID)
					.append("text")
					.html('<p>Comments for ' + other[1] + '</p>')
					.style('text-decoration', 'underline');
					
				get_so(other[0], other[1], data.id, "repo_list_" + tileID, tag);
			}

		});
	}
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	// End draw tile for user's SO comments <==
	// ===== ===== ===== ===== ===== ===== ===== ===== ===== //
	
	else { console.log("Unknown data type parameter passed to tile()"); }
}