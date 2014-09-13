require 'sinatra' 
require 'rubygems'
require 'rottentomatoes'
require 'pry'
include RottenTomatoes

#API key setup
Rotten.api_key = "pddzts5bbcxpagtke4q5b6cn"

get '/' do
  erb :index
end

post '/searchMovies' do
  @movies = RottenMovie.find(:title => params[:title], :limit => 1)
  erb :index
end