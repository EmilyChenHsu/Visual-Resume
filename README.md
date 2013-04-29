# GitHub & Stack Overflow Resume - API README
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