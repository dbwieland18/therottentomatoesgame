$(document).ready(function() {
  $('button.add').on('click', function(){
    var id = $(this).attr('data-movieid');
    var title = $(this).attr('data-title');
    $.ajax({
      url: "/addToGame",
      type: "post",
      data: {movieId: id, movieTitle: title}
    }).done(function(){
      console.log("request made?");
      // updateUpcomingGame(); //this function should update the relevant div with data from the session
      // maybe make a partial for this section?
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
      // debugger
      $('#ajax-results').html("<div>" + data + "</div>")
    })
  });
});