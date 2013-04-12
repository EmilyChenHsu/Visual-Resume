# GitHub & Stack Overflow Resume - API README

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