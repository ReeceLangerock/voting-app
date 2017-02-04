// create a redirect for each poll div
const pollDiv = document.querySelectorAll('[name=pollDiv]');

pollDiv.forEach(div => div.addEventListener(('click'), goToPoll));

function goToPoll(e){
  console.log('click');
  e.preventDefault();
  var pollID = this.id;
  window.location.href = "../poll/"+pollID;
}
