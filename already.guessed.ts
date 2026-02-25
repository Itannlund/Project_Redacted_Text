import { empty } from "./libr/prio_queue"; 


let guesses = []

function already_guessed(guesses: Array<string>, guess: string): any {
    for (let i = 0; i < guesses.length; i = i + 0)
        if (guesses[i] === guess) {
            console.log("Already Guessed")
            already_guessed(guesses, input_guess())
        }
        else {
            guesses[guesses.length] = guess
            return guess
        }


}