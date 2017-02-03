const submitButton = document.querySelector('[name=submitPoll]');
const addButton = document.querySelector('[name=add]');
const questionList = document.querySelector('.answers')

addButton.addEventListener('click', addAnswer);
//submitButton.addEventListener('click', validateForm);

function addAnswer(e) {
    e.preventDefault();
    var count = document.querySelectorAll('[name=answer]').length;
    if (count < 20) {
        storeAnswers();

        questionList.innerHTML = questionList.innerHTML + `
    <li>
      <label name="answer">Answer ${++count}:</label>
      <input id = "answerInput" type="text" name="answers[]" required>
      </li>
      `;

    } else {
        alert("Poll can only have twenty possible answers!")
    }
    populateAnswers();


}

function storeAnswers() {
    var answersCurrentlyOnPage = document.querySelectorAll('[id=answerInput]');
    var answersToStore = [];
    answersCurrentlyOnPage.forEach(answer => {
        const item = {
            text: answer.value
        }
        answersToStore.push(item);

    })
    localStorage.clear();
    localStorage.setItem('answers', JSON.stringify(answersToStore));

}

function populateAnswers() {
    var index = 0;
    var inputCurrentlyOnPage = document.querySelectorAll('[id=answerInput]');
    var answers = JSON.parse(localStorage.getItem('answers'));
    console.log(answers.length);
    for (var i = 0; i < answers.length; i++){
    inputCurrentlyOnPage[i].value = answers[i].text;
}

}
