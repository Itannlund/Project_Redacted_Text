
export type text_save = {
    answer: string; // Rätt svar till spelet
    text: string; // Våran text till spelet
    easy: string[] // Alla ord som inte ska redacteras för easy
    medium: string[] // Alla ord som inte ska redacteras för medium
    hard: string[]  // Alla ord som inte ska redacteras för hard
    hints: string[] // Alla hints
};
export const country_texts: text_save [] = [
    {
    answer: "sweden", 
    text: ` Sweden is a country in Northern Europe and part of the Nordic region. It is one of the larger countries in Europe by area, but it has a relatively small population compared to its size. The landscape includes forests, thousands of lakes, long coastlines, and mountain areas in the north. The country borders Norway and Finland and has a long coastline along the Baltic Sea.
            Sweden is a constitutional monarchy and a parliamentary democracy. Its capital is Stockholm, a city built across several islands. The country is known for its high standard of living, extensive welfare system, and strong focus on education and equality. Its economy is based on industry, technology, trade, and innovation. Several internationally known companies have their origins there.
            The climate varies from colder conditions in the north to milder weather in the south. Nature and outdoor life are important parts of the culture, and public access to the countryside is a well-known tradition.`,
    easy: ["Kingdom", "Nordic", "northern", "democracy", "small", "climate"],
    medium: [],
    hard: [],
    hints: ["social welfare", "Nobel prize", "ABBA"]
    },
    {
    answer: "germany", 
    text: `Germany is a country in Central Europe and one of the most populous nations on the continent. It shares borders with several countries, including France, Poland, Austria, and the Netherlands. The landscape is varied, with rivers, forests, mountain ranges, and broad plains. Different regions of the country have their own cultural traditions, dialects, and historical identities.
            Germany is a federal parliamentary republic made up of sixteen states. Its capital is Berlin, which is also the largest city. The country is known for its strong economy, advanced industry, and major role in European politics. It is especially recognized for engineering, manufacturing, science, and transportation. Many globally known companies in the automotive, chemical, and technology sectors are based there.
            The country has a rich cultural history in music, philosophy, literature, and architecture. It is also known for castles, historic cities, and seasonal festivals. The climate is generally temperate, with warm summers and cool winters. Germany combines modern urban life with deep historical roots, making it an influential country both in Europe and globally.`,
    
    easy: ["Republic", "Europe", "Baltic", "architecture", "historic","climate", "largest"],
    medium: [],
    hard: [],
    hints: ["engineering hub", "16 federal states", "oktoberfest" ]
},
{
    answer: "australia", 
    text: ` Australia is a country in the Southern Hemisphere and is both a nation and a continent. It is surrounded by the Indian and Pacific Oceans and is known for its large size and relatively low population density. Much of the interior is dry or semi-arid, while the coastal areas contain most of the population. The landscape includes deserts, tropical forests, mountain ranges, and long stretches of coastline.
            Australia is a federal parliamentary democracy and a constitutional monarchy made up of states and territories. Its capital is Canberra, while Sydney and Melbourne are among its largest and best-known cities. The country is known for its high quality of life, multicultural society, and strong economy. Important industries include mining, agriculture, tourism, education, and services.
            Australia is also famous for its unique wildlife, with many animal species found nowhere else in the world. The climate varies widely, from tropical conditions in the north to more temperate regions in the south. Outdoor life plays a major role in the culture, and the country is often associated with beaches, sports, and wide open spaces.` ,
    easy: ["Kingdom", "Nordic", "western", "parliamentary", "many", "species", "climate", "tropical", "culture","beaches"],
    medium: [],
    hard: [],
    hints: ["native wildlife", "big nation", "outback interior"]

},

{   
    answer: "england", 
    text: `England is a country in northwestern Europe and is part of the United Kingdom. It occupies the southern and central portion of the island of Great Britain and is bordered by Scotland to the north and Wales to the west. The landscape includes rolling hills, plains, forests, and a long coastline, with many towns and cities shaped by centuries of history.
            England is not a sovereign state on its own, but it is the largest and most populous country within the United Kingdom. Its capital is London, one of the world’s most influential cities in finance, culture, and politics. The country is known for its historic institutions, including a constitutional monarchy and parliamentary system that have influenced many other nations. Its economy is diverse, with major strengths in finance, education, technology, media, and services.
            England has had a major impact on global history through literature, science, industry, and exploration. It is associated with many well-known traditions, historic landmarks, and cultural symbols. The climate is generally temperate, with mild winters and cool summers. England combines deep historical roots with modern urban life, making it one of the most recognized countries in the world.`,
    easy: [],
    medium: ["Kingdom", "Africa", "southernmost", "continental","well-known", "historic", "science", "temperate", "major"],
    hard: [],
    hints: ["Shakespear", "premiere league", "big ben"]
},

{   answer: "china", 
    text: `China is a country in East Asia and one of the largest and most populous nations in the world. It has a wide variety of landscapes, including mountains, deserts, plateaus, rivers, and fertile plains. The country shares borders with many others, and its size has contributed to a long history of regional diversity in culture, language, and tradition.
            China is governed as a single-party socialist state, and its capital is Beijing. Other major cities include Shanghai, Guangzhou, and Shenzhen, which are important centers of trade, finance, and industry. The country has one of the world’s largest economies and is known for manufacturing, technology, infrastructure, and global trade. It plays a major role in international politics and economic affairs.
            China has one of the oldest continuous civilizations in the world and is known for major historical achievements in philosophy, science, art, and engineering. It is associated with famous landmarks, long-standing cultural traditions, and a rich culinary heritage. The climate varies greatly across the country, from cold northern winters to subtropical conditions in the south. China combines ancient history with rapid modernization, making it one of the most influential countries in the world.`,
    easy: [],
    medium: ["Republic","Southern", "Mediterranean", "800", "islands"],
    hard: [],
    hints: ["Ancient", "Great wall", "single-party state"]
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
    hard: [],
    hints: ["pop", "2014", "Taylor swift"]
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
    hard: [],
    hints: ["Disco love", "swedish pop", "1980"]
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
        hints: ["lonely city walk", "2004", "green day"]
        
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
        hints: ["avoid the fight", "1980", "jackson"]
        
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
        hints: ["Resilient", "1983", "Elton"]
        
    }
]

