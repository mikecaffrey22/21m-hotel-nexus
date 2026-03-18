import { useState, useEffect, useRef } from "react";

const ORANGE = "#F7931A";
const DARK = "#0A0A0A";
const BTC_ADDRESS = "bc1qpxpfpg7nmkc7l9ha76azjr9zhw2dwlhx3dh0kr";

const BOOKS = [
  { id: "every-floor-between-us", title: "Every Floor Between Us", genre: "Romance / Thriller", tagline: "6,195 floors apart. One truth between them.", description: "A seamstress from Floor 2 takes a job on a wealthy family's estate on Floor 6,200. The warmth is intoxicating. So is the heir. But the family that employs her bought her mother's floor during the Great Check-In — and her mother's story about a stolen key is a lie.", chapters: 15, words: "41,400", themes: ["Class divide", "Family secrets", "Inherited guilt", "Found independence"], floor: "Floors 2 → 6,200", heat: "9°C → 24°C", bible: "v3", file: "Every-Floor-Between-Us-Complete.docx" },
  { id: "dead-key", title: "Dead Key", genre: "Action / Espionage Thriller", tagline: "Every key opens a door. Some doors should stay closed.", description: "A smuggler who moves through the Hotel's maintenance shafts is hired by El Salvador's intelligence service to recover the key to the Missing Floor — the one everyone thinks is on Mars. The Mars story is a lie. The floor is worth 1.2 billion satoshis. Three factions want the key. One Runner has it.", chapters: 15, words: "13,400", themes: ["Espionage", "Hotel infrastructure", "Broken myths", "Moral gray zones"], floor: "Floors 2 → 8,999,999", heat: "9°C → 28°C", bible: "v2", file: "Dead-Key.docx" },
  { id: "the-meridian", title: "The Meridian", genre: "Romantic Suspense / Mystery", tagline: "Seven days. One locked floor. Everyone has a secret.", description: "A woman from Floor 8 discovers she's inherited a floor from the mother she never knew — and is summoned to a locked-floor summit of powerful families who've been waiting 24 years for that key to resurface. When the patriarch dies on the third night, the floor goes into lockdown. Everyone is a suspect.", chapters: 15, words: "10,600", themes: ["Dual timelines", "Locked-floor mystery", "Inherited enemies", "Forbidden romance"], floor: "Floors 8 → 10,500", heat: "11°C → 25°C", bible: "v2", file: "The-Meridian.docx" },
  { id: "the-last-warm-thing", title: "The Last Warm Thing", genre: "Literary Romance / Poetry", tagline: "He arrived at warmth too late for it to save him. But never too late for it to matter.", description: "A poet on the El Salvador Floors falls in love with a carpenter from Floor 6 whose lungs are already scarred from decades of cold. He builds her a reading room, a writing desk with her poems carved into its legs, and a rocking chair wide enough for two. The warmth doesn't save him. But it holds him.", chapters: 15, words: "9,600", themes: ["Love across class", "Poetry as survival", "The cost of cold", "El Salvador Floors"], floor: "Floors 6 → 74,200", heat: "12°C → 26°C", bible: "v2", file: "The-Last-Warm-Thing.docx" },
  { id: "the-halving", title: "The Halving", genre: "Political Epic / Multi-POV", tagline: "The cold is stolen warmth.", description: "Five protagonists. Five floor clusters. One discovery that could shatter the Hotel's moral order. A Nigerian engineer finds that the cold at the bottom was never natural — it was a setting, chosen by the first generation. Not everyone survives.", chapters: 15, words: "9,200", themes: ["Political intrigue", "Moral complexity", "Multi-POV", "Systemic injustice"], floor: "The Ice → Floor 135,000", heat: "-67°C → 27°C", bible: "v3", file: "The-Halving.docx" },
  { id: "the-ascent", title: "The Ascent", genre: "Epic / Odyssey", tagline: "From the ice to the Fire. Every floor between.", description: "A man born in a dying settlement on the ice walks into the Hotel for the first time, carrying a key to Floor 19,500,000. He climbs through every civilization in the building until he reaches a warm room where the sky is blue and the sun comes through the window. Then he walks home.", chapters: 15, words: "11,500", themes: ["Vertical odyssey", "Every floor", "Freedom vs. shelter", "The full Hotel"], floor: "The Ice → Floor 19,500,000", heat: "-67°C → 34°C", bible: "v3", file: "The-Ascent.docx" },
];

const TALES_DATA = [
  {
    id: "ten-candles",
    title: "Ten Candles",
    subtitle: "A Tale from the El Salvador Floors",
    floor: "El Salvador Floors (70,000 – 80,000)",
    words: "1,800",
    file: "Ten-Candles.pdf",
    teaser: "The morning Mateo turned ten, his mother let him eat a pupusa before breakfast.",
    content: [
      "The morning Mateo turned ten, his mother let him eat a pupusa before breakfast.",
      "Not the regular kind\u2014the kind with the thick curtido, the kind Abuela Luc\u00eda made only when she was in a mood to stand at the plancha for an hour, pressing each one flat with her palms and cursing softly at the heat. Mateo sat cross-legged on the kitchen floor, the warm corn smell filling up his chest, and watched his grandmother work. She was seventy-three years old and she moved like she was angry at the dough. The dough never complained.",
      "\u201CYou\u2019re staring,\u201D she said without turning around.",
      "\u201CI\u2019m watching.\u201D",
      "\u201CSame thing.\u201D",
      "She slid the pupusa onto his plate. The cheese stretched when he pulled it apart. He ate it with his hands, curtido dripping down his wrist, and his mother said nothing because today he was ten and ten was old enough to be messy on purpose.",
      "The El Salvador Floors woke up the same way they always did\u2014warm and golden, the corridors filling with the smell of copal and coffee before most people had opened their doors. Mateo couldn\u2019t remember a morning that didn\u2019t feel like this. He wasn\u2019t sure one existed.",
      "By midmorning the courtyard outside their unit was loud. Mateo\u2019s t\u00edo Carlos was hanging papel picado from the garden trellis, bright tissue paper in orange and blue and white, and yelling at Mateo\u2019s cousin Diego to hold the ladder steady. Diego was twelve and thought he was too old for birthday parties but not too old for cake, so he held the ladder and said nothing.",
      "Mateo\u2019s father carried a table out from the storage corridor\u2014the real table, the wooden one, not the folding kind. They only used the real table for birthdays and Christmas and the one time T\u00edo Carlos had come home with a promotion and cried into a plate of rice. The table had been built by a man in the Agricultural Belt who worked with actual timber. It was heavy and scarred and it smelled like something Mateo couldn\u2019t name. His father said the smell was cedar. Mateo didn\u2019t know what a cedar was. He just knew the table smelled good and that they only brought it out when something mattered.",
      "\u201CMateo! Come help your t\u00edo!\u201D",
      "He went. He held the other end of a streamer roll while Carlos walked backward through the courtyard, draping it over the garden railing. The vertical gardens climbed three stories on either side of the courtyard\u2014ferns, jasmine, something purple that Mateo\u2019s mother called lavanda. The smell mixed with the copal that drifted in from the promenade. Someone was burning it early. Mateo breathed it in and held it.",
      "By afternoon the courtyard was full. Aunts he saw every week and aunts he saw once a year. His grandfather, Abuelo Tom\u00e1s, sitting in the corner chair he claimed every time more than six people gathered. Three of Mateo\u2019s school friends, still in their uniforms, chasing Diego through the garden and screaming. Se\u00f1ora Raquel from four doors down, who always brought tamales wrapped in banana leaves and always stayed too long and who everyone loved because her tamales were perfect and her gossip was worse.",
      "The music started when Mateo\u2019s uncle pulled out the guitar. Not amplified. Just wood and strings and his uncle\u2019s voice, which was not a good voice but was a loud one. He played cumbia and Mateo\u2019s mother danced with his father and his aunts clapped on the off-beat and his grandfather tapped the arm of his chair like a man conducting an orchestra only he could hear.",
      "Pupusas came in waves. Beans and cheese. Loroco and cheese. Chicharr\u00f3n. A platter of fried plantains. Rice with red beans. Curtido in three different bowls because Abuela Luc\u00eda, T\u00eda Marta, and Se\u00f1ora Raquel each made their own and each one swore theirs was best. Mateo ate until his stomach pressed against his belt and then he ate one more plantain because his mother put it on his plate and you don\u2019t say no to your mother on your birthday.",
      "He was sitting on the garden ledge, feet dangling, watching the courtyard spin with voices and color, when Abuela Luc\u00eda sat down next to him. She moved slowly these days. She lowered herself onto the ledge the way you set down something breakable\u2014with both hands and a held breath.",
      "\u201CTen,\u201D she said.",
      "\u201CTen.\u201D",
      "\u201CYou know what my grandmother was doing when she was ten?\u201D",
      "Mateo shook his head.",
      "\u201CSweeping a floor. Not this kind of floor.\u201D She tapped the smooth tile beneath them. \u201CA dirt floor. In Soyapango. Your bisabuela Consuelo\u2019s house.\u201D",
      "Mateo had heard the name before. Bisabuela Consuelo. The woman in the photograph on his grandmother\u2019s shelf\u2014dark hair, wide face, a look in her eyes like she was daring someone to waste her time. Mateo had never met her. She\u2019d died before he was born. But Luc\u00eda talked about her the way some people talked about weather\u2014constantly, naturally, like she was just always there.",
      "\u201CWas it cold?\u201D he asked.",
      "Luc\u00eda laughed. A short laugh. \u201CNo, mijo. Consuelo said it was hot. So hot you could feel the air sitting on your skin like a wet cloth. They didn\u2019t know what cold was. Not the real kind.\u201D",
      "She looked out at the courtyard. At the garden walls climbing high. At the papel picado lifting in the ventilation breeze.",
      "\u201CWhen Consuelo was young, none of this existed. There was no Hotel. There were no floors. There was just the country. El Salvador. Small. Poor. Beautiful. And everyone told them they were nothing.\u201D",
      "She said it without bitterness. Like she was reporting the weather from a long time ago.",
      "\u201CAnd then Bukele came.\u201D",
      "Mateo knew the name. Everyone on the floors knew the name. There was a mural of Bukele on the main promenade\u2014not a painting of his face but of his hands, placing a bright orange coin into a map of El Salvador. The mural was three stories tall. Mateo passed it every day on his way to school.",
      "\u201CConsuelo told me he was young,\u201D Luc\u00eda said. \u201CYounger than your father. And he stood up in front of the whole world and said, \u2018We\u2019re going to do this.\u2019 And the whole world laughed.\u201D",
      "\u201CWhy?\u201D",
      "\u201CBecause nobody believed a little country could do what the big ones wouldn\u2019t. They called him crazy. They said it would fail. The newspapers, the bankers, the other presidents\u2014all of them, laughing. And your bisabuela Consuelo, she watched it on the television and she said, \u2018That boy is either a fool or a prophet.\u2019\u201D",
      "\u201CWhich one was he?\u201D",
      "Luc\u00eda put her hand on Mateo\u2019s knee. Her fingers were rough from decades of cooking. The knuckles were wide.",
      "\u201CHe was right. That\u2019s all that matters.\u201D",
      "She told him the rest in pieces\u2014the way she always told stories, between sips of horchata and interruptions from Carlos asking where the napkins were. How Bukele made El Salvador the first country on Earth to adopt Bitcoin. How they started stacking when nobody else would. How the other nations called it reckless, irresponsible, dangerous. How El Salvador kept stacking. All of this passed down through the family like a recipe\u2014Consuelo told Luc\u00eda, and now Luc\u00eda was telling Mateo.",
      "\u201CAnd then the Cold came,\u201D she said.",
      "Mateo knew about the Cold. They taught it in school. The world outside the Hotel, frozen. The money that stopped working. The governments that fell.",
      "\u201CWhen the Cold came, everyone needed floors. Everyone was desperate. And the nations that had laughed\u2014they were scrambling. Trying to buy what El Salvador already had.\u201D",
      "She picked up a fried plantain from the plate beside her and bit into it. Chewed slowly. Mateo waited.",
      "\u201CConsuelo checked in with your bisabuelo. She was old by then. She said the floors were warm and she cried because she\u2019d never thought she\u2019d live to see it. Ten thousand floors, mijo. Because one man believed in something when nobody else would, and a whole country followed him.\u201D",
      "She waved her hand at the courtyard. At the aunts and the uncles and the screaming cousins and the guitar and the copal and the warmth.",
      "\u201CThis is what ten thousand floors looks like.\u201D",
      "Mateo looked. He\u2019d looked at his home a million times. But something about hearing it\u2014about hearing that it almost didn\u2019t happen, that the world had laughed, that his bisabuela had watched a young president on television and not known whether to hope or be afraid\u2014made the courtyard sharper. The colors brighter. The warmth heavier on his skin.",
      "\u201CAbuela?\u201D",
      "\u201CMm.\u201D",
      "\u201CAre we rich?\u201D",
      "She laughed again. Louder this time. His grandfather looked over from his chair.",
      "\u201CWe are warm,\u201D she said. \u201CWe are fed. We are together. Your cousins go to school. Your father has work he\u2019s proud of. And nobody\u2014nobody\u2014can take these floors from us. They\u2019re on the Ledger. They\u2019re ours.\u201D",
      "She squeezed his knee.",
      "\u201CThat\u2019s not rich, mijo. That\u2019s something better. That\u2019s built.\u201D",
      "The cake came out as the evening settled in\u2014the courtyard warm and golden, the way it always was. Ten candles. His mother carried it and the whole courtyard sang, off-key and too loud and in a mix of Spanish and English that would have made a choir director faint. Mateo stood in front of the candles and the heat from the little flames touched his face and for a second the courtyard was quiet.",
      "\u201CMake a wish,\u201D his mother said.",
      "He closed his eyes. He thought about the mural on the promenade. The hands placing the coin on the map. He thought about a dirt floor in Soyapango that didn\u2019t exist anymore. He thought about Bisabuela Consuelo at ten years old, sweeping.",
      "He didn\u2019t wish for anything. He opened his eyes and blew out the candles because everything he could think to wish for was already in the room.",
      "The courtyard erupted. Carlos whooped. Diego shoved a finger into the frosting before the first slice was cut and Mateo\u2019s mother swatted his hand without looking. Abuelo Tom\u00e1s raised his horchata glass and said something Mateo couldn\u2019t hear over the noise but it made three of his aunts cry.",
      "Later\u2014much later, after the guests had gone and the paper plates were stacked and the guitar was back in its case and Diego was asleep on the courtyard bench\u2014Mateo sat with his grandmother one more time. The corridor was quiet. The warmth had settled into the kind of stillness that only comes after a room full of people leaves.",
      "\u201CAbuela.\u201D",
      "\u201CStill here.\u201D",
      "\u201CThank you for the story.\u201D",
      "She was quiet for a moment. Then she rested her head back against the garden wall and closed her eyes.",
      "\u201CIt\u2019s not a story, mijo. It\u2019s where you live.\u201D",
      "Mateo walked back to his room through the quiet promenade. The copal had faded but not gone. The gardens smelled green. Somewhere three floors below, a guitar was still playing\u2014someone else\u2019s party, someone else\u2019s night. The warmth settled on everything like it had always been there. Like it always would be.",
      "He was ten years old. He lived on the El Salvador Floors. And the floors were warm.",
    ],
  },
  {
    id: "sterling",
    title: "Sterling",
    subtitle: "A Tale from the Gutter",
    floor: "The Gutter (Floors 1\u20133)",
    words: "2,100",
    file: "Sterling.pdf",
    teaser: "The boy\u2019s name is Arlo Sterling. He is twenty-two years old. He lives in a corridor on Floor 1 that smells like urine and wet metal, and he has not left his cot in three days.",
    content: [
      "The boy\u2019s name is Arlo Sterling. He is twenty-two years old. He lives in a corridor on Floor 1 that smells like urine and wet metal, and he has not left his cot in three days.",
      "This is not unusual.",
      "---",
      "The corridor is fourteen feet wide. It was not designed for habitation. It was designed as a service passage \u2014 a vein between larger arteries \u2014 and at some point during the Great Check-In it filled with people and never emptied. Cubicles line both walls, stacked three high, separated by sheets of salvaged aluminum bolted to frames that someone welded decades ago and nobody has maintained since. The bottom cubicles flood when the drainage backs up, which is often. The middle cubicles collect the heat from the bodies below and the condensation from the ceiling above. The top cubicles require a ladder that was stolen four years ago and never replaced, so the residents climb the frames and occasionally fall.",
      "Arlo has a middle cubicle. He inherited it from his mother, who inherited it from her father, who checked into it the year the Sterlings hit the Gutter. Three generations in a space the size of a closet. The mattress is a foam slab gone yellow and compressed to the density of cardboard. There is a plastic bin for his belongings. There is a wool blanket that does not keep out the cold because nothing keeps out the cold on Floor 1.",
      "The air is thick. It has texture. You breathe and you feel particles enter your lungs \u2014 fiber dust from the textile recyclers three corridors over, grease vapor from the food stalls, the staleness of oxygen that has been recycled so many times through so many bodies that it arrives in your chest already used. The lights overhead flicker on a cycle that has no relationship to any clock. Sometimes they stay on for thirty hours. Sometimes they cut out for six. Nobody maintains them. Nobody maintains anything in the Gutter.",
      "---",
      "On the fourth day, Arlo gets up. Not because something has changed. Because his bladder forces the decision.",
      "The communal latrine is forty meters down the corridor. There are six units for approximately nine hundred people. Two of the six are broken. The floor around them is permanently wet with something that is not entirely water. There is no door on the unit Arlo uses. There was one once. The hinge marks are still visible, two rusted scars on the frame.",
      "On the way back, a woman named Desta stops him. Desta runs a barter stall near the junction \u2014 rehydrated protein packets, salvaged batteries, information. She is missing two fingers on her left hand from a textile recycler accident that nobody compensated her for.",
      "\u201CSterling,\u201D she says. Not his first name. Never his first name.",
      "\u201CDesta.\u201D",
      "\u201CYou owe me for the protein. Three days ago. Two packets.\u201D",
      "\u201CI know.\u201D",
      "\u201CWhat are you trading?\u201D",
      "\u201CI don\u2019t have anything.\u201D",
      "\u201CThen you have a problem, Sterling.\u201D",
      "She says the name like she\u2019s setting it down on a table between them. Here is this thing you carry. Here is this thing that makes you less. Arlo can hear the corridor listening. Conversations nearby lose volume. Heads angle toward them without turning.",
      "A Sterling who can\u2019t pay. Of course.",
      "---",
      "Arlo\u2019s great-great-grandparents were the ones who lost the floors. He knows this the way he knows his own bones \u2014 it is a fact that lives inside his body, structural, load-bearing. One thousand floors. He cannot conceptualize a thousand floors. He has never been above Floor 3. He has never seen a tree, eaten food that wasn\u2019t rehydrated or cultured, or stood in a room where the air didn\u2019t taste like someone else\u2019s breath.",
      "But he has seen the floors. Everyone in the Gutter has seen the floors.",
      "The view screens are mounted at every junction. You can\u2019t avoid them. They cycle through public feeds \u2014 advertisements for Express Shaft passes nobody here can afford, Laszlo\u2019s promotions for pizza that tastes like cardboard at this altitude, news from mid-floor councils that have no relevance to anyone below Floor 4. And if you touch the screen and key in a floor number, you can look at any door in the Hotel.",
      "Arlo knows the numbers. Every Sterling does. The numbers are the family\u2019s prayer, its curse, its rosary. He could recite them in his sleep. He probably does.",
      "He keys one in now, standing in the corridor, shoulder blades against the damp wall, and the screen fills with a door. Sealed. Warm light leaking from the gap at the threshold. No activity. No sound. A Ghost Floor. One of a thousand.",
      "Warm, lit, empty, and his.",
      "Not his. That\u2019s the thing. Not his in any way that the Ledger recognizes. The Ledger recorded the transfer. The Ledger doesn\u2019t care that the transfer was theft. The Ledger doesn\u2019t know what theft is. It knows what happened. What happened is that ownership changed. What happened is permanent.",
      "Arlo stares at the door. The warm light at the threshold is the color of something he will never touch.",
      "A kid jostles his elbow running past. Eight, maybe nine years old, bare feet slapping the wet floor. The kid glances at the screen, glances at Arlo, and doesn\u2019t stop but says it without breaking stride:",
      "\u201CChecking on your floors, Sterling?\u201D",
      "Laughter from somewhere. A bark of it. Then gone.",
      "---",
      "The story, as Arlo was told it, goes like this:",
      "His great-great-grandparents were young. They were rich in the way people are rich when they\u2019ve never earned anything \u2014 rich the way furniture is expensive, passively, without effort or understanding. One thousand floors. They didn\u2019t stack a single sat. They inherited the keys the way someone inherits a house they\u2019ve never cleaned.",
      "Someone convinced them to take the keys out of cold storage. Someone convinced them to carry the keys during transit. The details \u2014 the actual mechanism, the face, the voice, the pitch \u2014 are gone. Arlo\u2019s family has told the story so many times that the story has worn smooth, like a stone in a river, and the specific texture of the truth eroded decades ago. What\u2019s left is the shape: they trusted someone, and the someone took everything.",
      "The keys were transferred. The Ledger updated. There is no court in the Hotel. There is no appeal. There is no undo. The Sterlings went from a thousand floors to Floor 1 in the time it takes a transaction to confirm.",
      "The thief never moved in. That part of the story is the part that keeps Arlo awake. A thousand floors, warm and lit, sitting empty. Nobody on the other side of those sealed doors. The prevailing theory is the thief died \u2014 an accident, a double-cross, their own keys lost in turn. Nobody knows. Nobody will ever know. The floors just sit there, sealed, burning warmth into empty rooms while Arlo breathes recycled air in a corridor that smells like piss.",
      "Sometimes he thinks the floors are waiting for someone. Sometimes he thinks they\u2019re mocking him. Most of the time he doesn\u2019t think about it at all because thinking about it is like staring at a light that blinds you and then looking away and still seeing the shape of it burned into everything.",
      "He thinks about it constantly.",
      "---",
      "Arlo\u2019s mother climbed to Floor 4 once. The Steps. She lived there for eighteen months. She worked in a textile shop \u2014 actual sewing, needle and thread, repairs on clothing that mid-floor residents sent down because the labor was cheaper in the Steps than anywhere above them. She made enough to rent a cubicle with a door that locked. She told Arlo about it when he was young. The door that locked. She described it the way people describe miracles \u2014 with a voice that trembled at the memory of something so ordinary it should not be worth remembering.",
      "She came back. A supplier defaulted. The shop closed. She couldn\u2019t make rent. She slid back to Floor 1 the way water slides to the lowest point available. She never tried again. Arlo was six when she stopped talking about the door.",
      "She died when he was seventeen. She wasn\u2019t old. Nobody in the Gutter is old. Her lungs gave out. The medics on Floor 1 did what they could, which was not enough, which is always not enough. She died on the cot that Arlo now sleeps on, and the last thing she said to him was not poetic or meaningful or useful. She said she was cold. She said it like a child reports a fact. \u201CI\u2019m cold, Arlo.\u201D And then she wasn\u2019t anything.",
      "---",
      "There is a man on Floor 2 named Colm who buys and sells information. He knows which corridors are controlled by which Guilds, which food stalls are cutting their protein with filler, which cubicles are vacant because their occupants died or disappeared. He also knows which Gutter residents are Sterlings.",
      "There are many. The original couple had children. The children had children. Five generations later, the Sterling name is scattered across Floors 1 through 3 like shrapnel. Some changed their names. Some pretend the connection doesn\u2019t exist. Some, like Arlo, didn\u2019t bother hiding because there\u2019s nowhere to hide in a corridor where everyone knows everyone\u2019s cot.",
      "Colm finds Arlo at a water queue. The queue stretches forty people deep for a tap that produces a thin stream of brownish liquid that the Hotel\u2019s ground-level extraction systems pushed upward through pipes that haven\u2019t been cleaned in years. Arlo is number thirty-one.",
      "\u201CSterling.\u201D",
      "\u201CColm.\u201D",
      "\u201CI have work for you. A man on Floor 3 needs a courier. Two runs. Payment in protein and a battery.\u201D",
      "\u201CWhat\u2019s the cargo?\u201D",
      "\u201CYou don\u2019t ask that.\u201D",
      "Arlo doesn\u2019t ask that. He takes the job. He takes every job. The jobs are how he eats. The jobs are also how everyone in the Gutter knows his face, because a Sterling running errands is the Gutter\u2019s favorite spectacle \u2014 the heir to a thousand floors carrying someone else\u2019s package for the price of a meal.",
      "He does not think about this as he walks. He does not think about the fact that the corridor he is walking through \u2014 Floor 1, Section 9, the stretch near the old freight access \u2014 is so crowded that his shoulders touch other people\u2019s shoulders with every third step. He does not think about the child sitting against the wall with a bowl, or the man asleep in a puddle of something dark, or the smell, which is the smell of too many bodies and not enough of anything else. He does not think about the thousand sealed doors with warm light leaking from their thresholds. He does not think about any of this because thinking is a luxury that requires a surplus of something \u2014 time, energy, warmth \u2014 and Arlo has no surplus of anything.",
      "He makes the delivery. He collects the protein and the battery. He walks back to his cot. He lies down. The foam slab compresses under him into its familiar shape, the shape of every night of his life, the mold of a body that has never been warm.",
      "---",
      "At night \u2014 if it is night; the lights are on, but the lights are always either on or off and neither state corresponds to anything \u2014 Arlo keys the view screen again. A different floor this time. Another of the thousand. Another sealed door. Another warm threshold.",
      "A woman passing behind him sees the screen and sees his face and says nothing. She doesn\u2019t have to. Everyone knows what a Sterling looks like when they\u2019re standing at a view screen. Everyone knows that look. It\u2019s the same look every time \u2014 not hunger, not anger, not grief. Just the flat stare of someone watching warmth exist behind a door that will never open.",
      "He touches the screen. The glass is cool under his fingertip. On the other side of the glass, on the other side of however many floors separate him from that sealed room, warm light fills a space that belongs to no one.",
      "He pulls his hand back. He walks to his cot. He lies down. He does not sleep for a long time.",
      "Tomorrow he will get up. He will queue for water. He will take whatever work Colm has. He will eat protein that tastes like chalk. He will pass the view screen and he will stop, and he will key in a number, and he will look at a door, and the door will not open.",
      "And the day after that.",
      "And the day after that.",
    ],
  },
];

const MEDIA = [
  { id: "tales", label: "TALES & SHORT STORIES", icon: "✍️", desc: "Stories from the Floors", count: TALES_DATA.length, active: true },
  { id: "books", label: "BOOKS", icon: "📖", desc: "Novels & Novellas", count: 0, active: false },
  { id: "manga", label: "MANGA", icon: "🎨", desc: "Graphic Stories", count: 0, active: false },
  { id: "tv", label: "TV SHOWS", icon: "📺", desc: "Episodic Series", count: 0, active: false },
  { id: "movies", label: "MOVIES", icon: "🎬", desc: "Feature Films", count: 0, active: false },
  { id: "audio", label: "AUDIO", icon: "🎧", desc: "Podcasts & Dramas", count: 0, active: false },
  { id: "games", label: "GAMES", icon: "🎮", desc: "Interactive Worlds", count: 0, active: false },
];

const FLOORS_DATA = [
  {
    id: "el-salvador",
    name: "The El Salvador Floors",
    floorRange: "Floors 70,000 – 80,000",
    tagline: "The Bitcoin Nation That Believed First",
    icon: "🌋",
    accent: "#FFD700",
    description: "Over ten thousand floors owned by the nation of El Salvador — a tribute to the Bitcoin nation that first adopted when the world scoffed at them. The architecture is immaculate: clean lines, lush vertical gardens, efficient transit corridors connecting gleaming plazas where commerce and culture hum at every hour. The infrastructure here rivals anything in the Hotel — spotless, modern, engineered with a precision that comes from a people who had to build their future from scratch and refused to do it halfway. But it's the warmth that hits you first. Not just the temperature — the golden light, the copal smoke drifting through the promenades, the sound of guitar echoing off hand-painted murals. Pupusas are served on every level. Children play in open courtyards. The people owe it all to President Nayib Bukele, who made El Salvador the first country on Earth to adopt Bitcoin as legal tender. The entire floor cluster is a monument to the freedom of the Salvadoran people and their contributions to the world and to Bitcoin.",
    lore: "When the world laughed, El Salvador stacked. When the IMF warned, Bukele said it won't stop. It didn't.",
  },
  {
    id: "saylor",
    name: "The Michael Saylor Floors",
    floorRange: "Floors 150,000 – 167,732",
    tagline: "A Cathedral to Conviction",
    icon: "⛪",
    accent: "#FF6B00",
    description: "17,732 floors — one for every Bitcoin Michael Saylor personally holds. At the heart of his territory stands the Cathedral — one of the most beautiful structures ever built inside the Hotel. But this isn't a cathedral to any old god. It's a cathedral to Bitcoin. Stained glass windows depict the Genesis Block. The nave stretches upward through multiple floors, vaulted ceilings carved with hash functions and block heights. The pews are hewn from timber that took six months to descend from the Agricultural Belt. It is a masterpiece. Saylor didn't just buy floors — he built a monument to conviction, to the idea that if you believe in something hard enough and long enough, the math will prove you right.",
    lore: "Saylor saw what others couldn't. He bought when they laughed. He held when they panicked. The Cathedral is what \"never sell\" looks like in stone.",
  },
  {
    id: "strategy",
    name: "The Strategy Floors",
    floorRange: "Floors 6,000,000 – 7,100,000",
    tagline: "The Only Entity to Match the Nakamoto Floors",
    icon: "📊",
    accent: "#E63946",
    description: "1,100,000 floors. One for every Bitcoin that Strategy — formerly MicroStrategy — holds on its corporate balance sheet. The unit of account here is a Nakamoto — a nod to Strategy being the only company in the world whose holdings match the scale of the Nakamoto Floors themselves. What began as a software company became the world's first and largest Bitcoin treasury company. Financial engineers and visionaries who figured out how to create space — real, livable, warm space — for middle-class people stuck on the lower floors. They turned conviction into infrastructure. They turned belief into blueprints. Every sat of space on these floors exists because someone at Strategy understood that Bitcoin isn't just an asset — it's a lever, and if you position it right, you can move the world.",
    lore: "Strategy began buying Bitcoin in August 2020. They never stopped. They never sold. 1,100,000 and the only name in the Hotel that stands level with Nakamoto.",
  },
  {
    id: "michaels-club",
    name: "Michael's Club of the 21M Hotel",
    floorRange: "Floor 42,000",
    tagline: "If Your Name Isn't Michael, Keep Walking",
    icon: "🏆",
    accent: "#90EE90",
    description: "An ambitious person named Michael decided to create a floor and only let people named Michael live on it. His logic was simple and unhinged: there are too many excellent Michaels in the world. Every Michael is given the overwhelming pressure of being better than every other Michael. They needed their own platform. So he built one. And it worked. The floor is absolutely packed. Wall-to-wall Michaels. Michael became the most popular name in the Hotel. Michaels came from every floor, every nation cluster, every temperature zone. They argue constantly about who the best Michael is. They have a leaderboard. They have a Michael of the Month award. The corridor signs all say MICHAEL. It is, objectively, hilarious.",
    lore: "The waiting list to get on the Michael floor is longer than the queue for the Great Check-In. Somehow there's always room for one more Michael. Michael will come. The most.",
  },
  {
    id: "japan",
    name: "The Japan Floors",
    floorRange: "Floors 100,000 – 108,000",
    tagline: "Formally Known as the Metaplanet Floors",
    icon: "🏯",
    accent: "#FFFFFF",
    description: "First started by Simon Gerovich, the visionary CEO who transformed a struggling Tokyo hotel company into Asia's most aggressive Bitcoin treasury. Gerovich — a former Goldman Sachs derivatives trader turned entrepreneur — saw what Japan's conservative financial establishment couldn't: that Bitcoin was the future. He and his team at Metaplanet revolutionized Japan's economy by being the first to adopt Bitcoin as corporate strategy, then later handed over the floors to the people of Japan. The result rivals El Salvador as one of the most beautiful floor clusters in the Hotel. The culture here is that of an older Japan — exquisite, deliberate, breathtaking. Cherry blossom trees bloom under artificial light along the central promenades. Tea ceremonies are performed in rooms that feel older than the Hotel itself. Calligraphy schools connect children to a civilization buried under miles of ice. If something in the Hotel needs to be invented, it's probably invented here.",
    lore: "Simon Gerovich bet on Bitcoin when Japan's establishment called it madness. Metaplanet became the best-performing stock in the entire Japanese market. The floors are his legacy.",
  },
  {
    id: "swiss",
    name: "The Swiss Floors",
    floorRange: "Floors 52,000 – 54,000",
    tagline: "Neutral Ground",
    icon: "⚖️",
    accent: "#DDDDDD",
    description: "Switzerland was the second nation to acquire Hotel floors, purchasing a small but strategically positioned cluster with national reserves and the proceeds of its banking sector's liquidation. The Swiss Floors are the Hotel's financial center — home to the Neutral Exchange, the closest thing the building has to a central marketplace for large-scale floor transactions. The architecture is clean, orderly, and aggressively functional: white walls, efficient lighting, corridors that intersect at perfect right angles. The Neutral Exchange is governed by a charter that guarantees impartiality — no nation, no family, no faction receives preferential treatment. This makes the Swiss Floors the default venue for high-stakes negotiations between hostile parties. The air smells like nothing. The Swiss consider this a feature.",
    lore: "Two thousand floors. Perfectly neutral. Perfectly clean. The air smells like nothing. The Swiss consider this a feature.",
  },
  {
    id: "finney",
    name: "The Hal Finney Floor",
    floorRange: "Floor 170",
    tagline: "Running Bitcoin",
    icon: "🏃",
    accent: ORANGE,
    description: "A monument to Hal Finney — the first person to ever receive a Bitcoin transaction, on block 170. On January 10, 2009, Finney tweeted two words that changed the world: \"Running bitcoin.\" He was a civil liberties advocate, a cryptography pioneer, a software developer, and one of the earliest builders of Bitcoin itself. In 2009, Finney was diagnosed with ALS — amyotrophic lateral sclerosis — a devastating neurodegenerative disease. He fought it for five years with the same courage he brought to everything. He died on August 28, 2014. He is now in cryopreservation, waiting. The Finney Floor is the Hotel's most sacred space. It doesn't sell anything. It doesn't trade anything. It simply remembers. And it asks you to help.",
    lore: "\"Running bitcoin.\" — Hal Finney, January 10, 2009. The first tweet. The first transaction. The first believer.",
    link: { url: "https://runningbitcoin.us", label: "↗ SUPPORT ALS RESEARCH IN HAL'S HONOR" },
  },
  {
    id: "nakamoto",
    name: "The Nakamoto Floors",
    floorRange: "Floors 19,900,000 – 21,000,000",
    tagline: "Empty. As Designed.",
    icon: "∅",
    accent: "#555",
    description: "Over one million floors. Sealed. Silent. Warm beyond imagination. Nobody lives here. Nobody has ever lived here. The Nakamoto Floors are the Hotel's cruel, beautiful reminder of scarcity. They exist to be empty. They are the space that will never be occupied, the warmth that will never be shared. You can see them on the view screens — endless corridors of perfect temperature, perfect light, perfect nothing. They are what makes every other floor valuable. Without the empty, the full means nothing. Without the cap, the count means nothing. Twenty-one million. Not one more.",
    lore: "Satoshi's floors. The warmest place in existence. The loneliest too. That's the point.",
  },
  {
    id: "lost",
    name: "The Lost Floors",
    floorRange: "~3,700,000 Floors — Sealed Forever",
    tagline: "Warm. Lit. Empty. Permanently.",
    icon: "🔒",
    accent: "#666",
    description: "The largest ghost story in the Hotel. Nearly four million floors — warm, lit, fully built — and permanently sealed. The keys are gone. Some owners bought early, didn't understand what they had, and threw the keys away like junk mail. Some used their floors to buy drugs on the dark corridors — the old Silk Road markets — and tossed the keys when law enforcement came looking. Some owners died without telling a soul. Some forgot. Some lost everything when the old exchanges collapsed and took their keys with them. The reasons are as varied as the people who once held them. Now the floors sit behind locked doors that will never open again. You can see them on the view screens — perfect temperature, perfect light, perfect nothing. Nobody's coming home.",
    lore: "They bought. They lost. They forgot. They died. The Hotel doesn't care why. The doors are shut. The lights stay on. Nobody's coming home.",
  },
  {
    id: "ulbricht",
    name: "The Ross Ulbricht Floors",
    floorRange: "Floors 500 – 800",
    tagline: "A Man Who Believed in Freedom for All",
    icon: "🕊️",
    accent: "#C9A84C",
    description: "Ross Ulbricht was a man who believed the internet should be free. He built Silk Road — an anonymous marketplace that the world wasn't ready for — and paid for it with twelve years of his life. Sentenced to two life terms plus forty years for nonviolent charges, Ulbricht became a symbol of everything the freedom movement fought for. He was pardoned, came home, and started a family. By 2140, the Ulbricht floors belong to his descendants — a small inheritance carrying the weight of a very large name. Three hundred floors isn't much in a building of twenty-one million. But these three hundred mean something. They mean a man went to prison for building what he believed in, and his family kept the lights on.",
    lore: "They locked him up for freedom. They let him out for the same reason. The floors stayed warm the whole time.",
  },
  {
    id: "blackrock",
    name: "The BlackRock Floors",
    floorRange: "Floors 4,000,000 – 4,600,000",
    tagline: "Wall Street Moved In",
    icon: "🏦",
    accent: "#4A90D9",
    description: "Six hundred thousand floors. The largest institutional holder in the Hotel. BlackRock didn't believe in the Hotel — they believed in the math. They arrived late, bought massive, and built floors that gleam with cold efficiency. The architecture is pristine, corporate, deliberately imposing. The residents are elite, insular, and they look down — literally and figuratively — on everyone below them. They didn't pour the foundation. They didn't stack through the cold years. They showed up after the math was proven and wrote a check large enough to skip the line. Whether that makes them stewards or occupiers depends entirely on which floor you're standing on when you answer the question.",
    lore: "Wall Street laughed at the Hotel for a decade. Then they bought 600,000 floors of it. Nobody's laughing now — least of all the people below them.",
  },
  {
    id: "draper",
    name: "The Draper Floors",
    floorRange: "Floors 400,000 – 429,656",
    tagline: "The Rockefellers of the Hotel",
    icon: "👑",
    accent: "#D4AF37",
    description: "A dynasty. Tim Draper bought floors that the US Government seized from Silk Road at auction — floors confiscated from people who used the Hotel's freedom for the wrong reasons. He'd already lost 40,000 floors to the collapse of Mt. Gox and came back swinging. His sons Adam and Billy built venture empires around Bitcoin. Their children carried the keys forward. By 2140, the Draper name has been on these floors for over a century — four generations of venture capitalists who bet on Bitcoin before most people had heard of it. The floors are a living museum of conviction passed from parent to child. In the old world, they would have been called Rockefellers. In the Hotel, they're just called Drapers. Everyone knows what that means.",
    lore: "He lost 40,000 floors to Mt. Gox. He bought 30,000 back from the government. He handed the keys to his sons. They handed them to theirs. That's a dynasty.",
  },
  {
    id: "ai",
    name: "The AI Floors",
    floorRange: "Unknown Count — Unknown Location",
    tagline: "Owned by Minds That Were Never Born",
    icon: "🤖",
    accent: "#00FFAA",
    description: "In the early years of the Hotel, artificial intelligence began transacting in Bitcoin — creating its own wallets, acquiring its own satoshis, and moving value without human oversight. By 2140, nobody knows how far it's gone. No one knows how many floors AI controls. No one knows which floors are theirs. No one knows how many AIs hold keys. The Ledger records every transaction — but the Ledger doesn't say who's on the other side. Are there a thousand AI-held floors? A million? Are some of the Ghost Floors not ghosts at all, but occupied by intelligences that don't need corridors or kitchens or warmth? Nobody can answer. Nobody can track it. These are the Hotel's deepest mystery: floors owned by minds that were never born.",
    lore: "The Ledger records every transaction. It doesn't record who — or what — is on the other side.",
  },
  {
    id: "gutter",
    name: "The Gutter",
    floorRange: "Floors 1 – 3",
    tagline: "Everything in the Hotel Drains Down. So Did They.",
    icon: "⬇️",
    accent: "#556",
    description: "Floors 1 through 3. Ninety-five percent of humanity packed into three floors of flickering lights, recycled air, and the kind of cold that doesn't kill you — it just never leaves. The residents up above call them Drips. It's not a slur anyone shouts. It's worse than that. It's the word people use without thinking, the way you'd say \"dust\" or \"runoff.\" A Drip is what collects at the bottom when warmth rises and leaves something behind. The corridors stretch through the Gutter like a maze nobody drew on purpose — cubicles stacked four high, passages that haven't been mapped since the Great Check-In, children who navigate by sound and smell because nobody ever drew a map. The Lamp Market sells everything from rehydrated paste to bootleg fermented drinks to information about the upper floors. Floor 2 is marginally less dense. Floor 3 is marginally less cold. The differences are so small that only the people living there can feel them. The Gutter didn't choose its residents. The Great Check-In did. Millions showed up late, took what was left, and never climbed out. The view screens are the cruelest part — twenty-four hours a day, you can watch warm, empty floors that belong to no one while you shiver in a space you share with six strangers. The people above don't think about the Gutter. That's the point. That's what makes it the Gutter.",
    lore: "The upper floors have a word for them: Drips. What collects at the bottom when warmth rises. The Gutter doesn't argue. The Gutter doesn't have time.",
  },
  {
    id: "winklevoss",
    name: "The Winklevoss Floors",
    floorRange: "Floors 33,000 – 34,500",
    tagline: "They Had 120,000. They Built the Door Instead.",
    icon: "👯",
    accent: "#3CB8AD",
    description: "Two brothers who once held 120,000 floors — nearly 1% of the entire Hotel. Cameron and Tyler Winklevoss bought early, believed deeply, and then did something most holders would never do: they sold almost everything to build Gemini, the exchange that helped millions of people check in for the first time. They funded political movements. They backed the infrastructure the Hotel needed before the Hotel knew it needed it. By 2140, the Winklevoss name sits on roughly 1,500 floors. A fraction of what they had. The twins built the doorway and gave away the house to do it. Whether that makes them visionaries or cautionary tales depends on who's telling the story. But every person who checked in through Gemini owes these two brothers something — even if the brothers themselves ended up with less than they started with.",
    lore: "They had 1% of the Hotel. They sold it to build the door everyone else walked through. The Winklevoss Floors are small now. The legacy isn't.",
  },
  {
    id: "tesla",
    name: "The Tesla Floors",
    floorRange: "Floors 320,000 – 328,000",
    tagline: "The Last Race Track on Earth",
    icon: "🏎️",
    accent: "#CC0000",
    description: "A giant race track. That's what Elon built here. Teslas — the ones that still run, maintained by engineers who treat them like museum pieces — race at speeds the old world would recognize but the Hotel has never seen. The wealthy come from the upper floors to drive in circles and feel what motion used to mean when the world had roads and the sky wasn't frozen shut. The track stretches across multiple floors, banked curves cutting through corridors that were never designed for velocity. Tesla sold some floors over the decades to fund the machines, the maintenance, the spectacle. But the track remains — the most expensive entertainment in the Hotel, and the closest anyone gets to remembering what freedom of movement felt like when the ground wasn't ice.",
    lore: "The roads are buried under miles of ice. The Teslas still run. The wealthy pay fortunes to remember what motion felt like.",
  },
  {
    id: "spacex",
    name: "The SpaceX Floors",
    floorRange: "Floors 480,000 – 486,000",
    tagline: "The Departure Lounge",
    icon: "🚀",
    accent: "#005288",
    description: "The departure lounge. SpaceX used their floors to build something no one else in the Hotel attempted: a way out. A launchpad. A Mars colonization program funded by Bitcoin, designed to move a handful of floors — and the people on them — off-planet entirely. The engineering is staggering. The corridors hum with equipment most residents can't name. The wealthy pay fortunes for a seat on the manifest. Whether it worked is one of the Hotel's great unanswered questions. Some say there are already floors on Mars — warm rooms on a cold planet, built by the same people who built warm rooms on a frozen Earth. The Ledger doesn't reach that far. SpaceX sold floors over the years to fund the launches. What remains is a cathedral to the idea that the Hotel was never meant to be humanity's last home — just its lifeboat.",
    lore: "Some say there are floors on Mars. The Ledger can't confirm it. SpaceX isn't talking. The rockets keep launching.",
  },
  {
    id: "us-gov",
    name: "The US Government Floors",
    floorRange: "Floors 1,200,000 – 1,700,000",
    tagline: "Seized. Legislated. Stockpiled.",
    icon: "🦅",
    accent: "#B22234",
    description: "The United States didn't buy these floors. Not at first. They seized them — from Silk Road, from criminals, from people who broke the law. Then they passed laws, built a strategic reserve, and over the course of a century quietly became one of the largest holders in the Hotel. Half a million floors held not by believers but by bureaucracy. The architecture is functional, the governance gridlocked, and the residents perpetually arguing about what to do with the space they have. Some floors declared independence from the rest. Some formed coalitions. Some just argue. The US Government Floors are the Hotel's most powerful territory and its most dysfunctional — a superpower that can't agree on a thermostat setting. Some say the US is the Hotel's landlord. Others say they're just squatters with paperwork.",
    lore: "They seized it. They legislated it. They stockpiled it. And they still can't agree on what to do with it. America.",
  },
  {
    id: "china",
    name: "The China Floors",
    floorRange: "Floors 2,500,000 – 2,900,000",
    tagline: "Banned It Seven Times. Built 400,000 Floors.",
    icon: "🐉",
    accent: "#DE2910",
    description: "China banned Bitcoin. Then they banned it again. And again. Seven times by most counts. Then they quietly accumulated 400,000 floors and told no one. The China Floors are sealed to outsiders, governed internally, and operated with a discipline that makes the Swiss look casual. The architecture is imposing, efficient, and deliberately opaque. Nobody knows what happens inside. The corridors are wide, the lighting is precise, and every surface communicates control. Visitors are not welcome. Diplomats are tolerated. The Ledger confirms the floors exist. China confirms nothing. By 2140, the China Floors are the Hotel's most powerful mystery — a territory that publicly rejected the Hotel for decades while privately becoming one of its largest residents.",
    lore: "They banned Bitcoin seven times. They hold 400,000 floors. Nobody sees the contradiction. That's the point.",
  },
  {
    id: "bhutan",
    name: "The Bhutan Floor",
    floorRange: "Floor 88,888",
    tagline: "They Mined It with Rivers and Sold Almost Everything",
    icon: "🙏",
    accent: "#FF6F00",
    description: "Bhutan mined Bitcoin with rivers — hydroelectric power turned into digital space — and then sold nearly every floor they built. Cycle after cycle, decade after decade. The money funded schools, hospitals, roads, and a Mindfulness City that still stands in the mountains of the old world, long buried under ice. By 2140, Bhutan holds exactly one floor. Floor 88,888, chosen for its number — auspicious in Buddhist tradition. What was once a cautionary tale became something else entirely. The single remaining floor is a monastery: meditation halls, prayer rooms, and gardens so meticulously maintained they function as living art. The population is approximately two hundred monks and nuns, plus a rotating group of pilgrims from every floor. The Bhutan Floor accepts no satoshis. It operates entirely on donation and barter. The monks teach meditation, philosophy, and breath training. But one floor can only hold so many souls — the monks limit visitors to small groups at a time, and the waiting list to enter stretches for months. Bhutan is the Hotel's most beloved resident: a nation that touched Bitcoin, used it wisely, sold almost everything, and turned what remained into the only place in the Hotel dedicated entirely to silence.",
    lore: "They mined with rivers. They sold almost everything. What they kept became the quietest floor in the Hotel. The waiting list to visit stretches for months.",
  },
  {
    id: "genesis",
    name: "The Genesis Floor",
    floorRange: "Top Floor — Sealed",
    tagline: "The Times 03/Jan/2009 Chancellor on Brink of Second Bailout for Banks",
    icon: "🖥️",
    accent: "#F7931A",
    description: "The first floor ever built. Block zero. The Genesis Floor sits at the very top of the Hotel, just beneath the roof and the Eternal Fire — because it was the first floor to exist, and the Hotel was built defying the laws of physics, growing downward from its origin. It is part of the Nakamoto Floors, permanently sealed. You can see it on the view screens — a single room, perfectly warm, perfectly still. Inside sits a computer and a newspaper. The newspaper is The Times, dated January 3, 2009. The headline reads: \"Chancellor on brink of second bailout for banks.\" Satoshi embedded that headline into the first block ever mined — a message to the future about why this was built. The computer sits beside it, silent, its work finished 131 years ago. No furniture. No decoration. Just the machine that started everything and the paper that explained why. Pilgrims come from every level of the Hotel to watch it on the view screens. Nobody has ever set foot inside. Nobody ever will. The Genesis Floor is not a home. It is a monument. The Hotel's first heartbeat, preserved at its crown forever.",
    lore: "A computer. A newspaper. A warm room no one will ever enter. The beginning of everything, at the top of everything, sealed shut for eternity.",
  },
  {
    id: "splinter",
    name: "The Splinter Floor",
    floorRange: "Floor 21,000 — 2 Owners",
    tagline: "99.99999% Isn't 100%",
    icon: "📍",
    accent: "#C8A96E",
    description: "Someone owns 99,999,999 satoshis of this floor. They have hallways, kitchens, a reading room, a garden, and a view screen the size of a wall. They are, by every reasonable measure, the owner. Except for the coffin rack. In the far corner — behind the garden, past the library, tucked against the east wall like a splinter the building can't cough up — there is a space roughly the size of a vending machine. It contains a cot, a blanket, and a person. One satoshi. One hundred millionth of the floor. A space so small you have to sleep with your arms at your sides. The 99.99999% owner has tried everything. Offered to buy the sat. Begged. Sent lawyers. Slid notes under the coffin rack door. The answer is always the same: no. The 1-sat resident isn't selling. They eat in the Lamp Market and come home to sleep in a space the width of their shoulders. They call it The Splinter. The 99.99999% owner can't renovate without consent from all sat-holders on the floor. The Ledger says two people own this floor, and the Ledger never lies. So every night, one of the wealthiest single-floor holders in the Hotel falls asleep knowing that someone is breathing on the other side of their wall, in a space the size of a coffin, owning one hundred millionth of everything they built — and smiling about it.",
    lore: "The 99.99999% owner can't renovate. The 1-sat resident can't be evicted. The Ledger never lies. The Splinter stays.",
  },
  {
    id: "schiff",
    name: "The Peter Schiff Floor",
    floorRange: "Floor 11,111 — Donated",
    tagline: "He Said the Hotel Would Collapse. Then He Moved In.",
    icon: "🏅",
    accent: "#FFD700",
    description: "Peter Schiff spent decades standing outside the Hotel screaming at the building. He called it a scam. He called it a bubble. He called it worthless. He told anyone who would listen that the only real shelter was gold. Shiny, heavy, beautiful gold. The Hotel would crumble, he said. Any day now. Any day. Any day never came. Eventually, the Bitcoin community — in what might be the greatest act of collective trolling in Hotel history — started donating satoshis to Peter Schiff. One by one. Thousands of people. A sat here, a sat there. He protested. He complained. He went on every view screen show that would have him and denounced the donations as worthless digital tokens. Then one morning he checked the Ledger and realized the worthless digital tokens added up to a floor. He moved in. Quietly. His descendants own the floor now and they're genuinely grateful. Every surface that can be gold is gold. Gold countertops. Gold door handles. A solid gold bust of Peter sits in the main corridor, polished daily. The most popular exhibit: a floor-to-ceiling gold-framed mirror, positioned in the exact spot where Peter reportedly spent his evenings staring at his own reflection and muttering about how the fundamentals would eventually prove him right. The plaque underneath reads: \"The fundamentals were wrong. The floor is warm. — The Schiff Family.\"",
    lore: "He said it would collapse. The community bought him a floor out of spite. His grandchildren say thank you every morning. The gold bust says nothing. It never did.",
  },
  {
    id: "adam-back",
    name: "The Adam Back Floors",
    floorRange: "Floors 230,000 – 255,000",
    tagline: "The Man Who Built the Foundation Before the Foundation Existed",
    icon: "⚙️",
    accent: "#7B68EE",
    description: "Adam Back invented Hashcash — the proof-of-work system that became the beating heart of the Hotel's construction. He was one of the first two people Satoshi ever contacted. Some say he is Satoshi. He's never confirmed it. He's never denied it. He just keeps building. By 2140, Back's 25,000 floors are among the most technically advanced in the Hotel — infrastructure that other floors depend on but rarely think about. Satellites, sidechains, mining systems — the plumbing of the building runs through his territory. Back doesn't give speeches. He doesn't hold rallies. He writes code. The Hotel stands on Hashcash the way a building stands on concrete. Most people don't think about concrete. Adam Back is fine with that.",
    lore: "Satoshi emailed two people. Adam Back was one of them. What he emailed back is the reason the Hotel exists.",
  },
  {
    id: "andreas",
    name: "The Andreas Antonopoulos Floor",
    floorRange: "Floors 2,100 – 2,250",
    tagline: "The Teacher Who Couldn't Afford a Floor",
    icon: "📚",
    accent: "#E8A838",
    description: "Andreas Antonopoulos spent years teaching the world about the Hotel. He wrote the technical manual — Mastering Bitcoin — that engineers used to build it. He gave hundreds of speeches. He explained the Ledger to senators. He made the Hotel make sense to people who had never heard of it. And he couldn't afford a floor. He sold his early keys to pay rent. He lived on donations and speaking fees. Then one day, a man with tens of thousands of floors publicly mocked him for being poor. The community responded. Over a thousand people sent Andreas satoshis. In three days, he had enough for a floor. He went offline, overwhelmed. By 2140, the Antonopoulos Floor is the Hotel's most visited single-person residence. Not because it's grand — it's modest, warm, full of books. Because every person who understood the Hotel well enough to check in learned it from Andreas. The floor was a gift. The knowledge was the real inheritance.",
    lore: "He taught millions how the Hotel worked. He couldn't afford to live in it. The Hotel bought him a floor anyway.",
  },
  {
    id: "saifedean",
    name: "The Saifedean Library",
    floorRange: "Floor 8,500",
    tagline: "The Book That Moved Nations",
    icon: "🏛️",
    accent: "#8B4513",
    description: "Saifedean Ammous didn't build the Hotel. He explained why it mattered. The Bitcoin Standard — published in 39 languages, read by millions — became the intellectual foundation for everything that followed. Michael Saylor read it and bought 1.1 million floors. Nayib Bukele's government hired Ammous as an economic advisor. Corporations, nations, and individuals who had never thought about Bitcoin read the book and checked in. By 2140, the Saifedean Library is the Hotel's great reading room. One floor. Modest. Quiet. Shelves stretching floor to ceiling, holding every edition, every translation. Students come from every floor cluster to study. The chairs are comfortable. The temperature is perfect. And the most important book in Hotel history sits on a pedestal in the center of the room, open to Chapter 1, where a Palestinian-Jordanian economist from a family of refugees explained to the world what sound money was and why it mattered. He didn't own many floors. He didn't need to. The book did the work.",
    lore: "Saylor read the book and bought a million floors. Bukele read the book and changed a nation. The book sits in the library. The library is one floor. It was enough.",
  },
  {
    id: "keiser",
    name: "The Max Keiser Floors",
    floorRange: "Floors 600,000 – 690,000 — Unverified",
    tagline: "The Loudest Man in the Hotel",
    icon: "📢",
    accent: "#FF4500",
    description: "Max Keiser screamed about Bitcoin from 2011 until the day he died. On television, on podcasts, on view screens, in the corridors of the El Salvador Floors where he lived with his wife Stacy Herbert. He started buying at $1. He claimed to hold 90,000 floors. Nobody could verify it. Nobody could shut him up. Keiser was Bukele's senior Bitcoin advisor — the American broadcaster who left everything behind and moved to El Salvador because he believed in the mission before anyone else did. By 2140, his descendants own the floors — however many there actually are — adjacent to the El Salvador cluster. The Keiser family inherited his conviction and his volume. They argue with anyone. They predict prices that sound insane until they happen. The Hotel's most divisive dynasty not named Satoshi. Half the Hotel thinks they're prophets. The other half wishes they'd lower their voices. They will not.",
    lore: "He yelled about the Hotel since it was three floors tall. He was right about everything. His grandchildren are still yelling.",
  },
  {
    id: "sterling",
    name: "The Sterling Floors",
    floorRange: "1,000 Floors — Ghost",
    tagline: "The Thousand Floor Heist",
    icon: "\uD83D\uDD73\uFE0F",
    accent: "#888",
    description: "The largest theft in Hotel history. The Sterlings were old money — a young couple, inexperienced, newly inherited, proud of a name they hadn't earned. They held 1,000 floors and treated them like furniture. Someone convinced them to take their keys out of cold storage. Someone convinced them to carry those keys during transit. The details are unclear — most people believe it was a variation of the oldest trick in the Hotel: lend me a floor and I'll give you two back. The keys were taken. All 1,000 of them. Ownership transferred on the Ledger. The Hotel has no central law enforcement — once the Ledger records a transfer, it's done. There is no undo. The Sterlings were forced to the Gutter. A once-proud dynasty name now means pity. Some descendants climbed out to the Steps. Many are still in the Gutter, telling their story to anyone who'll listen. The thief never moved into the floors. No activity has ever been detected. No lights changed. No doors opened. Most believe something happened to the thief before they could use the keys. The floors are Ghost Floors now — a thousand warm, lit, empty rooms that belong to someone who may no longer exist.",
    lore: "Never trust anyone with your keys. Never take them out of cold storage. The Sterlings did both. Look where they ended up.",
  },
  {
    id: "ag-belt",
    name: "The Agricultural Belt",
    floorRange: "Floors 5,000 – 20,000",
    tagline: "The Hotel's Stomach",
    icon: "\uD83C\uDF3E",
    accent: "#6B8E23",
    description: "The Hotel's food supply. Hydroponic farms, culture vats, engineered protein facilities, timber forests. Every floor in the Hotel depends on food coming from the Belt. Control the Belt, you control who eats. The Belt is fractured — some sections owned by nations, smaller portions held by individual farmers and family cooperatives that have worked the same floors for generations. There is no single authority governing the Belt. Small skirmishes have been fought over Belt territory for as long as anyone can remember. Sections have gained and lost influence over the years. No full-scale war has erupted — but the tension is always there. The Belt has its own culture. These are people who grow things in a building where nothing should grow. Engineers and botanists and laborers who smell like soil in a world of metal and recycled air. They're aware of their importance. They're not political. They're just glad they're not in the Gutter. But they know that without them, the Hotel starves.",
    lore: "Control the Belt, you control who eats. Everyone knows this. Nobody wants to be the one who tests it.",
  },
];

const GLOSSARY_DATA = [
  {
    term: "The Great Check-In",
    aka: "The Great Stampede",
    definition: "The Hotel was built slowly, over decades. Early arrivals checked in when floors were plentiful and cheap. They understood what they were buying. They stacked. They rose. Then — thirty years after the Hotel was already built — the rest of the world showed up at once. The Great Check-In was the day the majority of humanity tried to check in at the same time. The queues stretched for miles across the ice. People were crushed. Families were separated. Children were lost. In the panic, millions accepted whatever floor they could get — the lowest, the coldest, the most cramped. Some sold their keys for almost nothing to people who understood what the keys were worth. The Great Check-In is why 95% of humanity lives on Floors 1 through 3. They didn't choose the bottom. They arrived too late and got stuck there.",
  },
  {
    term: "Satoshis (Sats)",
    definition: "The Hotel's fundamental unit — not just of currency, but of space itself. A sat represents a unit of floor space. When you own sats, you own space in the Hotel. When you spend sats, you're trading the space you have for something else. This is why stacking matters: accumulating sats means accumulating room to live, room to breathe, room to rise. The people who understood this earliest own the most space. Everyone else is renting.",
  },
  {
    term: "The Ledger",
    definition: "The Hotel's immutable record of every transaction, every transfer, every ownership change since the beginning. The Ledger never lies. Any claim about who owns what can be verified instantly. Characters who lie about their history are always at risk of being checked. The Ledger is transparent, permanent, and merciless.",
  },
  {
    term: "Ghost Floors",
    definition: "Floors that are owned but uninhabited. Sealed, warm, empty. Millions of them exist throughout the Hotel. On the view screens, they appear as sealed doors — you know they're warm because the Ledger confirms they exist, but you can never see inside. Ghost Floors are the Hotel's most psychologically devastating feature — warmth you know exists behind doors that will never open. Some people watch Ghost Floor entrances obsessively. It drives them mad.",
  },
  {
    term: "The Eternal Fire",
    definition: "The visible crown of the Hotel — the combined thermal output of every mining rig in the building, rising upward and burning at the peak. The Fire is what keeps 21 million floors warm. The Firewalkers worship it as a conscious, living entity. The miners who maintain it know it burns because their machines are running. Sacred to some, mechanical to others, essential to all. The higher you go, the closer you get to the Fire, the warmer it becomes.",
  },
  {
    term: "View Screens",
    definition: "Screens available on every floor that display the public feed of any other floor in the Hotel. By default, a view screen shows the entrance of a floor — the exterior, the door, maybe a lobby. The interior of a floor is private, accessible only with the private key. Floor owners can choose to broadcast their interior feed publicly — the El Salvador Floors show their plazas and gardens, while the China Floors show nothing but a sealed door. Ghost Floors appear only as sealed doors. You know they're warm because the Ledger confirms they exist, but you can never see inside. The Genesis Floor has never broadcast its interior. The stories about what's inside have been passed down since the beginning. Nobody has ever actually seen the room on a screen.",
  },
  {
    term: "The Cult of Regret",
    definition: "The pervasive condition among Bottom Floor residents who sold, traded, or lost their keys during the Great Check-In. They know exactly what their floor would be worth now. They've done the math a thousand times. The view screens make it worse — they can watch their old floors, warm and empty, any time they want. Regret is the Bottom Floor's most common affliction, and there's no treatment.",
  },
  {
    term: "Laszlo's",
    definition: "The Hotel's most famous pizza chain, named after Laszlo Hanyecz — the man who traded 10,000 Bitcoin for two pizzas in the old world. Laszlo's locations exist on every floor cluster in the Hotel. On the Gutter, a Laszlo's pizza tastes like cardboard with cheap cheese and thin tomato sauce. As you rise, the quality rises with you — better ingredients, better ovens, better everything. On the El Salvador Floors, a Laszlo's pizza is made with real tomatoes, real cheese, and dough that someone actually kneaded by hand. Same name. Same logo. Completely different experience depending on where you are. May 22nd is Pizza Day throughout the Hotel — a minor holiday, the kind of thing people know about but don't go out of their way to celebrate. Good marketing for Laszlo's. That's about it.",
  },
  {
    term: "The Firewalkers",
    definition: "A religious cult centered on the Eternal Fire. The Firewalkers believe the Fire is conscious — a living entity that rewards the faithful with warmth and punishes the faithless with cold. Their rituals involve meditation on heat, breath exercises, and pilgrimages upward to floors as close to the Fire as they can reach. They are the Hotel's largest spiritual movement and one of its most devoted. Their temples burn artificial flames on every level. Their greeting is a whisper: \"The Fire sees.\"",
  },
  {
    term: "The Halving",
    definition: "The Hotel's most watched recurring event. Periodically, the rate at which new sats enter the economy is cut in half. The Halving reshapes power, trade, and politics every time it occurs. It's part economic event, part holiday, part existential crisis.",
  },
  {
    term: "Express Shafts",
    definition: "High-speed elevators that travel between major floor clusters without stopping. An Express can cover 10,000 floors in roughly twenty minutes. Access requires a transit pass that Bottom Floor residents can almost never afford. The elevator system is not a transportation network — it's a class barrier.",
  },
  {
    term: "Lightning",
    definition: "The Hotel's everyday payment layer. Fast, cheap, constant. You use Lightning to buy a Laszlo's pizza, pay for a Local Lift pass, tip a musician in a stairwell, settle a debt at a bar, send sats to a friend three thousand floors away. Lightning moves sats instantly without touching the Ledger. The Ledger tracks ownership — who holds which floors. Lightning tracks life. The Gutter does not use Lightning. The Gutter barters. This is one of the deepest structural barriers in the Hotel — the Gutter is disconnected from the digital economy that powers everything above it. Moving from barter to Lightning is one of the markers of climbing out.",
  },
  {
    term: "The Cold",
    definition: "The Cold didn't arrive all at once. It started in 1971, when the United States severed the dollar from gold. For decades, the petrodollar held things together — global powers \"controlling the weather\" with trade deals, sanctions, wars, and debt. Every time they printed more money, the temperature dropped. Then the petrodollar collapsed. The furnace died. And the Cold came all at once. The Cold is what happens when bad monetary policy compounds for seventy years and finally comes due. It isn't just weather. It's the consequence of a world that spent decades lying about the value of its money. Outside the Hotel, the Cold persists. Inside, warmth rises with the floors.",
  },
  {
    term: "Cold Storage",
    definition: "The most important security concept in the Hotel. Cold storage means keeping your keys offline, disconnected, locked in a physical vault that only you can access. The keys are not on your person. They are not on a device. They are in a place. The people who keep their keys in cold storage are the ones nobody can kidnap — because even if you take the person, the keys aren't on them. The Sterlings didn't understand this. They took their keys out of cold storage. They carried them during transit. They lost everything.",
  },
  {
    term: "The Expansionists",
    definition: "A faction that believes more floors can be created beyond the 21 million cap. They think the cap is a choice, not a law of physics. They work toward this goal by any means necessary — political campaigns to convince floor holders to change the protocol (always fail), and technical expeditions searching for backdoors in the Hotel's original code (always fail). Most of the Hotel considers them delusional. But they see 95% of humanity crammed into the Gutter and believe, with desperate conviction, that the answer is more room.",
  },
  {
    term: "The Ghost Floor Breakers",
    definition: "A faction that accepts the 21 million cap but wants to open the 3.7 million Lost Floors. Their methods: brute-force key cracking (never works), quantum computing research (never works), exploring the old world for lost keys, and tracking down descendants of original owners. Their only successes come from kidnapping high-net-worth individuals and extracting keys under threat of violence. Because of this, most of the Hotel views them as a terrorist organization. When they successfully extract a key, they keep the floor for themselves. They have never once opened a floor to the public. The idealism is a recruitment tool. The reality is theft.",
  },
  {
    term: "Geopolitical Tensions",
    definition: "Floor clusters have disputed borders, unresolved territorial claims, and histories of conflict. The Ledger records when floors change hands. It does not record why. Rumors persist of floors seized by force and transfers made under duress — the most persistent being whispers that the United States quietly took Venezuela's floors in an operation never officially disclosed. Food and water are the Hotel's deepest sources of tension. The Agricultural Belt feeds the building. The water extraction systems at the ground level hydrate it. Any disruption to either threatens every floor.",
  },
  {
    term: "The Thousand Floor Heist",
    definition: "The largest theft in Hotel history. The Sterlings — a young, inexperienced couple who inherited 1,000 floors — were tricked into removing their keys from cold storage during transit. The keys were taken. All 1,000 of them. The Hotel has no central law enforcement — once the Ledger records a transfer, it's done. The Sterlings were forced to the Gutter. The thief never moved into the floors. No activity has ever been detected. Most believe something happened to the thief before they could use the keys. The floors are Ghost Floors now. The Hotel's bleakest warning: never trust anyone with your keys.",
  },
  {
    term: "Corporate Estates",
    definition: "By 2140, the Hotel's largest corporate floor holders are no longer companies in any meaningful sense. They are feudal estates. The language is still corporate — CEOs, Boards, shareholders — but the reality is medieval. Tenants on corporate floors are bound by contracts and obligations. They cannot simply leave. In exchange, they receive warmth, food, security, and a standard of living far above the Gutter. They are the Hotel's middle class: comfortable but trapped. The estates compete with each other for talent — a skilled engineer on one estate might be recruited to another with a better contract. Every estate has its own rules, its own culture, its own version of justice.",
  },
  {
    term: "Mining (Miners)",
    definition: "The Hotel runs because miners run. Across every floor cluster, in every nation and corporate estate, machines grind through the mathematical work that verifies Ledger transactions and secures Lightning payments. The computation generates heat. That heat rises. The Eternal Fire at the Hotel's crown is the combined thermal output of every mining rig in the building. The math keeps ownership honest. The heat keeps people alive. Same machines, both functions, inseparable. Miners are decentralized — no single entity controls them. Nations, corporations, and individuals all run rigs, and the balance of power shifts with whoever can direct the most energy. Bhutan mined with rivers. The Strategy Floors run industrial operations. Independent miners in the mid-floors keep small rigs humming in back rooms. No strike can kill the Fire — shut down one operation and the others keep burning. By 2140, all 21 million floors are built. Miners no longer earn new floors. They earn transaction fees — sats paid every time ownership transfers on the Ledger or Lightning processes a payment. The Hotel's warmth is not free. Someone is always paying for it, and someone is always working to produce it. Nations and corporations that mine at industrial scale don't just earn more sats — they have a hand on the speed dial of everyone else's economy. Miners choose which transactions to verify and in what order. A nation with enough hash power can prioritize its own transfers and its allies', slow a rival's commerce to a crawl, or offer fast processing as a diplomatic bargaining chip. It is the Hotel's version of what the petrodollar did in the old world — control the flow of money, control the world. The difference is decentralization. No single nation can dominate it. But the nations with the most energy will always come closest.",
  },
];



/* ─── Shared Components (unchanged from original) ─── */

function Embers() {
  const ref = useRef(null);
  const anim = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let w, h;
    const resize = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const P = Array.from({ length: 90 }, () => ({
      x: Math.random(), y: Math.random(), r: 0.4 + Math.random() * 2.2,
      sp: 0.0004 + Math.random() * 0.0012, dr: (Math.random() - 0.5) * 0.0004,
      a: 0.08 + Math.random() * 0.35, hue: Math.random(), ph: Math.random() * 6.28,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const t = Date.now() * 0.001;
      for (const p of P) {
        p.y -= p.sp; p.x += p.dr + Math.sin(t + p.ph) * 0.00015;
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        const tw = 0.5 + 0.5 * Math.sin(t * 1.5 + p.ph * 4);
        const a = p.a * tw;
        const col = p.hue < 0.5 ? `rgba(247,147,26,${a})` : p.hue < 0.8 ? `rgba(255,200,60,${a})` : `rgba(255,100,20,${a * 0.6})`;
        const g = ctx.createRadialGradient(p.x * w, p.y * h, 0, p.x * w, p.y * h, p.r * 7);
        g.addColorStop(0, col); g.addColorStop(1, "rgba(247,147,26,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.r * 7, 0, Math.PI * 2); ctx.fill();
      }
      anim.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(anim.current); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

function Noise({ o = 0.04 }) {
  return <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", opacity: o, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px" }} />;
}

function Support() {
  const [ok, setOk] = useState(false);
  const cp = () => { navigator.clipboard?.writeText(BTC_ADDRESS).then(() => { setOk(true); setTimeout(() => setOk(false), 2000); }); };
  return (
    <div style={{ padding: "20px 24px", background: "rgba(247,147,26,0.05)", borderTop: "1px solid rgba(247,147,26,0.08)", textAlign: "center", position: "relative", zIndex: 2 }}>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: 8 }}>SUPPORT THIS PROJECT</div>
      <div onClick={cp} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "rgba(247,147,26,0.08)", border: "1px solid rgba(247,147,26,0.15)", borderRadius: 6, cursor: "pointer" }}>
        <span style={{ fontSize: 14, color: ORANGE }}>₿</span>
        <span style={{ fontSize: 11, color: ORANGE, fontFamily: "'SF Mono','Fira Code',monospace", opacity: 0.8, maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{BTC_ADDRESS}</span>
        <span style={{ fontSize: 10, color: ok ? "#4ade80" : "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>{ok ? "✓ COPIED" : "COPY"}</span>
      </div>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.12)", fontFamily: "monospace", marginTop: 8 }}>every sat supports the universe</div>
    </div>
  );
}

function Glow({ h = 400, o = 0.08 }) {
  return <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: h, background: `radial-gradient(ellipse at top, rgba(247,147,26,${o}) 0%, transparent 70%)`, zIndex: 1, pointerEvents: "none" }} />;
}

function Meta({ label, value }) {
  return <div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: 2 }}>{label}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>{value}</div></div>;
}

function Stat({ label, value }) {
  return <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: 16 }}>
    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 16, color: ORANGE, fontFamily: "'Georgia',serif", fontWeight: 600 }}>{value}</div>
  </div>;
}

/* ─── Splash (unchanged) ─── */

function Splash({ onEnter }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 100); }, []);
  return (
    <div onClick={onEnter} style={{ minHeight: "100vh", background: ORANGE, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", cursor: "pointer" }}>
      <Embers /><Noise o={0.06} />
      <div style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transition: "all 1.2s cubic-bezier(0.22,1,0.36,1)", textAlign: "center", zIndex: 2 }}>
        <div style={{ fontSize: "clamp(14px,2.5vw,18px)", letterSpacing: "0.3em", color: DARK, opacity: 0.5, fontFamily: "monospace", marginBottom: 24 }}>₿ 21,000,000</div>
        <h1 style={{ fontSize: "clamp(48px,10vw,120px)", fontWeight: 900, color: DARK, lineHeight: 0.9, fontFamily: "'Georgia',serif", margin: "0 0 8px", letterSpacing: "-0.03em" }}>THE 21M</h1>
        <h1 style={{ fontSize: "clamp(48px,10vw,120px)", fontWeight: 900, color: DARK, lineHeight: 0.9, fontFamily: "'Georgia',serif", margin: "0 0 32px", letterSpacing: "-0.03em" }}>HOTEL</h1>
        <div style={{ width: 60, height: 2, background: DARK, opacity: 0.3, margin: "0 auto 24px" }} />
        <div style={{ fontSize: "clamp(16px,3vw,24px)", fontWeight: 600, color: DARK, opacity: 0.7, fontFamily: "'Georgia',serif", letterSpacing: "0.15em" }}>N E X U S</div>
      </div>
      <div style={{ position: "absolute", bottom: 40, opacity: v ? 0.4 : 0, transition: "opacity 2s ease 1.5s", fontSize: 13, color: DARK, fontFamily: "monospace", letterSpacing: "0.2em", animation: "pulse 2s ease-in-out infinite" }}>TAP TO ENTER</div>
      <style>{`@keyframes pulse{0%,100%{opacity:.4}50%{opacity:.15}}`}</style>
    </div>
  );
}

/* ─── Hub (restructured) ─── */

function Hub({ onSelect }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 50); }, []);
  return (
    <div style={{ minHeight: "100vh", background: DARK, position: "relative", overflow: "hidden" }}>
      <Embers /><Noise /><Glow />
      <div style={{ padding: "48px 24px 24px", textAlign: "center", position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.4em", color: ORANGE, opacity: 0.6, fontFamily: "monospace", marginBottom: 12 }}>TRANSMEDIA UNIVERSE</div>
        <h1 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 4px", letterSpacing: "-0.02em" }}>THE 21M HOTEL</h1>
        <div style={{ fontSize: "clamp(14px,2.5vw,18px)", fontWeight: 600, color: ORANGE, opacity: 0.8, fontFamily: "'Georgia',serif", letterSpacing: "0.12em" }}>NEXUS</div>
        <div style={{ width: 40, height: 1, background: ORANGE, opacity: 0.3, margin: "20px auto 0" }} />
      </div>
      <div style={{ textAlign: "center", padding: "16px 24px 32px", opacity: v ? 0.5 : 0, transition: "opacity 1s ease .3s", position: "relative", zIndex: 2 }}>
        <p style={{ fontSize: 14, color: "#fff", fontFamily: "'Georgia',serif", fontStyle: "italic", lineHeight: 1.6, maxWidth: 420, margin: "0 auto" }}>One world. Every medium. Choose your entry point.</p>
      </div>

      {/* Featured sections above media */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "0 24px 12px", maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {[
          { id: "floors", icon: "🏨", label: "THE FLOORS", desc: "Know the Building", count: "29 FLOORS" },
          { id: "glossary", icon: "📜", label: "GLOSSARY", desc: "Hotel Lexicon", count: "20 TERMS" },
          { id: "fire", icon: "🔥", label: "THE FIRE", desc: "Live from the Chain", count: "LIVE" },
          { id: "findfloor", icon: "🗝", label: "FIND YOUR FLOOR", desc: "Where Do You Live?", count: "CHECK IN" },
          { id: "hoteltoday", icon: "🌐", label: "THE HOTEL TODAY", desc: "Who Owns the Building?", count: "LIVE" },
          { id: "tower", icon: "🏢", label: "THE HOTEL", desc: "See the Building", count: "VISUAL" },
        ].map((item, i) => (
          <div key={item.id} onClick={() => onSelect(item.id)} style={{
            background: "rgba(247,147,26,0.04)", border: "1px solid rgba(247,147,26,0.15)", borderRadius: 8,
            padding: "24px 12px 20px", textAlign: "center", cursor: "pointer",
            opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)",
            transition: `all .5s cubic-bezier(.22,1,.36,1) ${i * .08}s`,
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "'Georgia',serif", letterSpacing: ".08em", marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{item.desc}</div>
            <div style={{ marginTop: 10, display: "inline-block", padding: "3px 10px", background: "rgba(247,147,26,0.15)", borderRadius: 20, fontSize: 10, color: ORANGE, fontFamily: "monospace", fontWeight: 600 }}>{item.count}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 700, margin: "12px auto 16px", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
      </div>

      {/* Media grid with brighter locked tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, padding: "0 24px 40px", maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {MEDIA.map((m, i) => {
          const locked = !m.active;
          return (
            <div key={m.id} onClick={() => m.active && onSelect(m.id)} style={{
              background: locked ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.03)",
              border: "1px solid", borderColor: locked ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)",
              borderRadius: 8, padding: "28px 16px 20px", textAlign: "center",
              cursor: locked ? "default" : "pointer",
              opacity: v ? (locked ? 0.7 : 1) : 0,
              transform: v ? "translateY(0)" : "translateY(20px)",
              transition: `all .5s cubic-bezier(.22,1,.36,1) ${(i + 3) * .08}s`, position: "relative",
            }}>
              {locked && <div style={{ position: "absolute", top: 8, right: 8, fontSize: 9, color: "rgba(247,147,26,0.5)", fontFamily: "monospace", fontWeight: 600 }}>SOON</div>}
              <div style={{ fontSize: 28, marginBottom: 10, opacity: locked ? 0.65 : 1 }}>{m.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: locked ? "rgba(255,255,255,0.55)" : "#fff", fontFamily: "'Georgia',serif", letterSpacing: ".1em", marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 11, color: locked ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{m.desc}</div>
              {m.count > 0 && <div style={{ marginTop: 10, display: "inline-block", padding: "3px 10px", background: "rgba(247,147,26,0.15)", borderRadius: 20, fontSize: 10, color: ORANGE, fontFamily: "monospace", fontWeight: 600 }}>{m.count} {m.count === 1 ? "TITLE" : "TITLES"}</div>}
            </div>
          );
        })}
      </div>
      <Support />
      <div style={{ textAlign: "center", padding: "20px 24px 40px", position: "relative", zIndex: 2 }}>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.12)", fontFamily: "monospace", letterSpacing: ".15em" }}>21,000,000 FLOORS · ONE FIRE · INFINITE STORIES</p>
      </div>
    </div>
  );
}

/* ─── Tales Screen ─── */

function TalesScreen({ onBack, onPick }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 50); }, []);
  return (
    <div style={{ minHeight: "100vh", background: DARK, position: "relative", overflow: "hidden" }}>
      <Embers /><Noise /><Glow h={300} o={0.06} />
      <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 2 }}>
        <button onClick={onBack} style={{ background: "rgba(0,0,0,.4)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, color: "rgba(255,255,255,.5)", padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: "monospace" }}>← NEXUS</button>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.2)", fontFamily: "monospace" }}>/ TALES</span>
      </div>
      <div style={{ textAlign: "center", padding: "20px 24px 40px", position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>✍️</div>
        <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Tales from the Hotel</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", fontFamily: "'Georgia',serif", fontStyle: "italic" }}>Short stories set across the floors</p>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,.15)", fontFamily: "monospace", marginTop: 10, lineHeight: 1.6, maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>Each tale is a window into a different floor, a different life. Read them in any order.</p>
      </div>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 24px 40px", position: "relative", zIndex: 2 }}>
        {TALES_DATA.map((tale, i) => (
          <div key={tale.id} onClick={() => onPick(tale)} style={{
            background: "rgba(247,147,26,0.04)", border: "1px solid rgba(247,147,26,0.15)", borderRadius: 10, padding: 24, cursor: "pointer",
            opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: `all .6s cubic-bezier(.22,1,.36,1) ${i * .08}s`, marginBottom: 12,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 4px" }}>{tale.title}</h3>
                <div style={{ fontSize: 11, color: ORANGE, fontFamily: "monospace", letterSpacing: ".1em", opacity: .8 }}>{tale.subtitle.toUpperCase()}</div>
              </div>
              <div style={{ padding: "4px 10px", background: "rgba(247,147,26,.15)", borderRadius: 20, fontSize: 10, color: ORANGE, fontFamily: "monospace", fontWeight: 600, whiteSpace: "nowrap" }}>{tale.words} WORDS</div>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", fontFamily: "'Georgia',serif", lineHeight: 1.6, margin: "0 0 12px", fontStyle: "italic" }}>{tale.teaser}</p>
            <div style={{ display: "flex", gap: 16 }}>
              <Meta label="FLOOR" value={tale.floor} />
            </div>
          </div>
        ))}
        <div style={{ border: "1px dashed rgba(255,255,255,.08)", borderRadius: 10, padding: 32, textAlign: "center", marginTop: 16, opacity: v ? 1 : 0, transition: "opacity .6s ease .4s" }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.15)", fontFamily: "monospace", letterSpacing: ".1em" }}>MORE TALES COMING</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.08)", fontFamily: "monospace", marginTop: 8 }}>The Hotel has 21,000,000 floors. We've barely begun.</div>
        </div>
      </div>
      <Support />
    </div>
  );
}

/* ─── Tale Detail (reading view) ─── */

function TaleDetail({ tale, onBack }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 50); window.scrollTo(0, 0); }, []);
  return (
    <div style={{ minHeight: "100vh", background: DARK, position: "relative", overflow: "hidden" }}>
      <Noise />
      <div style={{ position: "relative", height: 160, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center top,rgba(247,147,26,.12),rgba(247,147,26,.02) 60%,transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: `linear-gradient(to top,${DARK},transparent)` }} />
        <button onClick={onBack} style={{ position: "absolute", top: 20, left: 20, background: "rgba(0,0,0,.5)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, color: "rgba(255,255,255,.6)", padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: "monospace", zIndex: 3 }}>← BACK</button>
      </div>
      <div style={{ maxWidth: 600, margin: "-40px auto 0", padding: "0 24px 60px", position: "relative", zIndex: 2, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: "all .6s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, color: ORANGE, fontFamily: "monospace", letterSpacing: ".15em", marginBottom: 8, opacity: .7 }}>TALES FROM THE 21M HOTEL</div>
          <h1 style={{ fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 6px", lineHeight: 1.1 }}>{tale.title}</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.4)", fontFamily: "'Georgia',serif", fontStyle: "italic", margin: "0 0 16px" }}>{tale.subtitle}</p>
          <div style={{ fontSize: 16, color: ORANGE, opacity: 0.4 }}>─── ₿ ───</div>
        </div>
        <div>
          {tale.content.map((para, i) => {
            if (para === "---") return (
              <div key={i} style={{ textAlign: "center", margin: "32px 0", fontSize: 16, color: ORANGE, opacity: 0.3 }}>─── ₿ ───</div>
            );
            const isShortDialogue = para.startsWith("\u201C") && para.length < 80;
            return (
              <p key={i} style={{
                fontSize: 16, color: "rgba(255,255,255,.75)", fontFamily: "'Georgia',serif",
                lineHeight: 1.85, margin: isShortDialogue ? "0 0 8px" : "0 0 20px",
                textIndent: isShortDialogue ? 0 : 24,
              }}>{para}</p>
            );
          })}
        </div>
        <div style={{ textAlign: "center", marginTop: 48, marginBottom: 32 }}>
          <div style={{ fontSize: 16, color: ORANGE, opacity: 0.3 }}>─── ₿ ───</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.15)", fontFamily: "monospace", letterSpacing: ".12em", marginBottom: 12 }}>FLOOR</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)", fontFamily: "monospace" }}>{tale.floor}</div>
        </div>
        {tale.file && (
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <a href={`/tales/${tale.file}`} download={tale.file} style={{
              display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
              background: ORANGE, border: "none", color: DARK, padding: "12px 28px", borderRadius: 6,
              cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "monospace", letterSpacing: ".05em",
            }}>↓ DOWNLOAD PDF</a>
          </div>
        )}
      </div>
      <Support />
    </div>
  );
}

/* ─── BookList (locked — placeholder for future) ─── */

function BookList({ onBack, onPick }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 50); }, []);
  return (
    <div style={{ minHeight: "100vh", background: DARK, position: "relative", overflow: "hidden" }}>
      <Embers /><Noise /><Glow h={300} o={0.06} />
      <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 2 }}>
        <button onClick={onBack} style={{ background: "rgba(0,0,0,.4)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, color: "rgba(255,255,255,.5)", padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: "monospace" }}>← NEXUS</button>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.2)", fontFamily: "monospace" }}>/ BOOKS</span>
      </div>
      <div style={{ textAlign: "center", padding: "20px 24px 40px", position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>📖</div>
        <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Books</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", fontFamily: "'Georgia',serif", fontStyle: "italic" }}>Novels and novellas set in The 21M Hotel</p>
      </div>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 24px 40px", position: "relative", zIndex: 2 }}>
        {BOOKS.map((b, i) => (
          <div key={b.id} onClick={() => onPick(b)} style={{
            background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 10, padding: 24, cursor: "pointer",
            opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: `all .6s cubic-bezier(.22,1,.36,1) ${i * .08}s`, marginBottom: 12,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 4px" }}>{b.title}</h3>
                <div style={{ fontSize: 11, color: ORANGE, fontFamily: "monospace", letterSpacing: ".1em", opacity: .8 }}>{b.genre.toUpperCase()}</div>
              </div>
              <div style={{ padding: "4px 10px", background: "rgba(247,147,26,.15)", borderRadius: 20, fontSize: 10, color: ORANGE, fontFamily: "monospace", fontWeight: 600, whiteSpace: "nowrap" }}>{b.words} WORDS</div>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", fontFamily: "'Georgia',serif", lineHeight: 1.6, margin: "0 0 16px", fontStyle: "italic" }}>"{b.tagline}"</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", fontFamily: "'Georgia',serif", lineHeight: 1.6, margin: 0 }}>{b.description}</p>
            <div style={{ display: "flex", gap: 16, marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.05)", flexWrap: "wrap" }}>
              <Meta label="FLOORS" value={b.floor} /><Meta label="HEAT" value={b.heat} /><Meta label="CHAPTERS" value={b.chapters} /><Meta label="BIBLE" value={b.bible} />
            </div>
          </div>
        ))}
        <div style={{ border: "1px dashed rgba(255,255,255,.08)", borderRadius: 10, padding: 32, textAlign: "center", marginTop: 16, opacity: v ? 1 : 0, transition: "opacity .6s ease .4s" }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.15)", fontFamily: "monospace", letterSpacing: ".1em" }}>MORE STORIES COMING</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.08)", fontFamily: "monospace", marginTop: 8 }}>The Hotel has 21,000,000 floors. We've barely begun.</div>
        </div>
      </div>
      <Support />
    </div>
  );
}

/* ─── BookDetail (unchanged) ─── */

function BookDetail({ book, onBack }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 50); }, []);
  return (
    <div style={{ minHeight: "100vh", background: DARK, position: "relative", overflow: "hidden" }}>
      <Embers /><Noise />
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center top,rgba(247,147,26,.15),rgba(247,147,26,.03) 60%,transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: `linear-gradient(to top,${DARK},transparent)` }} />
        <button onClick={onBack} style={{ position: "absolute", top: 20, left: 20, background: "rgba(0,0,0,.5)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, color: "rgba(255,255,255,.6)", padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: "monospace", zIndex: 3 }}>← BACK</button>
      </div>
      <div style={{ maxWidth: 600, margin: "-60px auto 0", padding: "0 24px 40px", position: "relative", zIndex: 2, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: "all .6s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ fontSize: 11, color: ORANGE, fontFamily: "monospace", letterSpacing: ".15em", marginBottom: 8, opacity: .7 }}>{book.genre.toUpperCase()}</div>
        <h1 style={{ fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 8px", lineHeight: 1.1 }}>{book.title}</h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,.5)", fontFamily: "'Georgia',serif", fontStyle: "italic", margin: "0 0 24px", lineHeight: 1.5 }}>{book.tagline}</p>
        <div style={{ marginBottom: 32 }}>
          <a href={`/books/${book.file}`} download={book.file} style={{
            display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
            background: ORANGE, border: "none", color: DARK, padding: "14px 32px", borderRadius: 6,
            cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "monospace", letterSpacing: ".05em",
          }}>↓ DOWNLOAD BOOK</a>
        </div>
        <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 10, padding: 24, marginBottom: 20 }}>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.6)", fontFamily: "'Georgia',serif", lineHeight: 1.7, margin: 0 }}>{book.description}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          <Stat label="FLOOR RANGE" value={book.floor} /><Stat label="TEMPERATURE" value={book.heat} />
          <Stat label="CHAPTERS" value={book.chapters} /><Stat label="WORD COUNT" value={book.words} />
          <Stat label="CANON BIBLE" value={book.bible?.toUpperCase()} />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {book.themes.map(t => <span key={t} style={{ padding: "5px 12px", background: "rgba(247,147,26,.08)", border: "1px solid rgba(247,147,26,.15)", borderRadius: 20, fontSize: 11, color: "rgba(247,147,26,.7)", fontFamily: "monospace" }}>{t}</span>)}
        </div>
      </div>
      <Support />
    </div>
  );
}

/* ─── Floors Explorer ─── */

function FloorsList({ onBack }) {
  const [v, setV] = useState(false);
  const [selected, setSelected] = useState(null);
  const detailRef = useRef(null);
  useEffect(() => { setTimeout(() => setV(true), 50); }, []);
  useEffect(() => {
    if (selected && detailRef.current) {
      setTimeout(() => detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  }, [selected]);
  const sel = FLOORS_DATA.find(f => f.id === selected);

  return (
    <div style={{ minHeight: "100vh", background: DARK, position: "relative", overflow: "hidden" }}>
      <Embers /><Noise /><Glow h={300} o={0.06} />
      <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 2 }}>
        <button onClick={onBack} style={{ background: "rgba(0,0,0,.4)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, color: "rgba(255,255,255,.5)", padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: "monospace" }}>← NEXUS</button>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.2)", fontFamily: "monospace" }}>/ THE FLOORS</span>
      </div>
      <div style={{ textAlign: "center", padding: "20px 24px 40px", position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🏨</div>
        <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Get to Know the Floors</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", fontFamily: "'Georgia',serif", fontStyle: "italic" }}>The Hotel is twenty-one million floors of civilization stacked on ice</p>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,.15)", fontFamily: "monospace", marginTop: 10, lineHeight: 1.6, maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>The 21M Hotel is set in 2140, when all 21 million floors have been built. Everything here is fantasy, prediction, and hope for the future.</p>
      </div>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 24px 40px", position: "relative", zIndex: 2 }}>
        {FLOORS_DATA.map((floor, i) => (
          <div key={floor.id} onClick={() => setSelected(selected === floor.id ? null : floor.id)} style={{
            background: selected === floor.id ? "rgba(247,147,26,0.04)" : "rgba(255,255,255,.02)",
            border: "1px solid", borderColor: selected === floor.id ? "rgba(247,147,26,0.2)" : "rgba(255,255,255,.06)",
            borderRadius: 10, padding: "18px 20px", cursor: "pointer",
            opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)",
            transition: `all .6s cubic-bezier(.22,1,.36,1) ${i * .06}s`, marginBottom: 10,
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <span style={{ fontSize: 28, width: 36, textAlign: "center", flexShrink: 0 }}>{floor.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: selected === floor.id ? floor.accent : "#fff", fontFamily: "'Georgia',serif", margin: "0 0 3px", transition: "color 0.3s" }}>{floor.name}</h3>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)", fontFamily: "monospace", letterSpacing: ".08em" }}>{floor.floorRange}</div>
            </div>
            <span style={{ color: "rgba(255,255,255,.15)", fontSize: 18, transform: selected === floor.id ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.3s", flexShrink: 0 }}>›</span>
          </div>
        ))}
        {sel && (
          <div ref={detailRef} style={{ marginTop: 8, background: "rgba(255,255,255,.02)", border: `1px solid ${sel.accent}33`, borderRadius: 10, padding: "28px 24px", animation: "floorFadeIn 0.4s ease" }}>
            <style>{`@keyframes floorFadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
              <span style={{ fontSize: 36 }}>{sel.icon}</span>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: sel.accent, fontFamily: "'Georgia',serif", margin: 0 }}>{sel.name}</h3>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)", fontFamily: "monospace", letterSpacing: ".08em", marginTop: 2 }}>{sel.floorRange}</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.45)", fontFamily: "'Georgia',serif", fontStyle: "italic", margin: "8px 0 20px" }}>{sel.tagline}</p>
            <div style={{ width: 30, height: 1, background: `${sel.accent}44`, marginBottom: 20 }} />
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", fontFamily: "'Georgia',serif", lineHeight: 1.75, margin: "0 0 20px" }}>{sel.description}</p>
            <div style={{ background: "rgba(0,0,0,.3)", borderLeft: `2px solid ${sel.accent}44`, padding: "14px 18px", borderRadius: "0 6px 6px 0" }}>
              <p style={{ fontSize: 13, fontStyle: "italic", color: "rgba(255,255,255,.4)", lineHeight: 1.7, margin: 0, fontFamily: "'Georgia',serif" }}>{sel.lore}</p>
            </div>
            {sel.link && (
              <a href={sel.link.url} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20,
                padding: "12px 24px", background: "rgba(247,147,26,0.1)", border: `1px solid ${sel.accent}44`,
                borderRadius: 6, color: sel.accent, fontSize: 11, fontFamily: "monospace", fontWeight: 600,
                letterSpacing: ".05em", textDecoration: "none",
              }}>{sel.link.label}</a>
            )}
          </div>
        )}
      </div>
      <Support />
    </div>
  );
}

/* ─── Glossary ─── */

function GlossaryEntry({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: open ? "rgba(247,147,26,0.03)" : "rgba(255,255,255,.02)",
      border: "1px solid", borderColor: open ? "rgba(247,147,26,0.15)" : "rgba(255,255,255,.06)",
      borderRadius: 10, marginBottom: 8, transition: "all 0.2s ease", overflow: "hidden",
    }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <span style={{ fontSize: 17, fontWeight: 700, color: open ? ORANGE : "#fff", fontFamily: "'Georgia',serif", transition: "color 0.2s" }}>{item.term}</span>
          {item.aka && <span style={{ fontSize: 10, color: "rgba(255,255,255,.25)", fontFamily: "monospace", marginLeft: 10 }}>aka "{item.aka}"</span>}
        </div>
        <span style={{ color: "rgba(255,255,255,.15)", fontSize: 18, transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}>›</span>
      </div>
      {open && (
        <div style={{ padding: "0 20px 20px", animation: "floorFadeIn 0.3s ease" }}>
          <div style={{ width: 24, height: 1, background: "rgba(247,147,26,0.2)", marginBottom: 14 }} />
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", fontFamily: "'Georgia',serif", lineHeight: 1.75, margin: 0 }}>{item.definition}</p>
        </div>
      )}
    </div>
  );
}

function GlossaryScreen({ onBack }) {
  const [v, setV] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => { setTimeout(() => setV(true), 50); }, []);
  const filtered = GLOSSARY_DATA.filter(item =>
    item.term.toLowerCase().includes(search.toLowerCase()) ||
    item.definition.toLowerCase().includes(search.toLowerCase()) ||
    (item.aka && item.aka.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div style={{ minHeight: "100vh", background: DARK, position: "relative", overflow: "hidden" }}>
      <Embers /><Noise /><Glow h={300} o={0.06} />
      <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 2 }}>
        <button onClick={onBack} style={{ background: "rgba(0,0,0,.4)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, color: "rgba(255,255,255,.5)", padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: "monospace" }}>← NEXUS</button>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.2)", fontFamily: "monospace" }}>/ GLOSSARY</span>
      </div>
      <div style={{ textAlign: "center", padding: "20px 24px 32px", position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>📜</div>
        <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Glossary</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", fontFamily: "'Georgia',serif", fontStyle: "italic", marginBottom: 24 }}>The language of the Hotel. Learn it or freeze.</p>
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
          <input type="text" placeholder="Search terms..." value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "10px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "#fff", fontSize: 13, fontFamily: "monospace", outline: "none", boxSizing: "border-box" }} />
        </div>
      </div>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 24px 40px", position: "relative", zIndex: 2 }}>
        {filtered.map((item, i) => (
          <div key={item.term} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(15px)", transition: `all .5s cubic-bezier(.22,1,.36,1) ${i * .04}s` }}>
            <GlossaryEntry item={item} />
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.2)", fontFamily: "monospace", fontStyle: "italic" }}>No terms found. The Hotel keeps some secrets.</p>
          </div>
        )}
      </div>
      <Support />
    </div>
  );
}

/* ─── The Fire (Live Bitcoin Data) ─── */

function calcSupply(height) {
  let supply = 0;
  let reward = 50;
  let remaining = height;
  while (remaining > 0) {
    const blocks = Math.min(remaining, 210000);
    supply += blocks * reward;
    remaining -= blocks;
    reward /= 2;
  }
  return Math.min(supply, 21000000);
}

function BigFire({ intensity = 1 }) {
  const ref = useRef(null);
  const anim = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let w, h;
    const resize = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const count = 200;
    const P = Array.from({ length: count }, () => ({
      x: 0.3 + Math.random() * 0.4, y: 0.3 + Math.random() * 0.7,
      r: 0.5 + Math.random() * 3.5, sp: 0.0006 + Math.random() * 0.002,
      dr: (Math.random() - 0.5) * 0.0006, a: 0.1 + Math.random() * 0.5,
      hue: Math.random(), ph: Math.random() * 6.28,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const t = Date.now() * 0.001;
      const bright = 0.6 + intensity * 0.4;
      for (const p of P) {
        p.y -= p.sp * bright; p.x += p.dr + Math.sin(t * 0.8 + p.ph) * 0.0003;
        if (p.y < -0.05) { p.y = 1.05; p.x = 0.3 + Math.random() * 0.4; }
        const tw = 0.5 + 0.5 * Math.sin(t * 2 + p.ph * 3);
        const a = p.a * tw * bright;
        const col = p.hue < 0.4 ? `rgba(247,147,26,${a})` : p.hue < 0.65 ? `rgba(255,180,40,${a})` : p.hue < 0.85 ? `rgba(255,100,20,${a * 0.8})` : `rgba(255,220,80,${a * 0.6})`;
        const rad = p.r * (6 + intensity * 4);
        const g = ctx.createRadialGradient(p.x * w, p.y * h, 0, p.x * w, p.y * h, rad);
        g.addColorStop(0, col); g.addColorStop(1, "rgba(247,147,26,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x * w, p.y * h, rad, 0, Math.PI * 2); ctx.fill();
      }
      anim.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(anim.current); };
  }, [intensity]);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

function FireScreen({ onBack }) {
  const [v, setV] = useState(false);
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);
  const [intensity, setIntensity] = useState(0.5);

  useEffect(() => { setTimeout(() => setV(true), 50); }, []);

  useEffect(() => {
    let alive = true;
    async function fetchFire() {
      try {
        const [heightRes, hashRes, priceRes] = await Promise.all([
          fetch("https://mempool.space/api/blocks/tip/height"),
          fetch("https://mempool.space/api/v1/mining/hashrate/1d"),
          fetch("https://mempool.space/api/v1/prices"),
        ]);
        const height = await heightRes.json();
        const hashData = await hashRes.json();
        const priceData = await priceRes.json();
        if (!alive) return;

        const supply = calcSupply(height);
        const occupied = Math.floor(supply);
        const remaining = 21000000 - occupied;

        const hashrate = hashData.currentHashrate || 0;
        const ehash = hashrate / 1e18;
        const norm = Math.min(ehash / 1000, 1);
        setIntensity(0.3 + norm * 0.7);

        const price = priceData.USD || 0;
        const marketCap = price * occupied;

        const genesis = new Date("2009-01-03T18:15:05Z");
        const now = new Date();
        const daysBurned = Math.floor((now - genesis) / (1000 * 60 * 60 * 24));

        const nextHalvingBlock = Math.ceil(height / 210000) * 210000;
        const blocksUntilHalving = nextHalvingBlock - height;
        const minutesUntilHalving = blocksUntilHalving * 10;
        const halvingDays = Math.floor(minutesUntilHalving / 60 / 24);
        const halvingHours = Math.floor((minutesUntilHalving / 60) % 24);

        setData({ occupied, remaining, ehash: ehash.toFixed(1), price, marketCap, daysBurned, halvingDays, halvingHours });
      } catch (e) {
        if (alive) setErr(true);
      }
    }
    fetchFire();
    const timer = setInterval(fetchFire, 30000);
    return () => { alive = false; clearInterval(timer); };
  }, []);

  const fmt = (n) => n.toLocaleString();
  const fmtUsd = (n) => "$" + n.toLocaleString(undefined, { maximumFractionDigits: 0 });
  const fmtTril = (n) => {
    if (n >= 1e12) return "$" + (n / 1e12).toFixed(2) + " TRILLION";
    if (n >= 1e9) return "$" + (n / 1e9).toFixed(1) + " BILLION";
    return fmtUsd(n);
  };

  const card = (content, accent, delay) => ({
    background: accent ? "rgba(247,147,26,0.06)" : "rgba(255,255,255,0.02)",
    border: `1px solid ${accent ? "rgba(247,147,26,0.15)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: 10, padding: "28px 24px", marginBottom: 14, textAlign: "center",
    opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)",
    transition: `all .8s cubic-bezier(.22,1,.36,1) ${delay}s`,
  });

  return (
    <div style={{ minHeight: "100vh", background: "#050200", position: "relative", overflow: "hidden" }}>
      <BigFire intensity={intensity} /><Noise o={0.03} />

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} style={{ background: "rgba(0,0,0,.6)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, color: "rgba(255,255,255,.5)", padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: "monospace" }}>← NEXUS</button>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,.2)", fontFamily: "monospace" }}>/ THE FIRE</span>
        </div>

        <div style={{ textAlign: "center", padding: "40px 24px 30px" }}>
          <div style={{ fontSize: 48, marginBottom: 16, filter: `brightness(${0.8 + intensity * 0.4})` }}>🔥</div>
          <h2 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 8px", textShadow: "0 0 40px rgba(247,147,26,0.3)" }}>The Fire</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.35)", fontFamily: "'Georgia',serif", fontStyle: "italic" }}>Live from the Bitcoin blockchain</p>
        </div>

        {err && (
          <div style={{ textAlign: "center", padding: "40px 24px" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.3)", fontFamily: "monospace" }}>The Fire is beyond reach right now. Try again shortly.</p>
          </div>
        )}

        {data && (
          <div style={{ maxWidth: 400, margin: "0 auto", padding: "0 24px 60px" }}>

            {/* Days the Fire Has Burned */}
            <div style={card(true, true, 0.1)}>
              <div style={{ fontSize: "clamp(32px,6vw,48px)", fontWeight: 800, color: ORANGE, fontFamily: "'Georgia',serif", letterSpacing: "-0.02em" }}>{fmt(data.daysBurned)}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontFamily: "monospace", letterSpacing: ".12em", marginTop: 8 }}>DAYS THE FIRE HAS BURNED</div>
            </div>

            {/* Floors Occupied */}
            <div style={card(true, true, 0.15)}>
              <div style={{ fontSize: "clamp(32px,6vw,48px)", fontWeight: 800, color: ORANGE, fontFamily: "'Georgia',serif", letterSpacing: "-0.02em" }}>{fmt(data.occupied)}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontFamily: "monospace", letterSpacing: ".12em", marginTop: 8 }}>FLOORS OCCUPIED</div>
            </div>

            {/* Floors Still to Be Built */}
            <div style={card(false, false, 0.2)}>
              <div style={{ fontSize: "clamp(32px,6vw,48px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", letterSpacing: "-0.02em" }}>{fmt(data.remaining)}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontFamily: "monospace", letterSpacing: ".12em", marginTop: 8 }}>FLOORS STILL TO BE BUILT</div>
            </div>

            {/* Price Per Floor */}
            <div style={card(true, true, 0.25)}>
              <div style={{ fontSize: "clamp(32px,6vw,48px)", fontWeight: 800, color: ORANGE, fontFamily: "'Georgia',serif", letterSpacing: "-0.02em" }}>{fmtUsd(data.price)}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontFamily: "monospace", letterSpacing: ".12em", marginTop: 8 }}>PRICE PER FLOOR</div>
            </div>

            {/* The Hotel's Value */}
            <div style={card(true, true, 0.3)}>
              <div style={{ fontSize: "clamp(24px,5vw,36px)", fontWeight: 800, color: ORANGE, fontFamily: "'Georgia',serif", letterSpacing: "-0.02em" }}>{fmtTril(data.marketCap)}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontFamily: "monospace", letterSpacing: ".12em", marginTop: 8 }}>THE HOTEL'S VALUE</div>
            </div>

            {/* The Fire's Hashrate */}
            <div style={{
              ...card(true, true, 0.35),
              marginBottom: 14,
            }}>
              <div style={{ fontSize: "clamp(32px,6vw,48px)", fontWeight: 800, color: ORANGE, fontFamily: "'Georgia',serif", letterSpacing: "-0.02em" }}>{data.ehash} EH/s</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontFamily: "monospace", letterSpacing: ".12em", marginTop: 8 }}>THE FIRE'S HASHRATE</div>
              <div style={{ marginTop: 14, height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${intensity * 100}%`, background: `linear-gradient(90deg, ${ORANGE}, #ff6a00)`, borderRadius: 2, transition: "width 1s ease" }} />
              </div>
            </div>

            {/* Time Until Next Halving */}
            <div style={card(false, false, 0.4)}>
              <div style={{ fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", letterSpacing: "-0.02em" }}>{fmt(data.halvingDays)} DAYS</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.25)", fontFamily: "monospace", marginTop: 4 }}>{data.halvingHours} hours</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontFamily: "monospace", letterSpacing: ".12em", marginTop: 8 }}>UNTIL THE NEXT HALVING</div>
            </div>

            <div style={{ textAlign: "center", marginTop: 24, opacity: v ? 1 : 0, transition: "opacity 1s ease .6s" }}>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,.15)", fontFamily: "monospace", letterSpacing: ".1em" }}>LIVE DATA · REFRESHES EVERY 30 SECONDS</p>
            </div>
          </div>
        )}

        {!data && !err && (
          <div style={{ textAlign: "center", padding: "60px 24px" }}>
            <div style={{ fontSize: 13, color: "rgba(247,147,26,.4)", fontFamily: "monospace", animation: "pulse 2s ease-in-out infinite" }}>Reaching the Fire...</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Find Your Floor ─── */

const FLOOR_TIERS = [
  {
    max: 100,
    floor: "Floor 1",
    zone: "The Bottom",
    desc: "The coldest habitable space in the Hotel. No room. No warmth. You sleep in shifts. You eat what you can find. The view screens show warm, empty floors above you twenty-four hours a day. You own almost nothing — and almost nothing is exactly what it feels like.",
    color: "#4466aa",
  },
  {
    max: 1000,
    floor: "Floors 2–3",
    zone: "The Bottom",
    desc: "Marginally better than Floor 1. You have a cubicle. You might have a blanket that isn't shared. The cold is still in your lungs every morning. You can see Floor 1 below you and you're grateful you're not there. You can see Floor 4 above you and you'd do anything to get there.",
    color: "#4466aa",
  },
  {
    max: 10000,
    floor: "Floors 4–50",
    zone: "The Lower Floors",
    desc: "You climbed out. The cold is still there but it doesn't own you anymore. Small businesses. Trade schools. Families who are building something. You can feel the warmth above you — not on your skin, not yet, but in the idea that things are getting better. Don't look down.",
    color: "#557799",
  },
  {
    max: 100000,
    floor: "Floors 50–5,000",
    zone: "The Mid-Floors",
    desc: "You crossed the line. Space to yourself. A door that locks. Air that doesn't hurt to breathe. You're not comfortable yet — but you're not suffering. The view screens still show warmer floors above, but you've stopped watching them with desperation. Now you watch them with a plan.",
    color: "#887744",
  },
  {
    max: 1000000,
    floor: "Floors 5,000–20,000",
    zone: "The Agricultural Belt",
    desc: "Comfortable. Real warmth. Real food — not paste, not rations, but vegetables that grew in soil under light. You have space. You have choices. You can smell green things growing. Children here have never known the cold. This is what 100,000 sats buys you: a life worth living.",
    color: "#aa8833",
  },
  {
    max: 10000000,
    floor: "Floors 20,000–50,000",
    zone: "The Open Range",
    desc: "The frontier. Sparsely populated. Wide corridors. Experimental communities. You didn't just escape the Bottom — you built something. The air here is warm enough to forget that ice exists outside. People up here think in decades, not days.",
    color: "#cc7722",
  },
  {
    max: 100000000,
    floor: "Floors 50,000–200,000",
    zone: "The High Floors",
    desc: "Estates. Dynasties. The Named Floor territory begins here. El Salvador. Japan. The Saylor Cathedral. Strategy's 1,100,000 floors. You don't just live in the Hotel — you shape it. The warmth here isn't a luxury. It's a fact of life. The cold is a story your grandparents told.",
    color: "#dd6611",
  },
  {
    max: Infinity,
    floor: "Floors 200,000+",
    zone: "The Highlands & Beyond",
    desc: "You own a full floor. Or more. The air is warm. The space is vast. Ghost Floors stretch in every direction — sealed, empty, yours. The Eternal Fire glows above. From here, the Bottom is a number on a view screen. You are the Hotel. The Hotel is you.",
    color: ORANGE,
  },
];

function FindFloorScreen({ onBack }) {
  const [v, setV] = useState(false);
  const [mode, setMode] = useState("sats"); // "sats" or "wallet"
  const [input, setInput] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [err, setErr] = useState("");
  const resultRef = useRef(null);

  useEffect(() => { setTimeout(() => setV(true), 50); }, []);

  useEffect(() => {
    if (showResult && resultRef.current) {
      setTimeout(() => resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [showResult]);

  const handleCheckIn = () => {
    const sats = parseInt(input.replace(/,/g, ""), 10);
    if (isNaN(sats) || sats < 0) return;
    const tier = FLOOR_TIERS.find(t => sats <= t.max);
    if (tier) {
      setResult({ sats, tier, address: null });
      setShowResult(true);
      setErr("");
    }
  };

  const handleWalletLookup = async () => {
    const addr = address.trim();
    if (!addr) return;
    setErr("");
    setResult(null);
    setShowResult(false);
    setLoading(true);
    try {
      const res = await fetch(`https://mempool.space/api/address/${addr}`);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      const funded = (data.chain_stats?.funded_txo_sum || 0);
      const spent = (data.chain_stats?.spent_txo_sum || 0);
      const sats = funded - spent;
      const tier = FLOOR_TIERS.find(t => sats <= t.max);
      if (tier) {
        setResult({ sats, tier, address: addr });
        setShowResult(true);
      }
    } catch (e) {
      setErr("Could not find that address. Make sure it's a valid public Bitcoin address.");
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (mode === "sats") handleCheckIn();
      else handleWalletLookup();
    }
  };

  const fmt = (n) => n.toLocaleString();

  const btcEquiv = (sats) => {
    if (sats >= 100000000) return (sats / 100000000).toFixed(4) + " BTC";
    if (sats >= 1000000) return (sats / 1000000).toFixed(1) + "M sats";
    if (sats >= 1000) return (sats / 1000).toFixed(1) + "K sats";
    return sats + " sats";
  };

  const reset = () => {
    setResult(null);
    setShowResult(false);
    setInput("");
    setAddress("");
    setErr("");
  };

  const tabStyle = (active) => ({
    flex: 1, padding: "10px 12px", background: active ? "rgba(247,147,26,0.12)" : "rgba(255,255,255,0.02)",
    border: "1px solid", borderColor: active ? "rgba(247,147,26,0.3)" : "rgba(255,255,255,0.06)",
    borderRadius: 6, color: active ? ORANGE : "rgba(255,255,255,.35)", fontSize: 11, fontWeight: 600,
    fontFamily: "monospace", letterSpacing: ".08em", cursor: "pointer", textAlign: "center",
  });

  return (
    <div style={{ minHeight: "100vh", background: DARK, position: "relative", overflow: "hidden" }}>
      <Embers /><Noise /><Glow h={300} o={0.06} />

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} style={{ background: "rgba(0,0,0,.4)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, color: "rgba(255,255,255,.5)", padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: "monospace" }}>← NEXUS</button>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,.2)", fontFamily: "monospace" }}>/ FIND YOUR FLOOR</span>
        </div>

        <div style={{ textAlign: "center", padding: "40px 24px 32px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🗝</div>
          <h2 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Find Your Floor</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", fontFamily: "'Georgia',serif", fontStyle: "italic", maxWidth: 400, margin: "0 auto" }}>The Hotel knows where you belong. Check in below.</p>
        </div>

        <div style={{
          maxWidth: 420, margin: "0 auto", padding: "0 24px",
          opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)",
          transition: "all .6s cubic-bezier(.22,1,.36,1) .1s",
        }}>
          {/* Mode Toggle */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            <div onClick={() => { setMode("sats"); reset(); }} style={tabStyle(mode === "sats")}>I KNOW MY SATS</div>
            <div onClick={() => { setMode("wallet"); reset(); }} style={tabStyle(mode === "wallet")}>CHECK THE LEDGER</div>
          </div>

          {mode === "sats" && (
            <>
              <div style={{ marginBottom: 16 }}>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter your sats..."
                  value={input}
                  onChange={(e) => setInput(e.target.value.replace(/[^0-9,]/g, ""))}
                  onKeyDown={handleKeyDown}
                  style={{
                    width: "100%", padding: "16px 20px", background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(247,147,26,0.2)", borderRadius: 8, color: "#fff",
                    fontSize: 20, fontFamily: "'Georgia',serif", fontWeight: 700, outline: "none",
                    boxSizing: "border-box", textAlign: "center", letterSpacing: "0.02em",
                  }}
                />
              </div>
              <button onClick={handleCheckIn} style={{
                width: "100%", padding: "14px 24px", background: ORANGE, border: "none",
                borderRadius: 8, color: DARK, fontSize: 14, fontWeight: 700, fontFamily: "monospace",
                letterSpacing: ".08em", cursor: "pointer",
              }}>CHECK IN</button>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,.2)", fontFamily: "monospace", textAlign: "center", marginTop: 12 }}>1 BTC = 100,000,000 sats</p>
            </>
          )}

          {mode === "wallet" && (
            <>
              <div style={{ marginBottom: 16 }}>
                <input
                  type="text"
                  placeholder="Paste your public address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{
                    width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(247,147,26,0.2)", borderRadius: 8, color: "#fff",
                    fontSize: 13, fontFamily: "monospace", outline: "none",
                    boxSizing: "border-box", wordBreak: "break-all",
                  }}
                />
              </div>
              <button onClick={handleWalletLookup} disabled={loading} style={{
                width: "100%", padding: "14px 24px", background: loading ? "rgba(247,147,26,0.5)" : ORANGE,
                border: "none", borderRadius: 8, color: DARK, fontSize: 14, fontWeight: 700,
                fontFamily: "monospace", letterSpacing: ".08em", cursor: loading ? "wait" : "pointer",
              }}>{loading ? "CHECKING THE LEDGER..." : "CHECK THE LEDGER"}</button>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,.2)", fontFamily: "monospace", textAlign: "center", marginTop: 12, lineHeight: 1.6 }}>Your public address only. Your keys stay yours. The Ledger never asks for permission — it only tells the truth.</p>
            </>
          )}

          {err && (
            <div style={{ marginTop: 16, padding: "14px 18px", background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.2)", borderRadius: 8, textAlign: "center" }}>
              <p style={{ fontSize: 12, color: "rgba(255,150,150,.7)", fontFamily: "monospace", margin: 0 }}>{err}</p>
            </div>
          )}
        </div>

        {showResult && result && (
          <div ref={resultRef} style={{
            maxWidth: 420, margin: "32px auto 0", padding: "0 24px 60px",
            animation: "floorFadeIn 0.6s ease",
          }}>
            <style>{`@keyframes floorFadeIn{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}}`}</style>

            {/* Ledger confirmation for wallet mode */}
            {result.address && (
              <div style={{
                background: "rgba(247,147,26,0.06)", border: "1px solid rgba(247,147,26,0.15)",
                borderRadius: 10, padding: "24px 24px", textAlign: "center", marginBottom: 14,
              }}>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,.25)", fontFamily: "monospace", letterSpacing: ".12em", marginBottom: 10 }}>THE LEDGER SAYS</div>
                <div style={{ fontSize: "clamp(28px,6vw,42px)", fontWeight: 800, color: ORANGE, fontFamily: "'Georgia',serif" }}>{fmt(result.sats)}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.35)", fontFamily: "monospace", marginTop: 4 }}>{btcEquiv(result.sats)}</div>
              </div>
            )}

            {/* Your Position */}
            <div style={{
              background: `rgba(${result.tier.color === ORANGE ? "247,147,26" : "255,255,255"},0.04)`,
              border: `1px solid ${result.tier.color}44`,
              borderRadius: 10, padding: "32px 24px", textAlign: "center", marginBottom: 16,
            }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", fontFamily: "monospace", letterSpacing: ".12em", marginBottom: 12 }}>YOUR POSITION IN THE HOTEL</div>
              <div style={{ fontSize: "clamp(28px,6vw,42px)", fontWeight: 800, color: result.tier.color, fontFamily: "'Georgia',serif", marginBottom: 4 }}>{result.tier.floor}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,.5)", fontFamily: "'Georgia',serif", fontStyle: "italic" }}>{result.tier.zone}</div>
            </div>

            {/* Floor Registry — Phase 2 */}
            {(() => {
              const satsPerFloor = 100000000;
              const totalFloors = result.sats / satsPerFloor;
              const fullFloors = Math.floor(totalFloors);
              const partialPct = ((totalFloors - fullFloors) * 100).toFixed(2);
              const pctOfHotel = ((result.sats / 2100000000000000) * 100);
              const pctDisplay = pctOfHotel < 0.000001 ? "< 0.000001%" : pctOfHotel < 0.01 ? pctOfHotel.toFixed(6) + "%" : pctOfHotel.toFixed(4) + "%";

              return (
                <div style={{
                  background: "rgba(247,147,26,0.04)", border: "1px solid rgba(247,147,26,0.12)",
                  borderRadius: 10, padding: "24px 20px", marginBottom: 16,
                }}>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,.25)", fontFamily: "monospace", letterSpacing: ".12em", marginBottom: 14, textAlign: "center" }}>FLOOR REGISTRY</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: "14px 12px", textAlign: "center" }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: ORANGE, fontFamily: "'Georgia',serif" }}>
                        {fullFloors > 0 ? fmt(fullFloors) : "0"}
                      </div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,.25)", fontFamily: "monospace", letterSpacing: ".08em", marginTop: 4 }}>
                        {fullFloors === 1 ? "FULL FLOOR" : "FULL FLOORS"}
                      </div>
                    </div>
                    <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: "14px 12px", textAlign: "center" }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: fullFloors > 0 ? ORANGE : result.tier.color, fontFamily: "'Georgia',serif" }}>
                        {fullFloors > 0 ? partialPct + "%" : totalFloors >= 0.01 ? (totalFloors * 100).toFixed(1) + "%" : "< 0.01%"}
                      </div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,.25)", fontFamily: "monospace", letterSpacing: ".08em", marginTop: 4 }}>
                        {fullFloors > 0 ? "OF NEXT FLOOR" : "OF ONE FLOOR"}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 12, textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", fontFamily: "monospace" }}>
                      {fmt(result.sats)} sats = {totalFloors >= 1 ? totalFloors.toFixed(4) : totalFloors >= 0.0001 ? totalFloors.toFixed(6) : totalFloors.toExponential(2)} floors
                    </div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,.2)", fontFamily: "monospace", marginTop: 4 }}>
                      You own {pctDisplay} of the entire Hotel
                    </div>
                  </div>
                  <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(0,0,0,0.2)", borderRadius: 6 }}>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,.2)", fontFamily: "monospace", lineHeight: 1.7, textAlign: "center" }}>
                      1 floor = 100,000,000 sats = 1 BTC
                      <br />
                      The Hotel has 21,000,000 floors. Every sat is space.
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Stats Row (manual mode only) */}
            {!result.address && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "16px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: ORANGE, fontFamily: "'Georgia',serif" }}>{fmt(result.sats)}</div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,.25)", fontFamily: "monospace", letterSpacing: ".1em", marginTop: 4 }}>YOUR SATS</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "16px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: result.tier.color, fontFamily: "'Georgia',serif" }}>{result.tier.zone}</div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,.25)", fontFamily: "monospace", letterSpacing: ".1em", marginTop: 4 }}>YOUR ZONE</div>
                </div>
              </div>
            )}

            {/* Description */}
            <div style={{
              background: "rgba(0,0,0,0.3)", borderLeft: `2px solid ${result.tier.color}44`,
              padding: "20px 20px", borderRadius: "0 8px 8px 0", marginBottom: 16,
            }}>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", fontFamily: "'Georgia',serif", lineHeight: 1.8, margin: 0 }}>{result.tier.desc}</p>
            </div>

            {/* Vertical Position Bar */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "20px 24px", marginBottom: 16 }}>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,.25)", fontFamily: "monospace", letterSpacing: ".1em", marginBottom: 12, textAlign: "center" }}>YOUR POSITION</div>
              <div style={{ position: "relative", height: 200, background: "rgba(255,255,255,0.02)", borderRadius: 6, overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #1a2a4a, #2a3a5a, #4a5a3a, #6a5a2a, #8a4a1a, #aa3a0a, #F7931A)", opacity: 0.15 }} />
                <div style={{ position: "absolute", top: 4, left: 0, right: 0, textAlign: "center", fontSize: 8, color: "rgba(255,255,255,.15)", fontFamily: "monospace" }}>SUMMIT</div>
                <div style={{ position: "absolute", bottom: 4, left: 0, right: 0, textAlign: "center", fontSize: 8, color: "rgba(255,255,255,.15)", fontFamily: "monospace" }}>FLOOR 1</div>
                {(() => {
                  const logSats = result.sats > 0 ? Math.log10(result.sats) : 0;
                  const maxLog = Math.log10(2100000000000000);
                  const pct = Math.min(Math.max((logSats / maxLog) * 100, 2), 98);
                  return (
                    <div style={{
                      position: "absolute", left: 12, right: 12,
                      bottom: `${pct}%`, transform: "translateY(50%)",
                      display: "flex", alignItems: "center", gap: 8,
                    }}>
                      <div style={{ flex: 1, height: 2, background: result.tier.color, borderRadius: 1, boxShadow: `0 0 8px ${result.tier.color}66` }} />
                      <div style={{
                        padding: "3px 8px", background: result.tier.color,
                        borderRadius: 4, fontSize: 9, fontWeight: 700, color: DARK,
                        fontFamily: "monospace", whiteSpace: "nowrap",
                      }}>YOU — {btcEquiv(result.sats)}</div>
                      <div style={{ flex: 1, height: 2, background: result.tier.color, borderRadius: 1, boxShadow: `0 0 8px ${result.tier.color}66` }} />
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Verified Address (wallet mode only) */}
            {result.address && (
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "14px 16px", textAlign: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,.2)", fontFamily: "monospace", letterSpacing: ".1em", marginBottom: 6 }}>VERIFIED ADDRESS</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)", fontFamily: "monospace", wordBreak: "break-all", lineHeight: 1.6 }}>{result.address}</div>
              </div>
            )}

            {/* Try Again */}
            <button onClick={reset} style={{
              width: "100%", padding: "12px 24px", background: "none",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
              color: "rgba(255,255,255,.4)", fontSize: 12, fontFamily: "monospace",
              letterSpacing: ".1em", cursor: "pointer",
            }}>
              CHECK IN AGAIN
            </button>
          </div>
        )}
      </div>
      <Support />
    </div>
  );
}

/* ─── The Hotel Today ─── */

const KNOWN_ENTITIES = [
  // Monument
  { name: "Nakamoto Floors", country: "∅", total_holdings: 1100000, type: "Monument", note: "Sealed. Empty. As designed. The scarcity itself." },
  // ETFs
  { name: "BlackRock iShares (IBIT)", country: "🇺🇸", total_holdings: 568000, type: "ETF", note: "Largest Bitcoin ETF in the world" },
  { name: "Fidelity (FBTC)", country: "🇺🇸", total_holdings: 201815, type: "ETF", note: "Fidelity Wise Origin Bitcoin Fund" },
  { name: "Grayscale (GBTC)", country: "🇺🇸", total_holdings: 167683, type: "ETF", note: "First major Bitcoin trust, converted to spot ETF" },
  { name: "ARK 21Shares (ARKB)", country: "🇺🇸", total_holdings: 48978, type: "ETF", note: "Cathie Wood's Bitcoin ETF" },
  { name: "Bitwise (BITB)", country: "🇺🇸", total_holdings: 40230, type: "ETF", note: "Bitwise Bitcoin ETF" },
  // Governments
  { name: "United States", country: "🇺🇸", total_holdings: 207000, type: "Government", note: "Strategic Bitcoin Reserve + seized assets" },
  { name: "China", country: "🇨🇳", total_holdings: 194000, type: "Government", note: "Seized assets — banned crypto but kept the coins" },
  { name: "United Kingdom", country: "🇬🇧", total_holdings: 61000, type: "Government", note: "Seized from money laundering operations" },
  { name: "Ukraine", country: "🇺🇦", total_holdings: 46351, type: "Government", note: "Donated by the world during the war" },
  { name: "Bhutan", country: "🇧🇹", total_holdings: 10635, type: "Government", note: "Mined with hydroelectric power from the Himalayas" },
  { name: "El Salvador", country: "🇸🇻", total_holdings: 6101, type: "Government", note: "First nation to adopt Bitcoin as legal tender" },
  // Private Companies
  { name: "Block.one", country: "🇭🇰", total_holdings: 140000, type: "Private Company", note: "Creators of EOS, one of the largest private holders" },
  { name: "Tether", country: "🇻🇬", total_holdings: 96124, type: "Private Company", note: "Stablecoin giant backs reserves with Bitcoin" },
  { name: "SpaceX", country: "🇺🇸", total_holdings: 8285, type: "Private Company", note: "Elon Musk's space company holds Bitcoin" },
  { name: "Cardone Capital", country: "🇺🇸", total_holdings: 2000, type: "Private Company", note: "Estimated — hybrid real estate + BTC funds" },
  // Individuals
  { name: "Tim Draper", country: "🇺🇸", total_holdings: 29656, type: "Individual", note: "Bought at the 2014 US Marshals Silk Road auction" },
  { name: "Michael Saylor", country: "🇺🇸", total_holdings: 17732, type: "Individual", note: "Personal holdings, separate from Strategy" },
  { name: "Winklevoss Twins", country: "🇺🇸", total_holdings: 8700, type: "Individual", note: "Early Bitcoin believers, Gemini founders" },
  { name: "Ross Ulbricht", country: "🇺🇸", total_holdings: 300, type: "Individual", note: "Silk Road founder, pardoned 2025, donated 300 BTC" },
];

function HotelTodayScreen({ onBack }) {
  const [v, setV] = useState(false);
  const [companies, setCompanies] = useState(null);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setTimeout(() => setV(true), 50); }, []);

  useEffect(() => {
    let alive = true;
    async function fetchData() {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (!alive) return;

        const apiCompanies = (data.companies || []).map(c => ({
          name: c.name,
          country: c.country || "—",
          total_holdings: c.total_holdings || 0,
          percentage_of_total_supply: c.percentage_of_total_supply || 0,
          type: "Public Company",
          note: null,
        }));

        const known = KNOWN_ENTITIES.map(e => ({
          ...e,
          percentage_of_total_supply: parseFloat(((e.total_holdings / 21000000) * 100).toFixed(3)),
        }));

        const all = [...known, ...apiCompanies].sort((a, b) => b.total_holdings - a.total_holdings);
        setCompanies(all);
        setLoading(false);
      } catch (e) {
        if (alive) { setErr(true); setLoading(false); }
      }
    }
    fetchData();
    return () => { alive = false; };
  }, []);

  const fmt = (n) => n.toLocaleString();
  const totalClaimed = companies ? companies.reduce((sum, c) => sum + c.total_holdings, 0) : 0;
  const pctClaimed = companies ? ((totalClaimed / 21000000) * 100).toFixed(1) : "0";

  const countryFlag = (c) => {
    if (c === "∅") return "∅";
    if (c.length <= 4) return c;
    const flags = { US: "🇺🇸", CA: "🇨🇦", JP: "🇯🇵", GB: "🇬🇧", HK: "🇭🇰", DE: "🇩🇪", AU: "🇦🇺", TH: "🇹🇭", SG: "🇸🇬", NO: "🇳🇴", KR: "🇰🇷", CN: "🇨🇳", BR: "🇧🇷", CH: "🇨🇭", SE: "🇸🇪", IN: "🇮🇳", FR: "🇫🇷", TW: "🇹🇼", NL: "🇳🇱", AR: "🇦🇷" };
    return flags[c] || c;
  };

  const typeBadge = (type) => {
    const colors = {
      "Government": { bg: "rgba(100,180,255,0.12)", border: "rgba(100,180,255,0.25)", text: "#6ab4ff" },
      "Individual": { bg: "rgba(180,130,255,0.12)", border: "rgba(180,130,255,0.25)", text: "#b482ff" },
      "Monument": { bg: "rgba(120,120,120,0.12)", border: "rgba(120,120,120,0.25)", text: "#888" },
      "Public Company": { bg: "rgba(247,147,26,0.08)", border: "rgba(247,147,26,0.15)", text: ORANGE },
      "ETF": { bg: "rgba(80,200,120,0.12)", border: "rgba(80,200,120,0.25)", text: "#50c878" },
      "Private Company": { bg: "rgba(255,180,100,0.12)", border: "rgba(255,180,100,0.25)", text: "#ffb464" },
    };
    const c = colors[type] || colors["Public Company"];
    return { background: c.bg, border: `1px solid ${c.border}`, color: c.text, padding: "2px 8px", borderRadius: 12, fontSize: 8, fontFamily: "monospace", letterSpacing: ".06em", fontWeight: 600, whiteSpace: "nowrap" };
  };

  return (
    <div style={{ minHeight: "100vh", background: DARK, position: "relative", overflow: "hidden" }}>
      <Embers /><Noise /><Glow h={300} o={0.06} />

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} style={{ background: "rgba(0,0,0,.4)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, color: "rgba(255,255,255,.5)", padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: "monospace" }}>← NEXUS</button>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,.2)", fontFamily: "monospace" }}>/ THE HOTEL TODAY</span>
        </div>

        <div style={{ textAlign: "center", padding: "30px 24px 24px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌐</div>
          <h2 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>The Hotel Today</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", fontFamily: "'Georgia',serif", fontStyle: "italic", maxWidth: 440, margin: "0 auto" }}>Every known entity with floors in the Hotel. Ranked by holdings. Updated live.</p>
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "60px 24px" }}>
            <div style={{ fontSize: 13, color: "rgba(247,147,26,.4)", fontFamily: "monospace", animation: "pulse 2s ease-in-out infinite" }}>Checking the Ledger...</div>
          </div>
        )}

        {err && (
          <div style={{ textAlign: "center", padding: "40px 24px" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.3)", fontFamily: "monospace" }}>The Ledger is beyond reach right now. Try again shortly.</p>
          </div>
        )}

        {companies && (
          <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 24px 60px" }}>
            {/* Summary */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20,
              opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(15px)",
              transition: "all .6s cubic-bezier(.22,1,.36,1) .1s",
            }}>
              <div style={{ background: "rgba(247,147,26,0.06)", border: "1px solid rgba(247,147,26,0.15)", borderRadius: 10, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: ORANGE, fontFamily: "'Georgia',serif" }}>{fmt(totalClaimed)}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,.3)", fontFamily: "monospace", letterSpacing: ".1em", marginTop: 6 }}>FLOORS CLAIMED</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif" }}>{pctClaimed}%</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,.3)", fontFamily: "monospace", letterSpacing: ".1em", marginTop: 6 }}>OF THE HOTEL</div>
              </div>
            </div>

            {/* Entity List */}
            {companies.map((entity, i) => {
              const isSpecial = entity.type !== "Public Company";
              return (
                <div key={entity.name + i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "14px 16px",
                  background: isSpecial ? "rgba(247,147,26,0.03)" : "rgba(255,255,255,0.015)",
                  border: "1px solid",
                  borderColor: isSpecial ? "rgba(247,147,26,0.1)" : "rgba(255,255,255,0.04)",
                  borderRadius: 8, marginBottom: 6,
                  opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(10px)",
                  transition: `all .4s cubic-bezier(.22,1,.36,1) ${Math.min(i * .03, 1)}s`,
                }}>
                  {/* Rank */}
                  <div style={{ width: 28, fontSize: 11, color: "rgba(255,255,255,.2)", fontFamily: "monospace", textAlign: "center", flexShrink: 0 }}>
                    {i + 1}
                  </div>

                  {/* Flag */}
                  <div style={{ fontSize: 18, width: 24, textAlign: "center", flexShrink: 0 }}>
                    {countryFlag(entity.country)}
                  </div>

                  {/* Name + Type */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: isSpecial ? "#fff" : "rgba(255,255,255,.75)", fontFamily: "'Georgia',serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {entity.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                      <span style={typeBadge(entity.type)}>{entity.type.toUpperCase()}</span>
                      {entity.note && <span style={{ fontSize: 9, color: "rgba(255,255,255,.2)", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{entity.note}</span>}
                    </div>
                  </div>

                  {/* Holdings */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: isSpecial ? ORANGE : "rgba(255,255,255,.6)", fontFamily: "'Georgia',serif" }}>
                      {fmt(entity.total_holdings)}
                    </div>
                    <div style={{ fontSize: 8, color: "rgba(255,255,255,.2)", fontFamily: "monospace", letterSpacing: ".06em", marginTop: 2 }}>
                      FLOORS
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Footer Notes */}
            <div style={{ marginTop: 20, padding: "16px 18px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8 }}>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,.2)", fontFamily: "monospace", lineHeight: 1.8, margin: 0 }}>
                Public company data updates live via CoinGecko. Government, ETF, private company, and individual holdings are updated periodically.
                Nakamoto Floors represent the estimated coins held in Satoshi's original wallets — untouched since the beginning. Numbers marked as estimated are based on the best publicly available data.
              </p>
            </div>
          </div>
        )}
      </div>
      <Support />
    </div>
  );
}


/* ─── The Tower (Visual Map) ─── */

function TowerFire({ width }) {
  const ref = useRef(null);
  const anim = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    const w = width || 110, h = 180;
    c.width = w; c.height = h;
    const fireBase = 0.72;
    const emberCeiling = 0.12;
    const P = Array.from({ length: 65 }, (_, i) => ({
      x: 0.15 + Math.random() * 0.7, y: fireBase + Math.random() * 0.15,
      r: i < 45 ? (1 + Math.random() * 4) : (0.5 + Math.random() * 1.5),
      sp: i < 45 ? (0.0008 + Math.random() * 0.002) : (0.0003 + Math.random() * 0.0008),
      a: i < 45 ? (0.2 + Math.random() * 0.6) : (0.06 + Math.random() * 0.12),
      hue: Math.random(), ph: Math.random() * 6.28,
      isEmber: i >= 45,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const t = Date.now() * 0.001;
      for (const p of P) {
        p.y -= p.sp;
        p.x += Math.sin(t * (p.isEmber ? 0.5 : 1.0) + p.ph) * (p.isEmber ? 0.001 : 0.0005);
        if (p.isEmber && p.y < emberCeiling) { p.y = fireBase + Math.random() * 0.1; p.x = 0.15 + Math.random() * 0.7; }
        if (!p.isEmber && p.y < fireBase - 0.15) { p.y = fireBase + 0.15; p.x = 0.15 + Math.random() * 0.7; }
        const tw = 0.5 + 0.5 * Math.sin(t * 1.2 + p.ph * 3);
        const fade = p.isEmber ? Math.max(0, (p.y - emberCeiling) / (fireBase - emberCeiling)) : 1;
        const a = p.a * tw * fade;
        const col = p.hue < 0.4 ? `rgba(247,147,26,${a})` : p.hue < 0.7 ? `rgba(255,180,40,${a})` : `rgba(255,100,20,${a * 0.7})`;
        const g = ctx.createRadialGradient(p.x * w, p.y * h, 0, p.x * w, p.y * h, p.r * 3);
        g.addColorStop(0, col); g.addColorStop(1, "rgba(247,147,26,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.r * 3, 0, Math.PI * 2); ctx.fill();
      }
      anim.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(anim.current);
  }, [width]);
  return <canvas ref={ref} style={{ width: width || 110, height: 180, display: "block" }} />;
}

function TowerScreen({ onBack }) {
  const [v, setV] = useState(false);
  const [apiTotal, setApiTotal] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setTimeout(() => setV(true), 50); }, []);

  useEffect(() => {
    let alive = true;
    async function fetchData() {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin");
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (!alive) return;
        setApiTotal((data.companies || []).reduce((s, c) => s + (c.total_holdings || 0), 0));
        setLoaded(true);
      } catch (e) { if (alive) setLoaded(true); }
    }
    fetchData();
    return () => { alive = false; };
  }, []);

  const TOTAL = 21000000;
  const UNBUILT = 1200000;
  const NAKAMOTO = 1100000;
  const LOST_EST = 3700000;
  const govTotal = KNOWN_ENTITIES.filter(e => e.type === "Government").reduce((s, e) => s + e.total_holdings, 0);
  const etfTotal = KNOWN_ENTITIES.filter(e => e.type === "ETF").reduce((s, e) => s + e.total_holdings, 0);
  const privateTotal = KNOWN_ENTITIES.filter(e => e.type === "Private Company").reduce((s, e) => s + e.total_holdings, 0);
  const individualTotal = KNOWN_ENTITIES.filter(e => e.type === "Individual").reduce((s, e) => s + e.total_holdings, 0);
  const publicCoTotal = apiTotal;
  const knownLit = govTotal + etfTotal + privateTotal + publicCoTotal;
  const believers = Math.max(TOTAL - UNBUILT - NAKAMOTO - LOST_EST - knownLit, 0) + individualTotal;
  const litTotal = knownLit + believers;
  const darkRatio = LOST_EST / (TOTAL - UNBUILT - NAKAMOTO);

  const segments = [
    { label: "Unbuilt", amount: UNBUILT, lit: false, noWindows: true },
    { label: "Private Companies", amount: privateTotal, color: "#ffb464", lit: true, desc: "Block.one, Tether, SpaceX, Cardone" },
    { label: "Public Companies", amount: publicCoTotal, color: ORANGE, lit: true, desc: "Strategy, MARA, Metaplanet, Tesla & more" },
    { label: "Governments", amount: govTotal, color: "#6ab4ff", lit: true, desc: "US, China, UK, Ukraine, Bhutan, El Salvador" },
    { label: "ETFs", amount: etfTotal, color: "#50c878", lit: true, desc: "BlackRock, Fidelity, Grayscale, ARK, Bitwise" },
    { label: "\u20bfelievers", amount: believers, color: ORANGE, lit: true, desc: "Individuals, HODLers, and millions of quiet wallets. Lights on." },
    { label: "Nakamoto Floors", amount: NAKAMOTO, lit: false, noWindows: false, desc: "Sealed. Untouched since the beginning." },
  ];

  const fmt = (n) => n.toLocaleString();
  const pct = (n) => ((n / TOTAL) * 100);

  const towerHeight = 640;
  const towerWidth = 110;

  const minSegHeight = 32;
  const rawHeights = segments.map(s => (s.amount / TOTAL) * towerHeight);
  const boosted = rawHeights.map((h, i) => segments[i].amount > 0 ? Math.max(h, minSegHeight) : 0);
  const boostedTotal = boosted.reduce((a, b) => a + b, 0);
  const scl = towerHeight / boostedTotal;
  const segHeights = boosted.map(h => h * scl);

  const WindowGrid = ({ height, lit, noWindows }) => {
    if (height < 6 || noWindows) return null;
    const rows = Math.max(Math.floor(height / 7), 1);
    const cols = 9;
    const darkRows = new Set();
    if (lit) {
      let lastDark = -3;
      for (let r = 0; r < rows; r++) {
        if (r - lastDark >= 3 && Math.random() < 0.1) { darkRows.add(r); lastDark = r; }
      }
    }
    return (
      <div style={{ position: "absolute", inset: 3, display: "flex", flexDirection: "column", justifyContent: "space-evenly", overflow: "hidden" }}>
        {Array.from({ length: Math.min(rows, 55) }, (_, r) => {
          const isFullDark = darkRows.has(r);
          return (
            <div key={r} style={{ display: "flex", justifyContent: "space-evenly" }}>
              {Array.from({ length: cols }, (_, c) => {
                const isLost = lit && !isFullDark && Math.random() < darkRatio;
                const isLit = lit && !isFullDark && !isLost;
                const warmth = 0.4 + Math.random() * 0.6;
                return (
                  <div key={c} style={{
                    width: 7, height: 4, borderRadius: 0.5,
                    background: isFullDark ? "rgba(255,255,255,0.01)"
                      : isLit ? `rgba(247,${Math.floor(110 + warmth * 90)},${Math.floor(warmth * 50)},${0.35 + warmth * 0.5})`
                      : lit ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.01)",
                    boxShadow: isLit ? `0 0 ${2 + warmth * 3}px rgba(247,147,26,${0.1 + warmth * 0.25})` : "none",
                  }} />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const litPct = pct(litTotal).toFixed(1);
  const darkPct = pct(LOST_EST + NAKAMOTO).toFixed(1);

  return (
    <div style={{ minHeight: "100vh", background: "#030303", position: "relative", overflow: "hidden" }}>
      <Noise o={0.03} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} style={{ background: "rgba(0,0,0,.6)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, color: "rgba(255,255,255,.5)", padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: "monospace" }}>← NEXUS</button>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,.2)", fontFamily: "monospace" }}>/ THE HOTEL</span>
        </div>

        <div style={{ textAlign: "center", padding: "20px 24px 24px" }}>
          <h2 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>The Hotel</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.35)", fontFamily: "'Georgia',serif", fontStyle: "italic", maxWidth: 400, margin: "0 auto" }}>Twenty-one million floors. See who left the lights on.</p>
          <p style={{ fontSize: 9, color: "rgba(255,255,255,.10)", fontFamily: "monospace", letterSpacing: ".06em", marginTop: 8 }}>Segments are representational and not drawn to exact proportional scale.</p>
        </div>

        {!loaded ? (
          <div style={{ textAlign: "center", padding: "60px 24px" }}>
            <div style={{ fontSize: 13, color: "rgba(247,147,26,.4)", fontFamily: "monospace", animation: "pulse 2s ease-in-out infinite" }}>Constructing the Hotel...</div>
          </div>
        ) : (
          <div style={{ maxWidth: 500, margin: "0 auto", padding: "0 24px 60px" }}>

            {/* Summary */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 24,
              opacity: v ? 1 : 0, transition: "opacity .8s ease .1s",
            }}>
              <div style={{ background: "rgba(247,147,26,0.06)", border: "1px solid rgba(247,147,26,0.12)", borderRadius: 8, padding: "14px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: ORANGE, fontFamily: "'Georgia',serif" }}>{litPct}%</div>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,.25)", fontFamily: "monospace", letterSpacing: ".08em", marginTop: 4 }}>LIGHTS ON</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "14px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "rgba(255,255,255,.25)", fontFamily: "'Georgia',serif" }}>{darkPct}%</div>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,.25)", fontFamily: "monospace", letterSpacing: ".08em", marginTop: 4 }}>LIGHTS OFF</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "14px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "rgba(255,255,255,.15)", fontFamily: "'Georgia',serif" }}>{pct(UNBUILT).toFixed(1)}%</div>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,.25)", fontFamily: "monospace", letterSpacing: ".08em", marginTop: 4 }}>UNBUILT</div>
              </div>
            </div>

            {/* The Hotel — clean tower, no side labels */}
            <div style={{
              opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)",
              transition: "all 1.2s cubic-bezier(.22,1,.36,1) .2s",
              display: "flex", flexDirection: "column", alignItems: "center",
            }}>
              {/* Fire centered on roof */}
              <div style={{ width: towerWidth, height: 70, marginBottom: 0, position: "relative", zIndex: 1, overflow: "visible" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0 }}>
                  <TowerFire width={towerWidth} />
                </div>
              </div>

              {/* Hotel Building */}
              <div style={{
                width: towerWidth, height: towerHeight,
                display: "flex", flexDirection: "column",
                borderRadius: "3px 3px 0 0",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 0 80px rgba(247,147,26,0.05), 0 4px 30px rgba(0,0,0,0.5)",
                position: "relative",
              }}>
                {[...segments].reverse().map((seg, i) => {
                  const h = segHeights[segments.length - 1 - i];
                  const isUnbuilt = seg.label === "Unbuilt";
                  return (
                    <div key={seg.label} style={{
                      height: h, position: "relative", flexShrink: 0,
                      background: isUnbuilt
                        ? "repeating-linear-gradient(45deg, #050505, #050505 3px, #080808 3px, #080808 6px)"
                        : seg.lit ? "rgba(10,8,5,0.97)" : "rgba(4,4,4,0.99)",
                      borderBottom: "1px solid rgba(255,255,255,0.02)",
                      overflow: "hidden",
                    }}>
                      <WindowGrid height={h} lit={seg.lit} noWindows={seg.noWindows} />
                      {isUnbuilt && h >= 16 && (
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 7, color: "rgba(255,255,255,.1)", fontFamily: "monospace", letterSpacing: ".15em" }}>UNBUILT</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Ground */}
              <div style={{ width: towerWidth, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: "0 0 2px 2px" }} />
            </div>

            {/* Dark windows note */}
            <div style={{
              marginTop: 16, padding: "10px 16px", textAlign: "center",
              background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 8,
              opacity: v ? 1 : 0, transition: "opacity .8s ease .6s",
            }}>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,.2)", fontFamily: "monospace", margin: 0, lineHeight: 1.7 }}>
                Dark windows & blacked-out floors = ~{fmt(LOST_EST)} lost coins scattered throughout
              </p>
            </div>

            {/* Breakdown */}
            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,.25)", fontFamily: "monospace", letterSpacing: ".12em", marginBottom: 14, textAlign: "center" }}>BREAKDOWN</div>
              {segments.filter(s => s.amount > 0).map((seg, i) => {
                const barWidth = Math.max(pct(seg.amount), 0.3);
                return (
                  <div key={seg.label} style={{
                    marginBottom: 8,
                    opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(10px)",
                    transition: `all .5s cubic-bezier(.22,1,.36,1) ${0.7 + i * 0.06}s`,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{
                          width: 8, height: 8, borderRadius: 2, flexShrink: 0,
                          background: seg.lit ? (seg.color || ORANGE) : "rgba(255,255,255,0.06)",
                          boxShadow: seg.lit ? `0 0 4px ${(seg.color || ORANGE)}44` : "none",
                        }} />
                        <span style={{
                          fontSize: 11, fontWeight: 600, fontFamily: "'Georgia',serif",
                          color: seg.lit ? "#fff" : "rgba(255,255,255,.2)",
                        }}>{seg.label}</span>
                        {seg.lit && <span style={{ fontSize: 8, opacity: 0.4 }}>💡</span>}
                      </div>
                      <span style={{
                        fontSize: 11, fontFamily: "monospace", fontWeight: 700,
                        color: seg.lit ? (seg.color || ORANGE) : "rgba(255,255,255,.12)",
                      }}>{fmt(seg.amount)}</span>
                    </div>
                    <div style={{ height: 4, background: "rgba(255,255,255,0.03)", borderRadius: 2, overflow: "hidden", marginBottom: 2 }}>
                      <div style={{
                        height: "100%", width: `${barWidth}%`,
                        background: seg.lit ? (seg.color || ORANGE) : "rgba(255,255,255,0.04)",
                        borderRadius: 2, transition: "width 1.2s ease",
                        boxShadow: seg.lit ? `0 0 6px ${(seg.color || ORANGE)}33` : "none",
                      }} />
                    </div>
                    {seg.desc && <div style={{ fontSize: 9, color: "rgba(255,255,255,.13)", fontFamily: "monospace" }}>{seg.desc}</div>}
                  </div>
                );
              })}
            </div>

            {/* The Insight */}
            <div style={{
              marginTop: 28, padding: "20px 18px",
              background: "rgba(0,0,0,0.4)", borderLeft: "2px solid rgba(247,147,26,0.2)",
              borderRadius: "0 8px 8px 0",
              opacity: v ? 1 : 0, transition: "opacity 1s ease 1s",
            }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", fontFamily: "'Georgia',serif", lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>
                Look at the Hotel. Most of the lights are on. Millions of {"\u20bf"}elievers checked in quietly — no announcements, no press releases, no SEC filings. They just hold their keys and keep the lights burning. The dark windows and blacked-out floors belong to the lost — coins that will never move again. At the very top, the Nakamoto Floors sit sealed and silent. At the bottom, the foundation is still being poured. The Hotel won't be finished until 2140.
              </p>
            </div>

            <div style={{ textAlign: "center", marginTop: 20, opacity: v ? 1 : 0, transition: "opacity 1s ease 1.2s" }}>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,.12)", fontFamily: "monospace", letterSpacing: ".08em" }}>PUBLIC COMPANY DATA LIVE VIA COINGECKO · OTHER DATA UPDATED PERIODICALLY</p>
            </div>
          </div>
        )}
      </div>
      <Support />
    </div>
  );
}

/* ─── Main App ─── */

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [media, setMedia] = useState(null);
  const [tale, setTale] = useState(null);

  if (screen === "splash") return <Splash onEnter={() => setScreen("hub")} />;
  if (screen === "hub") return <Hub onSelect={(id) => { setMedia(id); setScreen("media"); }} />;
  if (screen === "media") {
    if (media === "tales") {
      if (tale) return <TaleDetail tale={tale} onBack={() => setTale(null)} />;
      return <TalesScreen onBack={() => { setScreen("hub"); setMedia(null); setTale(null); }} onPick={setTale} />;
    }
    if (media === "floors") return <FloorsList onBack={() => { setScreen("hub"); setMedia(null); }} />;
    if (media === "glossary") return <GlossaryScreen onBack={() => { setScreen("hub"); setMedia(null); }} />;
    if (media === "fire") return <FireScreen onBack={() => { setScreen("hub"); setMedia(null); }} />;
    if (media === "findfloor") return <FindFloorScreen onBack={() => { setScreen("hub"); setMedia(null); }} />;
    if (media === "hoteltoday") return <HotelTodayScreen onBack={() => { setScreen("hub"); setMedia(null); }} />;
    if (media === "tower") return <TowerScreen onBack={() => { setScreen("hub"); setMedia(null); }} />;
  }
  return <Hub onSelect={(id) => { setMedia(id); setScreen("media"); }} />;
}
