import { country_texts } from "./Texts_Countries.js";
import * as readline from "readline";
export type Text = string;
export type Tokenized_Text = string[];


const prompt = require('prompt-sync')({ sigint: true}) // Used to handle Inputs
/**
 * Normilizes a text by taking away uppercase letters, accents,
 * @param t: Text Takes in a string of some kind
 * @returns the same text but with no large letters,
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
 * Normilizes a text by taking away uppercase letters, accents,
 * @param t: Text Takes in a string of some kind
 * @returns A text where each word in that text is a token.
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

// Så att det är detta som skrivs ut
export function redact_all_text(input: Text):string{
    
    return input.replace(/[^.\s.]/g, "*");
}

export function redact_all_text_tokenized(input: Text): string[]{
    
    return tokenize_text(input.replace(/[^.\s]/g, "*"));
}

export function find_words(guess: string, text: string[], redacted_text_tokenized: string[]): string[] | boolean {
   
   let ok = false
   const l = text.length;
   // Kollar igenom texten och hittar ordet
   for(let i = 0; i < l; i = i + 1) {
       const normalized_guess = normalize_text(guess); 
       if (normalized_guess === text[i]) {
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

// Funktion för få prompts
function ask(question: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

// Generates a random text from countries
function generate_random_text(){
    const length = country_texts.length;
    const n = Math.floor(Math.random() * length);
    return country_texts[n]
}



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



function point_set(points: number, action: number): Number {
    //remove points
    if (action === 2) {
        return points
    }
    else (action === 1)
        points = (points - 5)
        return points
}


// Våran gameplay loop. Denna kör spelet
async function gameplay_loop() {
    // Interface menu
   
    //start points
    let points = 100
    // Our array of guesses
    let guesses: string[] = [];
    // Our array with correct guess and text
    const our_array = generate_random_text();
    const correct_answer = normalize_text(our_array[0]); 
    const text = our_array[1];
    const text_redacted_tokenized = redact_all_text_tokenized(text);
    const text_tokenized = tokenize_text(text);
    let answer = false


    while(points > 0){
        console.log("points", points)
        console.log("Redacted text:");
        find_words(normalize_text("and"), text_tokenized, text_redacted_tokenized)
        find_words(normalize_text("the"), text_tokenized, text_redacted_tokenized)
        console.log(text_redacted_tokenized.join(" "));

        const input = await ask("Guess a word (or type quit): ");
        
        const normalized_input = normalize_text(input);


        const updated = find_words(normalized_input, text_tokenized, text_redacted_tokenized);

        if (normalized_input === "quit") {
            console.log("Game ended.");
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


        if (normalized_input === correct_answer){
            console.log("You guessed correct, with a score of:", points)
            return; 
        }
        
    }
}

gameplay_loop();