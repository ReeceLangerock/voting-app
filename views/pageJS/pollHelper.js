const submitButton = document.querySelector('[name=submitPoll]');
const addButton = document.querySelector('[name=add]');
const questionList = document.querySelector('.answers')

addButton.addEventListener('click', addAnswer);
//submitButton.addEventListener('click', validateForm);

function addAnswer(e) {
    e.preventDefault();
    var count = document.querySelectorAll('[name=answer]').length;

    questionList.innerHTML = questionList.innerHTML + `
    <li>
      <label name="answer">Answer ${++count}:</label>
      <input type="text" name="answers[]" required>
      </li>
      `;

}

/*function validateForm(e){
  e.preventDefault();
  var pollQuestion = document.querySelector('[name=question]').value;
  var pollQuery = document.querySelectorAll('[name=answerText]');
  var pollAnswers =[];
  for(var i =0; i < pollQuery.length; i++){
    pollAnswers.push(pollQuery[i].value);
  }
  var good = pollAnswers.every(function(text){
    return text != "";
  })
  console.log(good);
  return good;
  if(good){
    console.log(document.forms["poll-form"]);
    var pollToSave = document.querySelector('.poll-form');
    pollToSave.submit();
  }

}*/
