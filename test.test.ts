import PromptSync = require("prompt-sync");
import {    normalize_text, 
            tokenize_text, 
            redact_all_text, 
            redact_all_text_tokenized, 
            find_words, 
            letters_spaces,
            generate_random_text,
            hints,
            already_guessed,
            leaderboard,
            gameplay_loop} from "./Redact_unredact_text";
import {country_texts, song_title, type text_save} from "./Texts";

    
    const empty_string = "";
    const string_no_large_letters = "hej jag gillar glass"
    const string_large_letters = "Hello mY namE Är Isak";
    const string_only_large_letters = "HELLO I LIKE COUNTRIES";
    
    
    const normalized_empty = normalize_text(empty_string);
    const normalized1 = normalize_text(string_no_large_letters)
    const normalized2 = normalize_text(string_large_letters)
    const normalized3 = normalize_text(string_only_large_letters)
    
    const redact_text1 = redact_all_text(normalized1);
    
    const tokenize_empty = tokenize_text(empty_string);
    const tokenize1 = tokenize_text(normalized1);
    const tokenize2 = tokenize_text(normalized2);
    const tokenize3 = tokenize_text(normalized3);

leaderboard("hej", 3);

describe("Redacting Text", () => {
    test('testing redact all text', ()=> {
        expect(redact_text1).toEqual("*** *** ****** *****")
    
    })

});
describe("Redacting Text Tokenized", () => {
    test("Regular text", () => {
        expect(redact_all_text_tokenized(normalized1)).toEqual(["***", "***", "******", "*****"])
    });
});

describe("Normalize_text", () => {
    test('Can normalize handle empty string', ()=> {
        expect(normalized_empty).toBe("");
    })
    test('Testing normlize_text for Bigg letters', ()=>{

        expect(normalized1).toEqual(string_no_large_letters);
        expect(normalized2).toBe("hello my name ar isak")
        expect(normalized3).toBe("hello i like countries");
    });
    test('Testing normalize_text for weird letters', ()=> {
        const Swedish_letters = "Är Ån Något,. att öva pÅ? "
        expect(normalize_text(Swedish_letters)).toEqual("ar an nagot,. att ova pa?");
});
});

describe("Tokenize", ()=>{
    test('Does tokenize handle an empty string', ()=> {
        expect(tokenize_empty).toEqual([]);
    });
    test('Testing that we can tokenize regular sentences', ()=> {
        expect(tokenize1).toEqual(["hej", "jag", "gillar", "glass"]);
        expect(tokenize2).toEqual(["hello", "my", "name", "ar", "isak"]);
        expect(tokenize3).toEqual(["hello", "i", "like", "countries"]);
    });
});



describe("Find words", ()=> {
    test("Testing Our find words function", () => {
        const guess1 = "Isak";
        const text1 = "Hej mitt namn är Isak.";
        const red_text1 = redact_all_text(text1);
        const red_text1_tok = tokenize_text(red_text1);

        expect(tokenize_text(text1)).toEqual(["hej", "mitt", "namn", "ar", "isak."]);
        expect(red_text1_tok).toEqual(["***", "****", "****", "**", "****."]);
        expect(find_words(guess1, tokenize_text(text1), red_text1_tok)).toEqual(true);
   
    });
});


describe("generate_random_text", () => {
  test("Checks so it returns one of the elements inside our array", () => {
    const arr: text_save []= [
      { answer: "sweden", text: "Text 1", easy: [], medium: [], hard: [], hints: [] },
      { answer: "england", text: "Text 2", easy: [], medium: [],  hard: [],  hints: [] },
      { answer: "australia", text: "Text 3", easy: [], medium: [], hard: [],  hints: [] }
    ];

    const result = generate_random_text(arr);

    expect(arr).toContain(result);
  });

  test("Because it is random we try it with only one element", () => {
    const arr: text_save [] = [
      { answer: "sweden", text: "Text 1", easy: [], medium: [], hard: [], hints: [] },
    ];

    const result = generate_random_text(arr);

    expect(result).toBe(arr[0]);
  });
});

describe("Already Guessed", ()=> {
    
    test("Does Already guessed add word to its array and returns false", ()=>{
        const guesses = ["sweden", "norway"];
        const result = already_guessed(guesses, "denmark");

        expect(result).toBe(false);
    });
    test("Does Already guessed return true if the word is in the array", ()=> {
        const guesses = ["sweden", "norway"];
        const result2 = already_guessed(guesses, "sweden");

        expect(result2).toBe(true);
        expect(guesses).toEqual(["sweden", "norway"]);
    });
    test("Does Already guessed not add the word to array if it has already been guessed", ()=>{
        const guesses = ["sweden"];
        already_guessed(guesses, "sweden");

        expect(guesses).toEqual(["sweden"]);
        expect(guesses).toHaveLength(1);
    });
});

test("testing counting numbers and letters", () => {
    expect(letters_spaces("number")).toEqual({letters: 6, spaces: 0})
})








test("Sorted list ", () =>{
    leaderboard("anna", 55);
    const l1 = leaderboard("alice", 30);
    expect(l1).toEqual([{"name":"alice", "points":30}, {"name": "anna", "points":55}]);
})

test("same amount", ()=>{
    leaderboard("anna", 55);
    const l1 = leaderboard("alice", 55);
    expect(l1).toEqual([{"name":"alice", "points":55}, {"name": "anna", "points":55}]);

})




test("adding a player to leaderboard", () =>{
    const points_board1 = leaderboard("alice", 100);
    expect(points_board1).toHaveLength(1);
})



