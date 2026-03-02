import { country_texts, song_title } from "./Texts.js";
import { Prompt } from "prompt-sync";
import * as readline from "readline";
export type Text = string;
export type Tokenized_Text = string[];


const prompt = require('prompt-sync')({ sigint: true}) // Used to handle Inputs

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
    return tokenize_text(input.replace(/[^.\s]/g, "*"));
}

/**
 * Takes in a guess a text and a redacted text and unredacts that guess in the redacted text
 * @example find_words("Öster", ["mitt", "öster"], ["****", "*****"])
 * results in ["****", "öster"]
 * @param guess, is a string, 
 * @param text is an array with strings
 * @param redacted_text_tokenized an array with strings
 * @precondition This function requiered a redacted_text_tokenized that has the same ammount of words and placing as the text, 
 * will othervise return false
 * @returns Returns false if no changes were made to redacted_text_tokenized 
 * and returns the redacted text if changes were made.
 */
export function find_words(guess: string, text: string[], redacted_text_tokenized: string[]): string[] | boolean {
   
   let ok = false
   const l = text.length;
   const normalized_guess = normalize_text(guess);
   // Kollar igenom texten och hittar ordet
   for(let i = 0; i < l; i = i + 1) {
       
       const word_no_punctuation = text[i].replace(/[.]/g, "");
       
       if (normalized_guess === word_no_punctuation) {
           redacted_text_tokenized[i] = text[i]
           ok = true
       }
   }
   
   if (ok === false) {
    return ok;
   } else {
    return redacted_text_tokenized;
   }
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
function already_guessed(guesses: string[], guess: string): boolean {

    for (let i = 0; i < guesses.length; i++){
        if (guesses[i] === guess) {
            console.log("Already guessed, guess again: ")
            return true;
        }
    }
    guesses.push(guess)
    return false;
}


// Skall användas senare när vi får flera actions
function point_set(points: number, action: number): Number {
    //remove points
    if (action === 2) {
        return points
    }
    else (action === 1)
        points = (points - 5)
        return points
}

function meny(){
    while(true){
        console.log("\n 1. Play \n 2. Exit")
        const input1 = prompt("Choose from menu:  ");
        
        if(input1 === "1"){
            console.log("\n Category: \n 1. Countrys \n 2. Artist \n 3. Football teams \n 4. Go back  ")
            const input2 = prompt("Choose Category: ");
            if(input2 === "1"){
                // Här startar land gissa
                gameplay_loop(country_texts);

            } 
            if(input2 ==="2"){
                // Här startar artist gissningen
                gameplay_loop(song_title);
            }
            else{
                continue;}
            
        }
        if(input1 === "2"){
            console.log("Lämnat spelet");
            break;
        }
        // Kanske måste fixa denna
        if(input1 > 3){
            console.log("Invalid input try again: ")
        }
    
    }

    // else
        
    
}
// Generates a random text from the desired kategory
function generate_random_text(Kategory: string[][]){
        const length = Kategory.length;
        const n = Math.floor(Math.random() * length);
        return Kategory[n]
    }

// Våran gameplay loop. Denna kör spelet
function gameplay_loop(kategory: string[][]) {
    // Interface menu
    
    //start points
    let points = 100
    // Our array of guesses
    let guesses: string[] = [];
    // Our array with correct guess and text
    const our_array = generate_random_text(kategory);
    const correct_answer = normalize_text(our_array[0]); 
    const text = our_array[1];
    const text_redacted_tokenized = redact_all_text_tokenized(text);
    const text_tokenized = tokenize_text(text);
    let answer = false

    //Takes away common words so they are not redacted at the start
    find_words(normalize_text("and"), text_tokenized, text_redacted_tokenized)
    find_words(normalize_text("the"), text_tokenized, text_redacted_tokenized)

    while(points > 0){
        console.log("points", points)
        console.log("Redacted text:");
        console.log(text_redacted_tokenized.join(" "));

        const input = prompt("Guess a word (or type quit): ");
        
        const normalized_input = normalize_text(input);


        const updated = find_words(normalized_input, text_tokenized, text_redacted_tokenized);

        if (normalized_input === "quit") {
            console.log("Game ended.");
            return;
        }

        if (normalized_input === correct_answer){
            console.log("You guessed correct, with a score of:", points)
            return; 
        }

        if (already_guessed(guesses, normalized_input)){
            console.log("Already guessed")
            continue;
        }

        if (updated === false) {
            console.log("Wrong answer, guess again :(")
            points = points - 5;
            continue;
        }


        
        
    }
}


meny();