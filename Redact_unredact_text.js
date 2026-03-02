"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize_text = normalize_text;
exports.tokenize_text = tokenize_text;
exports.redact_all_text = redact_all_text;
exports.redact_all_text_tokenized = redact_all_text_tokenized;
exports.find_words = find_words;
var Texts_js_1 = require("./Texts.js");
var prompt = require('prompt-sync')({ sigint: true }); // Used to handle Inputs
/**
 * Normalizes a text by taking away uppercase letters, accents doubble spaces etc.
 * @example normalize_text("Hej Mitt    naMn är Öster")
 * results in "hej mitt namn ar oster"
 * @param t: Text Takes in a string.
 * @returns The same text but normalized, (see comments in function for exact description)
 */
// Kan fixas så att * tas bort
function normalize_text(t) {
    return t
        .toLowerCase() // Makes each letter lowercase
        .normalize("NFD") // Splits accents from letters                
        .replace(/[\u0300-\u036f]/g, "") // Removes the accents
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
function tokenize_text(t) {
    var tokens = []; // Our token Array
    var norm_text = normalize_text(t); // The text normalized(no Punktuation, bigg letters)
    var l = norm_text.length;
    var current_token = "";
    // Pushar ett ord när vi når mellanrum
    for (var i = 0; i < l; i++) {
        var current_letter = norm_text.charAt(i);
        if (current_letter === " ") {
            if (current_token.length > 0) {
                tokens.push(current_token);
                current_token = "";
            }
        }
        else {
            // No space => add the letter to current token
            current_token = current_token + current_letter;
        }
    }
    //Pushar sista ordet i våran string
    if (current_token.length > 0) {
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
function redact_all_text(input) {
    return input.replace(/[^.\s.]/g, "*");
}
/**
 * Takes in a string and transforms all letters to * and tokenizes them, they keep the same structure and dots
 * @example: redact_all_text("hello my name is öster")
 * results in ["*****"", "**", "****", "**" "*****"]
 * @param t: A text of some kind
 * @returns Returns the text transformed into a redacted state
 */
function redact_all_text_tokenized(input) {
    return tokenize_text(input.replace(/[^.,'-\s]/g, "*"));
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
function find_words(guess, text, redacted_text_tokenized) {
    var ok = false;
    var l = text.length;
    var normalized_guess = normalize_text(guess);
    // Kollar igenom texten och hittar ordet
    for (var i = 0; i < l; i = i + 1) {
        var word_no_punctuation = text[i].replace(/[.,!?;:()"'`-]/g, "");
        if (normalized_guess === word_no_punctuation) {
            redacted_text_tokenized[i] = text[i];
            ok = true;
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
function already_guessed(guesses, guess) {
    for (var i = 0; i < guesses.length; i++) {
        if (guesses[i] === guess) {
            console.log("Already guessed, guess again: ");
            return true;
        }
    }
    guesses.push(guess);
    return false;
}
// Skall användas senare när vi får flera actions
function point_set(points, action) {
    //remove points
    if (action === 2) {
        return points;
    }
    else
        (action === 1);
    points = (points - 5);
    return points;
}
function meny() {
    while (true) {
        console.log("\n 1. Play \n 2. Rules \n 3. Exit");
        var input1 = prompt("Choose from menu:  ");
        if (input1 === "1") {
            console.log("\n Category: \n 1. Countrys \n 2. Artist \n 3. Football teams \n 4. Go back  ");
            var input2 = prompt("Choose Category: ");
            if (input2 === "1") {
                // Här startar land gissa
                gameplay_loop(Texts_js_1.country_texts);
            }
            if (input2 === "2") {
                // Här startar artist gissningen
                gameplay_loop(Texts_js_1.song_title);
            }
            else {
                continue;
            }
        }
        if (input1 === "2") {
            game_rules();
            continue;
        }
        if (input1 === "3") {
            console.log("Lämnat spelet");
            break;
        }
        else {
            console.log("Invalid input try again:");
        }
    }
}
// Generates a random text from the desired kategory
function generate_random_text(Kategory) {
    var length = Kategory.length;
    var n = Math.floor(Math.random() * length);
    return Kategory[n];
}
function game_rules() {
    console.log("_______________________________________________________________________________\n\n                Welcome to our game redacted, here are the rules!!!\n\n                1. The player will get a redacted text from a choosen category\n                2. The player will start with 100 points and your goal is to unredact \n                   as many words as you can by typing them in the terminal.\n                3. For each word you guess correctly you gain 10 points and for each word \n                   you guess incorrectly you lose 10 points.\n                4. To win the player needs to guess the current topic for their selected \n                   category, correct guess for current topic gains double points.");
    var input_leave = prompt("If you wish to continue press any button: ");
    return;
}
// Våran gameplay loop. Denna kör spelet
function gameplay_loop(kategory) {
    console.log("________________________________________________________________________________\n\n                    Welcome to the game Redacted!!!");
    //start points
    var points = 100;
    // Our array of guesses
    var guesses = [];
    // Our array with correct guess and text
    var our_array = generate_random_text(kategory);
    var correct_answer = normalize_text(our_array[0]);
    var text = our_array[1];
    var text_redacted_tokenized = redact_all_text_tokenized(text);
    var text_tokenized = tokenize_text(text);
    var answer = false;
    //Takes away common words so they are not redacted at the start
    find_words(normalize_text("and"), text_tokenized, text_redacted_tokenized);
    find_words(normalize_text("the"), text_tokenized, text_redacted_tokenized);
    while (points > 0) {
        console.log("Points:", points);
        console.log("Redacted text:");
        console.log("Already guessed words:", guesses);
        console.log(text_redacted_tokenized.join(" "));
        var input = prompt("Guess a word (or type quit): ");
        var normalized_input = normalize_text(input);
        var updated = find_words(normalized_input, text_tokenized, text_redacted_tokenized);
        if (normalized_input === "quit") {
            console.log("______________________________________________________________________________\n\n                        Game ended!");
            return;
        }
        if (normalized_input === correct_answer) {
            points = points * 2;
            console.log("_______________________________________________________________________________\n \n                        You guessed correct!!!!! \n \n                        With a score of:", points, "points");
            // Om man vill se texten när personen vinner ser konstigt ut i terminalen dock
            // console.log(text);
            return;
        }
        if (already_guessed(guesses, normalized_input)) {
            console.log("______________________________________________________________________________\n\n                        You have already guessed that word");
            continue;
        }
        if (updated === false) {
            console.log("_______________________________________________________________________________\n\n                        Word does not exist try again");
            points = points - 10;
            continue;
        }
        if (updated === true) {
            console.log("_______________________________________________________________________________\n\n                        Great job, you gained 5 points!");
            points = points + 10;
            continue;
        }
    }
}
meny();
