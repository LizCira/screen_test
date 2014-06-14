class Movie < ActiveRecord::Base
  has_many :users, through :likes
  has_many :likes
end
