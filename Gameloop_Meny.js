"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meny = meny;
exports.gameplay_loop = gameplay_loop;
var Redact_unredact_text_1 = require("./Redact_unredact_text");
var Texts_1 = require("./Texts");
var prompt = require('prompt-sync')({ sigint: true }); // Used to handle Inputs
var regular_words = ["the", "in", "a", "and", "have", "to", "be", "can", "i", "you", "do", "at", "as", "gona"];
function meny() {
    while (true) {
        console.log("\n 1. Play \n \n 2. Rules \n \n 3. Exit \n");
        var input1 = prompt("Choose from menu:  ");
        if (input1 === "1") {
            console.log("\n \n Category: \n \n 1. Countrys \n \n 2. Artist \n \n 3. Go back \n \n 4. Leaderboard \n  ");
            var input2 = prompt("Choose Category: ");
            if (input2 === "1") {
                var dif = (0, Redact_unredact_text_1.helper_set_difficulty)();
                if (dif === "4") {
                    continue;
                }
                // Här startar land gissa
                gameplay_loop(Texts_1.country_texts, dif);
            }
            if (input2 === "2") {
                var dif = (0, Redact_unredact_text_1.helper_set_difficulty)();
                if (dif === "4") {
                    continue;
                }
                // Här startar artist gissningen
                gameplay_loop(Texts_1.song_title, dif);
            }
            if (input2 === "4") {
                console.log("Här är det en leaderboard. Här kommer de med mest poäng att hamna på en lista. ");
                console.log("----------LEADERBOARD----------");
                Redact_unredact_text_1.points_board.forEach(function (player, index) {
                    console.log("".concat(index + 1, ". ").concat(player.name, " - ").concat(player.points, " po\u00E4ng"));
                });
            }
            else {
                continue;
            }
        }
        else if (input1 === "2") {
            (0, Redact_unredact_text_1.game_rules)();
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
// Våran gameplay loop. Denna kör spelet
function gameplay_loop(kategory, difficulty) {
    console.log("________________________________________________________________________________\n\n                    Welcome to the game Redacted!!!");
    // Our array of guesses
    var guesses = [];
    // Our array with correct guess and text
    var our_array = (0, Redact_unredact_text_1.generate_random_text)(kategory);
    var correct_answer = (0, Redact_unredact_text_1.normalize_text)(our_array.answer);
    var text = our_array.text;
    var text_redacted_tokenized = (0, Redact_unredact_text_1.redact_all_text_tokenized)(text);
    var text_tokenized = (0, Redact_unredact_text_1.tokenize_text)(text);
    var answer = false;
    var points = 100;
    var wrong_guess = 10;
    var correct_guess = 20;
    var hint_index = 0;
    // Gör så några vanligt förekommande ord inte är redacted
    regular_words.forEach(function (value) { (0, Redact_unredact_text_1.find_words)((0, Redact_unredact_text_1.normalize_text)(value), text_tokenized, text_redacted_tokenized); });
    function set_easy_difficulty() {
        points = 50;
        correct_guess = 10;
        //Takes away common words so they are not redacted at the start
        our_array.easy.forEach(function (value) { (0, Redact_unredact_text_1.find_words)((0, Redact_unredact_text_1.normalize_text)(value), text_tokenized, text_redacted_tokenized); });
    }
    function set_medium_difficulty() {
        //Takes away common words so they are not redacted at the start
        our_array.medium.forEach(function (value) { (0, Redact_unredact_text_1.find_words)((0, Redact_unredact_text_1.normalize_text)(value), text_tokenized, text_redacted_tokenized); });
    }
    function set_hard_difficulty() {
        points = 150;
        wrong_guess = 15;
        correct_guess = 30;
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
        console.log("Type hint for a hint");
        console.log("Already guessed words:", guesses, "\n ");
        console.log(text_redacted_tokenized.join(" "));
        var input = prompt("Guess a word (or type quit): ");
        var normalized_input = (0, Redact_unredact_text_1.normalize_text)(input);
        var updated = (0, Redact_unredact_text_1.find_words)(normalized_input, text_tokenized, text_redacted_tokenized);
        if (normalized_input === "quit") {
            console.log("______________________________________________________________________________\n\n                        Game ended!");
            var name_1 = prompt("Enter name for leaderboard: ");
            (0, Redact_unredact_text_1.leaderboard)(name_1, points);
            return;
        }
        if (normalized_input === "hint") {
            var result = (0, Redact_unredact_text_1.hints)(correct_answer, our_array, hint_index);
            if (result === true) {
                points = (0, Redact_unredact_text_1.point_set)(points, 1, 15);
                continue;
            }
            if (result === false) {
                continue;
            }
            if (typeof result === "number") {
                hint_index = result;
                points = (0, Redact_unredact_text_1.point_set)(points, 1, 20);
                continue;
            }
        }
        if (normalized_input === correct_answer) {
            points = (0, Redact_unredact_text_1.point_set)(points, 3, 2);
            console.log("_______________________________________________________________________________\n \n                        You guessed correct!!!!! \n \n                        With a score of:", points, "points");
            // Om man vill se texten när personen vinner ser konstigt ut i terminalen dock
            // console.log(text);
            var name_2 = prompt("Enter name for leaderboard: ");
            (0, Redact_unredact_text_1.leaderboard)(name_2, points);
            return;
        }
        if ((0, Redact_unredact_text_1.already_guessed)(guesses, normalized_input)) {
            console.log("______________________________________________________________________________\n\n                        You have already guessed that word");
            continue;
        }
        if (updated === false) {
            console.log("_______________________________________________________________________________\n\n                        Word does not exist try again");
            points = (0, Redact_unredact_text_1.point_set)(points, 1, wrong_guess);
            continue;
        }
        if (updated === true) {
            console.log("_______________________________________________________________________________\n\n                        Great job, you gained", correct_guess, " points!");
            points = (0, Redact_unredact_text_1.point_set)(points, 2, correct_guess);
            continue;
        }
    }
}
meny();
