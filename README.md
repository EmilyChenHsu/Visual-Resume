# GitHub Resume/API README

* To cycle through the full names of each of a user's repos:

`_.each(data,function(d,i)
{
    console.log(i + " " + d['full_name']);
});`

* To cycle through the simple names of each of a user's repos:

`_.each(data,function(d,i)
{
    console.log(i + " " + d['name']);
});`

* To cycle through the descriptions of each of a user's repos:

`_.each(data,function(d,i)
{
    console.log(i + " " + d['description']);
});`

* To cycle through the user's repo and determine the owner:

`_.each(data,function(d,i)
{
	console.log(i + " " + d['owner']['login']);
});`

* To cycle through a user's repos and determine if they are forked or not:

`_.each(data,function(d,i)
{
	console.log(i + " " + d['fork']);
});`

* To cycle through a user's repos and determine what languages they're written in:

`_.each(data,function(d,i)
{
	var temp_url = d['languages_url']);
    _.each(temp_url,function(d,i)
    {
        console.log(d);
    }
});`

* To see when a user joined:

`console.log(data['created_at']);`