$(document).ready(function() {
  // shows RT search results
  $('#search').on('click', function(e){
    e.preventDefault();
    var query = $('.form-control').val();
    $.ajax({
      url: "/searchMovies",
      type: "post",
      data: {title: query}
    }).done(function(data){
      console.log("searching Rotten Tomatoes")
      var movies = $.parseJSON(data)
      html = ""
      $.each(movies, function(index, value){
        html += "<li><img src=" + value.image + "><h3>" + value.title + "</h3><span>" + value.actors + "</span><h3>" + value.year + "</h3><button class='add btn-default' data-title=" + value.title + " data-movieId=" + value.id + ">add to game</button>"
      });
      // debugger
      $('#possible-matches-list').html(html)
    })
  });

  // adds movie id to upcoming game, UI responds
  var movieCount = 0
  $('#search-results').on('click', 'button.add', function(){
    movieCount ++
    var id = $(this).attr('data-movieid');
    var title = $(this).attr('data-title');
    $('#upcoming-game').attr("data-id-" + movieCount, id)
    $('#upcoming-game').append($(this).siblings('img').clone())
    $(this).siblings().fadeOut();
    $(this).fadeOut();
    $('#start-game').show();
  });

  // grabs movie ids for upcoming game, puts them in form being submitted
  $('#start-game').on('click', function() {
    var element = $('#upcoming-game');
    var gameSet = []
    $(element[0].attributes).each(function(){
      console.log(this.value);
      gameSet.push(this.value)
    });
    $('#mov-ids').val(gameSet);
  });
});
