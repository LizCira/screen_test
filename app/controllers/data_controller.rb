class DataController < ApplicationController

  def index

  end

  def new
    plot_text = params["plot"]
    clean_plot = plot_text.to_s.gsub(" ","+").gsub("\"","").gsub("\(","").gsub("\)","").gsub("\%", "").gsub(/[^\x00-\x7F]/n,'e').downcase.to_s
    personality_data = HTTParty.get("http://uclassify.com/browse/prfekt/Values/ClassifyText?readkey=#{Rails.application.secrets.uclassify_api_key}&text=#{clean_plot}&version=1.01")
    attributes = personality_data["uclassify"]["readCalls"]["classify"]["classification"]["class"]
    personality_score = attributes.map {|attribute| attribute["p"]}
      # binding.pry
    render json: personality_score
  end

end

