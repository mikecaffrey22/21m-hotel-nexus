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
    translations: {
      es: {
        title: "Diez Velas",
        content: [
          "La mañana en que Mateo cumplió diez años, su madre lo dejó comerse una pupusa antes del desayuno.",
          "No la de siempre—la del curtido espeso, la que Abuela Lucía solo hacía cuando estaba de humor para quedarse una hora frente a la plancha, aplastando cada una con las palmas y maldiciendo en voz baja por el calor. Mateo se sentó con las piernas cruzadas en el piso de la cocina, el olor tibio del maíz llenándole el pecho, y miró a su abuela trabajar. Tenía setenta y tres años y se movía como si estuviera enojada con la masa. La masa nunca se quejaba.",
          "“Estás mirando,” dijo sin voltearse.",
          "“Estoy observando.”",
          "“Es lo mismo.”",
          "Le deslizó la pupusa al plato. El queso se estiró cuando la separó. La comió con las manos, el curtido chorreándole por la muñeca, y su madre no dijo nada porque hoy tenía diez y con diez eres lo suficientemente grande para ensuciarte a propósito.",
          "Los Pisos de El Salvador despertaron como siempre—cálidos y dorados, los pasillos llenándose con el olor a copal y café antes de que la mayoría abriera sus puertas. Mateo no recordaba una mañana que no se sintiera así. No estaba seguro de que existiera.",
          "Para media mañana el patio fuera de su unidad estaba ruidoso. El tío Carlos de Mateo estaba colgando papel picado del enrejado del jardín, papel de seda brillante en naranja, azul y blanco, y gritándole al primo Diego que sostuviera la escalera. Diego tenía doce y se creía demasiado grande para fiestas de cumpleaños pero no para el pastel, así que sostuvo la escalera y no dijo nada.",
          "El padre de Mateo sacó una mesa del pasillo de almacenamiento—la mesa de verdad, la de madera, no la plegable. Solo usaban la mesa de verdad para cumpleaños y Navidad y aquella vez que Tío Carlos llegó a casa con un ascenso y lloró sobre un plato de arroz. La mesa había sido construida por un hombre en el Cinturón Agrícola que trabajaba con madera real. Era pesada, marcada y olía a algo que Mateo no podía nombrar. Su padre decía que era cedro. Mateo no sabía qué era un cedro. Solo sabía que la mesa olía bien y que solo la sacaban cuando algo importaba.",
          "“¡Mateo! ¡Ven a ayudar a tu tío!”",
          "Fue. Sostuvo el otro extremo de un rollo de serpentinas mientras Carlos caminaba hacia atrás por el patio, colgándolas sobre la baranda del jardín. Los jardines verticales trepaban tres pisos a cada lado del patio—helechos, jazmín, algo morado que la madre de Mateo llamaba lavanda. El olor se mezclaba con el copal que llegaba desde el paseo. Alguien lo estaba quemando temprano. Mateo lo respiró hondo y lo retuvo.",
          "Para la tarde el patio estaba lleno. Tías que veía cada semana y tías que veía una vez al año. Su abuelo, Abuelo Tomás, sentado en la silla del rincón que reclamaba cada vez que se juntaban más de seis personas. Tres amigos de la escuela de Mateo, todavía con uniforme, persiguiendo a Diego por el jardín y gritando. Señora Raquel de cuatro puertas más allá, que siempre traía tamales envueltos en hojas de plátano y siempre se quedaba demasiado tiempo y a quien todos querían porque sus tamales eran perfectos y sus chismes peores.",
          "La música empezó cuando el tío de Mateo sacó la guitarra. Sin amplificar. Solo madera y cuerdas y la voz de su tío, que no era buena pero sí fuerte. Tocó cumbia y la madre de Mateo bailó con su padre y sus tías aplaudían a contratiempo y su abuelo golpeaba el brazo de su silla como un hombre dirigiendo una orquesta que solo él podía oír.",
          "Las pupusas llegaron en oleadas. Frijoles con queso. Loroco con queso. Chicharrón. Una fuente de plátanos fritos. Arroz con frijoles rojos. Curtido en tres platos diferentes porque Abuela Lucía, Tía Marta y Señora Raquel cada una hacía el suyo y cada una juraba que el suyo era mejor. Mateo comió hasta que el estómago le presionaba el cinturón y luego comió un plátano más porque su madre se lo puso en el plato y no le dices que no a tu madre en tu cumpleaños.",
          "Estaba sentado en el borde del jardín, con los pies colgando, mirando el patio girar con voces y color, cuando Abuela Lucía se sentó a su lado. Se movía lento estos días. Se bajó al borde como quien pone algo frágil—con ambas manos y la respiración contenida.",
          "“Diez,” dijo.",
          "“Diez.”",
          "“¿Sabes qué hacía mi abuela cuando tenía diez años?”",
          "Mateo negó con la cabeza.",
          "“Barriendo un piso. No este tipo de piso.” Golpeó la baldosa lisa debajo de ellos. “Un piso de tierra. En Soyapango. La casa de tu bisabuela Consuelo.”",
          "Mateo había escuchado el nombre antes. Bisabuela Consuelo. La mujer de la fotografía en el estante de su abuela—pelo oscuro, cara ancha, una mirada como si estuviera retando a alguien a hacerle perder el tiempo. Mateo nunca la conoció. Murió antes de que él naciera. Pero Lucía hablaba de ella como algunos hablan del clima—constantemente, naturalmente, como si siempre estuviera ahí.",
          "“¿Hacía frío?” preguntó.",
          "Lucía se rió. Una risa corta. “No, mijo. Consuelo decía que hacía calor. Tanto calor que podías sentir el aire sobre tu piel como un trapo mojado. No sabían lo que era el frío. No el de verdad.”",
          "Miró hacia el patio. Las paredes del jardín trepando alto. El papel picado levantándose con la brisa de la ventilación.",
          "“Cuando Consuelo era joven, nada de esto existía. No había Hotel. No había pisos. Solo estaba el país. El Salvador. Pequeño. Pobre. Hermoso. Y todos les decían que no eran nada.”",
          "Lo dijo sin amargura. Como quien reporta el clima de hace mucho tiempo.",
          "“Y entonces llegó Bukele.”",
          "Mateo conocía el nombre. Todos en los pisos conocían el nombre. Había un mural de Bukele en el paseo principal—no una pintura de su cara sino de sus manos, colocando una moneda naranja brillante en un mapa de El Salvador. El mural tenía tres pisos de alto. Mateo pasaba frente a él cada día camino a la escuela.",
          "“Consuelo me dijo que era joven,” dijo Lucía. “Más joven que tu padre. Y se paró frente al mundo entero y dijo, 'Vamos a hacer esto.' Y el mundo entero se rió.”",
          "“¿Por qué?”",
          "“Porque nadie creía que un país pequeño podía hacer lo que los grandes no harían. Lo llamaron loco. Dijeron que fracasaría. Los periódicos, los banqueros, los otros presidentes—todos riéndose. Y tu bisabuela Consuelo, ella lo vio en la televisión y dijo, 'Ese muchacho o es un tonto o es un profeta.'”",
          "“¿Cuál era?”",
          "Lucía puso su mano en la rodilla de Mateo. Sus dedos eran ásperos por décadas cocinando. Los nudillos anchos.",
          "“Tenía razón. Eso es todo lo que importa.”",
          "Le contó el resto en pedazos—como siempre contaba historias, entre sorbos de horchata e interrupciones de Carlos preguntando dónde estaban las servilletas. Cómo Bukele hizo de El Salvador el primer país en la Tierra en adoptar Bitcoin. Cómo empezaron a acumular cuando nadie más lo haría. Cómo las otras naciones lo llamaron imprudente, irresponsable, peligroso. Cómo El Salvador siguió acumulando. Todo transmitido a través de la familia como una receta—Consuelo se lo contó a Lucía, y ahora Lucía se lo contaba a Mateo.",
          "“Y entonces llegó el Frío,” dijo.",
          "Mateo sabía del Frío. Lo enseñaban en la escuela. El mundo fuera del Hotel, congelado. El dinero que dejó de funcionar. Los gobiernos que cayeron.",
          "“Cuando llegó el Frío, todos necesitaban pisos. Todos estaban desesperados. Y las naciones que se habían reído—estaban luchando. Intentando comprar lo que El Salvador ya tenía.”",
          "Tomó un plátano frito del plato junto a ella y le dio un mordisco. Masticó despacio. Mateo esperó.",
          "“Consuelo se registró con tu bisabuelo. Ya era vieja entonces. Dijo que los pisos eran cálidos y lloró porque nunca pensó que viviría para verlo. Diez mil pisos, mijo. Porque un hombre creyó en algo cuando nadie más lo haría, y un país entero lo siguió.”",
          "Agitó su mano hacia el patio. Hacia las tías y los tíos y los primos gritando y la guitarra y el copal y la calidez.",
          "“Así se ven diez mil pisos.”",
          "Mateo miró. Había mirado su hogar un millón de veces. Pero algo en escucharlo—en escuchar que casi no sucedió, que el mundo se había reído, que su bisabuela había visto a un joven presidente en televisión y no sabía si tener esperanza o tener miedo—hizo el patio más nítido. Los colores más brillantes. La calidez más pesada sobre su piel.",
          "“¿Abuela?”",
          "“Mm.”",
          "“¿Somos ricos?”",
          "Se rió otra vez. Más fuerte esta vez. Su abuelo miró desde su silla.",
          "“Somos cálidos,” dijo. “Somos alimentados. Estamos juntos. Tus primos van a la escuela. Tu padre tiene un trabajo del que está orgulloso. Y nadie—nadie—puede quitarnos estos pisos. Están en el Libro Mayor. Son nuestros.”",
          "Le apretó la rodilla.",
          "“Eso no es rico, mijo. Es algo mejor. Es construido.”",
          "El pastel salió cuando la tarde se asentaba—el patio cálido y dorado, como siempre. Diez velas. Su madre lo llevó y todo el patio cantó, desafinado y demasiado fuerte y en una mezcla de español e inglés que habría hecho desmayar a un director de coro. Mateo se paró frente a las velas y el calor de las pequeñas llamas le tocó la cara y por un segundo el patio quedó en silencio.",
          "“Pide un deseo,” dijo su madre.",
          "Cerró los ojos. Pensó en el mural del paseo. Las manos colocando la moneda en el mapa. Pensó en un piso de tierra en Soyapango que ya no existía. Pensó en Bisabuela Consuelo a los diez años, barriendo.",
          "No pidió nada. Abrió los ojos y sopló las velas porque todo lo que podía desear ya estaba en la habitación.",
          "El patio estalló. Carlos gritó. Diego metió un dedo en el glaseado antes de que cortaran la primera rebanada y la madre de Mateo le pegó en la mano sin mirar. Abuelo Tomás levantó su vaso de horchata y dijo algo que Mateo no pudo escuchar por el ruido pero que hizo llorar a tres de sus tías.",
          "Ella estuvo callada un momento. Luego recostó la cabeza contra la pared del jardín y cerró los ojos.",
          "“No es una historia, mijo. Es donde vives.”",
          "Mateo caminó de regreso a su cuarto por el paseo silencioso. El copal se había desvanecido pero no ido. Los jardines olían a verde. En algún lugar tres pisos abajo, una guitarra todavía sonaba—la fiesta de alguien más, la noche de alguien más. La calidez se posaba sobre todo como si siempre hubiera estado ahí. Como si siempre estaría.",
          "Tenía diez años. Vivía en los Pisos de El Salvador. Y los pisos eran cálidos.",
        ],
      },
    },
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
    translations: {
      es: {
        title: "Sterling",
        content: [
          "El nombre todavía aparecía en los documentos. Sterling. Sonaba a dinero antiguo, a pisos pulidos, a un apellido que solía abrir puertas con solo decirlo. Arlo Sterling tenía veintidós años y el nombre era lo único que le quedaba.",
          "Se despertó en el cubículo de su madre. El cubículo de su madre muerta. Todavía lo llamaba así—el cubículo de su madre—aunque ella había muerto hacía tres años y el espacio ahora era suyo por defecto, porque nadie más lo quería y porque Arlo estaba ahí cuando ella dejó de respirar y simplemente nunca se fue.",
          "El Desagüe se despertaba por oleadas. No había mañana aquí abajo—no había sol, no había ciclo, solo las luces fluorescentes parpadeantes que se encendían y apagaban con un temporizador que nadie había mantenido en décadas. Arlo sabía la hora por el ruido. El turno temprano de la cocina comunitaria significaba las 5 AM. Los niños gritando significaba las 7. La fila del agua significaba que era hora de levantarse.",
          "Se levantó. El catre se quejó. Era estrecho y fino y olía a algo que no tenía nombre pero que todos en el Desagüe conocían—el olor húmedo y frío del sudor humano atrapado en tela sintética que nunca se secaba completamente porque el aire aquí abajo nunca se calentaba lo suficiente para evaporar nada.",
          "Se puso los zapatos. Los mismos zapatos. Los únicos zapatos. Le quedaban apretados en el pie izquierdo y sueltos en el derecho y los había tenido por cuatro años y si duraban uno más estaría haciendo un buen negocio.",
          "---",
          "La historia de los Sterling era la historia del Desagüe—o al menos la versión que el Desagüe contaba cuando quería recordarse a sí mismo que las cosas podían ser peores.",
          "Los Sterling tuvieron mil pisos una vez. Mil. No mil satoshis—mil pisos, cada uno valiendo cien millones de sats, una fortuna tan grande que el número no cabía en la boca sin sonar inventado. Fueron de los primeros. Dinero antiguo. El apellido estaba grabado en la pared de una sala de comercio en algún lugar por encima del Piso 50,000—o eso decía la historia. Arlo nunca la había visto. Arlo nunca había estado por encima del Piso 50.",
          "Lo que le pasó a los Sterling fue simple. Le confiaron las llaves a alguien. Alguien las tomó. Las mil llaves, transferidas en el Libro Mayor, y el Libro Mayor no miente y el Libro Mayor no se revierte y los Sterling se despertaron siendo dueños de nada.",
          "El ladrón nunca se mudó a los pisos. Nadie lo hizo. Los mil pisos están vacíos hasta el día de hoy—cálidos, iluminados, sellados, y fantasmas. Un espacio de hotel vale miles de millones de satoshis sentado vacío porque quien robó las llaves probablemente murió antes de poder usarlas, y el Libro Mayor no reconoce “probablemente.” El Libro Mayor reconoce llaves. Las llaves se fueron. Los pisos se fueron. Los Sterling fueron al Desagüe.",
          "Eso fue hace generaciones. Arlo era el resultado final—el nieto del nieto del nieto de la persona que cometió el error. Nunca tuvo los pisos. Nunca vio los pisos. Nunca tocó la riqueza que se suponía que lo definía. Pero llevaba el nombre, y el nombre llevaba la historia, y la historia era una piedra que colgaba de su cuello todos los días que se despertaba en un cubículo que olía a mala suerte de generaciones.",
          "---",
          "La fila del agua estaba a cuarenta personas de profundidad cuando Arlo llegó. Siempre estaba a cuarenta personas de profundidad. La estación de agua del Piso 2 servía a catorce mil personas y tenía cuatro grifos y los grifos funcionaban cuando querían. Arlo tomó su lugar y esperó. La mujer delante de él estaba cargando un bebé que no hacía ruido. El hombre detrás de él estaba cargando un balde que lo hacía.",
          "Cuarenta y cinco minutos. Así de largo se tardaba, más o menos, dependiendo de si los grifos cooperaban y si alguien al frente se tomaba más de lo suyo y si la presión del agua se mantenía. La presión del agua no siempre se mantenía. El agua venía de la planta baja—extracción de hielo, filtración, bombeo hacia arriba. Para cuando llegaba al Piso 2, ya había perdido la mitad de su fuerza. Algunos días salía bien. Algunos días goteaba.",
          "Hoy goteaba.",
          "Arlo llenó su contenedor. Dos litros. Eso era todo lo que conseguías por viaje y podías hacer dos viajes al día y si querías más podías intercambiar algo por ello pero Arlo no tenía nada que intercambiar así que dos viajes significaban cuatro litros y cuatro litros significaban que te duchabas y bebías o bebías y lavabas tu ropa pero no las tres cosas.",
          "Bebió. Puedes ducharte mañana.",
          "---",
          "El Mercado de Lámparas se abría a las nueve, o cuando el primer vendedor decidía que se abría, que era más o menos lo mismo. Arlo fue porque Arlo siempre iba. No tenía trabajo—no trabajo real, no la clase que pagaba sats. Tenía favores. Cargaba cajas para Señora Pak, que manejaba un puesto de ropa dos veces a la semana y le pagaba en calcetines. Limpiaba mesas para Demetrio, que manejaba un bar que servía algo que Demetrio llamaba cerveza y que Arlo llamaba pena líquida, y Demetrio le pagaba en comida.",
          "La comida era arroz. Siempre era arroz. A veces el arroz tenía algo encima—una pasta de proteína, un trozo de algo fermentado que se suponía sabía a carne pero sabía a disculpa. En el Desagüe no eras exigente. Comías lo que había y eras agradecido de que hubiera algo.",
          "Arlo llevó una caja de ropa usada del muelle de almacenamiento al puesto de Señora Pak. La caja pesaba más que él. Ella no le dio las gracias. Él no esperaba que lo hiciera. Le dio tres pares de calcetines y un guante. Un guante. Ella dijo que el otro estaba perdido. Arlo tomó el guante porque un guante es más cálido que ningún guante y abajo aquí tomabas lo que podías conseguir.",
          "Cargó dos cajas más. Limpió cuatro mesas. Comió arroz con algo encima que no preguntó. Bebió agua de su contenedor. Se sentó en un corredor en el borde del Mercado de Lámparas y miró la pantalla de vista.",
          "---",
          "Las pantallas de vista eran la crueldad más tranquila del Hotel.",
          "Podías ver cualquier piso. Cualquier piso en absoluto. Podías sentarte en el Desagüe, en un corredor que olía a orina y cableado viejo, y mirar los Pisos de El Salvador—los jardines, los paseos, la luz dorada, los niños jugando en patios. Podías mirar los Pisos de Japón—los cerezos en flor, las salas de té, los pasillos que brillaban como la porcelana. Podías mirar los Pisos de Strategy—la infraestructura, la escala, la eficiencia imponente de un millón de pisos gestionados por personas que nunca tuvieron que preocuparse de dónde vendría su próxima comida.",
          "Podías ver todo esto. Podías verlo cuando quisieras. Y nunca podrías llegar ahí.",
          "Arlo miraba los Pisos de Strategy. No sabía por qué. Tal vez porque los Sterling habrían estado en algún lugar de ese rango si las llaves no hubieran sido robadas. Tal vez porque el alcance era obsceno y Arlo necesitaba ver algo obsceno para recordarse que el mundo era más grande que el corredor en el que estaba sentado. Tal vez solo porque la imagen era nítida y el aire se veía limpio y limpio era algo que Arlo no podía pagar.",
          "Miró por veinte minutos. Luego apagó la pantalla porque veinte minutos era todo lo que podía soportar antes de que la brecha entre la imagen y su vida se estrechara lo suficiente para ahogarlo.",
          "---",
          "De vuelta al cubículo. El catre. La manta. El olor.",
          "Tenía una fotografía de su madre debajo de la almohada. No una fotografía real—una imagen impresa en un trozo de lámina de metal, la clase de cosa que los vendedores ambulantes en el Mercado de Lámparas hacían por un favor. Su madre tenía la cara de alguien que una vez fue bonita y luego fue cansada y luego no fue nada en absoluto. Murió en este catre. Las últimas palabras que le dijo fueron las mismas que le decía todas las noches.",
          "“Tengo frío, Arlo.”",
          "Tenía frío. Todos tenían frío. El Desagüe era frío como norma, frío como identidad, frío como la cosa contra la cual medías todos los demás sentimientos. Cálido era algo que pasaba en las pantallas de vista. Cálido era un rumor de pisos superiores. Cálido era lo que Arlo nunca había sido, ni un solo día de su vida, y estaba bastante seguro de que nunca lo sería.",
          "Guardó la fotografía. Se acostó. La manta era delgada. El catre se quejaba con cada respiración.",
          "Mañana se levantaría. Haría fila para el agua. Cargaría cajas. Limpiaría mesas. Comería arroz. Miraría la pantalla de vista y luego la apagaría. Volvería al cubículo. Se acostaría.",
          "Y pasado mañana lo mismo.",
          "---",
          "El nombre todavía aparecía en los documentos. Sterling. Mil pisos fantasma en algún lugar arriba, cálidos e iluminados y vacíos. Un legado que pesaba más que la caja de ropa de Señora Pak y que no venía con calcetines.",
          "Arlo cerró los ojos. El fluorescente del corredor parpadeó a través de la cortina del cubículo. Alguien tres cubículos más allá tosía el tipo de tos que no se iba. Un bebé lloró y paró y lloró otra vez.",
          "Tenía frío.",
          "Se quedó dormido de todos modos. Mañana llegaría pronto. Siempre lo hacía.",
        ],
      },
    },
  },
  {
    id: "michaels-club",
    title: "Michael\u2019s Club",
    subtitle: "A Tale from Floor 42,000",
    floor: "Michael\u2019s Club (Floor 42,000)",
    words: "1,600",
    file: "Michaels-Club.pdf",
    teaser: "Floor 42,000 has one rule. Your name has to be Michael.",
    content: [
      "Floor 42,000 has one rule. Your name has to be Michael.",
      "Not Mike. Not Mikey. Not \u201Cmy middle name is Michael.\u201D Not \u201CI go by Michael now.\u201D Your birth certificate has to say Michael. The original. No variations. No abbreviations. No loopholes.",
      "There is a desk at the entrance. Behind the desk sits a Michael. His job is to check birth certificates. He has been doing this for eleven years. He takes it more seriously than most people take anything they\u2019ve ever done in their lives. He once turned away a man named Micheal \u2014 M-I-C-H-E-A-L \u2014 and the man wept. The Michael at the desk did not flinch. He pointed at the second letter. He said, \u201CThat\u2019s an E.\u201D He said, \u201CThe door is behind you.\u201D",
      "The corridor signs all say MICHAEL. Every one. The bathrooms say MICHAEL. The supply closets say MICHAEL. The floor directory, which in any other part of the Hotel would list residents by unit number, just says MICHAEL over and over and over again.",
      "---",
      "The floor is, to put it plainly, packed.",
      "Michael is the most popular name in the Hotel. It isn\u2019t close. On the lower floors, parents name their sons Michael the way you\u2019d hand a child a lottery ticket \u2014 because the name carries weight, because history is full of Michaels who built things and ran things and changed things, and because maybe, just maybe, a boy named Michael has a better shot at climbing out. It\u2019s superstition dressed as tradition. It doesn\u2019t work. But they keep doing it, and the Hotel keeps filling with Michaels.",
      "The floor was founded by a Michael who felt the name deserved better. His argument \u2014 delivered in a speech that has since been reprinted in The Michael four times \u2014 was that every Michael in the Hotel carries the unfair expectation of living up to every great Michael who ever lived. Michael Jordan. Michael Jackson. Michael Saylor. Michelangelo. Archangel Michael. The weight of the name is absurd, he said. The only fair thing to do was to give Michaels a place where they could just be Michael. Not a great Michael. Not a famous Michael. Just Michael, among Michaels, where the name meant nothing more than the door you walked through.",
      "He assumed he\u2019d get maybe thirty residents. A nice community. Quiet. Michaels helping Michaels.",
      "The corridors are loud. Michaels are not quiet people. This is not a stereotype \u2014 it is a statistical observation made by the Michaels themselves, who conducted an internal noise survey and found that the average decibel level on Floor 42,000 is eleven percent higher than any comparable residential floor in the Hotel. The Michaels were proud of this finding. They published it in the floor newsletter. The newsletter is called The Michael.",
      "---",
      "The leaderboard is mounted on the main corridor wall. It is six feet tall. It is made of polished steel. It is the single most contentious object on the floor.",
      "The leaderboard ranks every Michael on Floor 42,000 according to a set of categories that change every month because the Michaels cannot agree on what should be measured. In January, the categories were Best Hair, Loudest, and Most Helpful. In February, they were Firmest Handshake, Best Posture, and Fastest Walker. In March, someone proposed Tallest, and fourteen Michaels threatened to move out because they felt it was discriminatory against short Michaels. The category was replaced with Best Shoes. Nobody was satisfied but everyone had an opinion.",
      "The votes are cast anonymously. The counting is done by a committee of five Michaels selected at random. The committee has never once released results that weren\u2019t immediately challenged by at least thirty other Michaels. There have been recounts. There have been tribunals. There was, briefly, a shadow committee that conducted its own parallel count and posted the results on a rival board in the east corridor. The shadow board was torn down after six hours. The Michaels who tore it down were not punished. The Michaels who put it up have not forgiven them.",
      "---",
      "But the category that matters \u2014 the one that has persisted through every monthly rotation since the leaderboard was installed \u2014 is the one at the top.",
      "Most Michael.",
      "The criteria for Most Michael have never been formally defined. This is the problem. This is also, in some ways, the point.",
      "What does it mean to be the Most Michael? Every Michael on Floor 42,000 has an answer. No two answers are the same.",
      "Michael Reeves, who has lived on the floor for nine years, believes Most Michael means dependability. \u201CA Michael shows up,\u201D he says. \u201CA Michael is there when you need him. A Michael doesn\u2019t flake.\u201D He has won Most Michael zero times.",
      "Michael Tran believes it means confidence. \u201CA Michael walks into a room and the room knows,\u201D he says. He demonstrates this by walking into rooms with his chest out and his chin up. The rooms do not appear to notice. He has won Most Michael zero times.",
      "Michael Obi believes it means kindness. He holds doors open. He carries things. He once helped a fellow Michael move furniture for six hours on a Saturday and then cooked him dinner. He lost Most Michael that month to a man who had done nothing notable except show up to the vote in a very clean shirt.",
      "The clean shirt Michael \u2014 Michael Park \u2014 believes Most Michael means presentation. \u201CIt\u2019s about how you carry yourself,\u201D he says, adjusting a collar that does not need adjusting. He won once. He has been adjusting his collar ever since.",
      "---",
      "The current reigning Most Michael is a man named Michael Davis.",
      "Michael Davis is forty-one years old. He is of average height. He has average hair. He wears clothes that can only be described as clothes. He does not have strong opinions about anything. He does not argue at floor meetings. He does not campaign. He has never once, in the three years he has lived on Floor 42,000, raised his voice.",
      "He has won Most Michael four months in a row.",
      "Nobody can explain it. The Michaels have tried. There is a theory that Michael Davis is so perfectly, unremarkably Michael that he functions as a kind of mirror \u2014 every Michael who looks at him sees the Michael they think they are. There is a competing theory that the other Michaels simply forget who they voted for and default to the name that sounds the most familiar. Michael Davis sounds like a Michael. It sounds like every Michael. It sounds like the Michael you\u2019d invent if you needed a Michael for a form.",
      "Michael Davis does not acknowledge the streak. When asked about it, he says, \u201CThat\u2019s nice.\u201D When asked what it means to be Most Michael, he says, \u201CI don\u2019t know. I\u2019m just Michael.\u201D This response has only strengthened his lead.",
      "---",
      "The floor has other traditions.",
      "Michael of the Month is a separate award from the leaderboard, which has caused confusion that the Michaels refuse to resolve. The leaderboard is voted on. Michael of the Month is appointed by the Floor Council, which is five Michaels who were elected by the other Michaels in an election that also used the name Michael for every candidate on the ballot. Voter turnout was high. Nobody is sure the right Michaels won.",
      "The Floor Council meets on Tuesdays. The meetings last four hours. The minutes are published in The Michael. The minutes frequently contain the sentence \u201CA Michael raised an objection.\u201D They never specify which one.",
      "There is a Michael who has been petitioning the Floor Council for two years to add a middle name requirement. He believes that true Michaels should have a middle name that is not also Michael. His argument is that a Michael Michael would be \u201Ctoo much.\u201D The petition has forty-three signatures. It has also been formally opposed by a Michael whose middle name is, in fact, Michael. That Michael\u2019s full name is Michael Michael Gutierrez. He is not willing to discuss it.",
      "---",
      "The view screens on Floor 42,000 are set permanently to display Floor 42,000. The Michaels are not interested in other floors. Other floors do not have enough Michaels.",
      "Occasionally a visitor requests access. The floor\u2019s access policy is the simplest in the Hotel: your name must be Michael. Birth certificate required. A man named David once asked if he could visit for an afternoon. He was told no. He asked what if he changed his name. He was told it had to be on the original birth certificate. He asked what if he got a new birth certificate. He was told that\u2019s not how birth certificates work. He left. The Michael at the desk watched him go and felt nothing.",
      "---",
      "The question that outsiders always ask is: don\u2019t they get confused?",
      "The answer is yes. Constantly. A Michael will yell \u201CMichael!\u201D down the corridor and forty heads will turn. Phone calls are a nightmare. Deliveries are worse \u2014 the Laszlo\u2019s delivery runner has started just leaving the pizzas at the entrance and letting the Michaels sort it out. They sort it out by arguing. The pizza gets cold. They eat it anyway. Michaels are not picky about pizza.",
      "They have tried systems. First names don\u2019t work because everyone\u2019s first name is Michael. Last names worked for a while until the floor acquired its third Michael Chen, at which point the last name system also collapsed. They tried numbers \u2014 Michael 1 through Michael whatever-the-current-headcount-was \u2014 but nobody could agree on the ordering criteria and the resulting argument lasted two weeks. They tried nicknames. A Michael named Michael Walsh became \u201CTall Michael.\u201D A Michael named Michael Carr became \u201CLoud Michael.\u201D A Michael named Michael Espinoza became \u201CMichael Who Is Always Eating.\u201D He did not love this nickname. He kept eating.",
      "Currently, the unofficial system is pointing. You point at the Michael you mean. If you\u2019re on the phone, you describe them. \u201CThe Michael with the green jacket.\u201D \u201CThe Michael who stands near the water tap.\u201D \u201CThe Michael who won\u2019t stop talking about his handshake.\u201D Everyone knows which Michael that is.",
      "---",
      "The floor is absurd. The Michaels know it is absurd. They do not care. They chose to live here. They filled out the paperwork. They showed their birth certificates. They walked through the door that says MICHAEL and they stayed.",
      "When asked why, the answers are surprisingly consistent.",
      "\u201CWhere else am I going to go,\u201D says Michael Obi, \u201Cwhere everyone already knows my name?\u201D",
    ],
    translations: {
      es: {
        title: "El Club de Michael",
        content: [
          "El Piso 42,000 tiene una regla. Tu nombre tiene que ser Michael.",
          "No Mike. No Mikey. No “mi segundo nombre es Michael.” No “me dicen Michael.” No “mi madre quería ponerme Michael pero mi padre insistió en David.” La regla es absoluta. Tu acta de nacimiento dice Michael, o te das la vuelta.",
          "Hay un escritorio en la entrada. Detrás del escritorio se sienta un Michael. Su trabajo es verificar actas de nacimiento. Lo ha hecho por once años. Nunca ha dejado pasar a alguien que no sea Michael. Es extraordinariamente bueno en esto. Su nombre es Michael Park.",
          "Los letreros del corredor todos dicen MICHAEL. Todos. Los baños dicen MICHAEL. La señalización de la escalera dice MICHAEL. Hay un letrero encima de la puerta principal que dice, en letras de metal de treinta centímetros de alto, MICHAEL. El efecto es desorientador si no estás preparado y sigue siendo desorientador si lo estás.",
          "---",
          "Nadie está del todo seguro de quién fue el primer Michael.",
          "La historia es que un hombre ambicioso llamado Michael compró el Piso 42,000—un solo piso en el Rango Abierto, sin vistas, sin vecinos, sin valor estratégico—y decidió hacer con él lo único que se le ocurrió: crear un espacio donde solo las personas que compartieran su nombre pudieran vivir. La motivación original no está clara. Algunos Michaels creen que fue un acto de solidaridad. Otros creen que fue un acto de soledad. Unos pocos creen que fue una broma que fue demasiado lejos. La verdad es que no importa. Lo que importa es que el piso se llenó.",
          "Se llenó rápido.",
          "Michael es, por un margen significativo, el nombre más popular en el Hotel. Esto no es un accidente. En los pisos bajos, hay una creencia—no del todo infundada—de que ponerle Michael a tu hijo le da una mejor oportunidad. El nombre suena a éxito. Suena a los pisos superiores. Suena a alguien que podría lograrlo. Padres en el Desagüe que no pueden darle a sus hijos un solo satoshi les dan el nombre Michael y esperan que sea suficiente.",
          "No es suficiente. Pero hay muchos Michaels.",
          "---",
          "El piso está absolutamente lleno.",
          "Hay una sala común que se suponía debía acomodar a cincuenta y ahora acomoda a ciento ochenta. Hay dormitorios que son más Michael que dormitorio. Hay un comedor donde cada silla tiene un nombre grabado y cada nombre es Michael y las discusiones sobre quién se sienta dónde nunca terminan.",
          "Hay un tablero de clasificación.",
          "El tablero de clasificación es el corazón del piso. Se actualiza mensualmente. Clasifica a cada Michael según categorías que han sido debatidas, revisadas, apeladas y redebatidas cada mes desde que el piso abrió. Las categorías incluyen: Michael más Servicial. Michael más Productivo. Michael más Creativo. Michael más en Forma. Y en la parte superior, la corona permanente: Michael más Michael.",
          "Michael más Michael nunca ha sido definido. No existe criterio. No existe rúbrica. Cada mes, los Michaels votan por el Michael que consideran más Michael, y cada mes pelean por lo que eso significa. Es la pregunta más antigua del piso y la única que los une.",
          "---",
          "Michael Davis ganó Michael más Michael once veces seguidas.",
          "Nadie se lo explica. Michael Davis es un hombre de cuarenta y tres años, de estatura media, complexión media, opiniones medias, con un trabajo mediocre en la cocina del comedor y un pasatiempo de coleccionar tapas de botellas que ni siquiera a él le emociona especialmente. No es el más fuerte. No es el más listo. No es el más carismático. Lo que Michael Davis es, según todos los demás Michael que lo han observado durante once meses de votación, es la persona más agradablemente promedio que jamás hayan conocido.",
          "“Es como si alguien hiciera un Michael en un laboratorio,” dijo Michael Chu una vez, no como insulto.",
          "La teoría: Michael más Michael no se trata de excelencia. Se trata de esencia. Michael Davis es, de alguna manera que nadie puede articular y todos pueden sentir, la versión más pura de lo que un Michael debería ser. Ni más. Ni menos. Solo Michael. El hecho de que esto sea indistinguible de ser extraordinariamente ordinario es la broma que ningún Michael admite que es graciosa.",
          "---",
          "Michael Saylor aparece en el tablero. No la versión del Piso 42,000—el real, el de la Catedral, el que compró 17,732 pisos con convicción pura. Su nombre aparece en la sección “Michaels Famosos de la Historia”, junto con Michael Jordan, Michael Jackson y Michael—el arcángel. No está claro quién añadió al arcángel. Nadie se ha atrevido a quitarlo.",
          "Una vez al año, el piso celebra el Día del Michael. No es una fiesta reconocida oficialmente. No es reconocida por nadie fuera del Piso 42,000. Dentro del Piso 42,000, es el evento más importante del calendario. Hay discursos. Hay premios. Hay un espectáculo de talentos que es exactamente tan bueno y tan malo como esperarías de un espectáculo de talentos compuesto enteramente por Michaels.",
          "El discurso principal siempre es dado por el Michael que ganó Michael más Michael ese año. Michael Davis ha dado el discurso principal once veces. El discurso nunca cambia. Se para frente al piso y dice, “Gracias. Estoy orgulloso de ser Michael.” Se baja. El piso aplaude. Es, objetivamente, el discurso menos inspirador de la historia. Los Michaels lloran cada vez.",
          "---",
          "Desde fuera, el Piso 42,000 es una curiosidad. Un pie de página en la lista de pisos del Hotel. Una línea en el mapa vertical entre los Pisos de los Winklevoss y los Pisos Suizos que la mayoría salta. Una broma que existe hace demasiado tiempo para seguir siendo graciosa y que de alguna manera sigue siendo graciosa.",
          "Desde dentro es otra cosa.",
          "Desde dentro es un piso donde todos saben tu nombre porque tu nombre es el de todos. Es un piso donde la pregunta “¿Quién es Michael?” tiene ciento ochenta respuestas y ninguna es incorrecta. Es un piso donde un hombre de cuarenta y tres años que colecciona tapas de botellas puede pararse frente a una sala y decir “Estoy orgulloso de ser Michael” y no está mintiendo y la sala puede aplaudir y no están mintiendo y el momento puede ser absurdo y sincero al mismo tiempo porque eso es lo que pasa cuando le pones tu nombre a un piso y luego lo llenas con todos los que lo comparten.",
          "El piso es absurdo. Los Michaels saben que es absurdo. No les importa. Lo eligieron. Y cada vez que el Hotel produce otro Michael—otro niño del Desagüe con un nombre que sus padres eligieron como una oración—el Piso 42,000 tiene espacio.",
          "Cuando se les pregunta por qué, las respuestas son sorprendentemente consistentes.",
          "“¿A dónde más voy a ir,” dice Michael Obi, “donde todos ya saben mi nombre?”",
        ],
      },
    },
  },
  {
    id: "soil",
    title: "Soil",
    subtitle: "A Tale from the Agricultural Belt",
    floor: "Agricultural Belt (Floors 5,000\u201320,000)",
    words: "1,800",
    file: "Soil.pdf",
    teaser: "The woman at the irrigation junction doesn\u2019t look up when he passes. She\u2019s been calibrating the same valve for twenty minutes. She is not calibrating a valve.",
    content: [
      "The woman at the irrigation junction doesn\u2019t look up when he passes. She\u2019s been calibrating the same valve for twenty minutes. She is not calibrating a valve. She\u2019s counting his footsteps and measuring the interval between his arrival and the shift change. He knows this because she\u2019s his handler and they have never spoken.",
      "---",
      "His name \u2014 his real name \u2014 is Emmett Lowe. His working name is different. On the Belt he goes by the one on his transit papers: Jun Lowe, agricultural technician, Floor 8,200, soybean processing. The name is half true. His mother was a Lowe from Boise who met a PLA officer\u2019s daughter in a refugee camp two years before the Great Check-In. The family was American before the Hotel existed and American after, which is the only reason the people on Floors 1,200,000 through 1,700,000 know his name at all.",
      "He was recruited at nineteen. Not dramatically. A woman sat next to him in a Local Lift and asked if he missed the Belt. He said he\u2019d never left. She said that was the point.",
      "He has been on the Agricultural Belt for six years. He smells like soil. His hands are cracked the way Belt hands crack \u2014 at the knuckles, along the lifelines, in the webbing between thumb and forefinger where the hydroponic nutrient solution gets in and doesn\u2019t wash out. He eats in the refectories. He drinks the water. He has friends, or what pass for friends on a floor where everyone watches everyone because a crop failure means a thousand people don\u2019t eat.",
      "He is very good at his job. Both of them.",
      "---",
      "The Belt is not one thing. It is dozens of things pretending to share a corridor. Floors 5,000 through 7,500 are cooperative-held \u2014 small operations, family farms, people who\u2019ve worked the same hydroponic racks for three generations. Floors 7,500 through 12,000 are fractured between El Salvador, Japan, and a handful of independent operators who spend more time in territorial disputes than they spend growing food. Floors 12,000 through 20,000 are where the major powers hold their agricultural wings. The US has a section. The Chinese section is larger.",
      "Emmett works on a Japanese-administered floor. His assignment for the past four years has been surveillance of China\u2019s agricultural operations three floors below him. Specifically: water allocation. The Chinese section of the Belt controls a disproportionate share of the irrigation infrastructure on Floors 14,000 through 16,000. They built it. They maintain it. And they decide, quietly and without consultation, how much water flows to adjacent floors.",
      "This is not a crisis. It is a lever. And Emmett\u2019s job is to map the lever so that someone on a floor two million levels above him can decide when to pull it.",
      "He files reports in a way that doesn\u2019t look like filing reports. He enters data into a nutrient tracking spreadsheet that his handler downloads once a week from a shared agricultural database. The columns marked NITROGEN UPTAKE VARIANCE contain water infrastructure coordinates. The columns marked PH DEVIATION LOG contain personnel schedules. Nobody audits nutrient spreadsheets. That\u2019s the point.",
      "---",
      "The new instructions arrive on a Tuesday.",
      "They arrive the way instructions always arrive \u2014 embedded in a routine calibration update pushed to every technician\u2019s terminal on Floors 8,000 through 8,500. The update contains a firmware patch for the hydroponic monitoring sensors. It also contains, nested inside a redundant data block that no sensor will ever read, a message.",
      "Emmett reads it once. He reads it again. He closes the terminal and goes back to his soybean racks and says nothing to anyone for the rest of the shift.",
      "The message does not say the word sabotage. The message says \u201Cinfrastructure assessment for contingency planning.\u201D It provides coordinates for a junction on Floor 14,800 \u2014 deep inside the Chinese agricultural section. It asks Emmett to access the junction, document the flow control mechanisms, and introduce a modification to the pressure regulator that would allow remote throttling of water output to three adjacent floors.",
      "The adjacent floors are not Chinese. They are independent cooperatives. If the water slows, the cooperatives suffer. If the cooperatives suffer, they blame China, because China controls the pipes. If they blame China, the diplomatic fallout benefits someone on a floor Emmett will never visit.",
      "The message does not explain any of this. It doesn\u2019t have to. Emmett has been reading nutrient spreadsheets for four years. He can do the math.",
      "---",
      "Floor 14,800 requires a transit pass Emmett does not have. The Chinese agricultural section does not welcome visitors. There are no signs that say KEEP OUT because the Chinese don\u2019t bother with signs. There are simply people at the stairwell junctions who look at you and either nod or don\u2019t. If they don\u2019t nod, you turn around. If you don\u2019t turn around, you become a problem that the Belt solves without filing paperwork.",
      "Emmett\u2019s handler provides the pass. It arrives in his locker on Floor 8,200, tucked inside a replacement filter for his respirator. The pass identifies him as a maintenance subcontractor authorized to service irrigation equipment on Floors 14,500 through 15,000. The authorization is real. Someone, somewhere, made it real. Emmett does not ask how.",
      "He goes on a Thursday. He takes a Local Lift down six floors and walks the rest. The temperature doesn\u2019t change \u2014 the Belt is the Belt, cool and damp everywhere, the air heavy with the mineral smell of nutrient solution and the green smell of things growing under artificial light. The corridors narrow as he moves into the Chinese section. The ceilings are lower. The lighting shifts from the Belt\u2019s standard white fluorescents to something warmer and more focused. The hydroponic racks here are immaculate \u2014 organized with a precision that makes the cooperative floors look like a garden someone forgot about.",
      "Nobody stops him. The pass works. He walks with the posture of a man who has walked these corridors before and is bored by them. His hands are in his pockets. His face is the face of someone thinking about a valve.",
      "---",
      "The junction is where the message said it would be. It\u2019s an access panel in a service corridor between two cultivation bays. The panel is locked with a standard Belt-issue magnetic seal. Emmett has the tool for this. Every irrigation technician does. He opens the panel and looks at what\u2019s inside.",
      "The flow control mechanism is exactly what the message described \u2014 a pressure regulator feeding three main lines that branch outward to the cooperative floors. The regulator is Chinese-manufactured, well-maintained, and stamped with a serial number that Emmett photographs with a device that looks like a pen and is not a pen.",
      "The modification would take four minutes. A small adjustment to the regulator\u2019s calibration module. Nothing that would show on a routine inspection. Nothing that would fail immediately. It would sit dormant until someone, somewhere, sent a signal, and then the water to three cooperative floors would slow by eighteen percent. Not enough to kill crops overnight. Enough to stress them over weeks. Enough to start arguments in the cooperative councils about who\u2019s responsible. Enough to make China look negligent, or hostile, or both.",
      "Emmett stares at the regulator. Four minutes. His hands know the work. His hands have done this kind of work \u2014 not this exactly, but the family of movements, the calibration adjustments, the small permanent alterations that look like routine maintenance \u2014 for six years.",
      "He makes the modification. It takes three minutes and forty seconds.",
      "He closes the panel. He walks back the way he came. His face is the face of someone thinking about a valve.",
      "---",
      "Three days later, Emmett is at his soybean racks when a man he has never seen before enters the cultivation bay. The man is Chinese. He is not wearing a Belt uniform. He is wearing clothes that don\u2019t belong on an agricultural floor \u2014 too clean, too pressed, the kind of clothes that say the wearer has never touched soil and doesn\u2019t intend to start.",
      "The man walks the length of the bay slowly, looking at racks without seeing them. He stops at Emmett\u2019s station. He doesn\u2019t look at the soybeans.",
      "\u201CYou work irrigation as well, yes? Cross-trained?\u201D",
      "\u201CSome,\u201D Emmett says. \u201CMostly cultivation.\u201D",
      "\u201CHave you noticed any changes in the water pressure on 14,800?\u201D",
      "Emmett\u2019s hands keep moving. His fingers pinch a yellowing leaf from a lower stem. Routine. Automatic. \u201CI don\u2019t work that floor,\u201D he says.",
      "\u201CNo,\u201D the man says. \u201CYou don\u2019t.\u201D",
      "He\u2019s quiet for a moment. He watches Emmett\u2019s hands.",
      "\u201CNeither have we,\u201D he says. \u201CNoticed any changes.\u201D",
      "He smiles. It\u2019s a small smile. Polite. The kind of smile that a person gives when they\u2019re holding something they haven\u2019t decided whether to show you yet.",
      "\u201CGood yield this cycle,\u201D the man says. It isn\u2019t a question. He turns and walks back the way he came. He doesn\u2019t look at Emmett again. He doesn\u2019t need to.",
      "Emmett finishes his shift. He logs his nutrient data. He enters numbers into the columns marked NITROGEN UPTAKE VARIANCE. The numbers are real this time. Just numbers. His hands are steady. The rest of him is not.",
      "---",
      "The woman at the irrigation junction is not there the next morning. Her station is empty. The valve she was calibrating for six months has been replaced with a newer model. Her tools are gone. Not packed \u2014 gone, the way things are gone when someone else removes them. Nobody on the floor mentions her absence. Nobody asks where she went. On the Belt, people leave and people arrive and the hydroponic racks don\u2019t care either way.",
      "But people don\u2019t disappear the day after a man in clean clothes asks about water pressure on Floor 14,800. That\u2019s not a coincidence. That\u2019s a sequence.",
      "Emmett walks to his station. He puts on his gloves. He touches the soil \u2014 not real soil, the engineered substrate that the Belt uses, but close enough that his hands recognize it the way they\u2019ve recognized it every morning for six years. His hands go through the motions. The rest of him is calculating how many stairwells are between him and the nearest Express Shaft.",
      "His terminal has a new calibration update. He opens it. He looks for the redundant data block. It\u2019s there. He reads the message.",
      "It\u2019s a transit schedule. A list of Local Lift departure times from Floor 8,200 to Floor 1,200,000. One-way. The departures start tomorrow.",
      "Or it\u2019s a firmware patch for the hydroponic monitoring sensors. Routine. The kind of thing that arrives every few weeks and means nothing at all. The kind of thing that a man who is not being watched would open without thinking.",
      "Emmett closes the terminal. He goes back to his soybeans. The air is cool and damp and smells like things growing. His hands are in the substrate. The cracks in his knuckles sting the way they always sting.",
      "Somewhere below him, water flows through pipes he touched four days ago. Somewhere above him, someone is reading a spreadsheet. And somewhere on this floor, a man in clean clothes is either gone or still watching.",
      "He finishes his shift. He walks to the stairwell. He stands there for a moment, looking up and looking down, and then he chooses a direction.",
    ],
    translations: {
      es: {
        title: "Tierra",
        content: [
          "La mujer en la unión de irrigación no levanta la vista cuando él pasa. Ella está revisando las válvulas de presión con una llave que es más grande que su antebrazo. Él la ha visto todos los días durante seis años. No sabe su nombre. Ella no sabe el suyo. En el Cinturón Agrícola, eso no es grosería. Es eficiencia. Todos tienen trabajo que hacer.",
          "---",
          "Su nombre—su nombre real—es Emmett Lowe. Su nombre de trabajo es diferente. Lleva seis años aquí como técnico agrícola especializado en rotación de soya, que es un trabajo real que hace de verdad y que es también la cobertura perfecta para el trabajo que realmente tiene.",
          "Fue reclutado a los diecinueve. No dramáticamente. Una mujer se sentó a su lado en un puesto de Laszlo’s en el Piso 1,400,000 y le preguntó si quería servir a su país. Pensó que estaba flirteando. No estaba flirteando. Ella representaba una división de los Pisos del Gobierno de EE.UU. de la que él nunca había oído hablar y que, según le explicó, no existía oficialmente. La división se especializaba en activos agrícolas, que sonaba aburrido, y eso era lo que les gustaba.",
          "Ha estado en el Cinturón Agrícola por seis años. Huele a tierra. Sus manos están agrietadas por el trabajo hidropónico. Conoce el horario de riego de cada piso entre el 12,000 y el 16,000 de memoria. Cultiva soya genuinamente buena. Estas cosas son verdaderas. Estas cosas también son su cobertura, y son buena cobertura, porque nadie sospecha de un hombre que cultiva soya genuinamente buena.",
          "---",
          "El trabajo es vigilancia.",
          "No la clase emocionante. La clase lenta. La clase donde llevas seis años cultivando soya y revisando niveles de agua y cartografiando los movimientos de personal a través de los pisos agrícolas y reportando todo a un buzón que nunca responde excepto para decir “recibido.”",
          "Lo que Emmett vigila: la infraestructura de agua. Quién la controla. Quién la mantiene. Quién la defiende. El agua viene de abajo—extracción de hielo en la planta baja—y se bombea hacia arriba a través del edificio. Para cuando llega al Cinturón Agrícola, ha pasado por catorce estaciones de bombeo, cada una controlada por una entidad diferente. Los Pisos del Gobierno de EE.UU. controlan tres de esas estaciones. Los Pisos de China controlan dos. Los demás están divididos entre corporaciones menores y operadores independientes.",
          "Emmett cartografía los nodos de presión. Registra los horarios de mantenimiento. Nota cuándo los técnicos chinos aparecen en pisos que no son de China y cuánto se quedan. Nota cuándo los reguladores de presión se ajustan y en qué dirección. Nota todo y no reporta nada excepto por el buzón, que dice “recibido” y nada más.",
          "---",
          "Hace cuatro días, el buzón dijo algo más.",
          "El mensaje era corto. Tres oraciones. La primera le decía que visitara la estación de bombeo del Piso 14,800 durante su siguiente turno de mantenimiento. La segunda le decía que notara la calibración de presión en el regulador de flujo oeste. La tercera le decía que la ajustara en dos grados.",
          "Emmett leyó el mensaje tres veces. Luego lo borró.",
          "Dos grados. Un ajuste de presión de dos grados en un regulador de flujo en una estación de bombeo en el Piso 14,800. No suena a nada. No es nada—a menos que sepas que el regulador de flujo oeste alimenta la línea de distribución que suministra agua a los pisos agrícolas controlados por China entre el 15,200 y el 16,400. Un ajuste de dos grados reduciría el volumen de agua a esos pisos en un ocho por ciento. No lo suficiente para causar una crisis. Suficiente para causar estrés. Suficiente para que los cultivos se debiliten. Suficiente para que la siguiente temporada de cosecha rinda seis por ciento menos de lo esperado.",
          "Suficiente para que parezca que la infraestructura de China está fallando sola.",
          "Emmett fue a la estación de bombeo. Hizo el ajuste. Le tomó noventa segundos. Nadie lo vio. El regulador hizo clic suavemente y el indicador de presión bajó una fracción y el agua siguió fluyendo y nadie notaría la diferencia por semanas.",
          "---",
          "Hay un hombre en la cafetería del Piso 14,600 que Emmett no reconoce.",
          "Esto por sí solo no es inusual. Miles de personas trabajan en el Cinturón Agrícola. Caras nuevas aparecen. Caras viejas se van. Lo que es inusual es que el hombre lleva ropa limpia. No ropa limpia de campesino—ropa limpia de oficina. La clase de ropa que la gente usa en los pisos corporativos. La clase de ropa que nadie usa en el Cinturón Agrícola a menos que esté de visita, y la gente que está de visita no se sienta sola en la cafetería del Piso 14,600 comiendo pasta de proteína como si supiera a algo.",
          "El hombre mira a Emmett. Emmett no mira al hombre. Emmett come su arroz y bebe su agua y revisa su tableta y no mira al hombre con ropa limpia que lo está mirando a él.",
          "Después del almuerzo, Emmett va a revisar los soybeans. El hombre aparece en la puerta del cultivo.",
          "“Técnico agrícola,” dice el hombre. No es una pregunta.",
          "“Rotación de soya,” dice Emmett.",
          "“¿Cuántos años?”",
          "“Seis.”",
          "“Seis años es mucho tiempo en el Cinturón.”",
          "“Me gusta la soya.”",
          "El hombre sonríe. No es una sonrisa agradable. Es la sonrisa de alguien que sabe algo que no te está diciendo y disfruta sabiendo que tú sabes que él lo sabe.",
          "“¿Cómo está la presión del agua?” pregunta el hombre.",
          "“Igual que siempre.”",
          "“Lo mismo de nuestro lado. No hemos notado ningún cambio.” Una pausa. “Tampoco nosotros. ¿Has notado cambios?”",
          "Emmett lo mira. El hombre lo mira. Hay un corredor entero de cultivo entre ellos y se siente como la distancia entre dos pisos.",
          "“Ningún cambio,” dice Emmett.",
          "El hombre asiente. Sonríe otra vez. Se va.",
          "---",
          "Emmett no duerme esa noche.",
          "Se acuesta en su litera y mira el techo y escucha la irrigación gotear por las tuberías sobre su cabeza y piensa en la sonrisa del hombre. La sonrisa sabía. La sonrisa decía: sabemos lo que hiciste. La sonrisa decía: te estamos observando. La sonrisa decía algo peor que cualquiera de esas cosas, que era: no nos importa lo que hiciste porque ya sabíamos que lo harías y lo dejamos hacerlo y ahora la pregunta no es qué hiciste sino qué hacemos nosotros.",
          "A la mañana siguiente, su contacto no está en el buzón. La mañana siguiente, tampoco. Para el tercer día, Emmett deja de revisar. O su contacto ha desaparecido o su contacto fue su contacto o su contacto nunca fue realmente su contacto y el buzón nunca fue realmente un buzón y Emmett ha estado cultivando soya y haciendo ajustes de presión para personas que pueden o no existir por razones que puede o no entender.",
          "Revisa la terminal de comunicaciones en su litera. Un mensaje. Sin remitente. Dos palabras:",
          "“Piso 1,300,000.”",
          "Podrían ser órdenes de extracción. Podrían ser una trampa. Podría ser su contacto reubicado a una nueva estación. Podría ser el hombre de la ropa limpia, esperando.",
          "---",
          "Emmett cierra la terminal. Vuelve a sus soybeans. El aire es fresco y húmedo y huele a crecimiento—ese olor verde y terroso que lo ató al Cinturón durante seis años, el olor que hace que la gente piense que es un campesino en vez de lo que sea que realmente es.",
          "En algún lugar debajo de él, el agua fluye por tuberías que él tocó hace cuatro días. En algún lugar encima de él, alguien está leyendo un reporte que él no escribió sobre una caída de presión que él causó.",
          "Termina su turno. Camina hacia la escalera. Se para ahí un momento, mirando hacia arriba y hacia abajo. Luego elige una dirección.",
        ],
      },
    },
  },
  {
    id: "21",
    title: "21",
    subtitle: "A Tale from the Nakamoto Floors",
    floor: "Nakamoto Floors (19,900,000\u201321,000,000)",
    words: "1,800",
    file: "21.pdf",
    teaser: "The machines have been running for three years. They sound like a low-grade headache \u2014 a hum that lives behind the eyes and never leaves.",
    content: [
      "The machines have been running for three years. They sound like a low-grade headache \u2014 a hum that lives behind the eyes and never leaves. Sable doesn\u2019t hear it anymore. None of them do. It\u2019s like the cold on Floor 1 or the warmth on the El Salvador Floors \u2014 after long enough, the constant thing becomes the silence, and actual silence becomes the thing that wakes you up.",
      "Floor 20,000,000. Nakamoto territory. A sealed door at the end of a corridor that nobody uses because there\u2019s nothing here except the door and them.",
      "Five people. Three years. One floor.",
      "---",
      "Sable is the one who keeps the logs. Every attempt, every permutation, every failure \u2014 she writes it down. Not because anyone will read it. Because if she stops writing, the numbers become abstract, and if the numbers become abstract, she\u2019ll realize what they actually mean and she\u2019ll quit.",
      "The number of possible keys to a Nakamoto Floor is a number that doesn\u2019t fit inside a human mind. It has seventy-seven digits. If you wrote it out, it would fill a wall. If every machine ever built in the history of the Hotel ran every possible combination from now until the Fire went out, they would not finish. They would not come close to finishing. They would not come close to coming close.",
      "Sable knows this. She has always known this. She came anyway.",
      "---",
      "The crew:",
      "Pell built the rigs. He\u2019s the engineer \u2014 a mid-floor kid who could have worked for Strategy or BlackRock or any of the corporate estates but chose this instead because someone gave a speech about freeing warmth for humanity and Pell believed it. He still believes it. This is either his greatest quality or his worst. The rigs are beautiful \u2014 custom-built cracking arrays that cycle through key permutations faster than anything the Ghost Floor Breakers have ever deployed. Pell maintains them the way a farmer maintains soil. He talks to them. He has named the primary rig Patience. Patience has been running for 1,096 days and has found nothing.",
      "Doss is the theorist. She doesn\u2019t believe in brute force. She believes there\u2019s a pattern \u2014 something Satoshi left in the construction, a mathematical signature, a shortcut that reduces the seventy-seven-digit number to something manageable. She has been looking for this pattern for three years. She has filled nineteen notebooks with equations. The equations are elegant and useless. Doss knows they are useless. She writes them anyway because the alternative is admitting that the door was built by someone smarter than her, and Doss has never admitted that about anyone.",
      "Kye is the fundraiser. He keeps the operation alive by convincing people on the outside that they\u2019re close. They are not close. Kye knows they are not close. But Kye can sit across from a mid-floor merchant with money to spare and say \u201CWe\u2019re narrowing the range\u201D with such steady conviction that the merchant hands over sats. Kye does not think of this as lying. He thinks of it as keeping the door open. The other door. The one behind them, the one that leads back to the world where they are five people who wasted three years.",
      "Mott is security. Former Runner. He watches the corridor, handles the supply runs, makes sure nobody from the Nakamoto perimeter patrols gets curious about why five people have been living in an empty corridor for three years. Mott doesn\u2019t care about the door. He has said this plainly. He\u2019s here because Pell pulled him out of the Gutter six years ago and Mott pays his debts. When the job ends, Mott leaves. Until then, Mott watches.",
      "And Sable. Sable keeps the logs. Sable is the one who started this. Sable is the one who picked Floor 20,000,000 \u2014 not because it\u2019s special, but because the number is round and she needed a number and round felt like it mattered. It doesn\u2019t. Every Nakamoto Floor is exactly as sealed as every other. She knows this now. She knew it then. She picked a round number because she is a person who needs things to make sense even when they don\u2019t, and round numbers make more sense than jagged ones, and that is exactly the kind of thinking that leads a person to spend three years in a corridor talking to a door.",
      "---",
      "The final attempt is Doss\u2019s idea.",
      "She has a theory. She has always had a theory. This one is different, she says. This one accounts for something the others didn\u2019t \u2014 a relationship between the floor number and the key structure that she believes reduces the search space by a factor of ten to the forty-third power.",
      "Sable does the math. A factor of ten to the forty-third still leaves a number with thirty-four digits. It would still take longer than any of them will be alive. Longer than their children will be alive. Longer than the Hotel will stand.",
      "\u201CIt\u2019s closer,\u201D Doss says.",
      "\u201CCloser to impossible is still impossible,\u201D Sable says.",
      "\u201CCloser to impossible is closer,\u201D Doss says.",
      "They run it anyway.",
      "---",
      "Pell reconfigures Patience. It takes two days. He doesn\u2019t sleep. He talks to the rig the entire time \u2014 not words exactly, more the low murmuring of a person who has spent so long with a machine that the boundary between maintenance and conversation has dissolved. Kye watches from the corridor and says nothing. Mott cleans his tools. Doss sits against the wall with notebook twenty and writes equations that might be right and are definitely useless.",
      "Sable watches the door.",
      "It\u2019s the same. It will always be the same. No markings. No handle. No window. Just a flat surface and, at the threshold, a thin line of warmth.",
      "The warmth has never stopped. Three years, and the door has been warm every single day. Warm the way a living thing is warm \u2014 steady, patient, indifferent to who\u2019s standing on the other side. The floor on the other side of that door has been heated for over a hundred years. It has never been occupied. It will never be occupied. The warmth is not an invitation. It\u2019s a fact.",
      "One million floors just like this one. Warm, lit, sealed, and purposefully empty.",
      "Sable has spent three years trying to open one of them. She has sometimes wondered what she expected to find inside. A room. That\u2019s all. A warm, empty room. There\u2019s no treasure. There\u2019s no secret. There\u2019s no message from Satoshi. There\u2019s just space that was built to exist and never be used, because the scarcity of that space is what makes every other floor in the Hotel worth anything at all.",
      "She knows this. She has always known this.",
      "---",
      "Patience runs the new parameters for six hours. The rig cycles through permutations at a rate that Pell describes as \u201Cbeautiful\u201D and Sable describes as \u201Cinsufficient.\u201D The corridor fills with the hum. Mott sits at the far end and plays cards against himself. Kye drafts a message to their latest investor that says \u201Csignificant progress\u201D and means \u201Cwe are still failing.\u201D",
      "At hour four, Doss stands up. She walks to the rig\u2019s output terminal. She stares at the scrolling data \u2014 thousands of failed keys per second, each one discarded and replaced by the next, an endless cascade of wrong answers.",
      "\u201CThe search space isn\u2019t reducible,\u201D she says.",
      "Nobody responds. They heard her.",
      "\u201CThe relationship I found between the floor number and the key structure. It\u2019s real. The math is correct. But it doesn\u2019t reduce the space enough. Not by a factor of forty-three. By a factor of eleven.\u201D She pauses. \u201CThe remaining space has sixty-six digits.\u201D",
      "Sixty-six digits. Three digits less than they started with. Three years of work. Three digits.",
      "Pell keeps Patience running. Doss sits down. Kye deletes his draft. Mott plays another hand.",
      "At hour six, Sable tells Pell to shut it down.",
      "The hum stops. The silence that follows is the loudest thing any of them have ever heard.",
      "---",
      "They pack out the same way they packed in \u2014 quietly, efficiently, without ceremony. Pell disassembles Patience piece by piece and stacks the components against the corridor wall. Someone will salvage them. Doss takes her notebooks. All twenty. Kye takes nothing because Kye brought nothing \u2014 Kye\u2019s tools are his voice and his face and those leave with him. Mott does a final sweep of the corridor and finds a protein wrapper that\u2019s been wedged under a conduit for probably two years. He picks it up and puts it in his pocket because Mott leaves things the way he found them.",
      "Sable is the last one in the corridor. The others are already walking toward the stairwell. She can hear Pell\u2019s footsteps and Mott\u2019s silence and Kye saying something to Doss that Doss is not responding to.",
      "She stands in front of the door.",
      "It\u2019s the same. It will always be the same. No markings. No handle. No window. Just the flat surface and the thin line of warmth at the threshold.",
      "She puts her hand on it.",
      "The door is warm. Not hot. Not burning. Just warm \u2014 the steady, constant warmth of a thing that has been heated for over a century by machines that will run until someone turns them off and nobody will ever turn them off. It seeps into her palm and spreads through her fingers and for a moment she holds it there, her hand flat against a door that a million people would kill to open, and the warmth moves through her skin and into her bones and it is the closest she will ever get to the other side.",
      "She pulls her hand back. The warmth stays in her palm for a few seconds. Then it fades.",
      "She walks to the stairwell. She does not look back. Behind her, the door stays sealed, and the warmth continues, and the floor remains what it was always meant to be: proof that some things are valuable precisely because nobody can have them.",
    ],
    translations: {
      es: {
        title: "21",
        content: [
          "Las máquinas llevan tres años funcionando. Suenan como un dolor de cabeza leve—un zumbido que vive detrás de los ojos y nunca se va. Sable ya no lo oye. Ninguno de ellos lo oye. Es como el frío en el Piso 1 o la calidez en los Pisos de El Salvador—después de suficiente tiempo, lo constante se convierte en el silencio, y el silencio real se convierte en lo que te despierta.",
          "Piso 20,000,000. Territorio Nakamoto. Una puerta sellada al final de un corredor que nadie usa porque no hay nada aquí excepto la puerta y ellos.",
          "Cinco personas. Tres años. Un piso.",
          "---",
          "Sable es quien lleva los registros. Cada intento, cada permutación, cada fracaso—ella lo escribe. No porque alguien lo vaya a leer. Porque si deja de escribir, los números se vuelven abstractos, y si los números se vuelven abstractos, se dará cuenta de lo que realmente significan y renunciará.",
          "El número de posibles llaves para un Piso Nakamoto es un número que no cabe en la mente humana. Tiene setenta y siete dígitos. Si lo escribieras, llenaría una pared. Si cada máquina jamás construida en la historia del Hotel ejecutara cada combinación posible desde ahora hasta que el Fuego se apagara, no terminarían. No se acercarían a terminar. No se acercarían a acercarse.",
          "Sable lo sabe. Siempre lo ha sabido. Vino de todos modos.",
          "---",
          "La tripulación:",
          "Pell construyó los equipos. Es el ingeniero—un chico de pisos medios que podría haber trabajado para Strategy o BlackRock o cualquiera de los estados corporativos pero eligió esto porque alguien dio un discurso sobre liberar la calidez para la humanidad y Pell lo creyó. Todavía lo cree. Esto es su mejor cualidad o su peor. Los equipos son hermosos—arrays de descifrado personalizados que recorren permutaciones de llaves más rápido que cualquier cosa que los Ghost Floor Breakers hayan desplegado. Pell los mantiene como un granjero mantiene la tierra. Les habla. Ha nombrado al equipo principal Paciencia. Paciencia lleva funcionando 1,096 días y no ha encontrado nada.",
          "Doss es la teórica. No cree en la fuerza bruta. Cree que hay un patrón—algo que Satoshi dejó en la construcción, una firma matemática, un atajo que reduce el número de setenta y siete dígitos a algo manejable. Ha estado buscando este patrón durante tres años. Ha llenado diecinueve cuadernos con ecuaciones. Las ecuaciones son elegantes e inútiles. Doss sabe que son inútiles. Las escribe de todos modos porque la alternativa es admitir que la puerta fue construida por alguien más inteligente que ella, y Doss nunca ha admitido eso de nadie.",
          "Kye es el recaudador de fondos. Mantiene la operación viva convenciendo a la gente de afuera de que están cerca. No están cerca. Kye sabe que no están cerca. Pero Kye puede sentarse frente a un comerciante de pisos medios con dinero de sobra y decir “Estamos reduciendo el rango” con tal convicción firme que el comerciante le entrega sats. Kye no piensa en esto como mentir. Piensa en ello como mantener la puerta abierta. La otra puerta. La que está detrás de ellos, la que lleva de vuelta al mundo donde son cinco personas que desperdiciaron tres años.",
          "Mott es seguridad. Ex Runner. Vigila el corredor, se encarga de las salidas para provisiones, se asegura de que nadie de las patrullas del perímetro Nakamoto se pregunte por qué cinco personas han vivido en un corredor vacío durante tres años. A Mott no le importa la puerta. Lo ha dicho claramente. Está aquí porque Pell lo sacó del Desagüe hace seis años y Mott paga sus deudas. Cuando el trabajo termine, Mott se va. Hasta entonces, Mott vigila.",
          "Y Sable. Sable lleva los registros. Sable es quien empezó esto. Sable es quien eligió el Piso 20,000,000—no porque sea especial, sino porque el número es redondo y necesitaba un número y redondo se sentía como si importara. No importa. Cada Piso Nakamoto está exactamente tan sellado como cualquier otro. Ahora lo sabe. Lo sabía entonces. Eligió un número redondo porque es una persona que necesita que las cosas tengan sentido incluso cuando no lo tienen, y los números redondos tienen más sentido que los irregulares, y ese es exactamente el tipo de pensamiento que lleva a una persona a pasar tres años en un corredor hablándole a una puerta.",
          "---",
          "El intento final es idea de Doss.",
          "Tiene una teoría. Siempre ha tenido una teoría. Esta es diferente, dice. Esta explica algo que las otras no—una relación entre el número de piso y la estructura de la llave que ella cree reduce el espacio de búsqueda por un factor de diez a la cuadragésima tercera potencia.",
          "Sable hace la cuenta. Un factor de diez a la cuadragésima tercera aún deja un número con treinta y cuatro dígitos. Aún tomaría más tiempo del que cualquiera de ellos estará vivo. Más que sus hijos. Más de lo que el Hotel se mantendrá en pie.",
          "“Está más cerca,” dice Doss.",
          "“Más cerca de imposible sigue siendo imposible,” dice Sable.",
          "“Más cerca de imposible es más cerca,” dice Doss.",
          "Lo ejecutan de todos modos.",
          "---",
          "Pell reconfigura Paciencia. Toma dos días. No duerme. Le habla al equipo todo el tiempo—no exactamente palabras, más el murmullo bajo de una persona que ha pasado tanto tiempo con una máquina que el límite entre mantenimiento y conversación se ha disuelto. Kye observa desde el corredor y no dice nada. Mott limpia sus herramientas. Doss se sienta contra la pared con el cuaderno veinte y escribe ecuaciones que podrían estar bien y son definitivamente inútiles.",
          "Sable observa la puerta.",
          "Es la misma. Siempre será la misma. Sin marcas. Sin manija. Sin ventana. Solo una superficie plana y, en el umbral, una delgada línea de calor.",
          "El calor nunca se ha detenido. Tres años, y la puerta ha estado cálida cada día. Cálida como algo vivo—constante, paciente, indiferente a quién esté parado al otro lado. El piso al otro lado de esa puerta ha sido calentado por más de cien años. Nunca ha sido ocupado. Nunca será ocupado. El calor no es una invitación. Es un hecho.",
          "Un millón de pisos exactamente como este. Cálidos, iluminados, sellados, y vacíos a propósito.",
          "Sable ha pasado tres años intentando abrir uno de ellos. A veces se ha preguntado qué esperaba encontrar adentro. Una habitación. Eso es todo. Una habitación cálida y vacía. No hay tesoro. No hay secreto. No hay mensaje de Satoshi. Solo espacio construido para existir y nunca ser usado, porque la escasez de ese espacio es lo que hace que cada otro piso del Hotel valga algo.",
          "Lo sabe. Siempre lo ha sabido.",
          "---",
          "Paciencia ejecuta los nuevos parámetros durante seis horas. El equipo recorre permutaciones a una velocidad que Pell describe como “hermosa” y Sable describe como “insuficiente.” El corredor se llena con el zumbido. Mott se sienta en el extremo lejano y juega cartas contra sí mismo. Kye redacta un mensaje para su último inversor que dice “progreso significativo” y significa “todavía estamos fallando.”",
          "En la hora cuatro, Doss se pone de pie. Camina a la terminal de salida del equipo. Se queda mirando los datos que pasan—miles de llaves fallidas por segundo, cada una descartada y reemplazada por la siguiente, una cascada interminable de respuestas incorrectas.",
          "“El espacio de búsqueda no es reducible,” dice.",
          "Nadie responde. La escucharon.",
          "“La relación que encontré entre el número de piso y la estructura de la llave. Es real. La matemática es correcta. Pero no reduce el espacio lo suficiente. No por un factor de cuarenta y tres. Por un factor de once.” Pausa. “El espacio restante tiene sesenta y seis dígitos.”",
          "Sesenta y seis dígitos. Tres dígitos menos que cuando empezaron. Tres años de trabajo. Tres dígitos.",
          "Pell mantiene Paciencia funcionando. Doss se sienta. Kye borra su borrador. Mott juega otra mano.",
          "En la hora seis, Sable le dice a Pell que lo apague.",
          "El zumbido se detiene. El silencio que sigue es lo más fuerte que cualquiera de ellos ha escuchado jamás.",
          "---",
          "Empacan de la misma manera en que empacaron al llegar—en silencio, eficientemente, sin ceremonia. Pell desarma Paciencia pieza por pieza y apila los componentes contra la pared del corredor. Alguien los rescatará. Doss toma sus cuadernos. Los veinte. Kye no toma nada porque Kye no trajo nada—las herramientas de Kye son su voz y su cara y esas se van con él. Mott hace un barrido final del corredor y encuentra un envoltorio de proteína que ha estado atascado bajo un conducto por probablemente dos años. Lo recoge y lo mete en su bolsillo porque Mott deja las cosas como las encontró.",
          "Sable es la última en el corredor. Los otros ya caminan hacia la escalera. Puede oír los pasos de Pell y el silencio de Mott y a Kye diciendo algo a Doss que Doss no está respondiendo.",
          "Se para frente a la puerta.",
          "Es la misma. Siempre será la misma. Sin marcas. Sin manija. Sin ventana. Solo la superficie plana y la delgada línea de calor en el umbral.",
          "Pone su mano en ella.",
          "La puerta está cálida. No caliente. No ardiendo. Solo cálida—la calidez constante y firme de algo que ha sido calentado por más de un siglo por máquinas que funcionarán hasta que alguien las apague y nadie las apagará jamás. Se filtra en su palma y se extiende por sus dedos y por un momento la sostiene ahí, su mano plana contra una puerta que un millón de personas matarían por abrir, y la calidez se mueve a través de su piel y entra en sus huesos y es lo más cerca que jamás estará del otro lado.",
          "Retira su mano. La calidez permanece en su palma por unos segundos. Luego se desvanece.",
          "Se dirige a la escalera. No mira atrás. Detrás de ella, la puerta permanece sellada, y la calidez continúa, y el piso sigue siendo lo que siempre estuvo destinado a ser: prueba de que algunas cosas son valiosas precisamente porque nadie puede tenerlas.",
        ],
      },
    },
  },
  {
    id: "running",
    title: "Running",
    subtitle: "A Tale from the Hal Finney Floor",
    floor: "The Hal Finney Floor (Floor 170)",
    words: "1,900",
    file: "Running.pdf",
    teaser: "The Express Shaft dropped her 150,000 floors in eleven minutes, and the first thing she noticed was the quiet.",
    dedication: "For Hal Finney.",
    endnote: "Hal Finney was a civil liberties advocate, a cryptography pioneer, a software developer, and one of the earliest contributors to Bitcoin. He was diagnosed with ALS \u2014 amyotrophic lateral sclerosis \u2014 and fought it for five years, writing code until the very end.\n\nThe ALS Network (alsnetwork.org), in partnership with Fran Finney, runs the Running Bitcoin Challenge \u2014 an annual global event raising awareness and funds for ALS research. You can learn more and contribute at runningbitcoin.us.",
    endnoteCloser: "The Fire sees. And so did he.",
    content: [
      "The Express Shaft dropped her 150,000 floors in eleven minutes, and the first thing she noticed was the quiet.",
      "Not silence. The upper floors weren\u2019t silent either \u2014 they hummed with climate systems and commerce and the low vibration of people living well. But this was a different kind of quiet. A deliberate one. The way a room goes still when someone is trying to remember something important.",
      "Kira Tan had lived on the Strategy Floors her entire life. Forty-one years of engineered air, Lightning payments that cleared before she finished blinking, meals that arrived at predictable intervals in predictable quality. She managed resource allocation for three sub-floors. She was, by any reasonable metric, comfortable. She\u2019d bought the Express pass with money she wouldn\u2019t miss.",
      "Floor 170 was not what she expected.",
      "She\u2019d pictured something grand. A cathedral, maybe, like the one on Saylor\u2019s floors \u2014 vaulted ceilings, stained glass, the architecture of belief made physical. She\u2019d seen enough monuments in the Hotel to know what wealth did when it wanted to honor something: it built upward, outward, louder.",
      "Floor 170 was small. One room. The ceiling was low enough that a tall man might feel it pressing down on him, though not enough to stoop. The walls were plain. The floor was concrete \u2014 actual concrete, not the polished composite she\u2019d walked on her entire life. It was cool under her shoes. Not cold. Just cool. Close to the Gutter\u2019s chill but not in it. A hundred and sixty-seven floors above suffering, and you could still feel it reaching up.",
      "There were maybe twenty people inside. Nobody spoke above a murmur. A woman near the entrance nodded at her \u2014 not a guide, not a greeter. Just someone who\u2019d been here longer.",
      "The first thing Kira saw was the wall.",
      "It wasn\u2019t a screen. That was the shock of it. In a building where every surface could display anything, this wall was physical. Etched into metal \u2014 actual metal, not a projection \u2014 were two words:",
      "---",
      "Running bitcoin.",
      "---",
      "Below the words: a date. January 2009. And a name. Hal Finney.",
      "Kira knew the name the way she knew the word \u201Cfoundation\u201D \u2014 as something underneath everything, something you stopped thinking about because it held. She\u2019d learned it in school on the Strategy Floors, a line in a longer lesson about the Hotel\u2019s construction. Hal Finney received the first transaction. Block 170. A fact. Filed away. Never opened again.",
      "She moved deeper into the room.",
      "Along the left wall, a series of glass cases held objects. Not replicas \u2014 originals, or as close to originals as 2140 could manage. She leaned in. A printed email, yellowed under preservation glass. The text was small and she had to squint. A technical exchange. Someone debugging code, line by line, with the patience of a person building something that didn\u2019t exist yet. The signature at the bottom: Hal.",
      "The next case held a photograph. A man in a wheelchair. His face was thin. His arms rested on the chair\u2019s supports at angles that suggested they\u2019d been placed there by someone else. But he was smiling. Not the kind of smile people perform for cameras \u2014 the kind that happens when a person has been told something funny by someone they love and hasn\u2019t had time to compose their face.",
      "A small plaque beneath the photograph. No dates. Just:",
      "---",
      "He was a civil liberties advocate, a cryptography pioneer, a software developer, and one of the earliest builders of Bitcoin. He was diagnosed with ALS and fought it for five years. He never stopped writing code.",
      "---",
      "Kira read the plaque twice. The second time, she read slower, and the words rearranged themselves in her chest. Never stopped writing code. She thought about that. A body shutting down room by room \u2014 hands first, then arms, then everything \u2014 and the man inside it still reaching for a keyboard. Still debugging. Still building the system that would outlive him by more than a century.",
      "She thought about her own hands. She used them to approve allocation reports. She used them to swipe through Lightning invoices. She\u2019d never built anything with them.",
      "An older man stood near the back wall, his palm flat against the surface. He\u2019d been standing like that since she walked in. She almost asked him if he was all right. Then she saw his face and understood that he was doing something she didn\u2019t have a word for \u2014 something between prayer and gratitude and the stillness of a person standing in a room where someone important used to breathe.",
      "The back wall was the last piece.",
      "No glass cases here. No photographs. Just text, etched into the same metal as the entrance wall. Large enough to read from across the room:",
      "---",
      "\u201CHere we are faced with the problems of loss of privacy, creeping computerization, massive databases, more centralization \u2014 and Chaum offers a completely different direction to go in, one which puts power into the hands of individuals rather than governments and corporations. The computer can be used as a tool to liberate and protect people, rather than to control them.\u201D",
      "---",
      "Below, in smaller letters: Hal Finney, 1992.",
      "1992. Kira did the math without thinking \u2014 a hundred and forty-eight years ago. He\u2019d written those words before the Hotel existed. Before the Cold. Before the petrodollar collapsed, before the Great Check-In, before ninety-five percent of humanity ended up in the Gutter, before she was born on a floor that someone else\u2019s conviction had built.",
      "He\u2019d seen it. Not the Hotel. Something earlier than the Hotel. The need for it.",
      "She looked at the wheelchair photograph again from where she stood. The man\u2019s eyes were sharp. That was the detail she hadn\u2019t caught the first time. The body was failing. The eyes were not. They looked like the eyes of a person who was running calculations even now, even in the chair, even with hands that couldn\u2019t type \u2014 working the problem in his head because the problem was more important than the body that used to carry it.",
      "Kira\u2019s throat tightened. She hadn\u2019t expected that.",
      "She\u2019d come down here the way you visit a historical site \u2014 respectfully, dutifully, with the vague intention of learning something and the private expectation that you\u2019ll feel nothing and buy something in the gift shop on the way out.",
      "There was no gift shop. There was nothing to buy. She\u2019d read that somewhere before she came \u2014 that this floor doesn\u2019t sell anything, doesn\u2019t trade anything. She hadn\u2019t understood what that meant until now.",
      "A young woman was sitting on the floor near the etched quote, cross-legged, a notebook open on her knee. She was copying the words by hand. Slowly. As if the act of writing them would teach her something that reading them couldn\u2019t.",
      "Kira watched her for a moment. Then she looked at the quote again.",
      "---",
      "The computer can be used as a tool to liberate and protect people, rather than to control them.",
      "---",
      "She thought about the Strategy Floors. The contracts that bound every tenant. The talent market that moved people between corporate estates like inventory. The Lightning system that tracked every sat she spent. She\u2019d never thought of it as control. She\u2019d thought of it as structure. She\u2019d thought of it as civilization.",
      "She thought about it now.",
      "A boy \u2014 maybe ten, maybe twelve \u2014 tugged at the sleeve of the woman who\u2019d nodded at her when she came in. \u201CWhy is it so small?\u201D he asked. He wasn\u2019t being rude. He was genuinely confused. He\u2019d probably seen the Cathedral. He\u2019d probably seen the BlackRock atrium. Monuments in the Hotel were built to make you feel the weight of what they celebrated. This room made you feel the opposite. It made you feel the lightness of one person, working alone, who happened to be right.",
      "The woman put her hand on the boy\u2019s shoulder. \u201CBecause he didn\u2019t need more room than this.\u201D",
      "Kira stayed for forty minutes. She didn\u2019t touch the wall. She didn\u2019t sit on the floor. She just stood and read everything twice and looked at the photograph three times and let the cool concrete remind her feet that the Hotel had a bottom, and the bottom was close, and the warmth she\u2019d lived in her whole life was not a birthright. It was something someone had built. Someone specific. Someone whose hands stopped working and who kept building anyway.",
      "When she left, the Express Shaft climbed in near-silence. She watched the floor counter rise: 500. 5,000. 20,000. The Agricultural Belt slid past, then the Open Range, then the national floors she\u2019d never visited. The air warmed by degrees. By Floor 100,000 it felt like home. By Floor 150,000 she could smell the recycled Strategy air she\u2019d breathed her entire life.",
      "She stepped out onto her floor. The corridors were wide and well-lit. The Lightning terminals blinked green. A colleague passed her and said something about a quarterly review and she nodded and kept walking.",
      "In her quarters, she sat on the edge of her bed. The room was warm. The lights were steady. Everything worked.",
      "She opened her hands and looked at them.",
      "Then she closed them.",
    ],
    translations: {
      es: {
        title: "Corriendo",
        dedication: "Para Hal Finney.",
        endnote: "Hal Finney fue un defensor de las libertades civiles, un pionero de la criptograf\u00EDa, un desarrollador de software y uno de los primeros contribuidores a Bitcoin. Fue diagnosticado con ELA \u2014 esclerosis lateral amiotr\u00F3fica \u2014 y luch\u00F3 contra la enfermedad durante cinco a\u00F1os, escribiendo c\u00F3digo hasta el final.\n\nThe ALS Network (alsnetwork.org), en colaboraci\u00F3n con Fran Finney, organiza el Running Bitcoin Challenge \u2014 un evento global anual que recauda fondos y concientiza sobre la investigaci\u00F3n de ELA. Puedes contribuir en runningbitcoin.us.",
        endnoteCloser: "El Fuego ve. Y \u00E9l tambi\u00E9n.",
        content: [
          "El Shaft Expreso la dej\u00F3 caer 150,000 pisos en once minutos, y lo primero que not\u00F3 fue el silencio.",
          "No era silencio total. Los pisos superiores tampoco eran silenciosos \u2014 vibraban con sistemas clim\u00E1ticos, comercio y la vibraci\u00F3n baja de gente viviendo bien. Pero este era un tipo diferente de quietud. Deliberada. Como cuando una habitaci\u00F3n se queda inm\u00F3vil porque alguien est\u00E1 tratando de recordar algo importante.",
          "Kira Tan hab\u00EDa vivido en los Pisos de Strategy toda su vida. Cuarenta y un a\u00F1os de aire dise\u00F1ado, pagos Lightning que se liquidaban antes de que terminara de parpadear, comidas que llegaban en intervalos predecibles con calidad predecible. Administraba la asignaci\u00F3n de recursos para tres sub-pisos. Era, por cualquier m\u00E9trica razonable, c\u00F3moda. Hab\u00EDa comprado el pase Expreso con dinero que no iba a extra\u00F1ar.",
          "El Piso 170 no era lo que esperaba.",
          "Se hab\u00EDa imaginado algo grandioso. Una catedral, tal vez, como la de los pisos de Saylor \u2014 techos abovedados, vitrales, la arquitectura de la convicci\u00F3n hecha f\u00EDsica. Hab\u00EDa visto suficientes monumentos en el Hotel para saber lo que la riqueza hac\u00EDa cuando quer\u00EDa honrar algo: constru\u00EDa hacia arriba, hacia afuera, m\u00E1s fuerte.",
          "El Piso 170 era peque\u00F1o. Una habitaci\u00F3n. El techo era lo suficientemente bajo como para que un hombre alto lo sintiera presionando, aunque no lo suficiente para agacharse. Las paredes eran lisas. El suelo era concreto \u2014 concreto real, no el compuesto pulido sobre el que hab\u00EDa caminado toda su vida. Estaba fresco bajo sus zapatos. No fr\u00EDo. Solo fresco. Cerca del fr\u00EDo del Desag\u00FCe pero sin estar en \u00E9l. Ciento sesenta y siete pisos por encima del sufrimiento, y todav\u00EDa pod\u00EDas sentirlo alcanz\u00E1ndote.",
          "Hab\u00EDa tal vez veinte personas adentro. Nadie hablaba por encima de un murmullo. Una mujer cerca de la entrada le asinti\u00F3 \u2014 no era gu\u00EDa, ni recepcionista. Solo alguien que hab\u00EDa estado ah\u00ED m\u00E1s tiempo.",
          "Lo primero que Kira vio fue la pared.",
          "No era una pantalla. Eso fue lo impactante. En un edificio donde cada superficie pod\u00EDa mostrar cualquier cosa, esta pared era f\u00EDsica. Grabadas en metal \u2014 metal real, no una proyecci\u00F3n \u2014 hab\u00EDa dos palabras:",
          "---",
          "Running bitcoin.",
          "---",
          "Debajo de las palabras: una fecha. Enero de 2009. Y un nombre. Hal Finney.",
          "Kira conoc\u00EDa el nombre de la misma forma en que conoc\u00EDa la palabra \u201Ccimiento\u201D \u2014 como algo debajo de todo, algo en lo que dejabas de pensar porque sosten\u00EDa. Lo hab\u00EDa aprendido en la escuela de los Pisos de Strategy, una l\u00EDnea en una lecci\u00F3n m\u00E1s larga sobre la construcci\u00F3n del Hotel. Hal Finney recibi\u00F3 la primera transacci\u00F3n. Bloque 170. Un dato. Archivado. Nunca m\u00E1s abierto.",
          "Se adentr\u00F3 m\u00E1s en la habitaci\u00F3n.",
          "A lo largo de la pared izquierda, una serie de vitrinas conten\u00EDan objetos. No r\u00E9plicas \u2014 originales, o tan cercanos a originales como el 2140 pod\u00EDa lograr. Se inclin\u00F3. Un correo impreso, amarillento bajo el cristal de preservaci\u00F3n. El texto era peque\u00F1o y tuvo que entrecerrar los ojos. Un intercambio t\u00E9cnico. Alguien depurando c\u00F3digo, l\u00EDnea por l\u00EDnea, con la paciencia de una persona construyendo algo que a\u00FAn no exist\u00EDa. La firma al final: Hal.",
          "La siguiente vitrina conten\u00EDa una fotograf\u00EDa. Un hombre en silla de ruedas. Su rostro era delgado. Sus brazos descansaban sobre los soportes de la silla en \u00E1ngulos que suger\u00EDan que alguien m\u00E1s los hab\u00EDa colocado ah\u00ED. Pero estaba sonriendo. No el tipo de sonrisa que la gente act\u00FAa para las c\u00E1maras \u2014 el tipo que ocurre cuando alguien a quien amas te dice algo gracioso y no has tenido tiempo de componer tu rostro.",
          "Una peque\u00F1a placa debajo de la fotograf\u00EDa. Sin fechas. Solo:",
          "---",
          "Fue un defensor de las libertades civiles, un pionero de la criptograf\u00EDa, un desarrollador de software, y uno de los primeros constructores de Bitcoin. Fue diagnosticado con ELA y luch\u00F3 contra la enfermedad durante cinco a\u00F1os. Nunca dej\u00F3 de escribir c\u00F3digo.",
          "---",
          "Kira ley\u00F3 la placa dos veces. La segunda vez, ley\u00F3 m\u00E1s despacio, y las palabras se reordenaron en su pecho. Nunca dej\u00F3 de escribir c\u00F3digo. Pens\u00F3 en eso. Un cuerpo apag\u00E1ndose habitaci\u00F3n por habitaci\u00F3n \u2014 las manos primero, luego los brazos, luego todo \u2014 y el hombre adentro todav\u00EDa alcanzando un teclado. Todav\u00EDa depurando. Todav\u00EDa construyendo el sistema que lo sobrevivir\u00EDa por m\u00E1s de un siglo.",
          "Pens\u00F3 en sus propias manos. Las usaba para aprobar reportes de asignaci\u00F3n. Las usaba para deslizar facturas Lightning. Nunca hab\u00EDa construido nada con ellas.",
          "Un hombre mayor estaba de pie cerca de la pared del fondo, con la palma plana contra la superficie. Hab\u00EDa estado as\u00ED desde que ella entr\u00F3. Casi le pregunt\u00F3 si estaba bien. Luego vio su rostro y entendi\u00F3 que estaba haciendo algo para lo que no ten\u00EDa palabra \u2014 algo entre la oraci\u00F3n y la gratitud y la quietud de una persona parada en una habitaci\u00F3n donde alguien importante sol\u00EDa respirar.",
          "La pared del fondo era la \u00FAltima pieza.",
          "Sin vitrinas aqu\u00ED. Sin fotograf\u00EDas. Solo texto, grabado en el mismo metal de la pared de entrada. Lo suficientemente grande para leer desde el otro lado de la habitaci\u00F3n:",
          "---",
          "\u201CAqu\u00ED estamos enfrentando los problemas de la p\u00E9rdida de privacidad, la informatizaci\u00F3n invasiva, las bases de datos masivas, m\u00E1s centralizaci\u00F3n \u2014 y Chaum ofrece una direcci\u00F3n completamente diferente, una que pone el poder en manos de los individuos en lugar de los gobiernos y las corporaciones. La computadora puede ser usada como una herramienta para liberar y proteger a las personas, en lugar de controlarlas.\u201D",
          "---",
          "Debajo, en letras m\u00E1s peque\u00F1as: Hal Finney, 1992.",
          "1992. Kira hizo la cuenta sin pensarlo \u2014 ciento cuarenta y ocho a\u00F1os atr\u00E1s. Hab\u00EDa escrito esas palabras antes de que el Hotel existiera. Antes del Fr\u00EDo. Antes de que el petrod\u00F3lar colapsara, antes del Gran Registro, antes de que el noventa y cinco por ciento de la humanidad terminara en el Desag\u00FCe, antes de que ella naciera en un piso que la convicci\u00F3n de otra persona hab\u00EDa construido.",
          "\u00C9l lo hab\u00EDa visto. No el Hotel. Algo anterior al Hotel. La necesidad de \u00E9l.",
          "Mir\u00F3 la fotograf\u00EDa de la silla de ruedas otra vez desde donde estaba. Los ojos del hombre eran agudos. Ese era el detalle que no hab\u00EDa captado la primera vez. El cuerpo estaba fallando. Los ojos no. Parec\u00EDan los ojos de una persona que segu\u00EDa haciendo c\u00E1lculos incluso ahora, incluso en la silla, incluso con manos que no pod\u00EDan teclear \u2014 trabajando el problema en su cabeza porque el problema era m\u00E1s importante que el cuerpo que sol\u00EDa cargarlo.",
          "La garganta de Kira se apret\u00F3. No se lo esperaba.",
          "Hab\u00EDa venido aqu\u00ED como quien visita un sitio hist\u00F3rico \u2014 con respeto, por deber, con la vaga intenci\u00F3n de aprender algo y la expectativa privada de que no sentir\u00E1s nada y comprar\u00E1s algo en la tienda de recuerdos al salir.",
          "No hab\u00EDa tienda de recuerdos. No hab\u00EDa nada que comprar. Hab\u00EDa le\u00EDdo eso en alg\u00FAn lugar antes de venir \u2014 que este piso no vende nada, no intercambia nada. No hab\u00EDa entendido lo que eso significaba hasta ahora.",
          "Una mujer joven estaba sentada en el suelo cerca de la cita grabada, con las piernas cruzadas, un cuaderno abierto sobre su rodilla. Estaba copiando las palabras a mano. Despacio. Como si el acto de escribirlas le ense\u00F1ara algo que leerlas no pod\u00EDa.",
          "Kira la observ\u00F3 por un momento. Luego mir\u00F3 la cita otra vez.",
          "---",
          "La computadora puede ser usada como una herramienta para liberar y proteger a las personas, en lugar de controlarlas.",
          "---",
          "Pens\u00F3 en los Pisos de Strategy. Los contratos que ataban a cada inquilino. El mercado de talento que mov\u00EDa personas entre estados corporativos como inventario. El sistema Lightning que rastreaba cada sat que gastaba. Nunca lo hab\u00EDa pensado como control. Lo hab\u00EDa pensado como estructura. Lo hab\u00EDa pensado como civilizaci\u00F3n.",
          "Lo pens\u00F3 ahora.",
          "Un ni\u00F1o \u2014 tal vez diez, tal vez doce \u2014 jal\u00F3 la manga de la mujer que le hab\u00EDa asentido cuando entr\u00F3. \u201C\u00BFPor qu\u00E9 es tan peque\u00F1o?\u201D pregunt\u00F3. No estaba siendo grosero. Estaba genuinamente confundido. Probablemente hab\u00EDa visto la Catedral. Probablemente hab\u00EDa visto el atrio de BlackRock. Los monumentos en el Hotel estaban construidos para hacerte sentir el peso de lo que celebraban. Esta habitaci\u00F3n te hac\u00EDa sentir lo opuesto. Te hac\u00EDa sentir la ligereza de una persona, trabajando sola, que result\u00F3 tener raz\u00F3n.",
          "La mujer puso su mano en el hombro del ni\u00F1o. \u201CPorque \u00E9l no necesitaba m\u00E1s espacio que este.\u201D",
          "Kira se qued\u00F3 cuarenta minutos. No toc\u00F3 la pared. No se sent\u00F3 en el suelo. Solo se qued\u00F3 de pie y ley\u00F3 todo dos veces y mir\u00F3 la fotograf\u00EDa tres veces y dej\u00F3 que el concreto fresco le recordara a sus pies que el Hotel ten\u00EDa un fondo, y el fondo estaba cerca, y la calidez en la que hab\u00EDa vivido toda su vida no era un derecho de nacimiento. Era algo que alguien hab\u00EDa construido. Alguien espec\u00EDfico. Alguien cuyas manos dejaron de funcionar y que sigui\u00F3 construyendo de todas formas.",
          "Cuando se fue, el Shaft Expreso subi\u00F3 en casi-silencio. Observ\u00F3 el contador de pisos subir: 500. 5,000. 20,000. El Cintur\u00F3n Agr\u00EDcola pas\u00F3, luego el Rango Abierto, luego los pisos nacionales que nunca hab\u00EDa visitado. El aire se calentaba por grados. Para el Piso 100,000 se sent\u00EDa como hogar. Para el Piso 150,000 pod\u00EDa oler el aire reciclado de Strategy que hab\u00EDa respirado toda su vida.",
          "Sali\u00F3 a su piso. Los pasillos eran amplios y bien iluminados. Las terminales Lightning parpadeaban en verde. Un colega pas\u00F3 y dijo algo sobre una revisi\u00F3n trimestral y ella asinti\u00F3 y sigui\u00F3 caminando.",
          "En sus cuartos, se sent\u00F3 en el borde de su cama. La habitaci\u00F3n era c\u00E1lida. Las luces eran estables. Todo funcionaba.",
          "Abri\u00F3 sus manos y las mir\u00F3.",
          "Luego las cerr\u00F3.",
        ],
      },
      pt: {
        title: "Correndo",
        dedication: "Para Hal Finney.",
        endnote: "Hal Finney foi um defensor das liberdades civis, um pioneiro da criptografia, um desenvolvedor de software e um dos primeiros contribuidores do Bitcoin. Foi diagnosticado com ELA \u2014 esclerose lateral amiotr\u00F3fica \u2014 e lutou contra a doen\u00E7a por cinco anos, escrevendo c\u00F3digo at\u00E9 o fim.\n\nA ALS Network (alsnetwork.org), em parceria com Fran Finney, organiza o Running Bitcoin Challenge \u2014 um evento global anual que arrecada fundos e conscientiza sobre a pesquisa de ELA. Voc\u00EA pode contribuir em runningbitcoin.us.",
        endnoteCloser: "O Fogo v\u00EA. E ele tamb\u00E9m.",
        content: [
          "O Shaft Expresso a derrubou 150.000 andares em onze minutos, e a primeira coisa que ela notou foi a quietude.",
          "N\u00E3o era sil\u00EAncio. Os andares superiores tamb\u00E9m n\u00E3o eram silenciosos \u2014 vibravam com sistemas clim\u00E1ticos e com\u00E9rcio e a vibra\u00E7\u00E3o baixa de pessoas vivendo bem. Mas esse era um tipo diferente de quietude. Deliberada. Como quando uma sala fica im\u00F3vel porque algu\u00E9m est\u00E1 tentando lembrar de algo importante.",
          "Kira Tan havia vivido nos Andares da Strategy a vida inteira. Quarenta e um anos de ar projetado, pagamentos Lightning que se liquidavam antes que ela terminasse de piscar, refei\u00E7\u00F5es que chegavam em intervalos previs\u00EDveis com qualidade previs\u00EDvel. Ela gerenciava aloca\u00E7\u00E3o de recursos para tr\u00EAs sub-andares. Era, por qualquer m\u00E9trica razo\u00E1vel, confort\u00E1vel. Havia comprado o passe Expresso com dinheiro que n\u00E3o faria falta.",
          "O Andar 170 n\u00E3o era o que ela esperava.",
          "Havia imaginado algo grandioso. Uma catedral, talvez, como a dos andares do Saylor \u2014 tetos abobadados, vitrais, a arquitetura da convic\u00E7\u00E3o tornada f\u00EDsica. J\u00E1 tinha visto monumentos suficientes no Hotel para saber o que a riqueza fazia quando queria honrar algo: constru\u00EDa para cima, para fora, mais alto.",
          "O Andar 170 era pequeno. Um c\u00F4modo. O teto era baixo o suficiente para que um homem alto o sentisse pressionando, mas n\u00E3o o bastante para se curvar. As paredes eram simples. O ch\u00E3o era concreto \u2014 concreto de verdade, n\u00E3o o composto polido sobre o qual havia caminhado a vida inteira. Era fresco sob seus sapatos. N\u00E3o frio. Apenas fresco. Perto do frio do Ralo, mas sem estar nele. Cento e sessenta e sete andares acima do sofrimento, e ainda dava para senti-lo alcan\u00E7ando.",
          "Havia talvez vinte pessoas l\u00E1 dentro. Ningu\u00E9m falava acima de um murm\u00FArio. Uma mulher perto da entrada acenou para ela \u2014 n\u00E3o era guia, nem recepcionista. Apenas algu\u00E9m que estava ali h\u00E1 mais tempo.",
          "A primeira coisa que Kira viu foi a parede.",
          "N\u00E3o era uma tela. Esse foi o choque. Num edif\u00EDcio onde qualquer superf\u00EDcie podia exibir qualquer coisa, esta parede era f\u00EDsica. Gravadas em metal \u2014 metal de verdade, n\u00E3o uma proje\u00E7\u00E3o \u2014 havia duas palavras:",
          "---",
          "Running bitcoin.",
          "---",
          "Abaixo das palavras: uma data. Janeiro de 2009. E um nome. Hal Finney.",
          "Kira conhecia o nome da mesma forma como conhecia a palavra \u201Calicerce\u201D \u2014 como algo embaixo de tudo, algo em que voc\u00EA parava de pensar porque sustentava. Havia aprendido na escola dos Andares da Strategy, uma linha numa li\u00E7\u00E3o mais longa sobre a constru\u00E7\u00E3o do Hotel. Hal Finney recebeu a primeira transa\u00E7\u00E3o. Bloco 170. Um fato. Arquivado. Nunca mais aberto.",
          "Ela se adentrou mais no c\u00F4modo.",
          "Ao longo da parede esquerda, uma s\u00E9rie de vitrines guardava objetos. N\u00E3o r\u00E9plicas \u2014 originais, ou t\u00E3o pr\u00F3ximos de originais quanto 2140 conseguia. Ela se inclinou. Um e-mail impresso, amarelado sob o vidro de preserva\u00E7\u00E3o. O texto era pequeno e ela teve que apertar os olhos. Uma troca t\u00E9cnica. Algu\u00E9m depurando c\u00F3digo, linha por linha, com a paci\u00EAncia de uma pessoa construindo algo que ainda n\u00E3o existia. A assinatura no final: Hal.",
          "A pr\u00F3xima vitrine continha uma fotografia. Um homem numa cadeira de rodas. Seu rosto era magro. Seus bra\u00E7os descansavam nos apoios da cadeira em \u00E2ngulos que sugeriam que algu\u00E9m os havia colocado ali. Mas ele estava sorrindo. N\u00E3o o tipo de sorriso que as pessoas encenam para c\u00E2meras \u2014 o tipo que acontece quando algu\u00E9m que voc\u00EA ama te conta algo engra\u00E7ado e voc\u00EA n\u00E3o teve tempo de compor o rosto.",
          "Uma pequena placa sob a fotografia. Sem datas. Apenas:",
          "---",
          "Ele foi um defensor das liberdades civis, um pioneiro da criptografia, um desenvolvedor de software e um dos primeiros construtores do Bitcoin. Foi diagnosticado com ELA e lutou contra a doen\u00E7a por cinco anos. Nunca parou de escrever c\u00F3digo.",
          "---",
          "Kira leu a placa duas vezes. Na segunda vez, leu mais devagar, e as palavras se reorganizaram em seu peito. Nunca parou de escrever c\u00F3digo. Ela pensou nisso. Um corpo se desligando c\u00F4modo por c\u00F4modo \u2014 as m\u00E3os primeiro, depois os bra\u00E7os, depois tudo \u2014 e o homem dentro dele ainda alcan\u00E7ando um teclado. Ainda depurando. Ainda construindo o sistema que o sobreviveria por mais de um s\u00E9culo.",
          "Ela pensou em suas pr\u00F3prias m\u00E3os. Usava-as para aprovar relat\u00F3rios de aloca\u00E7\u00E3o. Usava-as para deslizar faturas Lightning. Nunca havia constru\u00EDdo nada com elas.",
          "Um homem mais velho estava de p\u00E9 perto da parede dos fundos, a palma da m\u00E3o espalmada contra a superf\u00EDcie. Estava assim desde que ela entrou. Quase perguntou se ele estava bem. Ent\u00E3o viu seu rosto e entendeu que ele estava fazendo algo para o qual ela n\u00E3o tinha palavra \u2014 algo entre ora\u00E7\u00E3o e gratid\u00E3o e a quietude de uma pessoa parada num c\u00F4modo onde algu\u00E9m importante costumava respirar.",
          "A parede dos fundos era a \u00FAltima pe\u00E7a.",
          "Sem vitrines aqui. Sem fotografias. Apenas texto, gravado no mesmo metal da parede da entrada. Grande o suficiente para ler do outro lado do c\u00F4modo:",
          "---",
          "\u201CAqui estamos enfrentando os problemas da perda de privacidade, da informatiza\u00E7\u00E3o invasiva, dos bancos de dados massivos, de mais centraliza\u00E7\u00E3o \u2014 e Chaum oferece uma dire\u00E7\u00E3o completamente diferente, uma que coloca o poder nas m\u00E3os dos indiv\u00EDduos em vez dos governos e das corpora\u00E7\u00F5es. O computador pode ser usado como ferramenta para libertar e proteger as pessoas, em vez de control\u00E1-las.\u201D",
          "---",
          "Abaixo, em letras menores: Hal Finney, 1992.",
          "1992. Kira fez a conta sem pensar \u2014 cento e quarenta e oito anos atr\u00E1s. Ele havia escrito aquelas palavras antes do Hotel existir. Antes do Frio. Antes do petrod\u00F3lar colapsar, antes do Grande Check-In, antes de noventa e cinco por cento da humanidade acabar no Ralo, antes dela nascer num andar que a convic\u00E7\u00E3o de outra pessoa havia constru\u00EDdo.",
          "Ele havia enxergado. N\u00E3o o Hotel. Algo anterior ao Hotel. A necessidade dele.",
          "Ela olhou para a fotografia da cadeira de rodas novamente de onde estava. Os olhos do homem eram penetrantes. Esse era o detalhe que n\u00E3o havia captado da primeira vez. O corpo estava falhando. Os olhos n\u00E3o. Pareciam os olhos de uma pessoa que ainda estava fazendo c\u00E1lculos mesmo agora, mesmo na cadeira, mesmo com m\u00E3os que n\u00E3o conseguiam digitar \u2014 trabalhando o problema na cabe\u00E7a porque o problema era mais importante que o corpo que costumava carreg\u00E1-lo.",
          "A garganta de Kira apertou. Ela n\u00E3o esperava isso.",
          "Havia vindo at\u00E9 aqui como quem visita um local hist\u00F3rico \u2014 com respeito, por obriga\u00E7\u00E3o, com a vaga inten\u00E7\u00E3o de aprender algo e a expectativa privada de que n\u00E3o sentir\u00E1 nada e comprar\u00E1 algo na lojinha na sa\u00EDda.",
          "N\u00E3o havia lojinha. N\u00E3o havia nada para comprar. Havia lido isso em algum lugar antes de vir \u2014 que este andar n\u00E3o vende nada, n\u00E3o troca nada. N\u00E3o havia entendido o que isso significava at\u00E9 agora.",
          "Uma mulher jovem estava sentada no ch\u00E3o perto da cita\u00E7\u00E3o gravada, de pernas cruzadas, um caderno aberto sobre o joelho. Estava copiando as palavras \u00E0 m\u00E3o. Devagar. Como se o ato de escrev\u00EA-las fosse lhe ensinar algo que l\u00EA-las n\u00E3o conseguia.",
          "Kira a observou por um momento. Ent\u00E3o olhou para a cita\u00E7\u00E3o novamente.",
          "---",
          "O computador pode ser usado como ferramenta para libertar e proteger as pessoas, em vez de control\u00E1-las.",
          "---",
          "Ela pensou nos Andares da Strategy. Os contratos que prendiam cada inquilino. O mercado de talentos que movia pessoas entre propriedades corporativas como invent\u00E1rio. O sistema Lightning que rastreava cada sat que ela gastava. Nunca havia pensado nisso como controle. Havia pensado nisso como estrutura. Havia pensado nisso como civiliza\u00E7\u00E3o.",
          "Ela pensou nisso agora.",
          "Um menino \u2014 talvez dez, talvez doze \u2014 puxou a manga da mulher que havia acenado para ela quando entrou. \u201CPor que \u00E9 t\u00E3o pequeno?\u201D ele perguntou. N\u00E3o estava sendo grosso. Estava genuinamente confuso. Provavelmente havia visto a Catedral. Provavelmente havia visto o \u00E1trio da BlackRock. Monumentos no Hotel eram constru\u00EDdos para fazer voc\u00EA sentir o peso do que celebravam. Este c\u00F4modo fazia voc\u00EA sentir o oposto. Fazia voc\u00EA sentir a leveza de uma pessoa, trabalhando sozinha, que por acaso estava certa.",
          "A mulher colocou a m\u00E3o no ombro do menino. \u201CPorque ele n\u00E3o precisava de mais espa\u00E7o que este.\u201D",
          "Kira ficou quarenta minutos. N\u00E3o tocou a parede. N\u00E3o sentou no ch\u00E3o. Apenas ficou de p\u00E9 e leu tudo duas vezes e olhou para a fotografia tr\u00EAs vezes e deixou o concreto fresco lembrar seus p\u00E9s que o Hotel tinha um fundo, e o fundo era perto, e o calor em que vivera a vida toda n\u00E3o era um direito de nascen\u00E7a. Era algo que algu\u00E9m havia constru\u00EDdo. Algu\u00E9m espec\u00EDfico. Algu\u00E9m cujas m\u00E3os pararam de funcionar e que continuou construindo mesmo assim.",
          "Quando saiu, o Shaft Expresso subiu em quase-sil\u00EAncio. Ela observou o contador de andares subir: 500. 5.000. 20.000. O Cintur\u00E3o Agr\u00EDcola passou, depois o Campo Aberto, depois os andares nacionais que nunca havia visitado. O ar esquentava por graus. No Andar 100.000 parecia lar. No Andar 150.000 podia sentir o cheiro do ar reciclado da Strategy que havia respirado a vida inteira.",
          "Ela saiu no seu andar. Os corredores eram amplos e bem iluminados. Os terminais Lightning piscavam em verde. Um colega passou e disse algo sobre uma revis\u00E3o trimestral e ela assentiu e continuou andando.",
          "Em seus aposentos, sentou na beira da cama. O c\u00F4modo era quente. As luzes eram firmes. Tudo funcionava.",
          "Ela abriu as m\u00E3os e olhou para elas.",
          "Ent\u00E3o as fechou.",
        ],
      },
      ja: {
        title: "\u8D70\u308B",
        dedication: "\u30CF\u30EB\u30FB\u30D5\u30A3\u30CB\u30FC\u306B\u6367\u3050\u3002",
        endnote: "\u30CF\u30EB\u30FB\u30D5\u30A3\u30CB\u30FC\u306F\u5E02\u6C11\u7684\u81EA\u7531\u306E\u64C1\u8B77\u8005\u3001\u6697\u53F7\u6280\u8853\u306E\u5148\u99C6\u8005\u3001\u30BD\u30D5\u30C8\u30A6\u30A7\u30A2\u958B\u767A\u8005\u3001\u305D\u3057\u3066\u30D3\u30C3\u30C8\u30B3\u30A4\u30F3\u306E\u6700\u521D\u671F\u306E\u8CA2\u732E\u8005\u306E\u4E00\u4EBA\u3067\u3057\u305F\u3002ALS\uFF08\u7B4B\u840E\u7E2E\u6027\u5074\u7D22\u786C\u5316\u75C7\uFF09\u3068\u8A3A\u65AD\u3055\u308C\u3001\u4E94\u5E74\u9593\u95D8\u3044\u7D9A\u3051\u3001\u6700\u5F8C\u307E\u3067\u30B3\u30FC\u30C9\u3092\u66F8\u304D\u7D9A\u3051\u307E\u3057\u305F\u3002\n\nALS Network\uFF08alsnetwork.org\uFF09\u306F\u30D5\u30E9\u30F3\u30FB\u30D5\u30A3\u30CB\u30FC\u3068\u5354\u529B\u3057\u3066Running Bitcoin Challenge\u3092\u904B\u55B6\u3057\u3066\u3044\u307E\u3059\u3002ALS\u7814\u7A76\u306E\u305F\u3081\u306E\u5E74\u6B21\u30B0\u30ED\u30FC\u30D0\u30EB\u30A4\u30D9\u30F3\u30C8\u3067\u3059\u3002runningbitcoin.us\u3067\u8CA2\u732E\u3067\u304D\u307E\u3059\u3002",
        endnoteCloser: "\u706B\u306F\u898B\u3066\u3044\u308B\u3002\u5F7C\u3082\u307E\u305F\u3002",
        content: [
          "\u30A8\u30AF\u30B9\u30D7\u30EC\u30B9\u30FB\u30B7\u30E3\u30D5\u30C8\u306F\u5341\u4E00\u5206\u3067\u5341\u4E94\u4E07\u968E\u3092\u964D\u4E0B\u3057\u305F\u3002\u5F7C\u5973\u304C\u6700\u521D\u306B\u6C17\u3065\u3044\u305F\u306E\u306F\u3001\u9759\u3051\u3055\u3060\u3063\u305F\u3002",
          "\u7121\u97F3\u3067\u306F\u306A\u3044\u3002\u4E0A\u5C64\u968E\u3060\u3063\u3066\u7121\u97F3\u3067\u306F\u306A\u304B\u3063\u305F\u2014\u2014\u7A7A\u8ABF\u3068\u5546\u696D\u6D3B\u52D5\u3068\u3001\u4EBA\u3005\u304C\u826F\u3044\u66AE\u3089\u3057\u3092\u9001\u308B\u4F4E\u3044\u632F\u52D5\u306B\u6E80\u3061\u3066\u3044\u305F\u3002\u3057\u304B\u3057\u3053\u308C\u306F\u9055\u3046\u7A2E\u985E\u306E\u9759\u3051\u3055\u3060\u3063\u305F\u3002\u610F\u56F3\u7684\u306A\u9759\u3051\u3055\u3002\u8AB0\u304B\u304C\u4F55\u304B\u5927\u5207\u306A\u3053\u3068\u3092\u601D\u3044\u51FA\u305D\u3046\u3068\u3057\u3066\u3044\u308B\u3068\u304D\u3001\u90E8\u5C4B\u304C\u9759\u307E\u308A\u8FD4\u308B\u3068\u304D\u306E\u3088\u3046\u306A\u3002",
          "\u30AD\u30E9\u30FB\u30BF\u30F3\u306F\u751F\u307E\u308C\u3066\u304B\u3089\u305A\u3063\u3068\u30B9\u30C8\u30E9\u30C6\u30B8\u30FC\u30FB\u30D5\u30ED\u30A2\u3067\u66AE\u3089\u3057\u3066\u304D\u305F\u3002\u56DB\u5341\u4E00\u5E74\u9593\u306E\u7BA1\u7406\u3055\u308C\u305F\u7A7A\u6C17\u3001\u77AC\u304D\u304C\u7D42\u308F\u308B\u524D\u306B\u5B8C\u4E86\u3059\u308B\u30E9\u30A4\u30C8\u30CB\u30F3\u30B0\u6C7A\u6E08\u3001\u4E88\u6E2C\u53EF\u80FD\u306A\u9593\u9694\u3067\u4E88\u6E2C\u53EF\u80FD\u306A\u54C1\u8CEA\u3067\u5C4A\u304F\u98DF\u4E8B\u3002\u4E09\u3064\u306E\u30B5\u30D6\u30D5\u30ED\u30A2\u306E\u8CC7\u6E90\u914D\u5206\u3092\u7BA1\u7406\u3057\u3066\u3044\u305F\u3002\u3042\u3089\u3086\u308B\u5408\u7406\u7684\u306A\u57FA\u6E96\u3067\u898B\u3066\u3001\u5FEB\u9069\u306A\u66AE\u3089\u3057\u3060\u3063\u305F\u3002\u30A8\u30AF\u30B9\u30D7\u30EC\u30B9\u30FB\u30D1\u30B9\u306F\u3001\u306A\u304F\u3066\u3082\u56F0\u3089\u306A\u3044\u91D1\u3067\u8CB7\u3063\u305F\u3002",
          "\u4E00\u4E03\u3007\u968E\u306F\u4E88\u60F3\u3068\u306F\u9055\u3063\u305F\u3002",
          "\u3082\u3063\u3068\u58EE\u5927\u306A\u3082\u306E\u3092\u60F3\u50CF\u3057\u3066\u3044\u305F\u3002\u5927\u8056\u5802\u306E\u3088\u3046\u306A\u2014\u2014\u30BB\u30A4\u30E9\u30FC\u306E\u30D5\u30ED\u30A2\u306B\u3042\u308B\u3088\u3046\u306A\u2014\u2014\u30A2\u30FC\u30C1\u578B\u306E\u5929\u4E95\u3001\u30B9\u30C6\u30F3\u30C9\u30B0\u30E9\u30B9\u3001\u4FE1\u5FF5\u3092\u7269\u7406\u7684\u306B\u5F62\u306B\u3057\u305F\u5EFA\u7BC9\u3002\u30DB\u30C6\u30EB\u306E\u4E2D\u3067\u5341\u5206\u306A\u6570\u306E\u8A18\u5FF5\u7891\u3092\u898B\u3066\u304D\u305F\u304B\u3089\u3001\u5BCC\u304C\u4F55\u304B\u3092\u79F0\u3048\u3088\u3046\u3068\u3059\u308B\u3068\u304D\u306B\u4F55\u3092\u3059\u308B\u304B\u306F\u77E5\u3063\u3066\u3044\u305F\u3002\u4E0A\u3078\u3001\u5916\u3078\u3001\u3088\u308A\u5927\u304D\u304F\u5EFA\u3066\u308B\u306E\u3060\u3002",
          "\u4E00\u4E03\u3007\u968E\u306F\u5C0F\u3055\u304B\u3063\u305F\u3002\u4E00\u90E8\u5C4B\u3002\u5929\u4E95\u306F\u80CC\u306E\u9AD8\u3044\u7537\u306A\u3089\u5727\u8FEB\u611F\u3092\u611F\u3058\u308B\u7A0B\u5EA6\u306B\u306F\u4F4E\u304B\u3063\u305F\u304C\u3001\u8EAB\u3092\u304B\u304C\u3081\u308B\u307B\u3069\u3067\u306F\u306A\u304B\u3063\u305F\u3002\u58C1\u306F\u98FE\u308A\u6C17\u304C\u306A\u304B\u3063\u305F\u3002\u5E8A\u306F\u30B3\u30F3\u30AF\u30EA\u30FC\u30C8\u2014\u2014\u672C\u7269\u306E\u30B3\u30F3\u30AF\u30EA\u30FC\u30C8\u3067\u3001\u4E00\u751F\u6B69\u3044\u3066\u304D\u305F\u78E8\u304B\u308C\u305F\u8907\u5408\u7D20\u6750\u3067\u306F\u306A\u304B\u3063\u305F\u3002\u9774\u306E\u4E0B\u3067\u3072\u3093\u3084\u308A\u3057\u3066\u3044\u305F\u3002\u51B7\u305F\u304F\u306F\u306A\u3044\u3002\u305F\u3060\u3072\u3093\u3084\u308A\u3002\u30AC\u30BF\u30FC\u306E\u51B7\u6C17\u306B\u8FD1\u3044\u304C\u3001\u305D\u306E\u4E2D\u3067\u306F\u306A\u3044\u3002\u82E6\u3057\u307F\u306E\u767E\u516D\u5341\u4E03\u968E\u4E0A\u306B\u3044\u3066\u3001\u307E\u3060\u305D\u308C\u304C\u624B\u3092\u4F38\u3070\u3057\u3066\u304F\u308B\u306E\u3092\u611F\u3058\u308B\u3053\u3068\u304C\u3067\u304D\u305F\u3002",
          "\u4E2D\u306B\u306F\u4E8C\u5341\u4EBA\u307B\u3069\u304C\u3044\u305F\u3002\u8AB0\u3082\u3055\u3055\u3084\u304D\u58F0\u4EE5\u4E0A\u3067\u306F\u8A71\u3057\u3066\u3044\u306A\u304B\u3063\u305F\u3002\u5165\u308A\u53E3\u8FD1\u304F\u306E\u5973\u6027\u304C\u5F7C\u5973\u306B\u9817\u3044\u305F\u2014\u2014\u6848\u5185\u4EBA\u3067\u3082\u3001\u53D7\u4ED8\u3067\u3082\u306A\u3044\u3002\u305F\u3060\u5F7C\u5973\u3088\u308A\u9577\u304F\u3053\u3053\u306B\u3044\u305F\u8AB0\u304B\u3002",
          "\u30AD\u30E9\u304C\u6700\u521D\u306B\u898B\u305F\u306E\u306F\u58C1\u3060\u3063\u305F\u3002",
          "\u30B9\u30AF\u30EA\u30FC\u30F3\u3067\u306F\u306A\u304B\u3063\u305F\u3002\u305D\u308C\u304C\u885D\u6483\u3060\u3063\u305F\u3002\u3042\u3089\u3086\u308B\u8868\u9762\u304C\u4F55\u3067\u3082\u6620\u3057\u51FA\u305B\u308B\u5EFA\u7269\u306E\u4E2D\u3067\u3001\u3053\u306E\u58C1\u306F\u7269\u7406\u7684\u3060\u3063\u305F\u3002\u91D1\u5C5E\u306B\u2014\u2014\u672C\u7269\u306E\u91D1\u5C5E\u306B\u3001\u6295\u5F71\u3067\u306F\u306A\u304F\u2014\u2014\u4E8C\u3064\u306E\u8A00\u8449\u304C\u523B\u307E\u308C\u3066\u3044\u305F\u3002",
          "---",
          "Running bitcoin.",
          "---",
          "\u8A00\u8449\u306E\u4E0B\u306B\u3001\u65E5\u4ED8\u3002\u4E8C\u3007\u3007\u4E5D\u5E74\u4E00\u6708\u3002\u305D\u3057\u3066\u540D\u524D\u3002\u30CF\u30EB\u30FB\u30D5\u30A3\u30CB\u30FC\u3002",
          "\u30AD\u30E9\u306F\u305D\u306E\u540D\u524D\u3092\u300C\u571F\u53F0\u300D\u3068\u3044\u3046\u8A00\u8449\u3092\u77E5\u3063\u3066\u3044\u308B\u306E\u3068\u540C\u3058\u3088\u3046\u306B\u77E5\u3063\u3066\u3044\u305F\u2014\u2014\u3059\u3079\u3066\u306E\u4E0B\u306B\u3042\u308B\u3082\u306E\u3001\u305D\u308C\u304C\u652F\u3048\u3066\u3044\u308B\u304B\u3089\u8003\u3048\u308B\u306E\u3092\u3084\u3081\u305F\u3082\u306E\u3002\u30B9\u30C8\u30E9\u30C6\u30B8\u30FC\u30FB\u30D5\u30ED\u30A2\u306E\u5B66\u6821\u3067\u7FD2\u3063\u305F\u3001\u30DB\u30C6\u30EB\u306E\u5EFA\u8A2D\u306B\u3064\u3044\u3066\u306E\u3088\u308A\u9577\u3044\u6388\u696D\u306E\u4E2D\u306E\u4E00\u884C\u3002\u30CF\u30EB\u30FB\u30D5\u30A3\u30CB\u30FC\u304C\u6700\u521D\u306E\u30C8\u30E9\u30F3\u30B6\u30AF\u30B7\u30E7\u30F3\u3092\u53D7\u3051\u53D6\u3063\u305F\u3002\u30D6\u30ED\u30C3\u30AF\u4E00\u4E03\u3007\u3002\u4E8B\u5B9F\u3002\u6574\u7406\u3055\u308C\u305F\u3002\u4E8C\u5EA6\u3068\u958B\u304B\u308C\u306A\u304B\u3063\u305F\u3002",
          "\u5F7C\u5973\u306F\u90E8\u5C4B\u306E\u5965\u3078\u9032\u3093\u3060\u3002",
          "\u5DE6\u306E\u58C1\u306B\u6CBF\u3063\u3066\u3001\u4E00\u9023\u306E\u30AC\u30E9\u30B9\u30B1\u30FC\u30B9\u304C\u7269\u54C1\u3092\u53CE\u3081\u3066\u3044\u305F\u3002\u30EC\u30D7\u30EA\u30AB\u3067\u306F\u306A\u3044\u2014\u2014\u30AA\u30EA\u30B8\u30CA\u30EB\u3001\u3042\u308B\u3044\u306F\u4E8C\u4E00\u56DB\u3007\u5E74\u304C\u7528\u610F\u3067\u304D\u308B\u9650\u308A\u30AA\u30EA\u30B8\u30CA\u30EB\u306B\u8FD1\u3044\u3082\u306E\u3002\u5F7C\u5973\u306F\u8EAB\u3092\u4E57\u308A\u51FA\u3057\u305F\u3002\u4FDD\u5B58\u30AC\u30E9\u30B9\u306E\u4E0B\u3067\u9EC4\u3070\u3093\u3060\u5370\u5237\u3055\u308C\u305F\u30E1\u30FC\u30EB\u3002\u6587\u5B57\u306F\u5C0F\u3055\u304F\u3001\u76EE\u3092\u7D30\u3081\u306A\u3051\u308C\u3070\u306A\u3089\u306A\u304B\u3063\u305F\u3002\u6280\u8853\u7684\u306A\u3084\u308A\u3068\u308A\u3002\u307E\u3060\u5B58\u5728\u3057\u306A\u3044\u3082\u306E\u3092\u4F5C\u3063\u3066\u3044\u308B\u4EBA\u306E\u5FCD\u8010\u3067\u3001\u30B3\u30FC\u30C9\u3092\u4E00\u884C\u4E00\u884C\u30C7\u30D0\u30C3\u30B0\u3057\u3066\u3044\u308B\u8AB0\u304B\u3002\u672B\u5C3E\u306E\u7F72\u540D\u2014\u2014\u30CF\u30EB\u3002",
          "\u6B21\u306E\u30B1\u30FC\u30B9\u306B\u306F\u5199\u771F\u304C\u3042\u3063\u305F\u3002\u8ECA\u6905\u5B50\u306E\u7537\u6027\u3002\u9854\u306F\u75E9\u305B\u3066\u3044\u305F\u3002\u8155\u306F\u6905\u5B50\u306E\u30A2\u30FC\u30E0\u30EC\u30B9\u30C8\u306E\u4E0A\u306B\u3001\u8AB0\u304B\u4ED6\u306E\u4EBA\u304C\u7F6E\u3044\u305F\u3053\u3068\u3092\u793A\u3059\u89D2\u5EA6\u3067\u8F09\u3063\u3066\u3044\u305F\u3002\u3057\u304B\u3057\u5FAE\u7B11\u3093\u3067\u3044\u305F\u3002\u30AB\u30E1\u30E9\u7528\u306B\u6F14\u3058\u308B\u985E\u306E\u5FAE\u7B11\u307F\u3067\u306F\u306A\u3044\u2014\u2014\u611B\u3059\u308B\u4EBA\u306B\u4F55\u304B\u9762\u767D\u3044\u3053\u3068\u3092\u8A00\u308F\u308C\u3066\u3001\u8868\u60C5\u3092\u6574\u3048\u308B\u6687\u304C\u306A\u304B\u3063\u305F\u3068\u304D\u306B\u751F\u307E\u308C\u308B\u985E\u306E\u5FAE\u7B11\u307F\u3002",
          "\u5199\u771F\u306E\u4E0B\u306B\u5C0F\u3055\u306A\u30D7\u30EC\u30FC\u30C8\u3002\u65E5\u4ED8\u306F\u306A\u3044\u3002\u305F\u3060\uFF1A",
          "---",
          "\u5F7C\u306F\u5E02\u6C11\u7684\u81EA\u7531\u306E\u64C1\u8B77\u8005\u3067\u3042\u308A\u3001\u6697\u53F7\u6280\u8853\u306E\u5148\u99C6\u8005\u3067\u3042\u308A\u3001\u30BD\u30D5\u30C8\u30A6\u30A7\u30A2\u958B\u767A\u8005\u3067\u3042\u308A\u3001\u30D3\u30C3\u30C8\u30B3\u30A4\u30F3\u306E\u6700\u521D\u671F\u306E\u5EFA\u8A2D\u8005\u306E\u4E00\u4EBA\u3060\u3063\u305F\u3002ALS\u3068\u8A3A\u65AD\u3055\u308C\u3001\u4E94\u5E74\u9593\u95D8\u3063\u305F\u3002\u30B3\u30FC\u30C9\u3092\u66F8\u304F\u3053\u3068\u3092\u6C7A\u3057\u3066\u3084\u3081\u306A\u304B\u3063\u305F\u3002",
          "---",
          "\u30AD\u30E9\u306F\u30D7\u30EC\u30FC\u30C8\u3092\u4E8C\u5EA6\u8AAD\u3093\u3060\u3002\u4E8C\u5EA6\u76EE\u306F\u3086\u3063\u304F\u308A\u8AAD\u307F\u3001\u8A00\u8449\u304C\u80F8\u306E\u4E2D\u3067\u4E26\u3073\u66FF\u308F\u3063\u305F\u3002\u30B3\u30FC\u30C9\u3092\u66F8\u304F\u3053\u3068\u3092\u6C7A\u3057\u3066\u3084\u3081\u306A\u304B\u3063\u305F\u3002\u5F7C\u5973\u306F\u305D\u306E\u3053\u3068\u3092\u8003\u3048\u305F\u3002\u90E8\u5C4B\u3054\u3068\u306B\u9589\u3058\u3066\u3044\u304F\u8EAB\u4F53\u2014\u2014\u307E\u305A\u624B\u3001\u6B21\u306B\u8155\u3001\u305D\u3057\u3066\u3059\u3079\u3066\u2014\u2014\u305D\u3057\u3066\u305D\u306E\u4E2D\u306E\u4EBA\u9593\u304C\u307E\u3060\u30AD\u30FC\u30DC\u30FC\u30C9\u306B\u624B\u3092\u4F38\u3070\u3057\u3066\u3044\u308B\u3002\u307E\u3060\u30C7\u30D0\u30C3\u30B0\u3057\u3066\u3044\u308B\u3002\u307E\u3060\u3001\u81EA\u5206\u3092\u4E00\u4E16\u7D00\u4EE5\u4E0A\u3082\u751F\u304D\u5EF6\u3073\u308B\u3053\u3068\u306B\u306A\u308B\u30B7\u30B9\u30C6\u30E0\u3092\u4F5C\u308A\u7D9A\u3051\u3066\u3044\u308B\u3002",
          "\u81EA\u5206\u306E\u624B\u306E\u3053\u3068\u3092\u8003\u3048\u305F\u3002\u914D\u5206\u30EC\u30DD\u30FC\u30C8\u3092\u627F\u8A8D\u3059\u308B\u305F\u3081\u306B\u4F7F\u3063\u3066\u3044\u305F\u3002\u30E9\u30A4\u30C8\u30CB\u30F3\u30B0\u306E\u8ACB\u6C42\u66F8\u3092\u30B9\u30EF\u30A4\u30D7\u3059\u308B\u305F\u3081\u306B\u4F7F\u3063\u3066\u3044\u305F\u3002\u4F55\u304B\u3092\u4F5C\u308B\u305F\u3081\u306B\u4F7F\u3063\u305F\u3053\u3068\u306F\u306A\u304B\u3063\u305F\u3002",
          "\u5E74\u914D\u306E\u7537\u6027\u304C\u5965\u306E\u58C1\u306E\u8FD1\u304F\u306B\u7ACB\u3063\u3066\u3044\u305F\u3002\u624B\u306E\u3072\u3089\u3092\u58C1\u306B\u5E73\u3089\u306B\u5F53\u3066\u3066\u3002\u5F7C\u5973\u304C\u5165\u3063\u3066\u304B\u3089\u305A\u3063\u3068\u305D\u3046\u3057\u3066\u3044\u305F\u3002\u5927\u4E08\u592B\u3067\u3059\u304B\u3068\u805E\u304D\u304B\u3051\u305F\u3002\u305D\u308C\u304B\u3089\u5F7C\u306E\u9854\u3092\u898B\u3066\u3001\u5F7C\u304C\u3057\u3066\u3044\u308B\u3053\u3068\u306B\u540D\u524D\u304C\u306A\u3044\u3053\u3068\u3092\u7406\u89E3\u3057\u305F\u2014\u2014\u7948\u308A\u3068\u611F\u8B1D\u306E\u9593\u306E\u4F55\u304B\u3001\u91CD\u8981\u306A\u4EBA\u304C\u304B\u3064\u3066\u547C\u5438\u3057\u3066\u3044\u305F\u90E8\u5C4B\u306B\u7ACB\u3064\u4EBA\u306E\u9759\u3051\u3055\u3002",
          "\u5965\u306E\u58C1\u304C\u6700\u5F8C\u306E\u30D4\u30FC\u30B9\u3060\u3063\u305F\u3002",
          "\u3053\u3053\u306B\u306F\u30AC\u30E9\u30B9\u30B1\u30FC\u30B9\u306F\u306A\u3044\u3002\u5199\u771F\u3082\u306A\u3044\u3002\u5165\u308A\u53E3\u306E\u58C1\u3068\u540C\u3058\u91D1\u5C5E\u306B\u523B\u307E\u308C\u305F\u6587\u5B57\u3060\u3051\u3002\u90E8\u5C4B\u306E\u53CD\u5BFE\u5074\u304B\u3089\u8AAD\u3081\u308B\u307B\u3069\u5927\u304D\u3044\u3002",
          "---",
          "\u300C\u6211\u3005\u306F\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u306E\u55AA\u5931\u3001\u5FCD\u3073\u5BC4\u308B\u30B3\u30F3\u30D4\u30E5\u30FC\u30BF\u5316\u3001\u5DE8\u5927\u306A\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u3001\u3055\u3089\u306A\u308B\u4E2D\u592E\u96C6\u6A29\u5316\u3068\u3044\u3046\u554F\u984C\u306B\u76F4\u9762\u3057\u3066\u3044\u308B\u2014\u2014\u305D\u3057\u3066\u30C1\u30E3\u30A6\u30E0\u306F\u307E\u3063\u305F\u304F\u7570\u306A\u308B\u65B9\u5411\u3092\u63D0\u793A\u3057\u3066\u3044\u308B\u3002\u653F\u5E9C\u3084\u4F01\u696D\u3067\u306F\u306A\u304F\u3001\u500B\u4EBA\u306E\u624B\u306B\u529B\u3092\u7F6E\u304F\u65B9\u5411\u3092\u3002\u30B3\u30F3\u30D4\u30E5\u30FC\u30BF\u306F\u4EBA\u3005\u3092\u652F\u914D\u3059\u308B\u305F\u3081\u3067\u306F\u306A\u304F\u3001\u89E3\u653E\u3057\u4FDD\u8B77\u3059\u308B\u305F\u3081\u306E\u9053\u5177\u3068\u3057\u3066\u4F7F\u3046\u3053\u3068\u304C\u3067\u304D\u308B\u3002\u300D",
          "---",
          "\u305D\u306E\u4E0B\u306B\u3001\u3088\u308A\u5C0F\u3055\u306A\u6587\u5B57\u3067\u2014\u2014\u30CF\u30EB\u30FB\u30D5\u30A3\u30CB\u30FC\u3001\u4E00\u4E5D\u4E5D\u4E8C\u5E74\u3002",
          "\u4E00\u4E5D\u4E5D\u4E8C\u5E74\u3002\u30AD\u30E9\u306F\u8003\u3048\u308B\u307E\u3067\u3082\u306A\u304F\u8A08\u7B97\u3057\u305F\u2014\u2014\u767E\u56DB\u5341\u516B\u5E74\u524D\u3002\u30DB\u30C6\u30EB\u304C\u5B58\u5728\u3059\u308B\u524D\u306B\u3053\u306E\u8A00\u8449\u3092\u66F8\u3044\u3066\u3044\u305F\u3002\u5BD2\u51B7\u5316\u306E\u524D\u306B\u3002\u30DA\u30C8\u30ED\u30C9\u30EB\u304C\u5D29\u58CA\u3059\u308B\u524D\u306B\u3001\u30B0\u30EC\u30FC\u30C8\u30FB\u30C1\u30A7\u30C3\u30AF\u30A4\u30F3\u306E\u524D\u306B\u3001\u4EBA\u985E\u306E\u4E5D\u5341\u4E94\u30D1\u30FC\u30BB\u30F3\u30C8\u304C\u30AC\u30BF\u30FC\u306B\u843D\u3061\u308B\u524D\u306B\u3001\u4ED6\u306E\u8AB0\u304B\u306E\u4FE1\u5FF5\u304C\u7BC9\u3044\u305F\u30D5\u30ED\u30A2\u3067\u5F7C\u5973\u304C\u751F\u307E\u308C\u308B\u524D\u306B\u3002",
          "\u5F7C\u306B\u306F\u898B\u3048\u3066\u3044\u305F\u3002\u30DB\u30C6\u30EB\u3067\u306F\u306A\u3044\u3002\u30DB\u30C6\u30EB\u3088\u308A\u524D\u306E\u3082\u306E\u3002\u305D\u306E\u5FC5\u8981\u6027\u304C\u3002",
          "\u7ACB\u3063\u3066\u3044\u308B\u5834\u6240\u304B\u3089\u8ECA\u6905\u5B50\u306E\u5199\u771F\u3092\u3082\u3046\u4E00\u5EA6\u898B\u305F\u3002\u7537\u306E\u76EE\u306F\u92ED\u304B\u3063\u305F\u3002\u4E00\u5EA6\u76EE\u306B\u898B\u843D\u3068\u3057\u3066\u3044\u305F\u30C7\u30A3\u30C6\u30FC\u30EB\u3002\u8EAB\u4F53\u306F\u8870\u3048\u3066\u3044\u305F\u3002\u76EE\u306F\u305D\u3046\u3067\u306F\u306A\u304B\u3063\u305F\u3002\u4ECA\u3082\u306A\u304A\u8A08\u7B97\u3092\u7D9A\u3051\u3066\u3044\u308B\u4EBA\u306E\u76EE\u306B\u898B\u3048\u305F\u3002\u6905\u5B50\u306E\u4E2D\u3067\u3055\u3048\u3001\u30BF\u30A4\u30D7\u3067\u304D\u306A\u3044\u624B\u3067\u3055\u3048\u2014\u2014\u982D\u306E\u4E2D\u3067\u554F\u984C\u306B\u53D6\u308A\u7D44\u3093\u3067\u3044\u308B\u3002\u554F\u984C\u306E\u307B\u3046\u304C\u3001\u304B\u3064\u3066\u305D\u308C\u3092\u904B\u3093\u3067\u3044\u305F\u8EAB\u4F53\u3088\u308A\u91CD\u8981\u3060\u3063\u305F\u304B\u3089\u3002",
          "\u30AD\u30E9\u306E\u558D\u304C\u7DE0\u307E\u3063\u305F\u3002\u4E88\u60F3\u3057\u3066\u3044\u306A\u304B\u3063\u305F\u3002",
          "\u6B74\u53F2\u7684\u306A\u5834\u6240\u3092\u8A2A\u308C\u308B\u3088\u3046\u306B\u6765\u3066\u3044\u305F\u2014\u2014\u656C\u610F\u3092\u6301\u3063\u3066\u3001\u7FA9\u52D9\u611F\u304B\u3089\u3001\u4F55\u304B\u3092\u5B66\u3076\u3068\u3044\u3046\u6F20\u7136\u3068\u3057\u305F\u610F\u56F3\u3068\u3001\u4F55\u3082\u611F\u3058\u306A\u3044\u3060\u308D\u3046\u3068\u3044\u3046\u5185\u5FC3\u306E\u4E88\u60F3\u3068\u3001\u5E30\u308A\u306B\u304A\u571F\u7523\u5C4B\u3067\u4F55\u304B\u8CB7\u3046\u3060\u308D\u3046\u3068\u3044\u3046\u60F3\u5B9A\u3067\u3002",
          "\u304A\u571F\u7523\u5C4B\u306F\u306A\u304B\u3063\u305F\u3002\u8CB7\u3046\u3082\u306E\u306F\u4F55\u3082\u306A\u304B\u3063\u305F\u3002\u6765\u308B\u524D\u306B\u3069\u3053\u304B\u3067\u8AAD\u3093\u3060\u3053\u3068\u304C\u3042\u3063\u305F\u2014\u2014\u3053\u306E\u30D5\u30ED\u30A2\u306F\u4F55\u3082\u58F2\u3089\u306A\u3044\u3001\u4F55\u3082\u53D6\u5F15\u3057\u306A\u3044\u3068\u3002\u305D\u306E\u610F\u5473\u3092\u4ECA\u307E\u3067\u7406\u89E3\u3057\u3066\u3044\u306A\u304B\u3063\u305F\u3002",
          "\u82E5\u3044\u5973\u6027\u304C\u523B\u307E\u308C\u305F\u5F15\u7528\u6587\u306E\u8FD1\u304F\u306E\u5E8A\u306B\u5EA7\u3063\u3066\u3044\u305F\u3002\u3042\u3050\u3089\u3092\u304B\u3044\u3066\u3001\u819D\u306E\u4E0A\u306B\u30CE\u30FC\u30C8\u3092\u958B\u3044\u3066\u3002\u624B\u3067\u8A00\u8449\u3092\u66F8\u304D\u5199\u3057\u3066\u3044\u305F\u3002\u3086\u3063\u304F\u308A\u3068\u3002\u66F8\u304F\u3068\u3044\u3046\u884C\u70BA\u304C\u3001\u8AAD\u3080\u3060\u3051\u3067\u306F\u5B66\u3079\u306A\u3044\u4F55\u304B\u3092\u6559\u3048\u3066\u304F\u308C\u308B\u304B\u306E\u3088\u3046\u306B\u3002",
          "\u30AD\u30E9\u306F\u3057\u3070\u3089\u304F\u5F7C\u5973\u3092\u898B\u3066\u3044\u305F\u3002\u305D\u308C\u304B\u3089\u5F15\u7528\u6587\u3092\u3082\u3046\u4E00\u5EA6\u898B\u305F\u3002",
          "---",
          "\u30B3\u30F3\u30D4\u30E5\u30FC\u30BF\u306F\u4EBA\u3005\u3092\u652F\u914D\u3059\u308B\u305F\u3081\u3067\u306F\u306A\u304F\u3001\u89E3\u653E\u3057\u4FDD\u8B77\u3059\u308B\u305F\u3081\u306E\u9053\u5177\u3068\u3057\u3066\u4F7F\u3046\u3053\u3068\u304C\u3067\u304D\u308B\u3002",
          "---",
          "\u30B9\u30C8\u30E9\u30C6\u30B8\u30FC\u30FB\u30D5\u30ED\u30A2\u306E\u3053\u3068\u3092\u8003\u3048\u305F\u3002\u3059\u3079\u3066\u306E\u30C6\u30CA\u30F3\u30C8\u3092\u7E1B\u308B\u5951\u7D04\u3002\u5728\u5EAB\u306E\u3088\u3046\u306B\u4F01\u696D\u9818\u5730\u9593\u3067\u4EBA\u3092\u52D5\u304B\u3059\u30BF\u30EC\u30F3\u30C8\u5E02\u5834\u3002\u5F7C\u5973\u304C\u4F7F\u3046\u3059\u3079\u3066\u306E\u30B5\u30C3\u30C8\u3092\u8FFD\u8DE1\u3059\u308B\u30E9\u30A4\u30C8\u30CB\u30F3\u30B0\u30FB\u30B7\u30B9\u30C6\u30E0\u3002\u305D\u308C\u3092\u30B3\u30F3\u30C8\u30ED\u30FC\u30EB\u3060\u3068\u8003\u3048\u305F\u3053\u3068\u306F\u306A\u304B\u3063\u305F\u3002\u69CB\u9020\u3060\u3068\u601D\u3063\u3066\u3044\u305F\u3002\u6587\u660E\u3060\u3068\u601D\u3063\u3066\u3044\u305F\u3002",
          "\u4ECA\u3001\u8003\u3048\u305F\u3002",
          "\u5C11\u5E74\u304C\u2014\u2014\u5341\u6B73\u304B\u5341\u4E8C\u6B73\u304F\u3089\u3044\u306E\u2014\u2014\u5F7C\u5973\u304C\u5165\u3063\u3066\u304D\u305F\u3068\u304D\u306B\u9817\u3044\u305F\u5973\u6027\u306E\u8896\u3092\u5F15\u3063\u5F35\u3063\u305F\u3002\u300C\u306A\u3093\u3067\u3053\u3093\u306A\u306B\u5C0F\u3055\u3044\u306E\uFF1F\u300D\u3068\u805E\u3044\u305F\u3002\u5931\u793C\u306A\u3064\u3082\u308A\u3067\u306F\u306A\u304B\u3063\u305F\u3002\u672C\u5F53\u306B\u4E0D\u601D\u8B70\u3060\u3063\u305F\u306E\u3060\u3002\u304A\u305D\u3089\u304F\u5927\u8056\u5802\u3092\u898B\u305F\u3053\u3068\u304C\u3042\u308B\u3002\u304A\u305D\u3089\u304F\u30D6\u30E9\u30C3\u30AF\u30ED\u30C3\u30AF\u306E\u30A2\u30C8\u30EA\u30A6\u30E0\u3092\u898B\u305F\u3053\u3068\u304C\u3042\u308B\u3002\u30DB\u30C6\u30EB\u306E\u8A18\u5FF5\u7891\u306F\u3001\u795D\u3046\u3082\u306E\u306E\u91CD\u307F\u3092\u611F\u3058\u3055\u305B\u308B\u305F\u3081\u306B\u4F5C\u3089\u308C\u3066\u3044\u305F\u3002\u3053\u306E\u90E8\u5C4B\u306F\u305D\u306E\u53CD\u5BFE\u3092\u611F\u3058\u3055\u305B\u305F\u3002\u305F\u3063\u305F\u4E00\u4EBA\u3067\u50CD\u304D\u3001\u305F\u307E\u305F\u307E\u6B63\u3057\u304B\u3063\u305F\u4EBA\u9593\u306E\u8EFD\u3084\u304B\u3055\u3092\u611F\u3058\u3055\u305B\u305F\u3002",
          "\u5973\u6027\u306F\u5C11\u5E74\u306E\u80A9\u306B\u624B\u3092\u7F6E\u3044\u305F\u3002\u300C\u3053\u308C\u4EE5\u4E0A\u306E\u5834\u6240\u306F\u5FC5\u8981\u306A\u304B\u3063\u305F\u304B\u3089\u3088\u3002\u300D",
          "\u30AD\u30E9\u306F\u56DB\u5341\u5206\u9593\u3044\u305F\u3002\u58C1\u306B\u306F\u89E6\u308C\u306A\u304B\u3063\u305F\u3002\u5E8A\u306B\u3082\u5EA7\u3089\u306A\u304B\u3063\u305F\u3002\u305F\u3060\u7ACB\u3063\u3066\u3001\u3059\u3079\u3066\u3092\u4E8C\u5EA6\u8AAD\u307F\u3001\u5199\u771F\u3092\u4E09\u5EA6\u898B\u3066\u3001\u3072\u3093\u3084\u308A\u3057\u305F\u30B3\u30F3\u30AF\u30EA\u30FC\u30C8\u306B\u8DB3\u304C\u601D\u3044\u51FA\u3055\u305B\u308B\u307E\u307E\u306B\u3057\u305F\u2014\u2014\u30DB\u30C6\u30EB\u306B\u306F\u5E95\u304C\u3042\u308B\u3053\u3068\u3001\u5E95\u306F\u8FD1\u3044\u3053\u3068\u3001\u4E00\u751F\u66AE\u3089\u3057\u3066\u304D\u305F\u6E29\u304B\u3055\u306F\u751F\u307E\u308C\u306A\u304C\u3089\u306E\u6A29\u5229\u3067\u306F\u306A\u3044\u3053\u3068\u3002\u8AB0\u304B\u304C\u4F5C\u3063\u305F\u3082\u306E\u3060\u3068\u3044\u3046\u3053\u3068\u3002\u7279\u5B9A\u306E\u8AB0\u304B\u3002\u624B\u304C\u52D5\u304B\u306A\u304F\u306A\u3063\u3066\u3082\u4F5C\u308A\u7D9A\u3051\u305F\u8AB0\u304B\u3002",
          "\u5E30\u308B\u3068\u304D\u3001\u30A8\u30AF\u30B9\u30D7\u30EC\u30B9\u30FB\u30B7\u30E3\u30D5\u30C8\u306F\u307B\u307C\u7121\u97F3\u3067\u4E0A\u6607\u3057\u305F\u3002\u30D5\u30ED\u30A2\u30AB\u30A6\u30F3\u30BF\u30FC\u304C\u4E0A\u304C\u308B\u306E\u3092\u898B\u305F\u3002\u4E94\u3007\u3007\u3002\u4E94\u3007\u3007\u3007\u3002\u4E8C\u3007\u3007\u3007\u3007\u3002\u8FB2\u696D\u30D9\u30EB\u30C8\u304C\u904E\u304E\u3001\u30AA\u30FC\u30D7\u30F3\u30FB\u30EC\u30F3\u30B8\u304C\u904E\u304E\u3001\u4E00\u5EA6\u3082\u8A2A\u308C\u305F\u3053\u3068\u306E\u306A\u3044\u30CA\u30B7\u30E7\u30CA\u30EB\u30FB\u30D5\u30ED\u30A2\u304C\u904E\u304E\u305F\u3002\u7A7A\u6C17\u306F\u5EA6\u3054\u3068\u306B\u6E29\u307E\u3063\u305F\u3002\u5341\u4E07\u968E\u3067\u6545\u90F7\u306E\u3088\u3046\u306B\u611F\u3058\u305F\u3002\u5341\u4E94\u4E07\u968E\u3067\u3001\u4E00\u751F\u5438\u3063\u3066\u304D\u305F\u30B9\u30C8\u30E9\u30C6\u30B8\u30FC\u306E\u30EA\u30B5\u30A4\u30AF\u30EB\u7A7A\u6C17\u306E\u5302\u3044\u304C\u3057\u305F\u3002",
          "\u81EA\u5206\u306E\u30D5\u30ED\u30A2\u306B\u964D\u308A\u305F\u3002\u5ECA\u4E0B\u306F\u5E83\u304F\u3001\u660E\u308B\u304B\u3063\u305F\u3002\u30E9\u30A4\u30C8\u30CB\u30F3\u30B0\u7AEF\u672B\u304C\u7DD1\u306B\u70B9\u6EC5\u3057\u3066\u3044\u305F\u3002\u540C\u50DA\u304C\u901A\u308A\u304B\u304B\u3063\u3066\u56DB\u534A\u671F\u30EC\u30D3\u30E5\u30FC\u306B\u3064\u3044\u3066\u4F55\u304B\u8A00\u3044\u3001\u5F7C\u5973\u306F\u9817\u3044\u3066\u6B69\u304D\u7D9A\u3051\u305F\u3002",
          "\u90E8\u5C4B\u3067\u30D9\u30C3\u30C9\u306E\u7AEF\u306B\u5EA7\u3063\u305F\u3002\u90E8\u5C4B\u306F\u6E29\u304B\u304B\u3063\u305F\u3002\u7167\u660E\u306F\u5B89\u5B9A\u3057\u3066\u3044\u305F\u3002\u3059\u3079\u3066\u304C\u6A5F\u80FD\u3057\u3066\u3044\u305F\u3002",
          "\u4E21\u624B\u3092\u958B\u3044\u3066\u3001\u898B\u3064\u3081\u305F\u3002",
          "\u305D\u3057\u3066\u3001\u9589\u3058\u305F\u3002",
        ],
      },
    },
  },
  {
    id: "laszlos",
    title: "Laszlo\u2019s",
    floor: "Every Floor",
    words: "~2,800 words",
    teaser: "Same name. Same logo. Completely different pizza depending on where you are.",
    pdf: "tales/Laszlos.pdf",
    content: [
      "Dara Voss had a clipboard, a lanyard, and a job that mattered to exactly one person in the Hotel. That person was Dara Voss.",
      "Brand Compliance Officer, Laszlo’s Unified Standards Division. She’d held the title for three years. She’d conducted forty-six location audits across eleven floor clusters. She had a rating system. She had subcategories within the rating system. She had a color-coded tab on her tablet labeled CRUST INTEGRITY that she had designed herself and was quietly proud of.",
      "Today was a vertical audit. Four locations. Gutter to the El Salvador Floors. Same chain. Same logo. Same pizza, according to the brand manual she’d memorized on her second day.",
      "She straightened her lanyard in the elevator mirror and opened her tablet to a fresh form.",
      "---",
      "LOCATION 1: GUTTER — FLOOR 2",
      "The Laszlo’s on Floor 2 did not have a door. It had a gap in the wall where a door had been. Above the gap, a sign read LASZLO’S in letters that had once been orange and were now the color of a headache.",
      "Dara stepped through the gap. The kitchen was eleven feet deep. The oven was a metal box welded to a larger metal box, connected to a gas line that Dara was going to pretend she hadn’t seen because if she wrote it down she would have to file a safety report and the last safety report she’d filed had taken nine months to process and nothing had changed.",
      "Behind the counter stood a woman. Short. Shoulders like a shelf. Hands that looked like they’d been kneading dough or punching walls for the better part of two decades. A name tag that said BOZ.",
      "“Brand compliance,” Dara said, holding up her lanyard.",
      "Boz looked at the lanyard. Looked at Dara. Looked back at the lanyard. Her expression did not change at any point during this process.",
      "“You want a slice?” Boz said.",
      "“I’m here to conduct an audit of your location’s adherence to Unified Brand Standards.”",
      "“So no slice.”",
      "Dara opened her tablet. “Let’s start with dough preparation. The brand manual specifies a hydration ratio of sixty-five percent, a bulk ferment of—”",
      "“I mix flour and water until it feels right.”",
      "“…right. And how do you determine when it feels right?”",
      "“It feels right.”",
      "Dara typed dough preparation: non-standard methodology. She moved on.",
      "“Cheese. The brand standard is a forty-sixty blend of—”",
      "“It’s cheese.”",
      "“What kind of cheese?”",
      "“The kind I have.”",
      "Dara looked at the cheese. The cheese looked back with the quiet confidence of a substance that knew exactly what it was and did not feel the need to explain itself.",
      "She typed cheese: present.",
      "“Can I see the oven?”",
      "Boz opened the oven. Heat hit Dara’s face like a wall with opinions. Inside, a pizza was cooking. It was flat. It was pale. It was, by every metric on Dara’s tablet, an abomination.",
      "It also smelled like the only real thing she’d encountered on Floor 2.",
      "“When was the last time this oven was serviced?” Dara asked.",
      "“When it stops working I hit it. When it starts working I stop hitting it.”",
      "Dara typed oven maintenance: percussive.",
      "She looked around the kitchen. At the welded oven. At the gas line. At Boz, who was already pulling the pizza out and cutting it with a blade that was technically a knife in the same way that Floor 2 was technically a place to live.",
      "“One last question. The brand manual requires all locations to display the Laszlo’s mission statement: ‘Honoring the original transaction, one slice at a time.’ Do you have that posted?”",
      "Boz pointed at the wall behind Dara. There was a piece of sheet metal with something scratched into it. Dara leaned in. It read: PIZZA.",
      "“Close enough,” Dara said.",
      "She typed Location 1 summary: operational. Significant deviation from brand standards. Recommend: continued observation. She had been writing “continued observation” for three years. Nobody had ever observed anything.",
      "On her way out, Boz called after her.",
      "“Hey. Clipboard.”",
      "Dara turned.",
      "“That pizza I just made feeds forty people today. Forty people who’d eat the box if the box tasted better. I don’t need your hydration ratio. I need flour and water and a stove that lights when I hit it. You write whatever you want on that tablet. I’ll be here tomorrow making the same pizza for the same forty people. And the day after that. And the day after that.”",
      "Dara didn’t write that down. She didn’t have a category for it.",
      "---",
      "LOCATION 2: THE STEPS — FLOOR 38",
      "The Laszlo’s on Floor 38 had a door. It also had a doormat. Dara noted both with the quiet satisfaction of a woman who had just come from a location where the door was a concept.",
      "The manager was a man named Sulo who appeared at her elbow before she’d finished crossing the threshold. He was smiling. He had been smiling before she arrived. He would be smiling long after she left. The smile was load-bearing.",
      "“Brand compliance! We’ve been expecting you. Can I get you water? Coffee? A tour? We reorganized the prep station last month — let me show you the prep station.”",
      "He showed her the prep station. It was clean. The ingredients were labeled. The dough was in a proofing box that actually had a temperature reading on it. Dara checked the temperature. It was correct.",
      "This unsettled her.",
      "She tasted the pizza. It was fine. Genuinely fine. The crust had structure. The sauce tasted like tomatoes had been involved at some point. The cheese melted instead of merely participating.",
      "“Meets baseline expectations,” she said, typing.",
      "Sulo’s smile dropped half an inch. “Baseline?”",
      "“That’s a positive rating.”",
      "“Baseline doesn’t sound positive.”",
      "“It means you’ve met the standard.”",
      "“But not exceeded it.”",
      "“The standard is the standard.”",
      "Sulo looked at his pizza the way a parent looks at a report card with all B’s. Adequate. Functionally adequate. The worst kind of adequate.",
      "Dara moved on before he could ask about the bonus tier.",
      "---",
      "LOCATION 3: UPPER MIDS — FLOOR 2,000",
      "The Laszlo’s on Floor 2,000 was, by every measure on Dara’s tablet, flawless.",
      "The kitchen gleamed. The staff wore pressed uniforms. The dough had been fermented for exactly the number of hours specified in the manual and someone had written the ferment time on a label and the label was laminated. Dara touched the label. It was laminated.",
      "The pizza was good. Legitimately good. The crust crackled when she bit into it. The sauce had depth. The cheese pulled in strings that looked like they belonged in an advertisement.",
      "Dara ate the slice. She looked at her tablet. She had nothing to write.",
      "This was the worst possible outcome.",
      "She walked the kitchen again. Opened the walk-in cooler. Checked the temperature. Correct. Checked the expiration labels. Current. Checked the floor drains. Clean.",
      "She found a fingerprint on the laminated menu near the register. She photographed it. She typed minor presentation variance — menu surface.",
      "The manager watched her photograph the fingerprint and said nothing. His face suggested he was reconsidering several life choices.",
      "---",
      "LOCATION 4: EL SALVADOR FLOORS — FLOOR 74,200",
      "The elevator opened and the air changed.",
      "Dara had been on the El Salvador Floors once before, for a different audit, and she remembered the warmth. Not the temperature — the warmth. The distinction sounds like nothing until you feel it. Temperature is what a thermometer reads. Warmth is what walks into your chest and sits down.",
      "The Laszlo’s on Floor 74,200 was on a corner of the main promenade, next to a garden wall climbing three stories with jasmine and something purple. Music was playing from somewhere. Not recorded — live. Someone with a guitar and no particular agenda.",
      "The kitchen was open. Not open-concept — open. No wall between the cook and the promenade. You could watch the pizza being made while you waited, and people did, the way you’d watch a person paint.",
      "The cook was a man named Alvaro. He was kneading dough by hand. Not because the machine was broken. Because his hands were better.",
      "The flour was milled from grain grown in the Agricultural Belt. The tomatoes were real — Dara didn’t know what she meant by “real” until she saw them, red in a way that the Gutter tomatoes weren’t, red like the color had been invented for them specifically. The cheese was fresh. She could smell it from four feet away and the smell made her jaw tighten the way it does before your mouth decides something for you.",
      "Alvaro slid the pizza into a clay oven — actual clay, hand-built, the kind of oven that takes years to season. The heat that came off it was different from Boz’s welded box. Not hotter. More patient.",
      "When the pizza came out, the crust was blistered and charred in spots and the cheese had browned into a landscape of tiny craters and the sauce was visible at the edges like a sunset through a window.",
      "Alvaro cut a slice and handed it to her. He didn’t ask if she wanted one. He could see that she wanted one. Everyone within twenty feet wanted one.",
      "Dara ate it standing at the counter with her tablet in her other hand and her lanyard swinging and the guitar playing and the jasmine drifting and the slice was —",
      "She put the tablet down.",
      "She ate the rest of the slice with both hands. The cheese stretched. The crust held. The sauce tasted like someone had spent their entire life learning exactly how long to cook a tomato and had finally, after decades, gotten it right.",
      "She picked the tablet back up. She looked at the form. Dough preparation. Hydration ratio. Cheese blend. Oven condition. Crust integrity.",
      "She typed brand experience: transcendent.",
      "That wasn’t a category. She didn’t care.",
      "---",
      "The elevator back down took forty minutes.",
      "Dara sat against the wall of the car and watched the floor numbers drop. 74,200. 50,000. 20,000. The Agricultural Belt passed. The Open Range. The Upper Mids where the fingerprint on the menu was probably still being discussed. The Steps where Sulo was probably still smiling. The Gutter where Boz was probably still feeding forty people with flour and water and a stove she hit until it worked.",
      "She opened her report. Four locations. One chain. One logo. One name — Laszlo Hanyecz, the man who traded 10,000 Bitcoin for two pizzas in the old world, and whose name now hangs above every pizza kitchen in the Hotel.",
      "Same brand. Same mission statement, assuming the location had bothered to post it, which one of them had replaced with a piece of sheet metal that just said PIZZA.",
      "Dara looked at her four summaries. Percussive oven maintenance. Baseline expectations. A photographed fingerprint. Transcendent.",
      "She deleted transcendent. Typed exceeds standards. Deleted that. Typed transcendent again.",
      "She closed the tablet. Opened it. Closed it.",
      "The elevator hit Floor 2 and the doors opened and the air that came in was cool and thin and smelled like metal and she thought about Boz. About the welded oven. About the pizza that was flat and pale and fed forty people who’d eat the box if the box tasted better.",
      "She thought about Alvaro. About the clay oven he’d spent years seasoning. About the tomatoes that were red in a way she’d never seen red before.",
      "Same name on both doors. Same logo. Same company, on paper. And between them, seventy-four thousand floors of difference that no brand manual would ever close.",
      "She typed one final line at the bottom of her report:",
      "Laszlo’s does not have a quality problem. The Hotel does. The pizza is exactly as good as the floor it’s on. The brand is consistent. The building is not.",
      "She submitted the report. Nobody would read it. They never did.",
      "She took the elevator up to the Strategy Floors and went home and ordered a Laszlo’s pizza to her unit and when it arrived it was fine. Genuinely fine. The crust had structure. The sauce tasted like tomatoes had been involved.",
      "She ate it at her desk with her tablet closed and the lanyard hanging on the hook by the door and she thought about the word transcendent and how she’d never had a reason to type it before and probably never would again.",
      "The pizza was fine. Everything on the Strategy Floors was fine.",
      "She wanted the one from Floor 74,200.",
    ],
    translations: {
      es: {
        title: "Laszlo\u2019s",
        content: [
          "Dara Voss tenía un portapapeles, una credencial con cordón, y un trabajo que le importaba a exactamente una persona en el Hotel. Esa persona era Dara Voss.",
          "Oficial de Cumplimiento de Marca, División de Estándares Unificados de Laszlo’s. Había ocupado el cargo durante tres años. Había realizado cuarenta y seis auditorías de locales en once clústeres de pisos. Tenía un sistema de calificación. Tenía subcategorías dentro del sistema de calificación. Tenía una pestaña codificada por colores en su tableta etiquetada INTEGRIDAD DE LA CORTEZA que había diseñado ella misma y de la cual estaba silenciosamente orgullosa.",
          "Hoy era una auditoría vertical. Cuatro locales. Del Desagüe a los Pisos de El Salvador. La misma cadena. El mismo logo. La misma pizza, según el manual de marca que se había memorizado en su segundo día.",
          "Se enderezó la credencial en el espejo del ascensor y abrió su tableta en un formulario nuevo.",
          "---",
          "UBICACIÓN 1: EL DESAGÜE — PISO 2",
          "El Laszlo’s del Piso 2 no tenía puerta. Tenía un hueco en la pared donde había habido una puerta. Encima del hueco, un letrero decía LASZLO’S en letras que alguna vez fueron naranjas y ahora eran del color de un dolor de cabeza.",
          "Dara pasó por el hueco. La cocina tenía tres metros de profundidad. El horno era una caja de metal soldada a una caja de metal más grande, conectada a una línea de gas que Dara iba a pretender que no había visto porque si lo anotaba tendría que presentar un informe de seguridad y el último informe de seguridad que había presentado había tardado nueve meses en procesarse y nada había cambiado.",
          "Detrás del mostrador había una mujer. Baja. Hombros como un estante. Manos que parecían haber estado amasando masa o golpeando paredes durante la mayor parte de dos décadas. Una etiqueta que decía BOZ.",
          "“Cumplimiento de marca,” dijo Dara, levantando su credencial.",
          "Boz miró la credencial. Miró a Dara. Miró de nuevo la credencial. Su expresión no cambió en ningún momento durante este proceso.",
          "“¿Quieres un trozo?” dijo Boz.",
          "“Estoy aquí para realizar una auditoría de la adherencia de su local a los Estándares Unificados de Marca.”",
          "“Entonces no quieres trozo.”",
          "Dara abrió su tableta. “Comencemos con la preparación de la masa. El manual de marca especifica una proporción de hidratación del sesenta y cinco por ciento, una fermentación en bloque de—”",
          "“Mezclo harina y agua hasta que se siente bien.”",
          "“…bien. ¿Y cómo determina cuándo se siente bien?”",
          "“Se siente bien.”",
          "Dara tecleó preparación de masa: metodología no estándar. Continuó.",
          "“Queso. El estándar de marca es una mezcla cuarenta-sesenta de—”",
          "“Es queso.”",
          "“¿Qué tipo de queso?”",
          "“Del que tengo.”",
          "Dara miró el queso. El queso le devolvió la mirada con la confianza tranquila de una sustancia que sabía exactamente lo que era y no sentía la necesidad de explicarse.",
          "Tecleó queso: presente.",
          "“¿Puedo ver el horno?”",
          "Boz abrió el horno. El calor golpeó la cara de Dara como una pared con opiniones. Adentro, una pizza se estaba cocinando. Era plana. Era pálida. Era, por cada métrica en la tableta de Dara, una abominación.",
          "También olía como la única cosa real que había encontrado en el Piso 2.",
          "“¿Cuándo fue la última vez que le dieron servicio a este horno?” preguntó Dara.",
          "“Cuando deja de funcionar le pego. Cuando empieza a funcionar dejo de pegarle.”",
          "Dara tecleó mantenimiento del horno: percusivo.",
          "Miró alrededor de la cocina. Al horno soldado. A la línea de gas. A Boz, que ya estaba sacando la pizza y cortándola con una hoja que técnicamente era un cuchillo de la misma manera que el Piso 2 era técnicamente un lugar para vivir.",
          "“Última pregunta. El manual de marca requiere que todos los locales exhiban la declaración de misión de Laszlo’s: ‘Honrando la transacción original, un trozo a la vez.’ ¿Tiene eso publicado?”",
          "Boz señaló la pared detrás de Dara. Había un trozo de lámina de metal con algo rasguado. Dara se acercó. Decía: PIZZA.",
          "“Suficientemente cerca,” dijo Dara.",
          "Tecleó Resumen Ubicación 1: operativo. Desviación significativa de los estándares de marca. Recomendar: observación continua. Había estado escribiendo “observación continua” durante tres años. Nadie había observado nada.",
          "Al salir, Boz la llamó.",
          "“Oye. Portapapeles.”",
          "Dara se volteó.",
          "“Esa pizza que acabo de hacer alimenta a cuarenta personas hoy. Cuarenta personas que se comerían la caja si la caja supiera mejor. No necesito tu proporción de hidratación. Necesito harina y agua y una estufa que encienda cuando le pego. Escribe lo que quieras en esa tableta. Yo voy a estar aquí mañana haciendo la misma pizza para las mismas cuarenta personas. Y pasado mañana. Y pasado pasado mañana.”",
          "Dara no anotó eso. No tenía una categoría para ello.",
          "---",
          "UBICACIÓN 2: LOS ESCALONES — PISO 38",
          "El Laszlo’s del Piso 38 tenía una puerta. También tenía un tapete. Dara notó ambas cosas con la satisfacción silenciosa de una mujer que acababa de venir de un local donde la puerta era un concepto.",
          "El gerente era un hombre llamado Sulo que apareció a su lado antes de que terminara de cruzar el umbral. Estaba sonriendo. Había estado sonriendo antes de que ella llegara. Seguiría sonriendo mucho después de que se fuera. La sonrisa era estructural.",
          "“¡Cumplimiento de marca! La estábamos esperando. ¿Le traigo agua? ¿Café? ¿Un recorrido? Reorganizamos la estación de preparación el mes pasado — déjeme mostrarle la estación de preparación.”",
          "Le mostró la estación de preparación. Estaba limpia. Los ingredientes estaban etiquetados. La masa estaba en una caja de fermentación que realmente tenía una lectura de temperatura. Dara revisó la temperatura. Era correcta.",
          "Esto la inquietó.",
          "Probó la pizza. Estaba bien. Genuinamente bien. La corteza tenía estructura. La salsa sabía como si los tomates hubieran estado involucrados en algún momento. El queso se derretía en lugar de simplemente participar.",
          "“Cumple con las expectativas base,” dijo, tecleando.",
          "La sonrisa de Sulo bajó medio centímetro. “¿Base?”",
          "“Es una calificación positiva.”",
          "“Base no suena positivo.”",
          "“Significa que ha cumplido el estándar.”",
          "“Pero no lo ha superado.”",
          "“El estándar es el estándar.”",
          "Sulo miró su pizza como un padre mira una boleta de calificaciones con puras B. Adecuado. Funcionalmente adecuado. El peor tipo de adecuado.",
          "Dara siguió adelante antes de que pudiera preguntar sobre el nivel de bonificación.",
          "---",
          "UBICACIÓN 3: PISOS MEDIOS SUPERIORES — PISO 2,000",
          "El Laszlo’s del Piso 2,000 era, por cada medida en la tableta de Dara, impecable.",
          "La cocina brillaba. El personal usaba uniformes planchados. La masa había sido fermentada exactamente por el número de horas especificado en el manual y alguien había escrito el tiempo de fermentación en una etiqueta y la etiqueta estaba laminada. Dara tocó la etiqueta. Estaba laminada.",
          "La pizza era buena. Legítimamente buena. La corteza crujía cuando la mordía. La salsa tenía profundidad. El queso se estiraba en hilos que parecían pertenecer a un anuncio.",
          "Dara se comió el trozo. Miró su tableta. No tenía nada que escribir.",
          "Este era el peor resultado posible.",
          "Recorrió la cocina de nuevo. Abrió el refrigerador. Revisó la temperatura. Correcta. Revisó las etiquetas de vencimiento. Vigentes. Revisó los desagües del piso. Limpios.",
          "Encontró una huella digital en el menú laminado cerca de la caja. La fotografió. Tecleó varianza menor de presentación — superficie del menú.",
          "El gerente la vio fotografiar la huella digital y no dijo nada. Su cara sugería que estaba reconsiderando varias decisiones de vida.",
          "---",
          "UBICACIÓN 4: PISOS DE EL SALVADOR — PISO 74,200",
          "Las puertas del ascensor se abrieron y el aire cambió.",
          "Dara había estado en los Pisos de El Salvador una vez antes, para una auditoría diferente, y recordaba la calidez. No la temperatura — la calidez. La distinción suena a nada hasta que la sientes. Temperatura es lo que lee un termómetro. Calidez es lo que te entra al pecho y se sienta.",
          "El Laszlo’s del Piso 74,200 estaba en una esquina del paseo principal, junto a un muro de jardín que trepaba tres pisos con jazmín y algo morado. Sonaba música de alguna parte. No grabada — en vivo. Alguien con una guitarra y sin agenda particular.",
          "La cocina era abierta. No de concepto abierto — abierta. Sin pared entre el cocinero y el paseo. Podías ver cómo se hacía la pizza mientras esperabas, y la gente lo hacía, de la manera en que verías a alguien pintar.",
          "El cocinero era un hombre llamado Alvaro. Estaba amasando a mano. No porque la máquina estuviera rota. Porque sus manos eran mejores.",
          "La harina era molida de grano cultivado en el Cinturón Agrícola. Los tomates eran reales — Dara no sabía qué quería decir con “reales” hasta que los vio, rojos de una manera que los tomates del Desagüe no lo eran, rojos como si el color hubiera sido inventado para ellos específicamente. El queso era fresco. Podía olerlo desde un metro de distancia y el olor le tensó la mandíbula de la manera en que lo hace antes de que tu boca decida algo por ti.",
          "Alvaro deslizó la pizza en un horno de barro — barro real, hecho a mano, el tipo de horno que toma años curar. El calor que salía era diferente de la caja soldada de Boz. No más caliente. Más paciente.",
          "Cuando salió la pizza, la corteza estaba ampollada y chamuscada en partes y el queso se había dorado en un paisaje de pequeños cráteres y la salsa era visible en los bordes como un atardecer a través de una ventana.",
          "Alvaro cortó un trozo y se lo entregó. No le preguntó si quería uno. Podía ver que quería uno. Todos a seis metros querían uno.",
          "Dara se lo comió de pie en el mostrador con su tableta en la otra mano y su credencial balanceándose y la guitarra sonando y el jazmín flotando y el trozo era —",
          "Puso la tableta abajo.",
          "Se comió el resto del trozo con ambas manos. El queso se estiró. La corteza aguantó. La salsa sabía como si alguien hubiera pasado toda su vida aprendiendo exactamente cuánto tiempo cocinar un tomate y finalmente, después de décadas, lo hubiera logrado.",
          "Levantó la tableta de nuevo. Miró el formulario. Preparación de masa. Proporción de hidratación. Mezcla de queso. Condición del horno. Integridad de la corteza.",
          "Tecleó experiencia de marca: trascendente.",
          "Esa no era una categoría. No le importó.",
          "---",
          "El ascensor de regreso tomó cuarenta minutos.",
          "Dara se sentó contra la pared del vagón y vio los números de piso bajar. 74,200. 50,000. 20,000. El Cinturón Agrícola pasó. El Rango Abierto. Los Pisos Medios Superiores donde la huella digital en el menú probablemente todavía estaba siendo discutida. Los Escalones donde Sulo probablemente seguía sonriendo. El Desagüe donde Boz probablemente seguía alimentando a cuarenta personas con harina y agua y una estufa a la que le pegaba hasta que funcionaba.",
          "Abrió su reporte. Cuatro locales. Una cadena. Un logo. Un nombre — Laszlo Hanyecz, el hombre que intercambió 10,000 Bitcoin por dos pizzas en el viejo mundo, y cuyo nombre ahora cuelga sobre cada cocina de pizza en el Hotel.",
          "La misma marca. La misma declaración de misión, asumiendo que el local se hubiera molestado en publicarla, que uno de ellos había reemplazado con un trozo de lámina de metal que solo decía PIZZA.",
          "Dara miró sus cuatro resúmenes. Mantenimiento percusivo del horno. Expectativas base. Una huella digital fotografiada. Trascendente.",
          "Borró trascendente. Tecleó supera estándares. Borró eso. Tecleó trascendente de nuevo.",
          "Cerró la tableta. La abrió. La cerró.",
          "El ascensor llegó al Piso 2 y las puertas se abrieron y el aire que entró era fresco y delgado y olía a metal y pensó en Boz. En el horno soldado. En la pizza que era plana y pálida y alimentaba a cuarenta personas que se comerían la caja si la caja supiera mejor.",
          "Pensó en Alvaro. En el horno de barro que había pasado años curando. En los tomates que eran rojos de una manera que nunca había visto rojo antes.",
          "El mismo nombre en ambas puertas. El mismo logo. La misma empresa, en papel. Y entre ellos, setenta y cuatro mil pisos de diferencia que ningún manual de marca cerraría jamás.",
          "Tecleó una línea final al fondo de su reporte:",
          "Laszlo’s no tiene un problema de calidad. El Hotel sí. La pizza es exactamente tan buena como el piso en el que está. La marca es consistente. El edificio no.",
          "Envió el reporte. Nadie lo leería. Nunca lo hacían.",
          "Tomó el ascensor a los Pisos de Strategy y fue a casa y pidió una pizza de Laszlo’s a su unidad y cuando llegó estaba bien. Genuinamente bien. La corteza tenía estructura. La salsa sabía como si los tomates hubieran estado involucrados.",
          "Se la comió en su escritorio con la tableta cerrada y la credencial colgando del gancho junto a la puerta y pensó en la palabra trascendente y cómo nunca había tenido una razón para teclearla antes y probablemente nunca la tendría de nuevo.",
          "La pizza estaba bien. Todo en los Pisos de Strategy estaba bien.",
          "Quería la del Piso 74,200.",
        ],
      },
    },
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
  const [lang, setLang] = useState("en");
  useEffect(() => { setTimeout(() => setV(true), 50); window.scrollTo(0, 0); }, []);
  const hasTranslations = tale.translations && Object.keys(tale.translations).length > 0;
  const langs = hasTranslations ? ["en", ...Object.keys(tale.translations)] : ["en"];
  const langLabels = { en: "EN", es: "ES", pt: "PT", ja: "JA", fr: "FR", de: "DE", zh: "ZH", ko: "KO", ar: "AR" };
  const t = lang === "en" ? tale : tale.translations[lang];
  const content = lang === "en" ? tale.content : t.content;
  const title = lang === "en" ? tale.title : (t.title || tale.title);
  const dedication = lang === "en" ? tale.dedication : (t.dedication || tale.dedication);
  const endnote = lang === "en" ? tale.endnote : (t.endnote || tale.endnote);
  const endnoteCloser = lang === "en" ? tale.endnoteCloser : (t.endnoteCloser || tale.endnoteCloser);
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
          <h1 style={{ fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 6px", lineHeight: 1.1 }}>{title}</h1>
          {dedication && (
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", fontFamily: "'Georgia',serif", fontStyle: "italic", margin: "8px 0 0" }}>{dedication}</p>
          )}
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.4)", fontFamily: "'Georgia',serif", fontStyle: "italic", margin: "8px 0 16px" }}>{tale.subtitle}</p>
          {hasTranslations && (
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12 }}>
              {langs.map(l => (
                <button key={l} onClick={() => { setLang(l); window.scrollTo(0, 0); }} style={{
                  background: lang === l ? ORANGE : "rgba(255,255,255,.06)",
                  border: lang === l ? "1px solid " + ORANGE : "1px solid rgba(255,255,255,.1)",
                  borderRadius: 4, color: lang === l ? DARK : "rgba(255,255,255,.4)",
                  padding: "5px 12px", cursor: "pointer", fontSize: 11, fontWeight: 700,
                  fontFamily: "monospace", letterSpacing: ".08em", transition: "all .2s ease",
                }}>{langLabels[l] || l.toUpperCase()}</button>
              ))}
            </div>
          )}
          <div style={{ fontSize: 16, color: ORANGE, opacity: 0.4 }}>─── ₿ ───</div>
        </div>
        <div>
          {content.map((para, i) => {
            if (para === "---") return (
              <div key={i} style={{ textAlign: "center", margin: "32px 0", fontSize: 16, color: ORANGE, opacity: 0.3 }}>─── ₿ ───</div>
            );
            const isShortDialogue = para.startsWith("\u201C") || para.startsWith("\u300C") || (para.startsWith('"') && para.length < 80);
            const isShort = isShortDialogue && para.length < 80;
            return (
              <p key={i} style={{
                fontSize: 16, color: "rgba(255,255,255,.75)", fontFamily: "'Georgia',serif",
                lineHeight: 1.85, margin: isShort ? "0 0 8px" : "0 0 20px",
                textIndent: isShort ? 0 : 24,
              }}>{para}</p>
            );
          })}
        </div>
        {endnote && (
          <>
            <div style={{ textAlign: "center", marginTop: 48, marginBottom: 24 }}>
              <div style={{ fontSize: 16, color: ORANGE, opacity: 0.3 }}>─── ₿ ───</div>
            </div>
            <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 12px" }}>
              {endnote.split("\n\n").map((block, i) => (
                <p key={i} style={{ fontSize: 13, color: "rgba(255,255,255,.45)", fontFamily: "'Georgia',serif", fontStyle: "italic", lineHeight: 1.7, margin: "0 0 12px", textAlign: "center" }}>{block}</p>
              ))}
              {endnoteCloser && (
                <p style={{ fontSize: 13, color: ORANGE, fontFamily: "'Georgia',serif", fontStyle: "italic", lineHeight: 1.7, margin: "16px 0 0", textAlign: "center", opacity: .7 }}>{endnoteCloser}</p>
              )}
            </div>
          </>
        )}
        {!endnote && (
          <div style={{ textAlign: "center", marginTop: 48, marginBottom: 32 }}>
            <div style={{ fontSize: 16, color: ORANGE, opacity: 0.3 }}>─── ₿ ───</div>
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: endnote ? 32 : 0 }}>
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
