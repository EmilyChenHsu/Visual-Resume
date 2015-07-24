function so_general()
{
	var soEl = document.getElementById("so_general_tile");
	if(soEl == null)
	{
		d3.select("body")
			.append("div")
			.attr("class","so_general")
			.attr("id","so_general_tile");
			
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