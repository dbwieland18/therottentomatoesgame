// extend base JS array class with super simple min function
Array.min = function( array ){
  return Math.min.apply( Math, array );
};

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

    $.each([p1Guess, p2Guess, p3Guess], function(index, guess) {
      var num = index + 1
      var current_score = parseInt($('#p'+ num + '-score').text())
      if (guess > critics) {
        $('#p'+ num + '-score').html(current_score + (guess-critics))
      }
      else if (guess == critics) {
        $('#p'+ num + '-score').html(current_score - 5) 
      }
      else {
        $('#p'+ num + '-score').html(current_score + (critics-guess))
      }
    });

    var p1Score = parseInt($('#p1-score').text());
    var p2Score = parseInt($('#p2-score').text());
    var p3Score = parseInt($('#p3-score').text());
    var scores = [p1Score,p2Score,p3Score]
    var currentLeader = setLeader(scores);
    debugger;

    $('#critics-score').show();
    $('#submit-guesses').hide();
    $('#next-movie').show();
  });

  var setLeader = function(scores) {
    return Array.min(scores)
  } 

  // showing/hiding buttons, loading next movie
  $('body').on('click', '#next-movie', function() {
    // console.log('moving on...')
    if (movies.length == 0) {
      $('#current-movie').append("<h1>We have a winner!</h1>")
    }
    else {
      $('#submit-guesses').show();
      $('#critics-score').hide();
      $('#p1-guess').val("");
      $('#p2-guess').val("");
      $('#p3-guess').val("");
      $.ajax({
        url: "/getNextMovie",
        type: "post",
        data: {"next": movies}
      }).done(function(data){
        var nextMovie = $.parseJSON(data)
        $('#current-movie img').attr('src', nextMovie[0].image)
        $('#critics-score').attr('data-score', nextMovie[0].rating)
        $('#critics-score').text(nextMovie[0].rating)
        movies.shift();
      });
    }
    $('#next-movie').hide();
  });
});













