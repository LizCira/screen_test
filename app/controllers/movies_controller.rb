class MoviesController < ApplicationController

  respond_to :json

  def index
    # build logic for getting rid of duplicate movies
    movies = Movie.all.sample(10)
    # shuffled_movies = Movie.all.shuffle
    # movies = shuffled_movies.pop(10)
    respond_with movies
  end

  def new
    movies_array = current_user.likes
    all_plots = []
    movies_array.each do |title|
    movie = title["movie_id"]
    plot = Movie.find_by_id(movie).plot
    all_plots << plot
  end
  # puts all_plots
  plots = all_plots.join(", ").to_s
  clean_plots = plots.gsub(" ","+")

  graph_data = HTTParty.get("http://uclassify.com/browse/prfekt/Values/ClassifyText?readkey=NhaVtD4ygw3GUA6OQdYXqo4YUQ&text=#{clean_plots}&version=1.01")


end
end
