// LOAD DATA
// ===============================================================================

var surveyData = require("../data/friends.js");
// var waitListData = require("../data/waitinglistData");

module.exports = function (app) {

app.get("/api/friends", function(req, res) {
  res.json(surveyData);

})
app.post("/api/friends", function(req, res){
   var newFriend = req.body;

    for(var i = 0; i < newFriend.scores.length; i++) {
      if(newFriend.scores[i] == "1 (Strongly Disagree)") {
        newFriend.scores[i] = 1;
      } 
      else if(newFriend.scores[i] == "5 (Strongly Agree)") {
        newFriend.scores[i] = 5;
      } 
      else {
        newFriend.scores[i] = parseInt(newFriend.scores[i]);
      }
    }


var scoreArrays = [];

    for(var i = 0; i < surveyData.length; i++) {

      var matchingFriend = surveyData[i];
      var totalDifference = 0;
      
      for(var l = 0; l < matchingFriend.scores.length; l++) {
        var differences = Math.abs(matchingFriend.scores[l] - newFriend.scores[l]);
        totalDifference += differences;
      }

      scoreArrays[i] = totalDifference;
    }


var bestFriendscore = scoreArrays[0];
var bestFriendIndex = 0;

    for(var i = 1; i < scoreArrays.length; i++) {
      if(scoreArrays[i] < bestFriendscore) {
        bestFriendscore = scoreArrays[i];
        bestFriendIndex = i;
      }
    }

    surveyData.push(newFriend);

    res.json(surveyData[bestFriendIndex]);
  })
}

