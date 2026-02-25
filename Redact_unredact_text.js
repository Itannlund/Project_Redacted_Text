"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize_text = normalize_text;
exports.tokenize_text = tokenize_text;
exports.redact_all_text = redact_all_text;
exports.redact_all_text_tokenized = redact_all_text_tokenized;
exports.find_words = find_words;
/**
 * Normilizes a text by taking away uppercase letters, accents,
 * @param t: Text Takes in a string of some kind
 * @returns the same text but with no large letters,
 */
// Kan fixas så att * tas bort
function normalize_text(t) {
    return t
        .toLowerCase() // Makes each letter lowercase
        .normalize("NFD") // Splits accents from letters                
        .replace(/[\u0300-\u036f]/g, "") // Removes the accents
        .replace(/[^a-z0-9\s-*]/g, "") // Removes Punctuations
        .replace(/\s+/g, " ") // Makes double spaces, Tabs to one space " "
        .trim(); // Takes away spaces at the start and end
}
/**
 * Normilizes a text by taking away uppercase letters, accents,
 * @param t: Text Takes in a string of some kind
 * @returns A text where each word in that text is a token.
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
// Så att det är detta som skrivs ut
function redact_all_text(input) {
    return input.replace(/\S/g, "*");
}
function redact_all_text_tokenized(input) {
    return tokenize_text(input.replace(/\S/g, "*"));
}
function find_words(guess, text, redacted_text_tokenized) {
    var ok = false;
    var l = text.length;
    // Kollar igenom texten och hittar ordet
    for (var i = 0; i < l; i = i + 1) {
        var normalized_guess = normalize_text(guess);
        if (normalized_guess === text[i]) {
            redacted_text_tokenized[i] = text[i];
            ok = true;
        }
    }
    return redacted_text_tokenized;
}
// addat från internet för att få en 
function askQuestion(rl, question) {
    return new Promise(function (resolve) {
        rl.question(question, function (answer) { return resolve(answer); });
    });
}
function gameplay_loop() {
    // Börjar med att skriva ut texten redacted
    // Vi sätter våran valda text manuelt just nu
    var text = "Hej mitt namn är Isak";
    var text_redacted = redact_all_text(text);
    var text_redacted_tokenized = redact_all_text_tokenized(text);
    var text_tokenized = tokenize_text(text);
    var input = prompt("Do you want to continue? (Y/N):  ");
    var n = (input !== null && input !== void 0 ? input : "").trim().toUpperCase();
}
;
gameplay_loop();
