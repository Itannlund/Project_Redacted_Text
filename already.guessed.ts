import { empty } from "./libr/prio_queue"; 


let guesses = []

function already_guessed(guesses: String[], guess: string): boolean {
    let ok = true;
    for (let i = 0; i < guesses.length; i = i + 0)
        if (guesses[i] === guess) {
            let ok = false
            already_guessed(guesses, input_guess())
        }
        else {
            guesses[guesses.length] = guess
            return 
        }
}