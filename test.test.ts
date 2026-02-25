import { normalize_text, tokenize_text, redact_all_text, redact_all_text_tokenized, find_words} from "./Redact_unredact_text";
import {country_texts} from "./Texts_Countries";
    
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

test('testing redact all text', ()=> {
    expect(redact_all_text(redact_text1)).toEqual("*** *** ****** *****")
    expect(tokenize_text(redact_all_text(redact_text1))).toEqual(["***", "***", "******", "*****"])
})

test('testing redact all text', ()=> {
    expect(redact_all_text(redact_text1)).toEqual("*** *** ****** *****")
})

test('Can normalize handle empty string', ()=> {
    expect(normalized_empty).toBe("");
})

test('Testing normlize_text for Bigg letters', ()=>{

    expect(normalized1).toEqual(string_no_large_letters);
    expect(normalized2).toBe("hello my name ar isak")
    expect(normalized3).toBe("hello i like countries");
})

test('Testing normlilize_text for weird letters', ()=> {
    const Swedish_letters = "Är Ån Något,. att öva pÅ? "
    expect(normalize_text(Swedish_letters)).toEqual("ar an nagot att ova pa");
});

test('Does tokenize handle an empty string', ()=> {
    expect(tokenize_empty).toEqual([]);
})

test('Testing that we can tokenize regular sentences', ()=> {
    expect(tokenize1).toEqual(["hej", "jag", "gillar", "glass"]);
    expect(tokenize2).toEqual(["hello", "my", "name", "ar", "isak"]);
    expect(tokenize3).toEqual(["hello", "i", "like", "countries"]);
})

test('Testing Our find words function', ()=> {
    const guess1 = "Isak";
    const text1 = "Hej mitt namn är Isak";
    const red_text1 = redact_all_text(text1);
    const red_text1_tok = tokenize_text(red_text1);
    expect(red_text1_tok).toEqual(["***", "****", "****", "**", "****"])
    expect(find_words(guess1, tokenize_text(text1), red_text1_tok)).toEqual(["***", "****", "****", "**", "isak"])
    expect(red_text1_tok).toEqual(["***", "****", "****", "**", "isak"])
})