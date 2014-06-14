def movie_info(title, year=nil)
   response_hash = JSON.parse(HTTParty.get("http://www.omdbapi.com/?t=#{title}&y=#{year}").body)
end