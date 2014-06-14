# def movie_info(title, year=nil)
#    response_hash = JSON.parse(HTTParty.get("http://www.omdbapi.com/?t=#{title}&y=#{year}").body)
# end

Movie.delete_all

movies = ["12 Angry Men",
"12 Years a Slave",
"2001: A Space Odyssey",
"3 Idiots",
"A Beautiful Mind",
"A Christmas Story",
"A Clockwork Orange",
"A Fistful of Dollars",
"A Separation",
"Alien",
"Aliens",
"All About Eve",
"American Beauty",
"American History X",
"Amores Perros",
"Annie Hall",
"Apocalypse Now",
"Back to the Future",
"Barry Lyndon",
"Batman Begins",
"Beauty and the Beast",
"Before Sunrise",
"Ben-Hur",
"Bicycle Thieves",
"Black Swan",
"Blade Runner",
"Blood Diamond",
"Braveheart",
"Butch Cassidy and the Sundance Kid",
"Captain America: The Winter Soldier",
"Casablanca",
"Casino",
"Castle in the Sky",
"Chinatown",
"Cinema Paradiso",
"Citizen Kane",
"City Lights",
"City of God",
"Cool Hand Luke",
"Das Boot",
"Diabolique",
"Dial M for Murder",
"Die Hard",
"Django Unchained",
"Dog Day Afternoon",
"Donnie Darko",
"Double Indemnity",
"Downfall",
"Elite Squad: The Enemy Within",
"Eternal Sunshine of the Spotless Mind",
"Fanny and Alexander",
"Fargo",
"Fight Club",
"Finding Nemo",
"For a Few Dollars More",
"Forrest Gump",
"Full Metal Jacket",
"Gandhi",
"Gladiator",
"Gone with the Wind",
"Good Will Hunting",
"Goodfellas",
"Gran Torino",
"Grave of the Fireflies",
"Gravity",
"Groundhog Day",
"Hachi: A Dog's Tale",
"Harry Potter and the Deathly Hallows: Part 2",
"Heat",
"Her",
"High Noon",
"Hotel Rwanda",
"How to Train Your Dragon",
"Howl's Moving Castle",
"Ikiru",
"In the Mood for Love",
"In the Name of the Father",
"Incendies",
"Inception",
"Indiana Jones and the Last Crusade",
"Infernal Affairs",
"Inglourious Basterds",
"Into the Wild",
"Ip Man",
"It Happened One Night",
"It's a Wonderful Life",
"Jaws",
"Judgment at Nuremberg",
"Jurassic Park",
"Kill Bill: Vol. 1",
"La Haine",
"Lagaan: Once Upon a Time in India",
"Lawrence of Arabia",
"The Professional",
"Life Is Beautiful",
"Life of Brian",
"Like Stars on Earth",
"Lock, Stock and Two Smoking Barrels",
"M",
"Mary and Max",
"Memento",
"Memories of Murder",
"Metropolis",
"Million Dollar Baby",
"Modern Times",
"Monsters, Inc",
"Monty Python and the Holy Grail",
"My Neighbor Totoro",
"Network",
"No Country for Old Men",
"North by Northwest",
"Notorious",
"Oldboy",
"On the Waterfront",
"Once Upon a Time in America",
"Once Upon a Time in the West",
"One Flew Over the Cuckoo's Nest",
"Pan's Labyrinth",
"Paths of Glory",
"Persona",
"Pirates of the Caribbean: The Curse of the Black Pearl",
"Platoon",
"Princess Mononoke",
"Psycho",
"Pulp Fiction",
"Raging Bull",
"Raiders of the Lost Ark",
"Ran",
"Rang De Basanti",
"Rashomon",
"Rear Window",
"Rebecca",
"Requiem for a Dream",
"Reservoir Dogs",
"Rocky",
"Roman Holiday",
"Rope",
"Rush",
"Saving Private Ryan",
"Scarface",
"Schindler's List",
"Se7en",
"Seven Samurai",
"Shutter Island",
"Sin City",
"Singin' in the Rain",
"Slumdog Millionaire",
"Snatch",
"Some Like It Hot",
"Spirited Away",
"Stalag 17",
"Stalker",
"Stand by Me",
"Star Wars: Episode IV - A New Hope",
"Star Wars: Episode V - The Empire Strikes Back",
"Star Wars: Episode VI - Return of the Jedi",
"Strangers on a Train",
"Sunset Blvd",
"Swades",
"Taxi Driver",
"Terminator 2: Judgment Day",
"The 400 Blows",
"The Apartment",
"The Avengers",
"The Battle of Algiers",
"The Best Years of Our Lives",
"The Big Lebowski",
"The Big Sleep",
"The Bourne Ultimatum",
"The Bridge on the River Kwai",
"The Celebration",
"The Dark Knight",
"The Dark Knight Rises",
"The Deer Hunter",
"The Departed",
"The Diving Bell and the Butterfly",
"The Elephant Man",
"The General",
"The Godfather",
"The Godfather: Part II",
"The Gold Rush",
"The Good, the Bad and the Ugly",
"The Graduate",
"The Grand Budapest Hotel",
"The Grapes of Wrath",
"The Great Dictator",
"The Great Escape",
"The Green Mile",
"The Help",
"The Hunt",
"The Hustler",
"The Intouchables",
"The Kid",
"The Killing",
"The King's Speech",
"The Lion King",
"The Lives of Others",
"The Lord of the Rings: The Fellowship of the Ring",
"The Lord of the Rings: The Return of the King",
"The Lord of the Rings: The Two Towers",
"The Maltese Falcon",
"The Matrix",
"The Night of the Hunter",
"The Pianist",
"The Prestige",
"The Princess Bride",
"The Road",
"The Secret in Their Eyes",
"The Seventh Seal",
"The Shawshank Redemption",
"The Shining",
"The Silence of the Lambs",
"The Sixth Sense",
"The Sting",
"The Terminator",
"The Thing",
"The Third Man",
"The Treasure of the Sierra Madre",
"The Truman Show",
"The Usual Suspects",
"The Wages of Fear",
"The Wizard of Oz",
"The Wolf of Wall Street",
"There Will Be Blood",
"Three Colors: Red",
"To Kill a Mockingbird",
"Touch of Evil",
"Toy Story",
"Toy Story 3",
"Trainspotting",
"Twelve Monkeys",
"Underground",
"Unforgiven",
"Up",
"V for Vendetta",
"Vertigo",
"Warrior",
"Who's Afraid of Virginia Woolf?",
"Wild Strawberries",
"Witness for the Prosecution",
"X-Men: Days of Future Past",
"Yojimbo"]

movies.each do |title|
  clean_title = title.gsub(" ","%20")
  movie_hash = JSON.parse(HTTParty.get("http://www.omdbapi.com/?t=#{clean_title}&plot=full"))
  Movie.create({
    title: movie_hash["Title"],
    poster: movie_hash["Poster"],
    year: movie_hash["Year"],
    plot: movie_hash["Plot"]
    })
end

