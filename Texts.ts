
export type text_save = {
    answer: string; // Rätt svar till spelet
    text: string; // Våran text till spelet
    easy: string[] // Alla ord som inte ska redacteras för easy
    medium: string[] // Alla ord som inte ska redacteras för medium
    hard: string[]  // Alla ord som inte ska redacteras för hard
};
export const country_texts: text_save [] = [
    {
    answer: "sweden", 
    text: "Sweden,[f] formally the Kingdom of Sweden,[g][h] is a Nordic country located on the Scandinavian Peninsula in Northern Europe. It borders Norway to the west and north, and Finland to the east, and shares a maritime border with Denmark to the south. At 450,295 square kilometres (173,860 sq mi),[4] Sweden is the largest Nordic country by both area and population, and is the fifth-largest country in Europe. Its capital and largest city is Stockholm. Sweden has a population of 10.6 million, and a low population density of 25.5 inhabitants per square kilometre (66/sq mi); 88% of Swedes reside in urban areas.[11] They are mostly in the central and southern half of the country. Swedens urban areas together cover 1.5% of its land area. Sweden has a diverse climate owing to the length of the country, which ranges from 55°N to 69°N.",
    easy: ["Kingdom", "Nordic"],
    medium: [],
    hard: []
    },
    {
    answer: "germany", 
    text: "Germany,[d] officially the Federal Republic of Germany,[e] is a country in Western and Central Europe. It lies between the Baltic Sea and the North Sea to the north with the Alps to the south. Its sixteen constituent states have a total population of over 82 million, making it the most populous member state of the European Union. Germany borders Denmark to the north; Poland and the Czech Republic to the east; Austria and Switzerland to the south; and France, Luxembourg, Belgium, and the Netherlands to the west. The nation's capital and most populous city is Berlin and its main financial centre is Frankfurt; the largest urban area is the Ruhr.",
    easy: ["Republic", "Europe", "Baltic"],
    medium: [],
    hard: []
},
{
    answer: "norway", 
    text: "Norway,[a] officially the Kingdom of Norway,[b] is a Nordic country comprising the western and northernmost parts of the Scandinavian Peninsula in Northern Europe, the remote Arctic island Jan Mayen and the archipelago Svalbard.[note 5] Bouvet Island, located in the Subantarctic, is a dependency, and not a part of the Kingdom; Norway also claims the Antarctic territories of Peter I Island and Queen Maud Land. Norway has a population of approximately 5.6 million, and a total area of 385,207 square kilometres (148,729 sq mi).[10] Its capital and largest city is Oslo. The country shares a long eastern border with Sweden, and is bordered by Finland and Russia to the northeast. Norway has an extensive coastline facing the Skagerrak strait, the North Sea, the Norwegian Sea, and the Barents Sea.",
    easy: ["Kingdom", "Nordic", "western"],
    medium: [],
    hard: []

},

{   
    answer: "spain", 
    text: "Spain,[g] officially the Kingdom of Spain,[h] is a country in Southern and Western Europe with territories in North Africa.[i] Featuring the southernmost point of continental Europe, it is the largest country in Southern Europe and the fourth-most populous European Union (EU) member state. Spanning the majority of the Iberian Peninsula, its territory also includes the Canary Islands, in the Eastern Atlantic Ocean; the Balearic Islands, in the Western Mediterranean Sea; and the autonomous cities of Ceuta and Melilla, in mainland Africa. Peninsular Spain is bordered to the north by France, Andorra, and the Bay of Biscay; to the east and south by the Mediterranean Sea and Gibraltar; and to the west by Portugal and the Atlantic Ocean. Spain's capital and largest city is Madrid; other major urban areas include Barcelona, Valencia, Seville, Zaragoza, Málaga, Murcia, and Palma de Mallorca.",
    easy: [],
    medium: ["Kingdom", "Africa", "southernmost", "continental"],
    hard: []
},

{   answer: "italy", 
    text: "Italy,[a] officially the Italian Republic,[b] is a country in Southern and Western Europe.[c] It consists of a peninsula that extends into the Mediterranean Sea, with the Alps on its northern land border, as well as nearly 800 islands, notably Sicily and Sardinia. Italy shares land borders with France to the west; Switzerland and Austria to the north; Slovenia to the east; and the two enclaves of Vatican City and San Marino. It is the tenth-largest country in Europe by area, covering 301,340 km2 (116,350 sq mi), and the third-most populous member state of the European Union, with nearly 59 million inhabitants. Italy's capital and largest city is Rome; other major cities include Milan, Naples, Turin, Palermo, Bologna, Florence, Genoa, and Venice.",
    easy: [],
    medium: ["Republic","Southern", "Mediterranean", "800", "islands"],
    hard: []
},
]



export const song_title: text_save [] = [ 
    {
    answer: "shake it off",  
    
    text: `I stay out too late Got nothin' in my brain That's what people say, 
    mm-mm That's what people say, mm-mm I go on too many dates (Haha) But I can't make them stay
    At least, that's what people say, mm-mm
    That's what people say, mm-mm
    But I keep cruisin'
    Can't stop, won't stop movin'
    It's like I got this music in my mind
    Sayin', "It's gonna be alright"
    'Cause the players gonna play, play, play, play, play
    And the haters gonna hate, hate, hate, hate, hate
    Baby, I'm just gonna shake, shake, shake, shake, shake
    I shake it off, I shake it off
    Heartbreakers gonna break, break, break, break, break
    And the fakers gonna fake, fake, fake, fake, fake
    Baby, I'm just gonna shake, shake, shake, shake, shake
    I shake it off, I shake it off' 
    
    I never miss a beat
    I'm lightnin' on my feet
    And that's what they don't see, mm-mm
    That's what they don't see, mm-mm
    I'm dancin' on my own (Dancin' on my own)
    I make the moves up as I go (Moves up as I go)
    And that's what they don't know, mm-mm
    That's what they don't know, mm-mm


    But I keep cruisin'
    Can't stop, won't stop groovin'
    It's like I got this music in my mind
    Sayin', "It's gonna be alright"

    'Cause the players gonna play, play, play, play, play
    And the haters gonna hate, hate, hate, hate, hate
    Baby, I'm just gonna shake, shake, shake, shake, shake
    I shake it off, I shake it off
    Heartbreakers gonna break, break, break, break, break
    And the fakers gonna fake, fake, fake, fake, fake
    Baby, I'm just gonna shake, shake, shake, shake, shake
    I shake it off, I shake it off [Post-Chorus]
    I shake it off, I shake it off
    I, I, I shake it off, I shake it off
    I, I, I shake it off, I shake it off
    I, I, I shake it off, I shake it off

    Hey, hey, hey
    Just think, while you've been gettin' down and out about the liars
    And the dirty, dirty cheats of the world
    You could've been gettin' down
    To this sick beat

    My ex-man brought his new girlfriend
    She's like, "Oh my God," but I'm just gonna shake
    And to the fella over there with the hella good hair
    Won't you come on over, baby? We can shake, shake, shake
    Yeah, oh-oh, oh

    'Cause the players gonna play, play, play, play, play
    And the haters gonna hate, hate, hate, hate, hate (Haters gonna hate)
    Baby, I'm just gonna shake, shake, shake, shake, shake
    I shake it off, I shake it off (Ha)
    Heartbreakers gonna break, break, break, break, break (Mmm)
    And the fakers gonna fake, fake, fake, fake, fake (They fake and fake and fake)`,
    easy: ["off", "it", "people", "gonna", "players", "haters", "shake", "music", "dates"],
    medium: ["brain", "cruisin'", "music"],
    hard: []
},
    {
    answer: "lay all your love on me", 
    text: `I wasn't jealous before we met
    Now every woman I see is a potential threat
    And I'm possessive, it isn't nice
    You've heard me saying that smoking was my only vice

    But now it isn't true
    Now everything is new
    And all I've learned has overturned
    I beg of you

    Don't go wasting your emotion
    Lay all your love on me

    It was like shooting a sitting duck
    A little small talk, a smile, and baby, I was stuck
    I still don't know what you've done with me
    A grown-up woman should never fall so easily

    I feel a kind of fear
    When I don't have you near
    Unsatisfied, I skip my pride
    I beg you, dear [Chorus]
    Don't go wasting your emotion
    Lay all your love on me
    Don't go sharing your devotion
    Lay all your love on me

    [Verse 3]
    I've had a few little love affairs
    They didn't last very long and they've been pretty scarce
    I used to think that was sensible
    It makes the truth even more incomprehensible

    'Cause everything is new
    And everything is you
    And all I've learned has overturned
    What can I do?

    Don't go wasting your emotion
    Lay all your love on me
    Don't go sharing your devotion
    Lay all your love on me
    Don't go wasting your emotion
    Lay all your love on me
    Don't go sharing your devotion
    Lay all your love on me
    Don't go wasting your emotion
    Lay all your love on me`,
    easy: ["Lay", "fear", "all", "baby", "smile", "sitting", "everything", "jealous", "emotion", "love" ],
    medium: ["duck", "baby", "jealous", "fear", "emotion" ],
    hard: []
    },
    {
        answer: "boulevard of Broken Dreams",
        text:  `I walk a lonely road
                The only one that I have ever known
                Don't know where it goes
                But it's home to me, and I walk alone
                I walk this empty street
                On the Boulevard of Broken Dreams
                Where the city sleeps
                And I'm the only one, and I walk alone
                I walk alone, I walk alone
                I walk alone, I walk a-
                My shadow's the only one that walks beside me
                My shallow heart's the only thing that's beating
                Sometimes, I wish someone out there will find me
                'Til then, I walk alone
                Ah-ah, ah-ah, ah-ah, ah-ah
                Ah-ah, ah-ah, ah-ah
                I'm walking down the line
                That divides me somewhere in my mind
                On the borderline
                Of the edge, and where I walk alone
                Read between the lines
                What's fucked up, and everything's alright
                Check my vital signs
                To know I'm still alive, and I walk alone
                I walk alone, I walk alone
                I walk alone, I walk a-
                My shadow's the only one that walks beside me
                My shallow heart's the only thing that's beating
                Sometimes, I wish someone out there will find me
                'Til then, I walk alone
                Ah-ah, ah-ah, ah-ah, ah-ah
                Ah-ah, ah-ah, I walk alone, I walk a-
                I walk this empty street
                On the Boulevard of Broken Dreams
                Where the city sleeps
                And I'm the only one, and I walk a-
                My shadow's the only one that walks beside me
                My shallow heart's the only thing that's beating
                Sometimes, I wish someone out there will find me
                'Til then, I walk alone` ,
        easy: ["boulevard", "dreams", "lonely", "shadow", "street"],
        medium: ["alone", "walking", "empty" ],
        hard: [],
        
    },
    {
        answer: "beat it",
        text:  `They told him, "Don't you ever come around here
        Don't want to see your face, you better disappear"
        The fire's in their eyes and their words are really clear
        So beat it, just beat it
        You better run, you better do what you can
        Don't want to see no blood, don't be a macho man
        You want to be tough, better do what you can
        So beat it, but you want to be bad
        Just beat it, beat it, beat it, beat it
        No one wants to be defeated
        Showin' how funky and strong is your fight
        It doesn't matter who's wrong or right
        Just beat it, beat it
        Just beat it, beat it
        Just beat it, beat it
        Just beat it, beat it (ooh)
        They're out to get you, better leave while you can
        Don't want to be a boy, you want to be a man
        You want to stay alive, better do what you can
        So beat it, just beat it (ooh)
        You have to show them that you're really not scared
        You're playin' with your life, this ain't no truth or dare
        They'll kick you, then they beat you
        Then they'll tell you it's fair
        So beat it, but you want to be bad
        Just beat it, beat it, beat it, beat it
        No one wants to be defeated
        Showin' how funky and strong is your fight
        It doesn't matter who's wrong or right
        Just beat it, beat it, beat it, beat it
        No one wants to be defeated
        Showin' how funky and strong is your fight
        It doesn't matter who's wrong or right
        Just beat it, beat it, beat it, beat it
        Beat it, beat it, beat it
        Beat it, beat it, beat it
        Beat it, beat it, beat it
        Beat it, beat it, beat it
        Beat it, beat it, beat it, beat it
        No one wants to be defeated
        Showin' how funky and strong is your fight
        It doesn't matter who's wrong or right
        Just beat it, beat it
        Beat it, beat it
        No one wants to be defeated
        Showin' how funky and strong is your fight
        It doesn't matter who's wrong or right
        Just beat it, beat it, beat it, beat it
        No one wants to be defeated
        Showin' how funky and strong is your fight
        It doesn't matter who's wrong or right
        Just beat it, beat it, beat it, beat it
        No one wants to be defeated
        Showin' how funky and strong is your fight
        It doesn't matter who's wrong or right
        Just beat it, beat it
        Beat it, beat it `,
        easy: ["beat", "fight", "strong", "wrong", "fire"],
        medium: ["tough", "scared", "blood"],
        hard: [],
        
    },
    {
        answer: "im still standing",
        text:  `You could never know what it's like
                Your blood like winter freezes just like ice
                And there's a cold lonely light that shines from you
                You'll wind up like the wreck you hide behind that mask you use
                And did you think this fool could never win?
                Well, look at me, I'm coming back again
                I got a taste of love in a simple way
                And if you need to know while I'm still standing, you just fade away
                Don't you know I'm still standing better than I ever did
                Looking like a true survivor, feeling like a little kid
                I'm still standing after all this time
                Picking up the pieces of my life without you on my mind
                I'm still standing (yeah, yeah, yeah)
                I'm still standing (yeah, yeah, yeah)
                Once I never could have hoped to win
                You're starting down the road leaving me again
                The threats you made were meant to cut me down
                And if our love was just a circus, you'd be a clown by now
                You know I'm still standing better than I ever did
                Looking like a true survivor, feeling like a little kid
                I'm still standing after all this time
                Picking up the pieces of my life without you on my mind
                I'm still standing (yeah, yeah, yeah)
                I'm still standing (yeah, yeah, yeah)
                Don't you know that I'm still standing better than I ever did?
                Looking like a true survivor, feeling like a little kid
                I'm still standing after all this time
                Picking up the pieces of my life without you on my mind
                I'm still standing (yeah, yeah, yeah)
                I'm still standing (yeah, yeah, yeah)` ,
        easy: ["standing", "survivin'", "piece", "life", "fadin'"],
        medium: ["once", "down", "sad"],
        hard: [],
        
    }
]

