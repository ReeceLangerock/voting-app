// Select the div for each voting/answer option
const answerDiv = document.querySelectorAll('[name=voteDiv]');

answerDiv.forEach(div => div.addEventListener(('click'), commitVote));


function commitVote(e) {
    var voteIndex = this.id;
    var pollID = document.querySelector('[class=displayPollContainer]').id;
    console.log(pollID)
    postVote(voteIndex, pollID).then(function(response, error) {
      if(response == "recorded"){
        window.location.href = window.location.href;
      }
      else if(response == "denied"){
        alert("You can only vote once per poll. Sorry!");
      }

    });
}

function postVote(voteIndex, pollID) {
    return new Promise(function(resolve, reject) {
        var url = "/poll/vote";
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                return resolve(xhr.responseText);
            }
        }
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify({
            id: pollID,
            index: voteIndex
        }));
    })
}
