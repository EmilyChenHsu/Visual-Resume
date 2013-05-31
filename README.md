# GitHub & Stack Overflow Resume - API README

# Using the Tool
________________

In order to take full advantage of all of Visual Resume's features, read through this list to familiarize yourself with the tool:

## GitHub

* Select a user to view.
* The initial tile that pops up give a general overview of the user's contributions in GitHub.
* At the top-left of the tile, the user's **login** is displayed. If you click on it, it will open up a new tab with their official GitHub profile page. If you hover over it, the user's **full name** (if available) will be displayed.
* Just beneath the user's name, their **tenure** is displayed. This allows you to see how long ago they joined the GitHub community.
* Below the tenure is the user's **avatar or profile picture**.
* Below the avatar is the **number of followers** the user has.
* To the right, we see a radial chart. The default chart gives a **breakdown of the repositories** that the user is most involved in based on the number of their commits, comments and issues in the repository. If you hover over a slice of the chart, you will be shown the repository name, the main programming language used in the repository, and the number of watchers the repository has. If you click on a slice (unless it is the slice for the "other" repositories), it will open up a new tile with information about the user's contributions within that specific repository. If you hover over the slice for the "other" repositories, you can enter the tooltip with your mouse pointer and click the name of a repository that you would like to view; this will also open it in a new tile. You may have also noticed that the names of some of the repositories are cut off in the legend below the radial chart--simply hover over these names to see the full name. Below the chart title, you should notice that you can select **by language** instead of **by repository**. If you select **by language**, you will see a differenct radial chart that breaks down the languages most used (based on an aggregation of commits, comments, and issues) by the user. If you click on one of the slices (or a language in the "other" tooltip), a basic tile will open that lists all of the user's repositories that use the language selected as its primary language.
* As you look down into the lower half of the tile, you see a chart labeled **"Contributions by Month."** This chart simply shows you the user's contributions broken down month-by-month. Select the date range you would like to view in the chart by dragging your mouse pointer across the chart at the bottom of the tile. The chart comes in two flavors: grouped and stacked. The default is stacked, which shows the user's commits, comments, and issues aggregated and stacked upon each other; but you can choose your flavor by clicking either "grouped" or "stacked" just below the chart's title. The grouped chart shows the user's commits, comments, and issues aggregated and displayed side-by-side. The legend below the chart shows the total number of commits, comments, and issues in the current selected date range. Each bar in the chart may be hovered over to show the number of acommits, comments, and issues (depending on which bar it is) there were for the month.
* At the top-right, there is an x inside of a circle. Click that icon if you wish to **close the tile**.  

* In the repository-specific tiles (those that pop up when you click on a slice of the **by repository** radial chart in the user's general overview tile), the information is very much similar to that displayed in its parent tile. The differences are outlined below:

    1. The **tenure** is not displayed.
    1. The **avatar** and community **logo** are shrunk and moved in order to setup a "breadcrumb" trail that lets the person using the tool see exactly where the tile fits into the scheme of things. The **login** is still clickable, and the complete **name (owner/name) of the highlighted repository** is displayed. It may get cut off if the name is too long, so you can always hover over it to see the full name. If you click on the name, a new tab will open that shows the user's commit activity in that repository on GitHub's site.
    1. The "Repositories" radial chart is replaced with a **"Related Repositories" radial chart**. The only difference is that the repositories displayed are those that share at least one contributor or collaborator (besides the user we're interested in) with the repository highlighted by the tile. For example, if you are looking at Joe Bob's involvement in Rails, the chart will show other repositories that both Joe Bob and at least one of his friends in Rails contribute to. For many users, no chart will be available, because not everyone is involved on multiple projects that share contributors or collaborators. There is no **by language** chart available here (it probably wouldn't make much sense).
    3. Below the name of the repository, the **repository's main language** is listed. If you click on it, a new tab will open with the user's commit activity in that repository on GitHub.
    4. Below the main language, the **"forked" status of the project** is displayed (`true` if the repository is forked, `false` if the repository was created by the `owner`, which may not be the user we're focusing on--check the `owner` two lines above to be sure).
    3. Below the forked status, the **number of the user's commits in the repository** is listed.
    3. Below the number of commits, the **number of the user's comments in the repository** is listed.
    3. Below the number of comments, the **number of the user's issues in the repository** is listed.
    5. As may be expected, the graphs in the lower half of the tile only show user's contributions within the highlighted repository.
    
* In the language-specific tiles (those that pop up when you click on a slice of the **by language** radial chart in the user's general overview tile), a list of the user's repositories in the language in focus is displayed. You can click on each of them to bring up their own repository-specific tiles.

## Stack Overflow

* Select a user to view.
* The initial tile that pops up give a general overview of the user's contributions in Stack Overflow.
* At the top-left of the tile, the **user's name** is displayed. If you click on it, it will take you to their official Stack Overflow profile page.
* Just beneath the user's name, their **tenure** is displayed. This allows you to see how long ago they joined the Stack Overflow community.
* Below the tenure is the user's **avatar or profile picture**.
* Below the avatar is the **user's reputation** in Stack Overflow (this is calculated based on things like how many questions, answers, or comments they have had upvoted).
* To the right, we see a radial chart. This gives a **breakdown of the various tags** (programming languages, concepts, etc.) that the user is most involved in based on the number of their questions, comments and answers in the tag. If you hover over a slice of the chart, you will be shown the tag name and the percentage of the user's contributions that have been related to that tag. If you click on a slice (unless it is the slice for the "other" tags), it will open up a new tile with information about the user's contributions within that specific tag. If you hover over the slice for the "other" tags, you can enter the tooltip with your mouse pointer and click the name of a tag that you would like to view; this will also open it in a new tile. You may have also noticed that the names of some of the tags are cut off in the legend below the radial chart--simply hover over these names to see the full name.
* As you look down into the lower half of the tile, you see a chart labeled **"Contributions by Month."** This chart simply shows you the user's contributions broken down month-by-month. Select the date range you would like to view in the chart by dragging your mouse pointer across the chart at the bottom of the tile. The chart comes in two flavors: grouped and stacked. The default is stacked, which shows the user's answers, comments, and questions aggregated and stacked upon each other; but you can choose your flavor by clicking either "grouped" or "stacked" just below the chart's title. The grouped chart shows the user's answers, comments, and questions aggregated and displayed side-by-side. The legend below the chart shows the total number of answers, comments, and questions in the current selected date range. Each bar in the chart may be hovered over to show the number of answers, comments, or questions (depending on which bar it is) there were for the month.
* At the top-right, there is an x inside of a circle. Click that icon if you wish to **close the tile.**

* In the tag-specific tiles (those that pop up when you click on a slice of the radial chart in the user's general overview tile), the information is very much similar to that displayed in its parent tile. The differences are outlined below:

    1. The **avatar** and community **logo** are shrunk and moved in order to setup a "breadcrumb" trail that lets the person using the tool see exactly where the tile fits into the scheme of things. The **display name** is still clickable, and the complete **name of the highlighted tag** is displayed. It may get cut off if the name is too long, so you can always hover over it to see the full name. If you click on it, a new tab will open with the user's activity in that tag on Stack Overflow.
    1. The "Contributions by Tag" radial chart is replaced with a **"Related Tags" radial chart**. The only difference is that the tags displayed are those that are commonly tagged along with the highlighted tag. For example, JavaScript may often be tagged with jQuery, since jQuery is a JavaScript library.
    3. Below the tag name, the **number of the user's answers in the tag** is listed.
    3. Below the number of answers, the **number of the user's comments in the tag** is listed.
    3. Below the number of comments, the **number of the user's questions in the tag** is listed.
    3. As may be expected, the graphs in the lower half of the tile only show user's contributions within the highlighted tag.

## General

* Main graphs are always displayed on the same, **global scale**.
* **Closing and opening new tiles** will likely change the global scale. For example, if you remove the tile with the most contributions in a month, the global max will be reduced to the next highest; but if you add a new tile with more contributions in a month than any already displayed, the global max will be increased.
* The short graphs for date-range selection are all scaled to their own data.
* Tiles can be **reordered** by swapping the position of two horizontally or vertically adjacent tiles. To do this, simply click the arrows located between the two tiles you wish to swap.
* You are limited to opening only about 30 tiles at once. That's a bit excessive, so you probably don't have to worry about hitting your quota and blowing up the system.
* It's probably obvious, but our tool allows you to **compare** one user's contributions in various tags, repositories, or communities **and** multiple users' contributions with each other as well.

# Key Interactions
________________

## GitHub

* Select a user (by clicking his or her name on the left side of the screen).
* Hover over the user's **login** name at the top of the tile.
* Click on the user's **login** name at the top of the tile.
* Click on the **by language** link below the title for the radial chart.
* Hover over the slices of the chart.
* Click on a slice of the chart besides 'other.'
* Click the name of a repository in the list that appears in the new tile (if there are none, select a different language).
* Click on the **by repository** link below the title for the radial chart.
* Click the 'x' inside of a circle at the top right of a tile to **close the tile**.  

## Stack Overflow

## General
________________
## Sample JSON File (GitHub):

    {
        "name":"First Last",
        "login":"username",
        "id":###,
        "avatar":"https://secure.gravatar.com/avatar/xxx.png",
        "creationDate":"2008-02-03",
        "issueCount":100,
        "commitCount":100,
        "commentCount":100,
        "activity":
        {
            "2012-03":{"commitCount":7,"commentCount":22,"issueCount":1},
            "2012-04":{"commitCount":2,"commentCount":80,"issueCount":3},
        },
        "languages":
        {
            "JavaScript":100,
            "CoffeeScript":50,
        },
        "repos":
        {
            "user/repo":
            {
                "relationship":"[owner/collaborator/contributor]"
                "activity":
                {
                    "2012-03":{"commitCount":7,"commentCount":22,"issueCount":1},
                }
            }
        }
    }
    
## Sample JSON File (Stack Overflow):

    {
        "displayName":"name",
        "id":"######",
        "avatar":"[gravatar hash]",
        "creationDate":"2011-01-24 23:13:35",
        "reputation":"111",
        "questionCount":0,
        "answerCount":4,
        "commentCount":0,
        "activity":
        {
            "2011-01":{"answerCount":2,"questionCount":2,"commentCount":2},
            "2011-03":{"answerCount":1,"questionCount":2,"commentCount":2}
        },
        "tags":
        {
            "ruby-on-rails":
            {
                "activity":
                {
                    "2011-01":{"answerCount":2}
                },
                "answerCount":2,
                "questionCount":2,
                "commentCount":2,
                "relatedTags":
                {
                    "ssl":1,
                    "https":1
                }
            }
        }    
    }
________________
________________
# Design Decisions
________________

The Visual Resume tool is aimed at exposing user contributions in various online coding communities (currently, Stack Overflow and GitHub) and displaying these contributions with graphs and other visualizations.  No other tool that we have come across shows as much detailed information as the Visual Resume tool, and no other tool shows contributions in both coding question and answer sites and code hosting sites.  Additionally, the Visual Resume tool allows viewers to perform side-by-side comparisons of multiple users or the same user in multiple contexts (e.g. comparing Joe in Stack Overflow with Joe in GitHub **or** Joe's contributions in Rails on GitHub with Joe's contributions in CakePHP on GitHub).  Information gathered for the tool is displayed in "tiles," which are vertical boxes that can be opened, closed, and (hopefully) rearranged.

For GitHub, viewers are able to see a breakdown of a user's number of commits, comments, and issues--both in general and within a specific repository.  This activity is displayed in both a stacked bar chart and a grouped bar chart in order to expose possible patterns or trajectories (e.g. one could see if a user was increasing his number of commits per month with a quick glance at the grouped bar chart).  Viewers also see a breakdown of repository that a user contributes to.  This allows the viewer to click on one for a "drill-down" to see activity unique to that specific repository.  In this drilled-down state, the viewer can see "related" repositories (those that share at least two contributors with the repository in question--one of which is the user in view) in addition to the monthly activity.

For Stack Overflow, viewers see the number of a user's questions, comments, and answers--both in general and within a specific tag.  Like GitHub, this activity is displayed in bar charts that facilitate discovery of possible patterns or trajectories.  Instead of a repository breakdown (as in GitHub), viewers see a tag breakdown that shows which tags (coding languages, concepts, etc.) a user most contributes to.  The drill down here shows a user's contributions unique to a certain tag, and a chart is displayed that shows "related" tags (those tags that are most often tagged along with the tag in question for questions our user in view is connected to).  Monthly activity (questions, comments, answers) is shown in this tile as well.

## Stack Overflow
________________

* **Grouped chart**: Allows viewers to see each contribution type (`comment`, `question`, `answer`) compared side by side, since stacked only gives a good sense of the aggregate.

* **Stacked chart**: Shows a user's aggregate contribution for a month, which gives a good idea of overall monthly activity.

## GitHub
________________

* **Commits**: Use `author` instead of `committer`, because the author is the one who actually wrote the code for the commit (-Use `committer` instead of `author`, because it shows that a user has the "power" to commit-)

* **Radial chart (general)**: Aggregate our user's `commits`, `comments`, and `issues` within each repository and order from most to least. This highlights those repositories that our user is most involved with. Alternatives would be to aggregate total `commits`, `comments`, and `issues` within a repository (regardless of who the contributor is) and order from most to least or to order by most `starred`/`forked`/etc. Those alternatives would show repository popularity regardless of whether or not our user has had a lot of involvement with it.

* **Radial chart (repository)**: Show "related" repositories by listing repositories that share at least two collaborators (one of which is our user in focus) with the repository in focus.

* **Grouped chart**: Allows viewers to see each contribution type (`comment`, `commit`, `issue`) compared side by side, since stacked only gives a good sense of the aggregate.

* **Stacked chart**: Shows a user's aggregate contribution for a month, which gives a good idea of overall monthly activity.

## Both
________________

* **Tenure**: Shows how long a user has been around in order to give context for the amount of contributions or the reputation level or something similar. This will give someone insight as to why there is no activity for early months, for example.

* **Avatar**: Perhaps a user's picture tells us something about them. Does it show something they're really into? Or maybe they're really weird..

## Notes
________________

* **GH Commit Data**: It makes a huge difference whether we go with the route `it.out("AUTHOR").out("EMAIL").out("GRAVATAR_HASH").in("GRAVATAR").login.next() == user.login` vs `it.out("AUTHOR").out("EMAIL").in("EMAIL").login.next() == user.login`.

## Branch (version) History
________________

* **v0.9**: Version used for the demo at the Spring 2013 NSF SCALE Conference in Pittsburg, PA.

* **v1.0**: Version used for the first few pilot studies (mid May, 2013).

* **v1.1**: Current version.