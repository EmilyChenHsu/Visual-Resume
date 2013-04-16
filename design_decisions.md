# Design Decision Document
________________

## Stack Overflow
________________

* Grouped chart: Allows viewers to see each contribution type (`comment`, `question`, `answer`) compared side by side, since stacked only gives a good sense of the aggregate.

* Stacked chart: Shows a user's aggregate contribution for a month, which gives a good idea of overall monthly activity.

## GitHub
________________

* Commits: Use `committer` instead of `author`, because it shows that a user has the "power" to commit

* Radial chart: Aggregate our user's `commits`, `comments`, and `issues` within each repository and order from most to least. This highlights those repositories that our user is most involved with. Alternatives would be to aggregate total `commits`, `comments`, and `issues` within a repository (regardless of who the contributor is) and order from most to least or to order by most `starred`/`forked`/etc. Those alternatives would show repository popularity regardless of whether or not our user has had a lot of involvement with it.

* Grouped chart: Allows viewers to see each contribution type (`comment`, `commit`, `issue`) compared side by side, since stacked only gives a good sense of the aggregate.

* Stacked chart: Shows a user's aggregate contribution for a month, which gives a good idea of overall monthly activity.

## Both
________________

* Tenure: Shows how long a user has been around in order to give context for the amount of contributions or the reputation level or something similar. This will give someone insight as to why there is no activity for early months, for example.

* Avatar: Perhaps a user's picture tells us something about them. Does it show something they're really into? Or maybe they're really weird..