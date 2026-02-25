"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize_text = normalize_text;
exports.tokenize_text = tokenize_text;
exports.redact_all_text = redact_all_text;
exports.redact_all_text_tokenized = redact_all_text_tokenized;
exports.find_words = find_words;
var Texts_Countries_1 = require("./Texts_Countries");
var readline = require("readline");
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
// Funktion för att ställa frågor
function ask(question) {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(function (resolve) {
        rl.question(question, function (answer) {
            rl.close();
            resolve(answer);
        });
    });
}
function generate_random_text() {
    var length = Texts_Countries_1.country_texts.length;
    var n = Math.floor(Math.random() * length);
    return Texts_Countries_1.country_texts[n];
}
// Våran gameplay loop. Denna kör spelet
function gameplay_loop() {
    return __awaiter(this, void 0, void 0, function () {
        var our_array, correct_answer, text, text_redacted_tokenized, text_tokenized, input, normalized_input, updated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    our_array = generate_random_text();
                    correct_answer = our_array[0];
                    text = our_array[1];
                    text_redacted_tokenized = redact_all_text_tokenized(text);
                    text_tokenized = tokenize_text(text);
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    console.log("Redacted text:");
                    console.log(text_redacted_tokenized.join(" "));
                    return [4 /*yield*/, ask("Guess a word (or type quit): ")];
                case 2:
                    input = _a.sent();
                    normalized_input = normalize_text(input);
                    if (normalized_input === "quit") {
                        console.log("Game ended.");
                        return [2 /*return*/];
                    }
                    if (normalized_input === correct_answer) {
                        console.log("You guessed correct");
                        return [2 /*return*/];
                    }
                    updated = find_words(input, text_tokenized, text_redacted_tokenized);
                    console.log("Updated text:");
                    console.log(updated.join(" "));
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
gameplay_loop();
