console.log('found the file')
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
});