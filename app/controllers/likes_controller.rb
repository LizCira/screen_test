class LikesController < ApplicationController

respond_to :json

  def create

    like = Like.new
    like.user_id =  current_user.id
    like.movie_id = params[]
    like.save!
    respond_with like

  end

  private

  def like_attributes
    params.require(:like).permit(:user_id, :movie_id)
  end

end

# like_attributes[:movie_id]
