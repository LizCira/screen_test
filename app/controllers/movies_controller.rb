class MoviesController < ApplicationController

  respond_to :json

  def index
    movies = Movie.all.sample(10)
    respond_with movies
  end

end
