export type Text = string;
export type Tokenized_Text = string[];

let real_words : string []= []; 
export function redact_all_text(input:string):string{
    real_words = input.split(" ");
    return input.replace(/\S/g, "*");
}

const display = redact_all_text("jorden är platt hej ");
console.log(display);




/**
 * Normilizes a text by taking away uppercase letters, accents,
 * @param t: Text Takes in a string of some kind
 * @returns the same text but with no large letters,
 */
export function normalize_text(t: Text): Text{
    return t
    .toLowerCase() // Makes each letter lowercase
    .normalize("NFD") // Splits accents from letters                
    .replace(/[\u0300-\u036f]/g, "")  // Removes the accents
    .replace(/[^a-z0-9\s-]/g, "")   // Removes Punctuations
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


