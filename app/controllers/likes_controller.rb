class LikesController < ApplicationController

respond_to :json

  def create
# binding.pry
    like = Like.create({
      user_id: current_user.id,
      movie_id: params["movie_id"]
    })

    respond_with like

  end

  private

  def like_attributes
    params.require(:like).permit(:movie_id)
  end

end


