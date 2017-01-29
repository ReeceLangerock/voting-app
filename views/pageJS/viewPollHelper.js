const deleteButton = document.querySelector('[name=deletePollButton]');


deleteButton.addEventListener('click', deletePolls);
//submitButton.addEventListener('click', validateForm);

function deletePolls(e) {
    e.preventDefault();
    var checkboxes = document.querySelectorAll('[type="checkbox"]:checked');
    var checkedBoxesNames =[];
    var checkedBoxesID = [];
    for (var i = 0; i < checkboxes.length; i++) {

        checkedBoxesID.push(checkboxes[i].id);
        checkedBoxesNames.push(checkboxes[i].name);

    }
    var formattedNames = checkedBoxesNames.map(function(name){
      return " " +name;
    })
    var confirmDeletion = confirm("Are you sure you'd like to delete these polls? This is permanent.\n"+
    formattedNames);
    if(confirmDeletion){
    var url = "/view-polls/delete";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(checkedBoxesID)); // array of mongodb _ids
  }
  else{
    null;
  }


}
