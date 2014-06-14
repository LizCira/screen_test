class LikesController < ApplicationController

  def create

    userid = current_user.id
    format.json { render json: userid }

  end

  private

  def like_attributes
    params.require(:like).permit(:user_id, :movie_id)
  end

end
