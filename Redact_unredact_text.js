"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize_text = normalize_text;
exports.tokenize_text = tokenize_text;
exports.redact_all_text = redact_all_text;
exports.redact_all_text_tokenized = redact_all_text_tokenized;
exports.find_words = find_words;
exports.already_guessed = already_guessed;
exports.letters_spaces = letters_spaces;
exports.hints = hints;
exports.point_set = point_set;
exports.leaderboard = leaderboard;
exports.meny = meny;
exports.helper_set_difficulty = helper_set_difficulty;
exports.generate_random_text = generate_random_text;
exports.game_rules = game_rules;
exports.gameplay_loop = gameplay_loop;
var Texts_js_1 = require("./Texts.js");
var prompt = require('prompt-sync')({ sigint: true }); // Used to handle Inputs
var regular_words = ["the", "in", "a", "and", "have", "to", "be", "can", "i", "you", "do", "at", "as", "gona"];
/**
 * Normalizes a text by taking away uppercase letters, accents doubble spaces etc.
 * @example normalize_text("Hej Mitt    naMn är Öster")
 * results in "hej mitt namn ar oster"
 * @param t: Text Takes in a string.
 * @returns The same text but normalized, (see comments in function for exact description of each method)
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
function letters_spaces(text) {
    var letters = 0;
    var spaces = 0;
    for (var i = 0; i < text.length; i = i + 1) {
        var ch = text.charAt(i);
        if (/[a-zA-Z]/.test(ch)) {
            letters++;
        }
        if (ch === " ") {
            spaces++;
        }
    }
    return { letters: letters, spaces: spaces };
}
function hints(text, item, index) {
    console.log("\n 1. How many letters and spaces in titel (costs 15 points) \n 2. Specific hint about country (costs 20 points) \n 3. No hint needed");
    var input = prompt("Choose what type of hint: ");
    if (input === "1") {
        var result = letters_spaces(text);
        console.log("_______________________________________________________________________________");
        console.log("The titel has", result.letters, "letters and", result.spaces, "spaces");
        console.log(" ");
        return true;
    }
    if (input === "2") {
        if (!item.hints || item.hints.length === 0) {
            return false;
        }
        if (index >= item.hints.length) {
            console.log("_______________________________________________________________________________");
            console.log("No more hints :(");
            return false;
        }
        else {
            console.log("_______________________________________________________________________________");
            console.log("Hint: ", item.hints[index]);
            console.log(" ");
            return index + 1;
        }
    }
    if (input === "3") {
        return false;
    }
    else {
        console.log("Invalid input");
        return hints(text, item, index);
    }
}
// Skall användas senare när vi får flera actions
function point_set(points, action, value) {
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
var points_board = [];
function leaderboard(name, newPoints) {
    points_board.push({ name: name, points: newPoints });
    points_board.sort(function (a, b) { return b.points - a.points; });
    return points_board;
}
function meny() {
    while (true) {
        console.log("\n 1. Play \n \n 2. Rules \n \n 3. Exit \n");
        var input1 = prompt("Choose from menu:  ");
        if (input1 === "1") {
            console.log("\n \n Category: \n \n 1. Countrys \n \n 2. Artist \n \n 3. Go back \n \n 4. Leaderboard \n  ");
            var input2 = prompt("Choose Category: ");
            if (input2 === "1") {
                var dif = helper_set_difficulty();
                if (dif === "4") {
                    continue;
                }
                // Här startar land gissa
                gameplay_loop(Texts_js_1.country_texts, dif);
            }
            if (input2 === "2") {
                var dif = helper_set_difficulty();
                if (dif === "4") {
                    continue;
                }
                // Här startar artist gissningen
                gameplay_loop(Texts_js_1.song_title, dif);
            }
            if (input2 === "4") {
                console.log("Här är det en leaderboard. Här kommer de med mest poäng att hamna på en lista. ");
                console.log("----------LEADERBOARD----------");
                points_board.forEach(function (player, index) {
                    console.log("".concat(index + 1, ". ").concat(player.name, " - ").concat(player.points, " po\u00E4ng"));
                });
            }
            else {
                continue;
            }
        }
        else if (input1 === "2") {
            game_rules();
            continue;
        }
        else if (input1 === "3") {
            console.log("Lämnat spelet");
            break;
        }
        else {
            console.log("Invalid input try again:");
        }
    }
}
function helper_set_difficulty() {
    while (true) {
        console.log("\n \n 1. Easy \n \n 2. Medium \n \n 3. Hard \n \n 4. Go back \n \n");
        var input_dif = prompt("Which difficulty would you like? ");
        if (input_dif === "1" || input_dif === "2" || input_dif === "3" || input_dif === "4") {
            return input_dif;
        }
        console.log("Invalid difficulty, try again.");
    }
}
// Generates a random text from the desired kategory
function generate_random_text(Kategory) {
    var length = Kategory.length;
    var n = Math.floor(Math.random() * length);
    return Kategory[n];
}
function game_rules() {
    console.log("_______________________________________________________________________________\n\n                Welcome to our game redacted, here are the rules!!!\n\n                1. The player will get a redacted text from a choosen category\n                2. The player will start with a certain amount of points and your goal is to unredact \n                   as many words as you can by typing them in the terminal.\n                3. For each word you guess correctly you gain points and for each word \n                   you guess incorrectly you lose points.\n                4. To win the player needs to guess the current topic for their selected \n                   category, correct guess for current topic gains double points.\n");
    var input_leave = prompt("If you wish to continue press any button: ");
    return;
}
/**
 * Takes in a katergory and a difficulty, then starts the game loop runnings trought our game with prompts.
 * @example gameplay_loop(country_texts[0], easy) => plays the game with the first text in country_texts and difficulty easy.
 * @param kategory: text_save[] takes in the type text_save which is an
 * @param difficulty
 * @returns
 */
function gameplay_loop(kategory, difficulty) {
    console.log("________________________________________________________________________________\n\n                    Welcome to the game Redacted!!!");
    // Our array of guesses
    var guesses = [];
    // Our array with correct guess and text
    var our_array = generate_random_text(kategory);
    var correct_answer = normalize_text(our_array.answer);
    var text = our_array.text;
    var text_redacted_tokenized = redact_all_text_tokenized(text);
    var text_tokenized = tokenize_text(text);
    var answer = false;
    var points = 100;
    var wrong_guess = 10;
    var correct_guess = 20;
    var hint_index = 0;
    // Gör så några vanligt förekommande ord inte är redacted
    regular_words.forEach(function (value) { find_words(normalize_text(value), text_tokenized, text_redacted_tokenized); });
    function set_easy_difficulty() {
        points = 50;
        correct_guess = 10;
        //Takes away common words so they are not redacted at the start
        our_array.easy.forEach(function (value) { find_words(normalize_text(value), text_tokenized, text_redacted_tokenized); });
    }
    function set_medium_difficulty() {
        //Takes away common words so they are not redacted at the start
        our_array.medium.forEach(function (value) { find_words(normalize_text(value), text_tokenized, text_redacted_tokenized); });
    }
    function set_hard_difficulty() {
        points = 150;
        wrong_guess = 15;
        correct_guess = 30;
        our_array.hard.forEach(function (value) { find_words(normalize_text(value), text_tokenized, text_redacted_tokenized); });
        //Takes away common words so they are not redacted at the start
    }
    if (difficulty === "1") {
        set_easy_difficulty();
    }
    ;
    if (difficulty === "2") {
        set_medium_difficulty();
    }
    ;
    if (difficulty === "3") {
        set_hard_difficulty();
    }
    ;
    while (points > 0) {
        console.log("Points:", points);
        console.log("\nRedacted text:");
        console.log("Already guessed words:", guesses, "\n ");
        console.log(text_redacted_tokenized.join(" "));
        var input = prompt("Guess a word (or type quit/hint): ");
        var normalized_input = normalize_text(input);
        var updated = find_words(normalized_input, text_tokenized, text_redacted_tokenized);
        if (normalized_input === "quit") {
            console.log("______________________________________________________________________________\n\n                        Game ended!");
            var name_1 = prompt("Enter name for leaderboard: ");
            leaderboard(name_1, points);
            return;
        }
        if (normalized_input === "hint") {
            var result = hints(correct_answer, our_array, hint_index);
            if (result === true) {
                points = point_set(points, 1, 15);
                continue;
            }
            if (result === false) {
                continue;
            }
            if (typeof result === "number") {
                hint_index = result;
                points = point_set(points, 1, 20);
                continue;
            }
        }
        if (normalized_input === correct_answer) {
            points = point_set(points, 3, 2);
            console.log("_______________________________________________________________________________\n \n                        You guessed correct!!!!! \n \n                        With a score of:", points, "points");
            // Om man vill se texten när personen vinner ser konstigt ut i terminalen dock
            // console.log(text);
            var name_2 = prompt("Enter name for leaderboard: ");
            leaderboard(name_2, points);
            return;
        }
        if (already_guessed(guesses, normalized_input)) {
            console.log("______________________________________________________________________________\n\n                        You have already guessed that word");
            continue;
        }
        if (updated === false) {
            console.log("_______________________________________________________________________________\n\n                        Word does not exist try again");
            points = point_set(points, 1, wrong_guess);
            continue;
        }
        if (updated === true) {
            console.log("_______________________________________________________________________________\n\n                        Great job, you gained", correct_guess, " points!");
            points = point_set(points, 2, correct_guess);
            continue;
        }
    }
}
meny();
