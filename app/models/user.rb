class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :movies, through: :likes
  has_many :likes

  def recently_liked_movies_plots(number)
    recent_likes = self.likes.last(number)
    recent_likes.map do |like|
      like.movie_plot
    end
  end
end
