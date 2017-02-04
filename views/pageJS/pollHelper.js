const submitButton = document.querySelector('[name=submitPoll]');
const addButton = document.querySelector('[name=add]');
const questionList = document.querySelector('.answers')

addButton.addEventListener('click', addAnswer);

// add label/input to page when users clicks add button
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

// temporarily store poll answers choices into local storage
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

// add the stored answers back onto the page in the appropriate input box
function populateAnswers() {
    var index = 0;
    var inputCurrentlyOnPage = document.querySelectorAll('[id=answerInput]');
    var answers = JSON.parse(localStorage.getItem('answers'));
    console.log(answers.length);
    for (var i = 0; i < answers.length; i++){
    inputCurrentlyOnPage[i].value = answers[i].text;
}

}
