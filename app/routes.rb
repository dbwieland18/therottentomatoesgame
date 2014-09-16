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
  @upcoming_game = session
  erb :index
end

post '/searchMovies' do
  @upcoming_game = session
  filtered_results = []
  movies = RottenMovie.find(:title => params["title"], :limit => 3) # array of 3 patched open structs
  
  if movies.is_a?(Array)
    movies.each do |movie|
      result = {}

      result["title"]  = movie.title
      result["year"]   = movie.year
      result["actors"] = movie.abridged_cast.map {|actor| actor.name}
      result["rating"] = movie.ratings.critics_score
      result["image"]  = movie.posters.thumbnail
      result["id"]     = movie.id

      filtered_results << result
    end
  else
    result = {}

    result["title"]  = movies.title
    result["year"]   = movies.year
    result["actors"] = movies.abridged_cast.map {|actor| actor.name}
    result["rating"] = movies.ratings.critics_score
    result["image"]  = movies.posters.thumbnail
    result["id"]     = movies.id

    filtered_results << result
  end

  JSON.generate(filtered_results)
end

post '/addToGame' do
  # binding.pry
  session[params[:movieTitle]] = params[:movieId]
  # session.to_a
end

post '/start' do
  # binding.pry
  # render new view
end


















