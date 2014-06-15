class MoviesController < ApplicationController

  respond_to :json

  def index
    # build logic for getting rid of duplicate movies 
    movies = Movie.all.sample(10)

    # shuffled_movies = Movie.all.shuffle

    # movies = shuffled_movies.pop(10)

    

    respond_with movies
  end

end
