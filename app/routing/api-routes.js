var friends = require("../data/friends.js")

module.exports = function (app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends)
    })

    app.post("/api/friends", function(req, res) {
        
        var bestMatch = {
            name:"",
            photo: "",
            friendDifference: 1000
        }

        console.log(req.body)

        //Here we take the result of the user's surveyr POST and parse it
        var userData = req.body
        var userScores = userData.userScores
        console.log(userScores)//This is the issue, doesnt kow what this is. lets figure it out

        //this variable will calculate the difference between the users scores and the scores of each user in the database
        var totalDifference = 0

        //Here we loop through all the friend possibilities in the databse
        for (var i = 0; i < friends.length; i++) {

            console.log(friends[i])
            totalDifference = 0

            //We then loop through all the scores of each friend
            for (var j = 0; j< friends[i].scores[j]; j++) {

                //we caluclate the difference between the scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]))

                //if the sum of differences is less then the differences of the current "best match"
                if (totalDifference <= bestMatch.friendDifference) {

                    //reset the bestMatch to be the new friend.
                    bestMatch.name = friends[i].name
                    bestMatch.photo = friends[i].photo
                    bestMatch.friendDifference = totalDifference
                }
            }
        }
        //finally save the users data to the database(this has to happen AFTER the check. otherwise,
        //the database will always return that the user is the users best friend)
        friends.push(userData)

        res.json(bestMatch)
    })

}