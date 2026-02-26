import { country_texts } from "./Texts_Countries";
import * as readline from "readline";
export type Text = string;
export type Tokenized_Text = string[];



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
    .replace(/[^a-z0-9\s-*]/g, "")   // Removes Punctuations
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
    
    return input.replace(/\S/g, "*");
}

export function redact_all_text_tokenized(input: Text): string[]{
    
    return tokenize_text(input.replace(/\S/g, "*"));
}

export function find_words(guess: string, text: string[], redacted_text_tokenized: string[]): string[] {
   
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
   return redacted_text_tokenized;
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



function point_set(points: number): number | null {
    const newPoints = points - 5;

    if (newPoints <= 0) {
        console.log("You ran out of points :(");
        return null;
    }

    return newPoints;
}


// Våran gameplay loop. Denna kör spelet
async function gameplay_loop() {
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


    while(true){
    console.log("Redacted text:");
    console.log(text_redacted_tokenized.join(" "));

    const input = await ask("Guess a word (or type quit): ");
    const normalized_input = normalize_text(input);
    if (normalized_input === "quit") {
        console.log("Game ended.");
        return;
    }
    if (already_guessed(guesses, normalized_input)){
        continue;
    }

    const newPoints = point_set(points);
    if (newPoints === null) {return;}
    points = newPoints;
    
    if (normalized_input === correct_answer){
        console.log("You guessed correct, with a score of:", newPoints)
        return; 
    }
    
    const updated = find_words(normalized_input, text_tokenized, text_redacted_tokenized);

    console.log("Points", newPoints);
}
}

gameplay_loop();