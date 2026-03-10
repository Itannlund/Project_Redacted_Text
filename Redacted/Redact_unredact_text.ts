import { country_texts, song_title, type text_save} from "./Texts.js";

import { diff } from "util";
export type Text = string;
export type Tokenized_Text = string[];

export type Player = {
    points: number;
    name: string };

const prompt = require('prompt-sync')({ sigint: true}) // Used to handle Inputs
const regular_words: string[] = ["the", "in", "a", "and", "have", "to", "be", "can", "i", "you", "do", "at", "as", "gona"]

/**
 * Normalizes a text by taking away uppercase letters, accents doubble spaces etc.
 * @example normalize_text("Hej Mitt    naMn är Öster")
 * results in "hej mitt namn ar oster"
 * @param t: Text Takes in a string.
 * @returns The same text but normalized, (see comments in function for exact description of each method)
 */
// Kan fixas så att * tas bort
export function normalize_text(t: Text): Text{
    return t
    .toLowerCase() // Makes each letter lowercase
    .normalize("NFD") // Splits accents from letters                
    .replace(/[\u0300-\u036f]/g, "")  // Removes the accents
    .replace(/\s+/g, " ") // Makes double spaces, Tabs to one space " "
    .trim(); // Takes away spaces at the start and end
}


/**
 * Takes in a text and normalizes and tokenizes it to an array with multiple strings inside
 * @example tokenize_text("Hej mitt namn är Öster")
 * results in ["hej", "mitt", "namn", "ar", "oster"]
 * @param t: Text is a string
 * @precondition t is a string
 * @returns the same text but where each space between words creates a token until next space
 */

export function tokenize_text(t: Text): Tokenized_Text{
   
    const tokens: Tokenized_Text = []; // Our token Array
    const norm_text = normalize_text(t); // The text normalized(no Punktuation, bigg letters)
    const l = norm_text.length;
   
    let current_token = "";
    // Pushar ett ord när vi når mellanrum
    for(let i = 0; i < l; i++){
        const current_letter = norm_text.charAt(i);


        if(current_letter === " "){
            if(current_token.length > 0){
                tokens.push(current_token);
                current_token = "";
            }


        } else {
            // No space => add the letter to current token
            current_token = current_token + current_letter;
        }
    }
        //Pushar sista ordet i våran string
        if (current_token.length > 0){
            tokens.push(current_token);
        }
   
    return tokens;
}

/**
 * Takes in a string and transforms all letters to * while keeping spaces and punctuation
 * @example: redact_all_text("hello my name is öster")
 * results in "***** ** **** ** *****"
 * @param t: A text of some kind
 * @returns Returns the text transformed into a redacted state
 */
export function redact_all_text(input: Text):string{
    return input.replace(/[^.\s.]/g, "*");
}

/**
 * Takes in a string and transforms all letters to * and tokenizes them, they keep spaces and punctuation
 * @example: redact_all_text("hello my name is öster")
 * results in ["*****"", "**", "****", "**" "*****"]
 * @param t: A text of some kind
 * @returns Returns the text transformed into a redacted state
 */
export function redact_all_text_tokenized(input: Text): string[]{
    return tokenize_text(input.replace(/[^.,'-\s]/g, "*"));
}

/**
 * Takes in a guess, a text, and a redacted text and unredacts that guess in the redacted text
 * @example find_words("Öster", ["mitt", "oster"], ["****", "*****"])
 * results in ["****", "oster"]
 * @param guess, is a string, 
 * @param text is an array with strings
 * @param redacted_text_tokenized an array with strings
 * @precondition text and redacted_text_tokenized must have the same length and positioning for words
 * @returns Returns true if atleast one word was revealed othervise returns false
 */
export function find_words(guess: string, text: string[], redacted_text_tokenized: string[]): boolean {
   
   let ok = false
   const l = text.length;
   const normalized_guess = normalize_text(guess);
   // Kollar igenom texten och hittar ordet
   for(let i = 0; i < l; i = i + 1) {
       
       const word_no_punctuation = text[i].replace(/[.,!?;:()"'`-]/g, "");
       
       if (normalized_guess === word_no_punctuation) {
           redacted_text_tokenized[i] = text[i]
           ok = true
       }
   }
   
   return ok;
}

/**
 * Takes in an array with guesses and a guess, it then adds the guess if it was not prevously in the array and returns false,
 * othervise returns true
 * @example: already_guessed(["hej", "mor"], "mor")
 * results in "Already guessed, guess again: " then returns true
 * @param guesses is an array with strings
 * @param guess is a string
 * @returns Returns true if not changes were made to guesses and false if changes where made.
 * @sideeffect prints information in terminal
 */
export function already_guessed(guesses: string[], guess: string): boolean {

    for (let i = 0; i < guesses.length; i++){
        if (guesses[i] === guess) {
            console.log("Already guessed, guess again: ")
            return true;
        }
    }
    guesses.push(guess)
    return false;
}

/**
 * Takes a string and counts how many letters and spaces exists and returns it in a record
 * with the correct counted numbers
 * @example letters_spaces("hello world") returns {letters: 10; spaces: 1}
 * @param text is a string without numbers
 * @returns Returns a record that stores the number and spaces for the string
 */
export function letters_spaces(text: string): { letters: number; spaces: number } {
    let letters = 0;
    let spaces = 0;

    for (let i = 0; i < text.length; i = i + 1) {
        const ch = text.charAt(i);

        if (/[a-zA-Z]/.test(ch)) {
            letters++;
        }
        if (ch === " ") {
            spaces++;
        } 
    }
    return {letters, spaces}
}

/**
 * Allows player to request hint during the game.
 * The player can choose between 2 diffrent hints, letters and spaces or specific hint
 * @param text the correct answer of the current word
 * @param item the object containing the hints for the current text
 * @param index containing the current hint indec for specific hints
 * 
 * @returns true if option 1 was picked, false if no hint was used,
 * number for the next hint index incase specific hint was used
 * @sideeffect prints information in terminal
 */
export function hints(text: string, item: text_save, index: number): boolean | number {
    console.log("\n 1. How many letters and spaces in titel (costs 15 points) \n 2. Specific hint about country (costs 20 points) \n 3. No hint needed")
    const input = prompt("Choose what type of hint: ")
    
    if (input === "1") {
        const result = letters_spaces(text)
        console.log("_______________________________________________________________________________")
        console.log("The titel has", result.letters, "letters and", result.spaces, "spaces")
        console.log(" ");
        return true;
    }
    if (input === "2") {
        if (!item.hints || item.hints.length === 0) {
            return false;
        }
        if (index >= item.hints.length) {
            console.log("_______________________________________________________________________________")
            console.log("No more hints :(");
            return false;
        } else {
            console.log("_______________________________________________________________________________")
            console.log("Hint: ", item.hints[index])
            console.log(" ")
            return index + 1;
        }
    }
    if (input === "3") {
        return false;
    } else {console.log("Invalid input")
        return hints(text, item, index)
    }
}

/**
 * modifies points depending on action and returns the new points
 * @example: point_set(100, 2, 10) returns 110
 * @param Points is a positive number
 * @param Action is a number
 * @param Value is a number
 * @returns Returns the modified points unless action is something else than 1, 2 ,3 
 * which will cause the return to be the original points
 */
export function point_set(points: number, action: number, value: number): number {
    if (action === 1) {
        return points - value;
    }
    if (action === 2) {
        return points + value;
    }
    if (action === 3) {
        return points * value;
    }
    return points;
}





let points_board: Player[] = [];
/**
 * Takes a name and a score and turns it into a record that is sorted depenting on newPoints value
 * and returns a points board
 * @example: leaderboard("test1", 100) and leaderboard("test2", 60) which returns [{"test1", 200},
 * {"test2", 60}]
 * @param name is a string
 * @param newPoints is a positive number
 * @returns Returns an sorted array of records which saves the names and points
 */
export function leaderboard(name: string, newPoints: number): Player[] {
    points_board.push({name, points: newPoints});
    points_board.sort((a,b) =>b.points -a.points);
    return points_board;
}


/**
 * Displays the main menu and handles user navigation.
 * The function prompts the user to choose between staring, rules, exit,
 * categories and leaderboard
 * The function runs in a loop till the player selects the exit option
 * @returns void
 * @sideeffects 
 * Prints menu options in terminal
 * reads user input
 * may start game or show leaderboard
 */
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

/**
 * Uses input from the user in the function to decide if a valid result has been typed
 * @returns Returns string incase of a valid input(1-4) else a while loop repeats till valid
 * input
 * @sideeffect 
 * Prints options in terminal
 * Prints information in terminal
 */
export function helper_set_difficulty(): string {
    while (true) {
        console.log("\n \n 1. Easy \n \n 2. Medium \n \n 3. Hard \n \n 4. Go back \n \n");
        const input_dif = prompt("Which difficulty would you like? ");

        if (input_dif === "1" || input_dif === "2" || input_dif === "3" || input_dif === "4") {
            return input_dif;
        }

        console.log("Invalid difficulty, try again.");
    }
}


/**
 * generates a random text for the gameloop from the Katergory
 * @param Kategory is an array that has records in it sorted as country or artist
 * @returns Returns a random text from the correct object
 */
export function generate_random_text(Kategory: text_save[]): text_save{
        const length = Kategory.length;
        const n = Math.floor(Math.random() * length);
        return Kategory[n];
}

/**
 * Displays in the terminal the game rules, takes no arguments
 * @returns returns void
 * @sideeffect Prints rules in terminal
 */
export function game_rules(): void {
    console.log(`_______________________________________________________________________________\n
                Welcome to our game redacted, here are the rules!!!\n
                1. The player will get a redacted text from a choosen category
                2. The player will start with a certain amount of points and your goal is to unredact 
                   as many words as you can by typing them in the terminal.
                3. For each word you guess correctly you gain points and for each word 
                   you guess incorrectly you lose points.
                4. To win the player needs to guess the current topic for their selected 
                   category, correct guess for current topic gains double points.\n`);
        const input_leave = prompt("If you wish to continue press any button: ")
        return;
}

/**
 * Takes in a katergory and a difficulty, then starts the game loop runnings trought our game with prompts.
 * @example gameplay_loop(country_texts[0], easy) => plays the game with the first text in country_texts and difficulty easy.
 * @param kategory: text_save[] takes in the type text_save which is an array with objects inside 
 * @param difficulty is a string
 * @precondiction function needs a text_save[] file which is an array including objects: answer, text, easy, medium, hard, hints.
 * @returns void
 * @sideeffect displays the game in the terminal
 */
export function gameplay_loop(kategory: text_save[], difficulty: string) : void {
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
        our_array.hard.forEach((value) => {find_words(normalize_text(value), text_tokenized, text_redacted_tokenized)})
        //Takes away common words so they are not redacted at the start
    }
    
    if(difficulty === "1"){set_easy_difficulty()};
    if(difficulty === "2"){set_medium_difficulty()};
    if(difficulty === "3"){set_hard_difficulty()};        
    
    while(points > 0){
        console.log("Points:", points); 
        console.log("\nRedacted text:");
        console.log("Already guessed words:", guesses, "\n ");
        console.log(text_redacted_tokenized.join(" "));

        const input = prompt("Guess a word (or type quit/hint): ");
        
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
