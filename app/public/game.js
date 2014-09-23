// extend base JS array class with super simple min function
Array.min = function( array ){
  return Math.min.apply( Math, array );
};

$(document).ready(function() {
  var movies = JSON.parse($('#id-holder').text());
  movies.shift();
  console.log(movies)
  var p1Score, p2Score, p3Score, currentLeader

  // handle updating scores, showing critics score, showing/hiding buttons
  $('#submit-guesses').on('click', function() { 
    // validate no inputs blank

    var anyInvalid = false;
    var inputs = [$('#p1-guess').val(), $('#p2-guess').val(), $('#p3-guess').val()];
    $.each(inputs, function(index, value) {
      // debugger;
      if (value == "" || isNaN(value)) {
        anyInvalid = true;
        return false;
      }
    })

    if (anyInvalid == true) {
      alert("please enter a numeric guess for each player")
      return false;
    }

    // validate 
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

    p1Score = parseInt($('#p1-score').text());
    p2Score = parseInt($('#p2-score').text());
    p3Score = parseInt($('#p3-score').text());
    var scores = [p1Score,p2Score,p3Score]
    currentLeader = setLeader(scores);
    $('#critics-score').slideDown();
    $('#submit-guesses').hide();
    $('#next-movie').show();
    checkForEnd();
  });

  var checkForEnd = function() {
    if (movies.length == 0) {
      $('#current-movie').append(currentLeader);
      $("#restart-button").show();
      $("#next-movie").hide(); 
    }
  }

  var setLeader = function(scores) {
    var lowScore = Array.min(scores)
    if (p1Score == lowScore) {
      return "<h1>player 1 wins with a score of " + lowScore + "!</h1>"
    }
    else if (p2Score == lowScore) {
      return "<h1>player 2 wins with a score of " + lowScore + "!</h1>"
    }
    else if (p3Score == lowScore) {
      return "<h1>player 3 wins with a score of " + lowScore + "!</h1>"
    }
  } 

  // showing/hiding buttons, loading next movie
  $('body').on('click', '#next-movie', function() {
    $('#movie-info').hide();
    $('#submit-guesses').show();
    $('#critics-score').hide();
    $('#p1-guess').val("");
    $('#p2-guess').val("");
    $('#p3-guess').val("");
    $('#loader').show();
    $.ajax({
      url: "/getNextMovie",
      type: "post",
      data: {"next": movies}
    }).done(function(data){
      var nextMovie = $.parseJSON(data);
      $('#loader').hide();
      $('#movie-info').fadeIn();
      $('.jumbotron h1').html(nextMovie[0].title)
      $('#current-movie img').attr('src', nextMovie[0].image);
      $('#current-movie #actors').html("<i>" + nextMovie[0].actors.join(', ') + "</i>")
      $('#current-movie #year').html(nextMovie[0].year)
      $('#critics-score').attr('data-score', nextMovie[0].rating);
      $('#critics-score').text(nextMovie[0].rating);
      movies.shift();
    });
    $('#next-movie').hide();
  });
});













