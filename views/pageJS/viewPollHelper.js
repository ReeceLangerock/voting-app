const deleteButton = document.querySelector('[name=deletePollButton]');


deleteButton.addEventListener('click', deletePolls);
//submitButton.addEventListener('click', validateForm);

function deletePolls(e) {
    e.preventDefault();
    var checkboxes = document.querySelectorAll('[type="checkbox"]:checked');
    var checkedBoxes = [];
    for (var i = 0; i < checkboxes.length; i++) {

        checkedBoxes.push(checkboxes[i].name);

    }
    console.log(checkedBoxes);
    var url = "/view-polls/delete";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(JSON.stringify(checkedBoxes)); // array of mongodb _ids


}
