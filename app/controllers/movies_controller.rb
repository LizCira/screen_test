class MoviesController < ApplicationController

  respond_to :json

  def index
    # build logic for getting rid of duplicate movies
    movies = Movie.all.sample(10)
    # shuffled_movies = Movie.all.shuffle
    # movies = shuffled_movies.pop(10)
    respond_with movies
  end

  def personality
    recently_liked_plots = current_user.recently_liked_movies_plots(5)
    personality_scores = GraphDataHelper::get_personality_data(recently_liked_plots)
    render json: personality_scores
  end

  def refill_list
    movies = Movie.all.sample(5)

    respond_with movies
  end

end

