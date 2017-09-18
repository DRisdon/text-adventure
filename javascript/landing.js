$(document).ready(function() {

function playerName() {
  playerName = $('#name').val();
  localStorage.setItem('name', playerName); // set player name in local storage
}

$('#start').click(playerName);
$('#name').on('keyup', function (e) { // allows player name to be set by hitting enter as well
      if (e.keyCode == 13) {
        playerName();
        window.location.href = "./game.html";
      }
   });
});
