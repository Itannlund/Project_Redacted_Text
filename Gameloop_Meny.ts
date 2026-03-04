import {    normalize_text, 
            tokenize_text, 
            redact_all_text, 
            redact_all_text_tokenized, 
            find_words, 
            letters_spaces,
            generate_random_text,
            hints,
            already_guessed,
            leaderboard,
            game_rules,
            helper_set_difficulty,
            points_board,
            type Player,
            point_set

            } from "./Redact_unredact_text";
import {country_texts, song_title, type text_save} from "./Texts";
const prompt = require('prompt-sync')({ sigint: true}) // Used to handle Inputs
const regular_words: string[] = ["the", "in", "a", "and", "have", "to", "be", "can", "i", "you", "do", "at", "as", "gona"]


export function meny(){
    while(true){
        console.log("\n 1. Play \n \n 2. Rules \n \n 3. Exit \n")
        const input1 = prompt("Choose from menu:  ");
        
        if(input1 === "1"){
            console.log("\n \n Category: \n \n 1. Countrys \n \n 2. Artist \n \n 3. Go back \n \n 4. Leaderboard \n  ")
            const input2 = prompt("Choose Category: ");
            
            if(input2 === "1"){
                const dif = helper_set_difficulty();
                    if(dif === "4"){
                        continue;
                    }
                    // Här startar land gissa
                    gameplay_loop(country_texts, dif);
                
                
            } 
            if (input2 ==="2"){
                const dif = helper_set_difficulty();
                if(dif === "4"){
                    continue;
                }
                    // Här startar artist gissningen
                    gameplay_loop(song_title, dif);
            }
            if(input2 ==="4"){
                console.log("Här är det en leaderboard. Här kommer de med mest poäng att hamna på en lista. ");
                console.log("----------LEADERBOARD----------");
                points_board.forEach((player, index) => {
                    console.log(`${index + 1}. ${player.name} - ${player.points} poäng`)
                })
            }
            else {
                continue;
            }
        
        }
        
        else if(input1 === "2"){
            game_rules();
            continue;
        }
        
        else if(input1 === "3"){
            console.log("Lämnat spelet");
            break;
        }
        
        else {
            console.log("Invalid input try again:")
        }
    }
    
}

// Våran gameplay loop. Denna kör spelet
export function gameplay_loop(kategory: text_save[], difficulty: string) {
    console.log(`________________________________________________________________________________\n
                    Welcome to the game Redacted!!!`)

    
    
    // Our array of guesses
    let guesses: string[] = [];
    // Our array with correct guess and text
    const our_array = generate_random_text(kategory);
    const correct_answer = normalize_text(our_array.answer); 
    const text = our_array.text;
    const text_redacted_tokenized = redact_all_text_tokenized(text);
    const text_tokenized = tokenize_text(text);
    let answer = false
    let points = 100;
    let wrong_guess = 10;
    let correct_guess = 20;
    let hint_index = 0;
    // Gör så några vanligt förekommande ord inte är redacted
    regular_words.forEach((value) => {find_words(normalize_text(value), text_tokenized, text_redacted_tokenized)})
    
    function set_easy_difficulty(): void{
        points = 50;
        correct_guess = 10;
        //Takes away common words so they are not redacted at the start
        our_array.easy.forEach((value) => {find_words(normalize_text(value), text_tokenized, text_redacted_tokenized)})
    }
     function set_medium_difficulty(): void{
        //Takes away common words so they are not redacted at the start
        our_array.medium.forEach((value) => {find_words(normalize_text(value), text_tokenized, text_redacted_tokenized)})
    }
     function set_hard_difficulty(): void{
        points = 150;
        wrong_guess = 15;
        correct_guess = 30;
        //Takes away common words so they are not redacted at the start
        
        
    }
    
    if(difficulty === "1"){set_easy_difficulty()};
    if(difficulty === "2"){set_medium_difficulty()};
    if(difficulty === "3"){set_hard_difficulty()};        
    
    while(points > 0){
        console.log("Points:", points); 
        console.log("\nRedacted text:");
        console.log("Type hint for a hint")
        console.log("Already guessed words:", guesses, "\n ");
        console.log(text_redacted_tokenized.join(" "));

        const input = prompt("Guess a word (or type quit): ");
        
        const normalized_input = normalize_text(input);


        const updated = find_words(normalized_input, text_tokenized, text_redacted_tokenized);

        if (normalized_input === "quit") {
            console.log(`______________________________________________________________________________\n
                        Game ended!`);
            const name = prompt("Enter name for leaderboard: ")
            leaderboard(name, points);
            return;
        }

        if (normalized_input === "hint") {
            const result = hints(correct_answer, our_array, hint_index)
            if (result === true) {
                points = point_set(points, 1, 15);
                continue;
            }
            if (result === false) {
                continue; 
            } 
            if (typeof result === "number") {
                hint_index = result as number;
                points = point_set(points, 1, 20);
                continue; }
        }

        if (normalized_input === correct_answer){
            points = point_set(points, 3, 2)
            console.log(`_______________________________________________________________________________\n 
                        You guessed correct!!!!! \n 
                        With a score of:`, points, "points")
            // Om man vill se texten när personen vinner ser konstigt ut i terminalen dock
            // console.log(text);
            const name = prompt("Enter name for leaderboard: ")
            leaderboard(name, points);
            return; 
        }

        if (already_guessed(guesses, normalized_input)){
            console.log(`______________________________________________________________________________\n
                        You have already guessed that word`)
            continue;
        }

        if (updated === false) {
            console.log(`_______________________________________________________________________________\n
                        Word does not exist try again`)
            points = point_set(points, 1, wrong_guess);
            continue;
        }
        if (updated === true){
            console.log(`_______________________________________________________________________________\n
                        Great job, you gained`, correct_guess,` points!`)
            points = point_set(points, 2, correct_guess);
            continue;

        }
    }
}

meny();