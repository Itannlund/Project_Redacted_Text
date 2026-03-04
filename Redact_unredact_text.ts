import { country_texts, song_title, type text_save} from "./Texts.js";

import { diff } from "util";
export type Text = string;
export type Tokenized_Text = string[];
export type Player = {
    points: number;
    name: string };


export let points_board: Player[] = [];

const prompt = require('prompt-sync')({ sigint: true}) // Used to handle Inputs
const regular_words: string[] = ["the", "in", "a", "and", "have", "to", "be", "can", "i", "you", "do", "at", "as", "gona"]

/**
 * Normalizes a text by taking away uppercase letters, accents doubble spaces etc.
 * @example normalize_text("Hej Mitt    naMn är Öster")
 * results in "hej mitt namn ar oster"
 * @param t: Text Takes in a string.
 * @returns The same text but normalized, (see comments in function for exact description)
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
 * @precondition
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
 * Takes in a string and transforms all letters to * while keeping the structure and dots
 * @example: redact_all_text("hello my name is öster")
 * results in "***** ** **** ** *****"
 * @param t: A text of some kind
 * @returns Returns the text transformed into a redacted state
 */
export function redact_all_text(input: Text):string{
    return input.replace(/[^.\s.]/g, "*");
}

/**
 * Takes in a string and transforms all letters to * and tokenizes them, they keep the same structure and dots
 * @example: redact_all_text("hello my name is öster")
 * results in ["*****"", "**", "****", "**" "*****"]
 * @param t: A text of some kind
 * @returns Returns the text transformed into a redacted state
 */
export function redact_all_text_tokenized(input: Text): string[]{
    return tokenize_text(input.replace(/[^.,'-\s]/g, "*"));
}

/**
 * Takes in a guess a text and a redacted text and unredacts that guess in the redacted text
 * @example find_words("Öster", ["mitt", "oster"], ["****", "*****"])
 * results in ["****", "oster"]
 * @param guess, is a string, 
 * @param text is an array with strings
 * @param redacted_text_tokenized an array with strings
 * @precondition This function requiered a redacted_text_tokenized that has the same ammount of words and placing as the text, 
 * will othervise return false
 * @returns Returns false if no changes were made to redacted_text_tokenized 
 * and returns the redacted text if changes were made.
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

export function letters_spaces(text: string): { letters: Number; spaces: Number } {
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


// Skall användas senare när vi får flera actions

export function point_set(points: number, action: number, value: number): number {
    //remove points
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




export function leaderboard(name: string, newPoints: number): Player[] {
    points_board.push({name, points: newPoints});
    points_board.sort((a,b) =>b.points -a.points);
    return points_board;
}



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

    
        
    

// Generates a random text from the desired kategory
export function generate_random_text(Kategory: text_save[]): text_save{
        const length = Kategory.length;
        const n = Math.floor(Math.random() * length);
        return Kategory[n];
    }
export function game_rules(): void {
    console.log(`_______________________________________________________________________________\n
                Welcome to our game redacted, here are the rules!!!\n
                1. The player will get a redacted text from a choosen category
                2. The player will start with 100 points and your goal is to unredact 
                   as many words as you can by typing them in the terminal.
                3. For each word you guess correctly you gain 10 points and for each word 
                   you guess incorrectly you lose 10 points.
                4. To win the player needs to guess the current topic for their selected 
                   category, correct guess for current topic gains double points.\n`);
        const input_leave = prompt("If you wish to continue press any button: ")
        return;
}

