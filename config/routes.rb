Rails.application.routes.draw do

  root to: "welcome#index"

  devise_for :users
  resources :movies do
    resources :likes
  end

end

 #     movie_likes GET    /movies/:movie_id/likes(.:format)          likes#index
 #                 POST   /movies/:movie_id/likes(.:format)          likes#create
 #  new_movie_like GET    /movies/:movie_id/likes/new(.:format)      likes#new
 # edit_movie_like GET    /movies/:movie_id/likes/:id/edit(.:format) likes#edit
 #      movie_like GET    /movies/:movie_id/likes/:id(.:format)      likes#show
 #                 PATCH  /movies/:movie_id/likes/:id(.:format)      likes#update
 #                 PUT    /movies/:movie_id/likes/:id(.:format)      likes#update
 #                 DELETE /movies/:movie_id/likes/:id(.:format)      likes#destroy
 #          movies GET    /movies(.:format)                          movies#index
 #                 POST   /movies(.:format)                          movies#create
 #       new_movie GET    /movies/new(.:format)                      movies#new
 #      edit_movie GET    /movies/:id/edit(.:format)                 movies#edit
 #           movie GET    /movies/:id(.:format)                      movies#show
 #                 PATCH  /movies/:id(.:format)                      movies#update
 #                 PUT    /movies/:id(.:format)                      movies#update
 #                 DELETE /movies/:id(.:format)                      movies#destroy

