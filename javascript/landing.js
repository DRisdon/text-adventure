$(document).ready(function() {

localStorage.setItem('diff', 'normal');

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

$('#easy').click(function() {
  localStorage.setItem('diff', 'easy');
  $('.level').css('opacity', '.6');
  $('#easy').css('opacity', '1');
});

$('#normal').click(function() {
  localStorage.setItem('diff', 'normal');
  $('.level').css('opacity', '.6');
  $('#normal').css('opacity', '1');
});

$('#hard').click(function() {
  localStorage.setItem('diff', 'hard');
  $('.level').css('opacity', '.6');
  $('#hard').css('opacity', '1');
});

});
