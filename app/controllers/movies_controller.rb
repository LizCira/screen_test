class MoviesController < ApplicationController

  def index
    @movies = Movie.all.sample(10)
  end

end
