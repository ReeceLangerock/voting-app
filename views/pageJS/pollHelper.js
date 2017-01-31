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



///TESTIGNGGGGGGGGG

/*function addAnswer(e) {
    e.preventDefault();
    var count = document.querySelectorAll('[id=at]');
    count.forEach(answer => answers.push(answer.value));
    populateAnswers(answers, answerList);
    localStorage.setItem('answers', JSON.stringify(answers));
    answerList.innerHTML = answerList.innerHTML +
    `<li>
      <label name="answer">Answer:</label>
      <input type="text" name="answers[]" required>
      </li>
      `;
}

function populateAnswers(answers = [], answerList) {
    answerList.innerHTML = answers.map((answer, i) => {

        return `
  <li>
    <label name="answer">Answer:</label>
    <input type="text" name="answers[]" required>
    </li>
    `;
    }).join('');
}*/
