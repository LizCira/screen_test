class LikesController < ApplicationController

respond_to :json

  def create

    approved = Like.create({
      user_id: http://current_user.id,
      # movie_id: likes_attributes[:movie_id],
      movie_id: params[:movie_id],
      approve: true
    })
    
    # respond_with approved
    render json: approved 
  end

  private

  def likes_attributes
    params.require(:like).permit(:movie_id)
  end

end
