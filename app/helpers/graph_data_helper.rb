module GraphDataHelper

  def self.clean_up_plots(plots)
    plots.join(", ").to_s.gsub(" ","+").gsub("\"","").gsub("\(","").gsub("\)","").gsub("\%", "").gsub(/[^\x00-\x7F]/n,'e').downcase.to_s
  end

  def self.raw_api_data_for(plots)
    plots = self.clean_up_plots(plots)
    HTTParty.get("http://uclassify.com/browse/prfekt/Values/ClassifyText?readkey=#{Rails.application.secrets.uclassify_api_key}&text=#{plots}&version=1.01")
  end

  def self.get_personality_data(plots)
    personality_data = self.raw_api_data_for(plots)
    attributes = personality_data["uclassify"]["readCalls"]["classify"]["classification"]["class"]
    attributes.map {|attribute| attribute["p"]}
  end

end
