require 'sinatra' 
require 'rubygems'
require 'rottentomatoes'
require 'pry'
include RottenTomatoes
enable :sessions

#API key setup
Rotten.api_key = "pddzts5bbcxpagtke4q5b6cn"

get '/' do
  # binding.pry
  @upcoming_game = session
  erb :index
end

post '/searchMovies' do
  @movies = RottenMovie.find(:title => params[:title], :limit => 3)
  @upcoming_game = session
  erb :index
end

post '/addToGame' do
  # binding.pry
  session[params[:movieTitle]] = params[:movieId]
end

# title       => @movie.title
# year        => @movie.year
# main actors => @movie.abridged_cast.each {|actor| puts actor.name }
# rating      => @movie.ratings.critics_score
# image       => @movie.posters.thumbnail (gives back a string url to the image)
# synopsis (if there is one, which there is NOT always) => @movie.synopsis