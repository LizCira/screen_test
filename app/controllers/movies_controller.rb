class MoviesController < ApplicationController

  def index
    # movies = Movie.all
    @movies = Movie.all.take(10)
  end

end
