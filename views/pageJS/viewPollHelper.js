const deleteButton = document.querySelector('[name=deletePollButton]');
const goToButtons = document.querySelectorAll('[name=goToPoll]');

deleteButton.addEventListener('click', deletePolls);
goToButtons.forEach(goButton => goButton.addEventListener(('click'), goToPoll));

// redirect to poll when goToPoll button is selected
function goToPoll(e){
  e.preventDefault();
  var pollID = this.id;
  window.location.href = "../poll/"+pollID;
}

function deletePolls(e) {
    e.preventDefault();
    // query all checkboxes and save which are checked
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
    //open XMLHttpRequest to post the array of pollIDs to delete
    if(confirmDeletion){
    var url = "/view-polls/delete";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(checkedBoxesID)); // array of mongodb _ids
    window.location.href = window.location.href;

  }
  else{
    null;
  }
}
