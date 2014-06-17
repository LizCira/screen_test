class Like < ActiveRecord::Base
  belongs_to :user
  belongs_to :movie


  def movie_plot
    self.movie.plot
  end
end
