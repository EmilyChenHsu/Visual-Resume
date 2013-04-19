# Design Decision Document
________________

The Visual Resume tool is aimed at exposing user contributions in various online coding communities (currently, Stack Overflow and GitHub) and displaying these contributions with graphs and other visualizations.  No other tool that we have come across shows as much detailed information as the Visual Resume tool, and no other tool shows contributions in both coding question and answer sites and code hosting sites.  Additionally, the Visual Resume tool allows viewers to perform side-by-side comparisons of multiple users or the same user in multiple contexts (e.g. comparing Joe in Stack Overflow with Joe in GitHub *or* Joe's contributions in Rails on GitHub with Joe's contributions in CakePHP on GitHub).

For GitHub 

## Stack Overflow
________________

* **Grouped chart**: Allows viewers to see each contribution type (`comment`, `question`, `answer`) compared side by side, since stacked only gives a good sense of the aggregate.

* *Stacked chart*: Shows a user's aggregate contribution for a month, which gives a good idea of overall monthly activity.

## GitHub
________________

* *Commits*: Use `author` instead of `committer`, because the author is the one who actually wrote the code for the commit (-Use `committer` instead of `author`, because it shows that a user has the "power" to commit-)

* *Radial chart (general)*: Aggregate our user's `commits`, `comments`, and `issues` within each repository and order from most to least. This highlights those repositories that our user is most involved with. Alternatives would be to aggregate total `commits`, `comments`, and `issues` within a repository (regardless of who the contributor is) and order from most to least or to order by most `starred`/`forked`/etc. Those alternatives would show repository popularity regardless of whether or not our user has had a lot of involvement with it.

* *Radial chart (repository)*: Show "related" repositories by listing repositories that share at least two collaborators (one of which is our user in focus) with the repository in focus.

* *Grouped chart*: Allows viewers to see each contribution type (`comment`, `commit`, `issue`) compared side by side, since stacked only gives a good sense of the aggregate.

* *Stacked chart*: Shows a user's aggregate contribution for a month, which gives a good idea of overall monthly activity.

## Both
________________

* *Tenure*: Shows how long a user has been around in order to give context for the amount of contributions or the reputation level or something similar. This will give someone insight as to why there is no activity for early months, for example.

* *Avatar*: Perhaps a user's picture tells us something about them. Does it show something they're really into? Or maybe they're really weird..