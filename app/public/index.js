$(document).ready(function() {
  $('#search-results').on('click', 'button.add', function(){
    var id = $(this).attr('data-movieid');
    var title = $(this).attr('data-title');
    $.ajax({
      url: "/addToGame",
      type: "post",
      data: {movieId: id, movieTitle: title}
    }).done(function(data){
      console.log("request made?");
      // updateUpcomingGame(); //this function should update the relevant div with data from the session
      // maybe make a partial for this section?
      // debugger
      $('#upcoming-game').append(data)
    });
    // $(this).fadeOut();
  });



  $('#search').on('click', function(e){
    e.preventDefault();
    var query = $(this).siblings().val();
    $.ajax({
      url: "/searchMovies",
      type: "post",
      data: {title: query}
    }).done(function(data){
      console.log("searching Rotten Tomatoes")
      var movies = $.parseJSON(data)
      html = ""
      $.each(movies, function(index, value){
        html += "<li><img src=" + value.image + "><h3>" + value.title + "</h3>" + value.actors + "<h3>" + value.year + "</h3><button class='add' data-title=" + value.title + " data-movieId=" + value.id + ">add to game</button>"
      });
      // debugger
      $('#possible-matches-list').html(html)
    })
  });
});