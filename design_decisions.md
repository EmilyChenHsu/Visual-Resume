# Design Decision Document

## Stack Overflow

## GitHub

* Commits: Use `committer` instead of `author`, because it shows that a user has the "power" to commit

* Radial chart: Aggregate our user's commits, comments, and issues within each repository and order from most to least. This highlights those repositories that our user is most involved with. Alternatives would be to aggregate total commits, comments, and issues within a repository (regardless of who the contributor is) and order from most to least or to order by most starred/forked/etc. Those alternatives would show repository popularity regardless of whether or not our user has had a lot of involvement with it.