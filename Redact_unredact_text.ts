
let real_words : string []= []; 
function redact_all_text(input:string):string{
    real_words = input.split(" ");
    return input.replace(/\S/g, "*");
}

const display = redact_all_text("jorden är platt hej ");
console.log(display);