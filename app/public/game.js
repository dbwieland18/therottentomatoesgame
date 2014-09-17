$(document).ready(function() {
  var movies = JSON.parse($('#id-holder').text());
  movies.shift();
  console.log(movies)

  // handle updating scores, showing critics score, showing/hiding buttons
  $('#submit-guesses').on('click', function() { 
    var critics = $('#critics-score').attr('data-score');

    var p1Guess = parseInt($('#p1-guess').val());
    var p2Guess = parseInt($('#p2-guess').val());
    var p3Guess = parseInt($('#p3-guess').val());

    var p1Score = parseInt($('#p1-score').val());
    var p2Score = parseInt($('#p2-score').val());
    var p3Score = parseInt($('#p3-score').val());

    $.each([p1Guess, p2Guess, p3Guess], function(index, guess) {
      var num = index + 1
      if (guess > critics) {
        $('#p'+ num + '-score').html(guess-critics)
      }
      else if (guess == critics) {
        $('#p'+ num + '-score').html(parseInt($('#p'+ num + '-score').text()) - 5) 
      }
      else {
        $('#p'+ num + '-score').html(critics-guess)
      }
    });
    $('#p1-guess').val("");
    $('#p2-guess').val("");
    $('#p3-guess').val("");
    $('#critics-score').show();
    $('#submit-guesses').hide();
    $('#next-movie').show();
  });

  $('body').on('click', '#next-movie', function() {
    console.log('moving on...')
  });
});