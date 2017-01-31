// Select the div for each voting/answer option
const answerDiv = document.querySelectorAll('[name=voteDiv]');

answerDiv.forEach(div => div.addEventListener(('click'), commitVote));


function commitVote(e) {
    var voteIndex = this.id;
    var pollID = document.querySelector('[class=displayPollContainer]').id;
    console.log(pollID)
    var url = "/poll/vote";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.send(JSON.stringify({
        id: pollID,
        index: voteIndex
    }));
    var json_data = xhr.responseText;

}

function validateVote() {

}
