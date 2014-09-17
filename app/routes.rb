require 'sinatra' 
require 'rubygems'
require 'rottentomatoes'
require 'pry'
require 'json'
include RottenTomatoes
enable :sessions

#API key setup
Rotten.api_key = "pddzts5bbcxpagtke4q5b6cn"

get '/' do
  session.clear
  erb :index
end

post '/searchMovies' do
  filtered_results = []
  movies = RottenMovie.find(:title => params["title"], :limit => 3) # array of 3 patched open structs
  
  if movies.is_a?(Array)
    movies.each do |movie|
      filtered_results << rt_movie_to_json(movie)
    end
  else
    filtered_results << rt_movie_to_json(movies)
  end

  JSON.generate(filtered_results)
end

post '/addToGame' do
  session[params[:movieTitle]] = params[:movieId]
  binding.pry
end

post '/start' do
  @ids = params["movies"].split(",")[1..-1].map {|id| id.to_i } # turn string into array, ignore first element, turn into integers
  @first_movie = RottenMovie.find(:id => @ids.first)
  erb :play_game
end

post 'getNextMovie' do
  
end

# ---------- helper methods ---------- #

def rt_movie_to_json(movie)
  result = {}
  result["title"]  = movie.title
  result["year"]   = movie.year
  result["actors"] = movie.abridged_cast.map {|actor| actor.name}
  result["rating"] = movie.ratings.critics_score
  result["image"]  = movie.posters.thumbnail
  result["id"]     = movie.id
  result
end


















