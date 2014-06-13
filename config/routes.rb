Rails.application.routes.draw do

  root to: "welcome#index"

  devise_for :users
  resources :movies do
    resources :likes
  end

end
