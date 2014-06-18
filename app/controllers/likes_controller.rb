class LikesController < ApplicationController

before_action :authenticate_user!

respond_to :json

  def create

    approved = Like.create({
      user_id: current_user.id,
      movie_id: like_attributes[:movie_id],
      approve: true
    })

    # respond_with approved
    render json: approved
  end

  private

  def like_attributes
    params.require(:like).permit(:movie_id)
  end

end


