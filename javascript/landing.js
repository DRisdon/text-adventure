$(document).ready(function() {

function playerName() {
  playerName = $('#name').val();
  localStorage.setItem('name', playerName);
}

$('#start').click(playerName);

});
