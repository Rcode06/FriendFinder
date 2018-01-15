// LOAD DATA
// ===============================================================================

// var surveyData = require("../data/friends.js");
// // var waitListData = require("../data/waitinglistData");

// module.exports = function (app) {



// app.get("/api/friends", function(req, res) {
//   res.json(surveyData);

// })


// app.post("/api/friends", function(req, res){
//    var newFriend = req.body;
//    console.log(newFriend);
//     for(var i = 0; i < newFriend.scores.length; i++) {
//       if(newFriend.scores[i] == "1 (Strongly Disagree)") {
//         newFriend.scores[i] = 1;
//       } 
//       else if(newFriend.scores[i] == "5 (Strongly Agree)") {
//         newFriend.scores[i] = 5;
//       } 
//       else {
//         newFriend.scores[i] = parseInt(newFriend.scores[i]);
//       }
//     }


// var scoreArrays = [];

//     for(var i = 0; i < surveyData.length; i++) {

//       var matchingFriend = surveyData[i];
//       var totalDifference = 0;
      
//       for(var l = 0; l < matchingFriend.scores.length; l++) {
//         var differences = Math.abs(matchingFriend.scores[l] - newFriend.scores[l]);
//         totalDifference += differences;
//       }

//       scoreArrays[i] = totalDifference;
//     }


// var bestFriendscore = scoreArrays[0];
// var bestFriendIndex = 0;

//     for(var i = 1; i < scoreArrays.length; i++) {
//       if(scoreArrays[i] < bestFriendscore) {
//         bestFriendscore = scoreArrays[i];
//         bestFriendIndex = i;
//       }
//     }

//     surveyData.push(newFriend);

//     res.json(surveyData[bestFriendIndex]);
//   })
// }

var friends = require("../data/friends.js");
module.exports = function(app){

 app.get("/api/friends", function(req, res) {
  res.json(friends);
});

  app.post("/api/friends", function(req, res){


     var bestMatch = {
      name:"",
      photo:"",
      friendDifference:1000
     };

     console.log(req.body) ;

     var userData = req.body;
     var userScores = userData.scores;

     console.log(userScores);

     var totalDifference = 0;

     for (var i = 0; i < friends.log; i++){

      console.log(friends[i]);

      var totalDifference = 0;

      for(var l = 0; l < friends[i].score[j]; j++){

      totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

      if(totalDifference <= bestMatch.friendDifference){

          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    } 

    friends.push(userData);

    res.json(bestMatch);

  });
}


